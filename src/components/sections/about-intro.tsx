import { pillars } from "@/data/marketing";
import { Section, SectionHeading } from "@/components/ui/section";
import { IconTile } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

export function AboutIntro() {
  return (
    <Section id="about" labelledBy="about-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <SectionHeading
          id="about-title"
          eyebrow="What is Manifest ERP"
          title="Built around the job file — the way clearing work actually moves."
          description="A clearing agent handles hundreds of import shipments. For each one the team collects documents, files the GD, pays duty, takes delivery orders, arranges transport, returns empty containers, records every rupee spent and finally bills the client. Manifest ERP puts all of it under one job-file number."
        >
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
            It serves customs-clearing agents and freight forwarders — primarily at Karachi Port, Port Qasim and the dry ports — and runs many isolated companies on one installation.
          </p>
        </SectionHeading>
        <ul className="grid gap-4">
          {pillars.map((pillar, i) => (
            <Reveal as="li" key={pillar.title} delay={i * 0.06} className="card card-hover flex gap-5 p-6">
              <IconTile name={pillar.icon} size="lg" />
              <div>
                <h3 className="text-h3">{pillar.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
