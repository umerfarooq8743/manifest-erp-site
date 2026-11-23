import { Icon, type IconName } from "@/components/ui/icon";
import { LogoMark } from "@/components/ui/logo";
import { demoActivity, demoCompany, type Tone } from "@/data/demo";
import { cn } from "@/lib/utils";
import { AppShell } from "../app-shell";
import { MAvatar, MBadge, MButton, MCard, MField, MInput, MMono, MMuted, MPageHeader, MSelect, MTable, MTabs, MToggle } from "../ui";

/* ── Team & permissions ──────────────────────────────────────────── */
const MEMBERS: { name: string; initials: string; email: string; role: string; status: "Active" | "Invited"; twoFa: boolean; owner?: boolean }[] = [
  { name: "Ayesha Malik", initials: "AM", email: "ayesha@meridian.example", role: "Company Admin", status: "Active", twoFa: true, owner: true },
  { name: "Bilal Raza", initials: "BR", email: "bilal@meridian.example", role: "Operations Staff", status: "Active", twoFa: true },
  { name: "Sana Khan", initials: "SK", email: "sana@meridian.example", role: "Accounts Staff", status: "Active", twoFa: true },
  { name: "Imran Ali", initials: "IA", email: "imran@meridian.example", role: "Transport Staff", status: "Active", twoFa: false },
  { name: "Hamza Tariq", initials: "HT", email: "hamza@meridian.example", role: "Read Only", status: "Active", twoFa: false },
  { name: "Zainab Qureshi", initials: "ZQ", email: "zainab@meridian.example", role: "Employee", status: "Invited", twoFa: false },
];

/** Accounts Staff, as defined in the product's role matrix. */
const MATRIX: { area: string; perms: [boolean, boolean, boolean, boolean, boolean] }[] = [
  { area: "Job files", perms: [true, false, false, false, false] },
  { area: "Customs operations", perms: [false, false, false, false, false] },
  { area: "Expenses", perms: [true, true, true, true, false] },
  { area: "Invoices", perms: [true, true, true, true, true] },
  { area: "Payments", perms: [true, true, true, false, false] },
  { area: "Banks & accounts", perms: [true, true, true, true, false] },
  { area: "Reports", perms: [true, false, false, false, true] },
  { area: "Team & access", perms: [false, false, false, false, false] },
];

export function TeamScreen() {
  const roleTone: Record<string, Tone> = {
    "Company Admin": "primary",
    "Operations Staff": "info",
    "Accounts Staff": "warning",
    "Transport Staff": "neutral",
    "Read Only": "neutral",
    Employee: "neutral",
  };
  return (
    <AppShell active="team" crumbs={[demoCompany.short, "Workspace", "Team & Access"]} path="/users">
      <div className="flex h-full flex-col gap-4">
        <MPageHeader
          title="Team & Access"
          description="Members, invitations and roles for this company only"
          actions={
            <MButton variant="primary" icon="user-plus">
              Add user
            </MButton>
          }
        />
        <MTabs items={["Members · 6", "Invitations · 1", "Roles"]} active="Members · 6" />
        <div className="grid min-h-0 flex-1 grid-cols-[1.55fr_1fr] gap-4">
          <MTable
            className="self-start"
            columns={[
              { label: "Member" },
              { label: "Role", className: "w-32" },
              { label: "2FA", className: "w-12", align: "center" },
              { label: "Status", className: "w-20" },
            ]}
            rows={MEMBERS.map((m) => [
              <span key="m" className="flex items-center gap-2.5">
                <MAvatar initials={m.initials} tone="primary" className="size-7" />
                <span className="min-w-0 leading-tight">
                  <span className="flex items-center gap-1.5 font-medium">
                    {m.name}
                    {m.owner && <MBadge tone="primary">Owner</MBadge>}
                  </span>
                  <MMuted className="block truncate text-2xs">{m.email}</MMuted>
                </span>
              </span>,
              <MBadge key="r" tone={roleTone[m.role] ?? "neutral"}>
                {m.role}
              </MBadge>,
              <span key="f" className="flex justify-center">
                <Icon name={m.twoFa ? "shield-check" : "lock"} className={cn("size-3.5", m.twoFa ? "text-m-success" : "text-m-subtle")} />
              </span>,
              <MBadge key="s" dot tone={m.status === "Active" ? "success" : "warning"}>
                {m.status}
              </MBadge>,
            ])}
          />
          <MCard title="Role permissions · Accounts Staff" description="Checked on the server for the current company" className="min-h-0">
            <div className="grid grid-cols-[1.6fr_repeat(5,minmax(0,1fr))] items-center gap-y-1.5 text-xs">
              {["Area", "View", "Create", "Edit", "Approve", "Print/Export"].map((h, i) => (
                <span key={h} className={cn("pb-1 text-2xs font-medium uppercase tracking-wider text-m-subtle", i > 0 && "text-center")}>
                  {h === "Print/Export" ? "Export" : h}
                </span>
              ))}
              {MATRIX.map((row) => (
                <div key={row.area} className="contents">
                  <span className="truncate border-t border-m-border pt-1.5 text-m-fg">{row.area}</span>
                  {row.perms.map((on, i) => (
                    <span key={i} className="flex justify-center border-t border-m-border pt-1.5">
                      {on ? (
                        <span className="grid size-4 place-items-center rounded-full bg-m-success-soft text-m-success">
                          <Icon name="check" className="size-2.5" strokeWidth={3} />
                        </span>
                      ) : (
                        <span className="h-px w-2.5 bg-m-input" />
                      )}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <p className="mt-3 rounded-lg bg-m-secondary p-2.5 text-2xs text-m-muted">
              Money follows finance rights: billing figures and bank balances only appear for roles allowed to see them.
            </p>
          </MCard>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Company settings ────────────────────────────────────────────── */
const SETTINGS_NAV: { label: string; icon: IconName }[] = [
  { label: "Profile", icon: "users-round" },
  { label: "Security", icon: "shield-check" },
  { label: "Company", icon: "building" },
  { label: "Business rules", icon: "sliders" },
  { label: "Appearance", icon: "palette" },
];

export function SettingsScreen() {
  return (
    <AppShell active="settings" crumbs={[demoCompany.short, "Settings", "Company"]} path="/settings/company">
      <div className="flex h-full gap-5">
        <nav className="w-44 shrink-0 space-y-0.5">
          <p className="px-2 pb-2 text-2xs font-medium uppercase tracking-wider text-m-subtle">Settings</p>
          {SETTINGS_NAV.map((item) => (
            <span
              key={item.label}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs",
                item.label === "Company" ? "bg-m-card font-medium text-m-fg shadow-[0_1px_2px_rgb(15_23_42/0.06)] ring-1 ring-m-border" : "text-m-muted",
              )}
            >
              <Icon name={item.icon} className="size-3.5" />
              {item.label}
            </span>
          ))}
        </nav>
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <MPageHeader
            title="Company"
            description="Changes apply to Meridian C&F only · audited"
            actions={
              <MButton variant="primary" icon="check">
                Save changes
              </MButton>
            }
          />
          <div className="grid min-h-0 flex-1 grid-cols-[1.5fr_1fr] gap-4">
            <div className="flex min-h-0 flex-col gap-4">
              <MCard title="Company profile">
                <div className="grid grid-cols-3 gap-3">
                  <MField label="Company name" value={demoCompany.name} className="col-span-2" />
                  <MField label="Short code" value="MCF" mono hint="Used in job numbers" />
                  <MField label="Legal name" value="Meridian Clearing & Forwarding (Pvt) Ltd" className="col-span-2" />
                  <MField label="Job-file prefix" value="MCF" mono />
                  <MField label="NTN" value="•••••••-4" mono />
                  <MField label="STRN" value="••-••-••••-•••-71" mono />
                  <MField label="Customs licence" value="CHAL-••••/K" mono />
                </div>
              </MCard>
              <MCard title="Regional" description="Drives “today”, due dates and reminders">
                <div className="grid grid-cols-2 gap-3">
                  <MField label="Currency" value="PKR — Pakistani Rupee" />
                  <MField label="Time zone" value="Asia/Karachi (UTC+05:00)" />
                </div>
              </MCard>
            </div>
            <div className="flex min-h-0 flex-col gap-4">
              <MCard title="Branding" description="Used on invoices, job files and statements">
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { label: "Logo", done: true },
                    { label: "Letterhead", done: true },
                    { label: "Stamp", done: true },
                    { label: "Signature", done: false },
                  ].map((b) => (
                    <div key={b.label} className="flex flex-col items-center gap-1.5 rounded-lg border border-dashed border-m-input p-2.5">
                      {b.label === "Logo" ? (
                        <LogoMark className="size-7" />
                      ) : (
                        <span className={cn("grid size-7 place-items-center rounded-md", b.done ? "bg-m-primary-soft text-m-primary" : "bg-m-secondary text-m-subtle")}>
                          <Icon name={b.done ? "check" : "upload"} className="size-3.5" />
                        </span>
                      )}
                      <span className="text-2xs font-medium text-m-fg">{b.label}</span>
                    </div>
                  ))}
                </div>
              </MCard>
              <MCard title="Business rules" description="Defaults every form starts from" className="min-h-0 flex-1">
                <ul className="space-y-2 text-xs">
                  {[
                    ["Tax codes", "ST 13% · SST 13% · PST 16%"],
                    ["Required documents", "BL, CI, PL, FI"],
                    ["Alert window", "7 days ahead"],
                    ["Periods kept open", "This month + 2"],
                  ].map(([k, v]) => (
                    <li key={k} className="flex items-center justify-between gap-3">
                      <span className="text-m-muted">{k}</span>
                      <span className="truncate text-right text-m-fg">{v}</span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between gap-3">
                    <span className="text-m-muted">Daily digest</span>
                    <MToggle on />
                  </li>
                </ul>
              </MCard>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Activity log ────────────────────────────────────────────────── */
export function ActivityScreen() {
  return (
    <AppShell active="activity" crumbs={[demoCompany.short, "Workspace", "Activity Log"]} path="/activity">
      <div className="flex h-full flex-col gap-4">
        <MPageHeader
          title="Activity Log"
          description="Business actions across your company — who, what, when, before and after"
          actions={<MButton icon="file-spreadsheet">Export Excel</MButton>}
        />
        <div className="flex items-center gap-3">
          <MInput icon="search" placeholder="Search records…" className="w-60" />
          <MSelect label="User" value="Everyone" className="w-40" />
          <MSelect label="Action" value="All actions" className="w-44" />
          <MSelect icon="calendar" value="Today" className="w-36" />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[1.7fr_1fr] gap-4">
          <MTable
            className="self-start"
            columns={[
              { label: "Time", className: "w-14" },
              { label: "User", className: "w-12" },
              { label: "Action", className: "w-40" },
              { label: "Record", className: "w-32" },
              { label: "Change" },
            ]}
            rows={demoActivity.map((a, i) => [
              <MMono key="t" className="text-m-muted">
                {a.time}
              </MMono>,
              <MAvatar key="u" initials={a.user} tone="primary" />,
              <span key="a" className={cn("font-medium", i === 0 && "text-m-primary")}>
                {a.action}
              </span>,
              <MMono key="r">{a.record}</MMono>,
              <MMuted key="c">{a.change}</MMuted>,
            ])}
          />
          <MCard title="Approved voucher" description="VCH-2026-0409 · today 10:42 · Sana Khan" className="min-h-0">
            <p className="mb-2 text-2xs font-medium uppercase tracking-wider text-m-subtle">Changes</p>
            <ul className="space-y-2">
              {[
                ["Status", "Pending", "Approved"],
                ["Approved amount", "—", "11,500.00"],
                ["Paid from", "—", "Bank Al Habib — Duty"],
              ].map(([field, before, after]) => (
                <li key={field} className="rounded-lg border border-m-border p-2 text-xs">
                  <p className="text-2xs text-m-muted">{field}</p>
                  <p className="mt-0.5 flex items-center gap-2">
                    <span className="num rounded bg-m-danger-soft px-1.5 text-m-danger line-through">{before}</span>
                    <Icon name="arrow-right" className="size-3 text-m-subtle" />
                    <span className="num rounded bg-m-success-soft px-1.5 text-m-success">{after}</span>
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-3 rounded-lg bg-m-secondary p-2.5 text-2xs text-m-muted">
              Claimed 12,000.00 · reason: “receipt amount” — the original claim is kept.
            </div>
          </MCard>
        </div>
      </div>
    </AppShell>
  );
}
