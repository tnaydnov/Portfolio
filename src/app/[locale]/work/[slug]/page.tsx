import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CASE_STUDIES, getProject } from "@/content/work";
import { STAGE_BY_ID } from "@/lib/stages";
import { DOMAIN_LABEL, STATUS_LABEL, formatSpan } from "@/lib/types";
import { SectionMark } from "@/components/chrome/SectionMark";
import { Reveal } from "@/components/motion/Reveal";
import { ConstraintDial } from "@/components/case/ConstraintDial";
import { ArchitectureGraphLazy } from "@/components/case/ArchitectureGraphLazy";
import {
  DecisionLog,
  FieldFeedback,
  MetricBlock,
  RebuildList,
} from "@/components/case/Blocks";
import { LOCALES, isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { href } from "@/lib/site";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    CASE_STUDIES.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getProject(slug);
  if (!p || !isLocale(locale)) return {};
  return {
    title: p.title,
    description: t(p.oneLiner, locale),
    openGraph: { title: p.title, description: t(p.hook, locale) },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const p = getProject(slug);
  if (!p || p.tier === "rep") notFound();

  const index = CASE_STUDIES.findIndex((c) => c.slug === p.slug);
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];
  let n = 1;
  const mark = () => String(n++).padStart(2, "0");

  return (
    <article className="shell pt-16 md:pt-24">
      <SectionMark
        index="00"
        title={p.title}
        aside={
          <Link href={href("/work", locale)} className="hover:text-text">
            ← {t(ui.common.allWork, locale)}
          </Link>
        }
      />

      <header className="py-14 md:py-20">
        <p className="label">
          {p.domain.map((d) => t(DOMAIN_LABEL[d], locale)).join(" · ")}
        </p>
        <h1 className="mt-6 t-hero max-w-[12ch]">{p.title}</h1>
        <p className="mt-8 max-w-[34ch] font-display text-[clamp(1.35rem,2.8vw,2rem)] leading-[1.2] tracking-tight text-signal">
          {t(p.hook, locale)}
        </p>
        <p className="mt-6 max-w-[58ch] text-[1.05rem] leading-relaxed text-muted">
          {t(p.oneLiner, locale)}
        </p>

        <dl className="mt-12 grid gap-x-10 gap-y-6 border-t border-rule pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              [ui.common.role, t(p.role, locale)],
              [ui.common.span, formatSpan(p, locale)],
              [ui.common.status, t(STATUS_LABEL[p.status], locale)],
              [
                ui.common.team,
                p.team ? t(p.team, locale) : t(ui.common.solo, locale),
              ],
            ] as const
          ).map(([term, def]) => (
            <div key={t(term, locale)}>
              <dt className="label">{t(term, locale)}</dt>
              <dd className="mt-2 text-sm leading-relaxed">{def}</dd>
            </div>
          ))}
        </dl>

        {p.links?.repo && (
          <a
            href={p.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex h-11 items-center gap-2.5 border border-rule-strong px-5 text-sm transition-colors hover:border-signal hover:text-signal"
          >
            {t(ui.common.source, locale)}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
        )}
      </header>

      {p.metrics.length > 0 && (
        <Reveal>
          <MetricBlock metrics={p.metrics} locale={locale} />
        </Reveal>
      )}

      {p.sections?.map((section) => {
        const stage = STAGE_BY_ID[section.stage];
        return (
          <section key={section.stage} className="pt-24 md:pt-32">
            <SectionMark
              index={mark()}
              title={t(stage.name, locale)}
              aside={t(stage.kicker, locale)}
            />
            <Reveal>
              <div className="grid gap-8 py-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
                <h2 className="t-section max-w-[16ch] lg:sticky lg:top-28 lg:self-start">
                  {t(section.heading, locale)}
                </h2>
                <div className="prose">
                  {t(section.body, locale).map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>
        );
      })}

      {p.architecture && (
        <section className="pt-24 md:pt-32">
          <SectionMark
            index={mark()}
            title={t(ui.common.architecture, locale)}
            aside={t(ui.common.interactive, locale)}
          />
          <div className="py-12">
            <ArchitectureGraphLazy
              architecture={p.architecture}
              locale={locale}
            />
          </div>
        </section>
      )}

      {p.decisions && p.decisions.length > 0 && (
        <section className="pt-24 md:pt-32">
          <SectionMark
            index={mark()}
            title={t(ui.common.decisionLog, locale)}
            aside={`${p.decisions.length} ${t(ui.common.entries, locale)}`}
          />
          <div className="py-12">
            <DecisionLog decisions={p.decisions} locale={locale} />
          </div>
        </section>
      )}

      {p.constraints && (
        <section className="pt-24 md:pt-32">
          <SectionMark
            index={mark()}
            title={t(ui.common.tradeoff, locale)}
            aside={t(ui.common.interactive, locale)}
          />
          <div className="py-12">
            <ConstraintDial study={p.constraints} locale={locale} />
          </div>
        </section>
      )}

      {p.feedback && p.feedback.length > 0 && (
        <section className="pt-24 md:pt-32">
          <SectionMark
            index={mark()}
            title={t(ui.common.fromTheField, locale)}
          />
          <div className="py-12">
            <FieldFeedback items={p.feedback} locale={locale} />
          </div>
        </section>
      )}

      {p.rebuild && (
        <section className="pt-24 md:pt-32">
          <SectionMark
            index={mark()}
            title={t(ui.common.rebuildToday, locale)}
          />
          <div className="py-12">
            <RebuildList items={t(p.rebuild, locale)} />
          </div>
        </section>
      )}

      <nav className="mt-28 border-t border-rule pt-8">
        <p className="label">{t(ui.common.nextCase, locale)}</p>
        <Link
          href={href(`/work/${next.slug}`, locale)}
          className="group mt-4 flex flex-wrap items-baseline justify-between gap-4"
        >
          <span className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-tight transition-colors group-hover:text-signal">
            {next.title}
          </span>
          <span
            aria-hidden
            className="text-signal transition-transform duration-300 group-hover:translate-x-2 rtl:rotate-180 rtl:group-hover:-translate-x-2"
          >
            →
          </span>
        </Link>
        <p className="mt-4 max-w-[46ch] text-sm text-muted">
          {t(next.hook, locale)}
        </p>
      </nav>
    </article>
  );
}
