import { Board } from "./Board";
import p from "./phones.module.css";

/*
 * Illustrations of three app screens. They're drawings of the app, not
 * screenshots: swap in real screenshots once the app's UI is final.
 */

function Phone({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={p.phone} role="img" aria-label={label}>
      <div className={p.screen}>{children}</div>
    </div>
  );
}

export function ScoreScreen() {
  return (
    <Phone label="Ton Up scoring a game of 501: Player 1 on 141 with a checkout of T20, T15, D18, and two darts in the treble 20.">
      <p className={p.meta}>501 · LEG 2 / 5</p>
      <div className={p.players}>
        <div className={p.playerOn}>
          <span>Player 1</span>
          <strong>141</strong>
        </div>
        <div className={p.player}>
          <span>Player 2</span>
          <strong>260</strong>
        </div>
      </div>
      <div className={p.checkout}>
        <span>Checkout</span>
        <strong>T20 · T15 · D18</strong>
      </div>
      <div className={p.board}>
        <Board
          size={216}
          darts={[
            { segment: 20, r: 103, offset: -3 },
            { segment: 20, r: 104, offset: 4 },
          ]}
        />
      </div>
      <div className={p.visit}>
        <span>T20</span>
        <span>T20</span>
        <span className={p.slotEmpty}>—</span>
      </div>
    </Phone>
  );
}

const DOUBLES = ["D20", "D19", "D18", "D17", "D16", "D15", "D14", "D13", "D12", "D11"];
const TREND = [38, 45, 42, 58, 66];

export function PracticeScreen() {
  return (
    <Phone label="The Doubles Lock drill in Ton Up: D20 to D14 done, D13 next, and a hit rate rising over the last five sessions.">
      <p className={p.meta}>PRACTICE · DOUBLES</p>
      <p className={p.title}>Doubles Lock</p>
      <div className={p.doubles}>
        {DOUBLES.map((d, i) => (
          <span key={d} className={i < 7 ? p.hit : i === 7 ? p.next : p.todo}>
            {d}
          </span>
        ))}
      </div>
      <div className={p.panel}>
        <span className={p.small}>Hit rate, last 5 sessions</span>
        <div className={p.bars}>
          {TREND.map((h, i) => (
            <span key={i} className={i === TREND.length - 1 ? p.barNow : p.bar} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className={p.footRow}>
        <span className={p.small}>Darts thrown</span>
        <strong>23</strong>
      </div>
    </Phone>
  );
}

export function RulesScreen() {
  return (
    <Phone label="The Cricket page in Ton Up's rules library, with a common-dispute note about darts that bounce out.">
      <p className={p.meta}>RULES · CRICKET</p>
      <p className={p.title}>How to play</p>
      <div className={p.rules}>
        <p>
          <b>Numbers</b> 15–20 and the bull.
        </p>
        <p>
          <b>Close</b> a number with three marks: single 1, double 2, treble 3.
        </p>
        <p>
          <b>Score</b> on numbers you&apos;ve closed and your opponent hasn&apos;t.
        </p>
        <p>
          <b>Win</b> by closing everything with the lead or tied on points.
        </p>
      </div>
      <div className={p.dispute}>
        <span>Common dispute</span>
        <p>Does a dart that bounces out count? No: only darts in the board score.</p>
      </div>
    </Phone>
  );
}
