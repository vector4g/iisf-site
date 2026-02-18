import type { Metadata } from "next";
import Header from "@/components/iisf/Header";
import Footer from "@/components/iisf/Footer";

export const metadata: Metadata = {
  title: "Governance & Ethics",
  description:
    "IISF governance structures, ethical frameworks, and the three design principles — Sensory Safety, Kinetic Equity, and Algorithmic Accountability.",
  openGraph: {
    title: "Governance & Ethics — IISF",
    description:
      "Institutional structures ensuring profit never overrides safety in automated infrastructure.",
    url: "https://intersectionalsafety.org/governance",
  },
  alternates: { canonical: "https://intersectionalsafety.org/governance" },
};

export default function GovernancePage() {
  return (
    <main className="min-h-screen bg-[#05060a] text-slate-100">
      <Header />
      
      <div className="mx-auto max-w-5xl px-4 py-16">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-serif text-slate-50">
            Governance &amp; Ethics
          </h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            Institutional structures and ethical frameworks that ensure profit never overrides safety.
          </p>
          <div className="mt-6 h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
        </div>

        {/* Three-Pillar Governance */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif text-slate-50 mb-8">
            The Three-Pillar Governance Model
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Foundation Pillar */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 hover:border-cyan-400/30 transition-all">
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                The Foundation (IISF)
              </h3>
              <p className="text-sm text-slate-400 mb-4 font-medium">
                IP Steward &amp; Standards Authority
              </p>
              
              <div className="space-y-3 mb-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Responsibilities
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Owns and stewards the Grandin, Heumann, and Crenshaw modules</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Defines intersectional safety standards</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Maintains Charter of Fundamental Intersectional Safety Rights</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Oversees research fellowship program</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Approves commercial licensing agreements</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/30">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                  Authority
                </p>
                <p className="text-sm text-cyan-200 font-medium">
                  Retains veto power on all commercial applications. Can revoke licenses.
                </p>
              </div>
            </div>

            {/* Licensee Pillar */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 hover:border-cyan-400/30 transition-all">
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                The Licensee (Vector for Good)
              </h3>
              <p className="text-sm text-slate-400 mb-4 font-medium">
                Commercial Implementer
              </p>
              
              <div className="space-y-3 mb-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Responsibilities
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Commercializes technology for enterprise duty-of-care</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Routes risk-aware decisions into real-world operations</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Implements compliance with GDPR, ISO 31030, EU AI Act</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Develops sensory safety, kinetic equity features</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Reports to IISF on all deployments</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Maintains ethical guardrails in product design</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/30">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                  Authority
                </p>
                <p className="text-sm text-cyan-200 font-medium">
                  Operates under exclusive license with performance obligations and ethical requirements
                </p>
              </div>
            </div>

            {/* Kill Switch Pillar */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 hover:border-cyan-400/30 transition-all">
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                The Lock (Kill Switch Authority)
              </h3>
              <p className="text-sm text-slate-400 mb-4 font-medium">
                Ethical Enforcement
              </p>
              
              <div className="space-y-3 mb-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Responsibilities
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Monitor for surveillance use cases</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Detect weaponization attempts</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Prevent non-consensual tracking deployments</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Audit data handling and algorithmic decisions</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Enforce contractual safeguards</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <p className="text-sm text-slate-300">Revoke license if terms violated</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/30">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                  Authority
                </p>
                <p className="text-sm text-cyan-200 font-medium">
                  Unilateral power to terminate license and remove systems from operation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ethical Frameworks */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif text-slate-50 mb-8">
            Six Core Ethical Frameworks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Framework 1 */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 hover:border-cyan-400/30 transition-all">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">🛡️</span>
                <h3 className="text-xl font-semibold text-white">
                  Intersectional Safety First
                </h3>
              </div>

              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                The foundational principle: commercial viability is subordinate to intersectional safety standards. Profit cannot override safety.
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">No system feature overrides safety requirements</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">Profit never supersedes human safety</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">Marginalized communities prioritized in design</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">Lived experience integrated in decision-making</p>
                </div>
              </div>
            </div>

            {/* Framework 2 */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 hover:border-cyan-400/30 transition-all">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">🔍</span>
                <h3 className="text-xl font-semibold text-white">
                  Algorithmic Transparency
                </h3>
              </div>

              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Systems must be comprehensible to affected communities. Users have right to understand why a decision was made.
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">All risk algorithms auditable by third parties</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">Decision pathways explainable in plain language</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">No black-box systems deployed</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">Algorithmic bias testing mandatory before release</p>
                </div>
              </div>
            </div>

            {/* Framework 3 */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 hover:border-cyan-400/30 transition-all">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">🗽</span>
                <h3 className="text-xl font-semibold text-white">
                  Digital Sovereignty
                </h3>
              </div>

              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Every person retains sovereignty over their data. Participation in intersectional safety systems is voluntary and revocable.
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">Right to opt-out of tracking without service loss</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">Data portability guaranteed</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">Users can request permanent deletion</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">No behavioral profiling without explicit consent</p>
                </div>
              </div>
            </div>

            {/* Framework 4 */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 hover:border-cyan-400/30 transition-all">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">✓</span>
                <h3 className="text-xl font-semibold text-white">
                  Consent Architecture
                </h3>
              </div>

              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Consent is active, reversible, and context-specific. Default is non-participation.
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">Explicit, informed, withdrawable at any time</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">No pre-checked boxes or dark patterns</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">Quarterly consent renewal for sensitive data</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">Easy opt-out mechanisms visible at all times</p>
                </div>
              </div>
            </div>

            {/* Framework 5 */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 hover:border-cyan-400/30 transition-all">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">⛔</span>
                <h3 className="text-xl font-semibold text-white">
                  No Weapons, No Surveillance
                </h3>
              </div>

              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Hard red lines. Violations trigger immediate license revocation regardless of business impact.
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">Zero tolerance for weaponization pathways</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">No integration with law enforcement targeting systems</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">No deployment in immigration enforcement</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">No use in non-consensual identification systems</p>
                </div>
              </div>
            </div>

            {/* Framework 6 */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 hover:border-cyan-400/30 transition-all">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">🤝</span>
                <h3 className="text-xl font-semibold text-white">
                  Community Accountability
                </h3>
              </div>

              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Affected communities have structural power in governance, not just input solicitation.
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">LGBTQ+ safety organizations on advisory board</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">Disability rights groups review before deployment</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">Neurodivergent voices in design decisions</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
                  <p className="text-slate-400 text-sm">Annual community audit and feedback process</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Principles */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif text-slate-50 mb-8">
            Three Design Principles: Grandin, Heumann, Crenshaw
          </h2>

          <div className="space-y-6">
            {/* Sensory Safety */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
              <h3 className="text-2xl font-serif text-cyan-300 mb-3">Sensory Safety</h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Systems must accommodate autistic, deaf, blind, and neurodivergent users. Sensory impact audited before deployment.
              </p>

              <div className="bg-slate-800/50 rounded p-4 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Implementation Examples</p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                  <span className="text-slate-300">Acoustic environment mapping</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                  <span className="text-slate-300">Visual accessibility standards</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                  <span className="text-slate-300">Haptic feedback options</span>
                </div>
              </div>
            </div>

            {/* Kinetic Equity */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
              <h3 className="text-2xl font-serif text-cyan-300 mb-3">Kinetic Equity</h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Mobility status never determines access to safety. Wheelchair users, ambulatory, and non-binary mobility respected.
              </p>

              <div className="bg-slate-800/50 rounded p-4 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Implementation Examples</p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                  <span className="text-slate-300">Wheelchair-accessible routing</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                  <span className="text-slate-300">Rest period accommodations</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                  <span className="text-slate-300">Alternative input methods</span>
                </div>
              </div>
            </div>

            {/* Algorithmic Invisibility */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
              <h3 className="text-2xl font-serif text-cyan-300 mb-3">Algorithmic Invisibility</h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Systems must prevent forced visibility. Marginalized users can participate without being tracked or identified.
              </p>

              <div className="bg-slate-800/50 rounded p-4 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Implementation Examples</p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                  <span className="text-slate-300">Ephemeral data storage</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                  <span className="text-slate-300">Anonymization guarantees</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                  <span className="text-slate-300">Traceless participation options</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Decision Framework */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif text-slate-50 mb-8">
            The Ethical Decision Framework
          </h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            Every feature, deployment, and integration runs through this framework before release.
          </p>

          <div className="space-y-4">
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg overflow-hidden hover:border-cyan-400/30 transition-colors">
              <div className="bg-slate-800/50 p-6 border-b border-slate-700/30">
                <h4 className="text-lg font-semibold text-white flex items-start gap-3">
                  <span className="text-cyan-400">Q:</span>
                  <span>Would this feature benefit from knowing a user&apos;s marginalized identity?</span>
                </h4>
              </div>
              <div className="p-6">
                <p className="text-slate-300 flex items-start gap-3">
                  <span className="text-cyan-300">A:</span>
                  <span>If yes, request explicit informed consent. If no, design around identity obfuscation.</span>
                </p>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg overflow-hidden hover:border-cyan-400/30 transition-colors">
              <div className="bg-slate-800/50 p-6 border-b border-slate-700/30">
                <h4 className="text-lg font-semibold text-white flex items-start gap-3">
                  <span className="text-cyan-400">Q:</span>
                  <span>Could this feature enable surveillance or weaponization?</span>
                </h4>
              </div>
              <div className="p-6">
                <p className="text-slate-300 flex items-start gap-3">
                  <span className="text-cyan-300">A:</span>
                  <span>If possible, redesign to eliminate that pathway. If unavoidable, do not deploy.</span>
                </p>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg overflow-hidden hover:border-cyan-400/30 transition-colors">
              <div className="bg-slate-800/50 p-6 border-b border-slate-700/30">
                <h4 className="text-lg font-semibold text-white flex items-start gap-3">
                  <span className="text-cyan-400">Q:</span>
                  <span>Does this feature require forced visibility?</span>
                </h4>
              </div>
              <div className="p-6">
                <p className="text-slate-300 flex items-start gap-3">
                  <span className="text-cyan-300">A:</span>
                  <span>If yes, design opt-out mechanism. If not possible, reject feature entirely.</span>
                </p>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg overflow-hidden hover:border-cyan-400/30 transition-colors">
              <div className="bg-slate-800/50 p-6 border-b border-slate-700/30">
                <h4 className="text-lg font-semibold text-white flex items-start gap-3">
                  <span className="text-cyan-400">Q:</span>
                  <span>Are disabled/neurodivergent/LGBTQ+ users at disadvantage with this design?</span>
                </h4>
              </div>
              <div className="p-6">
                <p className="text-slate-300 flex items-start gap-3">
                  <span className="text-cyan-300">A:</span>
                  <span>If yes, redesign or build compensatory features. Never ship with known equity gaps.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Board Composition */}
        <section className="mb-20 bg-slate-900/30 border border-slate-700/50 rounded-lg p-8">
          <h2 className="text-3xl font-serif text-slate-50 mb-8">
            Board Composition &amp; Accountability
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">Executive Leadership</h3>
              <div className="bg-slate-800/50 rounded p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5"></span>
                  <div>
                    <p className="text-slate-100 font-medium">Levi Hankins</p>
                    <p className="text-sm text-slate-400">Founder &amp; Chair</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">Reserved Board Seats</h3>
              <div className="bg-slate-800/50 rounded p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-slate-500 rounded-full mt-1.5"></span>
                  <div>
                    <p className="text-slate-100 font-medium">Disability Advocacy Seat</p>
                    <p className="text-sm text-slate-400">Nomination Pending</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-slate-500 rounded-full mt-1.5"></span>
                  <div>
                    <p className="text-slate-100 font-medium">Data Ethics Seat</p>
                    <p className="text-sm text-slate-400">Nomination Pending</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-slate-500 rounded-full mt-1.5"></span>
                  <div>
                    <p className="text-slate-100 font-medium">LGBTQ+ Safety Seat</p>
                    <p className="text-sm text-slate-400">Nomination Pending</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-cyan-900/20 border border-cyan-700/30 rounded">
              <p className="text-sm text-slate-300 leading-relaxed">
                <span className="font-semibold text-cyan-300">Accountability Mechanism:</span> Board members serve 3-year terms with community review. Any member can be removed by 2/3 vote of affected community organizations.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

