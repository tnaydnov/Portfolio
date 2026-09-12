import Link from "next/link";
import { ProjectArtifact } from "@/components/artifacts";
import { t, type Locale } from "@/lib/i18n";
import { href } from "@/lib/site";
import { DOMAIN_LABEL, STATUS_LABEL, formatSpan, type Project } from "@/lib/types";
import styles from "./work.module.css";

export function ProjectCard({ project, locale, featured = false, index }: {
  project: Project;
  locale: Locale;
  featured?: boolean;
  index?: number;
}) {
  return (
    <article id={project.slug} className={styles.project} data-featured={featured} data-project={project.slug}>
      <Link href={href(`/work/${project.slug}`, locale)} className={styles.projectLink}>
        <div className={styles.projectHeading}>
          <span className={styles.projectNumber}>{index !== undefined ? String(index + 1).padStart(2, "0") : "↗"}</span>
          <h3>{project.title}</h3>
          <span className={styles.coverArrow} aria-hidden>{locale === "he" ? "↖" : "↗"}</span>
        </div>
        <div className={styles.cover}>
          <ProjectArtifact slug={project.slug} locale={locale} size="hero" />
        </div>
        <div className={styles.projectCopy}>
          <div className={styles.projectOverview}>
          <div className={styles.projectMeta}>
            <span>{project.domain.map((domain) => t(DOMAIN_LABEL[domain], locale)).join(" / ")}</span>
          </div>
          <p className={styles.hook}>{t(project.hook, locale)}</p>
          <span className={styles.readLink}>{locale === "he" ? "לסיפור המלא" : "Inside the project"}<span aria-hidden>{locale === "he" ? "←" : "→"}</span></span>
          </div>
          {project.snapshot ? (
            <dl className={styles.projectFacts}>
              <div><dt>{locale === "he" ? "המהלך" : "The move"}</dt><dd>{t(project.snapshot.move, locale)}</dd></div>
              <div><dt>{locale === "he" ? "התרומה שלי" : "My part"}</dt><dd>{t(project.snapshot.contribution, locale)}</dd></div>
            </dl>
          ) : null}
          <div className={styles.projectFoot}>
            <div><span>{formatSpan(project, locale)}</span><p>{t(project.role, locale)}</p></div>
            <span className={styles.status}>{project.statusLabel ? t(project.statusLabel, locale) : t(STATUS_LABEL[project.status], locale)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
