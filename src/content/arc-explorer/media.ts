import { getProductTour } from "@/content/tours";
import type { TourFilm, TourScreen } from "@/content/tours/types";
import captures from "./captures.json";

/** Additional original-app captures are recorded in the portal capture manifest. */
export const arcPortalScreens: TourScreen[] = captures.screens;
export const arcPortalFilms: TourFilm[] = captures.films;
export function getArcMedia() {
  const original = getProductTour("arc")!;
  return {
    screens: [...original.screens, ...arcPortalScreens],
    films: [...original.films, ...arcPortalFilms],
  };
}
