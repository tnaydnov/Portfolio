import Link from "next/link";
import { TICKETS } from "@/content/desk";
import { DIR, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { href } from "@/lib/site";

/**
 * המוקד — the desk.
 *
 * The Hebrew word for the support desk he sat behind for three years is also
 * the word for a lens's focal point. That pun exists only in Hebrew and only
 * for someone who held the job.
 *
 * Each complaint renders in the script it was spoken in — in *both* locales,
 * with a gloss beneath — which is the one thing on this site that a
 * monolingual portfolio cannot buy at any budget. It is also the first time
 * the compile-enforced bilingual model in `lib/i18n.ts` stops being
 * infrastructure and becomes content.
 */
export function Desk({ locale }: { locale: Locale }) {
  if (TICKETS.length === 0) return null;

  return (
    <section className="shell pt-24 md:pt-32" aria-labelledby="desk-h">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-rule pt-3">
        <p className="label">
          <span dir="ltr" className="text-signal">
            §01
          </span>
          <span aria-hidden className="mx-2 opacity-40">
            /
          </span>
          {t(ui.home.deskLabel, locale)}
        </p>
        <p className="label" dir="rtl" lang="he">
          המוקד
        </p>
      </div>

      <div className="grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-end md:py-20">
        <h2 id="desk-h" className="t-section max-w-[18ch]">
          {t(ui.home.deskHeading, locale)}
        </h2>
        <p className="max-w-[38ch] text-[0.95rem] leading-relaxed text-muted">
          {t(ui.home.deskIntro, locale)}
        </p>
      </div>

      <ul className="grid gap-px bg-rule">
        {TICKETS.map((ticket) => (
          <li
            key={ticket.id}
            data-tag={ticket.tags.join(" ")}
            className="grid gap-8 bg-ink p-6 md:p-8 lg:grid-cols-[1.1fr_1fr_1fr] lg:gap-12"
          >
            {/* SAID — in the language it was said in, in both locales. */}
            <div>
              <p className="label flex flex-wrap items-baseline gap-x-3">
                <span>{t(ui.home.colSaid, locale)}</span>
                <span dir="ltr" className="text-signal">
                  {ticket.id} · {ticket.year}
                </span>
              </p>
              <blockquote
                dir={DIR[ticket.saidLocale]}
                lang={ticket.saidLocale}
                className="mt-4 border-s-2 border-signal ps-4 font-display text-[clamp(1.05rem,1.8vw,1.4rem)] leading-snug tracking-tight"
              >
                {ticket.said}
              </blockquote>
              {ticket.saidLocale !== locale && (
                <p className="mt-3 text-[0.85rem] leading-relaxed text-faint">
                  {t(ticket.gloss, locale)}
                </p>
              )}
              {!ticket.attested && (
                <p className="label mt-4 text-[0.5625rem] leading-relaxed">
                  <span className="text-signal">
                    {t(ui.home.reconstructed, locale)}
                  </span>
                  <span aria-hidden className="mx-2 opacity-40">
                    /
                  </span>
                  {t(ui.home.reconstructedNote, locale)}
                </p>
              )}
            </div>

            <div>
              <p className="label">{t(ui.home.colWas, locale)}</p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
                {t(ticket.was, locale)}
              </p>
            </div>

            <div>
              <p className="label">{t(ui.home.colChanged, locale)}</p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
                {t(ticket.changed, locale)}
              </p>
              {ticket.slug && (
                <p className="mt-4">
                  <Link
                    href={href(`/work/${ticket.slug}`, locale)}
                    className="label transition-colors hover:text-signal"
                  >
                    {t(ui.common.readCase, locale)} →
                  </Link>
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
