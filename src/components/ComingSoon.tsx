import { Mark } from "./Logo";
import { OneEighty } from "./OneEighty";
import { ThemeSwitch } from "./ThemeSwitch";
import u from "./ui.module.css";
import c from "./comingSoon.module.css";

/** The only page production shows before launch (see src/lib/mode.ts). */
export function ComingSoon() {
  return (
    <main id="main" className={`${u.wrap} ${c.page}`}>
      <div className={c.top}>
        <p className={c.brand}>
          <Mark size={32} />
          Ton Up
        </p>
        <ThemeSwitch />
      </div>
      <div className={c.body}>
        <p className={u.kicker}>T20 · T20 · T20 =</p>
        <OneEighty className={c.score} />
        <h1 className={c.title}>A darts scorer, trainer and rule book for iPhone.</h1>
        <p className={u.lede}>Score 26 games, practise with drills that track your progress, and settle rules arguments before they start.</p>
        <p className={c.soon}>Coming soon to the App Store</p>
      </div>
      <p className={c.foot}>tonup.app</p>
    </main>
  );
}
