import { problems } from "@/data/marketing";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

export function ProblemSolution() {
  return (
    <Section id="challenges" tone="muted" labelledBy="challenges-title">
      <SectionHeading
        id="challenges-title"
        eyebrow="The challenge"
        title="The work is connected. The records usually aren’t."
        description="Clearing and forwarding involves many hands, many documents and many payments per shipment. These are the workflow problems that appear when each desk keeps its own record."
      />
      <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem, i) => (
          <Reveal as="li" key={problem.title} delay={(i % 3) * 0.06} className="card card-hover flex flex-col overflow-hidden">
            <div className="flex-1 p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-surface-2 text-muted">
                  <Icon name={problem.icon} className="size-[1.1rem]" strokeWidth={1.75} />
                </span>
                <h3 className="text-h3">{problem.title}</h3>
              </div>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{problem.description}</p>
            </div>
            <div className="flex gap-3 border-t border-line bg-brand-soft/50 px-6 py-4 dark:bg-brand-soft">
              <Icon name="arrow-right" className="mt-0.5 size-4 shrink-0 text-brand" />
              <p className="text-sm leading-relaxed text-ink">
                <span className="sr-only">With Manifest ERP: </span>
                {problem.solution}
              </p>
            </div>
          </Reveal>
        ))}
        <Reveal as="li" delay={0.12} className="flex flex-col justify-center rounded-2xl border border-dashed border-line-strong p-6">
          <p className="text-h3">Framed as industry patterns</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            These are common workflow problems in clearing and forwarding — not claims about any particular business. A demo is the best way to see which apply to yours.
          </p>
        </Reveal>
      </ul>
    </Section>
  );
}
