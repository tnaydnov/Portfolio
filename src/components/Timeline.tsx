import { timeline, type Row } from "@/content/cv";
import { DIR, t, type Locale } from "@/lib/i18n";

const LEGEND = {
  work: { en: "work", he: "עבודה" },
  study: { en: "study", he: "לימודים" },
} as const;

const NOW_YEAR = 2026;

function endOf(r: Row): number {
  return r.to ?? NOW_YEAR;
}

function span(rows: Row[]): { from: number; to: number } {
  return {
    from: Math.min(...rows.map((r) => r.from)),
    to: Math.max(...rows.map(endOf)),
  };
}

/**
 * Two bars: everything he was working, and everything he was studying.
 *
 * Deliberately merged rather than one bar per row. The only thing this strip
 * has to say is "the study years sit inside the working years" — eight
 * stacked bars would say it less clearly and would be a Gantt chart, which is
 * what the last version of this site got wrong.
 *
 * `aria-hidden`, because the list below carries every fact. A screen reader
 * gains nothing from a decorative restatement.
 */
function YearStrip({ locale }: { locale: Locale }) {
  const all = span(timeline);
  const rtl = DIR[locale] === "rtl";
  const W = 100;
  const total = all.to - all.from;

  const bar = (rows: Row[]) => {
    const s = span(rows);
    const x0 = ((s.from - all.from) / total) * W;
    const x1 = ((s.to - all.from) / total) * W;
    // Mirrored by arithmetic, never by scaleX(-1) — a flipped transform would
    // reverse the year labels too.
    return rtl
      ? { x: W - x1, width: x1 - x0 }
      : { x: x0, width: x1 - x0 };
  };

  const work = bar(timeline.filter((r) => r.kind === "work"));
  const study = bar(timeline.filter((r) => r.kind === "study"));
  const years = rtl ? [all.to, all.from] : [all.from, all.to];

  return (
    <div aria-hidden className="mt-6">
      <svg
        viewBox={`0 0 ${W} 15`}
        preserveAspectRatio="none"
        className="block h-[30px] w-full overflow-visible"
      >
        <rect
          x={work.x}
          width={work.width}
          y={0}
          height={6}
          rx={3}
          fill="var(--accent)"
        />
        <rect
          x={study.x}
          width={study.width}
          y={9}
          height={6}
          rx={3}
          fill="none"
          stroke="var(--study)"
          strokeWidth={1.6}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="mt-2 flex items-center justify-between text-xs text-faint">
        <span className="tnum" dir="ltr">
          {years[0]}
        </span>
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="dot" style={{ width: 9, height: 9 }} />
            {t(LEGEND.work, locale)}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="dot" data-kind="study" style={{ width: 9, height: 9 }} />
            {t(LEGEND.study, locale)}
          </span>
        </span>
        <span className="tnum" dir="ltr">
          {years[1]}
        </span>
      </div>
    </div>
  );
}

function years(r: Row, locale: Locale): string {
  const now = locale === "he" ? "היום" : "now";
  const end = r.to === null ? now : r.to;
  return r.from === r.to ? `${r.from}` : `${r.from} — ${end}`;
}

export function Timeline({ locale }: { locale: Locale }) {
  return (
    <>
      <YearStrip locale={locale} />

      <ol className="mt-8">
        {timeline.map((r) => (
          <li key={r.id}>
            <details className="row">
              <summary className="flex items-start gap-4 p-3">
                <span
                  aria-hidden
                  className="dot mt-[0.55rem] shrink-0"
                  data-kind={r.kind}
                />

                <span className="min-w-0 flex-1">
                  <span className="tnum block text-sm text-faint" dir="ltr">
                    {years(r, locale)}
                  </span>
                  <span className="mt-0.5 block font-display font-semibold leading-snug">
                    {t(r.role, locale)}
                  </span>
                  <span className="block text-[0.95rem] leading-snug text-soft">
                    {t(r.org, locale)}
                    {r.tag && (
                      <span className="pill ms-2 py-0.5 text-xs">
                        {t(r.tag, locale)}
                      </span>
                    )}
                  </span>
                </span>

                <span
                  aria-hidden
                  className="sign mt-1.5 shrink-0 text-xl leading-none text-faint"
                >
                  +
                </span>
              </summary>

              <p className="ps-11 pb-4 pe-3 text-[0.97rem] leading-relaxed text-soft">
                {t(r.note, locale)}
              </p>
            </details>
          </li>
        ))}
      </ol>
    </>
  );
}
