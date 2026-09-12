import Link from "next/link";
import { href } from "@/lib/site";
import { formatSpan, type Project } from "@/lib/types";
import styles from "./work.module.css";
export function EarlierWorkLedger({ projects }: {
    projects: Project[];
}) {
    return (<ul className={styles.ledger}>
      {projects.map((project) => {
            const takeaway = project.taught ?? project.snapshot?.move;
            const hasCase = project.tier !== "rep" || Boolean(project.snapshot && project.sections?.length);
            const content = <>
          <div className={styles.ledgerMeta}><span>{formatSpan(project)}</span><span>{hasCase ? ("Case study") : "GitHub"}</span></div>
          <div className={styles.ledgerBody}>
          <h3>{project.title}</h3>
          <p className={styles.ledgerDescription}>{project.oneLiner}</p>
          {takeaway ? <p className={styles.takeaway}>{takeaway}</p> : null}
          <p className={styles.stack}>{project.role} · {project.stack.join(" · ")}</p>
          </div>
          <span className={styles.ledgerArrow} aria-hidden>{"↗"}</span>
        </>;
            return <li key={project.slug} className={styles.ledgerItem}>
          {hasCase ? <Link href={href(`/work/${project.slug}`)} className={styles.ledgerLink}>{content}</Link> : <a href={project.links?.repo} target="_blank" rel="noopener noreferrer" className={styles.ledgerLink}>{content}</a>}
        </li>;
        })}
    </ul>);
}
