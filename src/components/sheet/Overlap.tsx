import {
  BIO,
  PEAK,
  PEAK_SPAN,
  SPAN_START,
  YEARS,
  endOf,
  type BioKind,
} from "@/content/bio";
import { COUNT_WORD } from "@/content/sheet";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";

/** Weight, not category. The reader is not meant to decode a legend. */
const TONE: Record<BioKind, string> = {
  service: "var(--signal)",
  support: "var(--trace)",
  build: "var(--signal)",
  teach: "var(--text)",
  study: "var(--rule-strong)",
};

/**
 * The overlap.
 *
 * A Gantt chart is the industrial-engineering artifact he is currently doing a
 * master's in, turned on himself. It also carries the one fact a top-to-bottom
 * résumé structurally cannot: that most of this ran at the same time.
 *
 * Layout is a CSS grid of one column per year, so RTL costs nothing — under
 * `direction: rtl` the same `grid-column` places from the right edge and 2019
 * lands on the right without a single mirrored rule.
 */
export function Overlap({ locale }: { locale: Locale }) {
  const span = YEARS.length;
  const peakWord = t(COUNT_WORD[PEAK.count] ?? COUNT_WORD[4], locale);
  const peakYears =
    PEAK_SPAN.from === PEAK_SPAN.to
      ? `${PEAK_SPAN.from}`
      : `${PEAK_SPAN.from}—${PEAK_SPAN.to}`;

  return (
    <section className="bg-ink px-5 py-7 md:px-8" aria-labelledby="overlap-h">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id="overlap-h" className="label">
          {t(ui.home.overlapLabel, locale)}
        </h2>
        <p className="label text-signal">
          {peakWord} {t(ui.home.atOnce, locale)}
          <span aria-hidden className="mx-2 opacity-40">
            ·
          </span>
          <span dir="ltr">{peakYears}</span>
        </p>
      </div>

      {/* Year ruler. Same grid as every track below it. */}
      <div
        aria-hidden
        className="mt-5 grid ps-0 md:ps-[11rem]"
        style={{ gridTemplateColumns: `repeat(${span}, minmax(0, 1fr))` }}
      >
        {YEARS.map((y) => (
          <span
            key={y}
            dir="ltr"
            className="label text-[0.5rem] tabular-nums md:text-[0.625rem]"
          >
            {String(y).slice(2)}
          </span>
        ))}
      </div>

      <ul className="mt-2">
        {BIO.map((e) => {
          const from = e.start - SPAN_START + 1;
          const to = endOf(e) - SPAN_START + 2;
          return (
            <li key={e.id}>
              <details className="group/row">
                <summary
                  data-tag={e.id}
                  className="gantt-row grid cursor-pointer grid-cols-1 items-center gap-x-4 py-[3px] md:grid-cols-[11rem_1fr]"
                >
                  <span className="label truncate text-text/70">
                    {t(e.title, locale)}
                  </span>
                  <span
                    className="gantt-track relative grid h-[9px] items-center"
                    style={
                      {
                        gridTemplateColumns: `repeat(${span}, minmax(0, 1fr))`,
                        "--years": span,
                      } as React.CSSProperties
                    }
                  >
                    <span
                      className="gantt-bar h-[7px]"
                      data-open={e.end === null ? "" : undefined}
                      data-approx={e.approximate ? "" : undefined}
                      style={
                        {
                          gridColumn: `${from} / ${to}`,
                          // Not `background` — the bar's resting colour is a
                          // variable so the crosshair can blend toward signal
                          // without fighting an inline style.
                          "--bar": TONE[e.kind],
                        } as React.CSSProperties
                      }
                    />
                  </span>
                </summary>

                <div className="pb-4 pt-1 md:ps-[11.75rem]">
                  <p className="text-[0.9rem] leading-relaxed text-muted">
                    <span className="text-text">{t(e.org, locale)}</span>
                    <span aria-hidden className="mx-2 opacity-30">
                      ·
                    </span>
                    <span dir="ltr" className="tabular-nums">
                      {e.start}
                      {endOf(e) !== e.start ? `—${e.end ?? ""}` : ""}
                    </span>
                    {e.approximate && (
                      <span className="label ms-2 text-signal">
                        {t(ui.home.approxMark, locale)}
                      </span>
                    )}
                  </p>
                  <p className="mt-2 max-w-[64ch] text-[0.9rem] leading-relaxed text-muted">
                    {t(e.note, locale)}
                  </p>
                </div>
              </details>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 max-w-[62ch] text-[0.85rem] leading-relaxed text-faint">
        {t(ui.home.overlapNote, locale)}
      </p>
    </section>
  );
}
