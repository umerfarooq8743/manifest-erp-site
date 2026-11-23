import type { ScreenKey } from "@/types/content";
import { cn } from "@/lib/utils";
import { DashboardScreen } from "./screens/dashboard";
import { LazyProductMockup } from "./lazy-product-mockup";
import { mockupFrameClass, mockupLabel } from "./screen-labels";

/**
 * An illustrative, coded mockup of a Manifest ERP screen, scaled by CSS
 * container units (designed on a 1280px canvas).
 *
 * - `eager` (above the fold, e.g. the hero): rendered on the server as HTML.
 * - otherwise: delegated to <LazyProductMockup>, which loads the screen from a
 *   shared on-demand chunk as it nears the viewport — keeping it out of the
 *   initial HTML and page payload.
 *
 * `crop` zooms into the working area on phones (sidebar hidden) for legibility.
 * Only the dashboard is rendered eagerly today; add other screens here if needed.
 */
export function ProductMockup({
  screen,
  variant,
  className,
  crop = false,
  eager = false,
}: {
  screen: ScreenKey;
  variant?: "finance";
  className?: string;
  crop?: boolean;
  eager?: boolean;
}) {
  if (!eager || screen !== "dashboard") {
    return <LazyProductMockup screen={screen} variant={variant} crop={crop} className={className} />;
  }
  return (
    <div data-mock-crop={crop ? "" : undefined} role="img" aria-label={mockupLabel(screen, variant)} className={cn(mockupFrameClass, className)}>
      <div className="mock-viewport mock-viewport-cv">
        <DashboardScreen variant={variant === "finance" ? "finance" : "overview"} />
      </div>
    </div>
  );
}
