"use client";

import { useState } from "react";

interface AgentResult {
  agent: string;
  response: string;
  durationMs: number;
  error?: string;
}

interface VerifyResponse {
  input: string;
  results: AgentResult[];
  agreement: "high" | "medium" | "low";
  timestamp: string;
}

const AGENT_OPTIONS = [
  { id: "iisf-ops", label: "OpsDirector (Claude)", desc: "Full ops team with CRM access" },
  { id: "iisf-assistant", label: "IISF Assistant (Claude)", desc: "Public-facing Charter expert" },
];

const AGREEMENT_COLORS = {
  high: "text-green-400 bg-green-900/20 border-green-700/30",
  medium: "text-amber-400 bg-amber-900/20 border-amber-700/30",
  low: "text-red-400 bg-red-900/20 border-red-700/30",
};

const AGREEMENT_LABELS = {
  high: "High Agreement ✓",
  medium: "Partial Agreement ⚠",
  low: "Low Agreement ✗ — Review needed",
};

export default function VerifyPage() {
  const [input, setInput] = useState("");
  const [selectedAgents, setSelectedAgents] = useState<string[]>(["iisf-ops", "iisf-assistant"]);
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleAgent = (id: string) => {
    setSelectedAgents((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const runVerification = async () => {
    if (!input.trim() || selectedAgents.length < 2 || loading) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/ops/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input.trim(), agents: selectedAgents }),
      });
      const data: VerifyResponse = await res.json();
      setResult(data);
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Cross-Check Agents</h1>
        <p className="mt-1 text-sm text-slate-500">
          Send the same prompt to multiple agents in parallel. Compare responses to verify accuracy and catch hallucinations.
        </p>
      </div>

      {/* Input section */}
      <div className="rounded-xl border border-slate-800 bg-[#0a0c14] p-6 space-y-4">
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-400">SELECT AGENTS (minimum 2)</label>
          <div className="flex flex-wrap gap-3">
            {AGENT_OPTIONS.map((a) => (
              <button
                key={a.id}
                onClick={() => toggleAgent(a.id)}
                className={`rounded-lg border px-4 py-2 text-left transition ${
                  selectedAgents.includes(a.id)
                    ? "border-cyan-600 bg-cyan-900/20 text-cyan-300"
                    : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
                }`}
              >
                <p className="text-sm font-medium">{a.label}</p>
                <p className="text-[10px] text-slate-500">{a.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a prompt to cross-check across agents…&#10;&#10;Examples:&#10;• What grants should IISF apply for in Q2 2026?&#10;• Summarize the Grandin Standard's key requirements&#10;• Who are the best board candidates for the Data Ethics seat?"
          rows={4}
          className="w-full resize-none rounded-lg border border-slate-700/50 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
        />

        <button
          onClick={runVerification}
          disabled={loading || !input.trim() || selectedAgents.length < 2}
          className="rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-50"
        >
          {loading ? "Running cross-check…" : `Run Cross-Check (${selectedAgents.length} agents)`}
        </button>
      </div>

      {/* Results */}
      {loading && (
        <div className="rounded-xl border border-slate-800 bg-[#0a0c14] p-8 text-center">
          <div className="inline-flex items-center gap-3 text-sm text-slate-400">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
            Querying {selectedAgents.length} agents in parallel…
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {/* Agreement badge */}
          <div className={`rounded-xl border p-4 text-center ${AGREEMENT_COLORS[result.agreement]}`}>
            <p className="text-lg font-bold">{AGREEMENT_LABELS[result.agreement]}</p>
            <p className="mt-1 text-xs opacity-70">
              {result.results.length} agents responded · {new Date(result.timestamp).toLocaleTimeString()}
            </p>
          </div>

          {/* Side-by-side results */}
          <div className={`grid gap-4 ${result.results.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
            {result.results.map((r) => (
              <div key={r.agent} className="rounded-xl border border-slate-800 bg-[#0a0c14] p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-cyan-400">{r.agent}</span>
                  <span className="text-[10px] text-slate-600">{r.durationMs}ms</span>
                </div>
                {r.error ? (
                  <p className="text-sm text-red-400">Error: {r.error}</p>
                ) : (
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">{r.response}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
