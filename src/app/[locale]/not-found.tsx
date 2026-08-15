import Link from "next/link";
import { headers } from "next/headers";
import { DEFAULT_LOCALE, isLocale, t, type Locale } from "@/lib/i18n";
import { href } from "@/lib/site";

const COPY = {
  title: { en: "Nothing here.", he: "אין כאן כלום." },
  body: {
    en: "That page doesn’t exist. There isn’t much of this site, so it’s probably the front page you want.",
    he: "הדף הזה לא קיים. אין כאן הרבה אתר, אז כנראה שהדף הראשי הוא מה שחיפשת.",
  },
  cta: { en: "Take me back", he: "קחו אותי חזרה" },
} as const;

export default async function NotFound() {
  // `not-found.tsx` gets no params, so middleware hands the locale over.
  const requested = (await headers()).get("x-locale") ?? undefined;
  const locale: Locale = isLocale(requested) ? requested : DEFAULT_LOCALE;

  return (
    <main className="wrap flex min-h-[60svh] flex-col justify-center pb-24">
      <h1 className="font-display text-[clamp(1.9rem,7vw,2.75rem)] font-bold">
        {t(COPY.title, locale)}
      </h1>
      <p className="mt-4 max-w-[38ch] text-soft">{t(COPY.body, locale)}</p>
      <p className="mt-7">
        <Link href={href("/", locale)} className="link font-semibold">
          {t(COPY.cta, locale)}
        </Link>
      </p>
    </main>
  );
}
