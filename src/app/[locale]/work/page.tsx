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
      <p className={styles.eyebrow}>{locale === "he" ? "רעיונות שפגשו את המציאות" : "Ideas, put into practice"}</p>
      <header className={styles.header}>
        <h1>{t(ui.work.title, locale)}<span className="text-signal">.</span></h1>
        <div className={styles.headerCopy}>
          <p>{t(ui.work.intro, locale)}</p>
          <span>{locale === "he" ? "סקירה מהירה. עומק לפי בחירה." : "A quick read. Room to go deeper."}</span>
        </div>
      </header>
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
