/**
 * Brand & site configuration — the single place to change the product name,
 * tagline, production domain, logo paths and social profiles.
 *
 * Production URL: set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://www.example.com).
 * On Vercel the production domain is detected automatically when it is not set.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Manifest ERP",
  shortName: "Manifest",
  tagline: "Every shipment, accounted for.",
  /** Used for meta descriptions and the footer. */
  description:
    "Manifest ERP is a multi-company ERP for customs-clearing agents and freight forwarders. Track arrivals, run job files through the customs workflow, manage transport, vouchers, billing and statements of account — all linked to one job file.",
  shortDescription:
    "The connected ERP for customs clearing and freight forwarding — from bill of lading to billed, paid and closed.",
  url: resolveSiteUrl(),
  locale: "en_US",
  /** Primary market context, used in copy and structured data. */
  market: "Pakistan — Karachi Port, Port Qasim and dry ports",
  keywords: [
    "customs clearing ERP",
    "freight forwarding ERP",
    "clearing and forwarding software",
    "job file management",
    "customs workflow management",
    "logistics ERP Pakistan",
    "shipment tracking software",
    "freight operations management",
    "logistics management software",
  ],
  logo: {
    mark: "/logos/manifest-mark.svg",
    icon192: "/icons/icon-192.png",
    icon512: "/icons/icon-512.png",
  },
  /** Legal entity shown in the footer and legal pages. Replace with the registered business name. */
  legalName: "Manifest ERP",
  /**
   * Social profiles — leave empty until the official profiles exist.
   * Only filled entries are rendered (footer + structured data).
   */
  social: [] as { label: string; href: string }[],
  /**
   * Animated logo intro shown on the first page view of a browser session
   * (and on demand with ?splash). Set to false to turn it off completely.
   */
  introSplash: true,
  /** Last review date for the Privacy Policy and Terms (ISO date). */
  legalUpdated: "2026-11-23",
} as const;

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
