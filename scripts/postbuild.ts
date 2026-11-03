// Runs after `next build`. Before launch, a production build ships only the
// coming-soon page: drop every other page from out/ so it 404s.
import { readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { siteMode } from "../src/lib/mode";

const OUT = join(process.cwd(), "out");
// Pages that exist in the full site but must not be public before launch,
// plus the /coming-soon preview route (production's home page already is it).
const FULL_SITE_ONLY = ["pricing", "games", "privacy", "coming-soon"];

if (siteMode === "coming-soon") {
  for (const entry of readdirSync(OUT)) {
    if (FULL_SITE_ONLY.some((page) => entry === page || entry.startsWith(`${page}.`))) {
      rmSync(join(OUT, entry), { recursive: true, force: true });
      console.log(`coming-soon build: removed out/${entry}`);
    }
  }
}

console.log(`Site mode: ${siteMode}`);
