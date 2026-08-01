import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CASE_STUDIES, getProject } from "@/content/work";
import { STAGE_BY_ID } from "@/lib/stages";
import { DOMAIN_LABEL, STATUS_LABEL, formatSpan } from "@/lib/types";
import { SectionMark } from "@/components/chrome/SectionMark";
import { Reveal } from "@/components/motion/Reveal";
import { DecisionLog } from "@/components/case/DecisionLog";
import { ConstraintDial } from "@/components/case/ConstraintDial";
import { ArchitectureGraphLazy } from "@/components/case/ArchitectureGraphLazy";
import {
  FieldFeedback,
  MetricBlock,
  RebuildList,
} from "@/components/case/Blocks";

export function generateStaticParams() {
  return CASE_STUDIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.oneLiner,
    openGraph: { title: p.title, description: p.hook || p.oneLiner },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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
          <Link href="/work" className="hover:text-text">
            ← All work
          </Link>
        }
      />

      <header className="py-14 md:py-20">
        <p className="label">
          {p.domain.map((d) => DOMAIN_LABEL[d]).join(" · ")}
        </p>
        <h1 className="mt-6 t-hero max-w-[12ch]">{p.title}</h1>
        <p className="mt-8 max-w-[34ch] font-display text-[clamp(1.35rem,2.8vw,2rem)] leading-[1.2] tracking-tight text-signal">
          {p.hook}
        </p>
        <p className="mt-6 max-w-[58ch] text-[1.05rem] leading-relaxed text-muted">
          {p.oneLiner}
        </p>

        <dl className="mt-12 grid gap-x-10 gap-y-6 border-t border-rule pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              ["Role", p.role],
              ["Span", formatSpan(p)],
              ["Status", STATUS_LABEL[p.status]],
              ["Team", p.team ?? "Solo"],
            ] as const
          ).map(([term, def]) => (
            <div key={term}>
              <dt className="label">{term}</dt>
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
            Source
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </a>
        )}
      </header>

      {p.metrics.length > 0 && (
        <Reveal>
          <MetricBlock metrics={p.metrics} />
        </Reveal>
      )}

      {p.sections?.map((section) => {
        const stage = STAGE_BY_ID[section.stage];
        return (
          <section key={section.stage} className="pt-24 md:pt-32">
            <SectionMark
              index={mark()}
              title={stage.name}
              aside={stage.kicker}
            />
            <Reveal>
              <div className="grid gap-8 py-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
                <h2 className="t-section max-w-[16ch] lg:sticky lg:top-28 lg:self-start">
                  {section.heading}
                </h2>
                <div className="prose">
                  {section.body.map((para) => (
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
          <SectionMark index={mark()} title="Architecture" aside="Interactive" />
          <div className="py-12">
            <p className="mb-8 max-w-[52ch] text-[0.95rem] leading-relaxed text-muted">
              Select any node to read why it exists and what it would take to
              delete it.
            </p>
            <ArchitectureGraphLazy architecture={p.architecture} />
          </div>
        </section>
      )}

      {p.decisions && p.decisions.length > 0 && (
        <section className="pt-24 md:pt-32">
          <SectionMark
            index={mark()}
            title="Decision log"
            aside={`${p.decisions.length} entries`}
          />
          <div className="py-12">
            <p className="mb-10 max-w-[52ch] text-[0.95rem] leading-relaxed text-muted">
              Every entry records the tradeoff I accepted and the condition that
              would make me reverse it. A decision without a cost attached is
              usually not a decision.
            </p>
            <DecisionLog decisions={p.decisions} />
          </div>
        </section>
      )}

      {p.constraints && (
        <section className="pt-24 md:pt-32">
          <SectionMark index={mark()} title="Tradeoff" aside="Interactive" />
          <div className="py-12">
            <ConstraintDial study={p.constraints} />
          </div>
        </section>
      )}

      {p.feedback && p.feedback.length > 0 && (
        <section className="pt-24 md:pt-32">
          <SectionMark index={mark()} title="From the field" />
          <div className="py-12">
            <FieldFeedback items={p.feedback} />
          </div>
        </section>
      )}

      {p.rebuild && p.rebuild.length > 0 && (
        <section className="pt-24 md:pt-32">
          <SectionMark index={mark()} title="If I rebuilt it today" />
          <div className="py-12">
            <RebuildList items={p.rebuild} />
          </div>
        </section>
      )}

      <nav className="mt-28 border-t border-rule pt-8">
        <p className="label">Next case</p>
        <Link
          href={`/work/${next.slug}`}
          className="group mt-4 flex flex-wrap items-baseline justify-between gap-4"
        >
          <span className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-tight transition-colors group-hover:text-signal">
            {next.title}
          </span>
          <span
            aria-hidden
            className="text-signal transition-transform duration-300 group-hover:translate-x-2"
          >
            →
          </span>
        </Link>
        <p className="mt-4 max-w-[46ch] text-sm text-muted">{next.hook}</p>
      </nav>
    </article>
  );
}
