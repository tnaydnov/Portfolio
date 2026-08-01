import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionMark } from "@/components/chrome/SectionMark";
import { WorkFilter } from "@/components/work/WorkFilter";
import { ProjectCard } from "@/components/work/ProjectCard";
import { RepsLedger } from "@/components/work/RepsLedger";
import { CASE_STUDIES } from "@/content/work";
import { STAGES, type StageId } from "@/lib/stages";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { routeMetadata } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return routeMetadata({
    path: "/work",
    locale,
    title: t(ui.work.title, locale),
    description: t(ui.work.intro, locale),
  });
}

export default async function WorkPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ stage?: string | string[] }>;
}) {
  const { locale: raw } = await params;
  const query = await searchParams;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const requested = typeof query.stage === "string" ? query.stage : null;
  const initialStage = STAGES.some((stage) => stage.id === requested)
    ? (requested as StageId)
    : null;

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
    tier: p.tier === "flagship" ? ("flagship" as const) : ("system" as const),
    node: (
      <ProjectCard
        project={p}
        locale={locale}
        featured={p.tier === "flagship"}
      />
    ),
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

      <WorkFilter
        key={initialStage ?? "all"}
        chips={chips}
        items={items}
        initialStage={initialStage}
        allLabel={t(ui.common.all, locale)}
        defaultNote={t(ui.work.filterNote, locale)}
        emptyNote={t(ui.work.empty, locale)}
      />

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
