import type { StageId } from "./stages";
export type Tier = "flagship" | "system" | "rep";
export type Domain = "product" | "platform" | "applied-ai" | "education";
export type Status = "live" | "ongoing" | "internal" | "archived" | "discontinued" | "status-unverified";
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
  /** Conceptual grid position. */
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
  actual: {
    time: 0 | 1 | 2;
    scope: 0 | 1 | 2;
    note: string;
  };
  scenarios: ConstraintScenario[];
}
export interface ProjectSnapshot {
  /** The situation a visitor should understand before reading the full case. */
  problem: string;
  /** The important reframing or product move. */
  move: string;
  /** Tomer's concrete contribution, with team boundaries intact. */
  contribution: string;
  /** What can be inspected today. */
  proof: string;
}
export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  /** The angle - the sentence that frames the whole case study. */
  hook: string;
  /** A recruiter-readable version of the case before the long-form material. */
  snapshot?: ProjectSnapshot;
  tier: Tier;
  stages: StageId[];
  domain: Domain[];
  role: string;
  team?: string;
  /** 'YYYY' or 'YYYY-MM'. */
  started: string;
  ended?: string;
  status: Status;
  /** Public-facing wording when the generic status enum would imply too much. */
  statusLabel?: string;
  statusDetail?: string;
  /** Plain-language provenance, kept below the main story. */
  evidenceNote?: string;
  metrics: Metric[];
  stack: string[];
  links?: {
    repo?: string;
    live?: string;
  };
  visual?: "lpr-pipeline" | "trading-model";
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
  discontinued: "Discontinued",
  "status-unverified": "Status unverified",
};
export function formatSpan(p: Pick<Project, "started" | "ended">): string {
  const fmt = (v: string) => {
    if (v === "unverified") {
      return "Date unverified";
    }
    const [y, m] = v.split("-");
    if (!m)
      return y;
    const month = new Date(Number(y), Number(m) - 1).toLocaleString("en", { month: "short" });
    return `${month} ${y}`;
  };
  if (p.started === "unverified" && !p.ended)
    return fmt(p.started);
  if (p.ended && fmt(p.started) === fmt(p.ended))
    return fmt(p.started);
  return p.ended
    ? `${fmt(p.started)} - ${fmt(p.ended)}`
    : `${fmt(p.started)} - now`;
}
