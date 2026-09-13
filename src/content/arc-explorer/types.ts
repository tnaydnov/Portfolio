export type ArcPortalId = "admin" | "instructor" | "student";

export interface ArcExplorerPage {
  id: string;
  label: string;
  group: string;
  title: string;
  description: string;
  /** Detail pages appear in their parent view and in search, not the sidebar. */
  parentId?: string;
  features: string[];
  sourcePaths: string[];
  screenIds: string[];
  filmIds: string[];
}

export interface ArcPortalDefinition {
  id: ArcPortalId;
  label: string;
  subtitle: string;
  description: string;
  initialPage: string;
  pages: ArcExplorerPage[];
}

export function arcExplorerHref(portal: ArcPortalId, page = "overview") {
  return `/work/arc/explore/${portal}/${page}`;
}
