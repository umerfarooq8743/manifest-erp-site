import type { NavGroup, NavLink } from "@/types/content";

export const mainNav: NavLink[] = [
  { label: "Product", href: "/features", description: "Capabilities and business benefits" },
  { label: "Modules", href: "/modules", description: "Every screen, from ETA to SOA" },
  { label: "Solutions", href: "/solutions", description: "Industries, roles and scenarios" },
  { label: "Workflow", href: "/workflow", description: "BL to job-file closure" },
  { label: "Security", href: "/security", description: "Isolation, access and architecture" },
  { label: "About", href: "/about", description: "Why Manifest ERP exists" },
  { label: "Contact", href: "/contact", description: "Talk to the team" },
];

export const primaryCta: NavLink = { label: "Request a Demo", href: "/contact?inquiry=demo#inquiry" };
export const secondaryCta: NavLink = { label: "Explore Platform", href: "/#product-tour" };

export const footerNav: NavGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Product tour", href: "/#product-tour" },
      { label: "Dashboard", href: "/#dashboard" },
      { label: "Reports", href: "/features#reports" },
      { label: "Workflow", href: "/workflow" },
    ],
  },
  {
    title: "Modules",
    links: [
      { label: "ETA management", href: "/modules#eta" },
      { label: "Job files", href: "/modules#job-files" },
      { label: "Customs workflow", href: "/modules#customs" },
      { label: "Billing & invoices", href: "/modules#billing" },
      { label: "Payments & SOA", href: "/modules#payments-soa" },
      { label: "All modules", href: "/modules" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Customs clearing", href: "/solutions#industries" },
      { label: "Freight forwarding", href: "/solutions#industries" },
      { label: "Roles & journeys", href: "/solutions#roles" },
      { label: "Illustrative scenarios", href: "/solutions#scenarios" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Security", href: "/security" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
];

/** Routes listed in the sitemap, with relative priority. */
export const sitemapRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/features", priority: 0.9 },
  { path: "/modules", priority: 0.9 },
  { path: "/workflow", priority: 0.85 },
  { path: "/solutions", priority: 0.8 },
  { path: "/security", priority: 0.75 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];
