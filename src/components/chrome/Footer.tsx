import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { NAV, href, site } from "@/lib/site";
import { now } from "@/content/site";

export function Footer({ locale }: { locale: Locale }) {
  const external = [
    { href: site.links.github, label: "GitHub" },
    { href: site.links.linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="mt-32 border-t border-rule">
      <div className="shell grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_0.8fr_0.8fr] lg:py-20">
        <div>
          <p className="label">{t(ui.common.currently, locale)}</p>
          <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-muted">
            {t(ui.contact.footerNote, locale)}
          </p>
          <a
            href={`mailto:${site.email}`}
            dir="ltr"
            className="group mt-6 inline-flex items-baseline gap-2 font-display text-xl tracking-tight transition-colors hover:text-signal"
          >
            {site.email}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
            >
              →
            </span>
          </a>
        </div>

        <div>
          <p className="label">{t(now.label, locale)}</p>
          <ul className="mt-3 grid gap-2">
            {t(now.items, locale).map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-[0.9rem] leading-relaxed text-muted"
              >
                <span aria-hidden className="text-signal">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <p className="label mb-1">{t(ui.common.site, locale)}</p>
          {[...NAV, { key: "colophon" as const, href: "/colophon" }].map(
            (item) => (
              <Link
                key={item.key}
                href={href(item.href, locale)}
                className="w-fit text-sm text-muted transition-colors hover:text-text"
              >
                {t(ui.nav[item.key], locale)}
              </Link>
            ),
          )}
        </nav>

        <div className="flex flex-col gap-3">
          <p className="label mb-1">{t(ui.common.elsewhere, locale)}</p>
          {external.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-sm text-muted transition-colors hover:text-text"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.cv}
            download
            className="w-fit text-sm text-muted transition-colors hover:text-text"
          >
            {t(ui.common.cvPdf, locale)}
          </a>
        </div>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-rule py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          © {new Date().getFullYear()} {t(site.name, locale)}
        </p>
        <p className="label">{t(site.location, locale)}</p>
      </div>
    </footer>
  );
}
