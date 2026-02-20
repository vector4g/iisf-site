"use client";

import { useEffect, useState, useCallback } from "react";

interface Contact {
  id: string;
  name: string;
  organization: string | null;
  type: string;
  stage: string;
  priority: number;
  amount_target: string | null;
  alignment_score: number | null;
  notes: string | null;
  next_action: string | null;
  next_action_date: string | null;
  updated_at: string;
  interactions: Array<{ id: string; type: string; summary: string; created_at: string }>;
}

const STAGES = [
  "identified", "researched", "draft_ready", "outreach_sent",
  "responded", "meeting_scheduled", "in_progress", "committed", "declined", "on_hold",
];

const STAGE_COLORS: Record<string, string> = {
  identified: "border-slate-600", researched: "border-blue-600", draft_ready: "border-indigo-600",
  outreach_sent: "border-violet-600", responded: "border-cyan-600", meeting_scheduled: "border-emerald-600",
  in_progress: "border-amber-600", committed: "border-green-500", declined: "border-red-600", on_hold: "border-slate-500",
};

const TYPE_BADGES: Record<string, string> = {
  grant: "bg-emerald-900/50 text-emerald-300", foundation: "bg-blue-900/50 text-blue-300",
  vc: "bg-violet-900/50 text-violet-300", impact_investor: "bg-cyan-900/50 text-cyan-300",
  affinity_vc: "bg-pink-900/50 text-pink-300", enterprise: "bg-amber-900/50 text-amber-300",
  board_candidate: "bg-rose-900/50 text-rose-300", partner: "bg-indigo-900/50 text-indigo-300",
};

const PRIORITY_ICONS = ["", "🔴", "🟠", "🟡", "🟢", "⚪"];

export default function PipelinePage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filterType, setFilterType] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Contact | null>(null);

  const fetchContacts = useCallback(async (nextFilterType: string, nextSearch: string): Promise<Contact[]> => {
    const params = new URLSearchParams();
    if (nextFilterType) params.set("type", nextFilterType);
    if (nextSearch) params.set("search", nextSearch);
    const res = await fetch(`/api/ops/crm?${params}`);
    const data = await res.json();
    return data.contacts ?? [];
  }, []);

  useEffect(() => {
    let active = true;
    void fetchContacts(filterType, search).then((nextContacts) => {
      if (active) setContacts(nextContacts);
    });
    return () => {
      active = false;
    };
  }, [fetchContacts, filterType, search]);

  const moveStage = async (id: string, stage: string) => {
    await fetch("/api/ops/crm", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, stage }),
    });
    const nextContacts = await fetchContacts(filterType, search);
    setContacts(nextContacts);
  };

  const grouped = STAGES.reduce<Record<string, Contact[]>>((acc, s) => {
    acc[s] = contacts.filter((c) => c.stage === s);
    return acc;
  }, {});

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-[#080a12] px-6 py-3">
        <div>
          <h1 className="text-lg font-bold text-slate-100">Pipeline</h1>
          <p className="text-xs text-slate-500">{contacts.length} contacts across {STAGES.filter((s) => grouped[s].length > 0).length} stages</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…" className="rounded-lg border border-slate-700/50 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none w-48"
          />
          <select
            value={filterType} onChange={(e) => setFilterType(e.target.value)}
            className="rounded-lg border border-slate-700/50 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">All types</option>
            {Object.keys(TYPE_BADGES).map((t) => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
          </select>
        </div>
      </div>

      {/* Kanban */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full gap-3 p-4" style={{ minWidth: `${STAGES.length * 240}px` }}>
          {STAGES.map((stage) => (
            <div key={stage} className="flex w-56 shrink-0 flex-col rounded-lg border border-slate-800 bg-[#0a0c14]">
              <div className={`border-t-2 ${STAGE_COLORS[stage]} rounded-t-lg px-3 py-2`}>
                <p className="text-xs font-semibold text-slate-300">{stage.replace(/_/g, " ").toUpperCase()}</p>
                <p className="text-[10px] text-slate-600">{grouped[stage].length} contacts</p>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto p-2">
                {grouped[stage].map((c) => (
                  <button
                    key={c.id} onClick={() => setSelected(c)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/50 p-2.5 text-left transition hover:border-cyan-800"
                  >
                    <p className="text-xs font-semibold text-slate-200 truncate">{PRIORITY_ICONS[c.priority]} {c.name}</p>
                    {c.organization && <p className="text-[10px] text-slate-500 truncate">{c.organization}</p>}
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${TYPE_BADGES[c.type] ?? "bg-slate-800 text-slate-400"}`}>
                        {c.type.replace(/_/g, " ")}
                      </span>
                      {c.amount_target && <span className="text-[9px] text-slate-500">{c.amount_target}</span>}
                    </div>
                    {c.next_action && <p className="mt-1.5 text-[10px] text-cyan-400/70 truncate">→ {c.next_action}</p>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <ContactDrawer contact={selected} onClose={() => setSelected(null)} onMoveStage={(stage) => { moveStage(selected.id, stage); setSelected(null); }} />
      )}
    </div>
  );
}



function ContactDrawer({ contact, onClose, onMoveStage }: { contact: Contact; onClose: () => void; onMoveStage: (stage: string) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={onClose}>
      <div className="h-full w-96 overflow-y-auto border-l border-slate-800 bg-[#0a0c14] p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-100">{contact.name}</h2>
            {contact.organization && <p className="text-sm text-slate-400">{contact.organization}</p>}
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300">✕</button>
        </div>

        <div className="mt-4 space-y-3">
          <Field label="Type" value={contact.type.replace(/_/g, " ")} />
          <Field label="Stage" value={contact.stage.replace(/_/g, " ")} />
          <Field label="Priority" value={`${PRIORITY_ICONS[contact.priority]} P${contact.priority}`} />
          {contact.amount_target && <Field label="Target Amount" value={contact.amount_target} />}
          {contact.alignment_score && <Field label="Alignment" value={`${"★".repeat(contact.alignment_score)}${"☆".repeat(5 - contact.alignment_score)}`} />}
          {contact.next_action && <Field label="Next Action" value={contact.next_action} />}
          {contact.next_action_date && <Field label="Due Date" value={contact.next_action_date} />}
          {contact.notes && <Field label="Notes" value={contact.notes} />}
        </div>

        {/* Move stage */}
        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold text-slate-400">Move to stage:</p>
          <div className="flex flex-wrap gap-2">
            {STAGES.filter((s) => s !== contact.stage).map((s) => (
              <button
                key={s} onClick={() => onMoveStage(s)}
                className="rounded-md border border-slate-700 px-2 py-1 text-[10px] text-slate-400 transition hover:border-cyan-600 hover:text-cyan-400"
              >
                {s.replace(/_/g, " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Interactions */}
        {contact.interactions?.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold text-slate-400">Interactions ({contact.interactions.length})</p>
            <div className="space-y-2">
              {contact.interactions.map((ix) => (
                <div key={ix.id} className="rounded-lg border border-slate-800 bg-slate-900/50 p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-cyan-400">{ix.type.replace(/_/g, " ")}</span>
                    <span className="text-[9px] text-slate-600">{new Date(ix.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-300">{ix.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-medium text-slate-500 uppercase">{label}</p>
      <p className="text-sm text-slate-200 whitespace-pre-wrap">{value}</p>
    </div>
  );
}
