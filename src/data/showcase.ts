import type { ShowcaseScreen } from "@/types/content";

/**
 * The product tour. Every screen is a coded, illustrative mockup built from
 * the product documentation, using fictional sample data.
 * To use real screenshots instead, see README → "Replacing mockups with screenshots".
 */
export const showcaseScreens: ShowcaseScreen[] = [
  { key: "dashboard", title: "Dashboard", module: "Overview", path: "/dashboard", description: "KPIs, My work today, live alerts, customs pipeline, bank balances and billing vs collections." },
  { key: "eta", title: "ETA sheet", module: "Operations", path: "/eta-sheet", description: "Pre-arrival register with document status, duplicate-BL checks and conversion to job files." },
  { key: "job-files", title: "Job files", module: "Operations", path: "/shipment-files", description: "Every shipment with its customs stage, status and assigned staff." },
  { key: "job-file-detail", title: "Job file detail", module: "Operations", path: "/shipment-files/MCF-2026-0142", description: "The central record: next step, workflow checklist, containers and stage history." },
  { key: "customs-board", title: "Customs board", module: "Operations", path: "/operations", description: "Files by customs stage with the update-stage panel and customs log." },
  { key: "documents", title: "Documentation checklist", module: "Operations", path: "/shipment-files/MCF-2026-0142?tab=documents", description: "Required documents, statuses, scans, expiries and generated forms." },
  { key: "transport", title: "Transport & deliveries", module: "Operations", path: "/transport", description: "Gate passes, partial deliveries and empty-container returns." },
  { key: "expenses", title: "Expenses & vouchers", module: "Accounts", path: "/expenses", description: "Vouchers per head with approval of the amount actually paid." },
  { key: "invoices", title: "Invoice editor", module: "Accounts", path: "/billing", description: "Reimbursements and agency lines with tax codes, live totals and draft actions." },
  { key: "soa", title: "Customer SOA", module: "Accounts", path: "/billing?tab=soa", description: "Statement of account with payments, notes and unapplied advance." },
  { key: "banks", title: "Bank accounts", module: "Accounts", path: "/banks", description: "Bank, cash and wallet balances with the account ledger." },
  { key: "reports", title: "Reports catalogue", module: "Accounts", path: "/reports", description: "Searchable finance, operations and team reports with favourites." },
  { key: "report-detail", title: "Report detail", module: "Accounts", path: "/reports/receivables-aging", description: "Full-page report with KPIs, filters, totals and Excel/PDF export." },
  { key: "team", title: "Team & permissions", module: "Workspace", path: "/users", description: "Members, invitations and the role permission matrix." },
  { key: "settings", title: "Company settings", module: "Workspace", path: "/settings/company", description: "Profile, currency, time zone, branding and business rules." },
  { key: "activity", title: "Activity & audit", module: "Workspace", path: "/activity", description: "Who did what and when, with before and after values." },
];
