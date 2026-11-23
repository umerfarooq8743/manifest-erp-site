import { hero } from "@/data/marketing";
import { primaryCta, secondaryCta } from "@/data/navigation";
import { workflowSteps } from "@/data/workflows";
import { ProductMockup } from "@/components/mockups/product-mockup";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { IllustrativeTag } from "@/components/ui/primitives";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

function JobProgressCard() {
  const done = 5;
  return (
    <div className="w-72 rounded-2xl border border-line bg-surface/95 p-4 shadow-elevated backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-medium text-ink">MCF-2026-0142</span>
        <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[0.68rem] font-medium text-brand">In progress</span>
      </div>
      <p className="mt-1 text-xs text-muted">Arcadia Pharma Imports · 2 × 20GP</p>
      <div className="mt-3 flex gap-1" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={`h-1.5 flex-1 rounded-full ${i < done ? "bg-brand" : i === done ? "bg-brand/40 animate-pulse-soft" : "bg-surface-3"}`} />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs">
        <Icon name="stamp" className="size-3.5 text-brand" />
        <span className="text-ink">Next: record NOC</span>
        <span className="ml-auto font-mono text-muted">6 / 12</span>
      </div>
    </div>
  );
}

function AlertCard() {
  return (
    <div className="flex w-64 items-start gap-3 rounded-2xl border border-line bg-surface/95 p-3.5 shadow-elevated backdrop-blur">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-danger-soft text-danger">
        <Icon name="bell" className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-ink">NOC expires in 2 days</p>
        <p className="mt-0.5 truncate text-[0.7rem] text-muted">MCF-2026-0139 · alert window 7 days</p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pt-24">
      <div className="bg-glow hero-glow pointer-events-none absolute -inset-[10%] -z-10" aria-hidden="true" />
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="container-page">
        <div className="mx-auto max-w-4xl text-center">
          <p className="animate-fade-up hero-intro inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs font-medium text-ink-2 backdrop-blur" style={delay(0)}>
            <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="text-display mt-6">
            <span className="block">{hero.headline[0]}</span>
            <span className="text-gradient-brand hero-shimmer block pb-1">{hero.headline[1]}</span>
          </h1>
          <p className="text-lead mx-auto mt-6 max-w-2xl">
            {hero.subheadline}
          </p>
          <div className="animate-fade-up hero-intro mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center" style={delay(220)}>
            <ButtonLink href={primaryCta.href} size="lg" icon="arrow-right">
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} size="lg" variant="secondary">
              {secondaryCta.label}
            </ButtonLink>
          </div>
          <ul className="animate-fade-up hero-intro mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted" style={delay(300)}>
            {hero.points.map((point) => (
              <li key={point} className="inline-flex items-center gap-2">
                <Icon name="circle-check" className="size-4 text-brand" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up hero-intro relative mx-auto mt-14 max-w-6xl sm:mt-16" style={delay(380)}>
          <div className="pointer-events-none absolute -inset-x-10 -top-10 bottom-10 -z-10 rounded-[3rem] bg-gradient-to-b from-brand/15 via-brand-2/5 to-transparent blur-3xl" aria-hidden="true" />
          <ProductMockup screen="dashboard" crop eager />
          <div className="absolute -bottom-8 -left-6 hidden lg:block xl:-left-12" aria-hidden="true">
            <div className="animate-float">
              <JobProgressCard />
            </div>
          </div>
          <div className="absolute -right-6 top-[46%] hidden lg:block xl:-right-12" aria-hidden="true">
            <div className="animate-float" style={delay(1200)}>
              <AlertCard />
            </div>
          </div>
          <div className="mt-4 flex justify-center lg:mt-12">
            <IllustrativeTag />
          </div>
        </div>

        <div className="mt-12 sm:mt-14">
          <p className="text-center font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">One job file, end to end</p>
          <div className="scrollbar-none mask-fade-x -mx-5 mt-4 overflow-x-auto px-5 pb-1 lg:mx-0 lg:overflow-visible lg:px-0 lg:[mask-image:none]">
          <ol className="mx-auto flex w-max items-center gap-2 lg:w-auto lg:flex-wrap lg:justify-center lg:gap-y-2.5" aria-label="Shipment lifecycle">
            {workflowSteps.map((step, i) => (
              <li key={step.id} className="flex shrink-0 items-center gap-2">
                <span
                  className="chip-wave inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-2"
                  style={{ "--i": i }}
                >
                  <Icon name={step.icon} className="size-3.5 text-brand" />
                  {step.shortTitle}
                </span>
                {i < workflowSteps.length - 1 && <Icon name="chevron-right" className="size-3.5 text-line-strong" />}
              </li>
            ))}
          </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
