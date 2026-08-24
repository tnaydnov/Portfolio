import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectArtifact } from "@/components/artifacts";
import { ArchitectureGraphLazy } from "@/components/case/ArchitectureGraphLazy";
import { DecisionLog, MetricBlock, RebuildList } from "@/components/case/Blocks";
import { ConstraintDial } from "@/components/case/ConstraintDial";
import { SectionMark } from "@/components/chrome/SectionMark";
import { CASE_STUDIES } from "@/content/work";
import { LOCALES, isLocale, t, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href } from "@/lib/site";
import { STAGE_BY_ID } from "@/lib/stages";
import { DOMAIN_LABEL, STATUS_LABEL, formatSpan } from "@/lib/types";
import { ui } from "@/lib/ui";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    CASE_STUDIES.map((project) => ({ locale, slug: project.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = CASE_STUDIES.find((candidate) => candidate.slug === slug);
  if (!project || !isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: project.title,
    description: t(project.oneLiner, locale),
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const project = CASE_STUDIES.find((candidate) => candidate.slug === slug);
  if (!project || !project.snapshot) notFound();

  const index = CASE_STUDIES.findIndex((candidate) => candidate.slug === project.slug);
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];
  const hasDeepDive =
    project.metrics.length > 0 ||
    Boolean(project.architecture) ||
    Boolean(project.decisions?.length) ||
    Boolean(project.constraints) ||
    Boolean(project.rebuild);

  const snapshotRows = [
    {
      label: locale === "he" ? "מה היה שבור" : "What was broken",
      value: project.snapshot.problem,
    },
    {
      label: locale === "he" ? "המהלך" : "The move",
      value: project.snapshot.move,
    },
    {
      label: locale === "he" ? "התרומה שלי" : "My contribution",
      value: project.snapshot.contribution,
    },
    {
      label: locale === "he" ? "מה אפשר לבדוק" : "What exists as proof",
      value: project.snapshot.proof,
    },
  ];

  return (
    <article className="shell pt-12 md:pt-20">
      <SectionMark
        index="01"
        title={project.title}
        aside={
          <Link href={href("/work", locale)} className="hover:text-text">
            {locale === "he" ? "כל העבודות ←" : "← All work"}
          </Link>
        }
      />

      <header className="py-12 md:py-18">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div className="pb-2">
            <p className="label">
              {project.domain.map((domain) => t(DOMAIN_LABEL[domain], locale)).join(" · ")}
            </p>
            <h1 className="mt-5 t-hero max-w-[11ch]">{project.title}</h1>
            <p className="mt-7 max-w-[30ch] font-display text-[clamp(1.35rem,2.7vw,2.3rem)] leading-[1.16] tracking-tight text-signal">
              {t(project.hook, locale)}
            </p>
            <p className="mt-6 max-w-[58ch] text-[1rem] leading-relaxed text-muted">
              {t(project.oneLiner, locale)}
            </p>
          </div>
          <ProjectArtifact slug={project.slug} locale={locale} size="hero" />
        </div>

        <dl className="mt-8 grid border-s border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
          {[
            [t(ui.common.role, locale), t(project.role, locale)],
            [t(ui.common.span, locale), formatSpan(project, locale)],
            [t(ui.common.status, locale), project.statusLabel ? t(project.statusLabel, locale) : t(STATUS_LABEL[project.status], locale)],
            [t(ui.common.team, locale), project.team ? t(project.team, locale) : t(ui.common.solo, locale)],
          ].map(([term, value]) => (
            <div key={term} className="border-b border-e border-rule p-5">
              <dt className="label">{term}</dt>
              <dd className="mt-3 text-sm leading-relaxed">{value}</dd>
            </div>
          ))}
        </dl>

        {project.statusDetail ? (
          <p className="mt-4 max-w-[78ch] border-s-2 border-signal ps-4 text-sm leading-relaxed text-muted">
            {t(project.statusDetail, locale)}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links?.live ? (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center bg-signal px-5 text-sm font-semibold text-signal-ink">
              {locale === "he" ? "פתיחת האתר החי" : "Visit live portal"} ↗
            </a>
          ) : null}
          {project.links?.repo ? (
            <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center border border-rule-strong px-5 text-sm hover:border-signal hover:text-signal">
              {locale === "he" ? "בדיקת קוד המקור" : "Inspect source"} ↗
            </a>
          ) : null}
        </div>
      </header>

      <section aria-labelledby="snapshot-title" className="pt-8 md:pt-14">
        <SectionMark index="02" title={locale === "he" ? "גרסת 60 שניות" : "The 60-second version"} />
        <h2 id="snapshot-title" className="sr-only">{locale === "he" ? "גרסת 60 שניות" : "The 60-second version"}</h2>
        <dl className="mt-8 grid gap-px bg-rule md:grid-cols-2">
          {snapshotRows.map((row, rowIndex) => (
            <div key={row.label} className="min-h-52 bg-ink p-6 md:p-8">
              <dt className="label text-signal">0{rowIndex + 1} / {row.label}</dt>
              <dd className="mt-5 max-w-[55ch] font-display text-[clamp(1.18rem,2vw,1.55rem)] leading-snug tracking-tight text-muted">
                {t(row.value, locale)}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="story" className="scroll-mt-24 pt-24 md:pt-32" aria-labelledby="story-title">
        <SectionMark index="03" title={locale === "he" ? "הסיפור המלא" : "The full story"} aside={locale === "he" ? "לפי בחירה" : "Open what matters"} />
        <h2 id="story-title" className="sr-only">{locale === "he" ? "הסיפור" : "The story"}</h2>
        <p className="mt-8 max-w-[62ch] text-[0.98rem] leading-relaxed text-muted">
          {locale === "he"
            ? "התקציר למעלה עומד בפני עצמו. כאן אפשר לפתוח את קבלת ההחלטות, פרק אחד בכל פעם."
            : "The summary above stands on its own. Open the decision trail below, one chapter at a time."}
        </p>
        <div className="mt-8 border-t border-rule">
          {project.sections?.map((section, sectionIndex) => {
            const stage = STAGE_BY_ID[section.stage];
            return (
              <details key={`${section.stage}-${sectionIndex}`} className="group border-b border-rule">
                <summary className="grid min-h-24 cursor-pointer list-none items-center gap-4 py-6 marker:content-none sm:grid-cols-[8rem_1fr_auto] sm:gap-8">
                  <span className="label"><span className="text-signal">{String(sectionIndex + 1).padStart(2, "0")}</span><span className="mx-2 opacity-40">/</span>{t(stage.name, locale)}</span>
                  <span className="font-display text-[clamp(1.25rem,2.4vw,2rem)] leading-tight tracking-tight">{t(section.heading, locale)}</span>
                  <span aria-hidden className="text-xl text-signal transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="grid gap-8 pb-10 sm:grid-cols-[8rem_1fr_auto] sm:gap-8">
                  <span aria-hidden />
                  <div className="prose max-w-[72ch]">
                    <h3 className="sr-only">{t(section.heading, locale)}</h3>
                    {t(section.body, locale).map((paragraph) => <p key={paragraph.slice(0, 54)}>{paragraph}</p>)}
                  </div>
                  <span aria-hidden />
                </div>
              </details>
            );
          })}
        </div>
      </section>

      {hasDeepDive ? (
        <section id="deep-dive" className="scroll-mt-24 pt-24 md:pt-32">
          <SectionMark index="04" title={locale === "he" ? "הראיות שמתחת" : "The evidence underneath"} aside={locale === "he" ? "עומק לפי בחירה" : "Optional depth"} />
          <div className="mt-8 grid gap-4">
            {(project.metrics.length > 0 || project.architecture) ? (
              <details className="group border border-rule bg-surface">
                <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 p-6 font-display text-xl tracking-tight marker:content-none md:px-8">
                  <span>{locale === "he" ? "מערכת וארכיטקטורה" : "System & architecture"}</span>
                  <span aria-hidden className="text-signal transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="border-t border-rule p-6 md:p-8">
                  {project.metrics.length > 0 ? <MetricBlock metrics={project.metrics} locale={locale} /> : null}
                  <div className="mt-8">
                    <p className="label">{locale === "he" ? "טכנולוגיות" : "Technology"}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((item) => <li key={item} className="border border-rule px-3 py-2 font-mono text-xs text-muted">{item}</li>)}
                    </ul>
                  </div>
                  {project.architecture ? <div className="mt-10"><ArchitectureGraphLazy architecture={project.architecture} locale={locale} /></div> : null}
                </div>
              </details>
            ) : null}

            {project.decisions?.length ? (
              <details className="group border border-rule bg-surface">
                <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 p-6 font-display text-xl tracking-tight marker:content-none md:px-8">
                  <span>{locale === "he" ? "החלטות ופשרות" : "Decisions & trade-offs"}</span>
                  <span aria-hidden className="text-signal transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="border-t border-rule px-6 md:px-8"><DecisionLog decisions={project.decisions} locale={locale} /></div>
              </details>
            ) : null}

            {project.constraints ? (
              <details className="group border border-rule bg-surface">
                <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 p-6 font-display text-xl tracking-tight marker:content-none md:px-8">
                  <span>{locale === "he" ? "משחק האילוצים" : "Constraint study"}</span>
                  <span aria-hidden className="text-signal transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="border-t border-rule p-6 md:p-8"><ConstraintDial study={project.constraints} locale={locale} /></div>
              </details>
            ) : null}

            {project.rebuild ? (
              <details className="group border border-rule bg-surface">
                <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 p-6 font-display text-xl tracking-tight marker:content-none md:px-8">
                  <span>{t(ui.common.rebuildToday, locale)}</span>
                  <span aria-hidden className="text-signal transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="border-t border-rule px-6 md:px-8"><RebuildList items={t(project.rebuild, locale)} /></div>
              </details>
            ) : null}
          </div>
        </section>
      ) : null}

      {project.evidenceNote ? (
        <aside className="mt-20 border-s-2 border-signal bg-surface p-6 md:mt-28 md:p-8">
          <p className="label text-signal">{locale === "he" ? "הערת מקור" : "Source note"}</p>
          <p className="mt-3 max-w-[88ch] text-sm leading-relaxed text-muted">{t(project.evidenceNote, locale)}</p>
        </aside>
      ) : null}

      <nav className="mt-24 border-t border-rule pt-8 md:mt-32" aria-label={t(ui.common.nextCase, locale)}>
        <p className="label">{t(ui.common.nextCase, locale)}</p>
        <Link href={href(`/work/${next.slug}`, locale)} className="group mt-5 flex flex-wrap items-end justify-between gap-6">
          <span>
            <span className="block font-display text-[clamp(2.4rem,6vw,5rem)] leading-none tracking-tight transition-colors group-hover:text-signal">{next.title}</span>
            <span className="mt-4 block max-w-[54ch] text-sm leading-relaxed text-muted">{t(next.hook, locale)}</span>
          </span>
          <span aria-hidden className="text-2xl text-signal transition-transform group-hover:translate-x-2 rtl:rotate-180 rtl:group-hover:-translate-x-2">→</span>
        </Link>
      </nav>
    </article>
  );
}
