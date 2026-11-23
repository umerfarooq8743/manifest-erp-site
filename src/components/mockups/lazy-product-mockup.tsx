"use client";

import dynamic from "next/dynamic";
import type { ScreenKey } from "@/types/content";
import { cn } from "@/lib/utils";
import { LazyMount } from "./lazy-mount";
import { MOCK_ASPECT, mockupFrameClass, mockupLabel } from "./screen-labels";

const Placeholder = () => <div className="bg-m-bg" style={{ aspectRatio: MOCK_ASPECT }} />;

/** All screens live in one on-demand chunk, shared by every page and cached after first use. */
const ScreenRenderer = dynamic(() => import("./screen-renderer"), { ssr: false, loading: Placeholder });

/**
 * A product mockup that is neither in the HTML nor in the page payload: it
 * loads and mounts as it approaches the viewport. The labelled frame is
 * rendered immediately so layout and accessibility are stable.
 */
export function LazyProductMockup({
  screen,
  variant,
  crop = false,
  className,
  immediate = false,
}: {
  screen: ScreenKey;
  variant?: "finance";
  crop?: boolean;
  className?: string;
  /** Skip the viewport check (e.g. inside an open lightbox). */
  immediate?: boolean;
}) {
  const renderer = <ScreenRenderer screen={screen} variant={variant} />;
  return (
    <div data-mock-crop={crop ? "" : undefined} role="img" aria-label={mockupLabel(screen, variant)} className={cn(mockupFrameClass, className)}>
      <div className="mock-viewport">{immediate ? renderer : <LazyMount aspectRatio={MOCK_ASPECT}>{renderer}</LazyMount>}</div>
    </div>
  );
}
