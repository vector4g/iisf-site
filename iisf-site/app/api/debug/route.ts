import { NextResponse } from "next/server";
import { resolveAgentServerConfig } from "@/lib/agent-server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const {
    agentUrl,
    usesLocalhost,
    urlSource,
    configError,
  } = resolveAgentServerConfig();

  return NextResponse.json({
    sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'MISSING',
    sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'MISSING',
    sanityApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || 'MISSING',
    resendApiKey: process.env.RESEND_API_KEY ? 'SET' : 'MISSING',
    voltagentUrl: agentUrl || 'MISSING',
    voltagentUrlUsesLocalhost: usesLocalhost,
    voltagentUrlSource: urlSource,
    voltagentConfigError: configError,
    iisfAgentSecret: process.env.IISF_AGENT_SECRET ? 'SET' : 'MISSING',
    nodeEnv: process.env.NODE_ENV,
  });
}
