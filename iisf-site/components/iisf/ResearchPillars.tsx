export default function ResearchPillars() {
  const pillars = [
    {
      title: "Algorithmic Justice",
      body: "Auditing large language models and safety systems for erasure and distortion of Queer and Trans identities.",
    },
    {
      title: "Digital Sovereignty",
      body: "Advocating for the right to disappear from safety databases while still accessing protection and services.",
    },
    {
      title: "The “No Kings” Project",
      body: "Developing open standards for intersectional risk data and advancing ISO 31030-aligned safety metrics.",
    },
  ];

  return (
    <section className="border-b border-slate-800 bg-[#05060a]">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-serif text-slate-50 opacity-0 animate-fadeIn">
          Research Pillars
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <article
              key={pillar.title}
              className={`rounded-lg border border-slate-800 bg-[#080a0f] p-5 opacity-0 animate-fadeIn ${
                i === 0 ? 'animation-delay-100' : i === 1 ? 'animation-delay-200' : 'animation-delay-300'
              }`}
            >
              <h3 className="text-sm font-semibold text-slate-100">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300">{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
