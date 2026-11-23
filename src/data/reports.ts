import type { ReportCategory } from "@/types/content";

/**
 * Report catalogue by category. The catalogue grows over time, so the site
 * deliberately shows categories and documented examples rather than a total.
 */
export const reportCategories: ReportCategory[] = [
  {
    id: "finance",
    title: "Finance",
    description: "Receivables, billing, tax, collections, expenses and bank position — tied back to the SOA and ledgers.",
    icon: "coins",
    reports: [
      { title: "Receivables aging", description: "Client balances by age as of a date, tied to each client's SOA closing balance.", period: "as-of", customerFilter: true },
      { title: "Client ledger summary", description: "Opening, invoiced, received, notes and closing balance per client.", period: "range", customerFilter: true },
      { title: "Sales tax invoice register", description: "Approved invoices with agency income, reimbursements, tax and balance.", period: "range", customerFilter: true },
      { title: "Tax summary", description: "Tax per code at the billed rates, plus withholding tax deducted by clients.", period: "range" },
      { title: "Collections register", description: "Payments received against invoices or as advances, by method.", period: "range", customerFilter: true },
      { title: "Job file profitability", description: "Agency income and reimbursements vs approved expenses, with projected margin.", period: "range", customerFilter: true },
      { title: "Unbilled expenses", description: "Approved billable vouchers not yet on an invoice, with their age.", period: "current" },
      { title: "Voucher register", description: "Claimed vs approved amounts, rejections with reason, paid-from account and billed invoice.", period: "range" },
      { title: "Receivables & advances", description: "Per client: dues, unapplied advance, net and the next step.", period: "current", customerFilter: true },
      { title: "Draft invoice queue", description: "Invoices waiting for approval and the amount still in draft.", period: "range", customerFilter: true },
      { title: "Sale return register", description: "Return amounts and the status of their source invoices.", period: "range", customerFilter: true },
      { title: "Advance applications", description: "Client advance amounts applied to invoices.", period: "range", customerFilter: true },
      { title: "Bank position", description: "Balances and movements per account, including other money in and out.", period: "range" },
      { title: "Manual account movements", description: "Manually recorded cash, wallet and bank movements, including cancellations.", period: "range" },
      { title: "Pay orders & deposits", description: "Pay orders issued, refunds received and deductions.", period: "range" },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    description: "Where files are stuck, what's arriving, what's missing and how containers and transporters perform.",
    icon: "ship",
    reports: [
      { title: "Files pending by stage", description: "Open files by customs stage from the stage log.", period: "current", customerFilter: true },
      { title: "Job file register", description: "Job files and their containers for a period.", period: "range", customerFilter: true },
      { title: "Arrival variance", description: "Estimated vs actual arrivals, and arrivals still unconfirmed.", period: "range", customerFilter: true },
      { title: "Client shipment volume", description: "Job volumes, completed jobs and container counts by client.", period: "range", customerFilter: true },
      { title: "Container returns & detention", description: "Empty returns, detention and charges from containers and gate passes.", period: "range", customerFilter: true },
      { title: "Document compliance", description: "Files measured against the company's required-documents rule.", period: "current", customerFilter: true },
      { title: "Transporter performance", description: "Gate passes and deliveries per transporter.", period: "range" },
    ],
  },
  {
    id: "team",
    title: "Team",
    description: "Workload and contribution across the team.",
    icon: "users-round",
    reports: [{ title: "Staff performance", description: "Stage events, vouchers and files handled per person.", period: "range" }],
  },
];

export const reportHighlights = [
  { title: "Live, not rebuilt", description: "Reports are calculated from the same rules the screens use, so totals match what the team sees." },
  { title: "Filter the way you work", description: "Date ranges or as-of dates, and a client filter on reports that track client records." },
  { title: "Excel & PDF", description: "Excel exports include a company header, period, totals row and a Summary sheet; wide PDFs print landscape." },
  { title: "Permission-aware", description: "Each report needs the data permission of the screen it summarises, so money stays with finance roles." },
];
