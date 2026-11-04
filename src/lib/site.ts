/*
 * Site-wide settings. Anything left null is hidden on the site until
 * it's filled in — no placeholder text ever ships.
 */
export const site = {
  name: "Ton Up",
  /** Who makes Ton Up, for the copyright line. Null hides the line. */
  company: null as string | null,
  url: "https://tonup.app",
  description:
    "Ton Up is a darts scorer, trainer and rule book for iPhone. Score 26 games, practise with drills that track your progress, and settle rules arguments before they start.",

  /** App Store page, e.g. "https://apps.apple.com/app/idXXXXXXXXXX". Null shows "Coming soon". */
  appStoreUrl: null as string | null,
  /** Support address shown in the footer. */
  supportEmail: null as string | null,

  /**
   * Production (tonup.app) shows the coming-soon page until this is true.
   * Dev, staging and feature Previews always show the full site.
   */
  launched: false,

  /** US prices (app ADR 0009). Keep these in step with App Store Connect. */
  prices: { app: "$9.99", pro: "$19.99" },
};
