import { cn } from "@/lib/utils";

/**
 * A single horizontal bar that grows in with a CSS animation (no JavaScript).
 * `value` is a percentage of the track.
 */
export function BarMeter({
  value,
  color = "var(--c1)",
  className,
  delay = 0,
  label,
}: {
  value: number;
  color?: string;
  className?: string;
  delay?: number;
  label?: string;
}) {
  return (
    <span className={cn("block h-2 overflow-hidden rounded-full bg-m-secondary", className)} title={label}>
      <span
        className="grow-x block h-full rounded-full"
        style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color, animationDelay: `${delay}s` }}
      />
    </span>
  );
}

/** Paired thin bars (e.g. billed vs expenses) on a shared scale with a 2-unit gap. */
export function PairedBars({
  a,
  b,
  max,
  labelA,
  labelB,
  delay = 0,
}: {
  a: number;
  b: number;
  max: number;
  labelA: string;
  labelB: string;
  delay?: number;
}) {
  return (
    <span className="flex flex-col gap-0.5">
      <BarMeter value={(a / max) * 100} color="var(--c1)" className="h-1.5 bg-transparent" delay={delay} label={labelA} />
      <BarMeter value={(b / max) * 100} color="var(--c3)" className="h-1.5 bg-transparent" delay={delay + 0.05} label={labelB} />
    </span>
  );
}
