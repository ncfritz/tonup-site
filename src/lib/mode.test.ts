import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveSiteMode } from "./mode";

test("production builds show coming soon until launch", () => {
  assert.equal(resolveSiteMode({ WORKERS_CI_BRANCH: "main" }, false), "coming-soon");
  assert.equal(resolveSiteMode({ DEPLOY_TARGET: "production" }, false), "coming-soon");
  assert.equal(resolveSiteMode({ WORKERS_CI_BRANCH: "main" }, true), "full");
});

test("everything else is the full site", () => {
  assert.equal(resolveSiteMode({}, false), "full");
  assert.equal(resolveSiteMode({ WORKERS_CI_BRANCH: "staging" }, false), "full");
  assert.equal(resolveSiteMode({ WORKERS_CI_BRANCH: "develop" }, false), "full");
  assert.equal(resolveSiteMode({ WORKERS_CI_BRANCH: "feature/x" }, false), "full");
});

test("SITE_MODE overrides", () => {
  assert.equal(resolveSiteMode({ SITE_MODE: "coming-soon" }, true), "coming-soon");
  assert.equal(resolveSiteMode({ SITE_MODE: "full", WORKERS_CI_BRANCH: "main" }, false), "full");
});
