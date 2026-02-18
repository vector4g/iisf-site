export default function Governance() {
  return (
    <section className="border-b border-slate-800 bg-[#0b0d10]">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-serif text-slate-50 opacity-0 animate-fadeIn">
          Profit Cannot Override Safety.
        </h2>
        <div className="mt-4 grid gap-8 text-sm text-slate-300 md:grid-cols-3">
          <div className="opacity-0 animate-fadeIn-delay-100">
            <h3 className="text-sm font-semibold text-slate-100">
              The Foundation (IISF)
            </h3>
            <p className="mt-2">
              Owns and stewards the core IP: the Grandin, Heumann, and Crenshaw
              modules that define intersectional safety standards.
            </p>
          </div>
          <div className="opacity-0 animate-fadeIn-delay-200">
            <h3 className="text-sm font-semibold text-slate-100">
              The Licensee (Vector for Good)
            </h3>
            <p className="mt-2">
              Commercializes the technology for enterprise duty-of-care, routing
              risk-aware decisions into real-world operations.
            </p>
          </div>
          <div className="opacity-0 animate-fadeIn-delay-300">
            <h3 className="text-sm font-semibold text-slate-100">
              The Lock
            </h3>
            <p className="mt-2">
              IISF retains a legal kill switch: if the system is used for
              surveillance, weaponization, or non-consensual tracking, the
              license can be revoked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
