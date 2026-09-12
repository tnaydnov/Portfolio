import styles from "./career-timeline.module.css";

export interface TimelineEntry {
  id: string;
  span: string;
  title: string;
  org: string;
  summary: string;
  current?: boolean;
}
export interface ExperienceEntry extends TimelineEntry { details: string[]; }
interface ExperienceLabels { current: string; roleDetails: string; closeDetails: string; responsibilities: string; }

export function ExperienceTimeline({ entries, labels }: { entries: ExperienceEntry[]; labels: ExperienceLabels }) {
  return <ol className={styles.timeline}>
    {entries.map((entry, index) => <li key={entry.id} className={styles.item}>
      <div className={styles.chronology}><span className={styles.sequence} aria-hidden="true">0{index + 1}</span><p><bdi>{entry.span}</bdi></p>{entry.current && <span className={styles.current}>{labels.current}</span>}</div>
      <article className={styles.role} aria-labelledby={`experience-${entry.id}`}>
        <p className={styles.org}>{entry.org}</p>
        <h3 id={`experience-${entry.id}`} className={styles.title}>{entry.title}</h3>
        <p className={styles.summary}>{entry.summary}</p>
        <details className={styles.disclosure}>
          <summary><span className={styles.closedCue}>{labels.roleDetails}</span><span className={styles.openCue}>{labels.closeDetails}</span><span className={styles.disclosureMark} aria-hidden="true">+</span></summary>
          <div className={styles.detailPanel}><p className={styles.detailLabel}>{labels.responsibilities}</p><ul>{entry.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div>
        </details>
      </article>
    </li>)}
  </ol>;
}

export function EducationTimeline({ entries, currentLabel }: { entries: TimelineEntry[]; currentLabel: string }) {
  return <ol className={styles.educationTimeline}>
    {entries.map((entry) => <li key={entry.id} className={styles.educationItem}>
      <div className={styles.educationDate}><bdi>{entry.span}</bdi>{entry.current && <span className={styles.current}>{currentLabel}</span>}</div>
      <article aria-labelledby={`education-${entry.id}`}><h3 id={`education-${entry.id}`} className={styles.title}>{entry.title}</h3><p className={styles.org}>{entry.org}</p><p className={styles.summary}>{entry.summary}</p></article>
    </li>)}
  </ol>;
}
