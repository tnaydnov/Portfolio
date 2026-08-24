import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["en", "he"];

/** Sends bare paths to a locale, preferring Hebrew when the browser asks for it. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const accept = request.headers.get("accept-language") ?? "";
  const locale = /(^|,)\s*he\b/i.test(accept) ? "he" : "en";

  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host") ?? request.nextUrl.host;
  const protocol = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.slice(0, -1);
  const url = new URL(
    `/${locale}${pathname === "/" ? "" : pathname}`,
    `${protocol}://${host}`,
  );
  url.search = request.nextUrl.search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
