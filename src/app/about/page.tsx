import Link from "next/link";
import { EducationTimeline, ExperienceTimeline } from "@/components/about/CareerTimeline";
import { brief, educationTimeline, experienceTimeline } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";
import styles from "@/components/about/editorial-pages.module.css";

export const metadata = pageMetadata({ path: "/about", title: ui.about.title, description: ui.about.lede });

const workflow = [
  { title: "Understand", body: "Talk to the people involved. Find the need behind the first request." },
  { title: "Shape", body: "Explore ideas, make choices and define what the product needs to do." },
  { title: "Build", body: "Work through the design, code and details that make it usable." },
  { title: "Improve", body: "Support it after launch, listen to feedback and build the next version." },
];

export default function AboutPage() {
  return (
    <div className={`shell ${styles.page}`}>
      <header className={styles.aboutHero}>
        <div>
          <p className={styles.kicker}>01 / About</p>
          <h1 className={styles.heroTitle}>About Tomer.</h1>
          <p className={styles.heroLede}>{ui.about.lede}</p>
          <div className={styles.actions}>
            <a href={site.cv} download={site.cvFileName} className={styles.primaryButton}>Download CV <span aria-hidden="true">↓</span></a>
            <Link href="/contact" className={styles.textLink}>Get in touch <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <section id="current" className={styles.currentWork} aria-labelledby="current-work-title">
          <p className={styles.kicker}><span className={styles.statusDot} aria-hidden="true" />Current work / Nitzanim</p>
          <h2 id="current-work-title">{site.role}</h2>
          <p>I lead educational projects and develop learning content. One coworker and I also develop and support Arc and Browser Coder.</p>
          <p>Both products are live and continually expanded, serving 3,000+ students, instructors and managers across the combined platform.</p>
          <div className={styles.currentScope}><span>Product development</span><span>Support</span><span>Iteration</span></div>
          <Link href="/work">Explore the products <span aria-hidden="true">↗</span></Link>
        </section>
      </header>

      <nav className={styles.pageIndex} aria-label="About page sections">
        <a href="#current">Current work</a>
        <a href="#experience">Experience</a>
        <a href="#education">Education</a>
        <a href="#approach">Approach</a>
      </nav>

      <section id="experience" className={styles.splitSection} aria-labelledby="experience-title">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>02 / Experience</p>
          <h2 id="experience-title">What shaped how I build.</h2>
          <p>Technical support and earlier teaching work shaped how I investigate problems, explain decisions and understand the people using my software.</p>
        </div>
        <ExperienceTimeline entries={experienceTimeline} labels={{ current: ui.about.currentRole, roleDetails: ui.about.roleDetails, closeDetails: ui.about.closeDetails, responsibilities: ui.about.responsibilities }} />
      </section>

      <section id="education" className={styles.splitSection} aria-labelledby="education-title">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>03 / Education</p>
          <h2 id="education-title">Software and systems.</h2>
          <p>A completed software engineering degree, followed by current studies in how systems and processes work.</p>
        </div>
        <EducationTimeline entries={educationTimeline} currentLabel={ui.about.currentStudies} />
      </section>

      <section id="approach" className={styles.approach} aria-labelledby="approach-title">
        <div className={styles.approachHeading}>
          <div><p className={styles.kicker}>04 / Approach</p><h2 id="approach-title">I enjoy the whole process.</h2></div>
          <p>Understanding the need, exploring an idea, writing the code and seeing what needs to change once people use it.</p>
        </div>
        <ol className={styles.process}>
          {workflow.map((step, index) => (
            <li key={step.title}>
              <span className={styles.processNumber}>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {index < workflow.length - 1 ? <span className={styles.processConnector} aria-hidden="true">→</span> : null}
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.fitSection} aria-labelledby="fit-title">
        <div className={styles.sectionHeading}><p className={styles.kicker}>05 / Working together</p><h2 id="fit-title">A good fit.</h2><p>{ui.about.wantBody[0]}</p><Link href="/contact" className={styles.textLink}>Start a conversation <span aria-hidden="true">↗</span></Link></div>
        <dl>{brief.map((row) => <div key={row.term}><dt>{row.term}</dt><dd>{row.def}</dd></div>)}</dl>
      </section>
    </div>
  );
}
