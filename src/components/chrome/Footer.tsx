import Link from "next/link";
import { ui } from "@/lib/ui";
import { NAV, href, site } from "@/lib/site";
import { now } from "@/content/site";
import styles from "./chrome.module.css";
export function Footer() {
    return <footer className={styles.footer}><div className="shell">
    <div className={styles.footerDirectory}>
      <div className={styles.footerIdentity}><Link href={href("/")} className={styles.footerName}>{site.name}<span aria-hidden="true">↗</span></Link><p>{site.positioning}</p><a href={`mailto:${site.email}`} dir="ltr">{site.email}</a></div>
      <div className={styles.footerNow}><p className="label">{now.label}</p><ul>{now.items.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <nav aria-label={"Footer navigation"}><p className="label">{ui.common.site}</p>{NAV.map((item) => <Link key={item.key} href={href(item.href)}>{ui.nav[item.key]}</Link>)}</nav>
      <div><p className="label">{ui.common.elsewhere}</p><a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a><a href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a><a href={site.cv} download={site.cvFileName}>{ui.common.cvPdf} <span aria-hidden="true">↓</span></a></div>
    </div>
    <div className={styles.colophon}><p>© {new Date().getFullYear()} {site.name}</p><p>{"Software. Product. People."}</p><p>{site.location}</p></div>
  </div></footer>;
}
