"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Summary {
  stages: Record<string, number>;
  types: Record<string, number>;
  total: number;
}

const AGENTS = [
  { name: "OpsDirector", model: "Claude 3.5 Sonnet", role: "Supervises all agents, delegates tasks, tracks CRM", color: "cyan" },
  { name: "ContentManager", model: "GPT-4o", role: "Blog posts, CMS content, editorial calendar", color: "emerald" },
  { name: "FundingScout", model: "Claude 3.5 Sonnet", role: "Grants, foundations, VC research & outreach", color: "violet" },
  { name: "BoardRecruiter", model: "GPT-4o", role: "Board candidate identification & outreach", color: "amber" },
  { name: "SEOStrategist", model: "Mistral Large", role: "Keyword strategy, content gaps, on-page SEO", color: "rose" },
  { name: "ResearchDirector", model: "Claude 3.5 Sonnet", role: "Literature reviews, policy briefs, thought leadership", color: "blue" },
] as const;

const STAGE_ORDER = ["identified", "researched", "draft_ready", "outreach_sent", "responded", "meeting_scheduled", "in_progress", "committed", "declined", "on_hold"];
const STAGE_COLORS: Record<string, string> = {
  identified: "bg-slate-600", researched: "bg-blue-600", draft_ready: "bg-indigo-600",
  outreach_sent: "bg-violet-600", responded: "bg-cyan-600", meeting_scheduled: "bg-emerald-600",
  in_progress: "bg-amber-600", committed: "bg-green-500", declined: "bg-red-600", on_hold: "bg-slate-500",
};

export default function OpsDashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    fetch("/api/ops/crm")
      .then((r) => r.json())
      .then((d) => setSummary(d.summary))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Ops Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">IISF Agent Team — real-time pipeline & agent status</p>
      </div>

      {/* Pipeline overview */}
      <section className="rounded-xl border border-slate-800 bg-[#0a0c14] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-200">Pipeline Overview</h2>
          <Link href="/ops/pipeline" className="text-xs text-cyan-400 hover:underline">View full pipeline →</Link>
        </div>
        {summary ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="Total Contacts" value={summary.total} />
              <Stat label="Active" value={(summary.total) - (summary.stages.declined ?? 0) - (summary.stages.on_hold ?? 0)} />
              <Stat label="Committed" value={summary.stages.committed ?? 0} accent />
              <Stat label="In Progress" value={summary.stages.in_progress ?? 0} />
            </div>
            <div className="flex h-4 overflow-hidden rounded-full bg-slate-800">
              {STAGE_ORDER.map((s) => {
                const count = summary.stages[s] ?? 0;
                if (count === 0 || summary.total === 0) return null;
                return (
                  <div
                    key={s}
                    className={`${STAGE_COLORS[s]} transition-all`}
                    style={{ width: `${(count / summary.total) * 100}%` }}
                    title={`${s}: ${count}`}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-slate-500">
              {STAGE_ORDER.map((s) => {
                const count = summary.stages[s] ?? 0;
                if (count === 0) return null;
                return (
                  <span key={s} className="flex items-center gap-1">
                    <span className={`inline-block h-2 w-2 rounded-full ${STAGE_COLORS[s]}`} />
                    {s.replace(/_/g, " ")}: {count}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-600">Loading pipeline data…</p>
        )}
      </section>

      {/* Agent team */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-200">Agent Team</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a) => (
            <div key={a.name} className="rounded-xl border border-slate-800 bg-[#0a0c14] p-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-slate-200">{a.name}</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">{a.role}</p>
              <p className="mt-1 text-[10px] text-slate-600">{a.model}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="grid gap-4 sm:grid-cols-3">
        <QuickAction href="/ops/chat" icon="💬" label="Chat with OpsDirector" desc="Give instructions, ask for status reports" />
        <QuickAction href="/ops/pipeline" icon="🔄" label="Manage Pipeline" desc="View & edit CRM contacts by stage" />
        <QuickAction href="/ops/verify" icon="✅" label="Cross-Check Agents" desc="Verify accuracy with parallel queries" />
      </section>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`text-2xl font-bold ${accent ? "text-green-400" : "text-slate-100"}`}>{value}</p>
    </div>
  );
}

function QuickAction({ href, icon, label, desc }: { href: string; icon: string; label: string; desc: string }) {
  return (
    <Link href={href} className="group rounded-xl border border-slate-800 bg-[#0a0c14] p-5 transition hover:border-cyan-800 hover:bg-[#0c0e18]">
      <span className="text-2xl">{icon}</span>
      <p className="mt-2 text-sm font-semibold text-slate-200 group-hover:text-cyan-400">{label}</p>
      <p className="mt-1 text-xs text-slate-500">{desc}</p>
    </Link>
  );
}

