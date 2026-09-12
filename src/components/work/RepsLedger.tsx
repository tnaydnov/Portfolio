import Link from "next/link";
import { formatSpan, type Project } from "@/lib/types";
import styles from "./work.module.css";

export function EarlierWorkLedger({ projects }: { projects: Project[] }) {
  return <ul className={styles.ledger}>
    {projects.map((project) => {
      const hasCase = project.tier !== "rep" || Boolean(project.snapshot && project.sections?.length);
      const content = <>
        <div className={styles.ledgerBody}>
          <div className={styles.ledgerMeta}><span>{formatSpan(project)}</span><span>{hasCase ? "Project notes" : "Source code"}</span></div>
          <h3>{project.title}</h3>
          <p className={styles.ledgerDescription}>{project.oneLiner}</p>
          <p className={styles.stack}>{project.role}</p>
        </div>
        <span className={styles.ledgerArrow} aria-hidden="true">↗</span>
      </>;
      return <li key={project.slug} className={styles.ledgerItem}>
        {hasCase ? <Link href={`/work/${project.slug}`} className={styles.ledgerLink}>{content}</Link> : project.links?.repo ? <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={styles.ledgerLink}>{content}</a> : <div className={styles.ledgerLink}>{content}</div>}
      </li>;
    })}
  </ul>;
}
