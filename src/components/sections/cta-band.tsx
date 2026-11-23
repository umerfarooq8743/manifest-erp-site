import { primaryCta } from "@/data/navigation";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";

export function CtaBand({
  title = "See your workflow in Manifest ERP.",
  description = "Book a walkthrough built around how your team clears and forwards today — from ETA tracking to billing and statements of account.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-14 text-center shadow-elevated sm:px-12 sm:py-20">
          <div className="bg-glow pointer-events-none absolute inset-0 -z-10 opacity-90" aria-hidden="true" />
          <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,#000_20%,transparent_75%)]" aria-hidden="true" />
          <LogoMark className="mx-auto size-12" />
          <h2 id="cta-title" className="text-h2 mx-auto mt-6 max-w-2xl">
            {title}
          </h2>
          <p className="text-lead mx-auto mt-4 max-w-xl">{description}</p>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={primaryCta.href} size="lg" icon="arrow-right">
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href="/contact?inquiry=product#inquiry" size="lg" variant="secondary">
              Ask a product question
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-muted">{site.tagline}</p>
        </Reveal>
      </div>
    </section>
  );
}
