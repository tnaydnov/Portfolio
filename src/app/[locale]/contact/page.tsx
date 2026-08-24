import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionMark } from "@/components/chrome/SectionMark";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href, site } from "@/lib/site";
import { ui } from "@/lib/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/contact",
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
    { label: "Email", value: site.email, target: `mailto:${site.email}` },
    { label: "LinkedIn", value: "/in/tomer-naydnov", target: site.links.linkedin },
    { label: "GitHub", value: "@tnaydnov", target: site.links.github },
  ];

  return (
    <div className="shell pt-12 md:pt-20">
      <SectionMark index="01" title={t(ui.contact.title, locale)} />

      <header className="grid min-h-[min(44rem,75svh)] gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="label text-signal">{t(site.role, locale)}</p>
          <h1 className="mt-5 t-hero max-w-[8ch]">{t(ui.contact.title, locale)}</h1>
          <p className="mt-8 max-w-[28ch] font-display text-[clamp(1.55rem,3.2vw,2.8rem)] leading-[1.14] tracking-tight">
            {t(ui.contact.lede, locale)}
          </p>
        </div>

        <div className="border border-rule bg-surface p-6 md:p-8">
          <p className="label">{locale === "he" ? "הדרך הישירה" : "The direct route"}</p>
          <a
            href={`mailto:${site.email}`}
            dir="ltr"
            className="mt-5 block break-all font-display text-[clamp(1.45rem,3vw,2.5rem)] tracking-tight transition-colors hover:text-signal"
          >
            {site.email}
          </a>
          <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-muted">
            {locale === "he"
              ? "תפקיד, בעיה, מוצר מעניין או פשוט שאלה טובה — מספיקים כמה משפטים."
              : "A role, a difficult problem, an interesting product, or simply a good question—just a few lines are enough."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.cv} download={site.cvFileName} className="inline-flex min-h-12 items-center bg-signal px-5 text-sm font-semibold text-signal-ink">
              {t(ui.common.downloadCv, locale)} ↓
            </a>
            <Link href={href("/work", locale)} className="inline-flex min-h-12 items-center border border-rule-strong px-5 text-sm hover:border-signal hover:text-signal">
              {locale === "he" ? "לצפייה בעבודות ←" : "Review the work →"}
            </Link>
          </div>
        </div>
      </header>

      <section aria-label={locale === "he" ? "ערוצי קשר" : "Contact channels"}>
        <ul className="border-t border-rule">
          {channels.map((channel) => (
            <li key={channel.label} className="border-b border-rule">
              <a
                href={channel.target}
                target={channel.target.startsWith("http") ? "_blank" : undefined}
                rel={channel.target.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group grid min-h-20 items-center gap-3 py-5 sm:grid-cols-[8rem_1fr_auto]"
              >
                <span className="label">{channel.label}</span>
                <span dir="ltr" className="break-all font-display text-[clamp(1.25rem,3vw,2.25rem)] tracking-tight transition-colors group-hover:text-signal">
                  {channel.value}
                </span>
                <span aria-hidden className="text-signal transition-transform group-hover:translate-x-1">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-8 py-16 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="label">{t(ui.contact.based, locale)}</p>
          <p className="mt-3 whitespace-pre-line text-[0.95rem] leading-relaxed text-muted">{t(ui.contact.basedValue, locale)}</p>
        </div>
        <div>
          <p className="label">{t(ui.contact.lookingFor, locale)}</p>
          <p className="mt-3 max-w-[36ch] text-[0.95rem] leading-relaxed text-muted">{t(ui.contact.lookingForValue, locale)}</p>
        </div>
        <div>
          <p className="label">{locale === "he" ? "עוד הקשר" : "More context"}</p>
          <Link href={`${href("/about", locale)}#experience`} className="mt-3 inline-block text-[0.95rem] underline decoration-signal underline-offset-4 hover:text-signal">
            {locale === "he" ? "לניסיון ולהשכלה ←" : "Experience and education →"}
          </Link>
        </div>
      </section>
    </div>
  );
}
