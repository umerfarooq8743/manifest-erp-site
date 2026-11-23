import type { CustomsStage, DocumentedStep, WorkflowStep } from "@/types/content";

/**
 * The 12-step presentation of the shipment lifecycle used on the website.
 * It is a simplified view: each item lists the documented steps (of 17) it
 * covers, and the customs stages are listed separately below.
 */
export const workflowSteps: WorkflowStep[] = [
  {
    id: "bl",
    title: "Bill of Lading received",
    shortTitle: "BL received",
    icon: "file-text",
    module: "ETA Sheet",
    summary: "The client sends the BL. A new ETA entry records the client, BL, carrier, vessel, ETA and containers.",
    details: [
      "Duplicate-BL warning before the same shipment is entered twice",
      "Entry starts in Documents pending",
      "Container list captured once and reused later",
    ],
    docSteps: [1],
    screen: "eta",
  },
  {
    id: "eta",
    title: "ETA tracking",
    shortTitle: "ETA tracking",
    icon: "calendar-clock",
    module: "ETA Sheet",
    summary: "Track arrivals before they land and collect the documents checklist until the entry is Ready for file.",
    details: [
      "Checklist for BL, commercial invoice, packing list and financial instrument",
      "Required documents are a company setting",
      "Arrival-notice e-mails to clients, individually or in bulk",
    ],
    docSteps: [2, 3],
    screen: "eta",
  },
  {
    id: "job-file",
    title: "Job File creation",
    shortTitle: "Job file",
    icon: "folder-kanban",
    module: "Job Files",
    summary: "Convert the ETA entry into a job file. Containers and the documents checklist carry over and the customs log starts.",
    details: [
      "Per-company numbering, e.g. MCF-2026-0021",
      "Document checklist: received, original, copy, verified, missing, expired",
      "Upload scans and get expiry alerts",
    ],
    docSteps: [4, 5],
    screen: "job-file-detail",
  },
  {
    id: "gd",
    title: "GD / SO / Scanning",
    shortTitle: "GD · SO · Scan",
    icon: "scan-line",
    module: "Customs Board",
    summary: "Record GD preparation and filing, the shipping order, scanning, grounding and examination as stage moves.",
    details: [
      "Each move stores date, reference, responsible person, remarks and attachment",
      "Every move is written to a dated customs log",
      "Filing itself happens on WeBOC — Manifest records the progress",
    ],
    docSteps: [6, 9],
    screen: "customs-board",
  },
  {
    id: "assessment",
    title: "Assessment",
    shortTitle: "Assessment",
    icon: "scale",
    module: "Customs Board",
    summary: "Move the file through assessment and duty payment, and record pay orders against the job file.",
    details: [
      "Duty recorded as an expense voucher",
      "Pay orders for D/O charges, terminal, COC/ETO and security deposits",
      "Deposits tracked until refunded or deducted",
    ],
    docSteps: [7, 8],
    screen: "customs-board",
  },
  {
    id: "do-noc",
    title: "Delivery Order and NOC",
    shortTitle: "D/O + NOC",
    icon: "stamp",
    module: "Customs Board · Forms",
    summary: "Record D/O and NOC numbers with their expiries, and generate the forms the port and shipping lines ask for.",
    details: [
      "Alerts before D/O and NOC expiries lapse",
      "PDF forms: D/O request, container undertakings, AQD/PSQCA undertakings, authority letter",
    ],
    docSteps: [10, 11],
    screen: "documents",
  },
  {
    id: "gate-pass",
    title: "Gate pass",
    shortTitle: "Gate pass",
    icon: "ticket",
    module: "Transport",
    summary: "Issue the gate pass with transporter, vehicle, driver and CNIC, trailer, and who issued and received it.",
    details: ["Transporter register", "Stage moves to Gate pass automatically"],
    docSteps: [13],
    screen: "transport",
  },
  {
    id: "delivery",
    title: "Delivery",
    shortTitle: "Delivery",
    icon: "truck",
    module: "Transport · Containers",
    summary: "Record full or partial deliveries with packages, receiver and proof — then the empty container return.",
    details: [
      "Stage moves to Delivery when all packages are delivered",
      "Empty return with actual date, detention, damage and cleaning charges",
    ],
    docSteps: [14, 15],
    screen: "transport",
  },
  {
    id: "vouchers",
    title: "Expenses and vouchers",
    shortTitle: "Vouchers",
    icon: "wallet",
    module: "Expenses",
    summary: "Staff submit vouchers per expense head against the job file — billable or not, with receipts — for approval.",
    details: [
      "Approve with the amount actually paid; the original claim is kept",
      "Optional paid-from account updates that account's balance",
      "Possible-duplicate warning",
    ],
    docSteps: [12],
    screen: "expenses",
  },
  {
    id: "billing",
    title: "Billing",
    shortTitle: "Billing",
    icon: "receipt",
    module: "Billing & SOA",
    summary: "Build the sales-tax invoice from billable vouchers plus agency service charges, with tax per line.",
    details: [
      "Drafts stay editable until approved",
      "Approval stamps the due date",
      "Each line keeps the tax code and rate it was billed at",
    ],
    docSteps: [16],
    screen: "invoices",
  },
  {
    id: "soa",
    title: "Customer Statement of Account",
    shortTitle: "SOA",
    icon: "scroll-text",
    module: "Billing & SOA",
    summary: "Record payments, advances and credit/debit notes — the statement of account shows exactly where each client stands.",
    details: [
      "Overpayments can be kept as an advance and applied later",
      "Withholding tax recorded with its certificate number",
      "SOA available as PDF",
    ],
    docSteps: [16],
    screen: "soa",
  },
  {
    id: "close",
    title: "Job File closure",
    shortTitle: "Close",
    icon: "folder-check",
    module: "Job Files",
    summary: "Close the file against a checklist: documents complete, delivered, empties returned, expenses approved, invoiced, nothing pending.",
    details: ["Outstanding deposits shown as a reminder", "Force-close requires a written reason and is audited"],
    docSteps: [17],
    screen: "job-files",
  },
];

/** The documented 17-step business flow, as the app implements it. */
export const documentedSteps: DocumentedStep[] = [
  { n: 1, step: "Client sends BL", where: "ETA sheet", what: "Record client, BL, carrier, vessel, ETA and containers. Duplicate-BL warning." },
  { n: 2, step: "Documents collected", where: "ETA entry", what: "Checklist: BL, commercial invoice, packing list, financial instrument and others." },
  { n: 3, step: "Ready for file", where: "ETA entry", what: "When the documents are in, the entry becomes Ready for file." },
  { n: 4, step: "Open job file", where: "ETA → Convert to job file", what: "Creates the job file, copies containers and the checklist, starts the customs log." },
  { n: 5, step: "Document checklist", where: "Job file → Documents", what: "Received, original, copy, verified, missing or expired; scans and expiry alerts." },
  { n: 6, step: "GD prepared & filed", where: "Customs board", what: "Stage moves with date, GD number, responsible person, remarks and attachment." },
  { n: 7, step: "Assessment & duty", where: "Customs", what: "Assessment and duty payment stages; duty recorded as an expense voucher." },
  { n: 8, step: "Pay orders", where: "Job file → Pay orders", what: "D/O charges, terminal, COC/ETO, security deposit — tracked until refunded or deducted." },
  { n: 9, step: "Shipping order, scanning, grounding, examination", where: "Customs", what: "Stage moves with references." },
  { n: 10, step: "Delivery order & NOC", where: "Customs", what: "D/O and NOC numbers and expiries, with alerts before they lapse." },
  { n: 11, step: "Forms", where: "Job file → Forms", what: "D/O request, container undertakings, AQD/PSQCA undertakings and authority letter as PDF." },
  { n: 12, step: "Expenses", where: "Expenses", what: "Staff vouchers per head, billable or not, receipt, approval and duplicate warning." },
  { n: 13, step: "Gate pass & transport", where: "Transport", what: "Transporter, vehicle, driver & CNIC, trailer, issued to / received by." },
  { n: 14, step: "Delivery", where: "Job file → Transport", what: "Full or partial deliveries with packages, receiver and proof." },
  { n: 15, step: "Empty container return", where: "Job file → Containers", what: "Actual return date, detention, damage and cleaning charges." },
  { n: 16, step: "Billing", where: "Billing & SOA", what: "Invoice from billable vouchers and agency charges; payments, advances, credit/debit notes." },
  { n: 17, step: "Close the file", where: "Job file → Close file", what: "Close-file checklist; force-close requires a reason." },
];

/**
 * Customs board stages, in business-flow order — 14 working stages, after
 * which the file is marked Completed. Mirrors the product's stage list.
 */
export const customsStages: CustomsStage[] = [
  { key: "documents_pending", label: "Documents Pending" },
  { key: "gd_prepared", label: "GD Prepared", reference: "GD no." },
  { key: "gd_filed", label: "GD Filed", reference: "GD no." },
  { key: "assessment", label: "Assessment" },
  { key: "duty_payment", label: "Duty Payment" },
  { key: "shipping_order", label: "Shipping Order", reference: "SO no." },
  { key: "scanning", label: "Scanning" },
  { key: "grounding", label: "Grounding" },
  { key: "examination", label: "Examination" },
  { key: "delivery_order", label: "Delivery Order", reference: "D/O no." },
  { key: "noc", label: "NOC", reference: "NOC no." },
  { key: "gate_pass", label: "Gate Pass" },
  { key: "delivery", label: "Delivery" },
  { key: "empty_return", label: "Empty Container Return" },
];

export const completedStage: CustomsStage = { key: "completed", label: "Completed" };

/** Job-file status follows the workflow automatically. */
export const fileStatuses = [
  { key: "open", label: "Open", note: "Job file created from the ETA entry" },
  { key: "in_progress", label: "In progress", note: "Customs stages are moving" },
  { key: "delivered", label: "Delivered", note: "All deliveries recorded" },
  { key: "billed", label: "Billed", note: "Invoice approved" },
  { key: "closed", label: "Closed", note: "Checklist passed, or audited force-close" },
] as const;
