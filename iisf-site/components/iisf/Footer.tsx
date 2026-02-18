import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-800 bg-[#05060a]">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-slate-300">
            International Intersectional Safety Foundation
          </p>
          <p className="text-xs text-slate-500">
            Independent non-profit steward of the Grandin, Heumann, and
            Crenshaw Standards.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <div className="flex flex-wrap gap-4 text-xs">
            <a href="#grants" className="hover:text-slate-200">
              Fellowships &amp; Grants
            </a>
            <a href="#ethics" className="hover:text-slate-200">
              Ethics &amp; Governance
            </a>
            <a href="#contact" className="hover:text-slate-200">
              Encrypted Contact
            </a>
            <Link href="/blog" className="hover:text-slate-200">
              Journal
            </Link>
            <Link href="/legal" className="hover:text-slate-200">
              Legal
            </Link>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/iisf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IISF on LinkedIn"
              className="text-slate-500 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com/Vector4g"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IISF on GitHub"
              className="text-slate-500 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 bg-[#040509]">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-4 text-[11px] text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            Address: 1111B S Governors Ave #82502, Dover, DE 19904, USA ·{" "}
            <a
              href="mailto:board@intersectionalsafety.org"
              className="underline underline-offset-2"
            >
              board@intersectionalsafety.org
            </a>
          </p>
          <p className="text-[10px]">
            IISF and Vector for Good operate under the Charter of Fundamental
            Intersectional Safety Rights.
          </p>
        </div>
      </div>
    </footer>
  );
}
