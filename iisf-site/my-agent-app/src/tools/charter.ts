import { createTool } from "@voltagent/core";
import { z } from "zod";

const CHARTER_SECTIONS: Record<string, string> = {
  overview:
    "The Charter of Fundamental Intersectional Safety Rights is the foundational document of the IISF. It codifies three core standards — the Grandin Standard (sensory safety), the Heumann Standard (kinetic equity), and the Crenshaw Standard (algorithmic accountability). The Charter translates human rights into auditable, telematic science, modeled on frameworks from the OHCHR and HRDAG.",

  grandin:
    "The Grandin Standard (Right to Sensory Safety): Addresses the measurable impact of sensory environments on neurodivergent individuals. Uses wearable biotelemetry (HRV, EDA, cortisol) to map environmental hazards — decibel variance, lighting flicker rates (100 Hz fluorescent), spatial geometry. Key finding: presenteeism costs $150B/year in the US alone. Sensory-safe environments protect neurodivergent individuals from acute breakdown while reducing cognitive fatigue for the neurotypical majority (the Sensory Curb Cut Effect).",

  heumann:
    "The Heumann Standard (Right to Kinetic & Spatial Equity): Dictates that physical accessibility must transcend static ADA checklists. Uses wearable IMUs (e.g., Axivity AX3) for real-time gait analysis via Principal Component Analysis — measuring pace (24.81% variance), rhythm (16.57%), variability (13.02%), asymmetry (9.27%), and dynamic stability (15.47%). The Kinetic Curb Cut Effect: barrier-free infrastructure for wheelchair users simultaneously optimizes routes for delivery couriers, caregivers with strollers, and autonomous delivery robots (SADRs). Slip-and-fall injuries cost enterprises $20K avg per incident + $50K legal defense + 38 missed workdays.",

  crenshaw:
    "The Crenshaw Standard (Right to Algorithmic & Digital Invisibility): Rejects marginal fairness in algorithms. Enforces Intersectional Error Rate Parity — auditing TPR and FNR across all intersectional subgroups using z-scores at 95% confidence intervals and permutation tests. Addresses the surveillance gap affecting undocumented immigrants, racial minorities, and LGBTQI individuals. Prevents 'guilt by association' network effects in predictive analytics.",

  curb_cut:
    "The Curb Cut Effect: Originally demonstrated in 1945 Kalamazoo, Michigan — sidewalk curb cuts for disabled veterans universally benefited parents, cyclists, and all pedestrians. The Charter applies this principle across three domains: (1) Sensory — protecting neurodivergent workers reduces presenteeism for all; (2) Kinetic — wheelchair-accessible routes optimize logistics for couriers and autonomous robots; (3) Algorithmic — intersectional error-rate parity improves prediction accuracy for the entire population.",

  data_architecture:
    "The Charter's data architecture uses five atomic entities from HURIDOCS: NAME (persons/orgs), EVENT (time-bound sequences), ACT (indivisible occurrences), BIOGRAPHY (prolonged statuses), and RELATIONSHIP (entity connections). Three core maxims: absolute precision, comprehensive flexibility, and parsimony. This enables algorithms to map compounding intersectional risk as mathematically verifiable event sequences.",
};

export const charterLookupTool = createTool({
  name: "charter_lookup",
  description:
    "Look up information about the IISF Charter of Fundamental Intersectional Safety Rights. Use this when someone asks about the Charter, the three standards (Grandin, Heumann, Crenshaw), the Curb Cut Effect, data architecture, or the overall mission.",
  parameters: z.object({
    section: z
      .enum(["overview", "grandin", "heumann", "crenshaw", "curb_cut", "data_architecture"])
      .describe(
        "Which Charter section to look up: 'overview' for general info, 'grandin' for sensory safety, 'heumann' for kinetic equity, 'crenshaw' for algorithmic accountability, 'curb_cut' for the Curb Cut Effect, 'data_architecture' for the data ontology."
      ),
  }),
  execute: async (args) => {
    const content = CHARTER_SECTIONS[args.section];
    if (!content) {
      return { error: `Unknown section: ${args.section}` };
    }
    return { section: args.section, content };
  },
});

