import { createTool } from "@voltagent/core";
import { z } from "zod";

const FELLOWSHIP_INFO: Record<string, string> = {
  overview:
    "The IISF Research Fellowship Program supports researchers working at the intersection of human rights data, algorithmic fairness, accessibility engineering, and sensory safety. Fellows contribute to advancing the Grandin, Heumann, and Crenshaw Standards through empirical research. The Foundation oversees the program and approves all fellowship grants.",

  research_areas:
    "Key research areas: (1) Sensory Safety Biotelemetry — wearable biosensor integration, HRV/EDA correlation with environmental hazards, acoustic and visual trauma quantification. (2) Kinetic Equity & Gait Analysis — IMU-based gait analysis, PCA domain modeling, real-time route viability assessment, SADR/pedestrian coexistence. (3) Algorithmic Accountability — intersectional error-rate parity, fairness auditing methodologies, privacy-preserving analytics. (4) Urban Spatial Justice — embodied spatial justice frameworks, curb-cut effect quantification, transit equity modeling.",

  how_to_apply:
    "To inquire about fellowship opportunities or research partnerships, contact the Foundation at board@intersectionalsafety.org. Include: your research area of interest, relevant academic or professional background, and how your work relates to the Charter's three standards. The IISF is headquartered at 1111B S Governors Ave #82502, Dover, DE 19904, USA.",

  vector_partnership:
    "Vector for Good Corp (https://vectorforgood.com) is the exclusive commercial licensee of IISF technology. Researchers interested in applied/commercial applications of intersectional safety standards may also explore partnership opportunities through Vector for Good, which implements the Charter's standards in enterprise duty-of-care products.",
};

export const fellowshipInfoTool = createTool({
  name: "fellowship_info",
  description:
    "Look up information about IISF research fellowships, grants, research areas, how to apply, and partnership opportunities with Vector for Good. Use when someone asks about getting involved, research opportunities, or collaboration.",
  parameters: z.object({
    topic: z
      .enum(["overview", "research_areas", "how_to_apply", "vector_partnership"])
      .describe(
        "Which fellowship topic: 'overview' for general program info, 'research_areas' for focus areas, 'how_to_apply' for application details, 'vector_partnership' for commercial partnership info."
      ),
  }),
  execute: async (args) => {
    const content = FELLOWSHIP_INFO[args.topic];
    if (!content) {
      return { error: `Unknown topic: ${args.topic}` };
    }
    return { topic: args.topic, content };
  },
});

