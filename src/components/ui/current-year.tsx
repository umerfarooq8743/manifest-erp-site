"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * The prerendered HTML uses a fixed fallback year (no clock access during
 * static rendering, as Cache Components requires); the browser then shows the
 * current year after hydration.
 */
export function CurrentYear({ fallback = 2026 }: { fallback?: number }) {
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => fallback,
  );
  return <span>{year}</span>;
}
