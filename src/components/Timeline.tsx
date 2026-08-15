import { timeline, type Row } from "@/content/cv";
import { t, type Locale } from "@/lib/i18n";

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
  const total = all.to - all.from;

  // Positioned with `inset-inline-start`, so Hebrew mirrors the whole strip
  // for free and 2019 lands on the right. No arithmetic flip, and no
  // `scaleX(-1)` — that would have reversed the year labels with it.
  const bar = (rows: Row[]) => {
    const s = span(rows);
    return {
      insetInlineStart: `${((s.from - all.from) / total) * 100}%`,
      width: `${((s.to - s.from) / total) * 100}%`,
    };
  };

  const work = bar(timeline.filter((r) => r.kind === "work"));
  const study = bar(timeline.filter((r) => r.kind === "study"));

  return (
    <div aria-hidden className="mt-6">
      {/* Plain boxes rather than an SVG: a stretched viewBox would squash the
          rounded ends into ellipses. */}
      <div className="relative h-[7px]">
        <div
          className="absolute h-full rounded-full bg-accent"
          style={work}
        />
      </div>
      <div className="relative mt-1.5 h-[7px]">
        <div
          className="absolute h-full rounded-full border-2 border-study"
          style={study}
        />
      </div>

      {/* `justify-between` under RTL already puts the earlier year on the
          right, matching the bars above it. */}
      <div className="mt-2.5 flex items-center justify-between text-xs text-faint">
        <span className="tnum">{all.from}</span>
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="dot size-[9px]" />
            {t(LEGEND.work, locale)}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="dot size-[9px]" data-kind="study" />
            {t(LEGEND.study, locale)}
          </span>
        </span>
        <span className="tnum">{all.to}</span>
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
