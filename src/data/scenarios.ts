import type { Scenario } from "@/types/content";

/**
 * ILLUSTRATIVE SCENARIOS — not customer case studies. They show how the
 * documented modules support common work; no real company or measured
 * result is implied. Replace with approved case studies when available.
 */
export const scenarios: Scenario[] = [
  {
    id: "import-lifecycle",
    title: "An import shipment, from arrival tracking to job-file closure",
    summary: "A two-container FCL import arriving at Port Qasim, followed through every documented module.",
    steps: [
      { title: "BL arrives", module: "ETA Sheet", text: "Operations records the client, BL, carrier, vessel, ETA and two containers. The duplicate-BL check comes back clean." },
      { title: "Documents collected", module: "ETA Sheet", text: "The commercial invoice, packing list and FI are marked received. The entry turns Ready for file and the client gets an arrival notice." },
      { title: "Job file opened", module: "Job Files", text: "One click converts the entry into a job file. Containers and the checklist carry over and the customs log starts." },
      { title: "Customs stages", module: "Customs Board", text: "GD prepared and filed with its number, then assessment and duty — recorded as a voucher. Pay orders cover D/O charges and the security deposit." },
      { title: "D/O, NOC and forms", module: "Documents", text: "D/O and NOC numbers are recorded with expiries; the D/O request and container undertaking are generated as PDFs." },
      { title: "Gate pass & deliveries", module: "Transport", text: "Two gate passes are issued. The first truck delivers part of the packages; the second completes delivery and the stage moves on." },
      { title: "Empties returned", module: "Containers", text: "Return dates are recorded; one container picks up detention, captured on the file." },
      { title: "Billed and closed", module: "Billing & SOA", text: "Approved billable vouchers and the agency service line form the invoice. The client pays, the SOA updates, and the close-file checklist passes." },
    ],
  },
  {
    id: "collections",
    title: "Settling a client account with advances and withholding tax",
    summary: "How accounts staff bring a client's statement up to date at month-end.",
    steps: [
      { title: "Overpayment kept", module: "Billing & SOA", text: "A client pays more than the invoice balance; the extra is kept as an advance instead of being rejected." },
      { title: "Advance applied", module: "Billing & SOA", text: "When the next invoice is approved, Apply advance settles it from the unapplied advance, oldest first." },
      { title: "WHT recorded", module: "Billing & SOA", text: "Income tax withheld by the client is recorded as a payment with its certificate number — it reduces the balance but never touches a bank account." },
      { title: "Statement shared", module: "Billing & SOA", text: "The SOA shows invoices, payments, notes and the unapplied advance, and is generated as a PDF." },
      { title: "Reported", module: "Reports", text: "Receivables aging and the tax summary reflect the same figures for management and the tax return." },
    ],
  },
  {
    id: "new-company",
    title: "Bringing a new clearing company onto the platform",
    summary: "From sign-up to a working team in one sitting.",
    steps: [
      { title: "Company created", module: "Onboarding", text: "The owner enters the company name, short code, city, currency, NTN and customs licence. Roles and default masters are set up automatically." },
      { title: "Team invited", module: "Team & Access", text: "Operations, accounts and transport staff are invited by e-mail with the right role each." },
      { title: "Rules configured", module: "Company Settings", text: "Tax codes, required documents, alert window and accounting periods are set; logo, letterhead, stamp and signature uploaded." },
      { title: "First arrivals", module: "ETA Sheet", text: "The team starts entering arrivals; job numbers follow the company's own prefix." },
    ],
  },
];
