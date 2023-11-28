import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["ar", "en", "es"],
  defaultLocale: "en",
});

export default authMiddleware({
  beforeAuth(request) {
    return intlMiddleware(request);
  },

  // Ensure that locale-specific sign in pages are public
  publicRoutes: ["/", "/:locale", "/:locale/sign-in", "/:locale/sign-up"],
});

export const config = {
  // Match only internationalized pathnames

  matcher: [
    "/",
    "/(ar|en|es)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images/books|icons|manifest).*)",
  ],
};
