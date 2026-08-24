import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { NAV, href, site } from "@/lib/site";
import { now } from "@/content/site";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-28 border-t border-rule bg-ink-2 md:mt-40">
      <div className="shell py-14 md:py-20">
        <div className="grid gap-10 border-b border-rule pb-14 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:pb-20">
          <div>
            <p className="label text-signal">
              {locale === "he" ? "יש מערכת ששווה לשפר?" : "A system worth improving?"}
            </p>
            <h2 className="mt-5 max-w-[15ch] font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.96] tracking-[-0.045em]">
              {locale === "he"
                ? "בואו נתחיל מהשאלה הנכונה."
                : "Let’s start with the right question."}
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-[38ch] text-[0.98rem] leading-relaxed text-muted">
              {t(ui.contact.footerNote, locale)}
            </p>
            <a
              href={`mailto:${site.email}`}
              dir="ltr"
              className="group mt-6 inline-flex min-h-12 items-center gap-3 border border-rule-strong px-5 font-display text-lg tracking-tight transition-colors hover:border-signal hover:text-signal"
            >
              {site.email}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        <div className="grid gap-12 py-12 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_0.8fr]">
          <div>
            <p className="label">{t(now.label, locale)}</p>
            <ul className="mt-4 grid max-w-xl gap-2.5">
              {t(now.items, locale).map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span aria-hidden className="text-signal">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={locale === "he" ? "ניווט תחתון" : "Footer navigation"} className="flex flex-col gap-1">
            <p className="label mb-1">{t(ui.common.site, locale)}</p>
            {NAV.map((item) => (
              <Link key={item.key} href={href(item.href, locale)} className="inline-flex min-h-11 w-fit items-center text-sm text-muted hover:text-text">
                {t(ui.nav[item.key], locale)}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-1">
            <p className="label mb-1">{t(ui.common.elsewhere, locale)}</p>
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 w-fit items-center text-sm text-muted hover:text-text">
              GitHub ↗
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 w-fit items-center text-sm text-muted hover:text-text">
              LinkedIn ↗
            </a>
            <a href={site.cv} download className="inline-flex min-h-11 w-fit items-center text-sm text-muted hover:text-text">
              {t(ui.common.cvPdf, locale)} ↓
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">© {new Date().getFullYear()} {t(site.name, locale)}</p>
          <p className="label">{t(site.location, locale)}</p>
        </div>
      </div>
    </footer>
  );
}
