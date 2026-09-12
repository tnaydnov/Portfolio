import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-code", display: "swap" });

export const viewport: Viewport = { themeColor: "#e7eeee" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: site.role,
    description: site.description,
    sameAs: [site.links.github, site.links.linkedin],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Ben-Gurion University of the Negev" },
    knowsAbout: ["Software engineering", "Technical product development", "Workflow design", "Educational technology"],
  };

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
