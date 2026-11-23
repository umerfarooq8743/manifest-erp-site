import type { Metadata } from "next";
import { pillars } from "@/data/marketing";
import { primaryCta } from "@/data/navigation";
import { site } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { IconTile } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { PageHero } from "@/components/sections/page-hero";
import { SolutionHub } from "@/components/sections/solution-hub";
import { Industries } from "@/components/sections/benefits-industries";
import { TechStack } from "@/components/sections/tech-stack";
import { Trust } from "@/components/sections/trust";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = pageMetadata({
  title: "About Manifest ERP",
  description:
    "Why Manifest ERP exists: a multi-company ERP for customs-clearing agents and freight forwarders that puts every shipment — documents, customs stages, transport and money — under one job-file number.",
  path: "/about",
});

const PRINCIPLES: { title: string; text: string; icon: IconName }[] = [
  { title: "One record per shipment", text: "Everything about a shipment belongs to its job file, so nobody has to reconcile parallel versions of the truth.", icon: "folder-kanban" },
  { title: "Status from facts, not typing", text: "File statuses follow stages, deliveries and invoice approval. Manual changes are limited and audited.", icon: "workflow" },
  { title: "Money rules that hold", text: "Closed periods stay closed, invoice lines keep the rate they were billed at, and money documents can’t be double-processed.", icon: "scale" },
  { title: "Access by role", text: "Each person sees and changes what their job needs — checked on the server for every request.", icon: "shield-check" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About Manifest ERP"
        title={site.tagline}
        description="Manifest ERP is a multi-company ERP for customs-clearing agents and freight forwarders — from the moment a bill of lading arrives to the day the job file is billed, paid and closed."
      >
        <ButtonLink href={primaryCta.href} icon="arrow-right">
          {primaryCta.label}
        </ButtonLink>
      </PageHero>

      <Section id="why" labelledBy="why-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <SectionHeading
            id="why-title"
            eyebrow="Why it exists"
            title="Clearing work is connected. The software should be too."
            description="For every import shipment, a clearing agent collects documents from the client, files a Goods Declaration with customs, pays duty, takes delivery orders from the shipping line, arranges transport, returns empty containers, records every rupee spent and finally bills the client."
          >
            <p className="mt-5 text-[0.9875rem] leading-relaxed text-ink-2">
              When each of those steps lives in a different spreadsheet, inbox or chat group, status gets lost, expenses go unbilled and month-end becomes a reconstruction exercise. Manifest ERP puts all of it under one job-file number — and lets many companies run on one installation, each with its own team, numbering, settings and branding.
            </p>
          </SectionHeading>
          <ul className="grid gap-4">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.05} className="card flex gap-5 p-6">
                <IconTile name={p.icon} size="lg" />
                <div>
                  <h3 className="text-h3">{p.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="principles" tone="muted" labelledBy="principles-title">
        <SectionHeading id="principles-title" eyebrow="Product principles" title="How Manifest ERP is designed." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 2) * 0.05} className="card flex gap-5 p-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon name={p.icon} className="size-5" />
              </span>
              <div>
                <h3 className="text-h3">{p.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <SolutionHub />
      <Industries />
      <TechStack />
      <Trust />
      <CtaBand />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
    </>
  );
}
