import type { Metadata } from "next";
import Link from "next/link";
import { EducationTimeline, ExperienceTimeline } from "@/components/about/CareerTimeline";
import { brief, educationTimeline, experienceTimeline } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { href, site } from "@/lib/site";
import { ui } from "@/lib/ui";
import styles from "@/components/about/editorial-pages.module.css";
function Rich({ text }: {
    text: string;
}) {
    return <>{text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : <span key={index}>{part}</span>)}</>;
}
export function generateMetadata(): Metadata {
    return pageMetadata({ path: "/about", title: ui.about.title, description: ui.about.lede });
}
export default function AboutPage() {
    return <div className={`shell ${styles.page}`}>
    <header className={styles.aboutHero}>
      <div>
        <p className="label">{ui.about.title} <span className={styles.labelDot}>/</span> {site.name}</p>
        <h1 className={styles.heroTitle}>{"Understand deeply."}<br /><em>{"Build deliberately."}</em></h1>
        <p className={styles.heroLede}>{ui.about.lede}</p>
        <div className={styles.actions}><a href={site.cv} download={site.cvFileName} className={styles.primaryButton}>{ui.common.downloadCv} <span aria-hidden="true">↓</span></a><Link href={href("/contact")} className={styles.textLink}>{ui.about.getInTouch}</Link></div>
      </div>
      <div className={styles.profileSystem}>
        <svg className={styles.identitySystem} viewBox="0 0 420 350" fill="none" aria-hidden="true">
          <path d="M20 70h380M20 140h380M20 210h380M20 280h380M70 20v300M140 20v300M210 20v300M280 20v300M350 20v300" stroke="currentColor" opacity=".08"/>
          <path d="M20 55V20h35m310 0h35v35M20 295v35h35m310 0h35v-35" stroke="currentColor" opacity=".4"/>
          <path d="m90 126 120 69 120-69M210 195v109M90 126v89l120 69 120-69v-89" stroke="currentColor" opacity=".25"/>
          <path d="m210 62 81 47-81 47-81-47Z" fill="#182e29" stroke="currentColor" strokeWidth="1.5"/>
          <path d="m129 109 81 47v82l-81-47Z" fill="#12201e" stroke="currentColor" strokeWidth="1.5"/>
          <path d="m210 156 81-47v82l-81 47Z" fill="#0d1817" stroke="currentColor" strokeWidth="1.5"/>
          <path d="m175 109 35-20 35 20-35 20Z" fill="currentColor" fillOpacity=".12" stroke="currentColor"/>
          <path d="M90 126H44m286 0h46M210 284v35" stroke="currentColor" strokeDasharray="3 5"/>
          <circle cx="90" cy="126" r="5" fill="currentColor"/><circle cx="330" cy="126" r="5" fill="currentColor"/><circle cx="210" cy="284" r="5" fill="currentColor"/>
          <path d="m155 149-9 6 9 16m20-10 9 16-9 6" stroke="currentColor" strokeWidth="2"/>
          <path d="m239 160 31-18m-31 33 21-12m-21 27 31-18" stroke="currentColor" strokeWidth="2" opacity=".6"/>
        </svg>
        <div className={styles.profileDomains}><span>{"Engineering"}</span><span>{"Product"}</span><span>{"Teaching"}</span></div>
        <div className={styles.profileCaption}><p>{site.name}</p><span>{site.role}</span></div>
        <p className={styles.profileNote}>{site.description}</p>
      </div>
    </header>

    <nav className={styles.pageIndex} aria-label={"About page sections"}>
      <span className="label">{"On this page"}</span>
      <a href="#experience">{ui.about.experienceTitle} <span aria-hidden="true">↓</span></a><a href="#education">{ui.about.educationTitle} <span aria-hidden="true">↓</span></a><a href="#teaching">{"Teaching"} <span aria-hidden="true">↓</span></a><a href="#approach">{"My approach"} <span aria-hidden="true">↓</span></a>
    </nav>

    <section id="experience" className={styles.splitSection} aria-labelledby="experience-title">
      <div className={styles.sectionHeading}><p className="label">01 / {"In practice"}</p><h2 id="experience-title">{ui.about.experienceTitle}</h2><p>{"Programming, people, and the problems in between."}</p></div>
      <ExperienceTimeline entries={experienceTimeline} labels={{ current: ui.about.currentRole, roleDetails: ui.about.roleDetails, closeDetails: ui.about.closeDetails, responsibilities: ui.about.responsibilities }}/>
    </section>

    <section id="education" className={styles.splitSection} aria-labelledby="education-title">
      <div className={styles.sectionHeading}><p className="label">02 / {"Broadening the lens"}</p><h2 id="education-title">{ui.about.educationTitle}</h2><p>{"A foundation in software. A wider view of the whole system."}</p></div>
      <EducationTimeline entries={educationTimeline} currentLabel={ui.about.currentStudies}/>
    </section>

    <section id="teaching" className={styles.teachingSection} aria-labelledby="teaching-title">
      <div className={styles.teachingHeading}><p className="label">03 / {ui.about.teachingLabel}</p><h2 id="teaching-title">{ui.home.classroomHeading}</h2><div className={styles.learningLoop}><span>{"Explain"}</span><i aria-hidden="true"/><span>{"Practice"}</span><i aria-hidden="true"/><span>{"Feedback"}</span></div></div>
      <div className={styles.teachingBody}>{ui.home.classroomBody.map((paragraph) => <p key={paragraph.slice(0, 45)}>{paragraph}</p>)}<blockquote>{ui.home.classroomRule}</blockquote><Link href={href("/work/arc")}>{"Read the Arc story"} <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section id="approach" className={styles.splitSection} aria-labelledby="approach-title">
      <div className={styles.sectionHeading}><p className="label">04 / {"How I think"}</p><h2 id="approach-title">{"Software is the tool. Systems are the subject."}</h2></div>
      <div className={styles.bodyCopy}>{ui.about.thesisBody.map((paragraph) => <p key={paragraph.slice(0, 45)}><Rich text={paragraph}/></p>)}</div>
    </section>

    <section className={styles.fitSection} aria-labelledby="fit-title">
      <div className={styles.fitIntro}><p className="label">{ui.about.fitTitle}</p><h2 id="fit-title">{ui.about.wantLabel}</h2><p>{ui.about.wantBody[0]}</p><Link href={href("/contact")} className={styles.textLink}>{ui.about.getInTouch}</Link></div>
      <dl>{brief.map((row) => <div key={row.term}><dt>{row.term}</dt><dd>{row.def}</dd></div>)}</dl>
    </section>
  </div>;
}
