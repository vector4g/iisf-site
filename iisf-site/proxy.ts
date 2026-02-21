import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy: subdomain routing + ops auth
 *
 * ops.intersectionalsafety.org  →  /ops/*   (password-gated)
 * intersectionalsafety.org      →  public site (passthrough)
 *
 * Auth: ops routes require a session cookie set via /ops/login.
 */

const OPS_HOSTS = ["ops.intersectionalsafety.org", "ops.localhost:3000"];

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  // ── Subdomain rewrite: ops.* → /ops/* ──────────────────────────
  const isOpsHost = OPS_HOSTS.some((h) => host.startsWith(h.split(":")[0]));
  if (isOpsHost && !pathname.startsWith("/ops") && !pathname.startsWith("/api/ops") && !pathname.startsWith("/_next")) {
    const url = request.nextUrl.clone();
    url.pathname = `/ops${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  // ── Auth gate for /ops/* (except /ops/login and API routes) ────
  if (pathname.startsWith("/ops") && !pathname.startsWith("/ops/login") && !pathname.startsWith("/api/ops")) {
    const token = request.cookies.get("ops_session")?.value;
    const secret = process.env.OPS_PASSWORD;
    if (secret && token !== secret) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/ops/login";
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files
    "/((?!_next/static|_next/image|favicon.ico|iisf-logo.png|.*\\.svg$).*)",
  ],
};
