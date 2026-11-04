import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/AppStoreButton";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import u from "@/components/ui.module.css";
import { allGames, count, DRILLS } from "@/lib/catalog";
import { site } from "@/lib/site";
import s from "./pricing.module.css";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Ton Up is ${site.prices.app} on the App Store. Ton Up Pro is a one-time ${site.prices.pro} upgrade. No subscription, no ads.`,
  alternates: { canonical: "/pricing" },
};

type Cell = "yes" | "no" | string;
type Row = { feature: string; app: Cell; pro: Cell };

export default function PricingPage() {
  const games = allGames();
  const groups: { name: string; rows: Row[] }[] = [
    {
      name: "Play",
      rows: [
        { feature: "Score by tapping the board, or use the keypad", app: "yes", pro: "yes" },
        { feature: "Pass-and-play, and bots at five levels", app: "yes", pro: "yes" },
        { feature: "A caller reads out each visit", app: "yes", pro: "yes" },
        { feature: "X01, Standard and Cut-Throat Cricket, Around the Clock, Shanghai, Killer", app: "yes", pro: "yes" },
        { feature: `${count(games, "pro")} more games: cricket variants, X01 extras, sequence, elimination and sports`, app: "Rules only", pro: "yes" },
      ],
    },
    {
      name: "Practice",
      rows: [
        { feature: "Bob's 27, Count Up and the Around the Clock drill", app: "yes", pro: "yes" },
        { feature: "Personal bests and trends", app: "yes", pro: "yes" },
        { feature: `${count(DRILLS, "pro")} more drills, from 100 Darts at T20 to the JDC Challenge`, app: "no", pro: "yes" },
        { feature: "Monthly skill assessment and a daily plan", app: "no", pro: "yes" },
        { feature: "Checkout trainer and pressure mode", app: "no", pro: "yes" },
      ],
    },
    {
      name: "Stats & analysis",
      rows: [
        { feature: "Averages, match history and replays", app: "yes", pro: "yes" },
        { feature: "A heatmap of every dart", app: "yes", pro: "yes" },
        { feature: "Grouping, drift, and where to aim for your grouping", app: "no", pro: "yes" },
        { feature: "Weekly trends", app: "no", pro: "yes" },
        { feature: "A ghost bot that throws like you", app: "no", pro: "yes" },
      ],
    },
    {
      name: "Learn",
      rows: [
        { feature: `Rules for all ${games.length} games`, app: "yes", pro: "yes" },
        { feature: "Every checkout from 170, board setup and a glossary", app: "yes", pro: "yes" },
      ],
    },
    {
      name: "Look & feel",
      rows: [
        { feature: "The Pro theme, light and dark", app: "yes", pro: "yes" },
        { feature: "Chalkboard, Arcade, Heritage and Training themes", app: "Preview", pro: "yes" },
      ],
    },
    {
      name: "Coming later",
      rows: [{ feature: "Camera scoring", app: "no", pro: "Free update" }],
    },
    {
      name: "Your data",
      rows: [
        { feature: "No account, no ads, no tracking; works offline", app: "yes", pro: "yes" },
        { feature: "Export a backup any time", app: "yes", pro: "yes" },
      ],
    },
  ];

  const cell = (c: Cell) =>
    c === "yes" ? (
      <span className={s.yes}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
        <span className={u.visuallyHidden}>Included</span>
      </span>
    ) : c === "no" ? (
      <span className={s.no}>
        <span aria-hidden="true">—</span>
        <span className={u.visuallyHidden}>Not included</span>
      </span>
    ) : (
      <span className={s.partial}>{c}</span>
    );

  return (
    <>
      <SiteHeader current="pricing" />
      <main id="main">
        <section className={`${u.wrap} ${u.pageHead}`}>
          <p className={u.kicker}>/pricing</p>
          <h1 className={u.h1}>Buy it once. Go Pro once.</h1>
          <p className={u.lede}>
            Ton Up is a one-time download with everything you need to score a night of darts. Pro is a single in-app purchase that opens up the full
            library. No subscription, no ads, no account.
          </p>
        </section>

        <section className={`${u.wrap} ${s.plans}`}>
          <div className={s.plan}>
            <div>
              <h2 className={s.planName}>Ton Up</h2>
              <p className={s.planSub}>The app</p>
            </div>
            <p className={s.planPrice}>{site.prices.app}</p>
            <p className={u.body}>
              X01, Cricket, Around the Clock, Shanghai and Killer. Bots, the caller, three core drills, stats, replays and the heatmap. Rules for all{" "}
              {games.length} games.
            </p>
            <div className={s.planAction}>
              <AppStoreButton />
            </div>
          </div>
          <div className={s.planPro}>
            <div>
              <h2 className={s.planName}>Ton Up Pro</h2>
              <p className={s.planSub}>One-time in-app upgrade</p>
            </div>
            <p className={s.planPrice}>+{site.prices.pro}</p>
            <p className={s.planProBody}>
              Every other game, the full practice library with an assessment and a daily plan, deeper analysis, a ghost bot, four more themes, and
              camera scoring when it ships.
            </p>
            <p className={s.planNote}>Shared with your Family Sharing group.</p>
          </div>
        </section>

        <section className={`${u.wrap} ${s.compare}`} aria-labelledby="compare">
          <h2 id="compare" className={u.h2}>
            Compare
          </h2>
          <div className={s.tableBox}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Ton Up</th>
                  <th scope="col" className={s.proHead}>
                    Pro
                  </th>
                </tr>
              </thead>
              {groups.map((g) => (
                <tbody key={g.name}>
                  <tr>
                    <th colSpan={3} scope="colgroup" className={s.group}>
                      {g.name}
                    </th>
                  </tr>
                  {g.rows.map((r) => (
                    <tr key={r.feature}>
                      <th scope="row">{r.feature}</th>
                      <td>{cell(r.app)}</td>
                      <td>{cell(r.pro)}</td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
          <p className={s.seeAll}>
            <Link href="/games">See which games and drills are in each</Link>
          </p>
        </section>

        <section className={`${u.wrap} ${s.notes}`}>
          <div>
            <h3>Look before you upgrade</h3>
            <p className={u.body}>Pro games, drills and themes stay visible with a lock, and you can read the rules for every game.</p>
          </div>
          <div>
            <h3>Restore any time</h3>
            <p className={u.body}>Buy Pro in Settings › Ton Up Pro. Restore Purchases is on the same screen.</p>
          </div>
          <div>
            <h3>One family, one purchase</h3>
            <p className={u.body}>Pro works with Family Sharing, so everyone in your group gets it.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
