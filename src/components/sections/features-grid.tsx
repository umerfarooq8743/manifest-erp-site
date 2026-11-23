import Link from "next/link";
import { featureGroups, features } from "@/data/features";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { IconTile } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import type { Feature } from "@/types/content";

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <Reveal as="li" delay={(index % 3) * 0.05} className="card card-hover group relative flex flex-col p-6">
      <IconTile name={feature.icon} />
      <h3 className="text-h3 mt-5">{feature.title}</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{feature.description}</p>
      <p className="mt-4 flex gap-2 border-t border-line pt-4 text-sm leading-relaxed text-ink-2">
        <Icon name="sparkles" className="mt-0.5 size-4 shrink-0 text-brand" />
        <span>
          <span className="sr-only">Why it matters: </span>
          {feature.benefit}
        </span>
      </p>
      <Link
        href={`/modules#${feature.moduleId}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand after:absolute after:inset-0 after:rounded-2xl after:content-['']"
      >
        Explore the module
        <span className="sr-only">: {feature.title}</span>
        <Icon name="arrow-right" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </Reveal>
  );
}

/** Full grid grouped by area (features page) or a highlight selection (home). */
export function FeaturesGrid({ variant = "highlights" }: { variant?: "highlights" | "full" }) {
  if (variant === "full") {
    return (
      <div className="space-y-20">
        {featureGroups.map((group) => {
          const items = features.filter((f) => f.group === group.id);
          return (
            <section key={group.id} aria-labelledby={`features-${group.id}`}>
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <h2 id={`features-${group.id}`} className="text-2xl font-semibold tracking-tight">
                  {group.title}
                </h2>
                <p className="text-sm text-muted">{group.description}</p>
              </div>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((f, i) => (
                  <FeatureCard key={f.id} feature={f} index={i} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    );
  }

  const highlightIds = ["job-files", "customs", "documents", "vouchers", "invoices", "soa", "reports", "rbac", "activity"];
  const items = highlightIds.map((id) => features.find((f) => f.id === id)).filter((f): f is Feature => Boolean(f));
  return (
    <Section id="features" labelledBy="features-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="features-title"
          eyebrow="Capabilities"
          title="Every capability earns its place."
          description="Each feature exists because a clearing desk needs it — and each one connects back to the job file."
        />
        <ButtonLink href="/features" variant="secondary" icon="arrow-right" className="self-start lg:self-auto">
          All {features.length} capabilities
        </ButtonLink>
      </div>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f, i) => (
          <FeatureCard key={f.id} feature={f} index={i} />
        ))}
      </ul>
    </Section>
  );
}
