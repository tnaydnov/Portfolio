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
    <article className={styles.project} data-featured={featured}>
      <Link href={href(`/work/${project.slug}`, locale)} className={styles.projectLink}>
        <div className={styles.cover}>
          <ProjectArtifact slug={project.slug} locale={locale} size="hero" />
          <span className={styles.coverArrow} aria-hidden>↗</span>
        </div>
        <div className={styles.projectCopy}>
          <div className={styles.projectMeta}>
            <span className={styles.projectNumber}>{index !== undefined ? String(index + 1).padStart(2, "0") : "↗"}</span>
            <span>{project.domain.map((domain) => t(DOMAIN_LABEL[domain], locale)).join(" / ")}</span>
          </div>
          <h3>{project.title}</h3>
          <p className={styles.hook}>{t(project.hook, locale)}</p>
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
          <span className={styles.readLink}>{locale === "he" ? "לסיפור המלא" : "Inside the project"}<span aria-hidden>{locale === "he" ? "←" : "→"}</span></span>
        </div>
      </Link>
    </article>
  );
}
