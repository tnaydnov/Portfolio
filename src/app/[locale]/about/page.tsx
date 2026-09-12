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
        <h1 className={styles.heroTitle}>{he ? "להבין לעומק." : "Understand deeply."}<br /><em>{he ? "לבנות בכוונה." : "Build deliberately."}</em></h1>
        <p className={styles.heroLede}>{t(ui.about.lede, locale)}</p>
        <div className={styles.actions}><a href={site.cv} download={site.cvFileName} className={styles.primaryButton}>{t(ui.common.downloadCv, locale)} <span aria-hidden="true">↓</span></a><Link href={href("/contact", locale)} className={styles.textLink}>{t(ui.about.getInTouch, locale)}</Link></div>
      </div>
      <div className={styles.profileSystem}>
        <svg className={styles.identitySystem} viewBox="0 0 420 350" fill="none" aria-hidden="true">
          <path d="M20 70h380M20 140h380M20 210h380M20 280h380M70 20v300M140 20v300M210 20v300M280 20v300M350 20v300" stroke="currentColor" opacity=".08" />
          <path d="M20 55V20h35m310 0h35v35M20 295v35h35m310 0h35v-35" stroke="currentColor" opacity=".4" />
          <path d="m90 126 120 69 120-69M210 195v109M90 126v89l120 69 120-69v-89" stroke="currentColor" opacity=".25" />
          <path d="m210 62 81 47-81 47-81-47Z" fill="#182e29" stroke="currentColor" strokeWidth="1.5" />
          <path d="m129 109 81 47v82l-81-47Z" fill="#12201e" stroke="currentColor" strokeWidth="1.5" />
          <path d="m210 156 81-47v82l-81 47Z" fill="#0d1817" stroke="currentColor" strokeWidth="1.5" />
          <path d="m175 109 35-20 35 20-35 20Z" fill="currentColor" fillOpacity=".12" stroke="currentColor" />
          <path d="M90 126H44m286 0h46M210 284v35" stroke="currentColor" strokeDasharray="3 5" />
          <circle cx="90" cy="126" r="5" fill="currentColor" /><circle cx="330" cy="126" r="5" fill="currentColor" /><circle cx="210" cy="284" r="5" fill="currentColor" />
          <path d="m155 149-9 6 9 16m20-10 9 16-9 6" stroke="currentColor" strokeWidth="2" />
          <path d="m239 160 31-18m-31 33 21-12m-21 27 31-18" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className={styles.profileDomains}><span>{he ? "הנדסה" : "Engineering"}</span><span>{he ? "מוצר" : "Product"}</span><span>{he ? "הוראה" : "Teaching"}</span></div>
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
      <div className={styles.teachingHeading}><p className="label">03 / {t(ui.about.teachingLabel, locale)}</p><h2 id="teaching-title">{t(ui.home.classroomHeading, locale)}</h2><div className={styles.learningLoop}><span>{he ? "הסבר" : "Explain"}</span><i aria-hidden="true" /><span>{he ? "תרגול" : "Practice"}</span><i aria-hidden="true" /><span>{he ? "משוב" : "Feedback"}</span></div></div>
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
