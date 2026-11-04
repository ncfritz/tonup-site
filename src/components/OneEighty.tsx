import { Board } from "./Board";
import o from "./oneEighty.module.css";

/** Three darts in the treble 20. */
const T20 = [
  { segment: 20, r: 102, offset: -6 },
  { segment: 20, r: 105, offset: 0 },
  { segment: 20, r: 101.5, offset: 6 },
];

/**
 * The hero's "180", with the 0 drawn as a dartboard holding three darts in
 * the treble 20. Decorative: the kicker above it ("T20 · T20 · T20 =") and
 * the headline carry the meaning, so screen readers skip it.
 */
export function OneEighty({ className }: { className?: string }) {
  return (
    <p className={`${o.score} ${className ?? ""}`} aria-hidden="true">
      18
      <Board size="0.74em" darts={T20} dartRadius={6.5} rim="var(--frame)" className={o.board} />
    </p>
  );
}
