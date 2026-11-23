import type { ReactNode } from "react";
import { site } from "@/data/site";
import { PageHero } from "./page-hero";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

export function LegalPage({ crumb, title, intro, sections }: { crumb: string; title: string; intro: string; sections: LegalSection[] }) {
  const updated = new Date(`${site.legalUpdated}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  return (
    <>
      <PageHero crumb={crumb} eyebrow="Legal" title={title} description={intro} />
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[14rem_1fr] lg:gap-16 lg:py-20">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">On this page</p>
            <ul className="mt-4 space-y-2 border-l border-line">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-muted transition-colors hover:border-ink hover:text-ink">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <article className="max-w-3xl">
          <p className="text-sm text-muted">Last updated: {updated}</p>
          <div className="mt-8 space-y-10">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24">
                <h2 id={`${s.id}-title`} className="text-xl font-semibold tracking-tight text-ink">
                  {i + 1}. {s.title}
                </h2>
                <div className="mt-3 space-y-3 text-[0.9875rem] leading-relaxed text-ink-2 [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
          <p className="mt-12 rounded-2xl border border-line bg-surface p-5 text-sm leading-relaxed text-muted">
            This page describes how this marketing website works. It is provided for transparency and should be reviewed by qualified counsel before it is relied upon as a legal document.
          </p>
        </article>
      </div>
    </>
  );
}
