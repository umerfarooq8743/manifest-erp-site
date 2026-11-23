import { completedStage, customsStages } from "@/data/workflows";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { WorkflowExplorer } from "./workflow-explorer";

export function WorkflowSection({ showLink = true }: { showLink?: boolean }) {
  return (
    <Section id="workflow" tone="muted" labelledBy="workflow-title">
      <SectionHeading
        id="workflow-title"
        eyebrow="The workflow"
        title="From Bill of Lading to a closed job file."
        description="Follow one shipment through Manifest ERP. Each step shows which module handles it and what gets recorded — select a step, or let the tour play."
      />
      <WorkflowExplorer />
      <Reveal className="mt-12 grid gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_2fr] lg:items-center">
        <div>
          <p className="text-h3">The full picture</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            This tour is a simplified 12-step view. The product implements a documented 17-step business flow, and the customs board alone tracks {customsStages.length} stages before a file is marked {completedStage.label.toLowerCase()}.
          </p>
          {showLink && (
            <ButtonLink href="/workflow" variant="secondary" size="sm" icon="arrow-right" className="mt-5">
              See all 17 steps
            </ButtonLink>
          )}
        </div>
        <ol className="flex flex-wrap gap-1.5" aria-label="Customs stages">
          {customsStages.map((stage, i) => (
            <li key={stage.key} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-2/60 px-2.5 py-1.5 text-xs text-ink-2 dark:bg-surface-2">
              <span className="font-mono text-[0.68rem] text-muted">{String(i + 1).padStart(2, "0")}</span>
              {stage.label}
            </li>
          ))}
          <li className="inline-flex items-center gap-1.5 rounded-lg border border-brand/30 bg-brand-soft px-2.5 py-1.5 text-xs font-medium text-brand">
            ✓ {completedStage.label}
          </li>
        </ol>
      </Reveal>
    </Section>
  );
}
