import type { SecurityControl, TechGroup } from "@/types/content";

export const securityControls: SecurityControl[] = [
  {
    group: "Isolation",
    title: "Company-level data isolation",
    description:
      "Every business record belongs to exactly one company. The server determines the current company from the signed-in session — never from what the browser sends — and filters every query by it.",
    icon: "building",
  },
  {
    group: "Access",
    title: "Role-based access control",
    description: "Five system roles plus Supervisor and Employee presets, built from permissions organised in 16 groups.",
    icon: "users",
  },
  {
    group: "Access",
    title: "Permission checks on the server",
    description: "Each action is checked against the user's permissions for the current company on the server, not just hidden in the interface.",
    icon: "shield-check",
  },
  {
    group: "Sessions",
    title: "Two-factor authentication",
    description: "Optional authenticator-app (TOTP) codes with recovery codes. Two-factor secrets are stored encrypted.",
    icon: "key-round",
  },
  {
    group: "Sessions",
    title: "Session & refresh-token protection",
    description:
      "Short-lived access tokens are kept in memory; the refresh token sits in an httpOnly cookie and rotates on use. Reuse of an old token revokes the session, and a password change signs out other devices.",
    icon: "refresh",
  },
  {
    group: "Sessions",
    title: "Account lockout & password policy",
    description: "Repeated wrong passwords lock the account for a period, and the lock is audited. A stronger password policy applies in production.",
    icon: "lock",
  },
  {
    group: "Files",
    title: "Company-scoped file access",
    description:
      "Uploads are stored per company. Files are never public: each link is signed for one file and expires, and files are served so that uploaded content can't run scripts.",
    icon: "paperclip",
  },
  {
    group: "Accountability",
    title: "Audit history",
    description: "Business actions are recorded with who, what, when and before/after values — per company, and platform-wide for the operator.",
    icon: "activity",
  },
  {
    group: "Finance",
    title: "Financial record controls",
    description:
      "Money documents are locked while they change, so simultaneous requests can't overpay, double-bill or over-deliver. Invoice lines keep the tax rate they were billed at, and file statuses follow the workflow rather than being typed in.",
    icon: "scale",
  },
  {
    group: "Finance",
    title: "Accounting-period locking",
    description: "Money records dated in a closed period can't be created, edited, approved or cancelled. Admins configure the rolling window and an optional fixed close date.",
    icon: "calendar-range",
  },
  {
    group: "Finance",
    title: "Controlled access to financial data",
    description: "Billing figures on the dashboard appear only for roles with invoice or payment rights, bank balances only with account rights, and each report needs its data permission.",
    icon: "eye",
  },
  {
    group: "Access",
    title: "Safe invitations",
    description: "Invitations never change an existing account — no password overwrite, no two-factor bypass — and there is no cross-company user directory.",
    icon: "user-plus",
  },
];

export const securityNote =
  "Security is an ongoing practice rather than a finished state. Manifest ERP does not claim certifications; the controls above describe how the product is built today.";

/** High-level request path for company data. */
export const requestFlow = [
  { label: "Browser", detail: "Signed-in user, current company selected", icon: "globe" },
  { label: "API", detail: "Rate-limited, security headers, restricted CORS", icon: "server" },
  { label: "Authentication", detail: "Access token verified", icon: "key-round" },
  { label: "Company & permission", detail: "Membership loaded; permission checked", icon: "shield-check" },
  { label: "Business module", detail: "Validated input, business rules applied", icon: "layers" },
  { label: "Database", detail: "Every query filtered by company", icon: "database" },
] as const;

export const erpStack: TechGroup[] = [
  {
    title: "Frontend",
    icon: "layout-dashboard",
    items: [
      { name: "React 18", detail: "Single-page application" },
      { name: "Vite 5", detail: "Build tooling" },
      { name: "TanStack Router, Query & Table", detail: "Routing, data and tables" },
      { name: "Tailwind CSS & Radix UI", detail: "Light and dark design system" },
      { name: "Recharts", detail: "Dashboard charts" },
    ],
  },
  {
    title: "Backend",
    icon: "server",
    items: [
      { name: "Node.js & Express", detail: "API server" },
      { name: "TypeScript (strict)", detail: "Across frontend, backend and shared code" },
      { name: "Zod", detail: "Validation at every boundary" },
      { name: "Socket.IO", detail: "Notifications and live badges" },
    ],
  },
  {
    title: "Data",
    icon: "database",
    items: [
      { name: "PostgreSQL", detail: "Primary database" },
      { name: "Prisma ORM", detail: "Schema and migrations" },
      { name: "Redis & BullMQ", detail: "Optional — background e-mail and daily digest" },
    ],
  },
  {
    title: "Security",
    icon: "shield-check",
    items: [
      { name: "JWT access tokens", detail: "Short-lived, kept in memory" },
      { name: "Rotating refresh cookies", detail: "httpOnly, rotated on use" },
      { name: "TOTP two-factor", detail: "With recovery codes" },
    ],
  },
  {
    title: "Documents & e-mail",
    icon: "printer",
    items: [
      { name: "Puppeteer & pdf-lib", detail: "Branded PDF generation" },
      { name: "ExcelJS", detail: "Excel exports" },
      { name: "Nodemailer", detail: "SMTP e-mail" },
    ],
  },
  {
    title: "Operations",
    icon: "activity",
    items: [
      { name: "Pino", detail: "Structured logs with request IDs" },
      { name: "Vitest & Supertest", detail: "Unit, HTTP and database-backed tests" },
      { name: "GitHub Actions", detail: "CI on every push and pull request" },
    ],
  },
];

export const websiteStack = [
  { name: "Next.js (App Router)", detail: "Statically rendered pages" },
  { name: "TypeScript (strict)", detail: "Typed content and components" },
  { name: "Tailwind CSS", detail: "Design tokens for light and dark" },
  { name: "Framer Motion", detail: "Purposeful, reduced-motion aware animation" },
  { name: "Vercel", detail: "Deployment — no database or backend" },
];
