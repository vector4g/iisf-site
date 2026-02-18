export default function ResearchFellowship() {
  return (
    <section
      id="grants"
      className="border-b border-slate-800 bg-[#05060a] py-12"
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl font-serif text-slate-50 opacity-0 animate-fadeIn">
          The IISF Research Fellowship
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          We support those who map the margins—researchers and data partners who
          transform lived experience into rigorous, intersectional safety
          science.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <FellowshipCard
            title="Neuro-Mapping"
            body="Academics studying the impact of urban acoustic density and hostile sensory design on autistic and neurodivergent adults."
          />
          <FellowshipCard
            title="Legislative Tracking"
            body="Legal scholars monitoring anti-LGBTQ+ legislation and mobility restrictions, particularly in the Global South."
          />
          <FellowshipCard
            title="Algorithmic Auditing"
            body="Data scientists working on de-biasing large language models and safety systems for intersectional error-rate parity."
          />
        </div>
        <p className="mt-6 text-sm text-slate-300">
          Fellowship applications for the 2026 cohort are currently{" "}
          <span className="font-semibold text-slate-100">by nomination only</span>
          . Contact the Board to nominate a researcher or data partner.
        </p>
      </div>
    </section>
  );
}

function FellowshipCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-lg border border-slate-800 bg-[#080a0f] p-5 opacity-0 animate-fadeIn">
      <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{body}</p>
    </article>
  );
}
