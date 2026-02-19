import { createTool } from "@voltagent/core";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────────────────────
// CRM — Supabase Postgres-backed pipeline tracker with RLS
// Used by Funding Scout, Board Recruiter, and Ops Director
// ─────────────────────────────────────────────────────────────────────────────

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
  return createClient(url, key);
}

// ── Tool 1: Add a contact ────────────────────────────────────────────────────

export const crmAddContactTool = createTool({
  name: "crm_add_contact",
  description:
    "Add a new contact to the IISF fundraising/outreach CRM (Supabase Postgres). Types: grant, foundation, vc, impact_investor, affinity_vc, enterprise, board_candidate, partner. Stages: identified, researched, draft_ready, outreach_sent, responded, meeting_scheduled, in_progress, committed, declined, on_hold.",
  parameters: z.object({
    name: z.string().describe("Contact or fund name"),
    organization: z.string().optional().describe("Parent org if different from name"),
    type: z.enum(["grant", "foundation", "vc", "impact_investor", "affinity_vc", "enterprise", "board_candidate", "partner"]),
    category: z.string().optional().describe("Ops-intel section key, e.g. 'funding_grants_federal'"),
    email: z.string().optional(),
    url: z.string().optional(),
    stage: z.enum(["identified", "researched", "draft_ready", "outreach_sent", "responded", "meeting_scheduled", "in_progress", "committed", "declined", "on_hold"]).optional(),
    priority: z.number().min(1).max(5).optional().describe("1=highest, 5=lowest"),
    amount_target: z.string().optional().describe("e.g. '$500K-$1M'"),
    alignment_score: z.number().min(1).max(5).optional(),
    notes: z.string().optional(),
    next_action: z.string().optional(),
    next_action_date: z.string().optional().describe("ISO date, e.g. 2026-03-01"),
  }),
  execute: async (args) => {
    const sb = getSupabase();
    const { data, error } = await sb.from("contacts").insert({
      name: args.name,
      organization: args.organization ?? null,
      type: args.type,
      category: args.category ?? null,
      email: args.email ?? null,
      url: args.url ?? null,
      stage: args.stage ?? "identified",
      priority: args.priority ?? 3,
      amount_target: args.amount_target ?? null,
      alignment_score: args.alignment_score ?? null,
      notes: args.notes ?? null,
      next_action: args.next_action ?? null,
      next_action_date: args.next_action_date ?? null,
    }).select("id, name, stage").single();
    if (error) return { error: error.message };
    return { success: true, id: data.id, name: data.name, stage: data.stage };
  },
});

// ── Tool 2: Update contact status ────────────────────────────────────────────

export const crmUpdateStatusTool = createTool({
  name: "crm_update_status",
  description:
    "Update the pipeline stage, priority, next action, or notes for an existing CRM contact. Provide the contact ID or name.",
  parameters: z.object({
    contact_id: z.string().optional().describe("Contact UUID. If omitted, searches by name."),
    name: z.string().optional().describe("Contact name to search for (if no ID)"),
    stage: z.enum(["identified", "researched", "draft_ready", "outreach_sent", "responded", "meeting_scheduled", "in_progress", "committed", "declined", "on_hold"]).optional(),
    priority: z.number().min(1).max(5).optional(),
    next_action: z.string().optional(),
    next_action_date: z.string().optional(),
    notes: z.string().optional().describe("Appended to existing notes"),
  }),
  execute: async (args) => {
    const sb = getSupabase();

    // Resolve contact ID
    let id = args.contact_id;
    if (!id && args.name) {
      const { data } = await sb.from("contacts").select("id").ilike("name", `%${args.name}%`).limit(1).single();
      if (!data) return { error: `No contact found matching "${args.name}"` };
      id = data.id;
    }
    if (!id) return { error: "Provide contact_id or name" };

    // Build update payload
    const updates: Record<string, unknown> = {};
    if (args.stage) updates.stage = args.stage;
    if (args.priority) updates.priority = args.priority;
    if (args.next_action) updates.next_action = args.next_action;
    if (args.next_action_date) updates.next_action_date = args.next_action_date;
    if (args.notes) {
      // Append to existing notes
      const { data: existing } = await sb.from("contacts").select("notes").eq("id", id).single();
      const prev = existing?.notes ?? "";
      updates.notes = prev ? `${prev}\n${args.notes}` : args.notes;
    }

    if (Object.keys(updates).length === 0) return { error: "No fields to update" };

    const { error } = await sb.from("contacts").update(updates).eq("id", id);
    if (error) return { error: error.message };
    return { success: true, id, updated: Object.keys(updates) };
  },
});

// ── Tool 3: Log an interaction ───────────────────────────────────────────────

export const crmAddNoteTool = createTool({
  name: "crm_add_note",
  description:
    "Log an interaction with a CRM contact — email sent, meeting, call, application submitted, or general note.",
  parameters: z.object({
    contact_id: z.string().optional().describe("Contact UUID. If omitted, searches by name."),
    name: z.string().optional().describe("Contact name to search for"),
    type: z.enum(["note", "email_sent", "email_received", "meeting", "call", "application_submitted"]),
    summary: z.string().describe("What happened"),
  }),
  execute: async (args) => {
    const sb = getSupabase();

    let contactId = args.contact_id;
    if (!contactId && args.name) {
      const { data } = await sb.from("contacts").select("id").ilike("name", `%${args.name}%`).limit(1).single();
      if (!data) return { error: `No contact found matching "${args.name}"` };
      contactId = data.id;
    }
    if (!contactId) return { error: "Provide contact_id or name" };

    const { data, error } = await sb.from("interactions").insert({
      contact_id: contactId,
      type: args.type,
      summary: args.summary,
    }).select("id").single();
    if (error) return { error: error.message };
    return { success: true, interactionId: data.id, contactId, type: args.type };
  },
});

// ── Tool 4: Query the pipeline ───────────────────────────────────────────────

export const crmQueryTool = createTool({
  name: "crm_query",
  description:
    "Search and list CRM contacts. Filter by type, stage, priority, or free-text name search. Returns contacts with their latest interaction. Use with no filters to get the full pipeline summary.",
  parameters: z.object({
    type: z.enum(["grant", "foundation", "vc", "impact_investor", "affinity_vc", "enterprise", "board_candidate", "partner"]).optional(),
    stage: z.enum(["identified", "researched", "draft_ready", "outreach_sent", "responded", "meeting_scheduled", "in_progress", "committed", "declined", "on_hold"]).optional(),
    min_priority: z.number().min(1).max(5).optional().describe("Filter contacts with priority <= this value (1=highest)"),
    search: z.string().optional().describe("Free-text search on name, organization, or notes"),
    limit: z.number().min(1).max(100).optional().describe("Max results. Default: 50"),
  }),
  execute: async (args) => {
    const sb = getSupabase();
    let query = sb.from("contacts").select("*");

    if (args.type) query = query.eq("type", args.type);
    if (args.stage) query = query.eq("stage", args.stage);
    if (args.min_priority) query = query.lte("priority", args.min_priority);
    if (args.search) query = query.or(`name.ilike.%${args.search}%,organization.ilike.%${args.search}%,notes.ilike.%${args.search}%`);

    query = query.order("priority", { ascending: true }).order("updated_at", { ascending: false }).limit(args.limit ?? 50);

    const { data: contacts, error } = await query;
    if (error) return { error: error.message };
    if (!contacts || contacts.length === 0) {
      return { count: 0, contacts: [], message: "No contacts found matching filters." };
    }

    // Get interaction counts + latest interaction per contact
    const ids = contacts.map(c => c.id);
    const { data: interactions } = await sb.from("interactions").select("contact_id, summary, created_at").in("contact_id", ids).order("created_at", { ascending: false });

    const interactionMap = new Map<string, { count: number; last: string | null }>();
    for (const ix of interactions ?? []) {
      const existing = interactionMap.get(ix.contact_id);
      if (existing) {
        existing.count++;
      } else {
        interactionMap.set(ix.contact_id, { count: 1, last: ix.summary });
      }
    }

    // Pipeline summary (stage counts across ALL contacts)
    const { data: allContacts } = await sb.from("contacts").select("stage");
    const stageSummary: Record<string, number> = {};
    for (const c of allContacts ?? []) {
      stageSummary[c.stage] = (stageSummary[c.stage] ?? 0) + 1;
    }

    return {
      count: contacts.length,
      pipeline_summary: stageSummary,
      contacts: contacts.map(c => {
        const ix = interactionMap.get(c.id);
        return {
          id: c.id,
          name: c.name,
          organization: c.organization,
          type: c.type,
          stage: c.stage,
          priority: c.priority,
          amount_target: c.amount_target,
          alignment_score: c.alignment_score,
          next_action: c.next_action,
          next_action_date: c.next_action_date,
          interactions: ix?.count ?? 0,
          last_interaction: ix?.last ?? null,
          updated_at: c.updated_at,
        };
      }),
    };
  },
});

