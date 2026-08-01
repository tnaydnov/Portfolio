import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionMark } from "@/components/chrome/SectionMark";
import { Reveal } from "@/components/motion/Reveal";
import { brief } from "@/content/site";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { routeMetadata, site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return routeMetadata({
    path: "/contact",
    locale,
    title: t(ui.contact.title, locale),
    description: t(ui.contact.footerNote, locale),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const channels = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "LinkedIn", value: "/in/tomer-naydnov", href: site.links.linkedin },
    { label: "GitHub", value: "@tnaydnov", href: site.links.github },
  ];

  return (
    <div className="shell pt-16 md:pt-24">
      <SectionMark index="00" title={t(ui.contact.title, locale)} />

      <header className="py-14 md:py-24">
        <h1 className="t-hero max-w-[9ch]">{t(ui.contact.title, locale)}</h1>
        <p className="mt-10 max-w-[36ch] font-display text-[clamp(1.4rem,3vw,2.25rem)] leading-[1.18] tracking-tight">
          {t(ui.contact.lede, locale)}
        </p>
      </header>

      <ul className="grid gap-px border-y border-rule bg-rule">
        {channels.map((c) => (
          <li key={c.label} className="bg-ink">
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-7"
            >
              <span className="label">{c.label}</span>
              <span
                dir="ltr"
                className="flex-1 font-display text-[clamp(1.35rem,3.5vw,2.5rem)] leading-none tracking-tight transition-colors group-hover:text-signal"
              >
                {c.value}
              </span>
              <span
                aria-hidden
                className="text-signal transition-transform duration-300 group-hover:translate-x-2 rtl:rotate-180 rtl:group-hover:-translate-x-2"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="grid gap-10 py-16 md:grid-cols-3">
        <div>
          <p className="label">{t(ui.contact.based, locale)}</p>
          <p className="mt-3 whitespace-pre-line text-[0.95rem] leading-relaxed text-muted">
            {t(ui.contact.basedValue, locale)}
          </p>
        </div>
        <div>
          <p className="label">{t(ui.contact.lookingFor, locale)}</p>
          <p className="mt-3 max-w-[32ch] text-[0.95rem] leading-relaxed text-muted">
            {t(ui.contact.lookingForValue, locale)}
          </p>
        </div>
        <div>
          <p className="label">{t(ui.contact.cv, locale)}</p>
          <a
            href={site.cv}
            download
            className="mt-3 inline-flex items-center gap-2 text-[0.95rem] text-muted underline decoration-signal underline-offset-4 transition-colors hover:text-signal"
          >
            {t(ui.contact.downloadPdf, locale)}
          </a>
        </div>
      </div>

      <section className="pt-16 md:pt-24">
        <SectionMark index="01" title={t(ui.contact.briefTitle, locale)} />
        <Reveal>
          <div className="grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-end">
            <h2 className="t-section max-w-[18ch]">
              {t(ui.contact.briefHeading, locale)}
            </h2>
            <p className="max-w-[36ch] text-[0.95rem] leading-relaxed text-muted">
              {t(ui.contact.briefIntro, locale)}
            </p>
          </div>

          <dl className="grid gap-px bg-rule">
            {brief.map((row) => (
              <div
                key={t(row.term, locale)}
                className="grid gap-2 bg-ink py-7 md:grid-cols-[14rem_1fr] md:gap-10"
              >
                <dt className="label pt-1">{t(row.term, locale)}</dt>
                <dd className="max-w-[62ch] text-[1rem] leading-relaxed text-muted">
                  {t(row.def, locale)}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>
    </div>
  );
}
