import Link from "next/link";
import { CopyEmailButton } from "@/components/about/CopyEmailButton";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";
import styles from "@/components/about/editorial-pages.module.css";

export const metadata = pageMetadata({ path: "/contact", title: ui.contact.title, description: ui.contact.footerNote });

export default function ContactPage() {
  return (
    <div className={`shell ${styles.page}`}>
      <header className={styles.contactHero}>
        <div>
          <p className={styles.kicker}>01 / Contact</p>
          <h1 className={styles.heroTitle}>Let’s talk.</h1>
          <p className={styles.heroLede}>{ui.contact.lede}</p>
          <a href={`mailto:${site.email}`} className={styles.emailAddress}>{site.email} <span aria-hidden="true">↗</span></a>
          <div className={styles.actions}>
            <a href={`mailto:${site.email}`} className={styles.primaryButton}>Write an email <span aria-hidden="true">↗</span></a>
            <CopyEmailButton email={site.email} />
          </div>
        </div>
        <aside className={styles.contactGuide} aria-labelledby="message-title">
          <svg className={styles.messageDiagram} viewBox="0 0 340 92" fill="none" aria-hidden="true">
            <path d="M18 25h84v56H18zM18 25l42 29 42-29" stroke="currentColor" strokeWidth="1.5" />
            <path d="M115 52h45l18-18h56M226 28l8 6-8 6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M250 13h70v53h-20l-16 14V66h-34z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M265 30h40m-40 14h26" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <p className={styles.kicker}>A starting point</p>
          <h2 id="message-title">A few lines are enough.</h2>
          <p>Tell me what you’re working on, what you have in mind and where I could help.</p>
        </aside>
      </header>

      <section className={styles.contactLinks} aria-label="Profiles and CV">
        <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer"><span className={styles.kicker}>02 / Profile</span><strong>LinkedIn <span aria-hidden="true">↗</span></strong><span>Professional background and connections</span></a>
        <a href={site.links.github} target="_blank" rel="noopener noreferrer"><span className={styles.kicker}>03 / Code</span><strong>GitHub <span aria-hidden="true">↗</span></strong><span>Source code and engineering projects</span></a>
        <a href={site.cv} download={site.cvFileName}><span className={styles.kicker}>04 / CV</span><strong>Download CV <span aria-hidden="true">↓</span></strong><span>Experience, education and skills · PDF</span></a>
      </section>

      <section className={styles.contactContext} aria-label="Working together">
        <div><p className={styles.kicker}>{ui.contact.based}</p><p>{ui.contact.basedValue}</p></div>
        <div><p className={styles.kicker}>{ui.contact.lookingFor}</p><p>{ui.contact.lookingForValue}</p></div>
        <div><p className={styles.kicker}>A little more context</p><Link href="/work">Explore the work <span aria-hidden="true">↗</span></Link><Link href="/about#experience">Experience and education <span aria-hidden="true">↗</span></Link></div>
      </section>
    </div>
  );
}
