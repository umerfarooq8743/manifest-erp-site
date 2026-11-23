import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";

export function PageHero({
  eyebrow,
  title,
  description,
  crumb,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  crumb: string;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden border-b border-line pb-16 pt-12 sm:pb-20 sm:pt-16">
      <div className="bg-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="animate-fade-in">
          <ol className="flex items-center gap-1.5 text-sm text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <Icon name="chevron-right" className="size-3.5" />
            </li>
            <li aria-current="page" className="text-ink-2">
              {crumb}
            </li>
          </ol>
        </nav>
        <div className="mt-8 max-w-3xl">
          <p className="eyebrow animate-fade-up">{eyebrow}</p>
          <h1 id="page-title" className="text-display mt-4 !text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)]">
            {title}
          </h1>
          <p className="text-lead mt-5 max-w-2xl">
            {description}
          </p>
          {children && (
            <div className="animate-fade-up mt-8" style={{ animationDelay: "180ms" }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
