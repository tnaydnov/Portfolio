import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Assistant, Rubik } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { LocaleToggle } from "@/components/chrome/LocaleToggle";
import { ThemeToggle } from "@/components/chrome/ThemeToggle";
import { THEME_SCRIPT } from "@/components/chrome/ThemeToggle";
import { DIR, LOCALES, isLocale, t, type Locale } from "@/lib/i18n";
import { me } from "@/content/cv";
import { site } from "@/lib/site";

/**
 * Two families, down from five. Both carry Hebrew and Latin, so the Hebrew
 * page needs no separate stack and nothing has to be swapped at the root.
 */
const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  variable: "--font-rubik",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["latin", "hebrew"],
  variable: "--font-assistant",
  display: "swap",
});

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

  const description = t(me.what, locale);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${me.nameLatin} — ${locale === "he" ? "מהנדס תוכנה" : "Software engineer"}`,
      template: `%s — ${me.nameLatin}`,
    },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      siteName: me.nameLatin,
      title: me.nameLatin,
      description,
      locale,
    },
    twitter: { card: "summary_large_image" },
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
      className={`${rubik.variable} ${assistant.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        {/* The only chrome on the site. There is nowhere to navigate to. */}
        <div className="no-print wrap flex items-center justify-end gap-2 pt-5">
          <LocaleToggle locale={locale} />
          <ThemeToggle locale={locale} />
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
