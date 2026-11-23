import type { Metadata } from "next";
import { Suspense } from "react";
import { configuredContactMethods } from "@/data/contact";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { Icon } from "@/components/ui/icon";
import { PageHero } from "@/components/sections/page-hero";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactHub, ContactHubFromParams } from "@/components/forms/contact-hub";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Request a Demo",
  description:
    "Request a Manifest ERP demo or ask a question. Send your inquiry through WhatsApp — the team will follow up to arrange a walkthrough of job files, customs workflow, billing and reports.",
  path: "/contact",
});

const STEPS = [
  { title: "Send your inquiry", text: "Fill in the form. It opens WhatsApp with your message ready to review and send." },
  { title: "We get in touch", text: "The team replies to understand your operation and agree a time." },
  { title: "See your workflow", text: "A walkthrough focused on the modules that matter to your business." },
];

export default function ContactPage() {
  const methods = configuredContactMethods();
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Contact"
        title="Let’s talk about your clearing desk."
        description="Request a demo, ask a product question or start a partnership conversation. Every form opens WhatsApp with your details filled in — nothing is stored on this website."
      />

      <section id="inquiry" aria-label="Contact options and inquiry form" className="scroll-mt-20 py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-14">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-ink">Reach the team</h2>
              {methods.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {methods.map((m) => (
                    <li key={m.id}>
                      <a
                        href={m.href}
                        {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="card card-hover flex items-center gap-4 p-4"
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                          <Icon name={m.icon} className="size-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-ink">{m.label}</span>
                          <span className="block truncate text-sm text-ink-2">{m.value}</span>
                          <span className="block text-xs text-muted">{m.hint}</span>
                        </span>
                        <Icon name="arrow-up-right" className="ml-auto size-4 text-muted" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-line-strong p-5">
                  <p className="flex items-center gap-2 text-sm font-medium text-ink">
                    <Icon name="info" className="size-4 text-muted" />
                    Direct contact details are being finalised
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Verified WhatsApp, email and phone details will appear here once they’re published. Until then, please check back soon.
                  </p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight text-ink">What happens next</h2>
              <ol className="mt-5 space-y-5">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-brand/30 bg-brand-soft font-mono text-xs text-brand">{i + 1}</span>
                    <div>
                      <p className="text-[0.9375rem] font-semibold text-ink">{s.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Icon name="lock" className="size-4 text-brand" />
                Your privacy
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                This website has no database and doesn’t store form submissions. Your message only leaves your device when you choose to send it in WhatsApp.
              </p>
            </div>
          </div>

          <Suspense fallback={<ContactHub />}>
            <ContactHubFromParams />
          </Suspense>
        </div>
      </section>

      <FaqSection />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </>
  );
}
