import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

// The dark tokens appear twice in globals.css: once for data-theme="dark" and
// once for "system" on a dark device. They must stay identical.
test("both dark token blocks match", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  const forced = css.match(/:root\[data-theme="dark"\] \{([^}]*)\}/)?.[1];
  const system = css.match(/:root:not\(\[data-theme="light"\]\) \{([^}]*)\}/)?.[1];
  assert.ok(forced && system, "both blocks are present");
  const norm = (s: string) => s.replace(/\s+/g, " ").trim();
  assert.equal(norm(system), norm(forced));
});
