import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectArtifact } from "@/components/artifacts";
import { ArchitectureGraphLazy } from "@/components/case/ArchitectureGraphLazy";
import { DecisionLog, FieldFeedback, MetricBlock, RebuildList } from "@/components/case/Blocks";
import { ConstraintDial } from "@/components/case/ConstraintDial";
import { PlayableCase } from "@/components/experience/PlayableCase";
import { CASE_STUDIES } from "@/content/work";
import { pageMetadata } from "@/lib/metadata";
import { href } from "@/lib/site";
import { STAGE_BY_ID } from "@/lib/stages";
import { DOMAIN_LABEL, STATUS_LABEL, formatSpan } from "@/lib/types";
import { ui } from "@/lib/ui";
import styles from "@/components/case/case.module.css";
export function generateStaticParams() {
    return CASE_STUDIES.map((project) => ({ slug: project.slug }));
}
export const dynamicParams = true;
export async function generateMetadata({ params }: {
    params: Promise<{
        slug: string;
    }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = CASE_STUDIES.find((candidate) => candidate.slug === slug);
    if (!project)
        return {};
    return pageMetadata({ path: `/work/${slug}`, title: project.title, description: project.oneLiner });
}
export default async function CaseStudyPage({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) {
    const { slug } = await params;
    const project = CASE_STUDIES.find((candidate) => candidate.slug === slug);
    if (!project || !project.snapshot)
        notFound();
    const index = CASE_STUDIES.findIndex((candidate) => candidate.slug === project.slug);
    const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];
    const hasPlayable = ["arc", "applytide", "eventa"].includes(project.slug);
    const hasDeepDive = project.metrics.length > 0 || project.stack.length > 0 || Boolean(project.architecture) || Boolean(project.decisions?.length) || Boolean(project.feedback?.length) || Boolean(project.constraints) || Boolean(project.rebuild);
    const snapshotRows = [
        { label: "What was broken", value: project.snapshot.problem },
        { label: "The move", value: project.snapshot.move },
        { label: "My contribution", value: project.snapshot.contribution },
        { label: "What exists as proof", value: project.snapshot.proof },
    ];
    return (<article className={`shell ${styles.page}`} data-project={project.slug}>
      <div className={styles.breadcrumb}>
        <Link href={href("/work")}><span aria-hidden>{"←"}</span>{"All work"}</Link>
        <span>{"Case study"} / {String(index + 1).padStart(2, "0")}</span>
      </div>
      <header>
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.domain}>{project.domain.map((domain) => DOMAIN_LABEL[domain]).join(" / ")}</p>
            <h1>{project.title}</h1>
          </div>
          <div className={styles.heroSummary}>
            <p className={styles.hook}>{project.hook}</p>
            <p className={styles.intro}>{project.oneLiner}</p>
            <div className={styles.actions}>
              {project.links?.live ? <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={styles.action}>{"Visit live portal"}<span aria-hidden>↗</span></a> : null}
              {project.links?.repo ? <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={styles.action}>{"Inspect source"}<span aria-hidden>↗</span></a> : null}
            </div>
          </div>
        </div>
        <dl className={styles.facts}>
          {[
            [ui.common.role, project.role],
            [ui.common.span, formatSpan(project)],
            [ui.common.status, project.statusLabel ? project.statusLabel : STATUS_LABEL[project.status]],
            [ui.common.team, project.team ? project.team : ui.common.solo],
        ].map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
        </dl>
        {project.statusDetail ? <p className={styles.statusNote}>{project.statusDetail}</p> : null}
        <nav className={styles.localNav} aria-label={"Inside this project"}>
          <a href="#snapshot">{"At a glance"}</a>
          {hasPlayable ? <a href="#explore">{"Explore the system"}</a> : null}
          <a href="#story">{"The full story"}</a>
          {hasDeepDive ? <a href="#deep-dive">{"Decisions & technology"}</a> : null}
        </nav>
      </header>

      <details className={styles.modelStudy} open={!hasPlayable}>
        <summary><span>{"Project illustration"}</span><span className={styles.plus} aria-hidden>+</span></summary>
        <ProjectArtifact slug={project.slug} size="hero"/>
      </details>

      <section id="snapshot" aria-labelledby="snapshot-title" className={styles.section}>
        <div className={styles.sectionHeading}><span>01 / {"At a glance"}</span><h2 id="snapshot-title">{"The project, in focus."}</h2></div>
        <dl className={styles.snapshot}>{snapshotRows.map((row, rowIndex) => <div key={row.label}><dt><span>0{rowIndex + 1}</span>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
      </section>

      {hasPlayable ? <section id="explore" className={styles.section} aria-labelledby="explore-title">
        <div className={styles.sectionHeading}><span>02 / {"Hands on"}</span><h2 id="explore-title">{"Explore the system."}</h2></div>
        <PlayableCase slug={project.slug}/>
      </section> : null}

      <section id="story" className={styles.section} aria-labelledby="story-title">
        <div className={styles.sectionHeading}>
          <span>{hasPlayable ? "03" : "02"} / {"How it happened"}</span>
          <div><h2 id="story-title">{"The full story."}</h2><p>{"The summary above stands on its own. Open the decision trail below, one chapter at a time."}</p></div>
        </div>
        <div className={styles.chapters}>
          {project.sections?.map((section, sectionIndex) => <details key={`${section.stage}-${sectionIndex}`} className={styles.chapter}>
            <summary><span>{String(sectionIndex + 1).padStart(2, "0")} / {STAGE_BY_ID[section.stage].name}</span><h3>{section.heading}</h3><span aria-hidden className={styles.plus}>+</span></summary>
            <div className={styles.chapterBody}>{section.body.map((paragraph) => <p key={paragraph.slice(0, 54)}>{paragraph}</p>)}</div>
          </details>)}
        </div>
      </section>

      {hasDeepDive ? <section id="deep-dive" className={styles.section} aria-labelledby="deep-title">
        <div className={styles.sectionHeading}><span>{hasPlayable ? "04" : "03"} / {"A closer look"}</span><div><h2 id="deep-title">{"Beneath the surface."}</h2><p>{"The system, the trade-offs and the decisions. Explore what interests you."}</p></div></div>
        <div className={styles.deepList}>
          {(project.metrics.length > 0 || project.stack.length > 0 || project.architecture) ? <details className={styles.deepItem}>
            <summary><span>{"System & architecture"}</span><span aria-hidden className={styles.plus}>+</span></summary>
            <div className={styles.deepBody}>
              {project.metrics.length > 0 ? <MetricBlock metrics={project.metrics}/> : null}
              <div className={styles.technology}><p>{"Technology"}</p><ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></div>
              {project.architecture ? <div className={styles.graph}><ArchitectureGraphLazy architecture={project.architecture}/></div> : null}
            </div>
          </details> : null}
          {project.decisions?.length ? <details className={styles.deepItem}><summary><span>{"Decisions & trade-offs"}</span><span aria-hidden className={styles.plus}>+</span></summary><div className={styles.deepBody}><DecisionLog decisions={project.decisions}/></div></details> : null}
          {project.feedback?.length ? <details className={styles.deepItem}><summary><span>{"Field feedback"}</span><span aria-hidden className={styles.plus}>+</span></summary><div className={styles.deepBody}><FieldFeedback items={project.feedback}/></div></details> : null}
          {project.constraints ? <details className={styles.deepItem}><summary><span>{"Constraint study"}</span><span aria-hidden className={styles.plus}>+</span></summary><div className={styles.deepBody}><ConstraintDial study={project.constraints}/></div></details> : null}
          {project.rebuild ? <details className={styles.deepItem}><summary><span>{ui.common.rebuildToday}</span><span aria-hidden className={styles.plus}>+</span></summary><div className={styles.deepBody}><RebuildList items={project.rebuild}/></div></details> : null}
        </div>
      </section> : null}

      {project.evidenceNote ? <aside className={styles.sourceNote}><span>{"Source note"}</span><p>{project.evidenceNote}</p></aside> : null}
      <nav className={styles.next} aria-label={ui.common.nextCase}>
        <p>{ui.common.nextCase}</p>
        <Link href={href(`/work/${next.slug}`)}><div><h2>{next.title}</h2><p>{next.hook}</p></div><span aria-hidden>{"→"}</span></Link>
      </nav>
    </article>);
}
