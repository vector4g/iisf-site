import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IISF Ops Center",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/ops", label: "Dashboard", icon: "📊" },
  { href: "/ops/chat", label: "Agent Chat", icon: "💬" },
  { href: "/ops/pipeline", label: "Pipeline", icon: "🔄" },
  { href: "/ops/verify", label: "Cross-Check", icon: "✅" },
] as const;

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#05060a] text-slate-100">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r border-slate-800 bg-[#080a12]">
        <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600/20 text-sm">⚡</div>
          <div>
            <p className="text-sm font-bold text-cyan-400">IISF Ops</p>
            <p className="text-[10px] text-slate-600">Agent Command Center</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800/50 hover:text-slate-100"
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-slate-800 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-slate-500">5 agents online</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

