import Header from "@/components/iisf/Header";
import Footer from "@/components/iisf/Footer";

export default function ImprintPage() {
  return (
    <main className="min-h-screen bg-[#05060a] text-slate-100">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-serif text-slate-50">
          Imprint / Legal Notice
        </h1>
        <p className="mt-3 text-sm text-slate-300">
          This page provides mandatory legal information for jurisdictions that
          require an Impressum / Imprint for public-facing websites.
        </p>

        <section className="mt-6 space-y-4 text-sm text-slate-300">
          <div>
            <h2 className="text-lg font-semibold text-slate-50">
              Operator of this website
            </h2>
            <p className="mt-2 font-semibold">Vector for Good, Corp</p>
            <p>Registered in the State of Delaware, USA</p>
            <p>Mailing address: 1111B S Governors Ave #82502, Dover, DE 19904, USA</p>
            <p>
              Contact:{" "}
              <a
                href="mailto:legal@vectorforgood.com"
                className="underline underline-offset-4"
              >
                legal@vectorforgood.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-50">
              International Intersectional Safety Foundation (IISF)
            </h2>
            <p className="mt-2">
              IISF operates as the research and standards arm aligned with
              Vector for Good&apos;s mission to define and enforce the Charter
              of Fundamental Intersectional Safety Rights.
            </p>
            <p className="mt-2">
              Mailing address: 1111B S Governors Ave #82502, Dover, DE 19904, USA
            </p>
            <p>
              Contact:{" "}
              <a
                href="mailto:board@intersectionalsafety.org"
                className="underline underline-offset-4"
              >
                board@intersectionalsafety.org
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-50">
              Responsible for content
            </h2>
            <p className="mt-2">
              Unless otherwise indicated, editorial responsibility for the
              intersectionalsafety.org website and published research updates
              lies with Vector for Good, Corp in coordination with the IISF
              Directorate.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-50">
              Additional disclosures
            </h2>
            <p className="mt-2 text-xs text-slate-400">
              Placeholder: add corporate registry numbers, EU representative
              details (if appointed under GDPR Article 27), VAT numbers, and
              other jurisdiction-specific disclosures once confirmed with
              counsel and registration authorities.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
