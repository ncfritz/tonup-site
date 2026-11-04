import { APEX, ribbonHtml, RIBBON_COLOR, stageFor } from "./env";

interface Env {
  ASSETS: Fetcher;
  SITE_ENV?: string;
}

// Static site, no third-party anything: lock the page down to its own origin.
export const SECURITY_HEADERS: Record<string, string> = {
  "Content-Security-Policy": [
    "default-src 'self'",
    // Next's inline bootstrap scripts
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

const DISALLOW_ALL = "User-agent: *\nDisallow: /\n";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { stage, label } = stageFor(env.SITE_ENV, url.hostname);
    const isProd = stage === "production";

    if (isProd && url.hostname === `www.${APEX}`) {
      url.hostname = APEX;
      return Response.redirect(url.toString(), 301);
    }

    // Belt and braces: Cloudflare Access already blocks crawlers outside
    // production, but never let a test build be indexed.
    if (!isProd && url.pathname === "/robots.txt") {
      return new Response(DISALLOW_ALL, {
        headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex, nofollow" },
      });
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) headers.set(name, value);

    // Next writes generated images without a file extension.
    if (url.pathname === "/opengraph-image" || url.pathname === "/apple-icon") {
      headers.set("Content-Type", "image/png");
    }

    // Hashed build files never change; everything else revalidates.
    if (url.pathname.startsWith("/_next/static/")) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    if (isProd) {
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    headers.set("X-Robots-Tag", "noindex, nofollow");
    headers.set("Cache-Control", "no-store");
    const out = new Response(response.body, { status: response.status, statusText: response.statusText, headers });

    if (!label || !(headers.get("Content-Type") ?? "").includes("text/html")) return out;

    const ribbon = ribbonHtml(label, RIBBON_COLOR[stage as keyof typeof RIBBON_COLOR]);
    return new HTMLRewriter()
      .on("body", { element: (el) => void el.append(ribbon, { html: true }) })
      .transform(out);
  },
} satisfies ExportedHandler<Env>;
