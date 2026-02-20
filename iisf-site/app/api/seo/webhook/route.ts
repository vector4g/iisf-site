import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://intersectionalsafety.org").replace(/\/$/, "");

type SanityWebhookPayload = {
  _type?: string;
  operation?: string;
  transition?: string;
  slug?: string | { current?: string } | null;
  previousSlug?: string | { current?: string } | null;
  paths?: string[];
  document?: {
    _type?: string;
    slug?: string | { current?: string } | null;
  };
  before?: {
    slug?: string | { current?: string } | null;
  };
};

function extractSlug(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") return value.trim() || null;
  if (
    typeof value === "object" &&
    value !== null &&
    "current" in value &&
    typeof (value as { current?: unknown }).current === "string"
  ) {
    const current = (value as { current: string }).current.trim();
    return current || null;
  }
  return null;
}

function normalizePath(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  let path = trimmed;
  try {
    path = new URL(trimmed).pathname;
  } catch {
    // Value is already a path.
  }

  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/+$/, "");
  return path || "/";
}

function isIndexablePath(path: string) {
  if (path === "/") return true;
  if (path.startsWith("/api")) return false;
  if (path.startsWith("/ops")) return false;
  if (path.startsWith("/studio")) return false;
  if (path.startsWith("/_next")) return false;
  if (path.endsWith(".xml")) return false;
  return true;
}

function isAuthorized(request: NextRequest) {
  const configuredSecret = process.env.SANITY_WEBHOOK_SECRET;
  if (!configuredSecret) {
    return {
      ok: false,
      reason: "SANITY_WEBHOOK_SECRET is not configured",
    };
  }

  const authorization = request.headers.get("authorization");
  const bearerToken = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : "";
  const headerSecret = request.headers.get("x-webhook-secret")?.trim() || "";
  const querySecret = request.nextUrl.searchParams.get("secret")?.trim() || "";

  const ok =
    bearerToken === configuredSecret ||
    headerSecret === configuredSecret ||
    querySecret === configuredSecret;

  return {
    ok,
    reason: ok ? null : "Invalid webhook secret",
  };
}

async function submitIndexNow(urlList: string[]) {
  const apiKey = process.env.INDEXNOW_API_KEY;
  if (!apiKey || urlList.length === 0) {
    return {
      attempted: false,
      reason: !apiKey ? "INDEXNOW_API_KEY is not configured" : "No eligible URLs",
    };
  }

  const host = new URL(SITE_URL).hostname;
  const keyLocation =
    process.env.INDEXNOW_KEY_LOCATION ||
    `${SITE_URL}/${apiKey}.txt`;

  const response = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host,
      key: apiKey,
      keyLocation,
      urlList,
    }),
  });

  return {
    attempted: true,
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
  };
}

export async function POST(request: NextRequest) {
  const auth = isAuthorized(request);
  if (!auth.ok) {
    return NextResponse.json(
      { ok: false, error: auth.reason },
      { status: 401 },
    );
  }

  let payload: SanityWebhookPayload;
  try {
    payload = (await request.json()) as SanityWebhookPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload" },
      { status: 400 },
    );
  }

  const type = payload._type || payload.document?._type || "";
  const slug = extractSlug(payload.slug) || extractSlug(payload.document?.slug);
  const previousSlug =
    extractSlug(payload.previousSlug) || extractSlug(payload.before?.slug);

  const paths = new Set<string>();
  paths.add("/");
  paths.add("/sitemap.xml");

  for (const candidate of payload.paths ?? []) {
    const normalized = normalizePath(candidate);
    if (normalized) paths.add(normalized);
  }

  if (type === "post" || slug || previousSlug) {
    paths.add("/blog");
    paths.add("/rss.xml");
    paths.add("/feed.xml");
    if (slug) paths.add(`/blog/${slug}`);
    if (previousSlug) paths.add(`/blog/${previousSlug}`);
  }

  const revalidated: string[] = [];
  for (const path of paths) {
    revalidatePath(path);
    revalidated.push(path);
  }

  const indexNowUrls = revalidated
    .filter((path) => isIndexablePath(path))
    .map((path) => `${SITE_URL}${path === "/" ? "" : path}`);

  const indexNow = await submitIndexNow(indexNowUrls);

  return NextResponse.json({
    ok: true,
    type: type || null,
    operation: payload.operation || payload.transition || null,
    revalidated,
    indexNow,
  });
}

