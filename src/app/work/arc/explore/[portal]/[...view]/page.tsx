import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { arcPortals, getArcPortal } from "@/content/arc-explorer";
import { arcExplorerHref } from "@/content/arc-explorer/types";
import { ArcExplorerShell } from "@/components/arc/ArcExplorerShell";
import { ArcPageEvidence } from "@/components/arc/ArcPageEvidence";
import { AdminPortalView } from "@/components/arc/AdminPortalView";
import { InstructorPortalView } from "@/components/arc/InstructorPortalView";
import { StudentPortalView } from "@/components/arc/StudentPortalView";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ portal: string; view: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return arcPortals.flatMap((portal) =>
    portal.pages.map((page) => ({
      portal: portal.id,
      view: page.id.split("/"),
    })),
  );
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = await params;
  const portal = getArcPortal(route.portal);
  const page = portal?.pages.find((item) => item.id === route.view.join("/"));
  if (!portal || !page) return {};
  return pageMetadata({
    path: arcExplorerHref(portal.id, page.id),
    description: `Arc ${portal.label}: ${page.label}. ${page.description} Explore a read-only portfolio demo with fictional data.`,
  });
}
export default async function ArcExplorerPage({ params }: Props) {
  const route = await params;
  const portal = getArcPortal(route.portal);
  const page = portal?.pages.find((item) => item.id === route.view.join("/"));
  if (!portal || !page) notFound();
  return (
    <ArcExplorerShell
      portal={portal}
      page={page}
      evidence={<ArcPageEvidence page={page} />}
    >
      {portal.id === "admin" ? (
        <AdminPortalView pageId={page.id} />
      ) : portal.id === "instructor" ? (
        <InstructorPortalView pageId={page.id} />
      ) : (
        <StudentPortalView pageId={page.id} />
      )}
    </ArcExplorerShell>
  );
}
