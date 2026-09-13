import Image from "next/image";
import Link from "next/link";
import { arcPortals } from "@/content/arc-explorer";
import { arcExplorerHref } from "@/content/arc-explorer/types";
import { getArcMedia } from "@/content/arc-explorer/media";
import { arcWorld } from "@/content/tours/arc-world";
import { arc } from "@/content/work/arc";
import { TourVideo } from "@/components/case/ProductMedia";
import styles from "./arc-case.module.css";

const entrances = {
  admin: {
    index: "01",
    title: "See the bigger picture.",
    text: "The people, the curriculum and the intelligence behind the whole program.",
    tag: "Management / Content / BI",
    screen: "bi-friction",
    labels: ["Six BI perspectives", "Curriculum builder", "People & access"],
  },
  instructor: {
    index: "02",
    title: "Bring the classroom to life.",
    text: "Prepare a lesson, follow every learner and make feedback part of what happens next.",
    tag: "Classroom / Feedback / Live tools",
    screen: "instructor-gradebook",
    labels: ["Classroom workspace", "Review & revision", "Live activities"],
  },
  student: {
    index: "03",
    title: "Make learning your own.",
    text: "A world to explore, ideas to create and more than one way to show what you know.",
    tag: "Themes / Activities / Learning",
    screen: "student-space",
    labels: ["Five visual worlds", "21 activity kinds", "Work & feedback"],
  },
};

export function ArcCasePage() {
  const media = getArcMedia();
  const films = media.films;
  return (
    <article
      className={styles.case}
      data-testid="product-case-study"
      data-arc-case="portals"
    >
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/work">← All work</Link>
          <span>ARC / A CONNECTED LEARNING PLATFORM</span>
          <a href="#deep-dive">Behind the build ↘</a>
        </div>
        <header className={styles.hero}>
          <div className={styles.heroTop}>
            <h1>
              <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
                <path
                  d="M7 34 22 7l15 27M13 26h18"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="36" cy="8" r="3" fill="currentColor" />
              </svg>
              Arc
            </h1>
            <p>
              <span aria-hidden="true" />
              Live. Growing. Built together.
            </p>
          </div>
          <div className={styles.heroMessage}>
            <h2>
              One platform.
              <br />
              <em>Three ways inside.</em>
            </h2>
            <div>
              <p>
                A learning platform connects more than lessons. Arc brings the
                people who plan, teach and learn into one shared experience.
              </p>
              <p className={styles.invite}>
                Choose a portal. Open a page. Follow your curiosity.
              </p>
              <nav
                className={styles.quickPortals}
                aria-label="Open an Arc portal"
              >
                {arcPortals.map((portal) => (
                  <Link key={portal.id} href={arcExplorerHref(portal.id)}>
                    {portal.id === "admin" ? "Admin" : portal.label}
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </header>
        <section
          id="portals"
          className={styles.portals}
          aria-label="Explore Arc's three portals"
        >
          {arcPortals.map((portal) => {
            const entrance = entrances[portal.id];
            const screen = media.screens.find(
              (item) => item.id === entrance.screen,
            )!;
            return (
              <Link
                key={portal.id}
                href={arcExplorerHref(portal.id, portal.initialPage)}
                className={styles.portalCard}
                data-portal={portal.id}
              >
                <div className={styles.cardTop}>
                  <span>
                    {entrance.index} / {portal.label}
                  </span>
                  <span className={styles.enterIcon} aria-hidden="true">
                    ↗
                  </span>
                </div>
                <div className={styles.portalArt}>
                  <div className={styles.portalHalo} aria-hidden="true" />
                  <div className={styles.portalWindow}>
                    <div className={styles.windowChrome}>
                      <i />
                      <i />
                      <i />
                      <span>arc / {portal.id}</span>
                    </div>
                    <Image
                      src={screen.src}
                      alt={`${portal.label} portal in the original Arc application`}
                      width={screen.width}
                      height={screen.height}
                      sizes="(max-width: 700px) 90vw, (max-width: 1100px) 48vw, 440px"
                      quality={90}
                      priority
                    />
                  </div>
                  <span className={styles.artChip}>
                    {portal.id === "admin"
                      ? "From program → learner"
                      : portal.id === "instructor"
                        ? "Every learner in view"
                        : "Your world. Your way."}
                  </span>
                </div>
                <div className={styles.cardCopy}>
                  <p>{entrance.tag}</p>
                  <h3>{entrance.title}</h3>
                  <p>{entrance.text}</p>
                  <div className={styles.cardTags}>
                    {entrance.labels.map((label) => (
                      <span key={label}>{label}</span>
                    ))}
                  </div>
                  <div className={styles.cardAction}>
                    <strong>
                      Enter {portal.label.toLowerCase()}{" "}
                      <span aria-hidden="true">→</span>
                    </strong>
                    <span>{portal.pages.length} views</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
        <div className={styles.demoNote}>
          <span className={styles.demoIcon} aria-hidden="true">
            ◈
          </span>
          <p>
            <strong>Free to explore. Nothing to break.</strong> The interactive
            portfolio demo uses fictional data and read-only views of Arc’s
            capabilities. Original app screenshots and recordings are available
            throughout.
          </p>
          <Link href="/work/arc/recordings">Watch the original app ↗</Link>
        </div>

        <section
          className={styles.context}
          id="overview"
          aria-labelledby="arc-context-title"
        >
          <div>
            <p className={styles.eyebrow}>THE WORK BEHIND THE WORLD</p>
            <h2 id="arc-context-title">
              Built for people.
              <br />
              Built with care.
            </h2>
            <details>
              <summary>
                Where I contributed <span aria-hidden="true">+</span>
              </summary>
              <p>
                {arc.snapshot?.contribution} My coworker and I continue to
                support and expand both Arc and Browser Coder.
              </p>
            </details>
          </div>
          <div className={styles.contextFacts}>
            <div>
              <strong>2</strong>
              <span>Developers</span>
              <p>My coworker and me, building and supporting the platform.</p>
            </div>
            <div>
              <strong>3,000+</strong>
              <span>Students, instructors & managers</span>
              <p>Across Arc and Browser Coder combined.</p>
            </div>
            <div>
              <strong>One loop</strong>
              <span>Plan → teach → learn → improve</span>
              <p>
                Shared content, classroom context, original work and feedback.
              </p>
            </div>
          </div>
        </section>

        <section
          className={styles.directory}
          aria-labelledby="arc-directory-title"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>KNOW WHAT YOU ARE LOOKING FOR?</p>
              <h2 id="arc-directory-title">Go straight there.</h2>
            </div>
            <p>
              From BI to branching stories. Every view has its own address, and
              each portal has search.
            </p>
          </div>
          <div className={styles.directoryGrid}>
            {arcPortals.map((portal) => (
              <details key={portal.id} className={styles.directoryPortal}>
                <summary>
                  <span>
                    {portal.label}
                    <small>{portal.pages.length} explorable views</small>
                  </span>
                  <span aria-hidden="true">+</span>
                </summary>
                <nav aria-label={`${portal.label} capability directory`}>
                  {portal.pages.map((page) => (
                    <Link
                      key={page.id}
                      href={arcExplorerHref(portal.id, page.id)}
                      prefetch={false}
                      data-detail={Boolean(page.parentId)}
                    >
                      <span>{page.label}</span>
                      <span aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </nav>
              </details>
            ))}
          </div>
        </section>

        <section
          className={styles.recordings}
          id="recordings"
          aria-labelledby="arc-recordings-title"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>THE ORIGINAL SOFTWARE, IN MOTION</p>
              <h2 id="arc-recordings-title">See the moments connect.</h2>
            </div>
            <Link href="/work/arc/recordings">
              All screenshots & recordings ↗
            </Link>
          </div>
          <div className={styles.filmGrid}>
            {[
              films.find((film) => film.id === "admin-bi-exploration") ??
                films.find((film) => film.id === "live-classroom-two-sides"),
              films.find((film) => film.id === "learning-worlds-and-making"),
            ]
              .filter((film) => film !== undefined)
              .map((film) => (
                <TourVideo key={film.id} film={film} />
              ))}
          </div>
        </section>

        <section
          className={styles.engineering}
          id="deep-dive"
          aria-labelledby="arc-engineering-title"
        >
          <span id="engineering" className={styles.anchor} />
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>FOR THE TECHNICALLY CURIOUS</p>
              <h2 id="arc-engineering-title">A shared system underneath.</h2>
            </div>
            <p>
              Different experiences meet at the same learning records,
              permissions and lifecycle.
            </p>
          </div>
          <div className={styles.architecture} aria-label="Arc architecture">
            <div className={styles.portalNodes}>
              <span>Admin & management</span>
              <span>Instructor & classroom</span>
              <span>Student & activities</span>
            </div>
            <div className={styles.layerBridge} aria-hidden="true">
              ↓
            </div>
            <div className={styles.domainNodes}>
              <div>
                <span>ACCESS</span>
                <strong>Typed actors & scoped permissions</strong>
              </div>
              <div>
                <span>LEARNING</span>
                <strong>Curriculum, activities & live sessions</strong>
              </div>
              <div>
                <span>WORK</span>
                <strong>Submissions, versions & reviews</strong>
              </div>
            </div>
            <div className={styles.layerBridge} aria-hidden="true">
              ↓
            </div>
            <div className={styles.foundation}>
              <span>Laravel · Blade · Alpine</span>
              <span>React · TypeScript editors</span>
              <span>Reverb · polling recovery</span>
              <span>SQL · Redis · Docker</span>
            </div>
          </div>
          <div className={styles.decisions}>
            {arcWorld.decisions.map((decision, index) => (
              <details key={decision.title}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{decision.title}</h3>
                  <span aria-hidden="true">+</span>
                </summary>
                <div>
                  <p>{decision.explanation}</p>
                  <p>
                    <strong>The trade-off.</strong> {decision.tradeoff}
                  </p>
                  <div className={styles.sourceLabels}>
                    {decision.sources.map((source) => (
                      <span key={source.path} title={source.path}>
                        {source.label} · team source
                      </span>
                    ))}
                  </div>
                </div>
              </details>
            ))}
            <details>
              <summary>
                <span>07</span>
                <h3>Keep exploration separate from production.</h3>
                <span aria-hidden="true">+</span>
              </summary>
              <div>
                <p>
                  This portfolio demo presents selected read-only states for
                  each catalogued capability. Its charts, filters and examples
                  use a local fictional dataset. It does not connect to learner
                  accounts, run code, submit work or call Arc’s services.
                </p>
                <p>
                  Original screenshots and recordings were captured from an
                  isolated copy of Arc with synthetic accounts. They document
                  real application behavior at their recorded revisions. Source
                  review, the portfolio demo and production operation are
                  distinct evidence.
                </p>
              </div>
            </details>
          </div>
        </section>
        <footer className={styles.foot}>
          <div>
            <p className={styles.eyebrow}>CONTINUE THE CONNECTION</p>
            <h2>The coding workspace inside the lesson.</h2>
            <Link href="/work/browser-coder">
              Explore Browser Coder <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div>
            <a href="/media/projects/arc/portals/research.md">
              Source review & original capture notes ↗
            </a>
            <Link href="/work">Back to all work ←</Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
