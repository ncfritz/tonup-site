import { DEV_PREVIEW, STAGING_PREVIEW } from "../worker/env";

/** Long-lived branches with fixed Preview names. `main` is production: no Preview. */
export const NAMED: Record<string, string | null> = {
  main: null,
  staging: STAGING_PREVIEW,
  develop: DEV_PREVIEW,
};

const RESERVED = new Set([STAGING_PREVIEW, DEV_PREVIEW, "www"]);
const MAX = 40; // leaves room for "<deployment-id>-" within a 63-char DNS label

/** "feature/New_Hero" -> "feature-new-hero" (a valid DNS label). */
export function sanitize(branch: string): string {
  const name = branch
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX)
    .replace(/-+$/, "");
  if (!name) throw new Error(`Can't make a preview name from branch "${branch}"`);
  return name;
}

/**
 * The Preview name for a branch, or null for production (`main`).
 * Feature branches can't take the names reserved for staging and dev.
 */
export function previewName(branch: string): string | null {
  if (branch in NAMED) return NAMED[branch];
  const name = sanitize(branch);
  if (RESERVED.has(name)) {
    throw new Error(`Branch "${branch}" would become the reserved Preview "${name}"; rename the branch (e.g. feature/${name}).`);
  }
  return name;
}
