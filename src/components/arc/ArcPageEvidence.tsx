import Link from "next/link";
import { getArcMedia } from "@/content/arc-explorer/media";
import type { ArcExplorerPage } from "@/content/arc-explorer/types";
import { ScreenshotGallery } from "@/components/case/ProductMedia";
import { ArcEvidenceFilms } from "./ArcEvidenceFilms";
import styles from "./arc-explorer.module.css";

export function ArcPageEvidence({ page }: { page: ArcExplorerPage }) {
  const media = getArcMedia();
  const screens = media.screens.filter((screen) =>
    page.screenIds.includes(screen.id),
  );
  const films = media.films.filter((film) => page.filmIds.includes(film.id));
  return (
    <section className={styles.evidence} aria-labelledby="arc-evidence-heading">
      <div className={styles.evidenceHeading}>
        <div>
          <h2 id="arc-evidence-heading">Inside the original application.</h2>
          <p>
            {screens.length || films.length
              ? "Real Arc screens and recordings, captured locally with fictional people and work."
              : "This demo view is grounded in Arc’s source. Explore the recorded workflows for a look at the original interface."}
          </p>
        </div>
        <Link href="/work/arc/recordings">All original recordings ↗</Link>
      </div>
      <div className={styles.evidenceMedia}>
        {screens.length > 0 && (
          <ScreenshotGallery project="Arc" screens={screens} />
        )}
        {films.length > 0 && <ArcEvidenceFilms films={films} />}
      </div>
      <details className={styles.sourceReferences}>
        <summary>Source references & review notes</summary>
        <div>
          <ul>
            {page.sourcePaths.map((path) => (
              <li key={path}>
                <code>{path.replace(/^src\//, "")}</code>
              </li>
            ))}
          </ul>
          <a href="/media/projects/arc/portals/research.md">
            Read the portal research & evidence boundaries ↗
          </a>
        </div>
      </details>
      <p className={styles.sourceNote}>
        Source reviewed at development revision 5549bf96. Original captures have
        their own pinned revisions; the live platform has a separate release.
      </p>
    </section>
  );
}
