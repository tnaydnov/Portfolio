import Link from "next/link";
import { now } from "@/content/site";
import { arc } from "@/content/work/arc";
import { applytide } from "@/content/work/applytide";
import { eventa } from "@/content/work/eventa";
import { site } from "@/lib/site";
import styles from "./home-details.module.css";

const projects = [
  { project: arc, category: "Learning & teaching", tone: "moss" },
  { project: applytide, category: "The job search", tone: "ochre" },
  { project: eventa, category: "People & connection", tone: "rose" },
] as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}

export function HomeDetails() {
  return (
    <div className={styles.details}>
      <div className={styles.container}>
        <section className={styles.context} aria-labelledby="home-context-title">
          <div className={styles.contextHeading}>
            <p className={styles.eyebrow}>A bit about me</p>
            <h2 id="home-context-title">A little context.</h2>
            <div className={styles.now}>
              <p><span aria-hidden="true" />Right now</p>
              <ul>{now.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
          <div className={styles.contextCopy}>
            <p className={styles.lead}>I like being close enough to a problem to understand the people behind it.</p>
            <p>Technical support taught me to look past the first symptom. Teaching taught me to make complicated things clear. Engineering gives me the tools to build something useful from both.</p>
            <div className={styles.contextLinks}>
              <Link href="/about">My background &amp; approach<Arrow diagonal /></Link>
              <a href={site.cv} download={site.cvFileName}>The short version: my CV<span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>

        <section className={styles.work} aria-labelledby="home-work-title">
          <div className={styles.workHeading}>
            <div>
              <p className={styles.eyebrow}>Selected work</p>
              <h2 id="home-work-title">A few things I&apos;ve built.</h2>
            </div>
            <Link className={styles.allWork} href="/work">All work<Arrow /></Link>
          </div>
          <div className={styles.projects}>
            {projects.map(({ project, category, tone }, index) => (
              <article key={project.slug} className={styles.project} data-tone={tone}>
                <Link className={styles.projectLink} href={`/work/${project.slug}`} aria-labelledby={`home-project-${project.slug}`}>
                  <span className={styles.projectNumber} aria-hidden="true">0{index + 1}</span>
                  <div className={styles.projectTitle}>
                    <p>{category}</p>
                    <h3 id={`home-project-${project.slug}`}>{project.title}</h3>
                    <p className={styles.projectStatus}>{project.statusLabel}</p>
                  </div>
                  <div className={styles.projectCopy}>
                    <p className={styles.projectDescription}>{project.oneLiner}</p>
                    <p className={styles.projectRole}><span>My role</span>{project.role}</p>
                    <p className={styles.projectTeam}>{project.team}</p>
                  </div>
                  <span className={styles.projectArrow}><Arrow diagonal /></span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.invitation} aria-labelledby="home-contact-title">
          <svg className={styles.invitationMark} viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M40 4v72M4 40h72M14.5 14.5l51 51m0-51-51 51" />
            <circle cx="40" cy="40" r="13" fill="currentColor" stroke="none" />
          </svg>
          <div className={styles.invitationCopy}>
            <p className={styles.eyebrow}>There&apos;s always room for a conversation</p>
            <h2 id="home-contact-title">Have something in mind?</h2>
            <p>A product question, a teaching idea, or a good problem to work on. I&apos;d love to hear about it.</p>
          </div>
          <div className={styles.contactLinks}>
            <Link className={styles.contactButton} href="/contact">Let&apos;s talk<Arrow /></Link>
            <a className={styles.email} href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </section>
      </div>
    </div>
  );
}
