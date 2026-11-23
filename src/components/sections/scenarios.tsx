import Link from "next/link";
import { scenarios } from "@/data/scenarios";
import { Icon } from "@/components/ui/icon";
import { IllustrativeTag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import type { Scenario } from "@/types/content";

function ScenarioTimeline({ scenario }: { scenario: Scenario }) {
  return (
    <article aria-labelledby={`scenario-${scenario.id}`} className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <IllustrativeTag>Illustrative scenario · not a customer case study</IllustrativeTag>
      </div>
      <h3 id={`scenario-${scenario.id}`} className="mt-4 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
        {scenario.title}
      </h3>
      <p className="mt-2 text-[0.9375rem] text-muted">{scenario.summary}</p>
      <ol className="relative mt-8 grid gap-x-8 gap-y-6 md:grid-cols-2">
        {scenario.steps.map((step, i) => (
          <li key={step.title} className="relative flex gap-4">
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-brand/30 bg-brand-soft font-mono text-xs text-brand">{i + 1}</span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[0.9375rem] font-semibold text-ink">{step.title}</p>
                <span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[0.68rem] text-muted">{step.module}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}

export function Scenarios({ all = false }: { all?: boolean }) {
  const list = all ? scenarios : scenarios.slice(0, 1);
  return (
    <Section id="scenarios" tone="muted" labelledBy="scenarios-title">
      <SectionHeading
        id="scenarios-title"
        eyebrow="Scenarios"
        title={all ? "How the modules work together." : "One shipment, start to finish."}
        description="Illustrative walk-throughs of documented capabilities. No real company, customer or measured result is implied."
      />
      <div className="mt-12 space-y-6">
        {list.map((s) => (
          <Reveal key={s.id}>
            <ScenarioTimeline scenario={s} />
          </Reveal>
        ))}
      </div>
      {!all && (
        <p className="mt-6 text-sm text-muted">
          <Icon name="arrow-right" className="mr-2 inline-block size-4 align-[-3px] text-brand" />
          More scenarios — collections with advances and onboarding a new company — on the{" "}
          <Link href="/solutions#scenarios" className="font-medium text-brand underline-offset-4 hover:underline">
            Solutions page
          </Link>
          .
        </p>
      )}
    </Section>
  );
}
