import type { Metadata } from "next";
import { primaryCta } from "@/data/navigation";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { Industries } from "@/components/sections/benefits-industries";
import { RolesSection } from "@/components/sections/roles-section";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { Scenarios } from "@/components/sections/scenarios";
import { Trust } from "@/components/sections/trust";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = pageMetadata({
  title: "Solutions for Clearing & Forwarding Businesses",
  description:
    "How Manifest ERP serves customs-clearing agents, freight forwarders and clearing & forwarding houses in Pakistan — with role-based journeys for admins, operations, accounts, transport and read-only users.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumb="Solutions"
        eyebrow="Solutions"
        title="For the businesses that move goods through customs."
        description="Manifest ERP is purpose-built for clearing and forwarding — and organised around the people who do the work, from the owner to the transport desk."
      >
        <ButtonLink href={primaryCta.href} icon="arrow-right">
          {primaryCta.label}
        </ButtonLink>
      </PageHero>
      <div id="industries-anchor" />
      <Industries />
      <RolesSection />
      <ProblemSolution />
      <Scenarios all />
      <Trust />
      <CtaBand />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions" }])} />
    </>
  );
}
