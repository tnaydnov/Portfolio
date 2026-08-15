import Link from "next/link";
import { WANTED } from "@/content/sheet";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { href, site } from "@/lib/site";

/**
 * The only block on the sheet that is a request rather than a claim, and the
 * contact details next to it so nobody has to go looking.
 */
export function Reach({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-px bg-rule md:grid-cols-[1.4fr_1fr]">
      <section className="bg-ink px-5 py-7 md:px-8" aria-labelledby="wanted-h">
        <h2 id="wanted-h" className="label text-signal">
          {t(ui.home.wantedLabel, locale)}
        </h2>
        <p className="mt-4 max-w-[46ch] font-display text-[clamp(1.1rem,1.9vw,1.5rem)] leading-snug tracking-tight">
          {t(WANTED, locale)}
        </p>
      </section>

      <section className="bg-ink px-5 py-7 md:px-8" aria-labelledby="reach-h">
        <h2 id="reach-h" className="label">
          {t(ui.home.reachLabel, locale)}
        </h2>
        <ul className="mt-4 space-y-2.5 text-[0.95rem]">
          <li>
            <a href={`mailto:${site.email}`} dir="ltr" className="hover:text-signal">
              {site.email}
            </a>
          </li>
          <li>
            <a
              href={site.links.linkedin}
              dir="ltr"
              className="hover:text-signal"
              rel="me noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={site.links.github}
              dir="ltr"
              className="hover:text-signal"
              rel="me noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </li>
          <li>
            <a href={site.cv} download className="hover:text-signal">
              {t(ui.common.cvPdf, locale)} ↓
            </a>
          </li>
        </ul>
        <p className="mt-5">
          <Link href={href("/contact", locale)} className="label hover:text-text">
            {t(ui.contact.briefTitle, locale)} →
          </Link>
        </p>
      </section>
    </div>
  );
}
