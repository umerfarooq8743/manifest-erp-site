import type { ReactNode } from "react";
import { demoCompany } from "@/data/demo";
import { Icon, type IconName } from "@/components/ui/icon";
import { LogoMark } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export type NavKey =
  | "dashboard"
  | "eta"
  | "files"
  | "customs"
  | "transport"
  | "expenses"
  | "billing"
  | "banks"
  | "reports"
  | "customers"
  | "masters"
  | "team"
  | "activity"
  | "settings";

/** Mirrors the product's sidebar sections and order. */
const NAV: { title: string; items: { key: NavKey; label: string; icon: IconName; badge?: number }[] }[] = [
  { title: "Overview", items: [{ key: "dashboard", label: "Dashboard", icon: "layout-dashboard", badge: 4 }] },
  {
    title: "Operations",
    items: [
      { key: "eta", label: "ETA Sheet", icon: "calendar-clock", badge: 6 },
      { key: "files", label: "Job Files", icon: "folder-kanban" },
      { key: "customs", label: "Customs Board", icon: "workflow", badge: 12 },
      { key: "transport", label: "Transport", icon: "truck" },
    ],
  },
  {
    title: "Accounts",
    items: [
      { key: "expenses", label: "Expenses", icon: "wallet", badge: 4 },
      { key: "billing", label: "Billing & SOA", icon: "receipt", badge: 2 },
      { key: "banks", label: "Banks", icon: "landmark" },
      { key: "reports", label: "Reports", icon: "chart-column" },
    ],
  },
  {
    title: "Workspace",
    items: [
      { key: "customers", label: "Customers", icon: "users-round" },
      { key: "masters", label: "Masters", icon: "database" },
      { key: "team", label: "Team & Access", icon: "users" },
      { key: "activity", label: "Activity Log", icon: "activity" },
    ],
  },
];

function Sidebar({ active }: { active: NavKey }) {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-m-sidebar-border bg-m-sidebar text-m-sidebar-fg">
      <div className="flex items-center gap-2.5 border-b border-m-sidebar-border px-3.5 py-3">
        <LogoMark className="size-7" />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-sm font-semibold">{demoCompany.short}</p>
          <p className="truncate text-2xs text-m-sidebar-muted">Demo workspace · {demoCompany.code}</p>
        </div>
        <Icon name="chevron-down" className="size-3.5 text-m-sidebar-muted" />
      </div>
      <nav className="flex-1 space-y-3.5 overflow-hidden px-2.5 py-3">
        {NAV.map((section) => (
          <div key={section.title}>
            <p className="px-2 pb-1 text-2xs font-medium uppercase tracking-wider text-m-sidebar-muted">{section.title}</p>
            <ul className="space-y-px">
              {section.items.map((item) => {
                const isActive = item.key === active;
                return (
                  <li key={item.key}>
                    <span
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs",
                        isActive ? "bg-m-sidebar-accent font-medium text-white" : "text-m-sidebar-muted",
                      )}
                    >
                      <Icon name={item.icon} className={cn("size-4", isActive && "text-m-primary")} strokeWidth={1.75} />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge !== undefined && (
                        <span
                          className={cn(
                            "num rounded-full px-1.5 text-2xs",
                            isActive ? "bg-m-primary text-m-primary-fg" : "bg-m-sidebar-accent text-m-sidebar-fg",
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="flex items-center gap-2.5 border-t border-m-sidebar-border px-3.5 py-3">
        <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-600 text-2xs font-semibold text-white">
          {demoCompany.user.initials}
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-xs font-medium">{demoCompany.user.name}</p>
          <p className="truncate text-2xs text-m-sidebar-muted">{demoCompany.user.role}</p>
        </div>
        <Icon name="settings" className={cn("size-4", active === "settings" ? "text-m-primary" : "text-m-sidebar-muted")} />
      </div>
    </aside>
  );
}

function Topbar({ crumbs }: { crumbs: string[] }) {
  return (
    <div className="flex h-12 shrink-0 items-center gap-3 border-b border-m-border bg-m-card/80 px-5">
      <div className="flex min-w-0 items-center gap-1.5 text-xs">
        {crumbs.map((crumb, i) => (
          <span key={crumb} className="flex min-w-0 items-center gap-1.5">
            {i > 0 && <Icon name="chevron-right" className="size-3 text-m-subtle" />}
            <span className={cn("truncate", i === crumbs.length - 1 ? "font-medium text-m-fg" : "text-m-muted")}>{crumb}</span>
          </span>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span className="flex h-7 w-64 items-center gap-2 rounded-lg border border-m-border bg-m-bg px-2.5 text-xs text-m-subtle">
          <Icon name="search" className="size-3.5" />
          <span className="flex-1 truncate">Search files, BL, clients…</span>
          <span className="rounded border border-m-border px-1 font-mono text-2xs">⌘K</span>
        </span>
        <span className="relative grid size-7 place-items-center rounded-lg text-m-muted">
          <Icon name="bell" className="size-4" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-m-danger" />
        </span>
      </div>
    </div>
  );
}

function BrowserBar({ path }: { path: string }) {
  return (
    <div className="flex h-9 shrink-0 items-center gap-3 border-b border-m-border bg-m-secondary px-3.5">
      <div className="flex gap-1.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="mx-auto flex h-6 w-1/2 items-center justify-center gap-1.5 rounded-md bg-m-card px-3 text-2xs text-m-muted">
        <Icon name="lock" className="size-2.5" />
        <span className="truncate">
          manifest<span className="text-m-subtle">{path}</span>
        </span>
      </div>
      <span className="w-12" />
    </div>
  );
}

/**
 * The complete application frame. Designed on a 1280px canvas; the
 * surrounding .mock-viewport scales it to any width.
 */
export function AppShell({
  active,
  crumbs,
  path,
  children,
  overlay,
  contentClassName,
}: {
  active: NavKey;
  crumbs: string[];
  path: string;
  children: ReactNode;
  overlay?: ReactNode;
  contentClassName?: string;
}) {
  return (
    <div className="mock-root flex flex-col bg-m-bg">
      <BrowserBar path={path} />
      <div className="relative flex h-190">
        <Sidebar active={active} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar crumbs={crumbs} />
          <div className={cn("min-h-0 flex-1 overflow-hidden p-5", contentClassName)}>{children}</div>
        </div>
        {overlay && (
          <div className="absolute inset-0 z-10">
            <div className="absolute inset-0 bg-slate-950/30" />
            {overlay}
          </div>
        )}
      </div>
    </div>
  );
}
