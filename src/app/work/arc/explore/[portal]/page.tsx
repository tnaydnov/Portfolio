import { notFound, redirect } from "next/navigation";
import { getArcPortal } from "@/content/arc-explorer";
import { arcExplorerHref } from "@/content/arc-explorer/types";

export default async function ArcPortalEntry({
  params,
}: {
  params: Promise<{ portal: string }>;
}) {
  const portal = getArcPortal((await params).portal);
  if (!portal) notFound();
  redirect(arcExplorerHref(portal.id, portal.initialPage));
}
