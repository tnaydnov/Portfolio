import type { Project, Tier } from "@/lib/types";
import type { StageId } from "@/lib/stages";
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

export function byStage(stage: StageId): Project[] {
  return CASE_STUDIES.filter((p) => p.stages.includes(stage));
}

/** One piece of hard evidence per stage, used on the home page loop. */
export const STAGE_EVIDENCE: Record<
  StageId,
  { slug: string; title: string; claim: string }
> = {
  signal: {
    slug: "arc",
    title: "Arc",
    claim:
      "Nobody requested Arc. I noticed six instructors rebuilding the same material six ways and went looking for why a shared folder had already failed.",
  },
  frame: {
    slug: "eventa",
    title: "Eventa",
    claim:
      "Framing Eventa around onboarding completion ruled out a native app, accounts and passwords before a single screen was designed.",
  },
  plan: {
    slug: "arc",
    title: "Arc",
    claim:
      "Arc's riskiest assumption was behavioural, not technical — so I tested whether instructors would share material before building anything to share it with.",
  },
  build: {
    slug: "applytide",
    title: "Applytide",
    claim:
      "Six services, twenty data models, fourteen routers — and a written defence for why each boundary exists and what it would take to delete it.",
  },
  prove: {
    slug: "applytide",
    title: "Applytide",
    claim:
      "A hard daily spending cap on AI calls, enforced in Redis with per-user attribution. That is what makes an AI feature safe to leave running.",
  },
  field: {
    slug: "arc",
    title: "Arc",
    claim:
      "Three years of classroom use. Almost nothing Arc does today was in the original spec, and the largest improvement came from a complaint I first dismissed.",
  },
};
