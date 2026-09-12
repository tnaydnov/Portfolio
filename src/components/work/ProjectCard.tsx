import Link from "next/link";
import { ProductCover } from "@/components/artifacts/ProductCover";
import { STATUS_LABEL, type Project } from "@/lib/types";
import styles from "./work.module.css";

export function ProjectCard({ project, featured = false, index }: {
  project: Project;
  featured?: boolean;
  index?: number;
}) {
  const titleId = `project-${project.slug}-title`;
  return <article id={project.slug} className={styles.project} data-featured={featured} data-project={project.slug}>
    <Link href={`/work/${project.slug}`} className={styles.projectLink} aria-labelledby={titleId}>
      <ProductCover project={project}/>
      <div className={styles.projectCopy}>
        <div className={styles.projectHeading}>
          <h3 id={titleId}>{project.title}</h3>
          <span className={styles.status} data-status={project.status}>{project.statusLabel ?? STATUS_LABEL[project.status]}</span>
        </div>
        <p className={styles.projectRole}>{project.role}</p>
        <p className={styles.summary}>{project.oneLiner}</p>
        <div className={styles.projectFoot}>
          <span className={styles.projectNumber}>{index === undefined ? "PROJECT NOTES" : `PROJECT ${String(index + 1).padStart(2, "0")}`}</span>
          <span className={styles.readLink}>Explore project<span aria-hidden="true">↗</span></span>
        </div>
      </div>
    </Link>
  </article>;
}
