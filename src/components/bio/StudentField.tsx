import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";

const TOTAL = 650;
const TINTED = 50;
const COLS = 25;
const STEP = 8;
const ROWS = Math.ceil(TOTAL / COLS);

/**
 * `k * 97 mod 650`, offset. 97 is coprime with 650, so fifty distinct indices
 * fall out with no collision check and no randomness — the same fifty dots on
 * every build, scattered rather than striped.
 */
const tinted = new Set(
  Array.from({ length: TINTED }, (_, k) => (k * 97 + 17) % TOTAL),
);

/**
 * 650 marks, one per student taught. 50 tinted for the Leyman cohort sat a
 * national exam.
 *
 * Server-rendered SVG: 0 kB JS, and a fixed viewBox so there is no layout
 * shift to measure. Doubles as the portrait cell until a photograph exists —
 * it is not a placeholder, it is the other true picture of him.
 */
export function StudentField({
  locale,
  className = "",
  caption = true,
}: {
  locale: Locale;
  className?: string;
  caption?: boolean;
}) {
  return (
    <figure className={className}>
      <svg
        viewBox={`0 0 ${COLS * STEP} ${ROWS * STEP}`}
        className="dots block w-full text-signal"
        role="img"
        aria-label={t(ui.home.cohortCaption, locale)}
      >
        <g fill="currentColor">
          {Array.from({ length: TOTAL }, (_, i) => (
            <circle
              key={i}
              cx={(i % COLS) * STEP + STEP / 2}
              cy={Math.floor(i / COLS) * STEP + STEP / 2}
              r={2}
              className={tinted.has(i) ? undefined : "d"}
            />
          ))}
        </g>
      </svg>
      {caption && (
        <figcaption className="label mt-4 leading-relaxed">
          {t(ui.home.cohortCaption, locale)}
        </figcaption>
      )}
    </figure>
  );
}
