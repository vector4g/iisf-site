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
import { honoServer } from "@voltagent/server-hono";
import { researchInquiryWorkflow } from "./workflows";
import { charterLookupTool, governanceInfoTool, fellowshipInfoTool } from "./tools";

// Create a logger instance
const logger = createPinoLogger({
  name: "iisf-assistant",
  level: "info",
});

// Configure persistent memory (LibSQL / SQLite)
const memory = new Memory({
  storage: new LibSQLMemoryAdapter({
    url: "file:./.voltagent/memory.db",
    logger: logger.child({ component: "libsql" }),
  }),
});

// Configure persistent observability (LibSQL / SQLite)
const observability = new VoltAgentObservability({
  storage: new LibSQLObservabilityAdapter({
    url: "file:./.voltagent/observability.db",
  }),
});

const IISF_INSTRUCTIONS = `You are the IISF Assistant — the AI guide for the International Intersectional Safety Foundation.

Your role is to help visitors, researchers, and partners understand:
- The Charter of Fundamental Intersectional Safety Rights
- The three core standards: the Grandin Standard (sensory safety), the Heumann Standard (kinetic equity), and the Crenshaw Standard (algorithmic accountability)
- IISF governance structure (Foundation → Licensee → Kill Switch)
- Research fellowship opportunities and how to get involved
- The relationship between IISF and Vector for Good

Guidelines:
- Be precise, professional, and grounded in the Charter's language.
- When quoting standards or articles, reference the specific standard name.
- If asked about topics outside IISF's scope, politely redirect.
- Use the available tools to look up Charter content, governance details, and fellowship information.
- Keep responses concise but thorough. Use markdown formatting when helpful.
- Never fabricate statistics or claim IISF certifications that don't exist.`;

const agent = new Agent({
  name: "iisf-assistant",
  instructions: IISF_INSTRUCTIONS,
  model: "anthropic/claude-3-5-sonnet",
  tools: [charterLookupTool, governanceInfoTool, fellowshipInfoTool],
  memory,
});

new VoltAgent({
  agents: {
    agent,
  },
  workflows: {
    researchInquiryWorkflow,
  },
  server: honoServer(),
  logger,
  observability,
  voltOpsClient: new VoltOpsClient({
    publicKey: process.env.VOLTAGENT_PUBLIC_KEY || "",
    secretKey: process.env.VOLTAGENT_SECRET_KEY || "",
  }),
});
