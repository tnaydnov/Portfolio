import type { LS, LSA, Locale } from "./i18n";
import type { StageId } from "./stages";

export type Tier = "flagship" | "system" | "rep";
export type Domain = "product" | "platform" | "applied-ai" | "education";
export type Status = "live" | "ongoing" | "internal" | "archived";

export interface Metric {
  label: LS;
  value: LS;
  note?: LS;
}

export interface Decision {
  id: string;
  date: string;
  title: LS;
  why: LS;
  tradeoff: LS;
  revisit: LS;
}

export interface Feedback {
  quote: LS;
  source: LS;
  change: LS;
}

export interface StageSection {
  stage: StageId;
  heading: LS;
  body: LSA;
}

export interface GraphNode {
  id: string;
  label: string;
  sub?: string;
  /** Conceptual grid position. */
  x: number;
  y: number;
  kind: "edge" | "service" | "store" | "client";
  note: LS;
}

export interface GraphEdge {
  from: string;
  to: string;
  label?: string;
}

export interface Architecture {
  caption: LS;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface ConstraintScenario {
  /** 0 = most scarce, 2 = most abundant. */
  time: 0 | 1 | 2;
  scope: 0 | 1 | 2;
  outcome: LS;
}

export interface ConstraintStudy {
  question: LS;
  actual: { time: 0 | 1 | 2; scope: 0 | 1 | 2; note: LS };
  scenarios: ConstraintScenario[];
}

export interface Project {
  slug: string;
  title: string;
  oneLiner: LS;
  /** The angle — the sentence that frames the whole case study. */
  hook: LS;
  tier: Tier;
  stages: StageId[];
  domain: Domain[];
  role: LS;
  team?: LS;
  /** 'YYYY-MM' */
  started: string;
  ended?: string;
  status: Status;
  metrics: Metric[];
  stack: string[];
  links?: { repo?: string; live?: string };
  media?: { poster: string; video?: string; alt: LS };
  sections?: StageSection[];
  decisions?: Decision[];
  feedback?: Feedback[];
  architecture?: Architecture;
  constraints?: ConstraintStudy;
  rebuild?: LSA;
  /** Reps only: the one thing it taught. */
  taught?: LS;
}

export const TIER_LABEL: Record<Tier, LS> = {
  flagship: { en: "Case study", he: "מקרה בוחן" },
  system: { en: "System", he: "מערכת" },
  rep: { en: "Rep", he: "חזרה" },
};

export const DOMAIN_LABEL: Record<Domain, LS> = {
  product: { en: "Product", he: "מוצר" },
  platform: { en: "Platform", he: "פלטפורמה" },
  "applied-ai": { en: "Applied AI", he: "בינה מלאכותית יישומית" },
  education: { en: "Education", he: "חינוך" },
};

export const STATUS_LABEL: Record<Status, LS> = {
  live: { en: "Live", he: "פעיל" },
  ongoing: { en: "Ongoing", he: "בעבודה" },
  internal: { en: "Internal", he: "פנימי" },
  archived: { en: "Archived", he: "בארכיון" },
};

export function formatSpan(
  p: Pick<Project, "started" | "ended">,
  locale: Locale,
): string {
  const fmt = (v: string) => {
    const [y, m] = v.split("-");
    const month = new Date(Number(y), Number(m) - 1).toLocaleString(
      locale === "he" ? "he-IL" : "en",
      { month: "short" },
    );
    return `${month} ${y}`;
  };
  const nowLabel = locale === "he" ? "היום" : "now";
  return p.ended
    ? `${fmt(p.started)} — ${fmt(p.ended)}`
    : `${fmt(p.started)} — ${nowLabel}`;
}
