"use client";

import { useCharter } from "./CharterModalProvider";

export default function SupportSection() {
  const { openSupport } = useCharter();

  return (
    <section className="border-b border-slate-800 bg-[#05060a] py-12">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl font-serif text-slate-50 opacity-0 animate-fadeIn">
          Support the Charter
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          As a 501(c)(3) pending non-profit, the Foundation is currently
          prioritizing research partnerships, in-kind contributions, and
          restricted grants that advance the Grandin, Heumann, and Crenshaw
          Standards.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Tier
            label="Research Partner"
            body="Universities, labs, and human rights organizations contributing datasets, telemetry, or subject-matter expertise."
          />
          <Tier
            label="Institutional Funder"
            body="Foundations and donors underwriting specific projects in sensory safety, kinetic equity, or algorithmic invisibility."
          />
          <Tier
            label="Mission Ally"
            body="Corporate partners aligning ESG, duty-of-care, and product roadmaps with intersectional safety metrics."
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={openSupport}
            className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-[#05060a] hover:bg-slate-200"
          >
            Discuss a Partnership
          </button>
          <a
            href="#contact"
            className="text-sm text-slate-300 underline underline-offset-4"
          >
            Or contact the Board directly
          </a>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Note: Until IRS 501(c)(3) status is confirmed, IISF does not solicit
          small-dollar public donations and only accepts institutional support
          structured for compliance.
        </p>
      </div>
    </section>
  );
}

function Tier({ label, body }: { label: string; body: string }) {
  return (
    <article className="rounded-lg border border-slate-800 bg-[#080a0f] p-5 opacity-0 animate-fadeIn">
      <h3 className="text-sm font-semibold text-slate-100">{label}</h3>
      <p className="mt-2 text-sm text-slate-300">{body}</p>
    </article>
  );
}
