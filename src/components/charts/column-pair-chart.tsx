interface Datum {
  label: string;
  a: number;
  b: number;
}

/** Path for a column with a 4-unit rounded top and a square baseline. */
function columnPath(x: number, y: number, w: number, h: number, r = 3) {
  if (h <= 0) return "";
  const rr = Math.min(r, w / 2, h);
  return `M${x},${y + h}V${y + rr}Q${x},${y} ${x + rr},${y}H${x + w - rr}Q${x + w},${y} ${x + w},${y + rr}V${y + h}Z`;
}

/**
 * Grouped columns for two series (e.g. invoiced vs collected) on one axis.
 * Colours come from validated chart tokens (--c1, --c2). Each column carries
 * a native tooltip; the legend sits above the plot. Columns grow in with a
 * CSS animation, so the chart needs no client JavaScript.
 */
export function ColumnPairChart({
  data,
  seriesA,
  seriesB,
  unit = "M",
  max,
  ticks = [0, 1, 2, 3, 4, 5],
  height = 168,
}: {
  data: Datum[];
  seriesA: string;
  seriesB: string;
  unit?: string;
  max?: number;
  ticks?: number[];
  height?: number;
}) {
  const width = 520;
  const pad = { top: 8, right: 4, bottom: 22, left: 30 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const top = max ?? ticks[ticks.length - 1];
  const band = plotW / data.length;
  const barW = Math.min(18, band * 0.28);
  const gap = 2;
  const y = (v: number) => pad.top + plotH - (v / top) * plotH;

  return (
    <div>
      <div className="mb-2 flex items-center gap-4 text-2xs text-m-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-c1" /> {seriesA}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-c2" /> {seriesB}
        </span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="block h-auto w-full" role="img" aria-label={`${seriesA} and ${seriesB} by month`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.left} x2={width - pad.right} y1={y(t)} y2={y(t)} stroke="var(--m-border)" strokeWidth={1} />
            <text x={pad.left - 6} y={y(t) + 3} textAnchor="end" fontSize={9} fill="var(--m-subtle)" fontFamily="var(--font-mono)">
              {t}
              {t ? unit : ""}
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const cx = pad.left + band * i + band / 2;
          const xa = cx - barW - gap / 2;
          const xb = cx + gap / 2;
          const ha = (d.a / top) * plotH;
          const hb = (d.b / top) * plotH;
          return (
            <g key={d.label}>
              <path d={columnPath(xa, y(d.a), barW, ha)} fill="var(--c1)" className="grow-y" style={{ animationDelay: `${0.05 * i}s` }}>
                <title>{`${d.label} · ${seriesA}: ${d.a.toFixed(2)}${unit}`}</title>
              </path>
              <path d={columnPath(xb, y(d.b), barW, hb)} fill="var(--c2)" className="grow-y" style={{ animationDelay: `${0.05 * i + 0.04}s` }}>
                <title>{`${d.label} · ${seriesB}: ${d.b.toFixed(2)}${unit}`}</title>
              </path>
              <text x={cx} y={height - 6} textAnchor="middle" fontSize={9.5} fill="var(--m-muted)">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
