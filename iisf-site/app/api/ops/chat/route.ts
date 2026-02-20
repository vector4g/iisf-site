import { NextRequest, NextResponse } from "next/server";

/**
 * Streaming proxy to the iisf-ops agent (OpsDirector).
 * Forwards SSE from VoltAgent so the ops chat can render tokens in real time.
 */
const AGENT_URL = process.env.VOLTAGENT_URL || "http://localhost:3141";
const AGENT_SECRET = process.env.IISF_AGENT_SECRET || "";

export async function POST(request: NextRequest) {
  try {
    if (!AGENT_SECRET) {
      return NextResponse.json(
        { error: "IISF_AGENT_SECRET is not configured" },
        { status: 500 },
      );
    }

    const body = await request.json();
    const agentId = "iisf-ops";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AGENT_SECRET}`,
    };

    const response = await fetch(`${AGENT_URL}/agents/${agentId}/stream`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        input: body.input,
        userId: body.userId || "ops-dashboard",
        conversationId: body.conversationId,
        stream: true,
      }),
    });

    if (!response.ok || !response.body) {
      const errorText = await response.text();
      console.error("[Ops Chat] VoltAgent error:", response.status, errorText);
      return NextResponse.json(
        { error: "Agent service unavailable", details: errorText },
        { status: response.status },
      );
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[Ops Chat] Failed to reach agent:", error);
    return NextResponse.json(
      { error: "Agent service unavailable. Please try again later." },
      { status: 503 },
    );
  }
}
