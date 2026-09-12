import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { href } from "@/lib/site";
import { formatSpan, type Project } from "@/lib/types";
import styles from "./work.module.css";

export function EarlierWorkLedger({ projects, locale }: { projects: Project[]; locale: Locale }) {
  return (
    <ul className={styles.ledger}>
      {projects.map((project) => {
        const takeaway = project.taught ?? project.snapshot?.move;
        const hasCase = project.tier !== "rep" || Boolean(project.snapshot && project.sections?.length);
        const content = <>
          <div className={styles.ledgerMeta}><span>{formatSpan(project, locale)}</span><span>{hasCase ? (locale === "he" ? "מקרה בוחן" : "Case study") : "GitHub"}</span></div>
          <div className={styles.ledgerBody}>
          <h3>{project.title}</h3>
          <p className={styles.ledgerDescription}>{t(project.oneLiner, locale)}</p>
          {takeaway ? <p className={styles.takeaway}>{t(takeaway, locale)}</p> : null}
          <p className={styles.stack}>{t(project.role, locale)} · {project.stack.join(" · ")}</p>
          </div>
          <span className={styles.ledgerArrow} aria-hidden>{locale === "he" ? "↖" : "↗"}</span>
        </>;
        return <li key={project.slug} className={styles.ledgerItem}>
          {hasCase ? <Link href={href(`/work/${project.slug}`, locale)} className={styles.ledgerLink}>{content}</Link> : <a href={project.links?.repo} target="_blank" rel="noopener noreferrer" className={styles.ledgerLink}>{content}</a>}
        </li>;
      })}
    </ul>
  );
}
