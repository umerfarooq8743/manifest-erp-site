import { benefits, industries, marketContext } from "@/data/marketing";
import { Icon } from "@/components/ui/icon";
import { IconTile } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

export function Benefits() {
  return (
    <Section id="benefits" labelledBy="benefits-title">
      <SectionHeading
        id="benefits-title"
        eyebrow="Business value"
        title="What changes when every record is connected."
        description="Not promises of percentages — the practical differences a connected platform makes to daily work."
      />
      <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
        {benefits.map((b, i) => (
          <Reveal as="li" key={b.title} delay={(i % 5) * 0.04} className="border-t border-line pt-5">
            <Icon name={b.icon} className="size-5 text-brand" strokeWidth={1.75} />
            <p className="mt-3 text-[0.9375rem] font-semibold text-ink">{b.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.description}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export function Industries() {
  return (
    <Section id="industries" tone="muted" labelledBy="industries-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            id="industries-title"
            eyebrow="Who it’s for"
            title="Made for clearing and forwarding."
            description="Manifest ERP is purpose-built for businesses that move goods through customs — not a generic ERP with a logistics add-on."
          />
          <Reveal className="mt-8 rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-center gap-2">
              <Icon name="map-pin" className="size-4 text-brand" />
              <p className="text-sm font-semibold text-ink">{marketContext.title}</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{marketContext.body}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {marketContext.ports.map((port) => (
                <li key={port} className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs text-ink-2">
                  <Icon name="anchor" className="size-3 text-muted" />
                  {port}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted">{marketContext.note}</p>
          </Reveal>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {industries.map((ind, i) => (
            <Reveal as="li" key={ind.title} delay={i * 0.05} className="card flex flex-col p-6">
              <IconTile name={ind.icon} size="lg" />
              <h3 className="text-h3 mt-5">{ind.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{ind.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
