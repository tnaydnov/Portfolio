import type { Feedback, Metric } from "@/lib/types";

export function MetricBlock({ metrics }: { metrics: Metric[] }) {
  if (metrics.length === 0) return null;

  return (
    <dl className="grid grid-cols-2 gap-px border border-rule bg-rule md:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.label} className="bg-ink p-5 md:p-6">
          <dd
            data-metric
            className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none tracking-tight"
          >
            {m.value}
          </dd>
          <dt className="label mt-3">{m.label}</dt>
          {m.note && (
            <p className="mt-2 text-xs leading-relaxed text-faint">{m.note}</p>
          )}
        </div>
      ))}
    </dl>
  );
}

export function FieldFeedback({ items }: { items: Feedback[] }) {
  return (
    <ul className="grid gap-px bg-rule">
      {items.map((f) => (
        <li key={f.quote} className="bg-ink py-8">
          <figure className="grid gap-6 md:grid-cols-2 md:gap-12">
            <div>
              <blockquote className="max-w-[38ch] font-display text-lg leading-snug tracking-tight md:text-xl">
                &ldquo;{f.quote}&rdquo;
              </blockquote>
              <figcaption className="label mt-4">{f.source}</figcaption>
            </div>
            <div className="border-l-2 border-signal pl-5">
              <p className="label">What changed</p>
              <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-muted">
                {f.change}
              </p>
            </div>
          </figure>
        </li>
      ))}
    </ul>
  );
}

export function RebuildList({ items }: { items: string[] }) {
  return (
    <ol className="grid gap-px bg-rule">
      {items.map((item, i) => (
        <li key={item} className="flex gap-5 bg-ink py-6 md:gap-8">
          <span className="label pt-1 text-signal">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="max-w-[68ch] text-[0.95rem] leading-relaxed text-muted">
            {item}
          </p>
        </li>
      ))}
    </ol>
  );
}
