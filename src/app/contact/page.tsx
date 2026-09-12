import type { Metadata } from "next";
import Link from "next/link";
import { CopyEmailButton } from "@/components/about/CopyEmailButton";
import { pageMetadata } from "@/lib/metadata";
import { href, site } from "@/lib/site";
import { ui } from "@/lib/ui";
import styles from "@/components/about/editorial-pages.module.css";
export function generateMetadata(): Metadata {
    return pageMetadata({ path: "/contact", title: ui.contact.title, description: ui.contact.footerNote });
}
export default function ContactPage() {
    return <div className={`shell ${styles.page}`}>
    <header className={styles.contactHero}>
      <div><p className="label">{ui.contact.title}</p><h1 className={styles.heroTitle}>{"A good conversation."}<br /><em>{"A place to start."}</em></h1><p className={styles.heroLede}>{ui.contact.footerNote}</p><a href={`mailto:${site.email}`} className={styles.emailAddress} dir="ltr">{site.email} <span aria-hidden="true">↗</span></a><div className={styles.actions}><a href={`mailto:${site.email}`} className={styles.primaryButton}>{"Write an email"} <span aria-hidden="true">↗</span></a><CopyEmailButton email={site.email}/><a href={site.cv} download={site.cvFileName} className={styles.textLink}>{ui.common.cvPdf} <span aria-hidden="true">↓</span></a></div></div>
      <div className={styles.transmissionScene} aria-hidden="true"><svg viewBox="0 0 420 420" fill="none"><path d="M20 210h380M210 20v380" stroke="currentColor" opacity=".14"/><circle cx="210" cy="210" r="170" stroke="currentColor" opacity=".09"/><circle cx="210" cy="210" r="127" stroke="currentColor" opacity=".16"/><circle cx="210" cy="210" r="84" stroke="currentColor" opacity=".3"/><path d="M210 40a170 170 0 0 1 170 170M210 337a127 127 0 0 1-127-127" stroke="currentColor" opacity=".65"/><path d="M32 340h72l58-58M316 80h72M334 80l-39 39" stroke="currentColor" opacity=".45"/><circle cx="162" cy="282" r="4" fill="currentColor"/><circle cx="295" cy="119" r="4" fill="currentColor"/><circle cx="210" cy="40" r="4" fill="currentColor"/><path d="M16 42V16h26m336 0h26v26M16 378v26h26m336 0h26v-26" stroke="currentColor" opacity=".3"/></svg><span>@</span></div>
    </header>

    <section className={styles.contactNote} aria-labelledby="email-title">
      <h2 id="email-title" className="label">{"A few lines are all it takes"}</h2><p>{"An interesting role, a product you're building, a problem worth solving, or simply a good question."}</p>
    </section>

    <section className={styles.contactLinks} aria-label={"More ways to get to know me"}>
      <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer"><span className="label">{"The professional side"}</span><strong>LinkedIn <span aria-hidden="true">↗</span></strong><span>/in/tomer-naydnov</span></a>
      <a href={site.links.github} target="_blank" rel="noopener noreferrer"><span className="label">{"Behind the products"}</span><strong>GitHub <span aria-hidden="true">↗</span></strong><span>@tnaydnov</span></a>
      <a href={site.cv} download={site.cvFileName}><span className="label">{"The short version"}</span><strong>{"My CV"} <span aria-hidden="true">↓</span></strong><span>{"Download PDF"}</span></a>
    </section>

    <section className={styles.contactContext}>
      <div><p className="label">{ui.contact.based}</p><p>{ui.contact.basedValue}</p></div>
      <div><p className="label">{ui.contact.lookingFor}</p><p>{ui.contact.lookingForValue}</p></div>
      <div><p className="label">{"A little more context"}</p><Link href={href("/work")}>{"Explore the work"} <span aria-hidden="true">↗</span></Link><Link href={`${href("/about")}#experience`}>{"Experience and education"} <span aria-hidden="true">↗</span></Link></div>
    </section>
  </div>;
}
