import type { Faq } from "@/types/content";

export const faqs: Faq[] = [
  {
    question: "What is Manifest ERP?",
    answer:
      "Manifest ERP is a multi-company ERP for customs-clearing agents and freight forwarders. It manages the shipment lifecycle — from the moment a bill of lading arrives to the day the job file is billed, paid and closed — with every activity linked to one job-file number.",
  },
  {
    question: "Who is Manifest ERP designed for?",
    answer:
      "Customs clearing and forwarding houses, primarily in Pakistan (Karachi Port, Port Qasim and dry ports). It suits teams where operations, accounts and transport staff all work on the same shipments.",
  },
  {
    question: "What is a job file?",
    answer:
      "A job file is the single record for one shipment. It holds the BL, containers, documents, generated forms, customs stages, pay orders, transport, expenses, invoices and a remarks history. Its status follows the work automatically — open, in progress, delivered, billed and closed.",
  },
  {
    question: "How does the shipment workflow work?",
    answer:
      "The BL is recorded on the ETA sheet and documents are collected. The entry is converted to a job file, which moves through the customs stages — GD, assessment, duty, shipping order, scanning, D/O, NOC — then gate pass and delivery. Vouchers, invoices and payments follow, and the file is closed against a checklist. The documented flow has 17 steps, including 14 customs stages.",
  },
  {
    question: "Does Manifest ERP file the GD on WeBOC?",
    answer:
      "No. Manifest ERP records customs progress — each stage move with its date, reference number, responsible person, remarks and attachment. The filing itself happens on WeBOC and shipping-line portals.",
  },
  {
    question: "Can one installation manage multiple companies?",
    answer:
      "Yes. One installation serves many isolated companies. All business data belongs to exactly one company and is never visible to another. A person can belong to several companies — for example as an admin in one and staff in another — and switch between them.",
  },
  {
    question: "How are team roles and permissions managed?",
    answer:
      "Company Admins invite staff and assign roles: Company Admin, Operations, Accounts, Transport or Read Only, with Supervisor and Employee presets also available. Permissions are checked on the server for the current company, and financial figures are only shown to roles with the relevant finance permissions.",
  },
  {
    question: "Does Manifest ERP support ETA tracking?",
    answer:
      "Yes. The ETA sheet tracks arrivals before they land, with a documents checklist, duplicate-BL warnings, arrival-notice e-mails to clients and one-step conversion to a job file.",
  },
  {
    question: "Can documents be generated and exported?",
    answer:
      "Yes. Job files generate PDFs such as the D/O request, container undertakings, AQD/PSQCA undertakings and authority letter. Invoices and statements print with your company's branding, and lists such as the ETA sheet, bank ledgers and the activity log export to Excel.",
  },
  {
    question: "Does the platform support invoice and payment management?",
    answer:
      "Yes. Invoices are built from billable vouchers and agency service charges with tax per line. Payments can be recorded by cash, cheque, bank transfer, online or withholding tax; overpayments can be kept as advances and applied later; and credit and debit notes adjust the statement of account.",
  },
  {
    question: "Can reports be exported to Excel and PDF?",
    answer:
      "Yes. Reports are filtered by date — and by client where relevant — and export to Excel (with a company header, period, totals row and Summary sheet) or PDF.",
  },
  {
    question: "Does the platform provide activity history?",
    answer:
      "Yes. The activity log records business actions such as record changes, uploads, prints and exports, with who, what, when and before/after values. It can be filtered and exported to Excel.",
  },
  {
    question: "Can company settings be customised?",
    answer:
      "Yes. Company Admins set the profile, job-file prefix, currency, time zone and branding (logo, letterhead, stamp, signature), plus business rules such as tax codes, required documents, alert windows and accounting-period locking.",
  },
  {
    question: "Can we use Manifest ERP outside Pakistan?",
    answer:
      "Each company can choose any ISO currency and IANA time zone and define its own tax codes. The product was built around Pakistani clearing practice, so confirm any country-specific compliance needs with us and your accountant before relying on them.",
  },
  {
    question: "How can a business request a product demonstration?",
    answer:
      "Use the Request a Demo form on the contact page. It prepares a WhatsApp message with your details, which you review and send — the team will follow up to arrange a walkthrough.",
  },
];
