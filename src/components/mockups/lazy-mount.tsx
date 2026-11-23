"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mounts heavy, decorative children (product mockups) only when they come
 * within `margin` of the viewport. Until then a same-size placeholder keeps
 * the layout stable, which keeps the initial DOM — and hydration — small.
 */
export function LazyMount({ children, aspectRatio, margin = "800px" }: { children: ReactNode; aspectRatio: string; margin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || mounted) return;
    if (typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setMounted(true));
      return () => window.cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted, margin]);

  if (mounted) return <>{children}</>;
  return <div ref={ref} className="bg-m-bg" style={{ aspectRatio }} aria-hidden="true" />;
}
