import { NextRequest, NextResponse } from "next/server";

/**
 * Cross-verification endpoint.
 * Sends the same prompt to multiple agents in parallel, returning all results
 * so the user can compare and spot discrepancies.
 *
 * POST /api/ops/verify
 * { input: string, agents: string[] }
 *
 * Available agents: iisf-ops, iisf-assistant
 * Sub-agents (via iisf-ops): ContentManager, FundingScout, BoardRecruiter,
 *   SEOStrategist, ResearchDirector
 */

const AGENT_URL = process.env.VOLTAGENT_URL || "http://localhost:3141";
const AGENT_SECRET = process.env.IISF_AGENT_SECRET || "";

async function queryAgent(agentId: string, input: string): Promise<{ agent: string; response: string; durationMs: number; error?: string }> {
  const start = Date.now();
  try {
    if (!AGENT_SECRET) {
      return {
        agent: agentId,
        response: "",
        durationMs: Date.now() - start,
        error: "IISF_AGENT_SECRET is not configured",
      };
    }

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    headers["Authorization"] = `Bearer ${AGENT_SECRET}`;

    const res = await fetch(`${AGENT_URL}/agents/${agentId}/text`, {
      method: "POST",
      headers,
      body: JSON.stringify({ input, userId: "ops-verify" }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { agent: agentId, response: "", durationMs: Date.now() - start, error: errText };
    }

    const data = await res.json();
    const text = data?.text || data?.output || data?.message || "";
    return { agent: agentId, response: text, durationMs: Date.now() - start };
  } catch (err) {
    return { agent: agentId, response: "", durationMs: Date.now() - start, error: String(err) };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { input, agents } = await request.json();

    if (!input || typeof input !== "string") {
      return NextResponse.json({ error: "input is required" }, { status: 400 });
    }

    // Default: query both top-level agents
    const agentIds: string[] = agents?.length ? agents : ["iisf-ops", "iisf-assistant"];

    // Parallel execution
    const results = await Promise.all(agentIds.map((id: string) => queryAgent(id, input)));

    // Simple discrepancy detection — compare response lengths and keyword overlap
    const responses = results.filter((r) => !r.error).map((r) => r.response.toLowerCase());
    let agreement = "high";
    if (responses.length >= 2) {
      const words0 = new Set(responses[0].split(/\s+/).filter((w) => w.length > 4));
      const words1 = new Set(responses[1].split(/\s+/).filter((w) => w.length > 4));
      const intersection = [...words0].filter((w) => words1.has(w));
      const overlap = intersection.length / Math.max(words0.size, words1.size, 1);
      if (overlap < 0.2) agreement = "low";
      else if (overlap < 0.4) agreement = "medium";
    }

    return NextResponse.json({
      input,
      results,
      agreement,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Verify] Error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
