import assert from "node:assert/strict";
import { test } from "node:test";
import { allGames, count, DRILLS } from "./catalog";

test("26 games: 6 in the app, 20 with Pro", () => {
  const games = allGames();
  assert.equal(games.length, 26);
  assert.equal(count(games, "included"), 6);
  assert.equal(count(games, "pro"), 20);
});

test("3 drills in the app, the rest with Pro", () => {
  assert.equal(count(DRILLS, "included"), 3);
  assert.equal(count(DRILLS, "pro"), 13);
});

test("names are unique within games and within drills", () => {
  for (const list of [allGames(), DRILLS]) {
    const names = list.map((i) => i.name);
    assert.equal(new Set(names).size, names.length);
  }
});
