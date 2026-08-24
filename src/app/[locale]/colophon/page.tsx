import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionMark } from "@/components/chrome/SectionMark";
import { Reveal } from "@/components/motion/Reveal";
import { budgetTargets, colophonRules } from "@/content/site";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
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
    path: "/colophon",
    title: t(ui.colophon.title, locale),
    description: t(ui.colophon.lede, locale),
    index: false,
  });
}

export default async function ColophonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <div className="shell pt-16 md:pt-24">
      <SectionMark index="00" title={t(ui.colophon.title, locale)} />

      <header className="py-14 md:py-24">
        <h1 className="t-hero max-w-[11ch]">{t(ui.colophon.title, locale)}</h1>
        <p className="mt-10 max-w-[30ch] font-display text-[clamp(1.4rem,3vw,2.25rem)] leading-[1.18] tracking-tight">
          {t(ui.colophon.lede, locale)}
        </p>
        <p className="mt-8 max-w-[54ch] text-[1.05rem] leading-relaxed text-muted">
          {t(ui.colophon.intro, locale)}
        </p>
      </header>

      <section>
        <SectionMark
          index="01"
          title={t(ui.colophon.budgetTitle, locale)}
          aside={t(ui.colophon.budgetIntro, locale)}
        />
        <dl className="mt-8 grid gap-px bg-rule md:grid-cols-2">
          {budgetTargets.map((row) => (
            <div key={t(row.metric, locale)} className="bg-ink p-6 md:p-8">
              <dt className="font-display text-xl tracking-tight">{t(row.metric, locale)}</dt>
              <dd className="mt-5 grid gap-4 sm:grid-cols-2">
                <span><span className="label block">{t(ui.colophon.target, locale)}</span><span className="mt-2 block text-sm text-muted">{t(row.target, locale)}</span></span>
                <span><span className="label block">{t(ui.colophon.measured, locale)}</span><span data-metric className="mt-2 block font-display text-lg tracking-tight text-signal">{t(row.measured, locale)}</span></span>
              </dd>
              <p className="mt-5 border-t border-rule pt-4 text-sm leading-relaxed text-faint">{t(row.note, locale)}</p>
            </div>
          ))}
        </dl>
      </section>

      <section className="pt-24 md:pt-32">
        <SectionMark index="02" title={t(ui.colophon.rulesTitle, locale)} />
        <ol className="mt-8 grid gap-px bg-rule">
          {colophonRules.map((rule, i) => (
            <li key={t(rule.title, locale)} className="bg-ink">
              <Reveal>
                <div className="grid gap-4 py-10 md:grid-cols-[4rem_1fr] md:gap-8">
                  <p className="label text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h2 className="max-w-[40ch] font-display text-xl leading-snug tracking-tight md:text-2xl">
                      {t(rule.title, locale)}
                    </h2>
                    <p className="mt-4 max-w-[66ch] text-[0.95rem] leading-relaxed text-muted">
                      {t(rule.body, locale)}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
