"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-900 bg-[#05060a]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/iisf" className="flex items-center gap-2">
          <Image
            src="/public/iisf-logo.png"
            alt="IISF logo"
            width={32}
            height={32}
            className="rounded-sm"
          />
          <div className="leading-tight">
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-200 uppercase">
              IISF
            </p>
            <p className="text-[10px] text-slate-400">
              Intersectional Safety Foundation
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-5 text-xs text-slate-300">
          <a href="#grants" className="hover:text-slate-50">
            Fellowships
          </a>
          <a href="#ethics" className="hover:text-slate-50">
            Governance
          </a>
          <a href="#contact" className="hover:text-slate-50">
            Contact
          </a>
          <a href="/blog" className="hover:text-slate-50">
            Blog
          </a>
          <Link
            href="/legal"
            className="hidden text-slate-400 hover:text-slate-200 sm:inline"
          >
            Legal
          </Link>
        </nav>
      </div>
    </header>
  );
}
