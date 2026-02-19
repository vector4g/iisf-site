import { createTool } from "@voltagent/core";
import { z } from "zod";
import { createClient, type Client, type InValue } from "@libsql/client";

// ─────────────────────────────────────────────────────────────────────────────
// Lightweight CRM — LibSQL/SQLite-backed pipeline tracker
// Used by Funding Scout, Board Recruiter, and Ops Director
// ─────────────────────────────────────────────────────────────────────────────

let db: Client | null = null;

function getDb(): Client {
  if (!db) {
    db = createClient({ url: "file:./.voltagent/crm.db" });
  }
  return db;
}

async function ensureTables() {
  const client = getDb();
  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      organization TEXT,
      type TEXT NOT NULL,
      category TEXT,
      email TEXT,
      url TEXT,
      stage TEXT DEFAULT 'identified',
      priority INTEGER DEFAULT 3,
      amount_target TEXT,
      alignment_score INTEGER,
      notes TEXT,
      next_action TEXT,
      next_action_date TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS interactions (
      id TEXT PRIMARY KEY,
      contact_id TEXT NOT NULL,
      type TEXT NOT NULL,
      summary TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (contact_id) REFERENCES contacts(id)
    );
  `);
}

let tablesReady: Promise<void> | null = null;
function init() {
  if (!tablesReady) tablesReady = ensureTables();
  return tablesReady;
}

function uid() {
  return `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

// ── Tool 1: Add a contact ────────────────────────────────────────────────────

export const crmAddContactTool = createTool({
  name: "crm_add_contact",
  description:
    "Add a new contact to the IISF fundraising/outreach CRM. Types: grant, foundation, vc, impact_investor, affinity_vc, enterprise, board_candidate, partner. Stages: identified, researched, draft_ready, outreach_sent, responded, meeting_scheduled, in_progress, committed, declined, on_hold.",
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
    await init();
    const id = uid();
    const client = getDb();
    await client.execute({
      sql: `INSERT INTO contacts (id, name, organization, type, category, email, url, stage, priority, amount_target, alignment_score, notes, next_action, next_action_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [id, args.name, args.organization ?? null, args.type, args.category ?? null, args.email ?? null, args.url ?? null, args.stage ?? "identified", args.priority ?? 3, args.amount_target ?? null, args.alignment_score ?? null, args.notes ?? null, args.next_action ?? null, args.next_action_date ?? null],
    });
    return { success: true, id, name: args.name, stage: args.stage ?? "identified" };
  },
});

// ── Tool 2: Update contact status ────────────────────────────────────────────

export const crmUpdateStatusTool = createTool({
  name: "crm_update_status",
  description:
    "Update the pipeline stage, priority, next action, or notes for an existing CRM contact. Provide the contact ID or name.",
  parameters: z.object({
    contact_id: z.string().optional().describe("Contact ID (c_xxx). If omitted, searches by name."),
    name: z.string().optional().describe("Contact name to search for (if no ID)"),
    stage: z.enum(["identified", "researched", "draft_ready", "outreach_sent", "responded", "meeting_scheduled", "in_progress", "committed", "declined", "on_hold"]).optional(),
    priority: z.number().min(1).max(5).optional(),
    next_action: z.string().optional(),
    next_action_date: z.string().optional(),
    notes: z.string().optional().describe("Appended to existing notes"),
  }),
  execute: async (args) => {
    await init();
    const client = getDb();

    // Resolve contact ID
    let id = args.contact_id;
    if (!id && args.name) {
      const row = await client.execute({ sql: "SELECT id FROM contacts WHERE name LIKE ? LIMIT 1", args: [`%${args.name}%`] });
      if (row.rows.length === 0) return { error: `No contact found matching "${args.name}"` };
      id = row.rows[0].id as string;
    }
    if (!id) return { error: "Provide contact_id or name" };

    const sets: string[] = [];
    const vals: InValue[] = [];
    if (args.stage) { sets.push("stage = ?"); vals.push(args.stage); }
    if (args.priority) { sets.push("priority = ?"); vals.push(args.priority); }
    if (args.next_action) { sets.push("next_action = ?"); vals.push(args.next_action); }
    if (args.next_action_date) { sets.push("next_action_date = ?"); vals.push(args.next_action_date); }
    if (args.notes) { sets.push("notes = COALESCE(notes || '\n', '') || ?"); vals.push(args.notes); }
    sets.push("updated_at = datetime('now')");
    vals.push(id);

    await client.execute({ sql: `UPDATE contacts SET ${sets.join(", ")} WHERE id = ?`, args: vals });
    return { success: true, id, updated: Object.keys(args).filter(k => k !== "contact_id" && k !== "name") };
  },
});

// ── Tool 3: Log an interaction ───────────────────────────────────────────────

export const crmAddNoteTool = createTool({
  name: "crm_add_note",
  description:
    "Log an interaction with a CRM contact — email sent, meeting, call, application submitted, or general note.",
  parameters: z.object({
    contact_id: z.string().optional().describe("Contact ID (c_xxx). If omitted, searches by name."),
    name: z.string().optional().describe("Contact name to search for"),
    type: z.enum(["note", "email_sent", "email_received", "meeting", "call", "application_submitted"]),
    summary: z.string().describe("What happened"),
  }),
  execute: async (args) => {
    await init();
    const client = getDb();

    let contactId = args.contact_id;
    if (!contactId && args.name) {
      const row = await client.execute({ sql: "SELECT id FROM contacts WHERE name LIKE ? LIMIT 1", args: [`%${args.name}%`] });
      if (row.rows.length === 0) return { error: `No contact found matching "${args.name}"` };
      contactId = row.rows[0].id as string;
    }
    if (!contactId) return { error: "Provide contact_id or name" };

    const id = `i_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    await client.execute({
      sql: "INSERT INTO interactions (id, contact_id, type, summary) VALUES (?, ?, ?, ?)",
      args: [id, contactId, args.type, args.summary],
    });
    return { success: true, interactionId: id, contactId, type: args.type };
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
    await init();
    const client = getDb();

    const wheres: string[] = [];
    const vals: InValue[] = [];

    if (args.type) { wheres.push("c.type = ?"); vals.push(args.type); }
    if (args.stage) { wheres.push("c.stage = ?"); vals.push(args.stage); }
    if (args.min_priority) { wheres.push("c.priority <= ?"); vals.push(args.min_priority); }
    if (args.search) {
      wheres.push("(c.name LIKE ? OR c.organization LIKE ? OR c.notes LIKE ?)");
      vals.push(`%${args.search}%`, `%${args.search}%`, `%${args.search}%`);
    }

    const where = wheres.length > 0 ? `WHERE ${wheres.join(" AND ")}` : "";
    const limit = args.limit ?? 50;
    vals.push(limit);

    const result = await client.execute({
      sql: `SELECT c.*,
              (SELECT COUNT(*) FROM interactions i WHERE i.contact_id = c.id) as interaction_count,
              (SELECT i.summary FROM interactions i WHERE i.contact_id = c.id ORDER BY i.created_at DESC LIMIT 1) as last_interaction
            FROM contacts c ${where}
            ORDER BY c.priority ASC, c.updated_at DESC
            LIMIT ?`,
      args: vals,
    });

    if (result.rows.length === 0) {
      return { count: 0, contacts: [], message: "No contacts found matching filters." };
    }

    // Pipeline summary
    const stageCountResult = await client.execute({ sql: "SELECT stage, COUNT(*) as cnt FROM contacts GROUP BY stage ORDER BY cnt DESC", args: [] });
    const stageSummary = Object.fromEntries(stageCountResult.rows.map(r => [r.stage, r.cnt]));

    return {
      count: result.rows.length,
      pipeline_summary: stageSummary,
      contacts: result.rows.map(r => ({
        id: r.id,
        name: r.name,
        organization: r.organization,
        type: r.type,
        stage: r.stage,
        priority: r.priority,
        amount_target: r.amount_target,
        alignment_score: r.alignment_score,
        next_action: r.next_action,
        next_action_date: r.next_action_date,
        interactions: r.interaction_count,
        last_interaction: r.last_interaction,
        updated_at: r.updated_at,
      })),
    };
  },
});

