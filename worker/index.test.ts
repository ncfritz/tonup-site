import assert from "node:assert/strict";
import { test } from "node:test";
import worker from "./index";

type Env = Parameters<typeof worker.fetch>[1];
const assets = { fetch: async () => new Response("ok", { headers: { "Content-Type": "text/plain" } }) };

test("production redirects www to the apex", async () => {
  const res = await worker.fetch(new Request("https://www.tonup.app/pricing?x=1"), { SITE_ENV: "production", ASSETS: assets } as unknown as Env);
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("Location"), "https://tonup.app/pricing?x=1");
});

test("production pages get the security headers and stay indexable", async () => {
  const res = await worker.fetch(new Request("https://tonup.app/"), { SITE_ENV: "production", ASSETS: assets } as unknown as Env);
  assert.match(res.headers.get("Content-Security-Policy") ?? "", /default-src 'self'/);
  assert.match(res.headers.get("Content-Security-Policy") ?? "", /frame-ancestors 'none'/);
  assert.equal(res.headers.get("X-Robots-Tag"), null);
});

test("previews block crawlers", async () => {
  const env = { SITE_ENV: "preview", ASSETS: assets } as unknown as Env;
  const robots = await worker.fetch(new Request("https://dev.preview.tonup.app/robots.txt"), env);
  assert.equal(await robots.text(), "User-agent: *\nDisallow: /\n");
  const page = await worker.fetch(new Request("https://dev.preview.tonup.app/"), env);
  assert.equal(page.headers.get("X-Robots-Tag"), "noindex, nofollow");
});
