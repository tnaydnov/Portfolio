import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectArtifact } from "@/components/artifacts";
import { ArchitectureGraphLazy } from "@/components/case/ArchitectureGraphLazy";
import { DecisionLog, FieldFeedback, MetricBlock, RebuildList } from "@/components/case/Blocks";
import { ConstraintDial } from "@/components/case/ConstraintDial";
import { PlayableCase } from "@/components/experience/PlayableCase";
import { CASE_STUDIES } from "@/content/work";
import { LOCALES, isLocale, t, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href } from "@/lib/site";
import { STAGE_BY_ID } from "@/lib/stages";
import { DOMAIN_LABEL, STATUS_LABEL, formatSpan } from "@/lib/types";
import { ui } from "@/lib/ui";
import styles from "@/components/case/case.module.css";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => CASE_STUDIES.map((project) => ({ locale, slug: project.slug })));
}
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = CASE_STUDIES.find((candidate) => candidate.slug === slug);
  if (!project || !isLocale(locale)) return {};
  return pageMetadata({ locale, path: `/work/${slug}`, title: project.title, description: t(project.oneLiner, locale) });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const project = CASE_STUDIES.find((candidate) => candidate.slug === slug);
  if (!project || !project.snapshot) notFound();
  const index = CASE_STUDIES.findIndex((candidate) => candidate.slug === project.slug);
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];
  const hasPlayable = ["arc", "applytide", "eventa"].includes(project.slug);
  const hasDeepDive = project.metrics.length > 0 || project.stack.length > 0 || Boolean(project.architecture) || Boolean(project.decisions?.length) || Boolean(project.feedback?.length) || Boolean(project.constraints) || Boolean(project.rebuild);
  const snapshotRows = [
    { label: locale === "he" ? "מה היה שבור" : "What was broken", value: project.snapshot.problem },
    { label: locale === "he" ? "המהלך" : "The move", value: project.snapshot.move },
    { label: locale === "he" ? "התרומה שלי" : "My contribution", value: project.snapshot.contribution },
    { label: locale === "he" ? "מה אפשר לבדוק" : "What exists as proof", value: project.snapshot.proof },
  ];

  return (
    <article className={`shell ${styles.page}`} data-project={project.slug}>
      <div className={styles.breadcrumb}>
        <Link href={href("/work", locale)}><span aria-hidden>{locale === "he" ? "→" : "←"}</span>{locale === "he" ? "כל העבודות" : "All work"}</Link>
        <span>{locale === "he" ? "מקרה בוחן" : "Case study"} / {String(index + 1).padStart(2, "0")}</span>
      </div>
      <header>
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.domain}>{project.domain.map((domain) => t(DOMAIN_LABEL[domain], locale)).join(" / ")}</p>
            <h1>{project.title}</h1>
          </div>
          <div className={styles.heroSummary}>
            <p className={styles.hook}>{t(project.hook, locale)}</p>
            <p className={styles.intro}>{t(project.oneLiner, locale)}</p>
            <div className={styles.actions}>
              {project.links?.live ? <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={styles.action}>{locale === "he" ? "פתיחת האתר החי" : "Visit live portal"}<span aria-hidden>↗</span></a> : null}
              {project.links?.repo ? <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={styles.action}>{locale === "he" ? "בדיקת קוד המקור" : "Inspect source"}<span aria-hidden>↗</span></a> : null}
            </div>
          </div>
        </div>
        <dl className={styles.facts}>
          {[
            [t(ui.common.role, locale), t(project.role, locale)],
            [t(ui.common.span, locale), formatSpan(project, locale)],
            [t(ui.common.status, locale), project.statusLabel ? t(project.statusLabel, locale) : t(STATUS_LABEL[project.status], locale)],
            [t(ui.common.team, locale), project.team ? t(project.team, locale) : t(ui.common.solo, locale)],
          ].map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
        </dl>
        {project.statusDetail ? <p className={styles.statusNote}>{t(project.statusDetail, locale)}</p> : null}
        <nav className={styles.localNav} aria-label={locale === "he" ? "בתוך הפרויקט" : "Inside this project"}>
          <a href="#snapshot">{locale === "he" ? "התקציר" : "At a glance"}</a>
          {hasPlayable ? <a href="#explore">{locale === "he" ? "להתנסות במערכת" : "Explore the system"}</a> : null}
          <a href="#story">{locale === "he" ? "הסיפור המלא" : "The full story"}</a>
          {hasDeepDive ? <a href="#deep-dive">{locale === "he" ? "החלטות וטכנולוגיה" : "Decisions & technology"}</a> : null}
        </nav>
      </header>

      <details className={styles.modelStudy} open={!hasPlayable}>
        <summary><span>{locale === "he" ? "המחשת הפרויקט" : "Project illustration"}</span><span className={styles.plus} aria-hidden>+</span></summary>
        <ProjectArtifact slug={project.slug} locale={locale} size="hero" />
      </details>

      <section id="snapshot" aria-labelledby="snapshot-title" className={styles.section}>
        <div className={styles.sectionHeading}><span>01 / {locale === "he" ? "בתמצית" : "At a glance"}</span><h2 id="snapshot-title">{locale === "he" ? "הפרויקט, בתמצית." : "The project, in focus."}</h2></div>
        <dl className={styles.snapshot}>{snapshotRows.map((row, rowIndex) => <div key={row.label}><dt><span>0{rowIndex + 1}</span>{row.label}</dt><dd>{t(row.value, locale)}</dd></div>)}</dl>
      </section>

      {hasPlayable ? <section id="explore" className={styles.section} aria-labelledby="explore-title">
        <div className={styles.sectionHeading}><span>02 / {locale === "he" ? "התנסות" : "Hands on"}</span><h2 id="explore-title">{locale === "he" ? "להתנסות במערכת." : "Explore the system."}</h2></div>
        <PlayableCase slug={project.slug} locale={locale} />
      </section> : null}

      <section id="story" className={styles.section} aria-labelledby="story-title">
        <div className={styles.sectionHeading}>
          <span>{hasPlayable ? "03" : "02"} / {locale === "he" ? "איך זה קרה" : "How it happened"}</span>
          <div><h2 id="story-title">{locale === "he" ? "הסיפור המלא." : "The full story."}</h2><p>{locale === "he" ? "התקציר למעלה עומד בפני עצמו. כאן אפשר לפתוח את קבלת ההחלטות, פרק אחד בכל פעם." : "The summary above stands on its own. Open the decision trail below, one chapter at a time."}</p></div>
        </div>
        <div className={styles.chapters}>
          {project.sections?.map((section, sectionIndex) => <details key={`${section.stage}-${sectionIndex}`} className={styles.chapter}>
            <summary><span>{String(sectionIndex + 1).padStart(2, "0")} / {t(STAGE_BY_ID[section.stage].name, locale)}</span><h3>{t(section.heading, locale)}</h3><span aria-hidden className={styles.plus}>+</span></summary>
            <div className={styles.chapterBody}>{t(section.body, locale).map((paragraph) => <p key={paragraph.slice(0, 54)}>{paragraph}</p>)}</div>
          </details>)}
        </div>
      </section>

      {hasDeepDive ? <section id="deep-dive" className={styles.section} aria-labelledby="deep-title">
        <div className={styles.sectionHeading}><span>{hasPlayable ? "04" : "03"} / {locale === "he" ? "מבט מקרוב" : "A closer look"}</span><div><h2 id="deep-title">{locale === "he" ? "מתחת לפני השטח." : "Beneath the surface."}</h2><p>{locale === "he" ? "המערכת, הפשרות וההחלטות. עומק לפי בחירה." : "The system, the trade-offs and the decisions. Explore what interests you."}</p></div></div>
        <div className={styles.deepList}>
          {(project.metrics.length > 0 || project.stack.length > 0 || project.architecture) ? <details className={styles.deepItem}>
            <summary><span>{locale === "he" ? "מערכת וארכיטקטורה" : "System & architecture"}</span><span aria-hidden className={styles.plus}>+</span></summary>
            <div className={styles.deepBody}>
              {project.metrics.length > 0 ? <MetricBlock metrics={project.metrics} locale={locale} /> : null}
              <div className={styles.technology}><p>{locale === "he" ? "טכנולוגיות" : "Technology"}</p><ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></div>
              {project.architecture ? <div className={styles.graph}><ArchitectureGraphLazy architecture={project.architecture} locale={locale} /></div> : null}
            </div>
          </details> : null}
          {project.decisions?.length ? <details className={styles.deepItem}><summary><span>{locale === "he" ? "החלטות ופשרות" : "Decisions & trade-offs"}</span><span aria-hidden className={styles.plus}>+</span></summary><div className={styles.deepBody}><DecisionLog decisions={project.decisions} locale={locale} /></div></details> : null}
          {project.feedback?.length ? <details className={styles.deepItem}><summary><span>{locale === "he" ? "משוב מהשטח" : "Field feedback"}</span><span aria-hidden className={styles.plus}>+</span></summary><div className={styles.deepBody}><FieldFeedback items={project.feedback} locale={locale} /></div></details> : null}
          {project.constraints ? <details className={styles.deepItem}><summary><span>{locale === "he" ? "משחק האילוצים" : "Constraint study"}</span><span aria-hidden className={styles.plus}>+</span></summary><div className={styles.deepBody}><ConstraintDial study={project.constraints} locale={locale} /></div></details> : null}
          {project.rebuild ? <details className={styles.deepItem}><summary><span>{t(ui.common.rebuildToday, locale)}</span><span aria-hidden className={styles.plus}>+</span></summary><div className={styles.deepBody}><RebuildList items={t(project.rebuild, locale)} /></div></details> : null}
        </div>
      </section> : null}

      {project.evidenceNote ? <aside className={styles.sourceNote}><span>{locale === "he" ? "הערת מקור" : "Source note"}</span><p>{t(project.evidenceNote, locale)}</p></aside> : null}
      <nav className={styles.next} aria-label={t(ui.common.nextCase, locale)}>
        <p>{t(ui.common.nextCase, locale)}</p>
        <Link href={href(`/work/${next.slug}`, locale)}><div><h2>{next.title}</h2><p>{t(next.hook, locale)}</p></div><span aria-hidden>{locale === "he" ? "←" : "→"}</span></Link>
      </nav>
    </article>
  );
}
