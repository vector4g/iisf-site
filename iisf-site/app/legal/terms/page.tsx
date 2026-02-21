import type { Metadata } from "next";
import Header from "@/components/iisf/Header";
import Footer from "@/components/iisf/Footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for intersectionalsafety.org, including acceptable use, intellectual property, liability limits, and governing law.",
  alternates: { canonical: "https://intersectionalsafety.org/legal/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#05060a] text-slate-100">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-serif text-slate-50">Terms of Use</h1>
        <p className="mt-3 text-sm text-slate-300">
          These Terms of Use (“Terms”) govern access to and use of the
          intersectionalsafety.org site and any related dashboards, APIs, or
          tools provided by Vector for Good, Corp and the International
          Intersectional Safety Foundation (together, “we,” “us,” or “our”).
          By accessing or using our services, you agree to be bound by these
          Terms.
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Last updated: 17 February 2026
        </p>

        <section className="mt-8 space-y-4 text-sm text-slate-200">
          <h2 className="text-lg font-semibold text-slate-50">
            1. Who we are
          </h2>
          <p>
            Vector for Good, Corp is a Delaware corporation with operations in
            the United States and the European Union. The International
            Intersectional Safety Foundation operates as a research and
            standards body aligned with Vector for Good&apos;s mission. These
            Terms apply to all visitors and organizations using our public site
            and any dashboards, APIs, or tools we make available.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            2. Acceptable use
          </h2>
          <p>
            You may use the site and tools only for lawful purposes and in
            accordance with these Terms. You agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Violate any applicable law or regulation.</li>
            <li>
              Attempt to gain unauthorized access to accounts, systems, or data.
            </li>
            <li>
              Interfere with or disrupt the security, integrity, or performance
              of our services.
            </li>
            <li>
              Use our services to harass, abuse, or harm others, including
              disabled, neurodivergent, LGBTQI+, or otherwise marginalized
              communities.
            </li>
          </ul>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            3. Intellectual property
          </h2>
          <p>
            Unless otherwise indicated, all content on the site—including text,
            graphics, logos, research summaries, and software—is owned by us or
            our licensors and protected by intellectual property laws. We grant
            you a limited, non-exclusive, non-transferable license to access and
            use the site for personal, research, or internal business purposes.
            You may not reproduce, modify, distribute, or create derivative
            works from our content without prior written permission, except as
            allowed by applicable law.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            4. No medical, legal, or safety guarantee
          </h2>
          <p>
            Information and analytics we provide are for informational and
            research purposes only. They do not constitute medical advice, legal
            advice, or a guarantee of safety in any particular environment. You
            remain responsible for your own decisions and for complying with all
            applicable laws and internal policies.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            5. Third-party services
          </h2>
          <p>
            Our site may link to or integrate with third-party websites,
            platforms, or services. We do not control and are not responsible
            for third-party content, policies, or practices. Your use of any
            third-party service is governed by that provider&apos;s terms and
            policies.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            6. Disclaimers
          </h2>
          <p>
            The services are provided on an “as is” and “as available” basis.
            To the fullest extent permitted by law, we disclaim all warranties,
            express or implied, including warranties of merchantability, fitness
            for a particular purpose, and non‑infringement. We do not warrant
            that the services will be uninterrupted, secure, or error‑free.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            7. Limitation of liability
          </h2>
          <p>
            To the fullest extent permitted by law, we will not be liable for
            any indirect, incidental, consequential, special, or punitive
            damages, or any loss of profits or revenue, arising out of or in
            connection with your use of the services. To the extent any
            liability is found despite this limitation, our total aggregate
            liability arising out of or relating to the services will not exceed
            one hundred US dollars (USD $100).
          </p>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            8. Governing law
          </h2>
          <p>
            These Terms and any dispute arising out of or relating to them are
            governed by the laws of the State of Delaware and applicable United
            States federal law, without regard to conflict-of-law principles.
            Where mandatory data protection or consumer protection laws provide
            additional rights or forums, these Terms do not limit those rights.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            9. Changes to these Terms
          </h2>
          <p>
            We may update these Terms from time to time. When we do, we will
            revise the “Last updated” date above and, where appropriate, provide
            additional notice. Your continued use of the services after changes
            take effect constitutes your acceptance of the updated Terms.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            10. Contact
          </h2>
          <p>
            If you have questions about these Terms, you can contact:
            <br />
            <span className="font-semibold">Vector for Good, Corp</span>
            <br />
            Email: legal@vectorforgood.com
          </p>
        </section>
      </div>
      <Footer />
    </main>
  );
}
