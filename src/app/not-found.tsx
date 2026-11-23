import type { Metadata } from "next";
import Link from "next/link";
import { mainNav } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-page max-w-2xl text-center">
        <p className="font-mono text-sm text-brand">404 · job file not found</p>
        <h1 id="nf-title" className="text-h2 mt-4">
          This page has left port.
        </h1>
        <p className="text-lead mx-auto mt-4 max-w-md">The page you’re looking for doesn’t exist or has moved. Try one of these instead.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" icon="arrow-right">
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact the team
          </ButtonLink>
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-2">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink-2 hover:text-ink">
                {item.label}
                <Icon name="arrow-up-right" className="size-3" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
