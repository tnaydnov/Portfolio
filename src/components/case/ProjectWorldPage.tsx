import Image from "next/image";
import Link from "next/link";
import type { ProductTour } from "@/content/tours/types";
import type { ProjectWorld } from "@/content/tours/worlds";
import type { Project } from "@/lib/types";
import { formatSpan, STATUS_LABEL } from "@/lib/types";
import { ScreenshotGallery, TourVideo } from "./ProductMedia";
import styles from "./project-world.module.css";

function WorldMark({ slug }: { slug: string }) {
  return <svg className={styles.mark} viewBox="0 0 120 120" fill="none" aria-hidden="true">
    {slug === "arc" ? <><circle cx="60" cy="60" r="43"/><ellipse cx="60" cy="60" rx="19" ry="49" transform="rotate(42 60 60)"/><circle cx="93" cy="29" r="7" className={styles.solid}/><path d="m45 76 15-35 15 35M50 65h20"/></> : slug === "browser-coder" ? <><rect x="10" y="17" width="100" height="86" rx="16"/><path d="m43 44-17 16 17 16m34-32 17 16-17 16M68 35 52 85"/><circle cx="25" cy="28" r="2" className={styles.solid}/></> : slug === "applytide" ? <><path d="M10 76c22 0 18-40 40-40s18 40 40 40h20M10 94c22 0 18-40 40-40s18 40 40 40h20M10 58c22 0 18-40 40-40s18 40 40 40h20"/><circle cx="91" cy="21" r="7" className={styles.solid}/></> : <><path d="M60 93C-15 46 31 2 60 37c29-35 75 9 0 56Z"/><path d="M35 72c-6-36 38-43 50-22S60 94 49 66s32-28 39-9"/><circle cx="23" cy="22" r="4" className={styles.solid}/><path d="M92 12v12m-6-6h12"/></>}
  </svg>;
}

export function ProjectWorldPage({ project, tour, world, next }: { project: Project; tour: ProductTour; world: ProjectWorld; next: Project }) {
  const screenById = (id: string) => {
    const screen = tour.screens.find(item => item.id === id);
    if (!screen) throw new Error(`Missing ${project.slug} story screen: ${id}`);
    return screen;
  };
  const hero = world.hero ? screenById(world.hero) : tour.hero;
  const companion = world.companion ? screenById(world.companion) : tour.companion;
  const used = new Set(world.stories.flatMap(story => story.screens));
  const extraScreens = tour.screens.filter(screen => !used.has(screen.id));
  return <article className={styles.world} data-project={project.slug} data-testid="product-case-study">
    <div className={styles.container}>
      <div className={styles.breadcrumb}><Link href="/work">← All work</Link><span>PRODUCT STUDY / {project.title}</span></div>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.productName}><WorldMark slug={project.slug}/><div><p className={styles.eyebrow}>{world.motif}</p><h1>{project.title}</h1></div></div>
          <h2>{world.headline}</h2>
          <p className={styles.lede}>{world.description}</p>
          <div className={styles.heroActions}><a className={styles.primary} href="#product-tour">Explore the product <span aria-hidden="true">↓</span></a><a href="#deep-dive">The engineering <span aria-hidden="true">↘</span></a></div>
          <div className={styles.roleChips} aria-label="Who this product serves">{world.roles.map(role => <span key={role}>{role}</span>)}</div>
        </div>
        <div className={styles.heroArt} data-portrait={hero.mobile || undefined}>
          <span className={styles.orbit} aria-hidden="true"/><span className={styles.orbitTwo} aria-hidden="true"/>
          <div className={styles.artLabel}><span aria-hidden="true">●</span> A LOOK INSIDE / {hero.portal}</div>
          <a href={`#screen-${hero.id}`} className={styles.heroScreen} aria-label={`Explore ${hero.title}`}><div className={styles.windowBar}><i/><i/><i/><span>{project.title.toLowerCase().replaceAll(" ", "-")} / in use</span></div><Image src={hero.src} alt={`${project.title}: ${hero.title}`} width={hero.width} height={hero.height} quality={95} sizes="(max-width: 780px) 88vw, (max-width: 1500px) 55vw, 790px" priority/></a>
          {companion && <a className={styles.companion} href={`#screen-${companion.id}`} data-portrait={companion.mobile || undefined} aria-label={`Explore ${companion.title}`}><Image src={companion.src} alt={`${project.title}: ${companion.title}`} width={companion.width} height={companion.height} quality={90} sizes="(max-width: 780px) 32vw, 260px" priority/><span>{companion.portal} ↗</span></a>}
          <p className={styles.artCaption}>Original application. Fictional demo data.<span>↗ Screens open at full resolution</span></p>
        </div>
      </header>
      <dl className={styles.facts}><div><dt>MY ROLE</dt><dd>{project.role}</dd></div><div><dt>CONTEXT</dt><dd>{project.team ?? "Independent project"}</dd></div><div><dt>TIMELINE</dt><dd>{formatSpan(project)}</dd></div><div><dt>PROJECT STATUS</dt><dd>{project.statusLabel ?? STATUS_LABEL[project.status]}</dd></div></dl>
      <nav className={styles.chapterNav} aria-label="Inside this project"><a href="#overview">At a glance</a>{world.stories.map((story,i) => <a key={story.id} href={`#${story.id}`}><span>{String(i+1).padStart(2,"0")}</span>{story.label}</a>)}<a href="#deep-dive">Engineering ↗</a></nav>
      <section className={styles.overview} id="overview" aria-labelledby="overview-title"><div><p className={styles.eyebrow}>THE IDEA, IN A MOMENT</p><h2 id="overview-title">{tour.title}</h2></div><div className={styles.overviewText}><p>{tour.intro}</p><details className={styles.contribution}><summary>Where I contributed <span aria-hidden="true">+</span></summary><p>{project.snapshot?.contribution}</p></details></div></section>
      <div id="product-tour" className={styles.stories}>
        {world.stories.map((story,index) => {
          const film = story.film ? tour.films.find(item => item.id === story.film) : undefined;
          if (story.film && !film) throw new Error(`Missing ${project.slug} story film: ${story.film}`);
          return <section key={story.id} id={story.id} className={styles.story} aria-labelledby={`${story.id}-title`} data-story={index + 1}>
            <div className={styles.storyHeading}><div className={styles.chapterNumber} aria-hidden="true">{String(index+1).padStart(2,"0")}</div><div><p className={styles.eyebrow}>{story.label}</p><h2 id={`${story.id}-title`}>{story.title}</h2></div><p>{story.description}</p></div>
            <div className={styles.storyMedia}>{film && <TourVideo film={film}/>}<ScreenshotGallery screens={story.screens.map(screenById)} project={project.title} editorial/></div>
            <aside className={styles.takeaway}><span className={styles.takeawayIcon} aria-hidden="true">↳</span><h3>{story.takeaway.title}</h3><p>{story.takeaway.text}</p></aside>
          </section>;
        })}
      </div>
      {extraScreens.length > 0 && <details className={styles.extraScreens}><summary><span>More of the product <small>{extraScreens.length} additional screens</small></span><span aria-hidden="true">+</span></summary><ScreenshotGallery screens={extraScreens} project={project.title}/></details>}
      <section className={styles.engineering} id="deep-dive" aria-labelledby="engineering-title"><div className={styles.engineeringHeader}><div><p className={styles.eyebrow}>FOR THE TECHNICALLY CURIOUS</p><h2 id="engineering-title">The thinking underneath.</h2></div><p>The important boundaries, implementation choices and trade-offs. Open a topic for the details.</p></div>
        <ol className={styles.systemFlow} aria-label="System overview">{world.system.map((step,index) => <li key={step.title}><span>{String(index+1).padStart(2,"0")} <span aria-hidden="true">→</span></span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
        <div className={styles.stack}>{tour.technology.map(layer => <div key={layer.layer}><span>{layer.layer}</span><h3>{layer.tools}</h3><p>{layer.purpose}</p></div>)}</div>
        <div className={styles.decisions}>{world.decisions.map((decision,index) => <details key={decision.title}><summary><span className={styles.decisionIndex}>{String(index+1).padStart(2,"0")}</span><h3>{decision.title}</h3><span className={styles.plus} aria-hidden="true">+</span></summary><div className={styles.decisionBody}><p>{decision.explanation}</p><div className={styles.tradeoff}><span>THE TRADE-OFF</span><p>{decision.tradeoff}</p></div><div className={styles.sourceLinks}>{decision.sources.map(source => world.privateSource ? <span key={source.path} title={source.path}>{source.label} · team source</span> : <a key={source.path} href={`${world.repo}/blob/${world.revision}/${source.path}`} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</div></div></details>)}<details><summary><span className={styles.decisionIndex}>SCOPE</span><h3>What this evidence establishes</h3><span className={styles.plus} aria-hidden="true">+</span></summary><div className={styles.decisionBody}><ul className={styles.boundaries}>{world.boundaries.map(boundary => <li key={boundary}>{boundary}</li>)}</ul></div></details></div>
      </section>
      <aside className={styles.provenance} id="capture-notes">
        <div><p className={styles.eyebrow}>THE RECORD BEHIND THE STORY</p><h2>Real software, carefully presented.</h2><p>{tour.evidence.note}</p></div>
        <div className={styles.evidenceLinks}>
          <span>Captured {tour.evidence.captured}</span>
          <a href={`/media/projects/${project.slug}/depth/presentation-board.webp`} download>Download visual overview ↓</a>
          <a href={tour.evidence.manifest} target="_blank" rel="noopener noreferrer">Capture details ↗</a>
          <a href={`/media/projects/${project.slug}/depth/research.md`} target="_blank" rel="noopener noreferrer">Source review & evidence ↗</a>
          {project.links?.repo && <a href={project.links.repo} target="_blank" rel="noopener noreferrer">Explore the repository ↗</a>}
          {project.links?.live && <a href={project.links.live} target="_blank" rel="noopener noreferrer">Open the project ↗</a>}
        </div>
      </aside>
      <nav className={styles.next} aria-label="Next project"><div><p className={styles.eyebrow}>ANOTHER WORLD TO EXPLORE</p><Link href={`/work/${next.slug}`}>{next.title} <span aria-hidden="true">↗</span></Link><p>{next.oneLiner}</p></div><Link href="/work">Back to all work ←</Link></nav>
    </div>
  </article>;
}
