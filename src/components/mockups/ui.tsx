import type { ReactNode } from "react";
import type { Tone } from "@/data/demo";
import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

/* Mock UI primitives — sized in Tailwind units that are re-based inside .mock-root,
   so they scale with the mockup. Avoid arbitrary px values in here. */

const toneClasses: Record<Tone, string> = {
  neutral: "bg-m-secondary text-m-muted",
  primary: "bg-m-primary-soft text-m-primary",
  success: "bg-m-success-soft text-m-success",
  warning: "bg-m-warning-soft text-m-warning",
  danger: "bg-m-danger-soft text-m-danger",
  info: "bg-m-info-soft text-m-info",
};

const dotClasses: Record<Tone, string> = {
  neutral: "bg-m-subtle",
  primary: "bg-m-primary",
  success: "bg-m-success",
  warning: "bg-m-warning",
  danger: "bg-m-danger",
  info: "bg-m-info",
};

export function MBadge({ tone = "neutral", children, dot = false, className }: { tone?: Tone; children: ReactNode; dot?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-2xs font-medium", toneClasses[tone], className)}>
      {dot && <span className={cn("size-1.5 rounded-full", dotClasses[tone])} />}
      {children}
    </span>
  );
}

export function MDot({ tone = "neutral", className }: { tone?: Tone; className?: string }) {
  return <span className={cn("inline-block size-2 shrink-0 rounded-full", dotClasses[tone], className)} />;
}

export function MCard({
  title,
  description,
  action,
  children,
  className,
  bodyClassName,
}: {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col rounded-xl border border-m-border bg-m-card shadow-[0_1px_2px_rgb(15_23_42/0.04)]", className)}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 px-4 pb-2 pt-3.5">
          <div className="min-w-0">
            {title && <p className="truncate text-sm font-semibold tracking-tight text-m-fg">{title}</p>}
            {description && <p className="mt-0.5 truncate text-xs text-m-muted">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={cn("min-h-0 flex-1 px-4 pb-4", !title && !action && "pt-4", bodyClassName)}>{children}</div>
    </div>
  );
}

export function MButton({
  children,
  variant = "outline",
  icon,
  className,
}: {
  children?: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  icon?: IconName;
  className?: string;
}) {
  const variants = {
    primary: "bg-m-primary text-m-primary-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.15)]",
    outline: "border border-m-border bg-m-card text-m-fg",
    ghost: "text-m-muted",
  } as const;
  return (
    <span className={cn("inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 text-xs font-medium", variants[variant], className)}>
      {icon && <Icon name={icon} className="size-3.5" />}
      {children}
    </span>
  );
}

export function MInput({ placeholder, value, icon, className, kbd }: { placeholder?: string; value?: string; icon?: IconName; className?: string; kbd?: string }) {
  return (
    <span className={cn("flex h-8 min-w-0 items-center gap-2 rounded-lg border border-m-border bg-m-card px-2.5 text-xs", className)}>
      {icon && <Icon name={icon} className="size-3.5 shrink-0 text-m-subtle" />}
      <span className={cn("min-w-0 flex-1 truncate", value ? "text-m-fg" : "text-m-subtle")}>{value ?? placeholder}</span>
      {kbd && <span className="rounded border border-m-border px-1 font-mono text-2xs text-m-subtle">{kbd}</span>}
    </span>
  );
}

export function MSelect({ value, label, className, icon }: { value: string; label?: string; className?: string; icon?: IconName }) {
  return (
    <span className={cn("flex h-8 min-w-0 items-center gap-2 rounded-lg border border-m-border bg-m-card px-2.5 text-xs", className)}>
      {icon && <Icon name={icon} className="size-3.5 shrink-0 text-m-subtle" />}
      {label && <span className="text-m-subtle">{label}</span>}
      <span className="min-w-0 flex-1 truncate text-m-fg">{value}</span>
      <Icon name="chevron-down" className="size-3.5 shrink-0 text-m-subtle" />
    </span>
  );
}

export function MField({ label, value, mono, className, hint }: { label: string; value: ReactNode; mono?: boolean; className?: string; hint?: string }) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="mb-1 text-2xs font-medium uppercase tracking-wider text-m-subtle">{label}</p>
      <div className={cn("flex h-8 items-center rounded-lg border border-m-border bg-m-card px-2.5 text-xs text-m-fg", mono && "num")}>
        <span className="truncate">{value}</span>
      </div>
      {hint && <p className="mt-1 text-2xs text-m-muted">{hint}</p>}
    </div>
  );
}

export function MKpi({
  label,
  value,
  hint,
  icon,
  tone = "neutral",
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: IconName;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 rounded-xl border border-m-border bg-m-card p-3.5", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-xs text-m-muted">{label}</p>
        {icon && (
          <span className={cn("grid size-6 place-items-center rounded-md", toneClasses[tone])}>
            <Icon name={icon} className="size-3.5" />
          </span>
        )}
      </div>
      <p className="num mt-1.5 text-xl font-semibold tracking-tight text-m-fg">{value}</p>
      {hint && <p className="mt-0.5 truncate text-2xs text-m-muted">{hint}</p>}
    </div>
  );
}

export function MAvatar({ initials, className, tone = "neutral" }: { initials: string; className?: string; tone?: Tone }) {
  return (
    <span className={cn("grid size-6 shrink-0 place-items-center rounded-full text-2xs font-semibold", toneClasses[tone], className)}>{initials}</span>
  );
}

export function MTabs({ items, active, className }: { items: string[]; active: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1 border-b border-m-border", className)}>
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "-mb-px whitespace-nowrap border-b-2 px-2.5 pb-2 text-xs font-medium",
            item === active ? "border-m-primary text-m-fg" : "border-transparent text-m-muted",
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function MSegmented({ items, active, className }: { items: string[]; active: string; className?: string }) {
  return (
    <span className={cn("inline-flex rounded-lg bg-m-secondary p-0.5", className)}>
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "whitespace-nowrap rounded-md px-2.5 py-1 text-2xs font-medium",
            item === active ? "bg-m-card text-m-fg shadow-[0_1px_2px_rgb(15_23_42/0.08)]" : "text-m-muted",
          )}
        >
          {item}
        </span>
      ))}
    </span>
  );
}

export function MProgress({ value, tone = "primary", className }: { value: number; tone?: Tone; className?: string }) {
  return (
    <span className={cn("block h-1.5 overflow-hidden rounded-full bg-m-secondary", className)}>
      <span className={cn("block h-full rounded-full", dotClasses[tone])} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </span>
  );
}

export function MCheckbox({ checked = false }: { checked?: boolean }) {
  return (
    <span className={cn("grid size-3.5 shrink-0 place-items-center rounded border", checked ? "border-m-primary bg-m-primary text-m-primary-fg" : "border-m-input bg-m-card")}>
      {checked && <Icon name="check" className="size-2.5" strokeWidth={3} />}
    </span>
  );
}

export function MToggle({ on = false }: { on?: boolean }) {
  return (
    <span className={cn("relative inline-block h-4 w-7 shrink-0 rounded-full", on ? "bg-m-primary" : "bg-m-input")}>
      <span className={cn("absolute top-0.5 size-3 rounded-full bg-white shadow-sm", on ? "left-3.5" : "left-0.5")} />
    </span>
  );
}

export function MPageHeader({ title, description, actions, className }: { title: string; description?: string; actions?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div className="min-w-0">
        <p className="truncate text-2xl font-semibold tracking-tight text-m-fg">{title}</p>
        {description && <p className="mt-0.5 truncate text-xs text-m-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

export interface MColumn {
  label: string;
  align?: "left" | "right" | "center";
  className?: string;
}

export function MTable({ columns, rows, className, dense = false }: { columns: MColumn[]; rows: ReactNode[][]; className?: string; dense?: boolean }) {
  const align = (a?: MColumn["align"]) => (a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left");
  return (
    <div className={cn("overflow-hidden rounded-xl border border-m-border bg-m-card", className)}>
      <table className="w-full table-fixed border-collapse text-xs">
        <thead>
          <tr className="border-b border-m-border bg-m-secondary/60">
            {columns.map((col) => (
              <th key={col.label} className={cn("px-3 py-2 text-2xs font-medium uppercase tracking-wider text-m-subtle", align(col.align), col.className)}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-m-border last:border-0">
              {row.map((cell, j) => (
                <td key={j} className={cn("truncate px-3 text-m-fg", dense ? "py-1.5" : "py-2.5", align(columns[j]?.align), columns[j]?.className)}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MMono({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("num text-m-fg", className)}>{children}</span>;
}

export function MMuted({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("text-m-muted", className)}>{children}</span>;
}

/** A modal/dialog surface floating over the screen. */
export function MDialog({ title, description, children, footer, className }: { title: string; description?: string; children: ReactNode; footer?: ReactNode; className?: string }) {
  return (
    <div className={cn("absolute z-10 rounded-2xl border border-m-border bg-m-card shadow-[0_24px_64px_-16px_rgb(2_6_23/0.45)]", className)}>
      <div className="border-b border-m-border px-5 py-3.5">
        <p className="text-base font-semibold tracking-tight text-m-fg">{title}</p>
        {description && <p className="mt-0.5 text-xs text-m-muted">{description}</p>}
      </div>
      <div className="px-5 py-4">{children}</div>
      {footer && <div className="flex justify-end gap-2 border-t border-m-border px-5 py-3">{footer}</div>}
    </div>
  );
}
