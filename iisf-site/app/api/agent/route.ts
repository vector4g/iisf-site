import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy requests to the VoltAgent server running on localhost:3141.
 * This keeps the agent server address private and lets the frontend
 * call /api/agent instead of hitting port 3141 directly.
 */
const AGENT_URL = process.env.VOLTAGENT_URL || "http://localhost:3141";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Forward to the VoltAgent text generation endpoint
    const agentId = "iisf-assistant";
    const response = await fetch(`${AGENT_URL}/agents/${agentId}/text`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Agent Proxy] VoltAgent error:", response.status, errorText);
      return NextResponse.json(
        { error: "Agent service unavailable", details: errorText },
        { status: response.status }
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
    const response = await fetch(`${AGENT_URL}/agents`, {
      headers: { "Content-Type": "application/json" },
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

