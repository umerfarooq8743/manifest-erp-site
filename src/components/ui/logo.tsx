import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * The Manifest mark — a cargo manifest (document with a folded corner)
 * carrying an "M" whose peaks read as stacked containers. Same artwork as
 * the product's own logo.
 */
export function LogoMark({ className }: { className?: string }) {
  const id = useId().replace(/[:«»]/g, "");
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8 shrink-0", className)} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#059669" />
          <stop offset="1" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id={`${id}-gl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M8 1h13.5L31 10.5V24a7 7 0 0 1-7 7H8a7 7 0 0 1-7-7V8a7 7 0 0 1 7-7z" fill={`url(#${id}-bg)`} />
      <path d="M8 1h13.5L31 10.5V24a7 7 0 0 1-7 7H8a7 7 0 0 1-7-7V8a7 7 0 0 1 7-7z" fill={`url(#${id}-gl)`} />
      <path d="M21.5 1v5.5a4 4 0 0 0 4 4H31z" fill="#fff" fillOpacity=".38" />
      <path
        d="M8.5 23.5V11.2c0-.5.6-.8 1-.4L16 17l6.5-6.2c.4-.4 1-.1 1 .4v12.3"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.5 26.5h7" stroke="#fff" strokeOpacity=".7" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("size-8", markClassName)} />
      <span className="flex items-center gap-1.5 text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">
        Manifest{" "}
        <span className="rounded-md bg-brand-soft px-1.5 py-px font-mono text-[0.625rem] font-semibold tracking-[0.12em] text-brand">ERP</span>
      </span>
    </span>
  );
}
