import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPreview } from "@/components/artifacts/ProductPreview";
import { ArchitectureGraphLazy } from "@/components/case/ArchitectureGraphLazy";
import { DecisionLog, FieldFeedback, MetricBlock, RebuildList } from "@/components/case/Blocks";
import { ConstraintDial } from "@/components/case/ConstraintDial";
import { ProductTourPage } from "@/components/case/ProductTourPage";
import { getProductTour } from "@/content/tours";
import { CASE_STUDIES } from "@/content/work";
import { pageMetadata } from "@/lib/metadata";
import { STAGE_BY_ID } from "@/lib/stages";
import { DOMAIN_LABEL, STATUS_LABEL, formatSpan } from "@/lib/types";
import styles from "@/components/case/case.module.css";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDIES.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = CASE_STUDIES.find((candidate) => candidate.slug === slug);
  if (!project) return {};
  return pageMetadata({ path: `/work/${slug}`, title: project.title, description: project.oneLiner });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = CASE_STUDIES.find((candidate) => candidate.slug === slug);
  if (!project?.snapshot) notFound();

  const index = CASE_STUDIES.findIndex((candidate) => candidate.slug === project.slug);
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];
  const tour = getProductTour(project.slug);
  if (tour) return <ProductTourPage project={project} tour={tour} next={next}/>;
  const hasStory = Boolean(project.sections?.length);
  const hasSystem = project.metrics.length > 0 || project.stack.length > 0 || Boolean(project.architecture);
  const hasDeepDive = hasSystem || Boolean(project.decisions?.length) || Boolean(project.feedback?.length) || Boolean(project.constraints) || Boolean(project.rebuild?.length);
  const snapshotRows = [
    { label: "The problem", value: project.snapshot.problem },
    { label: "The approach", value: project.snapshot.move },
    { label: "My contribution", value: project.snapshot.contribution },
  ];
  const storyIndex = 2;
  const deepIndex = storyIndex + (hasStory ? 1 : 0);

  return (
    <article className={`shell ${styles.page}`} data-project={project.slug}>
      <div className={styles.breadcrumb}>
        <Link href="/work"><span aria-hidden="true">←</span>All work</Link>
        <span>Project / {String(index + 1).padStart(2, "0")}</span>
      </div>

      <header className={styles.overview}>
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.heroTitle}>
              <p className={styles.domain}>{project.domain.map((domain) => DOMAIN_LABEL[domain]).join(" / ")}</p>
              <h1>{project.title}</h1>
            </div>
            <div className={styles.heroSummary}>
              <p className={styles.intro}>{project.oneLiner}</p>
              <div className={styles.actions}>
                {project.links?.live ? <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={styles.primaryAction}>Visit project<span aria-hidden="true">↗</span></a> : null}
                {project.links?.repo ? <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={styles.action}>View source<span aria-hidden="true">↗</span></a> : null}
              </div>
              <div className={styles.status}>
                <span className={styles.statusLabel}>{project.statusLabel || STATUS_LABEL[project.status]}</span>
                {project.statusDetail ? <p>{project.statusDetail}</p> : null}
              </div>
            </div>
          </div>
        </div>

        <dl className={styles.facts}>
          {[
            ["Role", project.role],
            ["Timeline", formatSpan(project)],
            ["Team", project.team || "Solo project"],
          ].map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
        </dl>
        <div className={styles.preview}><ProductPreview project={project}/></div>
        <nav className={styles.localNav} aria-label="Inside this project">
          <a href="#snapshot">Overview</a>
          {hasStory ? <a href="#story">The story</a> : null}
          {hasDeepDive ? <a href="#deep-dive">Engineering</a> : null}
        </nav>
      </header>

      <section id="snapshot" aria-labelledby="snapshot-title" className={styles.section}>
        <div className={styles.sectionHeading}><span>01 / Overview</span><h2 id="snapshot-title">The essentials.</h2></div>
        <dl className={styles.snapshot}>
          {snapshotRows.map((row, rowIndex) => <div key={row.label}><dt><span>0{rowIndex + 1}</span>{row.label}</dt><dd>{row.value}</dd></div>)}
        </dl>
        <div className={styles.evidence}><span>Evidence</span><p>{project.snapshot.proof}</p></div>
      </section>

      {hasStory ? <section id="story" className={styles.section} aria-labelledby="story-title">
        <div className={styles.sectionHeading}><span>0{storyIndex} / The story</span><h2 id="story-title">How it took shape.</h2></div>
        <div className={styles.chapters}>
          {project.sections?.map((section, sectionIndex) => <details key={`${section.stage}-${sectionIndex}`} className={styles.chapter}>
            <summary><span>{String(sectionIndex + 1).padStart(2, "0")} / {STAGE_BY_ID[section.stage].name}</span><h3>{section.heading}</h3><span aria-hidden="true" className={styles.plus}>+</span></summary>
            <div className={styles.chapterBody}>{section.body.map((paragraph) => <p key={paragraph.slice(0, 54)}>{paragraph}</p>)}</div>
          </details>)}
        </div>
      </section> : null}

      {hasDeepDive ? <section id="deep-dive" className={styles.section} aria-labelledby="deep-title">
        <div className={styles.sectionHeading}><span>0{deepIndex} / Engineering</span><h2 id="deep-title">Decisions & details.</h2></div>
        <div className={styles.deepList}>
          {hasSystem ? <details className={styles.deepItem}>
            <summary><span>System & architecture</span><span aria-hidden="true" className={styles.plus}>+</span></summary>
            <div className={styles.deepBody}>
              {project.metrics.length > 0 ? <MetricBlock metrics={project.metrics}/> : null}
              {project.stack.length > 0 ? <div className={styles.technology}><p>Technology</p><ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></div> : null}
              {project.architecture ? <div className={styles.graph}><ArchitectureGraphLazy architecture={project.architecture}/></div> : null}
            </div>
          </details> : null}
          {project.decisions?.length ? <details className={styles.deepItem}><summary><span>Decisions & trade-offs</span><span aria-hidden="true" className={styles.plus}>+</span></summary><div className={styles.deepBody}><DecisionLog decisions={project.decisions}/></div></details> : null}
          {project.feedback?.length ? <details className={styles.deepItem}><summary><span>Field feedback</span><span aria-hidden="true" className={styles.plus}>+</span></summary><div className={styles.deepBody}><FieldFeedback items={project.feedback}/></div></details> : null}
          {project.constraints ? <details className={styles.deepItem}><summary><span>Constraint study</span><span aria-hidden="true" className={styles.plus}>+</span></summary><div className={styles.deepBody}><ConstraintDial study={project.constraints}/></div></details> : null}
          {project.rebuild?.length ? <details className={styles.deepItem}><summary><span>What I would improve next</span><span aria-hidden="true" className={styles.plus}>+</span></summary><div className={styles.deepBody}><RebuildList items={project.rebuild}/></div></details> : null}
        </div>
      </section> : null}

      {project.evidenceNote ? <aside className={styles.sourceNote}><span>Source note</span><p>{project.evidenceNote}</p></aside> : null}
      <nav className={styles.next} aria-label="Next project">
        <p>Next project / {String((index + 1) % CASE_STUDIES.length + 1).padStart(2, "0")}</p>
        <Link href={`/work/${next.slug}`}><div><h2>{next.title}</h2><p>{next.oneLiner}</p></div><span aria-hidden="true">↗</span></Link>
      </nav>
    </article>
  );
}
