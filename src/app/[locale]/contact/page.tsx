import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyEmailButton } from "@/components/about/CopyEmailButton";
import { isLocale, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href, site } from "@/lib/site";
import { ui } from "@/lib/ui";
import styles from "@/components/about/editorial-pages.module.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ locale, path: "/contact", title: t(ui.contact.title, locale), description: t(ui.contact.footerNote, locale) });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const he = locale === "he";
  return <div className={`shell ${styles.page}`}>
    <header className={styles.contactHero}>
      <div><p className="label">{t(ui.contact.title, locale)}</p><h1 className={styles.heroTitle}>{he ? "יש לכם" : "Have something"}<br /><em>{he ? "משהו בראש?" : "in mind?"}</em></h1><p className={styles.heroLede}>{t(ui.contact.footerNote, locale)}</p><a href={`mailto:${site.email}`} className={styles.contactQuickLink} dir="ltr">{site.email} <span aria-hidden="true">↗</span></a></div>
      <div className={styles.envelopeScene} aria-hidden="true"><div className={styles.envelopeNote}><span>{he ? "אל: תומר" : "To: Tomer"}</span><b>{he ? "בואו נדבר." : "Let's talk."}</b><i /></div><div className={styles.envelope}><span /></div></div>
    </header>

    <section className={styles.contactCard} aria-labelledby="email-title">
      <div><h2 id="email-title" className="label">{he ? "אפשר להתחיל מכמה מילים" : "A few lines are all it takes"}</h2><a className={styles.emailAddress} href={`mailto:${site.email}`} dir="ltr">{site.email}<span aria-hidden="true">↗</span></a><p>{he ? "תפקיד מעניין, מוצר שאתם בונים, בעיה ששווה לפתור או פשוט שאלה טובה." : "An interesting role, a product you're building, a problem worth solving, or simply a good question."}</p></div>
      <div className={styles.actions}><a href={`mailto:${site.email}`} className={styles.primaryButton}>{he ? "שליחת אימייל" : "Write an email"} <span aria-hidden="true">↗</span></a><CopyEmailButton email={site.email} locale={locale} /></div>
    </section>

    <section className={styles.contactLinks} aria-label={he ? "דרכים נוספות להכיר אותי" : "More ways to get to know me"}>
      <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer"><span className="label">{he ? "הצד המקצועי" : "The professional side"}</span><strong>LinkedIn <span aria-hidden="true">↗</span></strong><span>/in/tomer-naydnov</span></a>
      <a href={site.links.github} target="_blank" rel="noopener noreferrer"><span className="label">{he ? "מאחורי המוצרים" : "Behind the products"}</span><strong>GitHub <span aria-hidden="true">↗</span></strong><span>@tnaydnov</span></a>
      <a href={site.cv} download={site.cvFileName}><span className="label">{he ? "הסיפור בקצרה" : "The short version"}</span><strong>{he ? "קורות חיים" : "My CV"} <span aria-hidden="true">↓</span></strong><span>{he ? "הורדת PDF" : "Download PDF"}</span></a>
    </section>

    <section className={styles.contactContext}>
      <div><p className="label">{t(ui.contact.based, locale)}</p><p>{t(ui.contact.basedValue, locale)}</p></div>
      <div><p className="label">{t(ui.contact.lookingFor, locale)}</p><p>{t(ui.contact.lookingForValue, locale)}</p></div>
      <div><p className="label">{he ? "קצת יותר הקשר" : "A little more context"}</p><Link href={href("/work", locale)}>{he ? "לצפייה בעבודות" : "Explore the work"} <span aria-hidden="true">↗</span></Link><Link href={`${href("/about", locale)}#experience`}>{he ? "ניסיון והשכלה" : "Experience and education"} <span aria-hidden="true">↗</span></Link></div>
    </section>
  </div>;
}
