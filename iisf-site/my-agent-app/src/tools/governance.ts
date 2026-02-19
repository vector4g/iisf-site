import { createTool } from "@voltagent/core";
import { z } from "zod";

const GOVERNANCE_INFO: Record<string, string> = {
  overview:
    "IISF uses a Three-Pillar Governance Model: (1) The Foundation (IISF) — IP steward and standards authority, owns the Grandin/Heumann/Crenshaw modules, defines standards, maintains the Charter, oversees fellowships, and retains veto power on all commercial applications. (2) The Licensee (Vector for Good) — commercial implementer, builds enterprise duty-of-care products, implements GDPR/ISO 31030/EU AI Act compliance, reports to IISF. (3) The Lock (Kill Switch Authority) — ethical enforcement, monitors for surveillance/weaponization, can unilaterally terminate licenses.",

  foundation:
    "The Foundation (IISF): The non-profit entity that owns and stewards all IP including the Grandin, Heumann, and Crenshaw modules. Responsibilities: define intersectional safety standards, maintain the Charter, oversee the research fellowship program, approve commercial licensing agreements. Authority: retains absolute veto power on all commercial applications and can revoke licenses.",

  licensee:
    "The Licensee (Vector for Good Corp): The exclusive commercial implementer. Commercializes IISF technology for enterprise duty-of-care use cases. Implements compliance with GDPR, ISO 31030, and the EU AI Act. Develops sensory safety and kinetic equity features. Reports to IISF on all deployments. Maintains ethical guardrails in product design. Operates under an exclusive license with performance obligations and ethical requirements. Website: https://vectorforgood.com",

  kill_switch:
    "The Kill Switch Authority (The Lock): The ethical enforcement mechanism. Responsibilities: monitor for surveillance use cases, detect weaponization attempts, prevent non-consensual tracking deployments, audit data handling and algorithmic decisions, enforce contractual safeguards. Authority: unilateral power to terminate licenses and remove systems from operation. Violations trigger immediate revocation regardless of business impact.",

  ethics:
    "Six Core Ethical Frameworks: (1) Intersectional Safety First — profit never overrides safety. (2) Algorithmic Transparency — all risk algorithms auditable by third parties, no black-box systems. (3) Digital Sovereignty — users retain data sovereignty, opt-out without service loss. (4) Consent Architecture — active, reversible, context-specific consent; default is non-participation. (5) No Weapons, No Surveillance — hard red lines, zero tolerance. (6) Community Accountability — LGBTQ+ safety orgs, disability rights groups, and neurodivergent voices have structural governance power.",

  board:
    "Board Composition: Executive Leadership — Levi Hankins (Founder & Chair). Reserved Board Seats (nominations pending): Disability Advocacy Seat, Data Ethics Seat, LGBTQ+ Safety Seat. Accountability: 3-year terms with community review. Any member can be removed by 2/3 vote of affected community organizations.",

  decision_framework:
    "Ethical Decision Framework — every feature, deployment, and integration runs through these questions before release: (1) Would this feature benefit from knowing a user's marginalized identity? If yes, request explicit informed consent. If no, design around identity obfuscation. (2) Could this feature enable surveillance or weaponization? If possible, redesign. If unavoidable, do not deploy. (3) Does this require forced visibility? If yes, design opt-out. If not possible, reject entirely. (4) Are disabled/neurodivergent/LGBTQ+ users at disadvantage? If yes, redesign or build compensatory features. Never ship with known equity gaps.",
};

export const governanceInfoTool = createTool({
  name: "governance_info",
  description:
    "Look up IISF governance structure, ethical frameworks, board composition, the kill switch mechanism, and the relationship with Vector for Good. Use this when someone asks about how IISF is governed, the ethics of the organization, or the decision-making framework.",
  parameters: z.object({
    topic: z
      .enum(["overview", "foundation", "licensee", "kill_switch", "ethics", "board", "decision_framework"])
      .describe(
        "Which governance topic: 'overview' for the three-pillar model, 'foundation' for IISF's role, 'licensee' for Vector for Good, 'kill_switch' for ethical enforcement, 'ethics' for the six frameworks, 'board' for composition, 'decision_framework' for the feature review process."
      ),
  }),
  execute: async (args) => {
    const content = GOVERNANCE_INFO[args.topic];
    if (!content) {
      return { error: `Unknown topic: ${args.topic}` };
    }
    return { topic: args.topic, content };
  },
});

