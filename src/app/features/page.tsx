import type { Metadata } from "next";
import { primaryCta } from "@/data/navigation";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/sections/page-hero";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { DashboardShowcase } from "@/components/sections/dashboard-showcase";
import { ReportsShowcase } from "@/components/sections/reports-showcase";
import { Benefits } from "@/components/sections/benefits-industries";
import { Comparison } from "@/components/sections/comparison";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = pageMetadata({
  title: "Features — Job Files, Customs, Billing & Reports",
  description:
    "Every Manifest ERP capability with its business benefit: multi-company management, job-file tracking, ETA management, customs workflow, documents, transport, vouchers, invoices, payments, SOA, banks, reports and access control.",
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        crumb="Product"
        eyebrow="Product features"
        title="Everything a clearing desk needs — connected."
        description="Eighteen capabilities across operations, finance and control. Each one is explained by what it does and why it matters to your business."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={primaryCta.href} icon="arrow-right">
            {primaryCta.label}
          </ButtonLink>
          <ButtonLink href="/modules" variant="secondary">
            Browse modules
          </ButtonLink>
        </div>
      </PageHero>
      <Section labelledBy="features-full-title">
        <h2 id="features-full-title" className="sr-only">
          All capabilities
        </h2>
        <FeaturesGrid variant="full" />
      </Section>
      <DashboardShowcase />
      <ReportsShowcase detailed />
      <Benefits />
      <Comparison />
      <CtaBand />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Features", path: "/features" }])} />
    </>
  );
}
