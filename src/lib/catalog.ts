/*
 * The games and practice modes in the app, and which ones need Ton Up Pro
 * (app repo ADR 0009). Descriptions follow the app's rules library and
 * practice strings; keep this in step when the app adds or moves something.
 */
export type Tier = "included" | "pro";

export interface Item {
  name: string;
  tier: Tier;
  blurb: string;
}

export interface GameFamily {
  id: string;
  name: string;
  tagline: string;
  games: Item[];
}

export const GAME_FAMILIES: GameFamily[] = [
  {
    id: "x01",
    name: "X01",
    tagline: "Count down to exactly zero.",
    games: [
      { name: "301 · 501 · 701", tier: "included", blurb: "Double, master or straight out, with legs and sets and a checkout for every finish." },
      { name: "201 Double In, Double Out", tier: "pro", blurb: "A short, sharp X01: you need a double to start and a double to finish." },
      { name: "Gotcha", tier: "pro", blurb: "Race to an exact total. Land on an opponent's score and they go back to zero." },
      { name: "Fifty-One by Fives", tier: "pro", blurb: "Only visits that divide by five count, at a fifth of their value. First to 51 wins." },
    ],
  },
  {
    id: "cricket",
    name: "Cricket",
    tagline: "Close your numbers, score on theirs.",
    games: [
      { name: "Standard Cricket", tier: "included", blurb: "15–20 and the bull. Close all seven with the lead to win." },
      { name: "Cut-Throat", tier: "included", blurb: "Your extra marks add points to everyone else. Lowest score wins. Best with three or more." },
      { name: "No-Score Cricket", tier: "pro", blurb: "A pure race to close all seven. Good for beginners." },
      { name: "Tactics", tier: "pro", blurb: "Cricket on 10–20 and the bull. Longer, and rewards trebles." },
      { name: "Random Cricket", tier: "pro", blurb: "Six numbers drawn fresh every game, plus the bull." },
      { name: "Mickey Mouse", tier: "pro", blurb: "20 down to 12, then any double, any treble and the bull." },
      { name: "Killer Cricket", tier: "pro", blurb: "Close your own number, then take lives by hitting everyone else's." },
    ],
  },
  {
    id: "sequence",
    name: "Target sequence",
    tagline: "Everyone works through the same list of targets.",
    games: [
      { name: "Around the Clock", tier: "included", blurb: "1 through 20, then the bull. Doubles-only, trebles-only and reverse options." },
      { name: "Shanghai", tier: "included", blurb: "Each round has its number. Single, double and treble in one visit wins on the spot." },
      { name: "Nine Lives", tier: "pro", blurb: "Around the Clock where a blank visit costs a life. Last one standing wins." },
      { name: "Hare and Hounds", tier: "pro", blurb: "A chase round the board: the hound starts five behind and has to catch up. Two players." },
      { name: "Halve-It", tier: "pro", blurb: "One visit per target. Miss it with all three darts and your total is halved." },
      { name: "Bermuda Triangle", tier: "pro", blurb: "Halve-It's longer cousin: 12 to 20, with any double, any treble and the bull mixed in." },
      { name: "Count Up", tier: "pro", blurb: "Score as much as you can over a set number of rounds. Highest total wins." },
    ],
  },
  {
    id: "elimination",
    name: "Elimination",
    tagline: "Knock each other out.",
    games: [
      { name: "Killer", tier: "included", blurb: "Earn killer status on your own number, then go after everyone else's lives." },
      { name: "Blind Killer", tier: "pro", blurb: "Killer with secret numbers, so nobody knows who they're hitting." },
      { name: "Scam", tier: "pro", blurb: "One player closes numbers while the other scores on what's left, then you swap. Two players." },
    ],
  },
  {
    id: "sports",
    name: "Sports",
    tagline: "Other games, played on a dartboard.",
    games: [
      { name: "Baseball", tier: "pro", blurb: "Nine innings, each on its own number. Ties go to extra innings on the bull." },
      { name: "Bullseye Baseball", tier: "pro", blurb: "Baseball, but you need a bull in each inning before your runs count." },
      { name: "Golf", tier: "pro", blurb: "Each number is a hole: treble one stroke, double two, single three. Lowest card wins." },
      { name: "Football", tier: "pro", blurb: "Hit the bull to win the ball, then score goals on the doubles before you lose it." },
      { name: "Tic-Tac-Toe", tier: "pro", blurb: "Claim squares on a 3×3 grid of numbers. Three in a row wins. Two players." },
    ],
  },
];

export interface Drill extends Item {
  focus: "Scoring" | "Accuracy" | "Doubles" | "Checkouts" | "All-round";
}

export const DRILLS: Drill[] = [
  { name: "Bob's 27", tier: "included", focus: "Doubles", blurb: "Start on 27. Gain each double you hit, lose it when you miss." },
  { name: "Count Up", tier: "included", focus: "Scoring", blurb: "Score as high as you can over a fixed set of visits." },
  { name: "Around the Clock", tier: "included", focus: "Accuracy", blurb: "1 to 20 and the bull in as few darts as you can." },
  { name: "100 Darts at T20", tier: "pro", focus: "Scoring", blurb: "Your hit rate on the treble 20." },
  { name: "Halve-It Sprint", tier: "pro", focus: "Scoring", blurb: "A visit at each target; a blank halves your score." },
  { name: "Shanghai", tier: "pro", focus: "Accuracy", blurb: "A visit at each number from 1 to 20." },
  { name: "Bullseye", tier: "pro", focus: "Accuracy", blurb: "30 darts at the bull." },
  { name: "Doubles Lock", tier: "pro", focus: "Doubles", blurb: "D20 to D1. A blank visit sends you back to the last lock." },
  { name: "Checkouts Practice", tier: "pro", focus: "Doubles", blurb: "Three darts at each even double, D20 to D2." },
  { name: "Catch 40", tier: "pro", focus: "Checkouts", blurb: "Finish 61 to 100 with six darts each." },
  { name: "121", tier: "pro", focus: "Checkouts", blurb: "Nine darts to finish; each finish moves the target up." },
  { name: "Hubbe", tier: "pro", focus: "Checkouts", blurb: "Finish 101 to 130 in one visit each." },
  { name: "Random Checkout", tier: "pro", focus: "Checkouts", blurb: "Twenty random finishes, one visit each." },
  { name: "170 Practice", tier: "pro", focus: "Checkouts", blurb: "T20, T20, bull, in as few darts as you can." },
  { name: "Pressure", tier: "pro", focus: "Checkouts", blurb: "The bot is on a finish. You have one visit to take the leg." },
  { name: "JDC Challenge", tier: "pro", focus: "All-round", blurb: "Shanghai 10–15, every double, then Shanghai 15–20." },
];

export const TRAINING_TOOLS: Item[] = [
  { name: "Skill assessment", tier: "pro", blurb: "Fifteen minutes that set your level, 1 to 5, for scoring, doubles and checkouts." },
  { name: "Today's plan", tier: "pro", blurb: "A warm-up and two drills a day from your weakest area." },
  { name: "Checkout trainer", tier: "pro", blurb: "Learn the route for every finish, then throw it on the board." },
];

export const allGames = () => GAME_FAMILIES.flatMap((f) => f.games);
export const count = (items: Item[], tier: Tier) => items.filter((i) => i.tier === tier).length;
