import Link from "next/link";
import { LivingPortrait } from "./LivingPortrait";
import styles from "./welcome-home.module.css";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} /></svg>;
}

export function WelcomeHome() {
  return (
    <section className={styles.hero} data-testid="welcome-hero" aria-labelledby="welcome-title">
      <div className={styles.daylight} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}><span className={styles.sun} aria-hidden="true" />Hello, world. Good to have you here.</p>
          <h1 id="welcome-title">Hey, I&apos;m <em>Tomer.</em></h1>
        </div>
        <LivingPortrait />
        <div className={styles.intro}>
          <p className={styles.lead}><span>Good learning needs</span>{" "}<span>good building.</span></p>
          <p className={styles.description}>I lead educational projects, develop learning content, and build the software that connects them.</p>
          <div className={styles.roles} aria-label="What I do">
            <span>Software engineer</span><span>EdTech project leader</span><span>Content developer</span>
          </div>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/work">Explore my work<Arrow /></Link>
            <Link className={styles.about} href="/about">A little about me<Arrow diagonal /></Link>
          </div>
          <p className={styles.current}><span aria-hidden="true" />At Nitzanim. Building with the <Link href="/work/arc">Arc</Link> &amp; <Link href="/work/browser-coder">Browser Coder</Link> teams.</p>
        </div>
        <div className={styles.footnote}>
          <p><span className={styles.footLabel}>My kind of work</span>People → ideas → useful software.</p>
          <a href="#home-context-title">A closer look<Arrow /></a>
        </div>
      </div>
    </section>
  );
}
