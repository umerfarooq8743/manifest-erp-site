import type { Metadata } from "next";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { AboutIntro } from "@/components/sections/about-intro";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { SolutionHub } from "@/components/sections/solution-hub";
import { WorkflowSection } from "@/components/sections/workflow-section";
import { ProductTourSection } from "@/components/sections/product-tour-section";
import { DashboardShowcase } from "@/components/sections/dashboard-showcase";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { ModulesOverview } from "@/components/sections/modules-overview";
import { RolesSection } from "@/components/sections/roles-section";
import { ReportsShowcase } from "@/components/sections/reports-showcase";
import { Benefits, Industries } from "@/components/sections/benefits-industries";
import { SecurityControls } from "@/components/sections/security";
import { Comparison } from "@/components/sections/comparison";
import { Scenarios } from "@/components/sections/scenarios";
import { Trust } from "@/components/sections/trust";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Customs Clearing & Freight Forwarding ERP`,
  description:
    "Manifest ERP connects ETA tracking, job files, a 14-stage customs workflow, transport, vouchers, billing and statements of account in one multi-company platform for clearing and forwarding businesses in Pakistan.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <ProblemSolution />
      <SolutionHub />
      <WorkflowSection />
      <ProductTourSection />
      <DashboardShowcase />
      <FeaturesGrid />
      <ModulesOverview />
      <RolesSection />
      <ReportsShowcase />
      <Benefits />
      <Industries />
      <SecurityControls variant="teaser" />
      <Comparison />
      <Scenarios />
      <Trust />
      <FaqSection withSchema />
      <CtaBand />
    </>
  );
}
