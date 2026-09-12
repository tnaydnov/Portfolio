export interface EngineeringSource { label: string; url: string }
export interface EngineeringStudy {
  slug: string;
  title: string;
  oneLiner: string;
  summary: string;
  revision: string;
  repo: string;
  stack: string[];
  groups: { title: string; summary: string; details: string[]; sources: EngineeringSource[] }[];
  architecture: { nodes: { id: string; label: string; detail: string }[]; edges: { from: string; to: string; label?: string }[] };
  decisions: { title: string; implementation: string; rationale: string; sources: EngineeringSource[] }[];
  limitations: string[];
  visualTitle: string;
  visualLabels: string[];
}
