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
          <p className={styles.eyebrow}><svg className={styles.sun} viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M15 3v24M3 15h24M6.5 6.5l17 17m0-17-17 17" /></svg> Good to have you here.</p>
          <h1 id="welcome-title">Hey, I&apos;m <em>Tomer.</em></h1>
        </div>
        <LivingPortrait />
        <div className={styles.intro}>
          <p className={styles.lead}><span>A curious mind.</span>{" "}<span>A hands-on builder.</span></p>
          <p className={styles.description}>I turn messy problems into useful software—and make complex ideas a little easier to understand.</p>
          <div className={styles.roles} aria-label="What I do">
            <span>Software engineer</span><span>Product builder</span><span>Programming instructor</span>
          </div>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/work">Explore my work<Arrow /></Link>
            <Link className={styles.about} href="/about">A little about me<Arrow diagonal /></Link>
          </div>
          <p className={styles.current}><span aria-hidden="true" />Currently co-building <Link href="/work/arc">Arc</Link> &amp; teaching at Nitzanim.</p>
        </div>
        <div className={styles.footnote}>
          <p>Software. Product. People.<span>That&apos;s where I like to be.</span></p>
          <a href="#home-context-title">Come on in<Arrow /></a>
        </div>
      </div>
    </section>
  );
}
