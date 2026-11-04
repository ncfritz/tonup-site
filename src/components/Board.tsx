/**
 * A dartboard drawn from its real proportions (radii in mm, board 170 mm to
 * the double's outer wire), with optional dart markers. Decorative.
 */
const ORDER = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
const R = { bull: 6.35, outerBull: 15.9, trebleIn: 99, trebleOut: 107, doubleIn: 162, doubleOut: 170, numbers: 186 };

function polar(r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [r * Math.cos(a), r * Math.sin(a)];
}

function wedge(r1: number, r2: number, a1: number, a2: number): string {
  const [x1, y1] = polar(r2, a1);
  const [x2, y2] = polar(r2, a2);
  const [x3, y3] = polar(r1, a2);
  const [x4, y4] = polar(r1, a1);
  const f = (n: number) => n.toFixed(2);
  return `M${f(x1)} ${f(y1)}A${r2} ${r2} 0 0 1 ${f(x2)} ${f(y2)}L${f(x3)} ${f(y3)}A${r1} ${r1} 0 0 0 ${f(x4)} ${f(y4)}Z`;
}

/** Where a dart lands: segment number, ring radius (mm) and an angle offset within the segment. */
export interface Dart {
  segment: number;
  r: number;
  offset?: number;
}

export function Board({
  size = 240,
  darts = [],
  ink = "#111111",
  paper = "#f4f3ef",
  accent = "#c8102e",
  ring = "#5c5b56",
  rim,
  dartRadius = 9,
  className,
}: {
  /** Pixels, or any CSS length (e.g. "0.74em" to size it with the text around it). */
  size?: number | string;
  /** The outer ring behind the numbers. Defaults to `ink`. */
  rim?: string;
  /** Marker size in board millimetres. */
  dartRadius?: number;
  className?: string;
  darts?: Dart[];
  ink?: string;
  paper?: string;
  accent?: string;
  ring?: string;
}) {
  const span = 18;
  return (
    <svg width={size} height={size} viewBox="-200 -200 400 400" aria-hidden="true" className={className}>
      <circle r="200" fill={rim ?? ink} />
      {ORDER.map((n, i) => {
        const a1 = i * span - span / 2;
        const a2 = a1 + span;
        const even = i % 2 === 0;
        const single = even ? ink : paper;
        const scoring = even ? accent : ring;
        const [tx, ty] = polar(R.numbers, i * span);
        return (
          <g key={n}>
            <path d={wedge(R.outerBull, R.trebleIn, a1, a2)} fill={single} />
            <path d={wedge(R.trebleIn, R.trebleOut, a1, a2)} fill={scoring} />
            <path d={wedge(R.trebleOut, R.doubleIn, a1, a2)} fill={single} />
            <path d={wedge(R.doubleIn, R.doubleOut, a1, a2)} fill={scoring} />
            <text x={tx} y={ty} fill={paper} fontSize="20" fontWeight="700" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-mono), monospace">
              {n}
            </text>
          </g>
        );
      })}
      <circle r={R.outerBull} fill={ring} />
      <circle r={R.bull} fill={accent} />
      {darts.map((d, i) => {
        const idx = ORDER.indexOf(d.segment);
        const [x, y] = polar(d.r, idx * span + (d.offset ?? 0));
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={dartRadius} fill="#ffffff" stroke={ink} strokeWidth={dartRadius / 2.6} />
            <circle cx={x} cy={y} r={dartRadius / 3} fill={ink} />
          </g>
        );
      })}
    </svg>
  );
}
