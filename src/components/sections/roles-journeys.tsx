"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { personas, presetsNote } from "@/data/roles";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function RolesJourneys() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const persona = personas[active];

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = personas.length - 1;
    const map: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowDown: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      ArrowUp: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (event.key in map) {
      event.preventDefault();
      setActive(map[event.key]);
      tabRefs.current[map[event.key]]?.focus();
    }
  };

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[18rem_1fr] lg:gap-10">
      <div role="tablist" aria-label="Roles" aria-orientation="vertical" onKeyDown={onKeyDown} className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:px-0">
        {personas.map((p, i) => {
          const selected = i === active;
          return (
            <button
              key={p.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${p.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors lg:w-full",
                selected ? "border-brand/30 bg-surface shadow-[0_1px_2px_hsl(var(--shadow-color)/0.06)]" : "border-line bg-transparent hover:bg-surface/70 lg:border-transparent",
              )}
            >
              <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", selected ? "bg-brand text-brand-ink" : "bg-surface-2 text-muted")}>
                <Icon name={p.icon} className="size-4" />
              </span>
              <span className={cn("whitespace-nowrap text-sm font-medium lg:whitespace-normal", selected ? "text-ink" : "text-ink-2")}>{p.role}</span>
            </button>
          );
        })}
      </div>

      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${persona.id}`} tabIndex={0} className="min-w-0 rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <m.div key={persona.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
            <p className="eyebrow">{persona.role}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">{persona.headline}</h3>
            <p className="mt-3 max-w-2xl text-[0.9875rem] leading-relaxed text-ink-2">{persona.summary}</p>
            <div className="mt-7 grid gap-6 md:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="text-sm font-semibold text-ink">A typical journey</p>
                <ol className="mt-3 space-y-3">
                  {persona.responsibilities.map((r, i) => (
                    <li key={r} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-soft font-mono text-[0.7rem] text-brand">{i + 1}</span>
                      {r}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-ink">Works in</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {persona.areas.map((a) => (
                      <li key={a} className="rounded-lg border border-line bg-surface-2/60 px-2.5 py-1 text-xs text-ink-2 dark:bg-surface-2">
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">Boundaries</p>
                  <ul className="mt-3 space-y-2">
                    {persona.boundaries.map((b) => (
                      <li key={b} className="flex gap-2 text-sm leading-relaxed text-muted">
                        <Icon name="lock" className="mt-0.5 size-3.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </m.div>
        </AnimatePresence>
        <p className="mt-8 border-t border-line pt-5 text-xs leading-relaxed text-muted">{presetsNote}</p>
      </div>
    </div>
  );
}
