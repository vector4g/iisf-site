export default function FoundingStory() {
  return (
    <section className="border-b border-slate-800 bg-[#05060a] py-12">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl font-serif text-slate-50 opacity-0 animate-fadeIn">
          Founding Story: From Invisibility to Intelligence
        </h2>

        <p className="mt-3 text-sm text-slate-300">
          The seed for Vector for Good was not planted in a computer science
          lab, but during 20 years of service as a U.S. Navy Hospital Corpsman
          (HM1).
        </p>

        <p className="mt-3 text-sm text-slate-300">
          Serving through the entirety of the &quot;Don&apos;t Ask, Don&apos;t
          Tell&quot; era (1993–2011), Founder Levi Hankins lived the reality of
          institutional invisibility. While officially protected by policy, the
          lived reality was starkly different: to be fully visible was to be
          unsafe.
        </p>

        <blockquote className="mt-4 border-l-2 border-slate-700 pl-4 text-sm italic text-slate-200">
          &quot;For 20 years, I navigated a system designed for people who could
          be fully visible. When you&apos;re forced to hide who you are to stay
          safe, you develop a visceral understanding of the gap between official
          policy (&apos;everyone is protected&apos;) and lived reality
          (&apos;people like me fall through the cracks&apos;). That gap is
          what Vector for Good exists to close—not just for LGBTQ+ service
          members, but for every marginalized community navigating systems built
          without them in mind.&quot;
          <span className="mt-2 block text-xs not-italic text-slate-400">
            — Levi Hankins, Founder of Vector for Good and Chair, IISF
          </span>
        </blockquote>

        <p className="mt-4 text-sm text-slate-300">
          This experience—combined with treating TBI, PTSD, and sensory trauma
          in combat zones—revealed a critical market failure: legacy safety
          systems are built for the &quot;standard&quot; user. They fail
          catastrophically for the neurodivergent, the disabled, and the LGBTQ+
          traveler. Vector for Good exists to transform that lived invisibility
          into intersectional intelligence.
        </p>

        {/* Founder‑market fit summary */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <FMFItem
            title="Medical & Sensory Expertise"
            body="20 years as a Navy Corpsman, treating mobility impairments and sensory trauma in combat theaters. The Grandin and Heumann modules are built on clinical protocols refined under fire."
          />
          <FMFItem
            title="Regulatory & Compliance Rigor"
            body="Experience leading HIPAA-compliant EHR rollouts. GDPR, ISO 31030, and the EU AI Act are treated as product features, not afterthoughts."
          />
          <FMFItem
            title="Technical Execution"
            body="The Intersectional Safety Engine was built on a $0 budget to solve concrete problems like predicting sensory overload at major transit hubs."
          />
          <FMFItem
            title="Financial Discipline"
            body="Military pension and VA disability create a stable base, enabling a below-market founder salary and extending runway toward senior engineering hires."
          />
        </div>
      </div>
    </section>
  );
}

function FMFItem({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-lg border border-slate-800 bg-[#080a0f] p-4 text-sm text-slate-300 opacity-0 animate-fadeIn">
      <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
      <p className="mt-2">{body}</p>
    </article>
  );
}
