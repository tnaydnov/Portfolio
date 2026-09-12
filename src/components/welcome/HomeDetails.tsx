import Link from "next/link";
import { arc } from "@/content/work/arc";
import { browserCoder } from "@/content/work/browser-coder";
import { ProductPreview } from "@/components/artifacts/ProductPreview";
import { site } from "@/lib/site";
import styles from "./home-details.module.css";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} /></svg>;
}

const practice = [
  { index: "01", title: "Understand the need", copy: "Listen to the people doing the work. Find the real problem.", glyph: "M7 6h18v13H15l-6 5v-5H7Z M12 10h8m-8 4h5" },
  { index: "02", title: "Give it structure", copy: "Turn the idea into a learning plan, a clear scope and practical steps.", glyph: "M6 7h7v7H6ZM19 19h7v7h-7ZM16 10h7v6M10 17v6h6" },
  { index: "03", title: "Build & keep improving", copy: "Connect content and code. Test the experience and work through the details.", glyph: "m12 8-7 8 7 8m8-16 7 8-7 8m-3-20-3 24" },
];

export function HomeDetails() {
  return <div className={styles.details}>
    <div className={styles.container}>
      <section className={styles.currentWork} aria-labelledby="home-context-title">
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>01 / What I&apos;m working on</p><h2 id="home-context-title">Learning, connected.</h2></div>
          <p>At Nitzanim, I lead EdTech projects and develop learning content. These are two of the products I help build.</p>
        </div>
        <div className={styles.products}>
          {[arc, browserCoder].map((project) => <article className={styles.product} key={project.slug}>
            <Link href={`/work/${project.slug}`} aria-labelledby={`home-${project.slug}`}>
              <ProductPreview project={project} compact />
              <div className={styles.productCopy}><div><p className={styles.productType}>{project.slug === "arc" ? "The learning platform" : "The coding workspace"}</p><h3 id={`home-${project.slug}`}>{project.title}</h3></div><Arrow diagonal /><p>{project.slug === "arc" ? "From curriculum and classroom activities to feedback and reporting." : "Write code, see what it does, and understand the steps in between."}</p></div>
            </Link>
          </article>)}
        </div>
        <div className={styles.workFoot}><p>Also in my work: independent products, computer vision, and systems engineering.</p><Link href="/work">See all projects<Arrow /></Link></div>
      </section>

      <section className={styles.practice} aria-labelledby="home-approach-title">
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>02 / How I think</p><h2 id="home-approach-title">People first. Then the pieces.</h2></div><Link href="/about">More about me<Arrow diagonal /></Link></div>
        <div className={styles.steps}>{practice.map((step) => <article className={styles.step} key={step.index}><div className={styles.stepTop}><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true"><path d={step.glyph} /></svg><span>{step.index}</span></div><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
        <p className={styles.background}>Technical support taught me to investigate. Teaching taught me to explain. Engineering helps me turn both into useful tools.</p>
      </section>

      <section className={styles.invitation} aria-labelledby="home-contact-title">
        <div className={styles.invitationMark} aria-hidden="true"><span>&gt;_</span><svg viewBox="0 0 120 120" fill="none"><circle cx="60" cy="60" r="54" stroke="currentColor" strokeDasharray="2 9"/><path d="M60 0v13M0 60h13m94 0h13M60 107v13" stroke="currentColor"/></svg></div>
        <div className={styles.invitationCopy}><p className={styles.eyebrow}>03 / Let&apos;s connect</p><h2 id="home-contact-title">Good things start with a hello.</h2><p>A product to build, an educational challenge, or a role worth talking about.</p></div>
        <div className={styles.contactLinks}><Link className={styles.contactButton} href="/contact">Let&apos;s talk<Arrow /></Link><a className={styles.email} href={`mailto:${site.email}`}>{site.email}</a></div>
      </section>
    </div>
  </div>;
}
