import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { ui } from "@/lib/ui";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-code", display: "swap" });

export const viewport: Viewport = { themeColor: "#e7eeee" };

export const metadata: Metadata = {
  ...pageMetadata(),
  metadataBase: new URL(site.url),
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    "@id": `${site.url}/#person`,
    url: site.url,
    image: `${site.url}/images/tomer-social.png`,
    jobTitle: site.role,
    description: site.description,
    sameAs: [site.links.github, site.links.linkedin],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Ben-Gurion University of the Negev" },
    knowsAbout: ["Software engineering", "Technical product development", "Workflow design", "Educational technology"],
  };
  const structuredData = [person, {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    author: { "@id": person["@id"] },
  }];

  return <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
    <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></head>
    <body>
      <a href="#main" className="label sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:border focus:border-signal focus:bg-surface focus:px-4 focus:py-3 focus:text-text">{ui.common.skipToContent}</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      {process.env.VERCEL ? <><Analytics /><SpeedInsights /></> : null}
    </body>
  </html>;
}
