import Link from "next/link";
import { moduleCategories, modules } from "@/data/modules";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

export function ModulesOverview() {
  return (
    <Section id="modules" tone="muted" labelledBy="modules-title">
      <SectionHeading
        id="modules-title"
        eyebrow="Modules"
        title="Sixteen modules, one platform."
        description="Operations, accounts and administration live in the same product and share the same records. Pick any module to see what it does."
      />
      <div className="mt-14 space-y-10">
        {moduleCategories.map((category) => {
          const items = modules.filter((m) => m.category === category);
          return (
            <div key={category} className="grid gap-4 lg:grid-cols-[10rem_1fr] lg:gap-8">
              <h3 className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-muted lg:pt-5">{category}</h3>
              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((mod, i) => (
                  <Reveal as="li" key={mod.id} delay={(i % 3) * 0.04}>
                    <Link href={`/modules#${mod.id}`} className="card card-hover group flex h-full items-start gap-4 p-5">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-ink-2 transition-colors group-hover:bg-brand-soft group-hover:text-brand">
                        <Icon name={mod.icon} className="size-[1.15rem]" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-[0.9875rem] font-semibold text-ink">{mod.name}</span>
                          <Icon name="arrow-up-right" className="size-3.5 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted">{mod.tagline}</span>
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
