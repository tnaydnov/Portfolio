import Image from "next/image";
import Link from "next/link";
import type { ProductTour } from "@/content/tours/types";
import type { Project } from "@/lib/types";
import { DOMAIN_LABEL, formatSpan, STATUS_LABEL } from "@/lib/types";
import { ArchitectureGraphLazy } from "./ArchitectureGraphLazy";
import { DecisionLog, FieldFeedback, RebuildList } from "./Blocks";
import { ConstraintDial } from "./ConstraintDial";
import { ScreenshotGallery, TourVideo } from "./ProductMedia";
import styles from "./product-tour.module.css";

export function ProductTourPage({ project, tour, next }: { project: Project; tour: ProductTour; next: Project }) {
  const portals = [...new Set(tour.screens.map(screen => screen.portal))];
  return <article className={`shell ${styles.page}`} data-project={project.slug} data-testid="product-case-study">
    <div className={styles.breadcrumb}><Link href="/work"><span aria-hidden="true">←</span> All work</Link><span>PRODUCT / ENGINEERING</span></div>
    <header className={styles.header}>
      <div className={styles.identity}>
        <p className={styles.micro}>{project.domain.map(domain => DOMAIN_LABEL[domain]).join(" / ")}</p>
        <h1>{project.title}</h1>
        <p className={styles.intro}>{project.oneLiner}</p>
        <div className={styles.actions}>
          <a href="#product-tour" className={styles.primaryAction}>Take a look inside <span aria-hidden="true">↓</span></a>
          <a href="#deep-dive">Engineering <span aria-hidden="true">↓</span></a>
          {project.links?.live && <a href={project.links.live} target="_blank" rel="noopener noreferrer">Open project <span aria-hidden="true">↗</span></a>}
          {project.links?.repo && <a href={project.links.repo} target="_blank" rel="noopener noreferrer">Source code <span aria-hidden="true">↗</span></a>}
        </div>
      </div>
      <aside className={styles.projectFacts} aria-label="Project context">
        <p className={styles.lifecycle}><span aria-hidden="true"/>{project.statusLabel ?? STATUS_LABEL[project.status]}</p>
        <dl>
          <div><dt>MY ROLE</dt><dd>{project.role}</dd></div>
          <div><dt>TEAM</dt><dd>{project.team ?? "Solo project"}</dd></div>
          <div><dt>BUILT FOR</dt><dd>{tour.audience}</dd></div>
          <div><dt>TIMELINE</dt><dd>{formatSpan(project)}</dd></div>
        </dl>
      </aside>
    </header>

    <div className={styles.heroVisual} data-mobile={tour.hero.mobile || undefined}>
      <div className={styles.heroBar}><span><i/><i/><i/></span><span>{tour.eyebrow}</span><a href={`#screen-${tour.hero.id}`}>VIEW SCREEN <span aria-hidden="true">↓</span></a></div>
      <div className={styles.heroScreen} data-composite={Boolean(tour.companion) || undefined}>
        <Image src={tour.hero.src} alt={`${project.title}: ${tour.hero.title}`} width={tour.hero.width} height={tour.hero.height} sizes="(max-width: 700px) 92vw, (max-width: 1400px) 86vw, 1180px" quality={90} priority/>
        {tour.companion && <Image className={styles.companionScreen} src={tour.companion.src} alt={`${project.title}: ${tour.companion.title}`} width={tour.companion.width} height={tour.companion.height} sizes="(max-width: 700px) 25vw, 280px" quality={90} priority/>}
      </div>
      <div className={styles.heroCaption}><span>{tour.hero.portal}</span><p>{tour.hero.description}</p></div>
    </div>

    <nav className={styles.pageNav} aria-label="Inside this project"><a href="#overview">The essentials</a><a href="#product-tour">Product tour <span>{tour.screens.length}</span></a><a href="#deep-dive">Under the hood</a><a href="#capture-notes">Capture notes</a></nav>

    <section className={styles.overview} id="overview" aria-labelledby="overview-title">
      <div className={styles.sectionHeader}><div><p className={styles.micro}>01 / THE ESSENTIALS</p><h2 id="overview-title">{tour.title}</h2></div><p>{tour.intro}</p></div>
      <div className={styles.essentials}>
        <div><span>THE PROBLEM</span><p>{project.snapshot?.problem}</p></div>
        <div><span>THE PRODUCT</span><p>{project.snapshot?.move}</p></div>
        <div className={styles.contribution}><span>MY CONTRIBUTION</span><p>{project.snapshot?.contribution}</p></div>
      </div>
      <div className={styles.capabilities}>{tour.capabilities.map((capability,index) => <div key={capability.title}><span className={styles.capabilityMark} aria-hidden="true">{["⌘","↗","◎"][index % 3]}</span><div><h3>{capability.title}</h3><p>{capability.description}</p></div></div>)}</div>
    </section>

    <section className={styles.tourSection} id="product-tour" aria-labelledby="tour-title">
      <div className={styles.sectionHeader}><div><p className={styles.micro}>02 / THE PRODUCT TOUR</p><h2 id="tour-title">Inside {project.title}.</h2></div><p>Real screens, real workflows.<br/>Explore the parts that interest you.</p></div>
      <div className={styles.portalIndex} aria-label="Workspaces in this tour">{portals.map(portal => <a key={portal} href={`#screen-${tour.screens.find(screen => screen.portal === portal)?.id}`}><span aria-hidden="true">↳</span>{portal}</a>)}</div>
      {tour.films.map(film => <TourVideo key={film.id} film={film}/>)}
      <div className={styles.galleryHeading}><span className={styles.micro}>A CLOSER LOOK</span><p>Select a screen to inspect it at full size.</p></div>
      <ScreenshotGallery screens={tour.screens} project={project.title}/>
    </section>

    <section className={styles.engineering} id="deep-dive" aria-labelledby="engineering-title">
      <div className={styles.sectionHeader}><div><p className={styles.micro}>03 / THE ENGINEERING</p><h2 id="engineering-title">Under the hood.</h2></div><p>How the pieces connect, why the boundaries matter, and what I would change next.</p></div>
      <div className={styles.technologyGrid}>{tour.technology.map(layer => <div key={layer.layer}><p className={styles.micro}>{layer.layer}</p><h3>{layer.tools}</h3><p>{layer.purpose}</p></div>)}</div>
      <div className={styles.disclosures}>
        <details className={styles.disclosure}>
          <summary><span><small>01 / STRUCTURE</small><strong>System & architecture</strong></span><span className={styles.plus} aria-hidden="true">+</span></summary>
          <div className={styles.detailBody}>
            {project.architecture && <ArchitectureGraphLazy architecture={project.architecture}/>}
            {project.architecture && <noscript><div className={styles.architectureText}><p>{project.architecture.caption}</p><ul>{project.architecture.nodes.map(node => <li key={node.id}><strong>{node.label}</strong><p>{node.note}</p></li>)}</ul></div></noscript>}
            <div className={styles.fullStack}><h3>Technology</h3><ul>{project.stack.map(tool => <li key={tool}>{tool}</li>)}</ul></div>
            {project.metrics.length > 0 && <dl className={styles.systemFacts}>{project.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd><strong>{metric.value}</strong>{metric.note && <p>{metric.note}</p>}</dd></div>)}</dl>}
          </div>
        </details>
        {project.decisions?.length ? <details className={styles.disclosure}><summary><span><small>02 / JUDGMENT</small><strong>Decisions & trade-offs</strong></span><span className={styles.plus} aria-hidden="true">+</span></summary><div className={styles.detailBody}><DecisionLog decisions={project.decisions}/></div></details> : null}
        {project.sections?.length ? <details className={styles.disclosure} id="story"><summary><span><small>03 / PROCESS</small><strong>How the work evolved</strong></span><span className={styles.plus} aria-hidden="true">+</span></summary><div className={`${styles.detailBody} ${styles.story}`}>{project.sections.map((section,index) => <section key={`${section.stage}-${index}`}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{section.heading}</h3>{section.body.map(paragraph => <p key={paragraph.slice(0,60)}>{paragraph}</p>)}</div></section>)}</div></details> : null}
        {project.feedback?.length ? <details className={styles.disclosure}><summary><span><small>FROM USE</small><strong>Feedback that changed the product</strong></span><span className={styles.plus} aria-hidden="true">+</span></summary><div className={styles.detailBody}><FieldFeedback items={project.feedback}/></div></details> : null}
        {project.constraints ? <details className={styles.disclosure}><summary><span><small>EXPERIMENT</small><strong>Constraint study</strong></span><span className={styles.plus} aria-hidden="true">+</span></summary><div className={styles.detailBody}><ConstraintDial study={project.constraints}/></div></details> : null}
        {project.rebuild?.length ? <details className={styles.disclosure}><summary><span><small>LOOKING FORWARD</small><strong>What I would improve next</strong></span><span className={styles.plus} aria-hidden="true">+</span></summary><div className={styles.detailBody}><RebuildList items={project.rebuild}/></div></details> : null}
      </div>
    </section>

    <aside className={styles.captureNotes} id="capture-notes" aria-label="About these captures"><span className={styles.captureMark} aria-hidden="true">◎</span><div><h2>About these captures</h2><p>{tour.evidence.note}</p><div className={styles.captureMeta}><span>Captured {tour.evidence.captured}</span><span>Source {tour.evidence.revision.slice(0,8)}</span><a href={tour.evidence.manifest} target="_blank" rel="noopener noreferrer">Capture details <span aria-hidden="true">↗</span></a></div></div></aside>
    <nav className={styles.nextProject} aria-label="Next project"><div><p className={styles.micro}>KEEP EXPLORING</p><Link href={`/work/${next.slug}`}>{next.title}<span aria-hidden="true">↗</span></Link><p>{next.oneLiner}</p></div><Link href="/work" className={styles.allWork}>Back to all work <span aria-hidden="true">←</span></Link></nav>
  </article>;
}
