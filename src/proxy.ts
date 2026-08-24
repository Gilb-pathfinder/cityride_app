import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "rw", "fr"] as const;
const defaultLocale = "en";
const LOCALE_COOKIE = "cityride-locale";

function detectLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage
    .split(",")
    .map((entry) => entry.split(";")[0]?.trim().slice(0, 2).toLowerCase());
  const match = preferred.find((lang) => (locales as readonly string[]).includes(lang));

  return match ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

  if (hasLocale) {
    return NextResponse.next();
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|refernces|videos|favicon.ico).*)"],
};
