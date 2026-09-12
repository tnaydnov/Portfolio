import type { Metadata } from "next";
import { href, site } from "./site";

export function pageMetadata({ path = "/", title, description, index = true, }: {
  path?: string;
  title?: string;
  description: string;
  index?: boolean;
}): Metadata {
  const canonical = href(path);
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: new URL(canonical, site.url),
      ...(title ? { title } : {}),
      description,
    },
    robots: { index, follow: true },
  };
}
