"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import type { Faq } from "@/types/content";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-surface">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-7"
              >
                <span className="text-[0.9875rem] font-medium text-ink sm:text-base">{item.question}</span>
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-[transform,background-color,color] duration-300",
                    isOpen && "rotate-45 border-brand/30 bg-brand-soft text-brand",
                  )}
                  aria-hidden="true"
                >
                  <Icon name="plus" className="size-3.5" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl px-5 pb-6 text-[0.9375rem] leading-relaxed text-ink-2 sm:px-7">{item.answer}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
