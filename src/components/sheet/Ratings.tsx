import { RATINGS } from "@/content/sheet";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";

/**
 * Five numbers, each with its origin printed underneath.
 *
 * No count-up. An instrument does not animate its readings, and these are the
 * payload — they have to be legible at 0 ms, including under reduced motion.
 */
export function Ratings({ locale }: { locale: Locale }) {
  return (
    <section className="bg-ink px-5 py-7 md:px-8" aria-labelledby="ratings-h">
      <h2 id="ratings-h" className="label">
        {t(ui.home.ratingsLabel, locale)}
      </h2>

      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
        {RATINGS.map((r) => (
          <div key={t(r.label, locale)} data-tag={r.tags.join(" ")}>
            <dd className="rating-value font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-none tracking-tight tabular-nums">
              {t(r.value, locale)}
            </dd>
            <dt className="mt-3 max-w-[22ch] text-[0.85rem] leading-snug text-muted">
              {t(r.label, locale)}
            </dt>
            <p className="label mt-2 text-[0.5625rem] leading-relaxed">
              {t(r.source, locale)}
            </p>
          </div>
        ))}
      </dl>
    </section>
  );
}
