import { NextRequest, NextResponse } from "next/server";
import { resolveAgentServerConfig } from "@/lib/agent-server";

/**
 * Proxy requests to the VoltAgent server.
 * This keeps the agent server address private and lets the frontend
 * call /api/agent instead of calling the agent URL directly.
 */
const {
  agentUrl: AGENT_URL,
  agentSecret: AGENT_SECRET,
  configError: AGENT_CONFIG_ERROR,
} = resolveAgentServerConfig();

async function fetchAgent(path: string, init: RequestInit): Promise<Response> {
  // Compat: some Volt deployments expose routes under /agents/*, others under /api/agents/*.
  const paths = [path, `/api${path}`];
  let fallbackResponse: Response | null = null;

  for (const candidatePath of paths) {
    const response = await fetch(`${AGENT_URL}${candidatePath}`, init);
    if (response.ok) return response;

    if (response.status !== 404 && response.status !== 405) {
      return response;
    }

    fallbackResponse = response;
  }

  // If both candidates failed with 404/405, return the last response for error reporting.
  return fallbackResponse as Response;
}

function normalizeErrorPayload(raw: string): string {
  try {
    const parsed = JSON.parse(raw) as {
      error?: string;
      details?: string;
      message?: string;
    };
    return parsed.details || parsed.error || parsed.message || raw;
  } catch {
    return raw;
  }
}

export async function POST(request: NextRequest) {
  try {
    if (AGENT_CONFIG_ERROR) {
      return NextResponse.json(
        { error: AGENT_CONFIG_ERROR },
        { status: 500 },
      );
    }

    const body = await request.json();

    // Forward to the VoltAgent text generation endpoint
    const agentId = "iisf-assistant";
    const response = await fetchAgent(`/agents/${agentId}/text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AGENT_SECRET}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Agent Proxy] VoltAgent error:", response.status, errorText);
      return NextResponse.json(
        {
          error: "Agent service unavailable",
          details: normalizeErrorPayload(errorText),
          upstreamStatus: response.status,
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[Agent Proxy] Failed to reach agent:", error);
    return NextResponse.json(
      { error: "Agent service unavailable. Please try again later." },
      { status: 503 }
    );
  }
}

export async function GET() {
  try {
    if (AGENT_CONFIG_ERROR) {
      return NextResponse.json(
        { error: AGENT_CONFIG_ERROR },
        { status: 500 },
      );
    }

    const response = await fetchAgent("/agents", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AGENT_SECRET}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Agent service unavailable" },
        { status: 503 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Agent service unavailable" },
      { status: 503 }
    );
  }
}
