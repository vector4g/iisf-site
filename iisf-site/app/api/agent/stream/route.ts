import { NextRequest, NextResponse } from "next/server";

/**
 * Streaming proxy to VoltAgent — forwards SSE from the agent server
 * so the chat widget can render tokens in real time.
 */
const AGENT_URL = (process.env.VOLTAGENT_URL || "http://localhost:3141").replace(/\/$/, "");
const AGENT_SECRET = process.env.IISF_AGENT_SECRET || "";

async function fetchAgent(path: string, init: RequestInit): Promise<Response> {
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
    if (!AGENT_SECRET) {
      return NextResponse.json(
        { error: "IISF_AGENT_SECRET is not configured" },
        { status: 500 },
      );
    }

    const body = await request.json();
    const agentId = "iisf-assistant";

    const response = await fetchAgent(`/agents/${agentId}/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AGENT_SECRET}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok || !response.body) {
      const errorText = await response.text();
      console.error("[Agent Stream] VoltAgent error:", response.status, errorText);
      return NextResponse.json(
        {
          error: "Agent service unavailable",
          details: normalizeErrorPayload(errorText),
          upstreamStatus: response.status,
        },
        { status: response.status },
      );
    }

    // Pipe the SSE stream through to the client
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[Agent Stream] Failed to reach agent:", error);
    return NextResponse.json(
      { error: "Agent service unavailable. Please try again later." },
      { status: 503 }
    );
  }
}
