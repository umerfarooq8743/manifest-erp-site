"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import type { ShowcaseScreen } from "@/types/content";
import { LazyProductMockup } from "@/components/mockups/lazy-product-mockup";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import { IllustrativeTag } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export type TourItem = ShowcaseScreen;

export function ProductTour({ items, initialIndex = 0 }: { items: TourItem[]; initialIndex?: number }) {
  const [active, setActive] = useState(initialIndex);
  const [open, setOpen] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const item = items[active];

  const go = (index: number, focusTab = false) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    if (focusTab) tabRefs.current[next]?.focus();
    tabRefs.current[next]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };

  const onTabKey = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(active + 1, true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(active - 1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      go(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      go(items.length - 1, true);
    }
  };

  return (
    <div className="mt-12">
      <div
        role="tablist"
        aria-label="Product screens"
        onKeyDown={onTabKey}
        className="scrollbar-none mask-fade-x -mx-5 flex gap-1.5 overflow-x-auto px-5 py-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:[mask-image:none]"
      >
        {items.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${s.key}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => go(i)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                selected ? "border-ink bg-ink text-canvas" : "border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink",
              )}
            >
              {s.title}
            </button>
          );
        })}
      </div>

      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${item.key}`} className="mt-8">
        <div className="relative mx-auto max-w-6xl">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={item.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="group relative">
                <LazyProductMockup screen={item.key} crop />
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="absolute inset-0 cursor-zoom-in rounded-xl sm:rounded-2xl"
                  aria-label={`Expand the ${item.title} preview`}
                >
                  <span className="pointer-events-none absolute right-3 top-12 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/90 px-3 py-1.5 text-xs font-medium text-ink opacity-90 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 sm:top-14 sm:opacity-0">
                    <Icon name="maximize" className="size-3.5" />
                    Expand
                  </span>
                </button>
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brand">
              {item.module} · {String(active + 1).padStart(2, "0")} / {items.length}
            </p>
            <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-ink">{item.title}</h3>
            <p className="mt-1 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">{item.description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <IllustrativeTag className="hidden md:inline-flex" />
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous screen"
              className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-2"
            >
              <Icon name="chevron-left" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next screen"
              className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-2"
            >
              <Icon name="chevron-right" className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        labelledBy={`${baseId}-lightbox-title`}
        className="max-w-[min(96vw,92rem)]"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") go(active + 1);
          if (event.key === "ArrowLeft") go(active - 1);
        }}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-5">
          <div className="min-w-0 flex-1">
            <p id={`${baseId}-lightbox-title`} className="truncate text-sm font-semibold text-ink">
              {item.title} <span className="font-normal text-muted">· {item.module}</span>
            </p>
            <p className="truncate text-xs text-muted">Illustrative preview with fictional sample data · use ← → to browse</p>
          </div>
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous screen"
            className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <Icon name="chevron-left" className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next screen"
            className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <Icon name="chevron-right" className="size-4" />
          </button>
          <DialogClose onClose={() => setOpen(false)} />
        </div>
        <div className="min-h-0 flex-1 overflow-auto bg-surface-2 p-3 sm:p-5" tabIndex={0} aria-label="Screen preview, scrollable">
          <div className="min-w-[60rem]">
            <LazyProductMockup screen={item.key} immediate />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
