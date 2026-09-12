import Link from "next/link";
import { ProjectArtifact } from "@/components/artifacts";
import { SELECTED_WORK } from "@/content/work";
import { t, type Locale } from "@/lib/i18n";
import { href, site } from "@/lib/site";
import { STATUS_LABEL, type Project } from "@/lib/types";
import { FoldExhibit } from "./FoldExhibit";
import styles from "./fold-home.module.css";

const copy = {
  hello: { en: "Hello, I’m Tomer.", he: "היי, אני תומר." },
  first: { en: "Good questions.", he: "שאלות טובות." },
  second: { en: "Useful things.", he: "דברים שימושיים." },
  intro: {
    en: "Software engineer, product builder, and programming instructor. I connect what people need with what technology can do.",
    he: "מהנדס תוכנה, בונה מוצרים ומנחה תכנות. מחבר בין מה שאנשים צריכים לבין מה שטכנולוגיה יכולה לעשות.",
  },
  work: { en: "Explore my work", he: "לפרויקטים שלי" },
  contact: { en: "Let’s talk", he: "בואו נדבר" },
  selected: { en: "Selected work", he: "פרויקטים נבחרים" },
  selectedTitle: { en: "Real questions.\nWorking answers.", he: "שאלות מהשטח.\nפתרונות שעובדים." },
  selectedIntro: {
    en: "A closer look at the products, the decisions behind them, and my part in bringing them to life.",
    he: "מבט מקרוב על המוצרים, ההחלטות שמאחוריהם והחלק שלי בהפיכתם למציאות.",
  },
  all: { en: "All work & experiments", he: "כל הפרויקטים והניסויים" },
  case: { en: "Explore the project", he: "לסיפור המלא" },
  part: { en: "My part", he: "החלק שלי" },
  approach: { en: "How I work", he: "איך אני עובד" },
  approachTitle: { en: "A little curiosity.\nA lot of follow-through.", he: "קצת סקרנות.\nהרבה עשייה." },
  about: { en: "The person behind the work", he: "האדם שמאחורי העבודה" },
  aboutTitle: { en: "From the classroom\nto the codebase.", he: "מהכיתה\nאל הקוד." },
  aboutBody: {
    en: "Teaching has a way of making you ask better questions. At Nitzanim, I teach programming, develop learning material, and co-develop Arc. My background in technical support taught me to look past the first symptom. Software engineering gives me the tools to do something about it.",
    he: "הוראה מלמדת לשאול שאלות טובות יותר. בניצנים אני מלמד תכנות, מפתח חומרי למידה ומפתח במשותף את Arc. הרקע שלי בתמיכה טכנית לימד אותי לחפש מעבר לסימפטום הראשון. הנדסת תוכנה נותנת לי את הכלים לעשות עם זה משהו.",
  },
  more: { en: "A little more about me", he: "עוד קצת עליי" },
  cv: { en: "Download CV", he: "הורדת קורות חיים" },
};

const projectCopy: Record<string, { purpose: { en: string; he: string }; role: { en: string; he: string } }> = {
  arc: {
    purpose: { en: "A more connected learning experience.", he: "חוויית למידה מחוברת יותר." },
    role: { en: "Co-development · Product & engineering", he: "פיתוח משותף · מוצר והנדסה" },
  },
  applytide: {
    purpose: { en: "A calmer way to manage a job search.", he: "דרך מסודרת יותר לנהל חיפוש עבודה." },
    role: { en: "Solo project · Product, design & engineering", he: "פרויקט עצמאי · מוצר, עיצוב ופיתוח" },
  },
  eventa: {
    purpose: { en: "Make an introduction. Share a moment.", he: "להכיר. להתחבר. לחלוק רגע." },
    role: { en: "Solo project · Product, design & engineering", he: "פרויקט עצמאי · מוצר, עיצוב ופיתוח" },
  },
};

const principles = [
  {
    title: { en: "Find the real question.", he: "למצוא את השאלה האמיתית." },
    body: { en: "Listen, observe the workflow, and understand what is getting in the way.", he: "להקשיב, להתבונן בתהליך ולהבין מה באמת עומד בדרך." },
    mark: "question",
  },
  {
    title: { en: "Make the decision clear.", he: "לחדד את ההחלטה." },
    body: { en: "Turn the problem into a useful direction. Be explicit about scope and tradeoffs.", he: "להפוך את הבעיה לכיוון שימושי. להגדיר את ההיקף ולהבין את הפשרות." },
    mark: "fold",
  },
  {
    title: { en: "Build. Learn. Refine.", he: "לבנות. ללמוד. לשפר." },
    body: { en: "Connect the pieces, test the experience, and let real use inform the next version.", he: "לחבר את החלקים, לבדוק את החוויה וללמוד מהשימוש לקראת הגרסה הבאה." },
    mark: "loop",
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className={styles.arrow}>{diagonal ? "↗" : "→"}</span>;
}

function WorkEntry({ project, locale, index, featured = false }: { project: Project; locale: Locale; index: number; featured?: boolean }) {
  const detail = projectCopy[project.slug];
  return (
    <article className={`${styles.project} ${featured ? styles.featured : ""}`}>
      <Link className={styles.projectCover} href={href(`/work/${project.slug}`, locale)} aria-label={`${t(copy.case, locale)}: ${project.title}`}>
        <ProjectArtifact slug={project.slug} locale={locale} size={featured ? "hero" : "card"} />
        <span aria-hidden="true" className={styles.coverArrow}>↗</span>
      </Link>
      <div className={styles.projectBody}>
        <div className={styles.projectMeta}>
          <span>{String(index).padStart(2, "0")} / {project.title}</span>
          <span>{t(project.statusLabel ?? STATUS_LABEL[project.status], locale)}</span>
        </div>
        <h3><Link href={href(`/work/${project.slug}`, locale)}>{t(detail.purpose, locale)}</Link></h3>
        <p className={styles.projectDescription}>{t(project.oneLiner, locale)}</p>
        <p className={styles.projectRole}>{t(detail.role, locale)}</p>
        <Link className={styles.textLink} href={href(`/work/${project.slug}`, locale)}>{t(copy.case, locale)}<Arrow /></Link>
      </div>
    </article>
  );
}

export function FoldHome({ locale }: { locale: Locale }) {
  const projects = SELECTED_WORK.filter((project) => project.slug in projectCopy);
  return (
    <>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={`shell ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.hello}>{t(copy.hello, locale)}</p>
            <h1 id="home-title" className={styles.heroTitle}><span>{t(copy.first, locale)}</span><em>{t(copy.second, locale)}</em></h1>
            <p className={styles.heroIntro}>{t(copy.intro, locale)}</p>
            <div className={styles.heroActions}>
              <a href="#selected-work" className={styles.primaryLink}>{t(copy.work, locale)}<Arrow /></a>
              <Link href={href("/contact", locale)} className={styles.textLink}>{t(copy.contact, locale)}<Arrow diagonal /></Link>
            </div>
          </div>
          <div className={styles.heroExhibit}><FoldExhibit locale={locale} /></div>
        </div>
        <div className={`shell ${styles.quickWork}`}>
          <p className={styles.quickLabel}>{t(copy.selected, locale)}<span aria-hidden="true">↓</span></p>
          {projects.map((project) => (
            <Link key={project.slug} href={href(`/work/${project.slug}`, locale)}>
              <span>{project.title}<Arrow diagonal /></span>
              <span>{project.slug === "arc" ? (locale === "he" ? "מוצרי למידה" : "Learning operations") : project.slug === "applytide" ? (locale === "he" ? "חיפוש עבודה" : "Job-search organization") : (locale === "he" ? "חיבורים באירועים" : "Connections at events")}</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="selected-work" className={`shell ${styles.work}`} aria-labelledby="selected-title">
        <div className={styles.sectionHeading}>
          <div><p className="label">01 / {t(copy.selected, locale)}</p><h2 id="selected-title" className="t-section">{t(copy.selectedTitle, locale)}</h2></div>
          <p>{t(copy.selectedIntro, locale)}</p>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((project, index) => <WorkEntry key={project.slug} project={project} locale={locale} index={index + 1} featured={index === 0} />)}
        </div>
        <div className={styles.allWork}><p>{locale === "he" ? "וגם: ראייה ממוחשבת, מערכות ועבודות מוקדמות." : "Also: computer vision, systems, and earlier explorations."}</p><Link className={styles.textLink} href={href("/work", locale)}>{t(copy.all, locale)}<Arrow /></Link></div>
      </section>

      <section className={styles.approach} aria-labelledby="approach-title">
        <div className="shell">
          <div className={styles.sectionHeading}><div><p className="label">02 / {t(copy.approach, locale)}</p><h2 id="approach-title" className="t-section">{t(copy.approachTitle, locale)}</h2></div><svg className={styles.foldMark} aria-hidden="true" viewBox="0 0 160 120"><path d="m8 40 45-24v77L8 117Z" fill="#264bec" /><path d="m53 16 48 27v77L53 93Z" fill="#1735b9" /><path d="m101 43 45-24v77l-45 24Z" fill="#5877ff" /></svg></div>
          <div className={styles.principles}>{principles.map((principle, index) => <article key={principle.mark}><span className={styles.principleNumber}>0{index + 1}</span><h3>{t(principle.title, locale)}</h3><p>{t(principle.body, locale)}</p></article>)}</div>
        </div>
      </section>

      <section className={`shell ${styles.about}`} aria-labelledby="about-title">
        <div className={styles.aboutIllustration} aria-hidden="true"><div className={styles.aboutSheet}><span>const curiosity = true;</span><div className={styles.sheetLines}><i /><i /><i /></div><div className={styles.sheetSymbol}>{"{ }"}</div><div className={styles.sheetLines}><i /><i /></div></div><div className={styles.aboutNote}><span>{locale === "he" ? "תמיד לומד." : "Always learning."}</span><svg viewBox="0 0 100 80"><path d="M8 15c65-40 90 60 29 45-24-6-7-34 22-15M52 32l12 14-19 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div></div>
        <div className={styles.aboutCopy}><p className="label">03 / {t(copy.about, locale)}</p><h2 id="about-title" className="t-section">{t(copy.aboutTitle, locale)}</h2><p>{t(copy.aboutBody, locale)}</p><div className={styles.heroActions}><Link className={styles.textLink} href={href("/about", locale)}>{t(copy.more, locale)}<Arrow /></Link><a className={styles.quietLink} href={site.cv} download={site.cvFileName}>{t(copy.cv, locale)}<span aria-hidden="true">↓</span></a></div></div>
      </section>
    </>
  );
}
