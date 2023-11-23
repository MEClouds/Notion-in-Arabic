import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar", "es"],

  // Used when no locale matches
  defaultLocale: "en",
  localePrefix: "as-needed",
  //   localePrefix: "never",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en|es)/:path*"],
};
