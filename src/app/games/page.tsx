import type { Metadata } from "next";
import Link from "next/link";
import { TierBadge } from "@/components/Badge";
import { Lock } from "@/components/Logo";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import u from "@/components/ui.module.css";
import { allGames, count, DRILLS, GAME_FAMILIES, TRAINING_TOOLS } from "@/lib/catalog";
import { site } from "@/lib/site";
import s from "./games.module.css";

export const metadata: Metadata = {
  title: "Games and practice",
  description: "Every game and practice mode in Ton Up: X01, Cricket and its variants, Killer, Shanghai, Baseball, Golf and more, plus a practice library with an assessment and a daily plan.",
  alternates: { canonical: "/games" },
};

export default function GamesPage() {
  const games = allGames();
  const includedDrills = DRILLS.filter((d) => d.tier === "included");
  const proDrills = DRILLS.filter((d) => d.tier === "pro");

  return (
    <>
      <SiteHeader current="games" />
      <main id="main">
        <section className={`${u.wrap} ${s.head}`}>
          <div className={s.headText}>
            <p className={u.kicker}>/games</p>
            <h1 className={u.h1}>Every game. Every drill.</h1>
            <p className={u.lede}>
              {games.length} games, from pub classics and league formats to party games, plus a practice library built around the parts of your game that
              cost you legs.
            </p>
          </div>
          <div className={s.legend}>
            <span>
              <TierBadge tier="included" /> In the {site.prices.app} app
            </span>
            <span>
              <TierBadge tier="pro" /> With Ton Up Pro
            </span>
          </div>
        </section>

        <nav aria-label="Sections" className={`${u.wrap} ${s.jump}`}>
          {GAME_FAMILIES.map((f) => (
            <a key={f.id} href={`#${f.id}`}>
              {f.name}
            </a>
          ))}
          <a href="#practice">Practice</a>
        </nav>

        <div className={`${u.wrap} ${s.families}`}>
          {GAME_FAMILIES.map((f) => (
            <section key={f.id} id={f.id} className={s.family} aria-labelledby={`${f.id}-title`}>
              <div className={s.familyHead}>
                <h2 id={`${f.id}-title`}>{f.name}</h2>
                <p>{f.tagline}</p>
              </div>
              <ul className={`${u.grid} ${s.list}`}>
                {f.games.map((g) => (
                  <li key={g.name} className={u.card}>
                    <div className={u.cardTop}>
                      <h3>{g.name}</h3>
                      <TierBadge tier={g.tier} />
                    </div>
                    <p className={u.cardBody}>{g.blurb}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section id="practice" className={`${u.night} ${s.practice}`} aria-labelledby="practice-title">
          <div className={`${u.wrap} ${s.practiceInner}`}>
            <div className={u.sectionHead}>
              <div>
                <p className={s.nightKicker}>/practice</p>
                <h2 id="practice-title" className={u.h2}>
                  Practice modes
                </h2>
              </div>
              <p>Every drill keeps personal bests and a trend. Pro adds the full library and a coach that picks what to work on.</p>
            </div>

            <div className={s.group}>
              <h3 className={s.groupTitle}>Included</h3>
              <ul className={`${u.grid} ${s.list}`}>
                {includedDrills.map((d) => (
                  <li key={d.name} className={s.drillOpen}>
                    <p className={s.focus}>{d.focus}</p>
                    <h4>{d.name}</h4>
                    <p className={s.drillBody}>{d.blurb}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.group}>
              <h3 className={s.groupTitle}>
                <Lock size={12} /> Pro drill library <span className={s.groupCount}>{proDrills.length}</span>
              </h3>
              <ul className={`${u.grid} ${s.list}`}>
                {proDrills.map((d) => (
                  <li key={d.name} className={s.drillPro}>
                    <p className={s.focus}>{d.focus}</p>
                    <h4>{d.name}</h4>
                    <p className={s.drillBody}>{d.blurb}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.group}>
              <h3 className={s.groupTitle}>
                <Lock size={12} /> Pro training tools
              </h3>
              <ul className={`${s.tools} ${s.list}`}>
                {TRAINING_TOOLS.map((t) => (
                  <li key={t.name} className={s.tool}>
                    <h4>{t.name}</h4>
                    <p className={s.drillBody}>{t.blurb}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.footRow}>
              <p>
                Everything marked Pro, {count(games, "pro")} games and {count(DRILLS, "pro")} drills, unlocks with one {site.prices.pro} purchase.
              </p>
              <Link href="/pricing" className={u.btn}>
                Compare Ton Up and Pro
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
