import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionMark } from "@/components/chrome/SectionMark";
import { ProjectCard } from "@/components/work/ProjectCard";
import { EarlierWorkLedger } from "@/components/work/RepsLedger";
import { EARLIER_ENGINEERING, SELECTED_WORK } from "@/content/work";
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
    path: "/work",
    title: t(ui.work.title, locale),
    description: t(ui.work.intro, locale),
  });
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <div className="shell pt-12 md:pt-20">
      <SectionMark index="01" title={t(ui.common.evidence, locale)} />

      <header className="grid gap-8 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="label text-signal">
            {locale === "he" ? "סקירה מהירה. עומק לפי בחירה." : "Fast read. Optional depth."}
          </p>
          <h1 className="mt-5 t-hero max-w-[8ch]">{t(ui.work.title, locale)}</h1>
        </div>
        <p className="max-w-[48ch] text-[1.05rem] leading-relaxed text-muted lg:justify-self-end">
          {t(ui.work.intro, locale)}
        </p>
      </header>

      <section aria-labelledby="selected-work-title">
        <SectionMark index="02" title={t(ui.work.selectedTitle, locale)} aside={t(ui.work.selectedIntro, locale)} />
        <h2 id="selected-work-title" className="sr-only">{t(ui.work.selectedTitle, locale)}</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {SELECTED_WORK.map((project) => {
            const featured = project.slug === "arc" || project.slug === "license-plate-recognition";
            return (
              <div key={project.slug} className={`min-w-0 ${featured ? "lg:col-span-2" : ""}`}>
                <ProjectCard project={project} locale={locale} featured={featured} />
              </div>
            );
          })}
        </div>
      </section>

      <section className="pt-24 md:pt-32" aria-labelledby="archive-title">
        <SectionMark index="03" title={t(ui.work.repsTitle, locale)} aside={t(ui.work.repsSpan, locale)} />
        <div className="grid gap-7 py-10 md:grid-cols-[1fr_auto] md:items-end">
          <h2 id="archive-title" className="t-section max-w-[18ch]">
            {t(ui.work.repsHeading, locale)}
          </h2>
          <p className="max-w-[42ch] text-[0.95rem] leading-relaxed text-muted">
            {t(ui.work.repsIntro, locale)}
          </p>
        </div>
        <EarlierWorkLedger projects={EARLIER_ENGINEERING} locale={locale} />
      </section>
    </div>
  );
}
