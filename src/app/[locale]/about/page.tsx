import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EducationTimeline, ExperienceTimeline } from "@/components/about/CareerTimeline";
import { brief, educationTimeline, experienceTimeline } from "@/content/site";
import { isLocale, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href, site } from "@/lib/site";
import { ui } from "@/lib/ui";
import styles from "@/components/about/editorial-pages.module.css";

function Rich({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : <span key={index}>{part}</span>)}</>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ locale, path: "/about", title: t(ui.about.title, locale), description: t(ui.about.lede, locale) });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const he = locale === "he";
  const experience = experienceTimeline.map((entry) => ({ id: entry.id, span: t(entry.span, locale), title: t(entry.title, locale), org: t(entry.org, locale), summary: t(entry.summary, locale), details: t(entry.details, locale), current: entry.current }));
  const education = educationTimeline.map((entry) => ({ id: entry.id, span: t(entry.span, locale), title: t(entry.title, locale), org: t(entry.org, locale), summary: t(entry.summary, locale), current: entry.current }));

  return <div className={`shell ${styles.page}`}>
    <header className={styles.aboutHero}>
      <div>
        <p className="label">{t(ui.about.title, locale)} <span className={styles.labelDot}>/</span> {t(site.name, locale)}</p>
        <h1 className={styles.heroTitle}>{he ? "סקרן מטבעי." : "Curious by nature."}<br /><em>{he ? "מהנדס בהכשרתי." : "Engineer by training."}</em></h1>
        <p className={styles.heroLede}>{t(ui.about.lede, locale)}</p>
        <div className={styles.actions}><a href={site.cv} download={site.cvFileName} className={styles.primaryButton}>{t(ui.common.downloadCv, locale)} <span aria-hidden="true">↓</span></a><Link href={href("/contact", locale)} className={styles.textLink}>{t(ui.about.getInTouch, locale)}</Link></div>
      </div>
      <div className={styles.profileCard}>
        <div className={styles.identityFold} aria-hidden="true"><span /><span /><span /><b>tn.</b></div>
        <div className={styles.profileCaption}><p>{t(site.name, locale)}</p><span>{t(site.role, locale)}</span></div>
        <p className={styles.profileNote}>{t(site.description, locale)}</p>
      </div>
    </header>

    <nav className={styles.pageIndex} aria-label={he ? "תוכן עמוד האודות" : "About page sections"}>
      <span className="label">{he ? "בעמוד הזה" : "On this page"}</span>
      <a href="#experience">{t(ui.about.experienceTitle, locale)} <span aria-hidden="true">↓</span></a><a href="#education">{t(ui.about.educationTitle, locale)} <span aria-hidden="true">↓</span></a><a href="#teaching">{he ? "הוראה" : "Teaching"} <span aria-hidden="true">↓</span></a><a href="#approach">{he ? "הגישה שלי" : "My approach"} <span aria-hidden="true">↓</span></a>
    </nav>

    <section id="experience" className={styles.splitSection} aria-labelledby="experience-title">
      <div className={styles.sectionHeading}><p className="label">01 / {he ? "מהשטח" : "In practice"}</p><h2 id="experience-title">{t(ui.about.experienceTitle, locale)}</h2><p>{he ? "תכנות, אנשים והבעיות שביניהם." : "Programming, people, and the problems in between."}</p></div>
      <ExperienceTimeline entries={experience} labels={{ current: t(ui.about.currentRole, locale), roleDetails: t(ui.about.roleDetails, locale), closeDetails: t(ui.about.closeDetails, locale), responsibilities: t(ui.about.responsibilities, locale) }} />
    </section>

    <section id="education" className={styles.splitSection} aria-labelledby="education-title">
      <div className={styles.sectionHeading}><p className="label">02 / {he ? "מרחיב את המבט" : "Broadening the lens"}</p><h2 id="education-title">{t(ui.about.educationTitle, locale)}</h2><p>{he ? "בסיס בהנדסת תוכנה. מבט רחב יותר על המערכת כולה." : "A foundation in software. A wider view of the whole system."}</p></div>
      <EducationTimeline entries={education} currentLabel={t(ui.about.currentStudies, locale)} />
    </section>

    <section id="teaching" className={styles.teachingSection} aria-labelledby="teaching-title">
      <div className={styles.teachingHeading}><p className="label">03 / {t(ui.about.teachingLabel, locale)}</p><h2 id="teaching-title">{t(ui.home.classroomHeading, locale)}</h2><div className={styles.paperFan} aria-hidden="true"><i /><i /><i /><i /></div></div>
      <div className={styles.teachingBody}>{t(ui.home.classroomBody, locale).map((paragraph) => <p key={paragraph.slice(0, 45)}>{paragraph}</p>)}<blockquote>{t(ui.home.classroomRule, locale)}</blockquote><Link href={href("/work/arc", locale)}>{he ? "לסיפור של Arc" : "Read the Arc story"} <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section id="approach" className={styles.splitSection} aria-labelledby="approach-title">
      <div className={styles.sectionHeading}><p className="label">04 / {he ? "איך אני חושב" : "How I think"}</p><h2 id="approach-title">{he ? "תוכנה היא הכלי. מערכות הן הנושא." : "Software is the tool. Systems are the subject."}</h2></div>
      <div className={styles.bodyCopy}>{t(ui.about.thesisBody, locale).map((paragraph) => <p key={paragraph.slice(0, 45)}><Rich text={paragraph} /></p>)}</div>
    </section>

    <section className={styles.fitSection} aria-labelledby="fit-title">
      <div className={styles.fitIntro}><p className="label">{t(ui.about.fitTitle, locale)}</p><h2 id="fit-title">{t(ui.about.wantLabel, locale)}</h2><p>{t(ui.about.wantBody, locale)[0]}</p><Link href={href("/contact", locale)} className={styles.textLink}>{t(ui.about.getInTouch, locale)}</Link></div>
      <dl>{brief.map((row) => <div key={t(row.term, locale)}><dt>{t(row.term, locale)}</dt><dd>{t(row.def, locale)}</dd></div>)}</dl>
    </section>
  </div>;
}
