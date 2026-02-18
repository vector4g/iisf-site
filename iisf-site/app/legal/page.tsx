import type { Metadata } from "next";
import Header from "@/components/iisf/Header";
import Footer from "@/components/iisf/Footer";

export const metadata: Metadata = {
  title: "Legal",
  description: "Privacy policy, terms of service, and imprint for the International Intersectional Safety Foundation.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://intersectionalsafety.org/legal" },
};

export default function LegalIndexPage() {
  return (
    <main className="min-h-screen bg-[#05060a] text-slate-100">
      <Header />

      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-serif text-slate-50">
          Legal &amp; Governance
        </h1>
        <p className="mt-3 text-sm text-slate-300">
          Intersectional safety demands legal transparency. These documents
          describe how the International Intersectional Safety Foundation and
          Vector for Good handle data, governance, and compliance obligations.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-slate-300">
          <li>
            <a
              href="/legal/privacy"
              className="text-slate-100 underline underline-offset-4"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/legal/terms"
              className="text-slate-100 underline underline-offset-4"
            >
              Terms of Use
            </a>
          </li>
          <li>
            <a
              href="/legal/imprint"
              className="text-slate-100 underline underline-offset-4"
            >
              Imprint / Legal Notice
            </a>
          </li>
        </ul>
      </div>

      <Footer />
    </main>
  );
}
