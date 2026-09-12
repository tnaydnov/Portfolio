import Image from "next/image";
import { getProductTour } from "@/content/tours";
import type { Project } from "@/lib/types";
import { ProductPreview } from "./ProductPreview";
import styles from "./product-cover.module.css";

export function ProductCover({ project }: { project: Project }) {
  const tour = getProductTour(project.slug);
  if (!tour) return <ProductPreview project={project} compact/>;
  return <div className={styles.preview} data-mobile={tour.hero.mobile || undefined}>
    <div className={styles.label}><span>{tour.hero.portal}</span><span>{tour.screens.length} screens / {tour.films.length} {tour.films.length === 1 ? "film" : "films"}</span></div>
    <Image src={tour.hero.src} alt={`${project.title}: ${tour.hero.title}`} width={tour.hero.width} height={tour.hero.height} sizes="(max-width: 600px) 92vw, (max-width: 1200px) 44vw, 570px" quality={90}/>
  </div>;
}
