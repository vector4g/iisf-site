"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  agent?: string;
  timestamp?: string;
}

export default function OpsChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "OpsDirector online. I manage 5 specialist agents — ContentManager, FundingScout, BoardRecruiter, SEOStrategist, and ResearchDirector. I can delegate tasks, query the CRM pipeline, and coordinate multi-agent workflows. What do you need?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId] = useState(() => `ops_${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed, timestamp: new Date().toISOString() }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ops/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: trimmed, conversationId }),
      });

      if (!res.ok) throw new Error("Agent unavailable");

      if (res.headers.get("content-type")?.includes("text/event-stream") && res.body) {
        // Stream SSE
        let fullText = "";
        setMessages((prev) => [...prev, { role: "assistant", content: "", agent: "OpsDirector", timestamp: new Date().toISOString() }]);
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          // Parse SSE lines
          for (const line of chunk.split("\n")) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.type === "text-delta" && data.textDelta) {
                  fullText += data.textDelta;
                  setMessages((prev) => {
                    const copy = [...prev];
                    copy[copy.length - 1] = { ...copy[copy.length - 1], content: fullText };
                    return copy;
                  });
                }
              } catch { /* skip non-JSON lines */ }
            }
          }
        }
        if (!fullText) {
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { ...copy[copy.length - 1], content: "Task completed (no text response — check pipeline for updates)." };
            return copy;
          });
        }
      } else {
        // Non-streaming fallback
        const data = await res.json();
        const text = data?.text || data?.output || "Task completed.";
        setMessages((prev) => [...prev, { role: "assistant", content: text, agent: "OpsDirector", timestamp: new Date().toISOString() }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Agent service unavailable. Check Railway deployment.", timestamp: new Date().toISOString() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 bg-[#080a12] px-6 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-600/20 text-sm">🤖</div>
        <div>
          <p className="text-sm font-semibold text-slate-100">OpsDirector</p>
          <p className="text-[10px] text-slate-500">Claude 3.5 Sonnet · 5 sub-agents · CRM connected</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-cyan-600 text-white"
                : msg.role === "system"
                  ? "bg-amber-900/30 border border-amber-700/30 text-amber-200"
                  : "bg-slate-800/80 text-slate-200 border border-slate-700/40"
            }`}>
              {msg.agent && <p className="mb-1 text-[10px] font-semibold text-cyan-400">{msg.agent}</p>}
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-xl bg-slate-800/80 border border-slate-700/40 px-4 py-3 text-sm text-slate-400">
              <span className="inline-flex gap-1">
                <span className="animate-bounce">·</span>
                <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>·</span>
                <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>·</span>
              </span>
              <span className="ml-2 text-xs">Processing with agent team…</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
        className="flex items-end gap-3 border-t border-slate-800 bg-[#080a12] px-6 py-4"
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          placeholder="Tell the OpsDirector what to do…"
          disabled={loading}
          rows={2}
          className="flex-1 resize-none rounded-lg border border-slate-700/50 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-lg bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}

