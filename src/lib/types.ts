import type { StageId } from "./stages";

export type Tier = "flagship" | "system" | "rep";
export type Domain = "product" | "platform" | "applied-ai" | "education";
export type Status = "live" | "ongoing" | "internal" | "archived";

export interface Metric {
  label: string;
  value: string;
  note?: string;
}

export interface Decision {
  id: string;
  date: string;
  title: string;
  why: string;
  tradeoff: string;
  revisit: string;
}

export interface Feedback {
  quote: string;
  source: string;
  change: string;
}

export interface StageSection {
  stage: StageId;
  heading: string;
  body: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  sub?: string;
  /** Grid position; laid out on a 12-col conceptual grid. */
  x: number;
  y: number;
  kind: "edge" | "service" | "store" | "client";
  note: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  label?: string;
}

export interface Architecture {
  caption: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface ConstraintScenario {
  /** 0 = most scarce, 2 = most abundant. */
  time: 0 | 1 | 2;
  scope: 0 | 1 | 2;
  outcome: string;
}

export interface ConstraintStudy {
  question: string;
  actual: { time: 0 | 1 | 2; scope: 0 | 1 | 2; note: string };
  scenarios: ConstraintScenario[];
}

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  /** The angle — the sentence that frames the whole case study. */
  hook: string;
  tier: Tier;
  stages: StageId[];
  domain: Domain[];
  role: string;
  team?: string;
  /** 'YYYY-MM' */
  started: string;
  ended?: string;
  status: Status;
  metrics: Metric[];
  stack: string[];
  links?: { repo?: string; live?: string };
  media?: { poster: string; video?: string; alt: string };
  sections?: StageSection[];
  decisions?: Decision[];
  feedback?: Feedback[];
  architecture?: Architecture;
  constraints?: ConstraintStudy;
  rebuild?: string[];
  /** Reps only: the one thing it taught. */
  taught?: string;
}

export const TIER_LABEL: Record<Tier, string> = {
  flagship: "Case study",
  system: "System",
  rep: "Rep",
};

export const DOMAIN_LABEL: Record<Domain, string> = {
  product: "Product",
  platform: "Platform",
  "applied-ai": "Applied AI",
  education: "Education",
};

export const STATUS_LABEL: Record<Status, string> = {
  live: "Live",
  ongoing: "Ongoing",
  internal: "Internal",
  archived: "Archived",
};

export function formatSpan(p: Pick<Project, "started" | "ended">): string {
  const fmt = (v: string) => {
    const [y, m] = v.split("-");
    const month = new Date(Number(y), Number(m) - 1).toLocaleString("en", {
      month: "short",
    });
    return `${month} ${y}`;
  };
  return p.ended ? `${fmt(p.started)} — ${fmt(p.ended)}` : `${fmt(p.started)} — now`;
}
