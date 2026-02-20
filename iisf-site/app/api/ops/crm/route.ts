import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

/** GET /api/ops/crm — pipeline data for the dashboard */
export async function GET(request: NextRequest) {
  const sb = getSupabase();
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type");
  const stage = searchParams.get("stage");
  const search = searchParams.get("search");

  let query = sb.from("contacts").select("*, interactions:interactions(id, type, summary, created_at)");

  if (type) query = query.eq("type", type);
  if (stage) query = query.eq("stage", stage);
  if (search) query = query.or(`name.ilike.%${search}%,organization.ilike.%${search}%,notes.ilike.%${search}%`);

  query = query.order("priority", { ascending: true }).order("updated_at", { ascending: false }).limit(100);

  const { data: contacts, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Stage summary
  const { data: allContacts } = await sb.from("contacts").select("stage, type");
  const stageSummary: Record<string, number> = {};
  const typeSummary: Record<string, number> = {};
  for (const c of allContacts ?? []) {
    stageSummary[c.stage] = (stageSummary[c.stage] ?? 0) + 1;
    typeSummary[c.type] = (typeSummary[c.type] ?? 0) + 1;
  }

  return NextResponse.json({
    contacts: contacts ?? [],
    summary: { stages: stageSummary, types: typeSummary, total: allContacts?.length ?? 0 },
  });
}

/** PATCH /api/ops/crm — update a contact */
export async function PATCH(request: NextRequest) {
  const sb = getSupabase();
  const { id, ...updates } = await request.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const { error } = await sb.from("contacts").update(updates).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

