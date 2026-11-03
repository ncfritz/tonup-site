import path from "node:path";
import type { NextConfig } from "next";
import { siteMode } from "./src/lib/mode";

// Full site or coming-soon page for "/" (see src/lib/mode.ts). Swapping the
// module, rather than branching inside one page, keeps the unreleased site
// out of a production build entirely.
const home = siteMode === "coming-soon" ? "./src/home/ComingSoonHome.tsx" : "./src/home/FullHome.tsx";

// The site is fully static: `next build` writes plain HTML/CSS/JS to `out/`,
// which Cloudflare serves as Worker static assets (see wrangler.jsonc).
// If we ever need server features (forms, dynamic routes), switch to the
// OpenNext Cloudflare adapter instead of `output: "export"`.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  turbopack: {
    resolveAlias: { "@site-home": home },
  },
  // Same alias if anyone builds with --webpack.
  webpack: (config) => {
    config.resolve.alias["@site-home"] = path.resolve(home);
    return config;
  },
};

export default nextConfig;
