import type { ScreenKey } from "@/types/content";

/** Accessible descriptions for each mockup (kept free of component imports). */
export const SCREEN_LABELS: Record<ScreenKey, string> = {
  dashboard: "the operations dashboard",
  eta: "the ETA sheet",
  "job-files": "the job files list",
  "job-file-detail": "a job file overview",
  "customs-board": "the customs board",
  documents: "a job file documentation checklist",
  transport: "transport, gate passes and deliveries",
  expenses: "expense vouchers with an approval dialog",
  invoices: "the invoice editor",
  soa: "a customer statement of account",
  banks: "bank accounts and the ledger",
  reports: "the reports catalogue",
  "report-detail": "the receivables aging report",
  team: "team members and role permissions",
  settings: "company settings",
  activity: "the activity log",
};

export const MOCK_ASPECT = "1280 / 796";

export const mockupLabel = (screen: ScreenKey, variant?: "finance") =>
  `Illustrative preview of ${screen === "dashboard" && variant === "finance" ? "the finance dashboard" : SCREEN_LABELS[screen]} in Manifest ERP, with fictional sample data`;

export const mockupFrameClass = "relative overflow-hidden rounded-xl border border-line bg-surface shadow-elevated sm:rounded-2xl";
