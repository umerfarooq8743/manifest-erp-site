"use client";

import { useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { INQUIRY_ORDER, INQUIRY_TYPES, type InquiryType } from "@/lib/inquiry";
import { cn } from "@/lib/utils";
import { InquiryForm } from "./inquiry-form";

const isInquiryType = (value: string | null): value is InquiryType => value !== null && (INQUIRY_ORDER as string[]).includes(value);

export function ContactHub({ initialType = "demo" }: { initialType?: InquiryType }) {
  const [type, setType] = useState<InquiryType>(initialType);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const def = INQUIRY_TYPES[type];

  const onKeyDown = (event: React.KeyboardEvent) => {
    const index = INQUIRY_ORDER.indexOf(type);
    const last = INQUIRY_ORDER.length - 1;
    const map: Record<string, number> = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last };
    if (event.key in map) {
      event.preventDefault();
      setType(INQUIRY_ORDER[map[event.key]]);
      tabRefs.current[map[event.key]]?.focus();
    }
  };

  return (
    <div className="rounded-3xl border border-line bg-surface p-5 shadow-elevated sm:p-8">
      <div role="tablist" aria-label="Inquiry type" onKeyDown={onKeyDown} className="grid grid-cols-2 gap-1 rounded-2xl bg-surface-2 p-1 sm:grid-cols-4">
        {INQUIRY_ORDER.map((t, i) => {
          const selected = t === type;
          return (
            <button
              key={t}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${t}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setType(t)}
              className={cn(
                "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                selected ? "bg-surface text-ink shadow-[0_1px_2px_hsl(var(--shadow-color)/0.08)]" : "text-muted hover:text-ink",
              )}
            >
              {INQUIRY_TYPES[t].label}
            </button>
          );
        })}
      </div>
      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${type}`} className="mt-7">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">{def.title}</h2>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{def.description}</p>
        <div className="mt-7">
          <InquiryForm key={type} type={type} />
        </div>
      </div>
    </div>
  );
}

/** Reads ?inquiry=demo|general|product|partnership to preselect the form. */
export function ContactHubFromParams() {
  const params = useSearchParams();
  const requested = params.get("inquiry");
  const initial = isInquiryType(requested) ? requested : "demo";
  return <ContactHub key={initial} initialType={initial} />;
}
