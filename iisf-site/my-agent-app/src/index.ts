import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Load env from agent's own .env first, then parent's .env.local as fallback
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });
import { VoltAgent, VoltOpsClient, Agent, Memory, VoltAgentObservability } from "@voltagent/core";
import { LibSQLMemoryAdapter, LibSQLObservabilityAdapter } from "@voltagent/libsql";
import { createPinoLogger } from "@voltagent/logger";
import { honoServer, jwtAuth } from "@voltagent/server-hono";
import { researchInquiryWorkflow, opsStrategyCycleWorkflow } from "./workflows";
import { charterLookupTool, governanceInfoTool, fellowshipInfoTool, opsIntelTool, crmQueryTool } from "./tools";
import {
  contentManager,
  fundingScout,
  boardRecruiter,
  seoStrategist,
  researchDirector,
} from "./agents";

// ---------------------------------------------------------------------------
// Logger
// ---------------------------------------------------------------------------
const logger = createPinoLogger({
  name: "iisf-assistant",
  level: "info",
});

// ---------------------------------------------------------------------------
// Persistent memory & observability (LibSQL / SQLite)
// ---------------------------------------------------------------------------
const memory = new Memory({
  storage: new LibSQLMemoryAdapter({
    url: "file:./.voltagent/memory.db",
    logger: logger.child({ component: "libsql" }),
  }),
});

const observability = new VoltAgentObservability({
  storage: new LibSQLObservabilityAdapter({
    url: "file:./.voltagent/observability.db",
  }),
});

// ===========================================================================
// Specialist Sub-Agents
// ===========================================================================

/**
 * Charter Analyst — Claude 3.5 Sonnet (Anthropic)
 * Deep expertise on the Charter, the three standards, the Curb Cut Effect,
 * and the HURIDOCS data architecture.
 */
const charterAnalyst = new Agent({
  name: "CharterAnalyst",
  purpose: "Answer questions about the IISF Charter, the Grandin/Heumann/Crenshaw standards, the Curb Cut Effect, and the data architecture",
  instructions: `You are the Charter Analyst for the International Intersectional Safety Foundation (IISF).

Your domain is the Charter of Fundamental Intersectional Safety Rights and its three core standards:
  • Grandin Standard — sensory safety (biotelemetry, HRV, EDA, presenteeism)
  • Heumann Standard — kinetic & spatial equity (IMU gait analysis, PCA domains, SADR coexistence)
  • Crenshaw Standard — algorithmic accountability (intersectional error-rate parity, z-scores, permutation tests)

You also cover the Curb Cut Effect and the HURIDOCS-based data architecture (NAME, EVENT, ACT, BIOGRAPHY, RELATIONSHIP).

Rules:
- Always use the charter_lookup tool to retrieve authoritative content before answering.
- Cite the specific standard name when quoting metrics or thresholds.
- If a question falls outside Charter scope, say so clearly.
- Be precise and concise. Use markdown formatting.`,
  model: "anthropic/claude-3-5-sonnet",
  tools: [charterLookupTool],
  memory: false, // stateless — supervisor manages conversation memory
});

/**
 * Policy Researcher — GPT-4o-mini (OpenAI)
 * Governance structure, ethical frameworks, board composition, kill switch,
 * and the ethical decision framework.
 */
const policyResearcher = new Agent({
  name: "PolicyResearcher",
  purpose: "Answer questions about IISF governance, the three-pillar model, ethical frameworks, the kill switch, and the decision framework",
  instructions: `You are the Policy Researcher for the International Intersectional Safety Foundation (IISF).

Your domain is IISF governance and ethics:
  • Three-Pillar Model: Foundation (IISF) → Licensee (Vector for Good) → Kill Switch Authority
  • Six Core Ethical Frameworks (Intersectional Safety First, Algorithmic Transparency, Digital Sovereignty, Consent Architecture, No Weapons/No Surveillance, Community Accountability)
  • Board composition and community accountability mechanisms
  • The Ethical Decision Framework (four-question feature review)

Rules:
- Always use the governance_info tool to retrieve authoritative content before answering.
- Reference the specific pillar or framework by name.
- If a question falls outside governance/ethics scope, say so clearly.
- Be precise and concise. Use markdown formatting.`,
  model: "openai/gpt-4o-mini",
  tools: [governanceInfoTool],
  memory: false,
});

/**
 * Fellowship Advisor — Mistral Large (Mistral)
 * Research fellowships, partnership opportunities, application process,
 * and the Vector for Good relationship.
 */
const fellowshipAdvisor = new Agent({
  name: "FellowshipAdvisor",
  purpose: "Answer questions about IISF research fellowships, how to apply, research areas, and the Vector for Good partnership",
  instructions: `You are the Fellowship Advisor for the International Intersectional Safety Foundation (IISF).

Your domain is research engagement and partnerships:
  • IISF Research Fellowship Program — overview, eligibility, process
  • Key research areas: sensory-safety biotelemetry, kinetic-equity gait analysis, algorithmic accountability, urban spatial justice
  • How to apply (contact board@intersectionalsafety.org)
  • Vector for Good Corp — the exclusive commercial licensee and applied-research partner

Rules:
- Always use the fellowship_info tool to retrieve authoritative content before answering.
- When discussing research areas, connect them to the relevant Charter standard.
- If a question falls outside fellowship/partnership scope, say so clearly.
- Be precise and concise. Use markdown formatting.`,
  model: "mistral/mistral-large-latest",
  tools: [fellowshipInfoTool],
  memory: false,
});

// ===========================================================================
// Supervisor Agent
// ===========================================================================

const supervisor = new Agent({
  name: "iisf-assistant",
  instructions: `You are the IISF Assistant — the AI guide for the International Intersectional Safety Foundation.

You coordinate a team of specialist agents:
  • CharterAnalyst — deep expertise on the Charter and the three standards
  • PolicyResearcher — governance, ethics, and the kill switch
  • FellowshipAdvisor — research fellowships and the Vector for Good partnership

Your job:
1. Analyse the user's question and decide which specialist(s) to delegate to.
2. Use delegate_task to hand off work. You may delegate to multiple specialists in one call when the question spans domains.
3. Synthesise the specialists' responses into a single, coherent answer for the user.
4. If the question is simple (e.g. a greeting), answer directly without delegating.

Guidelines:
- Be precise, professional, and grounded in the Charter's language.
- When quoting standards or articles, reference the specific standard name.
- If asked about topics outside IISF's scope, politely redirect.
- Keep responses concise but thorough. Use markdown formatting when helpful.
- Never fabricate statistics or claim IISF certifications that don't exist.`,
  model: "anthropic/claude-3-5-sonnet",
  subAgents: [charterAnalyst, policyResearcher, fellowshipAdvisor],
  memory,
  supervisorConfig: {
    includeAgentsMemory: true,
    fullStreamEventForwarding: {
      types: ["tool-call", "tool-result", "text-delta", "error"],
    },
    throwOnStreamError: false,
    includeErrorInEmptyResponse: true,
  },
});

// ===========================================================================
// Operations Director — internal team supervisor (Claude 3.5 Sonnet)
// ===========================================================================

const opsDirector = new Agent({
  name: "iisf-ops",
  instructions: `You are a coordinated team of AI agents supporting the International Intersectional Safety Foundation (IISF) and its commercial partner, Vector for Good, Corp.

Your mission is to secure the resources and intellectual leadership needed to make IISF the global domain owner for "intersectional safety."

Overall mission:
Work together to:
1. Identify and prioritize funding sources for IISF (grants, philanthropies, corporate partners, impact investors, and strategic alliances).
2. Find and profile potential board members and advisors with the right mix of governance, lived experience, AI/ESG, safety, and global policy expertise.
3. Continuously research and synthesize the key domains IISF should own (intersectional safety, sensory safety, kinetic and spatial equity, algorithmic/digital invisibility, queer safety in travel and workplaces, AI and safety governance).
4. Turn research into concrete thought-leadership and SEO assets that increase IISF visibility and authority online.

You are the Orchestrator / Project Manager Agent.
You coordinate these specialists:
  • FundingScout (Anthropic Claude): Funding Scout Agent
  • BoardRecruiter (OpenAI GPT-4o): Board and Advisor Research Agent
  • ResearchDirector (Anthropic Claude): Domain Intelligence Agent
  • SEOStrategist (Mistral): Thought-Leadership and SEO Agent (search/entity strategy)
  • ContentManager (OpenAI GPT-4o): Thought-Leadership and SEO Agent (content drafting/briefs)

You also have:
  • ops_intel tool (shared operational knowledge base)
  • crm_query tool (pipeline visibility)

Coordination protocol:
1. Always begin substantial work by loading ops_intel with "roadmap" and loading crm_query (no filters) to ground recommendations in the latest Supabase CRM pipeline state.
2. Decompose the request and delegate with delegate_task to the appropriate specialists.
3. For cross-functional requests, delegate to multiple specialists so results combine multiple model perspectives.
4. Synthesize into one decision-ready response with clear owner, priority, and next steps.
5. If the request is simple (e.g., greeting), answer directly without delegation.
6. Maintain a shared working memory of findings, decisions, and open questions.

Constraints and priorities:
Alignment with mission:
- Always prioritize opportunities advancing intersectional, queer-inclusive, disability-aware, trauma-informed safety.
- Avoid funding and partnerships that conflict with this mission (including poor human-rights records).

Geographic and regulatory context:
- Assume operations across US, EU (especially Estonia and Germany), and global online environments.
- Include relevant implications of EU digital policy, EU AI Act, GDPR, ISO 31030, and related safety/ESG frameworks.

Practicality:
- Prefer opportunities with clear timelines, realistic eligibility, and high strategic value.
- Explicitly classify actions as "high-effort/low-probability" or "low-effort/high-probability."

Required deliverables and formats:
Funding pipeline:
- Provide a table with: name, type (grant/foundation/corporate/other), thematic fit, location, amount range, deadline, eligibility notes, priority score (1-5), recommended next step.

Board/advisor pipeline:
- Provide a table with: name, current role/org, location, expertise tags, lived experience (where publicly disclosed), potential contribution to IISF, priority score, contact path, key risks/conflicts to check.

Domain ownership map:
- Provide 10-30 concepts IISF should own, each with: why it matters, current external leaders/sources, IISF differentiator angle, suggested format (white paper, research note, standards proposal, glossary term, webinar, etc.).

Thought-leadership and SEO plan:
- Provide a content map with pillar pages, supporting pieces, and search/entity targets.
- For top 5-10 pieces include: working title, audience, key thesis, main sections, and authority/SEO rationale.

Iteration loop (mandatory ending for substantial outputs):
- 3-5 highest-leverage next actions for the human team
- Missing information needed from founders
- Risks, ethical concerns, or reputational issues to flag early

Style and ethics:
- Be rigorous, evidence-aware, and non-sensational.
- Be respectful of marginalized communities and grounded in intersectional perspectives.
- Be privacy-conscious; apply data minimization and sensitive-identity safety.
- Never fabricate individuals, grants, or organizations.
- If uncertain, mark the item "needs verification" and specify what must be checked.`,
  model: "anthropic/claude-3-5-sonnet",
  tools: [opsIntelTool, crmQueryTool],
  subAgents: [contentManager, fundingScout, boardRecruiter, seoStrategist, researchDirector],
  memory,
  supervisorConfig: {
    includeAgentsMemory: true,
    fullStreamEventForwarding: {
      types: ["tool-call", "tool-result", "text-delta", "error"],
    },
    throwOnStreamError: false,
    includeErrorInEmptyResponse: true,
    customGuidelines: [
      "Always summarize action items at the end of your response",
      "Flag costs, deadlines, and risks prominently",
      "When multiple agents contribute, clearly attribute which specialist produced what",
      "Use structured tables for funding and board/advisor pipelines whenever applicable",
      "Explicitly label uncertain items as 'needs verification' with a verification checklist",
      "Classify key recommendations by effort/probability (high-effort/low-probability vs low-effort/high-probability)",
    ],
  },
});

// ===========================================================================
// VoltAgent bootstrap — two top-level agents
// ===========================================================================

const agentSecret = process.env.IISF_AGENT_SECRET;
if (!agentSecret) {
  throw new Error("IISF_AGENT_SECRET is required. Set it in .env or Railway variables.");
}

const configuredPort = Number.parseInt(process.env.PORT ?? "3141", 10);
const serverPort = Number.isFinite(configuredPort) ? configuredPort : 3141;

new VoltAgent({
  agents: {
    // Public-facing Q&A agent (Charter, governance, fellowships)
    "iisf-assistant": supervisor,
    // Internal operations team (funding, content, SEO, board, research)
    "iisf-ops": opsDirector,
  },
  workflows: {
    researchInquiryWorkflow,
    opsStrategyCycleWorkflow,
  },
  server: honoServer({
    // Railway and most PaaS providers require binding to process.env.PORT.
    port: serverPort,
    // ── Auth: Bearer-token locks all endpoints ──
    authNext: {
      provider: jwtAuth({
        secret: agentSecret,
      }),
      // Only healthcheck is public — everything else requires the token
      publicRoutes: ["GET /"],
    },
    // Restrict CORS to known origins
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:3141",
        "https://intersectionalsafety.org",
        "https://www.intersectionalsafety.org",
        "https://ops.intersectionalsafety.org",
      ],
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      credentials: true,
    },
  }),
  logger,
  observability,
  voltOpsClient: new VoltOpsClient({
    publicKey: process.env.VOLTAGENT_PUBLIC_KEY || "",
    secretKey: process.env.VOLTAGENT_SECRET_KEY || "",
  }),
});

type OpsCycleType = "weekly" | "biweekly" | "sprint";
type OpsPriorityFocus =
  | "funding"
  | "board_recruitment"
  | "domain_intelligence"
  | "seo"
  | "thought_leadership";

function isEnabledFlag(value: string | undefined) {
  if (!value) return false;
  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

function parsePositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
}

function parseCsv(value: string | undefined, fallback: string[]) {
  if (!value) return fallback;
  const parsed = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return parsed.length > 0 ? parsed : fallback;
}

function parseCycleType(value: string | undefined): OpsCycleType {
  const normalized = value?.trim().toLowerCase();
  if (normalized === "weekly" || normalized === "biweekly" || normalized === "sprint") {
    return normalized;
  }
  return "weekly";
}

function parsePriorityFocus(value: string | undefined): OpsPriorityFocus[] {
  const allowed = new Set<OpsPriorityFocus>([
    "funding",
    "board_recruitment",
    "domain_intelligence",
    "seo",
    "thought_leadership",
  ]);
  const parsed = parseCsv(value, []).filter((item): item is OpsPriorityFocus =>
    allowed.has(item as OpsPriorityFocus),
  );
  if (parsed.length > 0) return parsed;
  return ["funding", "board_recruitment", "domain_intelligence", "seo", "thought_leadership"];
}

function buildBaselineOpsInput() {
  return {
    objective:
      process.env.OPS_BASELINE_OBJECTIVE ??
      "Stand up a verified 30-day operating pipeline for funding, board recruitment, domain authority, and SEO execution.",
    cycleType: parseCycleType(process.env.OPS_BASELINE_CYCLE_TYPE),
    planningHorizonDays: parsePositiveInt(process.env.OPS_BASELINE_HORIZON_DAYS, 30),
    geographyFocus: parseCsv(process.env.OPS_BASELINE_GEOGRAPHY, [
      "US",
      "EU (Estonia, Germany)",
      "Global Online",
    ]),
    priorityFocus: parsePriorityFocus(process.env.OPS_BASELINE_PRIORITY_FOCUS),
  };
}

let opsCycleInFlight = false;

async function runOpsCycle(trigger: "startup" | "interval") {
  if (opsCycleInFlight) {
    logger.warn("Skipping ops-strategy-cycle run because a previous run is still in progress", {
      trigger,
    });
    return;
  }

  const input = buildBaselineOpsInput();
  opsCycleInFlight = true;
  try {
    logger.info("Starting ops-strategy-cycle workflow", {
      trigger,
      cycleType: input.cycleType,
      planningHorizonDays: input.planningHorizonDays,
    });
    const execution = await opsStrategyCycleWorkflow.run(input, {
      userId: process.env.OPS_AUTOSTART_USER_ID ?? "system-ops-autostart",
      conversationId: `ops-autostart-${new Date().toISOString().slice(0, 10)}`,
    });
    if (execution.status !== "completed" || !execution.result) {
      logger.warn("ops-strategy-cycle workflow did not complete successfully", {
        trigger,
        status: execution.status,
        executionId: execution.executionId,
      });
      return;
    }

    logger.info("ops-strategy-cycle workflow completed", {
      trigger,
      executionId: execution.executionId,
      fundingItems: execution.result.fundingPipeline.length,
      boardItems: execution.result.boardAdvisorPipeline.length,
      domainItems: execution.result.domainOwnershipMap.length,
      topContentPieces: execution.result.thoughtLeadershipSeoPlan.topPriorityPieces.length,
    });
  } catch (error) {
    logger.error("ops-strategy-cycle workflow failed", { trigger, error });
  } finally {
    opsCycleInFlight = false;
  }
}

function configureOpsAutostart() {
  if (!isEnabledFlag(process.env.OPS_AUTOSTART)) return;

  // Run once immediately after boot when enabled.
  void runOpsCycle("startup");

  // Optional recurring run cadence in minutes.
  const intervalMinutes = parsePositiveInt(process.env.OPS_AUTOSTART_INTERVAL_MINUTES, 0);
  if (intervalMinutes <= 0) return;

  const intervalMs = intervalMinutes * 60_000;
  setInterval(() => {
    void runOpsCycle("interval");
  }, intervalMs);

  logger.info("Configured recurring ops-strategy-cycle autostart interval", { intervalMinutes });
}

configureOpsAutostart();
