import { site } from "./site";

/*
 * Which site a build produces. Decided at build time (the site is a static
 * export), so the same commit can build either:
 *
 *   production build, not launched  -> "coming-soon"   (tonup.app until launch)
 *   anything else                   -> "full"          (dev, staging, features, local)
 *
 * A build is a production build when Workers Builds is building `main`
 * (WORKERS_CI_BRANCH=main) or a manual production deploy sets
 * DEPLOY_TARGET=production (see `pnpm deploy`). SITE_MODE overrides both,
 * for local testing: `SITE_MODE=coming-soon pnpm dev`.
 */
export type SiteMode = "full" | "coming-soon";

export function resolveSiteMode(env: Record<string, string | undefined>, launched: boolean): SiteMode {
  if (env.SITE_MODE === "full" || env.SITE_MODE === "coming-soon") return env.SITE_MODE;
  const productionBuild = env.WORKERS_CI_BRANCH === "main" || env.DEPLOY_TARGET === "production";
  return productionBuild && !launched ? "coming-soon" : "full";
}

export const siteMode: SiteMode = resolveSiteMode(
  {
    SITE_MODE: process.env.SITE_MODE,
    WORKERS_CI_BRANCH: process.env.WORKERS_CI_BRANCH,
    DEPLOY_TARGET: process.env.DEPLOY_TARGET,
  },
  site.launched,
);

export const comingSoon = siteMode === "coming-soon";
