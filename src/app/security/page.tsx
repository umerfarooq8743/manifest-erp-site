import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { SecurityControls, Architecture } from "@/components/sections/security";
import { TechStack } from "@/components/sections/tech-stack";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = pageMetadata({
  title: "Security & Architecture",
  description:
    "How Manifest ERP protects company data: tenant isolation on every query, server-side role permissions, two-factor authentication, rotating sessions, signed file links, audit history and accounting-period locking.",
  path: "/security",
});

export default function SecurityPage() {
  return (
    <>
      <PageHero
        crumb="Security"
        eyebrow="Security & architecture"
        title="Built so each company’s data stays its own."
        description="Company isolation, access control and accountability are enforced on the server for every request. Here is how — in business terms first, technical detail second."
      />
      <SecurityControls />
      <Architecture />
      <TechStack />
      <FaqSection />
      <CtaBand title="Have security questions for your review?" description="We’re happy to walk your team through access control, data isolation and audit history during a demo." />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Security", path: "/security" }])} />
    </>
  );
}
