import { browserWorld } from "./browser-world";
import { applytideWorld } from "./applytide-world";
import { arcWorld } from "./arc-world";
import { eventaWorld } from "./eventa-world";

export interface WorldStory {
  id: string;
  label: string;
  title: string;
  description: string;
  film?: string;
  screens: string[];
  takeaway: { title: string; text: string };
}
export interface SourceLink { label: string; path: string }
export interface ProjectWorld {
  headline: string;
  description: string;
  motif: string;
  roles: string[];
  hero?: string;
  companion?: string;
  stories: WorldStory[];
  system: { title: string; text: string }[];
  decisions: { title: string; explanation: string; tradeoff: string; sources: SourceLink[] }[];
  boundaries: string[];
  repo: string;
  revision: string;
  privateSource?: boolean;
}

export const worlds: Record<string, ProjectWorld> = {arc:arcWorld,"browser-coder":browserWorld,applytide:applytideWorld,eventa:eventaWorld};
