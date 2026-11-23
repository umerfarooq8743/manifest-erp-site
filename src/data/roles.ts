import type { Persona } from "@/types/content";

/**
 * User journeys based on the product's role & permission model. Permissions
 * are enforced on the server for the current company, not just hidden in the UI.
 */
export const personas: Persona[] = [
  {
    id: "admin",
    role: "Company Owner / Company Admin",
    headline: "Set up the company and keep control of it.",
    summary:
      "The owner creates the company and is always a Company Admin. Admins hold every permission: company profile and branding, team and roles, operations, accounts, billing, reports and exports.",
    icon: "user-cog",
    responsibilities: [
      "Create the company: name, short code, city, currency, NTN and customs licence",
      "Invite the team and assign a role to each person",
      "Configure business rules — tax codes, required documents, alerts, accounting periods",
      "Upload the logo, letterhead, stamp and signature used on printed documents",
      "Review the dashboard, reports and the activity log",
    ],
    areas: ["Settings", "Team & Access", "Dashboard", "Reports", "Activity Log"],
    boundaries: [
      "Only the owner can transfer ownership, and the owner can't be demoted or removed",
      "Nobody can downgrade or deactivate themselves",
      "Company status (active / suspended) is a platform decision",
    ],
  },
  {
    id: "operations",
    role: "Operations Staff",
    headline: "Move every shipment from arrival to delivery.",
    summary:
      "Operations staff work the customers, masters, ETA sheet, job files, documents, customs board and transport, and can view reports.",
    icon: "workflow",
    responsibilities: [
      "Record new ETA entries and collect the documents checklist",
      "Convert ready entries into job files",
      "Move customs stages with GD, SO, D/O and NOC references",
      "Generate D/O requests, undertakings and authority letters",
      "Issue gate passes and record deliveries",
    ],
    areas: ["ETA Sheet", "Job Files", "Customs Board", "Transport", "Customers", "Masters"],
    boundaries: [
      "Billing figures on the dashboard are only shown to roles with invoice or payment rights",
      "Bank balances need the accounts permission",
      "Cancelling a job file needs a separate permission (Company Admin by default)",
    ],
  },
  {
    id: "accounts",
    role: "Accounts Staff",
    headline: "Turn the work on each file into money collected.",
    summary:
      "Accounts staff handle expenses (including approval), invoices (create, approve, print), payments, banks and accounts, and reports including export — with view access to operations.",
    icon: "receipt",
    responsibilities: [
      "Approve vouchers with the amount actually paid and the paid-from account",
      "Build invoices from billable vouchers and agency service charges",
      "Approve invoices — approval stamps the due date",
      "Record payments, advances and withholding tax; keep SOAs current",
      "Maintain bank, cash and wallet accounts; export reports",
    ],
    areas: ["Expenses", "Billing & SOA", "Banks", "Reports", "Job Files (view)"],
    boundaries: [
      "Closed accounting periods can't be changed — corrections go through the open period",
      "Cancelling invoices or payments needs additional permissions",
    ],
  },
  {
    id: "transport",
    role: "Transport Staff",
    headline: "Record the last mile, accurately.",
    summary: "Transport staff manage gate passes and deliveries and can view the job files they serve.",
    icon: "truck",
    responsibilities: [
      "Issue gate passes with transporter, vehicle, driver and CNIC",
      "Record full or partial deliveries with receiver and proof",
      "Track empty container returns and detention",
    ],
    areas: ["Transport", "Job Files (view)", "Dashboard"],
    boundaries: ["No access to billing, payments or bank accounts", "Can't change customs stages or documents"],
  },
  {
    id: "read-only",
    role: "Read Only",
    headline: "See everything, change nothing.",
    summary:
      "Read Only users can view every area, including reports, without being able to create, edit, approve or delete anything — useful for management oversight and reviews.",
    icon: "eye",
    responsibilities: [
      "Follow files, stages and deliveries in real time",
      "Review invoices, statements and reports",
      "Look up the history of any record",
    ],
    areas: ["All screens (view only)", "Reports"],
    boundaries: ["No create, edit, approve, cancel or export actions", "Assign only to people who should see financial information"],
  },
];

export const presetsNote =
  "Supervisor and Employee presets are also available: Employees can browse ETA and job-file lists and submit their own job-linked vouchers; Supervisors work across operations and submit their own vouchers. Finance decisions stay with the finance permissions.";
