import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const voltagentUrl = process.env.VOLTAGENT_URL;
  return NextResponse.json({
    sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'MISSING',
    sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'MISSING',
    sanityApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || 'MISSING',
    resendApiKey: process.env.RESEND_API_KEY ? 'SET' : 'MISSING',
    voltagentUrl: voltagentUrl || 'MISSING',
    voltagentUrlUsesLocalhost: voltagentUrl ? /localhost|127\.0\.0\.1/.test(voltagentUrl) : null,
    iisfAgentSecret: process.env.IISF_AGENT_SECRET ? 'SET' : 'MISSING',
    nodeEnv: process.env.NODE_ENV,
  });
}
