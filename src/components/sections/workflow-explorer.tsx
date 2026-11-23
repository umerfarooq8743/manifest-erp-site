"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, useInView, m } from "framer-motion";
import { workflowSteps } from "@/data/workflows";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type Field = [label: string, value: string];
interface StepVisual {
  heading: string;
  badge: [label: string, tone: "brand" | "warn" | "muted"];
  fields?: Field[];
  checklist?: [label: string, done: boolean][];
  note?: string;
}

/** Illustrative values for the step visual (fictional sample data). */
const VISUALS: Record<string, StepVisual> = {
  bl: {
    heading: "New ETA entry · ETA-2026-000309",
    badge: ["Documents pending", "warn"],
    fields: [
      ["Client", "Arcadia Pharma Imports"],
      ["BL", "MEDU4790218"],
      ["Vessel", "MSC Aurelia · 646W"],
      ["ETA", "15 Nov · Port Qasim"],
      ["Containers", "2 × 20GP"],
    ],
    note: "Duplicate-BL check: no match found",
  },
  eta: {
    heading: "Documents checklist",
    badge: ["Ready for file", "brand"],
    checklist: [
      ["Bill of Lading", true],
      ["Commercial invoice", true],
      ["Packing list", true],
      ["Financial instrument (FI)", true],
    ],
    note: "Arrival notice e-mailed to the client",
  },
  "job-file": {
    heading: "Converted to job file",
    badge: ["MCF-2026-0142", "brand"],
    fields: [
      ["Containers copied", "2"],
      ["Checklist copied", "4 of 4 required"],
      ["Customs log", "Started · Documents Pending"],
      ["Status", "Open"],
    ],
  },
  gd: {
    heading: "Stage move · GD Filed",
    badge: ["Logged", "brand"],
    fields: [
      ["Date", "17 Nov 2026"],
      ["GD number", "KPQI-HC-48213"],
      ["Responsible", "Bilal Raza"],
      ["Attachment", "gd-copy.pdf"],
    ],
    note: "Filed on WeBOC · progress recorded in Manifest",
  },
  assessment: {
    heading: "Assessment, duty & pay orders",
    badge: ["Duty Payment", "brand"],
    fields: [
      ["Duty voucher", "VCH-2026-0398 · 412,380.00"],
      ["D/O charges pay order", "38,500.00"],
      ["Security deposit", "150,000.00 · refund pending"],
    ],
  },
  "do-noc": {
    heading: "Delivery order & NOC",
    badge: ["Alerts on", "warn"],
    fields: [
      ["D/O number", "DO-55120 · expires 05 Dec"],
      ["NOC number", "NOC-7781 · expires 30 Nov"],
      ["Generated", "D/O request · MSC undertaking"],
    ],
  },
  "gate-pass": {
    heading: "Gate pass GP-0384",
    badge: ["Issued", "brand"],
    fields: [
      ["Transporter", "Indus Haulage Co."],
      ["Vehicle", "TKS-4471"],
      ["Driver · CNIC", "Rashid K. · 42101-•••••••-3"],
      ["Container", "MSCU 479021-8"],
    ],
  },
  delivery: {
    heading: "Deliveries & empty return",
    badge: ["Delivered", "brand"],
    fields: [
      ["Packages", "640 of 640 · 2 deliveries"],
      ["Proof", "Attached to each delivery"],
      ["Empty return", "27 Nov · no detention"],
    ],
  },
  vouchers: {
    heading: "Vouchers on this job file",
    badge: ["1 pending", "warn"],
    fields: [
      ["Customs duty", "412,380.00 · approved"],
      ["D/O charges", "38,500.00 · approved"],
      ["Wharfage", "21,760.00 · approved"],
      ["Transportation", "64,000.00 · pending"],
    ],
  },
  billing: {
    heading: "Sales-tax invoice",
    badge: ["Approved", "brand"],
    fields: [
      ["Agency services", "51,000.00"],
      ["Reimbursements", "472,640.00"],
      ["Sales tax (per line)", "6,630.00"],
      ["Total · due 30 Nov", "530,270.00"],
    ],
  },
  soa: {
    heading: "Statement · Arcadia Pharma Imports",
    badge: ["In credit", "brand"],
    fields: [
      ["Invoiced", "916,690.00"],
      ["Received (incl. WHT)", "1,158,160.00"],
      ["Credit notes", "12,500.00"],
      ["Unapplied advance", "39,370.00"],
    ],
  },
  close: {
    heading: "Close-file checklist",
    badge: ["Ready to close", "brand"],
    checklist: [
      ["Documents complete", true],
      ["Delivered", true],
      ["Empties returned", true],
      ["Expenses approved", true],
      ["Invoiced", true],
      ["No pending tasks", true],
    ],
    note: "Reminder: security deposit 150,000.00 awaiting refund",
  },
};

const DURATION = 6500;

function Visual({ stepId, index }: { stepId: string; index: number }) {
  const v = VISUALS[stepId];
  const badgeTone = { brand: "bg-brand-soft text-brand", warn: "bg-warn-soft text-warn", muted: "bg-surface-2 text-muted" }[v.badge[1]];
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-[0_1px_2px_hsl(var(--shadow-color)/0.05)]">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted">MCF-2026-0142</span>
        <span className="font-mono text-[0.7rem] text-muted">step {index + 1}/12</span>
      </div>
      <div className="mt-2 flex gap-1" aria-hidden="true">
        {workflowSteps.map((s, i) => (
          <span key={s.id} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", i <= index ? "bg-brand" : "bg-surface-3")} />
        ))}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-ink">{v.heading}</p>
        <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[0.7rem] font-medium", badgeTone)}>{v.badge[0]}</span>
      </div>
      {v.fields && (
        <dl className="mt-3 divide-y divide-line rounded-xl border border-line">
          {v.fields.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 px-3 py-2 text-xs">
              <dt className="text-muted">{label}</dt>
              <dd className="truncate text-right font-mono text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      )}
      {v.checklist && (
        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {v.checklist.map(([label, done]) => (
            <li key={label} className="flex items-center gap-2 rounded-lg border border-line px-2.5 py-2 text-xs text-ink">
              <span className={cn("grid size-4 place-items-center rounded-full", done ? "bg-brand text-brand-ink" : "border border-line-strong")}>
                {done && <Icon name="check" className="size-2.5" strokeWidth={3} />}
              </span>
              {label}
            </li>
          ))}
        </ul>
      )}
      {v.note && (
        <p className="mt-3 flex items-center gap-2 text-xs text-muted">
          <Icon name="info" className="size-3.5 shrink-0" />
          {v.note}
        </p>
      )}
    </div>
  );
}

export function WorkflowExplorer() {
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(rootRef, { amount: 0.35 });
  const baseId = useId();
  const playing = !reduceMotion && !userPaused && !hovering && inView;
  const step = workflowSteps[active];

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % workflowSteps.length), DURATION);
    return () => window.clearTimeout(timer);
  }, [playing, active]);

  const select = useCallback((index: number, focus = false) => {
    setActive(index);
    setUserPaused(true);
    if (focus) tabRefs.current[index]?.focus();
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = workflowSteps.length - 1;
    const keys: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key], true);
    }
  };

  return (
    <div
      ref={rootRef}
      className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10"
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
      <div className="min-w-0">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">12 presentation steps</p>
          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-muted transition-colors hover:bg-surface-2 hover:text-ink"
              aria-label={userPaused ? "Play the workflow tour" : "Pause the workflow tour"}
            >
              <Icon name={userPaused ? "play" : "pause"} className="size-3.5" />
              {userPaused ? "Play" : "Pause"}
            </button>
          )}
        </div>
        <div
          role="tablist"
          aria-label="Shipment workflow steps"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {workflowSteps.map((s, i) => {
            const selected = i === active;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`${baseId}-tab-${s.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                className={cn(
                  "group relative flex shrink-0 items-center gap-3 overflow-hidden rounded-xl border px-3 py-2.5 text-left transition-colors lg:w-full",
                  selected ? "border-brand/30 bg-surface shadow-[0_1px_2px_hsl(var(--shadow-color)/0.06)]" : "border-transparent hover:bg-surface/70",
                )}
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-lg font-mono text-xs transition-colors",
                    selected ? "bg-brand text-brand-ink" : i < active ? "bg-brand-soft text-brand" : "bg-surface-2 text-muted",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className={cn("block whitespace-nowrap text-sm font-medium lg:whitespace-normal", selected ? "text-ink" : "text-ink-2")}>{s.title}</span>
                  <span className="hidden text-xs text-muted lg:block">{s.module}</span>
                </span>
                {selected && playing && (
                  <m.span
                    key={`progress-${active}`}
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand/60"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: DURATION / 1000, ease: "linear" }}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${step.id}`}
        tabIndex={0}
        className="min-w-0 rounded-3xl border border-line bg-surface-2/60 p-5 sm:p-8 lg:sticky lg:top-24 lg:self-start dark:bg-surface/50"
        aria-live={playing ? "off" : "polite"}
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand">
                <Icon name={step.icon} className="size-3.5" />
                {step.module}
              </span>
              <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.7rem] text-muted">
                Documented step{step.docSteps.length > 1 ? "s" : ""} {step.docSteps.join(" & ")} of 17
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">{step.title}</h3>
            <p className="mt-3 text-[0.9875rem] leading-relaxed text-ink-2">{step.summary}</p>
            <ul className="mt-5 space-y-2">
              {step.details.map((d) => (
                <li key={d} className="flex gap-2.5 text-sm text-ink-2">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-brand" />
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Visual stepId={step.id} index={active} />
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
