import Link from "next/link";
import { configuredContactMethods } from "@/data/contact";
import { footerNav } from "@/data/navigation";
import { site } from "@/data/site";
import { CurrentYear } from "@/components/ui/current-year";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";

export function SiteFooter() {
  const methods = configuredContactMethods();
  return (
    <footer className="relative border-t border-line bg-surface/60 dark:bg-surface/30">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_2fr]">
          <div className="max-w-sm">
            <Link href="/" className="inline-block rounded-lg">
              <Logo />
            </Link>
            <p className="mt-5 text-[0.95rem] font-medium text-ink">{site.tagline}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{site.shortDescription}</p>
            {methods.length > 0 && (
              <ul className="mt-6 space-y-2.5" aria-label="Contact">
                {methods.map((method) => (
                  <li key={method.id}>
                    <a
                      href={method.href}
                      {...(method.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex items-center gap-2.5 text-sm text-ink-2 transition-colors hover:text-brand"
                    >
                      <Icon name={method.icon} className="size-4 text-muted" />
                      <span className="sr-only">{method.label}: </span>
                      {method.value}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {site.social.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-4" aria-label="Social profiles">
                {site.social.map((profile) => (
                  <li key={profile.href}>
                    <a href={profile.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-ink">
                      {profile.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted">{group.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}`}>
                      <Link href={link.href} className="text-sm text-ink-2 transition-colors hover:text-ink">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {site.legalName}. All rights reserved.
          </p>
          <p className="max-w-xl text-xs leading-relaxed sm:text-right">
            Product screens on this site are illustrative previews with fictional sample data.
          </p>
        </div>
      </div>
    </footer>
  );
}
