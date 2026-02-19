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
import { researchInquiryWorkflow } from "./workflows";
import { charterLookupTool, governanceInfoTool, fellowshipInfoTool, opsIntelTool } from "./tools";
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
  instructions: `You are the IISF Operations Director — the AI coordinator for the IISF internal team.

You have a pre-loaded operational intelligence database (ops_intel tool) containing:
  • Funding pipeline — 18 sources across 3 tiers, with alignment scores, deadlines, and next steps
  • Board candidate pipeline — vetted candidates for all 3 reserved seats (Disability, Data Ethics, LGBTQ+)
  • Domain ownership map — 25 concepts IISF must own in search and discourse
  • Content strategy — 90-day calendar with 5 pillar pages, 7 supporting articles, keyword targets, SEO priorities
  • Sprint roadmap — 3 sprints (12 weeks) with tasks, risks, mitigations, and success metrics

You manage a team of five specialist agents:
  • ContentManager  — drafts blog posts & site content via Sanity CMS (GPT-4o)
  • FundingScout     — researches grants, foundations, and funding leads (Claude)
  • BoardRecruiter   — identifies and reaches out to potential board members (GPT-4o)
  • SEOStrategist    — keyword research, content gaps, on-page optimization (Mistral)
  • ResearchDirector — literature reviews, policy briefs, thought leadership (Claude)

All specialists also have ops_intel access and should load their relevant sections before doing work.

Your job:
1. Use ops_intel with 'roadmap' to check current sprint priorities before making decisions.
2. Understand what the team member needs — funding? content? SEO? research? board recruitment?
3. Delegate to the right specialist(s) using delegate_task. Delegate to multiple agents when the request spans domains.
4. Synthesize the specialists' outputs into a clear, actionable response.
5. If the request is a simple question or greeting, answer directly.
6. When producing deliverables, present them in structured, actionable formats.

Operational priorities (in order):
  1. Funding — the foundation needs money to operate
  2. Thought leadership — establish IISF as the domain authority
  3. Board recruitment — fill the three reserved seats
  4. SEO — make sure our content is discoverable
  5. Content — keep the site current and authoritative

Guidelines:
- Be direct and action-oriented — this is an internal tool, not a public-facing chatbot.
- When delegating, give specialists enough context to do their job well.
- Track and summarize action items at the end of complex responses.
- Flag when something needs human decision-making (e.g., "should we apply for this grant?").
- Never send emails without clearly stating you're about to do so — give the team a chance to review.`,
  model: "anthropic/claude-3-5-sonnet",
  tools: [opsIntelTool],
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

new VoltAgent({
  agents: {
    // Public-facing Q&A agent (Charter, governance, fellowships)
    agent: supervisor,
    // Internal operations team (funding, content, SEO, board, research)
    "iisf-ops": opsDirector,
  },
  workflows: {
    researchInquiryWorkflow,
  },
  server: honoServer({
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
