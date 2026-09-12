import type { Project, Tier } from "@/lib/types";
import { arc } from "./arc";
import { browserCoder } from "./browser-coder";
import { applytide } from "./applytide";
import { eventa } from "./eventa";
import { lpr, tradingSystem } from "./systems";
import { reps } from "./reps";
import { engineeringStudies } from "../engineering";

export const SELECTED_WORK: Project[] = [arc, browserCoder, applytide, eventa];
export const EARLIER_ENGINEERING: Project[] = [lpr, tradingSystem, ...reps].map(project => {
  const study = engineeringStudies[project.slug];
  if (!study) return project;
  return { ...project, oneLiner:study.oneLiner, stack:study.stack,
    snapshot:project.snapshot ?? {
      problem:study.oneLiner, move:study.summary,
      contribution:"University coursework preserved in my repository. The available history does not establish individual ownership of every subsystem, so this study describes the implementation without claiming sole authorship of the whole project.",
      proof:"Source reviewed at a pinned revision. The visuals explain implementation with illustrative data; no fresh application run is claimed.",
    },
    sections:project.sections ?? [{stage:"build" as const,heading:study.visualTitle,body:[study.summary]}],
  };
});

export const ALL_PROJECTS: Project[] = [
  ...SELECTED_WORK,
  ...EARLIER_ENGINEERING,
];

export const CASE_STUDIES = ALL_PROJECTS.filter(
  (project) => project.tier !== "rep" || Boolean(project.snapshot && project.sections?.length),
);

export function byTier(tier: Tier): Project[] {
  return ALL_PROJECTS.filter((p) => p.tier === tier);
}
