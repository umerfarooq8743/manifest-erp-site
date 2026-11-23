"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One IntersectionObserver for every [data-reveal] element on the page,
 * re-armed after client-side navigation. It only flips a data attribute —
 * the fade itself is a CSS transition, so no layout is read or forced.
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    if (!document.documentElement.classList.contains("js-reveal")) return;
    const pending = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    if (!pending.length) return;

    const finish = (el: HTMLElement) => el.setAttribute("data-revealed", "done");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target;
          if (!entry.isIntersecting || !(el instanceof HTMLElement)) continue;
          observer.unobserve(el);
          el.setAttribute("data-revealed", "animating");
          const delay = parseFloat(el.style.getPropertyValue("--reveal-delay") || "0") * 1000;
          window.setTimeout(() => finish(el), 700 + delay);
        }
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.12 },
    );
    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
