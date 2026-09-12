import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectExperience } from "@/components/experience/ProjectExperience";
import { isExperienceProject } from "@/components/experience/projects";
import { isLocale, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    description: t(site.description, locale),
  });
}

export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ project?: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const project = (await searchParams).project ?? null;
  return <ProjectExperience locale={raw} initialProject={isExperienceProject(project) ? project : "arc"} />;
}
