import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import type { Decision, Feedback, Metric, Proof } from "@/lib/types";

export function MetricBlock({
  metrics,
  locale,
}: {
  metrics: Metric[];
  locale: Locale;
}) {
  if (metrics.length === 0) return null;

  return (
    <dl className="grid grid-cols-2 gap-px border border-rule bg-rule md:grid-cols-4">
      {metrics.map((m) => (
        <div key={t(m.label, locale)} className="flex flex-col bg-ink p-5 md:p-6">
          <dt className="label mt-3">{t(m.label, locale)}</dt>
          <dd
            data-metric
            className="-order-1 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none tracking-tight"
          >
            {t(m.value, locale)}
          </dd>
          {m.note && (
            <dd className="mt-2 text-xs leading-relaxed text-faint">
              {t(m.note, locale)}
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}

export function ProofLedger({
  items,
  locale,
}: {
  items: Proof[];
  locale: Locale;
}) {
  return (
    <dl className="grid gap-px border border-rule bg-rule lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={t(item.label, locale)}
          className="flex h-full flex-col bg-ink p-5 md:p-6"
        >
          <dt className="label flex items-center gap-2">
            <span
              aria-hidden
              className={`size-1.5 rounded-full ${
                item.access === "public" ? "bg-ok" : "bg-signal"
              }`}
            />
            {t(item.label, locale)}
          </dt>
          <dd className="mt-4 text-[0.95rem] leading-relaxed text-muted">
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-text"
              >
                {t(item.value, locale)}
                <span aria-hidden className="ms-2 text-signal">
                  ↗
                </span>
              </a>
            ) : (
              t(item.value, locale)
            )}
          </dd>
          <dd className="label mt-auto pt-6">
            {item.access === "public"
              ? locale === "he"
                ? "ציבורי / ניתן לבדיקה"
                : "Public / inspectable"
              : locale === "he"
                ? "פנימי / דיווח עצמי"
                : "Internal / self-reported"}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function DecisionLog({
  decisions,
  locale,
}: {
  decisions: Decision[];
  locale: Locale;
}) {
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
                {t(d.title, locale)}
              </h3>

              <dl className="mt-6 grid gap-5">
                {(
                  [
                    [ui.common.why, d.why],
                    [ui.common.tradeoff, d.tradeoff],
                    [ui.common.revisitIf, d.revisit],
                  ] as const
                ).map(([term, def]) => (
                  <div
                    key={t(term, locale)}
                    className="grid gap-1.5 md:grid-cols-[7rem_1fr] md:gap-6"
                  >
                    <dt className="label pt-1">{t(term, locale)}</dt>
                    <dd className="max-w-[62ch] text-[0.95rem] leading-relaxed text-muted">
                      {t(def, locale)}
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

export function FieldFeedback({
  items,
  locale,
}: {
  items: Feedback[];
  locale: Locale;
}) {
  return (
    <ul className="grid gap-px bg-rule">
      {items.map((f) => (
        <li key={t(f.quote, locale)} className="bg-ink py-8">
          <figure className="grid gap-6 md:grid-cols-2 md:gap-12">
            <div>
              <blockquote className="max-w-[38ch] font-display text-lg leading-snug tracking-tight md:text-xl">
                &ldquo;{t(f.quote, locale)}&rdquo;
              </blockquote>
              <figcaption className="label mt-4">
                {t(f.source, locale)}
              </figcaption>
            </div>
            <div className="border-s-2 border-signal ps-5">
              <p className="label">{t(ui.common.whatChanged, locale)}</p>
              <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-muted">
                {t(f.change, locale)}
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
