import { erpStack, websiteStack } from "@/data/security";
import { Icon } from "@/components/ui/icon";
import { IconTile } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

export function TechStack() {
  return (
    <Section id="technology" labelledBy="technology-title">
      <SectionHeading
        id="technology-title"
        eyebrow="Technology"
        title="A modern, strictly typed stack."
        description="The ERP application is built with React, Node.js and PostgreSQL in TypeScript throughout. This marketing website is a separate project with its own stack."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {erpStack.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 0.05} className="card p-6">
            <div className="flex items-center gap-3">
              <IconTile name={group.icon} size="sm" />
              <h3 className="text-[0.9875rem] font-semibold text-ink">{group.title}</h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between gap-4 border-t border-line pt-2.5 text-sm first:border-0 first:pt-0">
                  <span className="font-medium text-ink">{item.name}</span>
                  <span className="text-right text-xs text-muted">{item.detail}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8 rounded-2xl border border-dashed border-line-strong p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
          <div className="flex items-center gap-3 lg:w-72 lg:shrink-0">
            <Icon name="globe" className="size-5 text-muted" />
            <div>
              <p className="text-sm font-semibold text-ink">This website (separate from the ERP)</p>
              <p className="text-xs text-muted">Static marketing site — no database or backend</p>
            </div>
          </div>
          <ul className="flex flex-wrap gap-2">
            {websiteStack.map((t) => (
              <li key={t.name} className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs text-ink-2" title={t.detail}>
                {t.name}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
