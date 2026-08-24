import type { Project, Tier } from "@/lib/types";
import { arc } from "./arc";
import { applytide } from "./applytide";
import { eventa } from "./eventa";
import { lpr, tradingSystem } from "./systems";
import { reps } from "./reps";

export const FLAGSHIPS: Project[] = [arc, applytide, eventa];
export const SYSTEMS: Project[] = [lpr, tradingSystem];
export const REPS: Project[] = reps;

export const ALL_PROJECTS: Project[] = [...FLAGSHIPS, ...SYSTEMS, ...REPS];

export const CASE_STUDIES = ALL_PROJECTS.filter((p) => p.tier !== "rep");

export function getProject(slug: string): Project | undefined {
  return ALL_PROJECTS.find((p) => p.slug === slug);
}

export function byTier(tier: Tier): Project[] {
  return ALL_PROJECTS.filter((p) => p.tier === tier);
}
