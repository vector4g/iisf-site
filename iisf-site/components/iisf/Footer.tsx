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
