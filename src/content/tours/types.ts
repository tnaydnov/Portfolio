export interface TourScreen {
  id: string;
  title: string;
  description: string;
  portal: string;
  src: string;
  width: number;
  height: number;
  /** A portrait/mobile capture is displayed in a phone-sized frame. */
  mobile?: boolean;
  /** Source-pixel detail area. The full screenshot remains available in the viewer. */
  focus?: { x: number; y: number; width: number; height: number };
}

export interface TourFilm {
  id: string;
  title: string;
  description: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  duration: number;
  captions?: string;
  chapters: { at: number; title: string; description?: string }[];
}

export interface ProductTour {
  eyebrow: string;
  title: string;
  intro: string;
  audience: string;
  hero: TourScreen;
  companion?: TourScreen;
  screens: TourScreen[];
  films: TourFilm[];
  capabilities: { title: string; description: string }[];
  technology: { layer: string; tools: string; purpose: string }[];
  evidence: { captured: string; revision: string; note: string; manifest: string };
}
