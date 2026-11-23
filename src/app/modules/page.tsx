import type { Metadata } from "next";
import Link from "next/link";
import { moduleCategories, modules } from "@/data/modules";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { ProductMockup } from "@/components/mockups/product-mockup";
import { Icon } from "@/components/ui/icon";
import { CheckList, IconTile, IllustrativeTag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Modules — From ETA Sheet to Statement of Account",
  description:
    "Explore all 16 Manifest ERP modules: dashboard, ETA management, job files, customs workflow, documentation, transport, expenses, billing, payments & SOA, banks, reports, masters, team & access, activity, company settings and platform administration.",
  path: "/modules",
});

export default function ModulesPage() {
  return (
    <>
      <PageHero
        crumb="Modules"
        eyebrow="Modules"
        title="Sixteen modules. One shared record."
        description="Every module reads and writes the same job files, clients and accounts. Here is what each one does — and the screen your team would use."
      />

      <nav aria-label="Modules" className="sticky top-16 z-30 border-b border-line bg-canvas/85 backdrop-blur-xl">
        <div className="container-page">
          <ul className="scrollbar-none -mx-5 flex gap-1 overflow-x-auto px-5 py-2.5 sm:mx-0 sm:px-0">
            {modules.map((mod) => (
              <li key={mod.id} className="shrink-0">
                <a href={`#${mod.id}`} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-ink">
                  <Icon name={mod.icon} className="size-3.5" />
                  {mod.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {moduleCategories.map((category) => (
        <section key={category} aria-labelledby={`cat-${category}`} className="border-b border-line py-16 sm:py-20">
          <div className="container-page">
            <h2 id={`cat-${category}`} className="eyebrow">
              {category}
            </h2>
            <div className="mt-10 space-y-20 sm:space-y-24">
              {modules
                .filter((m) => m.category === category)
                .map((mod, i) => (
                  <article key={mod.id} id={mod.id} aria-labelledby={`${mod.id}-title`} className="scroll-mt-32">
                    <div
                      className={cn(
                        "grid items-start gap-10 lg:gap-14",
                        mod.screen && i % 2 === 1 ? "lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.8fr)]" : "lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)]",
                      )}
                    >
                      <Reveal className={cn(mod.screen && i % 2 === 1 && "lg:order-2")}>
                        <IconTile name={mod.icon} size="lg" />
                        <h3 id={`${mod.id}-title`} className="mt-5 text-[1.75rem] font-semibold leading-tight tracking-tight text-ink">
                          {mod.name}
                        </h3>
                        <p className="mt-2 text-lg text-brand">{mod.tagline}</p>
                        <p className="mt-4 text-[0.9875rem] leading-relaxed text-ink-2">{mod.summary}</p>
                        <CheckList items={mod.capabilities} className="mt-6" />
                        <div className="mt-6 rounded-2xl border border-line bg-surface p-4">
                          <p className="text-xs font-medium uppercase tracking-wider text-muted">Why it matters</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-ink">{mod.value}</p>
                        </div>
                      </Reveal>
                      {mod.screen ? (
                        <Reveal delay={0.08} className={cn("min-w-0 lg:sticky lg:top-36", i % 2 === 1 && "lg:order-1")}>
                          <ProductMockup screen={mod.screen} crop />
                          <IllustrativeTag className="mt-4" />
                        </Reveal>
                      ) : (
                        <Reveal delay={0.08} className="rounded-3xl border border-dashed border-line-strong p-8">
                          <p className="text-sm font-semibold text-ink">{mod.id === "platform" ? "Separate from every company workspace" : "Used by every form in the product"}</p>
                          <p className="mt-2 text-sm leading-relaxed text-muted">
                            {mod.id === "platform"
                              ? "The platform console is reserved for the operator of the installation. It is described here at a high level only."
                              : "Masters are created with sensible defaults for every new company and can be extended by authorised staff."}
                          </p>
                          <Link href="/contact?inquiry=product#inquiry" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                            Ask about {mod.name.toLowerCase()} <Icon name="arrow-right" className="size-3.5" />
                          </Link>
                        </Reveal>
                      )}
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>
      ))}

      <CtaBand title="Want to see a module in action?" description="We’ll walk you through the modules that matter most to your team, using your own workflow as the example." />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Modules", path: "/modules" }])} />
    </>
  );
}
