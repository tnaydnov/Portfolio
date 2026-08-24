import type { Project, Tier } from "@/lib/types";
import { arc } from "./arc";
import { applytide } from "./applytide";
import { eventa } from "./eventa";
import { lpr, tradingSystem } from "./systems";
import { reps } from "./reps";

export const SELECTED_WORK: Project[] = [arc, applytide, eventa, lpr];
export const EARLIER_ENGINEERING: Project[] = [tradingSystem, ...reps];

export const ALL_PROJECTS: Project[] = [
  ...SELECTED_WORK,
  ...EARLIER_ENGINEERING,
];

export const CASE_STUDIES = ALL_PROJECTS.filter((p) => p.tier !== "rep");

export function getProject(slug: string): Project | undefined {
  return ALL_PROJECTS.find((p) => p.slug === slug);
}

export function byTier(tier: Tier): Project[] {
  return ALL_PROJECTS.filter((p) => p.tier === tier);
}
