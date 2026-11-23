import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./icon";

export function Badge({
  children,
  tone = "neutral",
  className,
  icon,
}: {
  children: ReactNode;
  tone?: "neutral" | "brand" | "warn" | "outline";
  className?: string;
  icon?: IconName;
}) {
  const tones = {
    neutral: "bg-surface-2 text-ink-2 border-line",
    brand: "bg-brand-soft text-brand border-brand/20",
    warn: "bg-warn-soft text-warn border-warn/20",
    outline: "bg-transparent text-ink-2 border-line-strong",
  } as const;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", tones[tone], className)}>
      {icon && <Icon name={icon} className="size-3.5" />}
      {children}
    </span>
  );
}

export function IconTile({ name, className, size = "md" }: { name: IconName; className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "size-8 rounded-lg [&_svg]:size-4", md: "size-10 rounded-xl [&_svg]:size-[1.15rem]", lg: "size-12 rounded-xl [&_svg]:size-5" };
  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center border border-brand/15 bg-gradient-to-b from-brand-soft to-transparent text-brand",
        sizes[size],
        className,
      )}
    >
      <Icon name={name} strokeWidth={1.75} />
    </span>
  );
}

/** Small label used on every mockup / scenario so it can't be mistaken for real data. */
export function IllustrativeTag({ children = "Illustrative preview · sample data", className }: { children?: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-2.5 py-1 font-mono text-[0.68rem] tracking-wide text-muted backdrop-blur",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-brand/70" aria-hidden="true" />
      {children}
    </span>
  );
}

export function CheckList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
          <span className="mt-[0.3rem] grid size-4 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
            <Icon name="check" className="size-3" strokeWidth={2.5} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
