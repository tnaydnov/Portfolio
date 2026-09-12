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
  return <div className={`shell ${styles.page}`}>
    <header className={styles.header}>
      <div>
        <p className={styles.eyebrow}>Product / Platform / Engineering</p>
        <h1>Work, in practice.</h1>
      </div>
      <div className={styles.headerCopy}>
        <p>Learning platforms, independent products, and the engineering behind them.</p>
        <a href="#archive-title">Earlier engineering<span aria-hidden="true">↓</span></a>
      </div>
    </header>
    <section aria-labelledby="selected-work-title">
      <div className={styles.indexHead}>
        <h2 id="selected-work-title">Selected products</h2>
        <span>{String(SELECTED_WORK.length).padStart(2, "0")} projects</span>
      </div>
      <div className={styles.list}>
        {SELECTED_WORK.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
      </div>
    </section>
    <section className={styles.archive} aria-labelledby="archive-title">
      <div className={styles.archiveIntro}>
        <div><p className={styles.eyebrow}>The engineering foundation</p><h2 id="archive-title">Earlier projects.</h2></div>
        <p>Computer vision, systems and university projects. Different problems, with the same attention to how the pieces work together.</p>
      </div>
      <EarlierWorkLedger projects={EARLIER_ENGINEERING} />
    </section>
  </div>;
}
