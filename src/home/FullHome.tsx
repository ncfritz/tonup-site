import Link from "next/link";
import { AppStoreButton } from "@/components/AppStoreButton";
import { TierBadge } from "@/components/Badge";
import { OneEighty } from "@/components/OneEighty";
import { PracticeScreen, RulesScreen, ScoreScreen } from "@/components/Phones";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import u from "@/components/ui.module.css";
import { allGames, count, DRILLS, GAME_FAMILIES } from "@/lib/catalog";
import { site } from "@/lib/site";
import h from "./home.module.css";

const STATS = [
  { label: "3-dart avg", value: "62.4" },
  { label: "Checkout %", value: "38%" },
  { label: "Best double", value: "D16" },
  { label: "Tons this week", value: "14", accent: true },
];

const FEATURED_DRILLS = ["Bob's 27", "Doubles Lock", "Catch 40", "100 Darts at T20"];

const FAQ = [
  { q: "Is there a subscription?", a: "No. You buy the app once, and Pro is a single optional upgrade." },
  { q: "Do I need an account?", a: "No. There's no sign-in, no ads and no tracking. Everything stays on your iPhone, and you can export a backup whenever you like." },
  { q: "Steel tip or soft tip?", a: "Either. You tap where each dart landed, so any board works." },
  { q: "Will Pro owners get camera scoring?", a: "Yes. Camera scoring is part of Pro and arrives in a later update." },
  { q: "Can my family share Pro?", a: "Yes. Pro works with Family Sharing." },
];

export default function FullHome() {
  const games = allGames();
  return (
    <>
      <SiteHeader current="home" />
      <main id="main">
        <section className={`${u.wrap} ${h.hero}`}>
          <div className={h.heroScore}>
            <p className={u.kicker}>T20 · T20 · T20 =</p>
            <OneEighty className={h.oneEighty} />
          </div>
          <div className={h.heroText}>
            <h1 className={h.heroTitle}>A darts scorer that takes the game seriously.</h1>
            <p className={u.lede}>Accurate scoring, real practice structure and the rules in your pocket. Built for iPhone.</p>
            <div className={u.actions}>
              <AppStoreButton />
              <a href="#inside" className={u.btnGhost}>
                See it in action
              </a>
            </div>
          </div>
        </section>

        <section className={u.wrap} aria-label="Example stats">
          <dl className={h.stats}>
            {STATS.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd className={s.accent ? h.statAccent : undefined}>{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className={h.statsNote}>Example stats as shown in the app.</p>
        </section>

        <section id="inside" className={`${u.wrap} ${u.section}`}>
          <div className={u.sectionHead}>
            <h2 className={u.h2}>Everything happens between throws.</h2>
            <p>Tap where each dart landed and step back to the line. Ton Up does the arithmetic and keeps every dart.</p>
          </div>
          <div className={h.phones}>
            <figure className={h.figure}>
              <ScoreScreen />
              <figcaption>
                <strong>Score</strong>
                <span>Tap the board, or use the keypad. Checkouts appear the moment you&apos;re on a finish.</span>
              </figcaption>
            </figure>
            <figure className={h.figure}>
              <PracticeScreen />
              <figcaption>
                <strong>Practise</strong>
                <span>Drills with a target, a score and a trend, so practice adds up.</span>
              </figcaption>
            </figure>
            <figure className={h.figure}>
              <RulesScreen />
              <figcaption>
                <strong>Learn</strong>
                <span>Rules for every game, every checkout from 170, and answers to the arguments that always come up.</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className={`${u.wrap} ${u.section} ${h.split}`}>
          <div className={h.splitIntro}>
            <p className={u.kicker}>/games</p>
            <h2 className={u.h2}>{games.length} games, pub classics to party nights.</h2>
            <p className={u.body}>
              Legs and sets, double or master out, pass-and-play or a bot at five levels, and a caller that reads out each visit.
            </p>
            <Link href="/games" className={u.btnGhost}>
              See every game
            </Link>
          </div>
          <ul className={`${u.ruleList} ${h.families}`}>
            {GAME_FAMILIES.map((f) => (
              <li key={f.id}>
                <Link href={`/games#${f.id}`} className={h.family}>
                  <span className={h.familyName}>{f.name}</span>
                  <span className={h.familyGames}>{f.games.map((g) => g.name).join(", ")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${u.wrap} ${u.section}`}>
          <div className={u.sectionHead}>
            <div>
              <p className={u.kicker}>/practice</p>
              <h2 className={u.h2}>Drills that tell you something.</h2>
            </div>
            <p>
              Every drill keeps your personal bests and a trend. With Pro, a monthly assessment builds a daily plan around your weakest area.
            </p>
          </div>
          <div className={u.grid}>
            {FEATURED_DRILLS.map((name) => {
              const d = DRILLS.find((x) => x.name === name)!;
              return (
                <div key={d.name} className={u.card}>
                  <div className={u.cardTop}>
                    <span className={h.focus}>{d.focus}</span>
                    <TierBadge tier={d.tier} />
                  </div>
                  <h3 className={h.drillName}>{d.name}</h3>
                  <p className={u.cardBody}>{d.blurb}</p>
                </div>
              );
            })}
          </div>
          <p className={h.more}>
            <Link href="/games#practice">All {DRILLS.length} practice modes</Link>
          </p>
        </section>

        <section className={`${u.night} ${h.pricing}`}>
          <div className={u.wrap}>
            <div className={u.sectionHead}>
              <h2 className={u.h2}>Pay once. Upgrade if you want more.</h2>
              <p>No subscriptions, no ads. Pro is a one-time in-app purchase.</p>
            </div>
            <div className={h.prices}>
              <div className={h.price}>
                <div className={h.priceTop}>
                  <span>Ton Up</span>
                  <strong>{site.prices.app}</strong>
                </div>
                <p>
                  {count(games, "included")} games, {count(DRILLS, "included")} drills, stats, replays and the heatmap, and the rules for all {games.length} games.
                </p>
              </div>
              <div className={h.pricePro}>
                <div className={h.priceTop}>
                  <span>
                    Pro <small>in-app, one time</small>
                  </span>
                  <strong>{site.prices.pro}</strong>
                </div>
                <p>
                  {count(games, "pro")} more games, the full practice library, deeper analysis, four more themes, and camera scoring when it ships.
                </p>
              </div>
            </div>
            <p className={h.more}>
              <Link href="/pricing">Compare Ton Up and Pro</Link>
            </p>
          </div>
        </section>

        <section className={`${u.wrap} ${u.section} ${h.split}`}>
          <div className={h.splitIntro}>
            <h2 className={u.h2}>Questions</h2>
          </div>
          <dl className={`${u.ruleList} ${h.faq}`}>
            {FAQ.map((f) => (
              <div key={f.q}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={`${u.wrap} ${h.ctaWrap}`}>
          <div className={h.cta}>
            <div>
              <p className={h.ctaKicker}>GAME ON</p>
              <h2 className={h.ctaTitle}>Step up to the oche.</h2>
            </div>
            <AppStoreButton variant="dark" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
