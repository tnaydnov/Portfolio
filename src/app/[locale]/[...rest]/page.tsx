import { notFound } from "next/navigation";

/**
 * Anything under a locale that matches no real route.
 *
 * Without this, `/he/nope` falls past the `[locale]` segment entirely and Next
 * serves its own bare 404 — no layout, no fonts, no theme, no Hebrew. Routing
 * it through here means every 404 on the site is the site's 404.
 *
 * More specific segments always win, so this shadows nothing.
 */
export default function CatchAll(): never {
  notFound();
}
