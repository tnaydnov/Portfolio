import { adminPortal } from "./admin";
import { instructorPortal } from "./instructor";
import { studentPortal } from "./student";
import type { ArcPortalId } from "./types";

export const arcPortals = [adminPortal, instructorPortal, studentPortal];
export function getArcPortal(id: string) {
  return arcPortals.find((portal) => portal.id === id);
}
export function isArcPortal(id: string): id is ArcPortalId {
  return arcPortals.some((portal) => portal.id === id);
}
