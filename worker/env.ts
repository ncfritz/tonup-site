// Pure helpers (no Workers globals) so they can be unit-tested with Node.

export const APEX = "tonup.app";
const PREVIEW_BASE = `.preview.${APEX}`;

/** Named Previews for the long-lived branches (see scripts/preview-name.ts). */
export const STAGING_PREVIEW = "staging";
export const DEV_PREVIEW = "dev";

export type Stage = "production" | "staging" | "development" | "preview";

/**
 * Production is the Worker's normal deployment (SITE_ENV=production).
 * Everything else is a Preview (SITE_ENV=preview), served at
 * `<preview>.preview.tonup.app` or, for one exact deployment,
 * `<deployment-id>-<preview>.preview.tonup.app`.
 */
export function stageFor(siteEnv: string | undefined, hostname: string): { stage: Stage; label: string | null } {
  if (siteEnv !== "preview") return { stage: "production", label: null };

  const name = hostname.endsWith(PREVIEW_BASE) ? hostname.slice(0, -PREVIEW_BASE.length) : "";
  if (name === STAGING_PREVIEW) return { stage: "staging", label: "Staging" };
  if (name === DEV_PREVIEW) return { stage: "development", label: "Development" };
  return { stage: "preview", label: name ? `Preview · ${name}` : "Preview" };
}

/** Ribbon pinned to the bottom-left corner on non-production pages. */
export function ribbonHtml(label: string, color: string): string {
  const safe = label.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
  return (
    `<div role="note" aria-label="Environment: ${safe}" style="position:fixed;left:12px;bottom:12px;z-index:2147483647;` +
    `padding:6px 12px;border-radius:999px;background:${color};color:#fff;font:800 12px/1.2 system-ui,sans-serif;` +
    `letter-spacing:.04em;box-shadow:0 2px 8px rgba(0,0,0,.25);pointer-events:none">${safe}</div>`
  );
}

export const RIBBON_COLOR: Record<Exclude<Stage, "production">, string> = {
  staging: "#7A3FB0",
  development: "#1F7A5A",
  preview: "#B4462E",
};
