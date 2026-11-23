"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { mainNav, primaryCta } from "@/data/navigation";
import { buttonClasses } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ThemeMenu, ThemeSegmented } from "@/components/ui/theme-switcher";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  const path = href.split(/[?#]/)[0];
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu when the route changes (adjusting state during render, per React guidance).
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "Tab" && panel) {
        const focusable = [menuButtonRef.current, ...Array.from(panel.querySelectorAll<HTMLElement>("a[href],button:not([disabled])"))].filter(
          (el): el is HTMLElement => Boolean(el),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const onResize = () => window.innerWidth >= 1024 && close(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open ? "border-b border-line bg-canvas/80 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center gap-6">
          <Link href="/" className="rounded-lg">
            <Logo />
          </Link>

          <nav aria-label="Main" className="ml-4 hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-lg px-3 py-2 text-[0.9rem] transition-colors",
                        active ? "bg-surface-2 text-ink dark:bg-surface-3/70" : "text-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <ThemeMenu className="hidden sm:block" />
            <Link href={primaryCta.href} className={buttonClasses({ size: "sm", className: "hidden sm:inline-flex" })}>
              {primaryCta.label}
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => {
                setOpenedAt(pathname);
                setOpen((v) => !v);
              }}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-lg text-ink transition-colors hover:bg-surface-2 lg:hidden"
            >
              {open ? <Icon name="x" className="size-5" /> : <Icon name="menu" className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise become
          the containing block for this fixed panel and collapse it. */}
      <AnimatePresence>
        {open && (
          <m.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 z-30 overflow-y-auto border-t border-line bg-canvas lg:hidden"
          >
            <nav aria-label="Mobile" className="container-page flex min-h-full flex-col py-6">
              <ul className="divide-y divide-line border-y border-line">
                {mainNav.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <m.li
                      key={item.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * i, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => close(false)}
                        aria-current={active ? "page" : undefined}
                        className="group flex items-center justify-between gap-4 py-4"
                      >
                        <span>
                          <span className={cn("block text-lg font-medium tracking-tight", active ? "text-brand" : "text-ink")}>{item.label}</span>
                          {item.description && <span className="mt-0.5 block text-sm text-muted">{item.description}</span>}
                        </span>
                        <Icon name="arrow-right" className="size-4 text-muted transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </m.li>
                  );
                })}
              </ul>
              <div className="mt-8 flex flex-col gap-3">
                <Link href={primaryCta.href} onClick={() => close(false)} className={buttonClasses({ size: "lg", className: "w-full" })}>
                  {primaryCta.label}
                </Link>
              </div>
              <div className="mt-auto flex items-center justify-between gap-4 pt-10">
                <span className="text-sm text-muted">Appearance</span>
                <ThemeSegmented />
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
