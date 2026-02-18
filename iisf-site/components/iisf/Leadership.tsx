export default function Leadership() {
  return (
    <section
      id="ethics"
      className="border-b border-slate-800 bg-[#0b0d10] py-12"
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl font-serif text-slate-50 opacity-0 animate-fadeIn">
          Leadership & Governance
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Composed of leaders in Disability Rights, LGBTQ+ advocacy, and Data
          Privacy. Seats are explicitly reserved for communities most impacted
          by algorithmic harm.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <BoardCard
            name="Levi Hankins"
            role="Founder & Chair"
            status="Seated"
            highlight
          />
          <BoardCard
            name="Board Seat: Disability Advocacy"
            role="Nomination Pending"
            status="Open"
          />
          <BoardCard
            name="Board Seat: Data Ethics"
            role="Nomination Pending"
            status="Open"
          />
        </div>
      </div>
    </section>
  );
}

function BoardCard({
  name,
  role,
  status,
  highlight,
}: {
  name: string;
  role: string;
  status: string;
  highlight?: boolean;
}) {
  return (
    <article className="flex flex-col rounded-lg border border-slate-800 bg-[#05060a] p-4 opacity-0 animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs text-slate-400">
          {status === "Seated" ? "LH" : "◎"}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-100">{name}</h3>
          <p className="text-xs text-slate-400">{role}</p>
        </div>
      </div>
      <span
        className={`mt-4 inline-flex w-fit rounded-full px-2 py-0.5 text-[10px] ${
          highlight
            ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
            : "bg-slate-800 text-slate-300 border border-slate-700"
        }`}
      >
        {status}
      </span>
    </article>
  );
}
