import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["en", "he"];

/** Sends bare paths to a locale, preferring Hebrew when the browser asks for it. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const active = LOCALES.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (active) {
    // `not-found.tsx` receives no params, so the locale rides along on the
    // request. Without this a Hebrew visitor gets an English 404.
    const headers = new Headers(request.headers);
    headers.set("x-locale", active);
    return NextResponse.next({ request: { headers } });
  }

  const accept = request.headers.get("accept-language") ?? "";
  const locale = /(^|,)\s*he\b/i.test(accept) ? "he" : "en";

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
