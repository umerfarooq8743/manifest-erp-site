import type { IconName } from "@/components/ui/icon";

/** Keys of the coded product mockups (see components/mockups/registry.tsx). */
export type ScreenKey =
  | "dashboard"
  | "eta"
  | "job-files"
  | "job-file-detail"
  | "customs-board"
  | "documents"
  | "transport"
  | "expenses"
  | "invoices"
  | "soa"
  | "banks"
  | "reports"
  | "report-detail"
  | "team"
  | "settings"
  | "activity";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  benefit: string;
  icon: IconName;
  /** Module page anchor this feature belongs to. */
  moduleId: string;
  group: "operations" | "finance" | "control";
}

export type ModuleCategory = "Overview" | "Operations" | "Accounts" | "Workspace" | "Platform";

export interface ProductModule {
  id: string;
  name: string;
  category: ModuleCategory;
  icon: IconName;
  tagline: string;
  summary: string;
  capabilities: string[];
  /** Why it matters to the business. */
  value: string;
  screen?: ScreenKey;
}

export interface WorkflowStep {
  id: string;
  title: string;
  shortTitle: string;
  icon: IconName;
  module: string;
  summary: string;
  details: string[];
  /** Which of the 17 documented workflow steps this presentation step covers. */
  docSteps: number[];
  screen: ScreenKey;
}

export interface DocumentedStep {
  n: number;
  step: string;
  where: string;
  what: string;
}

export interface CustomsStage {
  key: string;
  label: string;
  reference?: string;
}

export interface Persona {
  id: string;
  role: string;
  headline: string;
  summary: string;
  icon: IconName;
  responsibilities: string[];
  areas: string[];
  boundaries: string[];
}

export interface ReportItem {
  title: string;
  description: string;
  customerFilter?: boolean;
  period: "range" | "as-of" | "current";
}

export interface ReportCategory {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  reports: ReportItem[];
}

export interface Faq {
  question: string;
  answer: string;
}

export interface ComparisonRow {
  dimension: string;
  without: string;
  with: string;
}

export interface ScenarioStep {
  title: string;
  module: string;
  text: string;
}

export interface Scenario {
  id: string;
  title: string;
  summary: string;
  steps: ScenarioStep[];
}

/** Only publish testimonials that a real customer has approved in writing. */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  approved: true;
}

export interface IconItem {
  title: string;
  description: string;
  icon: IconName;
}

export interface SecurityControl extends IconItem {
  group: "Isolation" | "Access" | "Sessions" | "Files" | "Finance" | "Accountability";
}

export interface TechGroup {
  title: string;
  icon: IconName;
  items: { name: string; detail: string }[];
}

export interface Problem extends IconItem {
  solution: string;
}

export interface ShowcaseScreen {
  key: ScreenKey;
  title: string;
  module: string;
  description: string;
  path: string;
}
