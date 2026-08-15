import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionMark } from "@/components/chrome/SectionMark";
import { Reveal } from "@/components/motion/Reveal";
import { budgetTargets, colophonRules } from "@/content/site";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(ui.colophon.title, locale),
    description: t(ui.colophon.lede, locale),
  };
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
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[38rem] border-collapse text-start">
            <thead>
              <tr className="border-b border-rule">
                <th scope="col" className="label py-3 pe-6 text-start font-normal">
                  {t(ui.colophon.route, locale)}
                </th>
                <th scope="col" className="label py-3 pe-6 text-start font-normal">
                  {t(ui.colophon.target, locale)}
                </th>
                <th scope="col" className="label py-3 pe-6 text-start font-normal">
                  {t(ui.colophon.measured, locale)}
                </th>
                <th scope="col" className="label py-3 text-start font-normal" />
              </tr>
            </thead>
            <tbody>
              {budgetTargets.map((row) => (
                <tr key={t(row.metric, locale)} className="border-b border-rule">
                  <th
                    scope="row"
                    className="py-5 pe-6 text-start text-[0.95rem] font-normal"
                  >
                    {t(row.metric, locale)}
                  </th>
                  <td className="py-5 pe-6">
                    <span className="label">{t(row.target, locale)}</span>
                  </td>
                  <td className="py-5 pe-6">
                    <span
                      data-metric
                      className="font-display text-lg tracking-tight text-signal"
                    >
                      {t(row.measured, locale)}
                    </span>
                  </td>
                  <td className="py-5 text-sm text-faint">
                    {t(row.note, locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
