import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'MISSING',
    sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'MISSING',
    sanityApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || 'MISSING',
    resendApiKey: process.env.RESEND_API_KEY ? 'SET' : 'MISSING',
    nodeEnv: process.env.NODE_ENV,
  });
}

