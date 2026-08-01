import type { Decision } from "@/lib/types";

export function DecisionLog({ decisions }: { decisions: Decision[] }) {
  return (
    <ol className="grid gap-px bg-rule">
      {decisions.map((d) => (
        <li key={d.id} className="bg-ink">
          <article className="grid gap-6 py-8 md:grid-cols-[7rem_1fr] md:gap-10 md:py-10">
            <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
              <p className="font-mono text-sm tracking-[0.12em] text-signal">
                {d.id}
              </p>
              <p className="label">{d.date}</p>
            </div>

            <div>
              <h3 className="max-w-[46ch] font-display text-xl leading-snug tracking-tight md:text-2xl">
                {d.title}
              </h3>

              <dl className="mt-6 grid gap-5">
                {(
                  [
                    ["Why", d.why],
                    ["Tradeoff", d.tradeoff],
                    ["Revisit if", d.revisit],
                  ] as const
                ).map(([term, def]) => (
                  <div
                    key={term}
                    className="grid gap-1.5 md:grid-cols-[7rem_1fr] md:gap-6"
                  >
                    <dt className="label pt-1">{term}</dt>
                    <dd className="max-w-[62ch] text-[0.95rem] leading-relaxed text-muted">
                      {def}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
