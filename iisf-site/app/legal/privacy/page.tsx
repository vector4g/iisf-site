import type { Metadata } from "next";
import Header from "@/components/iisf/Header";
import Footer from "@/components/iisf/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for intersectionalsafety.org, including data processing, legal bases, retention, and user rights across US and EU contexts.",
  alternates: { canonical: "https://intersectionalsafety.org/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#05060a] text-slate-100">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-serif text-slate-50">Privacy Policy</h1>
        <p className="mt-3 text-sm text-slate-300">
          This Privacy Policy explains how Vector for Good, Corp and the
          International Intersectional Safety Foundation collect, use, share,
          and protect personal data when you use our websites and related
          online services (the “Services”).
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Last updated: 17 February 2026
        </p>

        <section className="mt-8 space-y-4 text-sm text-slate-200">
          <h2 className="text-lg font-semibold text-slate-50">
            1. Data controller and contact details
          </h2>
          <p>
            For the purposes of data protection law, the primary data controller
            for the Services is:
          </p>
          <p>
            <span className="font-semibold">Vector for Good, Corp</span>{" "}
            (Delaware, USA)
            <br />
            Email: privacy@vectorforgood.com
          </p>
          <p>
            The International Intersectional Safety Foundation (“IISF”) acts as
            a research and standards body aligned with Vector for Good’s
            mission. Where IISF determines purposes and means of processing,
            IISF may also be a controller or joint controller.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            2. Categories of personal data we process
          </h2>
          <p>We may process the following categories of personal data:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-semibold">Identification and contact</span>{" "}
              – name, email address, organization, role or title, and similar
              details you provide via forms or correspondence.
            </li>
            <li>
              <span className="font-semibold">Usage and technical data</span> –
              IP address, browser type, device identifiers, pages visited,
              timestamps, referring URLs, and interaction logs generated when
              you access the Services.
            </li>
            <li>
              <span className="font-semibold">Communications data</span> –
              content of messages you send us (for example, accessibility
              reports, research inquiries, partnership proposals, or support
              requests).
            </li>
            <li>
              <span className="font-semibold">
                Research and pilot project data
              </span>{" "}
              – where you participate in a research project, pilot, or
              early-access deployment, we may process telemetry, survey, or
              contextual data as described in a project-specific notice, consent
              form, or data processing agreement.
            </li>
          </ul>
          <p>
            We do not intentionally collect special categories of data (such as
            health, biometric, or precise location data) via the public-facing
            site alone. Where such data is processed for research or safety
            analytics, it is done under separate, explicit documentation and
            safeguards.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            3. Sources of data
          </h2>
          <p>We obtain personal data from:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              You directly, when you submit forms, subscribe to updates, or
              contact us.
            </li>
            <li>
              Your use of the Services, via server logs and analytics tools.
            </li>
            <li>
              In some cases, from partners or public sources (for example,
              professional profiles or conference attendee lists) where this is
              lawful and relevant to our mission and your expectations.
            </li>
          </ul>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            4. Purposes and legal bases for processing
          </h2>
          <p>
            We process personal data only where we have a lawful basis under
            applicable law, including GDPR where it applies. Our main purposes
            and legal bases are:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-semibold">
                Operating and securing the Services
              </span>{" "}
              – to provide, maintain, monitor, and protect the websites,
              including troubleshooting, analytics, and security monitoring.
              Legal basis:{" "}
              <span className="italic">legitimate interests</span> in operating
              secure, reliable services.
            </li>
            <li>
              <span className="font-semibold">
                Responding to inquiries and managing relationships
              </span>{" "}
              – to respond to your questions, partnership requests, or research
              proposals and to manage ongoing collaborations. Legal basis:{" "}
              <span className="italic">
                performance of a contract or steps taken at your request
              </span>{" "}
              and{" "}
              <span className="italic">legitimate interests</span> in engaging
              with stakeholders.
            </li>
            <li>
              <span className="font-semibold">
                Communications and updates you request
              </span>{" "}
              – to send you newsletters, research updates, or event information
              where you have opted in or reasonably expect such communications.
              Legal basis:{" "}
              <span className="italic">consent or legitimate interests</span>,
              depending on jurisdiction and channel.
            </li>
            <li>
              <span className="font-semibold">
                Research, safety analytics, and product development
              </span>{" "}
              – to design, test, and evaluate safety, accessibility, and
              privacy-enhancing technologies, using appropriate safeguards and,
              where required, explicit consent or formal agreements. Legal
              bases:{" "}
              <span className="italic">
                legitimate interests, consent, or contract
              </span>
              , depending on context.
            </li>
            <li>
              <span className="font-semibold">
                Compliance and legal obligations
              </span>{" "}
              – to comply with applicable laws, respond to lawful requests, and
              enforce our rights. Legal basis:{" "}
              <span className="italic">legal obligation</span> and{" "}
              <span className="italic">legitimate interests</span>.
            </li>
          </ul>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            5. Recipients of personal data
          </h2>
          <p>We may share personal data with:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-semibold">
                Service providers (processors)
              </span>{" "}
              – providers of hosting, analytics, email delivery, customer
              relationship tools, security monitoring, and similar services,
              bound by contracts to process data only on our instructions and to
              protect it.
            </li>
            <li>
              <span className="font-semibold">Research partners</span> – where
              you participate in a joint study, pilot, or collaboration, data
              may be shared with partner institutions under data processing or
              data sharing agreements.
            </li>
            <li>
              <span className="font-semibold">
                Legal and regulatory recipients
              </span>{" "}
              – authorities, courts, or advisors where required to comply with
              law, enforce agreements, or protect rights, safety, or security.
            </li>
          </ul>
          <p>
            We do not sell personal data as that term is defined in many US
            state privacy laws. If this changes, we will update this Policy and
            provide required notices and opt-out mechanisms.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            6. International data transfers
          </h2>
          <p>
            We are based in the United States and may process data in the US and
            other countries that may not provide the same level of data
            protection as your home jurisdiction. When we transfer personal data
            from the European Economic Area (EEA), the UK, or Switzerland, we
            use appropriate safeguards such as Standard Contractual Clauses or
            other mechanisms recognized under GDPR, where required.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            7. Data retention
          </h2>
          <p>
            We keep personal data only for as long as necessary for the purposes
            described in this Policy or as required by law. Retention periods
            depend on the type of data and context, for example:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Contact and communications data – typically retained for the
              duration of our relationship plus a limited period for record
              keeping and dispute resolution.
            </li>
            <li>
              Usage and analytics data – retained for operational and security
              purposes for a limited period, then aggregated or anonymized.
            </li>
            <li>
              Research and pilot project data – retained according to project‑
              specific protocols, contracts, or ethical requirements communicated
              to participants.
            </li>
          </ul>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            8. Your rights
          </h2>
          <p>
            Depending on your location and applicable law (including GDPR if you
            are in the EEA, UK, or Switzerland), you may have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Request access to the personal data we hold about you.</li>
            <li>Request correction of inaccurate or incomplete data.</li>
            <li>
              Request deletion of your data in certain circumstances (“right to
              be forgotten”).
            </li>
            <li>
              Object to or request restriction of certain processing, including
              processing based on legitimate interests.
            </li>
            <li>
              Request data portability for information you provided, where
              technically feasible.
            </li>
            <li>
              Withdraw consent where processing is based on your consent,
              without affecting the lawfulness of processing before withdrawal.
            </li>
          </ul>
          <p>
            To exercise these rights, contact{" "}
            <span className="font-semibold">privacy@vectorforgood.com</span>. We
            may need to verify your identity before responding. If you believe
            we have not handled your concerns appropriately, you may lodge a
            complaint with your local data protection authority.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            9. Security
          </h2>
          <p>
            We implement technical and organizational measures designed to
            protect personal data against accidental or unlawful destruction,
            loss, alteration, unauthorized disclosure, or access. These measures
            include access controls, encryption in transit where appropriate,
            and regular review of systems and vendors. No system is completely
            secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            10. Children&apos;s data
          </h2>
          <p>
            Our public-facing Services are not directed to children under 16,
            and we do not knowingly collect personal data from children via the
            site. If you believe we have collected data from a child in
            violation of this Policy, please contact us so we can investigate
            and, where appropriate, delete the data.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-slate-50">
            11. Changes to this Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our Services, legal obligations, or processing
            activities. When we do, we will update the “Last updated” date
            above and, where appropriate, provide additional notice. Your
            continued use of the Services after changes take effect constitutes
            your acceptance of the updated Policy.
          </p>
        </section>
      </div>
      <Footer />
    </main>
  );
}
