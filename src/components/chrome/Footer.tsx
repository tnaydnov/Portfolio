"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { NAV, href, site } from "@/lib/site";
import { now } from "@/content/site";
import styles from "./chrome.module.css";

export function Footer({ locale }: { locale: Locale }) {
  const isContact = usePathname() === href("/contact", locale);
  return <footer className={`${styles.footer} ${isContact ? styles.footerCompact : ""}`}><div className="shell">
    {!isContact && <div className={styles.footerInvitation}>
      <div><p className="label">{locale === "he" ? "משהו טוב מתחיל בשיחה" : "Good things start with a conversation"}</p><Link href={href("/contact", locale)} className={styles.hello}>{locale === "he" ? "בואו נדבר." : "Say hello."}<span aria-hidden="true">↗</span></Link></div>
      <div className={styles.footerNote}><p>{t(ui.contact.footerNote, locale)}</p><a href={`mailto:${site.email}`} dir="ltr">{site.email} <span aria-hidden="true">↗</span></a></div>
    </div>}
    <div className={styles.footerDirectory}>
      <div className={styles.footerNow}><p className="label">{t(now.label, locale)}</p><ul>{t(now.items, locale).map((item) => <li key={item}>{item}</li>)}</ul></div>
      <nav aria-label={locale === "he" ? "ניווט תחתון" : "Footer navigation"}><p className="label">{t(ui.common.site, locale)}</p>{NAV.map((item) => <Link key={item.key} href={href(item.href, locale)}>{t(ui.nav[item.key], locale)}</Link>)}</nav>
      <div><p className="label">{t(ui.common.elsewhere, locale)}</p><a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a><a href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a><a href={site.cv} download={site.cvFileName}>{t(ui.common.cvPdf, locale)} <span aria-hidden="true">↓</span></a></div>
    </div>
    <div className={styles.colophon}><p>© {new Date().getFullYear()} {t(site.name, locale)}</p><p>{locale === "he" ? "חשיבה רחבה. תשומת לב לפרטים." : "A wider perspective. An eye for the details."}</p><p>{t(site.location, locale)}</p></div>
  </div></footer>;
}
