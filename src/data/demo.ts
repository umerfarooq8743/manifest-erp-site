/**
 * FICTIONAL SAMPLE DATA for the illustrative product mockups.
 * Company, client and staff names are invented; amounts are made up.
 * Nothing here comes from a real customer or a real ERP database.
 */

export const demoCompany = {
  name: "Meridian Clearing & Forwarding",
  short: "Meridian C&F",
  code: "MCF",
  currency: "PKR",
  timezone: "Asia/Karachi",
  user: { name: "Ayesha Malik", initials: "AM", role: "Company Admin" },
};

export const demoClients = [
  "Saltwater Textiles",
  "Crescent Polymers",
  "Blue Delta Foods",
  "Arcadia Pharma Imports",
  "Kestrel Auto Parts",
  "Orchid Home Goods",
  "Northgate Steel",
  "Lumen Electronics",
] as const;

export const demoStaff = [
  { name: "Bilal Raza", initials: "BR", role: "Operations Staff" },
  { name: "Sana Khan", initials: "SK", role: "Accounts Staff" },
  { name: "Imran Ali", initials: "IA", role: "Transport Staff" },
  { name: "Hamza Tariq", initials: "HT", role: "Read Only" },
  { name: "Ayesha Malik", initials: "AM", role: "Company Admin" },
] as const;

export type Tone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";

export interface DemoJob {
  job: string;
  client: string;
  bl: string;
  containers: string;
  port: string;
  stage: string;
  stageIndex: number;
  status: "Open" | "In progress" | "Delivered" | "Billed" | "Closed";
  assignee: string;
  eta: string;
}

export const demoJobs: DemoJob[] = [
  { job: "MCF-2026-0148", client: "Kestrel Auto Parts", bl: "ONEYKHI6F2301", containers: "1×40HC", port: "Port Qasim", stage: "Documents Pending", stageIndex: 0, status: "Open", assignee: "BR", eta: "24 Nov" },
  { job: "MCF-2026-0147", client: "Saltwater Textiles", bl: "MEDU4821736", containers: "2×40HC", port: "Karachi Port", stage: "GD Filed", stageIndex: 2, status: "In progress", assignee: "BR", eta: "21 Nov" },
  { job: "MCF-2026-0146", client: "Crescent Polymers", bl: "OOLU2719044", containers: "3×20GP", port: "Port Qasim", stage: "Assessment", stageIndex: 3, status: "In progress", assignee: "SK", eta: "19 Nov" },
  { job: "MCF-2026-0145", client: "Blue Delta Foods", bl: "TSLU8842210", containers: "1×40RF", port: "Karachi Port", stage: "Examination", stageIndex: 8, status: "In progress", assignee: "BR", eta: "18 Nov" },
  { job: "MCF-2026-0142", client: "Arcadia Pharma Imports", bl: "MEDU4790218", containers: "2×20GP", port: "Port Qasim", stage: "Delivery Order", stageIndex: 9, status: "In progress", assignee: "BR", eta: "15 Nov" },
  { job: "MCF-2026-0139", client: "Orchid Home Goods", bl: "ONEYKHI6E9915", containers: "1×40HC", port: "Karachi Port", stage: "Gate Pass", stageIndex: 11, status: "In progress", assignee: "IA", eta: "12 Nov" },
  { job: "MCF-2026-0136", client: "Northgate Steel", bl: "OOLU2688310", containers: "4×20GP", port: "Port Qasim", stage: "Empty Container Return", stageIndex: 13, status: "Delivered", assignee: "IA", eta: "08 Nov" },
  { job: "MCF-2026-0131", client: "Lumen Electronics", bl: "TSLU8790023", containers: "1×20GP", port: "Karachi Port", stage: "Completed", stageIndex: 14, status: "Billed", assignee: "SK", eta: "02 Nov" },
];

export const statusTone: Record<DemoJob["status"], Tone> = {
  Open: "neutral",
  "In progress": "info",
  Delivered: "primary",
  Billed: "warning",
  Closed: "success",
};

/** Files per customs stage for the pipeline/board (fictional counts). */
export const demoPipeline = [
  { stage: "Documents Pending", count: 6 },
  { stage: "GD Prepared", count: 4 },
  { stage: "GD Filed", count: 5 },
  { stage: "Assessment", count: 7 },
  { stage: "Duty Payment", count: 3 },
  { stage: "Shipping Order", count: 2 },
  { stage: "Scanning", count: 3 },
  { stage: "Grounding", count: 1 },
  { stage: "Examination", count: 2 },
  { stage: "Delivery Order", count: 4 },
  { stage: "NOC", count: 2 },
  { stage: "Gate Pass", count: 3 },
  { stage: "Delivery", count: 2 },
  { stage: "Empty Container Return", count: 5 },
];

export const demoBilling = [
  { month: "Jun", invoiced: 3.42, collected: 2.96 },
  { month: "Jul", invoiced: 3.88, collected: 3.41 },
  { month: "Aug", invoiced: 3.61, collected: 3.72 },
  { month: "Sep", invoiced: 4.27, collected: 3.65 },
  { month: "Oct", invoiced: 4.58, collected: 4.12 },
  { month: "Nov", invoiced: 4.05, collected: 3.38 },
];

export const demoBanks = [
  { name: "Bank Alfalah — Current", type: "Bank", balance: 4_826_410.0, onInvoices: true },
  { name: "Habib Metro — Operations", type: "Bank", balance: 2_115_980.5, onInvoices: false },
  { name: "Bank Al Habib — Duty", type: "Bank", balance: 1_340_200.0, onInvoices: false },
  { name: "Petty cash — Port office", type: "Cash", balance: 86_450.0, onInvoices: false },
  { name: "Mobile wallet — Field", type: "Wallet", balance: 41_700.0, onInvoices: false },
];

export const demoAlerts = [
  { tone: "danger" as Tone, title: "NOC expires in 2 days", meta: "MCF-2026-0139 · Orchid Home Goods" },
  { tone: "warning" as Tone, title: "Container free time ends Thu", meta: "MCF-2026-0136 · OOLU 268831-0" },
  { tone: "warning" as Tone, title: "FI expiring in 6 days", meta: "MCF-2026-0146 · Crescent Polymers" },
  { tone: "info" as Tone, title: "3 arrivals due tomorrow", meta: "ETA sheet · Port Qasim, Karachi Port" },
];

export const demoMyWork = [
  { label: "Move MCF-2026-0147 to Assessment", meta: "GD filed yesterday", tone: "info" as Tone },
  { label: "Collect packing list — ETA-2026-000318", meta: "Kestrel Auto Parts", tone: "warning" as Tone },
  { label: "Approve 4 vouchers", meta: "PKR 182,400 claimed", tone: "primary" as Tone },
  { label: "Return empties — MCF-2026-0136", meta: "Detention from Fri", tone: "danger" as Tone },
];

export const demoEta = [
  { ref: "ETA-2026-000321", client: "Kestrel Auto Parts", bl: "ONEYKHI6F2301", vessel: "MV Coral Meridian", eta: "24 Nov", containers: "1×40HC", docs: 3, status: "Documents pending", dup: false },
  { ref: "ETA-2026-000320", client: "Lumen Electronics", bl: "MEDU4836512", vessel: "MSC Aurelia", eta: "24 Nov", containers: "2×20GP", docs: 4, status: "Ready for file", dup: false },
  { ref: "ETA-2026-000319", client: "Saltwater Textiles", bl: "OOLU2730019", vessel: "OOCL Halcyon", eta: "25 Nov", containers: "3×40HC", docs: 2, status: "Documents pending", dup: true },
  { ref: "ETA-2026-000318", client: "Blue Delta Foods", bl: "TSLU8851107", vessel: "TS Monsoon", eta: "26 Nov", containers: "1×40RF", docs: 4, status: "Ready for file", dup: false },
  { ref: "ETA-2026-000316", client: "Northgate Steel", bl: "ONEYKHI6F1187", vessel: "ONE Solace", eta: "27 Nov", containers: "5×20GP", docs: 1, status: "Documents pending", dup: false },
  { ref: "ETA-2026-000314", client: "Orchid Home Goods", bl: "MEDU4801943", vessel: "MSC Aurelia", eta: "22 Nov", containers: "1×40HC", docs: 4, status: "File created", dup: false },
];

export const demoVouchers = [
  { no: "VCH-2026-0412", date: "22 Nov", job: "MCF-2026-0146", head: "Customs duty", staff: "BR", claimed: 486_250, approved: null as number | null, billable: true, receipt: true, status: "Pending" },
  { no: "VCH-2026-0411", date: "22 Nov", job: "MCF-2026-0142", head: "D/O charges", staff: "BR", claimed: 38_500, approved: null, billable: true, receipt: true, status: "Pending" },
  { no: "VCH-2026-0409", date: "21 Nov", job: "MCF-2026-0145", head: "Lab charges", staff: "IA", claimed: 12_000, approved: 11_500, billable: true, receipt: true, status: "Approved" },
  { no: "VCH-2026-0407", date: "21 Nov", job: "MCF-2026-0139", head: "Transportation", staff: "IA", claimed: 64_000, approved: 64_000, billable: true, receipt: true, status: "Approved" },
  { no: "VCH-2026-0405", date: "20 Nov", job: "MCF-2026-0147", head: "Wharfage", staff: "BR", claimed: 27_300, approved: null, billable: true, receipt: false, status: "Pending" },
  { no: "VCH-2026-0402", date: "19 Nov", job: "MCF-2026-0136", head: "Staff voucher", staff: "BR", claimed: 4_500, approved: null, billable: false, receipt: true, status: "Rejected" },
];

export const demoInvoiceLines = [
  { kind: "Agency", desc: "Customs clearing & agency service", tax: "ST 13%", amount: 45_000, taxAmount: 5_850 },
  { kind: "Reimbursement", desc: "Customs duty — VCH-2026-0398", tax: "—", amount: 412_380, taxAmount: 0 },
  { kind: "Reimbursement", desc: "D/O charges — VCH-2026-0401", tax: "—", amount: 38_500, taxAmount: 0 },
  { kind: "Reimbursement", desc: "Wharfage — VCH-2026-0403", tax: "—", amount: 21_760, taxAmount: 0 },
  { kind: "Agency", desc: "Documentation & forms", tax: "ST 13%", amount: 6_000, taxAmount: 780 },
];

export const demoSoa = [
  { date: "01 Nov", ref: "Opening balance", type: "Opening", debit: 0, credit: 0, balance: 214_600 },
  { date: "04 Nov", ref: "INV-2026-0081", type: "Invoice", debit: 386_420, credit: 0, balance: 601_020 },
  { date: "09 Nov", ref: "RCT-2026-0119", type: "Payment · Bank transfer", debit: 0, credit: 450_000, balance: 151_020 },
  { date: "12 Nov", ref: "RCT-2026-0124", type: "Payment · Withholding tax", debit: 0, credit: 8_160, balance: 142_860 },
  { date: "15 Nov", ref: "INV-2026-0087", type: "Invoice", debit: 530_270, credit: 0, balance: 673_130 },
  { date: "18 Nov", ref: "CN-2026-0006", type: "Credit note", debit: 0, credit: 12_500, balance: 660_630 },
  { date: "21 Nov", ref: "RCT-2026-0131", type: "Payment · Cheque", debit: 0, credit: 700_000, balance: -39_370 },
];

export const demoLedger = [
  { date: "22 Nov", desc: "Pay order — D/O charges · MCF-2026-0142", ref: "PO-0912", in: 0, out: 38_500 },
  { date: "21 Nov", desc: "Client receipt — Arcadia Pharma Imports", ref: "RCT-2026-0131", in: 700_000, out: 0 },
  { date: "21 Nov", desc: "Security deposit refund · MCF-2026-0128", ref: "PO-0874", in: 150_000, out: 0 },
  { date: "20 Nov", desc: "Voucher paid — Transportation · MCF-2026-0139", ref: "VCH-2026-0407", in: 0, out: 64_000 },
  { date: "19 Nov", desc: "Money out — Office rent (Nov)", ref: "BE-0044", in: 0, out: 120_000 },
  { date: "18 Nov", desc: "Client receipt — Saltwater Textiles", ref: "RCT-2026-0127", in: 325_000, out: 0 },
];

export const demoActivity = [
  { time: "10:42", user: "SK", action: "Approved voucher", record: "VCH-2026-0409", change: "Amount 12,000.00 → 11,500.00 · reason: receipt amount" },
  { time: "10:31", user: "BR", action: "Moved stage", record: "MCF-2026-0142", change: "NOC → Delivery Order · D/O no. DO-55120" },
  { time: "10:05", user: "AM", action: "Updated business rules", record: "Billing · Tax codes", change: "Added SST 13% (Sindh)" },
  { time: "09:58", user: "IA", action: "Recorded delivery", record: "MCF-2026-0139", change: "Partial · 420 of 700 packages" },
  { time: "09:44", user: "SK", action: "Exported report", record: "Receivables aging", change: "Excel · as of 22 Nov 2026" },
  { time: "09:20", user: "BR", action: "Uploaded document", record: "MCF-2026-0146", change: "Packing list · copy received" },
  { time: "09:12", user: "SK", action: "Approved invoice", record: "INV-2026-0087", change: "Draft → Approved · due 07 Dec" },
];

export const demoAging = [
  { client: "Arcadia Pharma Imports", current: 412_300, d30: 118_000, d60: 0, d90: 0, d90p: 0 },
  { client: "Saltwater Textiles", current: 286_150, d30: 94_200, d60: 41_000, d90: 0, d90p: 0 },
  { client: "Crescent Polymers", current: 198_400, d30: 0, d60: 0, d90: 22_500, d90p: 0 },
  { client: "Blue Delta Foods", current: 154_900, d30: 71_300, d60: 0, d90: 0, d90p: 18_400 },
  { client: "Kestrel Auto Parts", current: 96_000, d30: 12_750, d60: 0, d90: 0, d90p: 0 },
  { client: "Orchid Home Goods", current: 74_600, d30: 0, d60: 15_900, d90: 0, d90p: 0 },
];
