// Run: pnpm test:worker
import assert from "node:assert/strict";
import { test } from "node:test";
import { ribbonHtml, stageFor } from "./env";
import { previewName, sanitize } from "../scripts/preview-name";

test("production deployment has no label", () => {
  assert.deepEqual(stageFor("production", "tonup.app"), { stage: "production", label: null });
  assert.deepEqual(stageFor(undefined, "tonup.app"), { stage: "production", label: null });
});

test("previews get their stage from the hostname", () => {
  assert.deepEqual(stageFor("preview", "staging.preview.tonup.app"), { stage: "staging", label: "Staging" });
  assert.deepEqual(stageFor("preview", "dev.preview.tonup.app"), { stage: "development", label: "Development" });
  assert.deepEqual(stageFor("preview", "feature-new-hero.preview.tonup.app"), {
    stage: "preview",
    label: "Preview · feature-new-hero",
  });
  // an exact-deployment URL of staging is just a preview of that deployment
  assert.equal(stageFor("preview", "a1b2c3d4-staging.preview.tonup.app").stage, "preview");
  assert.deepEqual(stageFor("preview", "elsewhere.example"), { stage: "preview", label: "Preview" });
});

test("ribbon escapes its label", () => {
  assert.ok(ribbonHtml(`<x>"&'`, "#000").includes("&#60;x&#62;&#34;&#38;&#39;"));
});

test("branches map to Preview names", () => {
  assert.equal(previewName("main"), null);
  assert.equal(previewName("staging"), "staging");
  assert.equal(previewName("develop"), "dev");
  assert.equal(previewName("feature/new-hero"), "feature-new-hero");
  assert.equal(previewName("fix/Split_Rounding"), "fix-split-rounding");
  assert.equal(sanitize("feature//weird--name/"), "feature-weird-name");
  assert.equal(sanitize("x".repeat(80)).length, 40);
  assert.throws(() => sanitize("///"));
  assert.throws(() => previewName("dev"), /reserved/);
  assert.throws(() => previewName("Staging"), /reserved/);
});
