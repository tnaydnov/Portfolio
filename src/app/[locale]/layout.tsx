import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Bricolage_Grotesque,
  Heebo,
  Inter_Tight,
  JetBrains_Mono,
  Rubik,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { Grain } from "@/components/chrome/Grain";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { THEME_SCRIPT } from "@/components/chrome/ThemeToggle";
import { DIR, LOCALES, isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { localeAlternates, site } from "@/lib/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const hebrew = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-he",
  display: "swap",
});

const hebrewDisplay = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-he-display",
  display: "swap",
});

const FONTS = [display, body, mono, hebrew, hebrewDisplay]
  .map((f) => f.variable)
  .join(" ");

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const name = t(site.name, locale);
  const role = t(site.role, locale);

  return {
    metadataBase: new URL(site.url),
    title: { default: `${name} — ${role}`, template: `%s — ${name}` },
    description: t(site.description, locale),
    alternates: localeAlternates("/", locale),
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: name,
      title: `${name} — ${role}`,
      description: t(site.description, locale),
      locale: locale === "he" ? "he_IL" : "en_US",
      images: [
        {
          url: `/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: site.name.en,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — ${role}`,
      description: t(site.description, locale),
      images: [`/${locale}/opengraph-image`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <html
      lang={locale}
      dir={DIR[locale]}
      suppressHydrationWarning
      className={FONTS}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:border focus:border-signal focus:bg-surface focus:px-4 focus:py-3 focus:text-text"
        >
          {t(ui.common.skipToContent, locale)}
        </a>
        <Grain />
        <ScrollProgress />
        <SmoothScroll>
          <Header locale={locale} />
          <main id="main">{children}</main>
          <Footer locale={locale} />
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
