import { Agent, createWorkflowChain } from "@voltagent/core";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import {
  contentManager,
  fundingScout,
  boardRecruiter,
  seoStrategist,
  researchDirector,
} from "../agents";
import { crmQueryTool, opsIntelTool } from "../tools";

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

// ==============================================================================
// Ops Strategy Cycle Workflow (schema-enforced, multi-agent)
// Runs a weekly/sprint planning cycle with structured outputs for:
// - Funding pipeline
// - Board/advisor pipeline
// - Domain ownership map
// - Thought-leadership and SEO plan
// - Iteration loop actions/risks
// ==============================================================================

const effortProbabilitySchema = z.enum([
  "low-effort/high-probability",
  "high-effort/low-probability",
  "balanced",
]);

const verificationStatusSchema = z.enum(["verified", "needs_verification"]);

const fundingPipelineItemSchema = z.object({
  name: z.string(),
  type: z.enum([
    "grant",
    "foundation",
    "corporate",
    "impact_investor",
    "strategic_alliance",
    "other",
  ]),
  thematicFit: z.string(),
  location: z.string(),
  amountRange: z.string(),
  deadline: z.string().describe("Absolute date when available, otherwise 'TBD'"),
  eligibilityNotes: z.string(),
  priorityScore: z.number().int().min(1).max(5),
  effortProbability: effortProbabilitySchema,
  recommendedNextStep: z.string(),
  verificationStatus: verificationStatusSchema,
  verificationChecklist: z.array(z.string()).default([]),
});

const boardAdvisorItemSchema = z.object({
  name: z.string(),
  roleType: z.enum([
    "governance",
    "domain_expert",
    "policy",
    "philanthropy",
    "ai_esg",
  ]),
  currentRoleOrg: z.string(),
  location: z.string(),
  expertiseTags: z.array(z.string()).min(1),
  livedExperience: z
    .string()
    .describe("Only include publicly disclosed lived experience information"),
  potentialContribution: z.string(),
  priorityScore: z.number().int().min(1).max(5),
  contactPath: z.enum(["direct", "intro_needed", "cold_outreach"]),
  keyRisksOrConflicts: z.string(),
  verificationStatus: verificationStatusSchema,
  verificationChecklist: z.array(z.string()).default([]),
});

const domainOwnershipItemSchema = z.object({
  concept: z.string(),
  description: z.string(),
  whyItMatters: z.string(),
  currentExternalLeadersOrSources: z.array(z.string()).min(1),
  iisfDifferentiatorAngle: z.string(),
  suggestedFormats: z.array(z.string()).min(1),
  verificationStatus: verificationStatusSchema,
  verificationChecklist: z.array(z.string()).default([]),
});

const seoContentPieceSchema = z.object({
  workingTitle: z.string(),
  contentType: z.enum([
    "pillar_page",
    "supporting_article",
    "research_brief",
    "explainer",
    "white_paper",
    "standards_proposal",
    "glossary_term",
    "webinar",
    "other",
  ]),
  audience: z.string(),
  keyThesis: z.string(),
  mainSections: z.array(z.string()).min(3),
  searchEntityTargets: z.array(z.string()).min(1),
  authorityAndSeoRationale: z.string(),
  effortProbability: effortProbabilitySchema,
  verificationStatus: verificationStatusSchema,
  verificationChecklist: z.array(z.string()).default([]),
});

const actionItemSchema = z.object({
  action: z.string(),
  owner: z.string(),
  timeline: z.string(),
  priority: z.enum(["high", "medium", "low"]),
  effortProbability: effortProbabilitySchema,
});

const riskItemSchema = z.object({
  risk: z.string(),
  severity: z.enum(["high", "medium", "low"]),
  mitigation: z.string(),
  needsHumanDecision: z.boolean(),
});

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for ops-strategy-cycle workflow",
    );
  }
  return createClient(url, key);
}

async function loadCrmSnapshot() {
  const sb = getSupabase();
  const { data: contacts, error } = await sb
    .from("contacts")
    .select("id, stage, type, priority")
    .limit(1000);

  if (error) {
    throw new Error(`Failed to load CRM snapshot from Supabase: ${error.message}`);
  }

  const stageSummary: Record<string, number> = {};
  const typeSummary: Record<string, number> = {};
  let highPriorityOpen = 0;

  for (const c of contacts ?? []) {
    stageSummary[c.stage] = (stageSummary[c.stage] ?? 0) + 1;
    typeSummary[c.type] = (typeSummary[c.type] ?? 0) + 1;
    if (c.priority <= 2 && !["committed", "declined"].includes(c.stage)) {
      highPriorityOpen += 1;
    }
  }

  return {
    totalContacts: contacts?.length ?? 0,
    highPriorityOpen,
    stageSummary,
    typeSummary,
  };
}

const opsStrategyCycleResultSchema = z.object({
  cycleSummary: z.string(),
  crmPipelineSummary: z.record(z.string(), z.number()).default({}),
  fundingPipeline: z.array(fundingPipelineItemSchema).min(5),
  boardAdvisorPipeline: z.array(boardAdvisorItemSchema).min(5),
  domainOwnershipMap: z
    .array(domainOwnershipItemSchema)
    .min(10)
    .max(30),
  thoughtLeadershipSeoPlan: z.object({
    pillarPages: z.array(seoContentPieceSchema).min(3),
    supportingPieces: z.array(seoContentPieceSchema).min(5),
    topPriorityPieces: z.array(seoContentPieceSchema).min(5).max(10),
  }),
  iterationLoop: z.object({
    highestLeverageNextActions: z.array(actionItemSchema).min(3).max(5),
    missingFounderInformation: z.array(z.string()).default([]),
    risksEthicsReputation: z.array(riskItemSchema).default([]),
  }),
});

const opsStrategyOrchestratorAgent = new Agent({
  name: "OpsStrategyOrchestrator",
  model: "anthropic/claude-3-5-sonnet",
  instructions: `You are the IISF Ops Strategy Orchestrator.

You must coordinate multiple specialist agents and produce decision-ready outputs.

Execution rules:
1. Start by calling ops_intel with "roadmap".
2. Start by calling crm_query with no filters to fetch current Supabase CRM pipeline summary.
3. Delegate tasks to specialist subagents using delegate_task:
   - FundingScout for funding pipeline
   - BoardRecruiter for board/advisor pipeline
   - ResearchDirector for domain ownership map
   - SEOStrategist and ContentManager for thought-leadership and SEO content plan
4. Never fabricate people, grants, or organizations.
5. Mark uncertain items as needs_verification and include explicit verification checklists.
6. Prefer absolute dates and concrete next actions.`,
  tools: [opsIntelTool, crmQueryTool],
  subAgents: [
    contentManager,
    fundingScout,
    boardRecruiter,
    seoStrategist,
    researchDirector,
  ],
  memory: false,
});

export const opsStrategyCycleWorkflow = createWorkflowChain({
  id: "ops-strategy-cycle",
  name: "Ops Strategy Cycle Workflow",
  purpose:
    "Run a multi-agent IISF strategy cycle with schema-enforced outputs for funding, board, domain intelligence, and SEO/thought leadership",
  input: z.object({
    objective: z
      .string()
      .describe("What the cycle should optimize for (e.g. funding + authority)"),
    cycleType: z.enum(["weekly", "biweekly", "sprint"]),
    planningHorizonDays: z.number().int().min(7).max(120).default(30),
    geographyFocus: z.array(z.string()).default(["US", "EU", "Global Online"]),
    priorityFocus: z
      .array(
        z.enum([
          "funding",
          "board_recruitment",
          "domain_intelligence",
          "seo",
          "thought_leadership",
        ]),
      )
      .default(["funding", "thought_leadership", "seo"]),
  }),
  result: opsStrategyCycleResultSchema,
})
  .andThen({
    id: "load-crm-snapshot",
    execute: async ({ data }) => {
      const crmSnapshot = await loadCrmSnapshot();
      return { ...data, crmSnapshot };
    },
  })
  .andAgent(
  async ({ data }) => {
    return `Run one ${data.cycleType} operations cycle for IISF.

Objective:
${data.objective}

Planning horizon:
${data.planningHorizonDays} days

Geography focus:
${data.geographyFocus.join(", ")}

Priority focus:
${data.priorityFocus.join(", ")}

Live Supabase CRM snapshot (must use this):
${JSON.stringify(data.crmSnapshot, null, 2)}

Required process:
1. Call ops_intel("roadmap") first.
2. Call crm_query with no filters first to load current Supabase-backed pipeline summary.
3. Delegate to all relevant specialist subagents and synthesize their outputs.
4. Produce a complete structured response matching the required schema.
5. If any entry is uncertain, set verificationStatus=needs_verification and include specific verificationChecklist items.

Formatting requirements:
- Funding pipeline: include thematic fit, deadlines, priority (1-5), and recommended next step.
- Board/advisor pipeline: include roleType, expertise tags, contact path, and risk/conflict checks.
- Domain map: 10-30 concepts with clear IISF differentiators.
- SEO plan: pillar pages + supporting pieces + top priority pieces (5-10).
- Iteration loop: 3-5 highest leverage next actions, missing founder info, and reputational/ethical risks.`;
  },
  opsStrategyOrchestratorAgent,
  {
    schema: opsStrategyCycleResultSchema,
    maxRetries: 2,
  },
);
