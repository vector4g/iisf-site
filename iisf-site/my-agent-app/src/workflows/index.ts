import { createWorkflowChain } from "@voltagent/core";
import { z } from "zod";

// ==============================================================================
// Research Inquiry Workflow
// Processes incoming research partnership and fellowship inquiries.
// Validates the inquiry, classifies the research area, and routes
// to the appropriate review pipeline (auto-acknowledge or board review).
//
// Test via VoltOps Platform:
// POST /workflows/research-inquiry/execute
// {
//   "name": "Dr. Sarah Chen",
//   "email": "schen@university.edu",
//   "institution": "MIT Media Lab",
//   "researchArea": "sensory-safety",
//   "description": "Proposing a study on HRV-based biotelemetry in transit hubs"
// }
// ==============================================================================

const VALID_AREAS = [
  "sensory-safety",
  "kinetic-equity",
  "algorithmic-accountability",
  "spatial-justice",
  "other",
] as const;

export const researchInquiryWorkflow = createWorkflowChain({
  id: "research-inquiry",
  name: "Research Inquiry Workflow",
  purpose:
    "Process research partnership and fellowship inquiries, classify by area, and route for review",

  input: z.object({
    name: z.string().describe("Applicant's full name"),
    email: z.string().email().describe("Contact email"),
    institution: z.string().describe("University or organization"),
    researchArea: z.enum(VALID_AREAS).describe("Primary research area"),
    description: z.string().describe("Brief description of proposed research"),
  }),
  result: z.object({
    status: z.enum(["acknowledged", "board-review", "rejected"]),
    inquiryId: z.string(),
    charterStandard: z.string(),
    message: z.string(),
  }),
})
  // Step 1: Validate and classify
  .andThen({
    id: "classify-inquiry",
    execute: async ({ data }) => {
      const inquiryId = `INQ-${Date.now().toString(36).toUpperCase()}`;

      // Map research area to Charter standard
      const standardMap: Record<string, string> = {
        "sensory-safety": "Grandin Standard",
        "kinetic-equity": "Heumann Standard",
        "algorithmic-accountability": "Crenshaw Standard",
        "spatial-justice": "Heumann & Crenshaw Standards",
        other: "General Charter",
      };

      const charterStandard = standardMap[data.researchArea] || "General Charter";

      console.log(
        `[Research Inquiry] ${inquiryId}: ${data.name} (${data.institution}) — ${charterStandard}`
      );

      return {
        ...data,
        inquiryId,
        charterStandard,
      };
    },
  })

  // Step 2: Route based on classification
  .andThen({
    id: "route-inquiry",
    resumeSchema: z.object({
      approved: z.boolean(),
      reviewerNotes: z.string().optional(),
    }),
    execute: async ({ data, suspend, resumeData }) => {
      // If resuming after board review
      if (resumeData) {
        return {
          status: resumeData.approved
            ? ("acknowledged" as const)
            : ("rejected" as const),
          inquiryId: data.inquiryId,
          charterStandard: data.charterStandard,
          message: resumeData.approved
            ? `Your inquiry has been approved. A member of the IISF research team will contact you at ${data.email} to discuss next steps regarding the ${data.charterStandard}.`
            : `Thank you for your interest. Unfortunately, we are unable to proceed with this inquiry at this time. ${resumeData.reviewerNotes || ""}`,
        };
      }

      // Auto-acknowledge if the research area maps to a known standard
      if (data.researchArea !== "other") {
        console.log(`[Research Inquiry] Auto-acknowledged: ${data.inquiryId}`);
        return {
          status: "acknowledged" as const,
          inquiryId: data.inquiryId,
          charterStandard: data.charterStandard,
          message: `Thank you, ${data.name}. Your inquiry (${data.inquiryId}) regarding the ${data.charterStandard} has been received and acknowledged. We will be in touch at ${data.email}.`,
        };
      }

      // "other" category requires board review
      console.log(`[Research Inquiry] Requires board review: ${data.inquiryId}`);
      await suspend("Board review required for unclassified research area", {
        inquiryId: data.inquiryId,
        name: data.name,
        institution: data.institution,
        description: data.description,
      });

      // Fallback (unreachable after suspend)
      return {
        status: "board-review" as const,
        inquiryId: data.inquiryId,
        charterStandard: data.charterStandard,
        message: "Your inquiry has been escalated for board review.",
      };
    },
  });
