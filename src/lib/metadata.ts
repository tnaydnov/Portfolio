import type { Metadata } from "next";
import { href, site } from "./site";

export function pageMetadata({ path = "/", description = site.description, index = true, }: {
  path?: string;
  description?: string;
  index?: boolean;
} = {}): Metadata {
  const canonical = href(path);
  const image = {
    url: new URL(site.socialImage.path, site.url).href,
    width: site.socialImage.width,
    height: site.socialImage.height,
    alt: site.socialImage.alt,
    type: "image/png",
  };
  return {
    title: { absolute: site.name },
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: new URL(canonical, site.url),
      siteName: site.name,
      locale: "en_US",
      title: site.name,
      description,
      images: [{ ...image, secureUrl: image.url }],
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description,
      images: [image],
    },
    robots: { index, follow: true },
  };
}
