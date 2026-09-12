import type { Metadata } from "next";
import { ProjectCard } from "@/components/work/ProjectCard";
import { EarlierWorkLedger } from "@/components/work/RepsLedger";
import { EARLIER_ENGINEERING, SELECTED_WORK } from "@/content/work";
import { pageMetadata } from "@/lib/metadata";
import { ui } from "@/lib/ui";
import styles from "@/components/work/work.module.css";
export function generateMetadata(): Metadata {
    return pageMetadata({ path: "/work", title: ui.work.title, description: ui.work.intro });
}
export default function WorkPage() {
    return (<div className={`shell ${styles.page}`}>
      <p className={styles.eyebrow}>{"Selected projects / Product & engineering"}</p>
      <header className={styles.header}>
        <h1>{ui.work.title}<span className={styles.titleMark} aria-hidden>↘</span></h1>
        <div className={styles.headerCopy}>
          <p>{ui.work.intro}</p>
          <span>{"From the need, through the decisions, to the system."}</span>
        </div>
      </header>
      <nav className={styles.quickIndex} aria-label={"Jump to a project"}>
        {SELECTED_WORK.map((project, index) => <a key={project.slug} href={`#${project.slug}`}><span>{String(index + 1).padStart(2, "0")}</span>{project.title}<span aria-hidden>↓</span></a>)}
        <a href="#archive-title"><span>05+</span>{"Earlier engineering"}<span aria-hidden>↓</span></a>
      </nav>
      <section aria-labelledby="selected-work-title">
        <div className={styles.indexHead}><h2 id="selected-work-title">{ui.work.selectedTitle} / 01—{String(SELECTED_WORK.length).padStart(2, "0")}</h2><span>{ui.work.selectedIntro}</span></div>
        <div className={styles.list}>
          {SELECTED_WORK.map((project, index) => <ProjectCard key={project.slug} project={project} index={index}/>)}
        </div>
      </section>
      <section className={styles.archive} aria-labelledby="archive-title">
        <div className={styles.indexHead}><span>{ui.work.repsTitle}</span><span>{ui.work.repsSpan}</span></div>
        <div className={styles.archiveIntro}>
          <h2 id="archive-title">{ui.work.repsHeading}</h2>
          <p>{ui.work.repsIntro}</p>
        </div>
        <EarlierWorkLedger projects={EARLIER_ENGINEERING}/>
      </section>
    </div>);
}
