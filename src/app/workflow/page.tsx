import type { Metadata } from "next";
import { completedStage, customsStages, documentedSteps, fileStatuses } from "@/data/workflows";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { PageHero } from "@/components/sections/page-hero";
import { WorkflowExplorer } from "@/components/sections/workflow-explorer";
import { Scenarios } from "@/components/sections/scenarios";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = pageMetadata({
  title: "Shipment Workflow — BL to Job-File Closure",
  description:
    "How Manifest ERP runs the customs-clearing workflow: BL and ETA, job file, GD, assessment, D/O and NOC, gate pass, delivery, vouchers, billing, SOA and closure — the documented 17-step flow and 14 customs stages.",
  path: "/workflow",
});

export default function WorkflowPage() {
  return (
    <>
      <PageHero
        crumb="Workflow"
        eyebrow="Workflow"
        title="Every shipment follows the same, visible path."
        description="BL → ETA → Job File → GD / SO / Scanning → Assessment → DO + NOC → Gate pass → Delivery → Vouchers → Bill → SOA → Close — all linked by one job-file number."
      />

      <Section id="tour" labelledBy="tour-title">
        <SectionHeading
          id="tour-title"
          eyebrow="Interactive tour"
          title="Follow one job file through twelve steps."
          description="A simplified presentation of the flow. Each step notes which of the 17 documented steps it covers."
        />
        <WorkflowExplorer />
      </Section>

      <Section id="documented-flow" tone="muted" labelledBy="flow-title">
        <SectionHeading
          id="flow-title"
          eyebrow="The documented flow"
          title="All 17 steps, as the product implements them."
          description="Where each step happens in Manifest ERP and what gets recorded."
        />
        <Reveal className="mt-12 overflow-hidden rounded-3xl border border-line bg-surface">
          <table className="hidden w-full text-left md:table">
            <caption className="sr-only">The 17-step clearing workflow</caption>
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
                <th scope="col" className="w-14 px-5 py-3.5 font-medium">#</th>
                <th scope="col" className="w-64 px-5 py-3.5 font-medium">Step</th>
                <th scope="col" className="w-56 px-5 py-3.5 font-medium">Where</th>
                <th scope="col" className="px-5 py-3.5 font-medium">What happens</th>
              </tr>
            </thead>
            <tbody>
              {documentedSteps.map((s) => (
                <tr key={s.n} className="border-b border-line last:border-0">
                  <td className="px-5 py-4 font-mono text-sm text-muted">{String(s.n).padStart(2, "0")}</td>
                  <th scope="row" className="px-5 py-4 text-sm font-semibold text-ink">
                    {s.step}
                  </th>
                  <td className="px-5 py-4 text-sm text-brand">{s.where}</td>
                  <td className="px-5 py-4 text-sm leading-relaxed text-ink-2">{s.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ol className="divide-y divide-line md:hidden">
            {documentedSteps.map((s) => (
              <li key={s.n} className="flex gap-4 p-5">
                <span className="font-mono text-sm text-muted">{String(s.n).padStart(2, "0")}</span>
                <div>
                  <p className="text-sm font-semibold text-ink">{s.step}</p>
                  <p className="mt-0.5 text-xs text-brand">{s.where}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.what}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
        <p className="mt-6 flex max-w-3xl gap-2 text-sm text-muted">
          <Icon name="info" className="mt-0.5 size-4 shrink-0" />
          The job-file page always shows a Next step card telling the user what to do now, plus a workflow checklist.
        </p>
      </Section>

      <Section id="customs-stages" labelledBy="stages-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="stages-title"
            eyebrow="Customs board"
            title={`${customsStages.length} customs stages, then completed.`}
            description="Each move records a date, reference, responsible person, remarks and attachment, and is written to a dated customs log. Manifest records the progress — filing itself happens on WeBOC and shipping-line portals."
          />
          <Reveal>
            <ol className="grid gap-2 sm:grid-cols-2">
              {customsStages.map((stage, i) => (
                <li key={stage.key} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-soft font-mono text-xs text-brand">{i + 1}</span>
                  <span className="text-sm font-medium text-ink">{stage.label}</span>
                  {stage.reference && <span className="ml-auto rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[0.68rem] text-muted">{stage.reference}</span>}
                </li>
              ))}
              <li className="flex items-center gap-3 rounded-xl border border-brand/30 bg-brand-soft px-4 py-3 sm:col-span-2">
                <Icon name="circle-check" className="size-5 text-brand" />
                <span className="text-sm font-semibold text-ink">{completedStage.label}</span>
                <span className="ml-auto text-xs text-muted">End state after empty return</span>
              </li>
            </ol>
          </Reveal>
        </div>
      </Section>

      <Section id="file-status" tone="muted" labelledBy="status-title">
        <SectionHeading
          id="status-title"
          eyebrow="File status"
          title="Status that follows the work."
          description="A job file’s status is set by what actually happened — stages, deliveries and invoice approval — so it can’t be typed in. By hand you can only close (checklist or audited force-close), re-open or cancel (with permission, and only without live invoices)."
        />
        <Reveal className="mt-12">
          <ol className="grid gap-3 md:grid-cols-5">
            {fileStatuses.map((s, i) => (
              <li key={s.key} className="relative rounded-2xl border border-line bg-surface p-5">
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-base font-semibold text-ink">{s.label}</p>
                <p className="mt-1 text-sm text-muted">{s.note}</p>
                {i < fileStatuses.length - 1 && (
                  <span className="absolute -right-2 top-1/2 z-10 hidden size-4 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface text-muted md:grid" aria-hidden="true">
                    <Icon name="chevron-right" className="size-3" />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      <Scenarios />
      <CtaBand />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Workflow", path: "/workflow" }])} />
    </>
  );
}
