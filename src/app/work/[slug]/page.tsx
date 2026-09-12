import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectWorldPage } from "@/components/case/ProjectWorldPage";
import { EngineeringStudyPage } from "@/components/case/EngineeringStudyPage";
import { engineeringStudies } from "@/content/engineering";
import { worlds } from "@/content/tours/worlds";
import { getProductTour } from "@/content/tours";
import { CASE_STUDIES } from "@/content/work";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDIES.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = CASE_STUDIES.find((candidate) => candidate.slug === slug);
  if (!project) return {};
  return pageMetadata({ path: `/work/${slug}`, title: project.title, description: project.oneLiner });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = CASE_STUDIES.find((candidate) => candidate.slug === slug);
  if (!project?.snapshot) notFound();

  const index = CASE_STUDIES.findIndex((candidate) => candidate.slug === project.slug);
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];
  if (engineeringStudies[project.slug]) return <EngineeringStudyPage project={project} study={engineeringStudies[project.slug]} next={next}/>;
  const tour = getProductTour(project.slug);
  if (tour && worlds[project.slug]) return <ProjectWorldPage project={project} tour={tour} world={worlds[project.slug]} next={next}/>;
  notFound();
}
