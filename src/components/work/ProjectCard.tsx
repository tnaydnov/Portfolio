import Link from "next/link";
import { ProjectArtifact } from "@/components/artifacts";
import { href } from "@/lib/site";
import { DOMAIN_LABEL, STATUS_LABEL, formatSpan, type Project } from "@/lib/types";
import styles from "./work.module.css";
export function ProjectCard({ project, featured = false, index }: {
    project: Project;
    featured?: boolean;
    index?: number;
}) {
    return (<article id={project.slug} className={styles.project} data-featured={featured} data-project={project.slug}>
      <Link href={href(`/work/${project.slug}`)} className={styles.projectLink}>
        <div className={styles.projectHeading}>
          <span className={styles.projectNumber}>{index !== undefined ? String(index + 1).padStart(2, "0") : "↗"}</span>
          <h3>{project.title}</h3>
          <span className={styles.coverArrow} aria-hidden>{"↗"}</span>
        </div>
        <div className={styles.cover}>
          <ProjectArtifact slug={project.slug} size="hero"/>
        </div>
        <div className={styles.projectCopy}>
          <div className={styles.projectOverview}>
          <div className={styles.projectMeta}>
            <span>{project.domain.map((domain) => DOMAIN_LABEL[domain]).join(" / ")}</span>
          </div>
          <p className={styles.hook}>{project.hook}</p>
          <span className={styles.readLink}>{"Inside the project"}<span aria-hidden>{"→"}</span></span>
          </div>
          {project.snapshot ? (<dl className={styles.projectFacts}>
              <div><dt>{"The move"}</dt><dd>{project.snapshot.move}</dd></div>
              <div><dt>{"My part"}</dt><dd>{project.snapshot.contribution}</dd></div>
            </dl>) : null}
          <div className={styles.projectFoot}>
            <div><span>{formatSpan(project)}</span><p>{project.role}</p></div>
            <span className={styles.status}>{project.statusLabel ? project.statusLabel : STATUS_LABEL[project.status]}</span>
          </div>
        </div>
      </Link>
    </article>);
}
