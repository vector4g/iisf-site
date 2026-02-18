"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative border-b border-slate-800 bg-[#05060a] py-20">
      {/* subtle glow behind hero */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,255,0.16),transparent_55%)]" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 text-center md:flex-row md:items-center md:gap-14 md:text-left">
        {/* Logo side */}
        <div className="mx-auto shrink-0">
          <div className="relative h-56 w-56 md:h-72 md:w-72">
            <Image
              src="/iisf-hero.png"
              alt="International Intersectional Safety Foundation emblem"
              fill
              priority
              className="object-contain drop-shadow-[0_0_40px_rgba(148,163,255,0.45)]"
            />
          </div>
        </div>

        {/* Copy side */}
        <div className="space-y-5 md:space-y-6">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            International Intersectional Safety Foundation
          </p>
          <h1 className="text-3xl font-serif text-slate-50 md:text-4xl">
            Turning human rights into{" "}
            <span className="text-slate-100">metric science</span>.
          </h1>
          <p className="text-sm leading-relaxed text-slate-300">
            IISF defines the Charter of Fundamental Intersectional Safety
            Rights—rigorous standards for sensory safety, kinetic equity, and
            algorithmic invisibility—and encodes them into auditable
            infrastructure for cities, enterprises, and robotics platforms.
          </p>

          <div className="flex flex-col gap-3 pt-2 text-sm md:flex-row md:items-center">
            <Link
              href="/iisf#charter"
              className="inline-flex items-center justify-center rounded-md bg-slate-100 px-5 py-2 text-sm font-medium text-[#05060a] hover:bg-slate-200"
            >
              Read the Charter
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-md border border-slate-600 px-5 py-2 text-sm font-medium text-slate-100 hover:border-slate-400"
            >
              Join the research network
            </Link>
          </div>

          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
            Grandin · Heumann · Crenshaw Standards
          </p>
        </div>
      </div>
    </section>
  );
}
