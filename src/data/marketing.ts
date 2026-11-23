import type { ComparisonRow, IconItem, Problem } from "@/types/content";

export const hero = {
  eyebrow: "ERP for customs clearing & freight forwarding",
  headline: ["Every shipment. Every operation.", "One connected platform."],
  subheadline:
    "Manage customs clearance, freight forwarding, documentation, transport and finances in one ERP — every voucher, invoice and stage move linked to the job file it belongs to.",
  points: ["Multi-company by design", "14-stage customs board", "Billing & SOA built in"],
};

export const pillars: IconItem[] = [
  {
    title: "One job file per shipment",
    description: "BL, containers, documents, customs stages, transport, expenses and invoices — all under one job-file number.",
    icon: "folder-kanban",
  },
  {
    title: "Operations and accounts, connected",
    description: "Vouchers raised in the field become invoice lines; payments update the statement of account and the bank ledger.",
    icon: "link",
  },
  {
    title: "Built for many companies",
    description: "One installation serves many isolated companies, each with its own team, numbering, settings and branding.",
    icon: "building",
  },
];

export const problems: Problem[] = [
  {
    title: "Shipment information is scattered",
    description: "BL details sit in e-mail, container numbers in a spreadsheet, stage updates in chat groups.",
    solution: "One job file holds the BL, containers, documents, stages, transport and money.",
    icon: "layers",
  },
  {
    title: "Job-file progress is hard to see",
    description: "Knowing which files are waiting on GD, assessment or D/O means asking around.",
    solution: "The customs board shows every file by stage, with the reference and responsible person.",
    icon: "eye",
  },
  {
    title: "Documents go missing or expire",
    description: "A missing FI or a lapsed NOC is often discovered at the worst possible moment.",
    solution: "Document checklists, required-document rules and expiry alerts flag gaps early.",
    icon: "file-stack",
  },
  {
    title: "Operations and accounts drift apart",
    description: "Field expenses reach accounts late — or never — and invoices are rebuilt by hand.",
    solution: "Approved billable vouchers flow straight into the job file's invoice.",
    icon: "arrow-left-right",
  },
  {
    title: "Expenses and billing are hard to reconcile",
    description: "Advances, partial payments and withholding tax make client balances hard to trust.",
    solution: "Payments, advances, notes and WHT post to one statement of account per client.",
    icon: "scale",
  },
  {
    title: "Management visibility is limited",
    description: "Profit per file, receivables and workload are assembled manually at month-end.",
    solution: "A role-aware dashboard and live reports with Excel and PDF export.",
    icon: "chart-column",
  },
  {
    title: "Nobody knows who changed what",
    description: "When a figure changes, finding out who did it and why takes an investigation.",
    solution: "The activity log records who, what, when — with before and after values.",
    icon: "activity",
  },
];

/** Nodes around the job-file hub in the solution diagram. */
export const solutionNodes: { label: string; detail: string; icon: IconItem["icon"] }[] = [
  { label: "ETA & BL", detail: "Arrival, carrier, containers", icon: "calendar-clock" },
  { label: "Documents", detail: "Checklist, scans, expiries", icon: "file-stack" },
  { label: "Customs", detail: "14 stages with a dated log", icon: "workflow" },
  { label: "Pay orders", detail: "D/O, terminal, deposits", icon: "landmark" },
  { label: "Transport", detail: "Gate passes, deliveries", icon: "truck" },
  { label: "Vouchers", detail: "Expenses per head", icon: "wallet" },
  { label: "Invoices", detail: "Reimbursements + agency", icon: "receipt" },
  { label: "SOA", detail: "Payments, advances, notes", icon: "scroll-text" },
  { label: "Reports", detail: "Live, exportable", icon: "chart-column" },
  { label: "Activity", detail: "Who, what, when", icon: "activity" },
];

export const benefits: IconItem[] = [
  { title: "Better shipment visibility", description: "Every file's stage, documents and deliveries are visible to the people who need them.", icon: "eye" },
  { title: "More connected operations", description: "ETA, job file, customs and transport share one record instead of passing notes.", icon: "link" },
  { title: "Improved workflow coordination", description: "Next-step cards, stage owners and alerts keep work moving between desks.", icon: "waypoints" },
  { title: "Better documentation oversight", description: "Required documents, statuses and expiries are tracked on every file.", icon: "clipboard-check" },
  { title: "Clearer financial tracking", description: "Expenses, pay orders, invoices and payments all point back to the job file.", icon: "coins" },
  { title: "More structured billing", description: "Invoices are built from approved vouchers and service lines with per-line tax.", icon: "receipt" },
  { title: "Better management reporting", description: "Profitability, receivables and pipeline reports are calculated live.", icon: "chart-line" },
  { title: "Controlled team access", description: "Roles decide who can see and change operations, money and settings.", icon: "shield-check" },
  { title: "Traceable business activity", description: "Changes, uploads, prints and exports are recorded with who and when.", icon: "fingerprint" },
  { title: "Centralised company operations", description: "Profile, numbering, branding, tax codes and periods managed in one place.", icon: "building" },
];

export const industries: IconItem[] = [
  {
    title: "Customs clearing agents",
    description: "GD filing progress, assessment, duty, D/O, NOC and gate pass — tracked per job file with references and owners.",
    icon: "stamp",
  },
  {
    title: "Freight forwarders",
    description: "Arrivals, containers, shipping-line paperwork, transport and empty returns alongside the billing that follows.",
    icon: "ship",
  },
  {
    title: "Clearing & forwarding houses",
    description: "Operations, accounts and transport teams working the same files with role-based access.",
    icon: "briefcase",
  },
  {
    title: "Import & export logistics operations",
    description: "Shipment lifecycles from BL to delivery with expenses, invoices and client statements in one place.",
    icon: "container",
  },
];

export const marketContext = {
  title: "Rooted in Pakistan's ports, adaptable beyond them",
  body: "Manifest ERP was built around clearing work at Karachi Port, Port Qasim and the dry ports — PKR by default, NTN/STRN and customs licence on the company profile, provincial sales-tax codes and withholding tax as a payment method. Each company can also choose any ISO currency and any IANA time zone, and define its own tax codes.",
  note: "Country-specific tax and regulatory compliance outside the documented features should be confirmed with your accountant.",
  ports: ["Karachi Port", "Port Qasim", "Dry ports"],
};

export const comparison: ComparisonRow[] = [
  {
    dimension: "Shipment records",
    without: "Details spread across e-mail, spreadsheets and chat groups",
    with: "One job file linking BL, containers, documents, stages and money",
  },
  {
    dimension: "Status tracking",
    without: "Status gathered by phone and updated by hand",
    with: "A 14-stage customs board with a dated log and stage owners",
  },
  {
    dimension: "Operations vs finance",
    without: "Expenses re-keyed into accounts, invoices rebuilt manually",
    with: "Approved billable vouchers flow into the job file's invoice",
  },
  {
    dimension: "Responsibilities",
    without: "Shared logins and unclear access to financial data",
    with: "Personal logins with server-enforced, role-based permissions",
  },
  {
    dimension: "History",
    without: "Little record of who changed what, or when",
    with: "Activity log with who, what, when and before/after values",
  },
  {
    dimension: "Reporting",
    without: "Month-end reports assembled from several sources",
    with: "Live reports by category with Excel and PDF export",
  },
];

/** Shown instead of testimonials until approved customer quotes exist. */
export const realities: IconItem[] = [
  { title: "Speaks the port's language", description: "GD, SO, D/O, NOC, gate pass, grounding, examination, detention — the terms your team already uses.", icon: "anchor" },
  { title: "Every rupee tied to a file", description: "Vouchers, pay orders, invoices and payments all belong to a job file, so profit per file is visible.", icon: "coins" },
  { title: "Paperwork the port asks for", description: "D/O requests, shipping-line container undertakings, AQD/PSQCA undertakings and authority letters as PDF.", icon: "printer" },
  { title: "Tax handled the local way", description: "Per-line tax codes with rate snapshots, withholding tax with certificate numbers and a tax summary report.", icon: "badge-percent" },
  { title: "Bank formats built in", description: "Bank pay-order presets for Bank Alfalah, Habib Metro and Bank Al Habib, plus generic and custom formats.", icon: "landmark" },
  { title: "Money rules that hold", description: "Closed accounting periods, row-locked money documents and invoices that keep the rate they were billed at.", icon: "lock-keyhole" },
];
