"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Icon, type IconName } from "./icon";
import { readPreference, setPreference, subscribeTheme, type ThemePreference } from "@/lib/theme";
import { cn } from "@/lib/utils";

const OPTIONS: { value: ThemePreference; label: string; icon: IconName }[] = [
  { value: "light", label: "Light", icon: "sun" },
  { value: "dark", label: "Dark", icon: "moon" },
  { value: "system", label: "System", icon: "monitor" },
];

function useThemePreference() {
  return useSyncExternalStore(subscribeTheme, readPreference, () => "system" as ThemePreference);
}

/** Compact icon button with a three-option menu (header). */
export function ThemeMenu({ className }: { className?: string }) {
  const preference = useThemePreference();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    const current = OPTIONS.findIndex((o) => o.value === preference);
    itemRefs.current[current >= 0 ? current : 0]?.focus();
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, preference]);

  const onMenuKey = (event: React.KeyboardEvent) => {
    const items = itemRefs.current.filter(Boolean) as HTMLButtonElement[];
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = event.key === "ArrowDown" ? (index + 1) % items.length : (index - 1 + items.length) % items.length;
      items[next]?.focus();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  const current = OPTIONS.find((o) => o.value === preference)?.icon ?? "monitor";

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`Theme: ${preference}. Change theme`}
        onClick={() => setOpen((v) => !v)}
        className="grid size-9 place-items-center rounded-lg text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
      >
        <Icon name={current} className="size-[1.05rem]" />
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            id={menuId}
            role="menu"
            aria-label="Theme"
            onKeyDown={onMenuKey}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-0 top-11 z-50 w-40 origin-top-right rounded-xl border border-line bg-surface p-1 shadow-elevated"
          >
            {OPTIONS.map(({ value, label, icon }, i) => (
              <button
                key={value}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={preference === value}
                onClick={() => {
                  setPreference(value);
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink focus-visible:bg-surface-2",
                  preference === value && "text-ink",
                )}
              >
                <Icon name={icon} className="size-4" />
                <span className="flex-1 text-left">{label}</span>
                {preference === value && <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />}
              </button>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Segmented three-way control (mobile menu, footer). */
export function ThemeSegmented({ className }: { className?: string }) {
  const preference = useThemePreference();
  return (
    <div role="radiogroup" aria-label="Theme" className={cn("inline-flex rounded-xl border border-line bg-surface-2 p-1", className)}>
      {OPTIONS.map(({ value, label, icon }) => {
        const active = preference === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setPreference(value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors",
              active ? "bg-surface text-ink shadow-[0_1px_2px_hsl(var(--shadow-color)/0.08)]" : "text-muted hover:text-ink",
            )}
          >
            <Icon name={icon} className="size-3.5" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
