import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SectionMark } from "@/components/chrome/SectionMark";
import { WorkFilter } from "@/components/work/WorkFilter";
import { ProjectCard } from "@/components/work/ProjectCard";
import { RepsLedger } from "@/components/work/RepsLedger";
import { CASE_STUDIES } from "@/content/work";
import { STAGES } from "@/lib/stages";
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
    title: t(ui.work.title, locale),
    description: t(ui.work.intro, locale),
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const chips = STAGES.map((s) => ({
    id: s.id,
    index: s.index,
    name: t(s.name, locale),
    kicker: t(s.kicker, locale),
    line: t(s.line, locale),
  }));

  // Cards are rendered here so the content layer never reaches the client bundle.
  const items = CASE_STUDIES.map((p) => ({
    slug: p.slug,
    stages: p.stages,
    node: <ProjectCard project={p} locale={locale} />,
  }));

  return (
    <div className="shell pt-16 md:pt-24">
      <SectionMark index="01" title={t(ui.common.evidence, locale)} />

      <header className="grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-end md:py-20">
        <h1 className="t-hero max-w-[10ch]">{t(ui.work.title, locale)}</h1>
        <p className="max-w-[36ch] text-[0.95rem] leading-relaxed text-muted">
          {t(ui.work.intro, locale)}
        </p>
      </header>

      <Suspense fallback={<div className="h-9" />}>
        <WorkFilter
          chips={chips}
          items={items}
          allLabel={t(ui.common.all, locale)}
          defaultNote={t(ui.work.filterNote, locale)}
          emptyNote={t(ui.work.empty, locale)}
        />
      </Suspense>

      <section className="pt-28 md:pt-36">
        <SectionMark
          index="02"
          title={t(ui.work.repsTitle, locale)}
          aside={t(ui.work.repsSpan, locale)}
        />
        <div className="grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-end">
          <h2 className="t-section max-w-[16ch]">
            {t(ui.work.repsHeading, locale)}
          </h2>
          <p className="max-w-[36ch] text-[0.95rem] leading-relaxed text-muted">
            {t(ui.work.repsIntro, locale)}
          </p>
        </div>
        <RepsLedger locale={locale} />
      </section>
    </div>
  );
}
