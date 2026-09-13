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
          <p className={styles.lead}><span>I love turning ideas</span>{" "}<span>into useful products.</span></p>
          <p className={styles.description}>I&apos;m a software engineer who loves building from scratch: understanding people&apos;s needs, shaping ideas, and making them work.</p>
          <div className={styles.roles} aria-label="What I do">
            <span>Software engineer</span><span>Product builder</span>
          </div>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/work">Explore my work<Arrow /></Link>
            <Link className={styles.about} href="/about">A little about me<Arrow diagonal /></Link>
          </div>
          <p className={styles.current}><span aria-hidden="true" />At Nitzanim. Building and supporting <Link href="/work/arc">Arc</Link> &amp; <Link href="/work/browser-coder">Browser Coder</Link> with one coworker.</p>
        </div>
        <div className={styles.footnote}>
          <p><span className={styles.footLabel}>My kind of work</span>Understand. Create. Keep improving.</p>
          <a href="#home-context-title">A closer look<Arrow /></a>
        </div>
      </div>
    </section>
  );
}
