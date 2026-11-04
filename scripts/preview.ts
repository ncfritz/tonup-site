// Deploys the current branch as a Worker Preview of tonup-site:
//   staging -> https://staging.preview.tonup.app
//   develop -> https://dev.preview.tonup.app
//   other   -> https://<branch>.preview.tonup.app
// Used as the Workers Builds "Preview command" (pnpm preview:branch) and
// works locally too (needs `wrangler login`).
import { execFileSync, spawnSync } from "node:child_process";
import { previewName } from "./preview-name";

const branch =
  process.env.WORKERS_CI_BRANCH ||
  execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], { encoding: "utf8" }).trim();

const name = previewName(branch);
if (name === null) {
  console.log(`"${branch}" is production; it deploys with \`wrangler deploy\`, not as a Preview.`);
  process.exit(0);
}

console.log(`Branch "${branch}" -> https://${name}.preview.tonup.app`);

const sha = process.env.WORKERS_CI_COMMIT_SHA?.slice(0, 7);
const args = ["exec", "wrangler", "preview", "--name", name];
if (sha) args.push("--tag", sha);

const result = spawnSync("pnpm", args, { stdio: "inherit" });
process.exit(result.status ?? 1);
