import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/work/ProjectCard";
import { EarlierWorkLedger } from "@/components/work/RepsLedger";
import { EARLIER_ENGINEERING, SELECTED_WORK } from "@/content/work";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { ui } from "@/lib/ui";
import styles from "@/components/work/work.module.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ locale, path: "/work", title: t(ui.work.title, locale), description: t(ui.work.intro, locale) });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  return (
    <div className={`shell ${styles.page}`}>
      <p className={styles.eyebrow}>{locale === "he" ? "מבחר פרויקטים / מוצר והנדסה" : "Selected projects / Product & engineering"}</p>
      <header className={styles.header}>
        <h1>{t(ui.work.title, locale)}<span className={styles.titleMark} aria-hidden>↘</span></h1>
        <div className={styles.headerCopy}>
          <p>{t(ui.work.intro, locale)}</p>
          <span>{locale === "he" ? "מהצורך, דרך ההחלטות, ועד המערכת." : "From the need, through the decisions, to the system."}</span>
        </div>
      </header>
      <nav className={styles.quickIndex} aria-label={locale === "he" ? "מעבר לפרויקט" : "Jump to a project"}>
        {SELECTED_WORK.map((project, index) => <a key={project.slug} href={`#${project.slug}`}><span>{String(index + 1).padStart(2, "0")}</span>{project.title}<span aria-hidden>↓</span></a>)}
        <a href="#archive-title"><span>05+</span>{locale === "he" ? "עבודות קודמות" : "Earlier engineering"}<span aria-hidden>↓</span></a>
      </nav>
      <section aria-labelledby="selected-work-title">
        <div className={styles.indexHead}><h2 id="selected-work-title">{t(ui.work.selectedTitle, locale)} / 01—{String(SELECTED_WORK.length).padStart(2, "0")}</h2><span>{t(ui.work.selectedIntro, locale)}</span></div>
        <div className={styles.list}>
          {SELECTED_WORK.map((project, index) => <ProjectCard key={project.slug} project={project} locale={locale} index={index} />)}
        </div>
      </section>
      <section className={styles.archive} aria-labelledby="archive-title">
        <div className={styles.indexHead}><span>{t(ui.work.repsTitle, locale)}</span><span>{t(ui.work.repsSpan, locale)}</span></div>
        <div className={styles.archiveIntro}>
          <h2 id="archive-title">{t(ui.work.repsHeading, locale)}</h2>
          <p>{t(ui.work.repsIntro, locale)}</p>
        </div>
        <EarlierWorkLedger projects={EARLIER_ENGINEERING} locale={locale} />
      </section>
    </div>
  );
}
