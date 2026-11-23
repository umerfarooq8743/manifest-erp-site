import { ColumnPairChart } from "@/components/charts/column-pair-chart";
import { BarMeter, PairedBars } from "@/components/charts/bar-meter";
import { Icon } from "@/components/ui/icon";
import { demoAlerts, demoBanks, demoBilling, demoCompany, demoEta, demoMyWork, demoPipeline } from "@/data/demo";
import { formatAmount } from "@/lib/utils";
import { AppShell } from "../app-shell";
import { MAvatar, MBadge, MButton, MCard, MDot, MKpi, MSelect } from "../ui";

function Greeting() {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-2xl font-semibold tracking-tight text-m-fg">Good morning, {demoCompany.user.name.split(" ")[0]}</p>
        <p className="mt-0.5 text-xs text-m-muted">Here’s your clearing desk at {demoCompany.short} — Saturday, 22 Nov</p>
      </div>
      <div className="flex items-center gap-2">
        <MSelect icon="calendar" value="This month" />
        <MButton variant="primary" icon="plus">
          New ETA entry
        </MButton>
      </div>
    </div>
  );
}

function Pipeline() {
  const max = Math.max(...demoPipeline.map((p) => p.count));
  const half = Math.ceil(demoPipeline.length / 2);
  const cols = [demoPipeline.slice(0, half), demoPipeline.slice(half)];
  return (
    <MCard title="Customs pipeline" description="Open job files by customs stage" action={<MBadge tone="primary">49 files</MBadge>} className="col-span-2">
      <div className="grid grid-cols-2 gap-x-6">
        {cols.map((col, c) => (
          <ul key={c} className="space-y-1.5">
            {col.map((p, i) => (
              <li key={p.stage} className="grid grid-cols-[1fr_1.1fr_auto] items-center gap-2.5 text-xs">
                <span className="truncate text-m-muted">{p.stage}</span>
                <BarMeter value={(p.count / max) * 100} delay={0.03 * (i + c * half)} label={`${p.stage}: ${p.count}`} />
                <span className="num w-4 text-right text-m-fg">{p.count}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </MCard>
  );
}

function Alerts() {
  return (
    <MCard title="Live alerts" description="FI · DO · NOC expiry, detention and arrivals" action={<MBadge tone="danger">3</MBadge>}>
      <ul className="space-y-2">
        {demoAlerts.slice(0, 3).map((a) => (
          <li key={a.title} className="flex gap-2.5 rounded-lg border border-m-border bg-m-bg/60 p-2">
            <MDot tone={a.tone} className="mt-1" />
            <span className="min-w-0">
              <span className="block truncate text-xs font-medium text-m-fg">{a.title}</span>
              <span className="block truncate text-2xs text-m-muted">{a.meta}</span>
            </span>
          </li>
        ))}
      </ul>
    </MCard>
  );
}

function MyWork() {
  return (
    <MCard title="My work today" description="Assigned to you and your role" action={<span className="text-2xs text-m-primary">View all</span>}>
      <ul className="divide-y divide-m-border">
        {demoMyWork.slice(0, 3).map((w) => (
          <li key={w.label} className="flex items-center gap-2.5 py-2 first:pt-0.5">
            <span className="grid size-3.5 shrink-0 place-items-center rounded border border-m-input" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs text-m-fg">{w.label}</span>
              <span className="block truncate text-2xs text-m-muted">{w.meta}</span>
            </span>
            <MDot tone={w.tone} />
          </li>
        ))}
      </ul>
    </MCard>
  );
}

function Arrivals() {
  return (
    <MCard title="Arriving this week" description="Open ETA entries due in the next 7 days">
      <ul className="space-y-2">
        {demoEta.slice(0, 3).map((e) => (
          <li key={e.ref} className="flex items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-m-secondary text-center leading-none">
              <span className="num text-xs font-semibold text-m-fg">{e.eta.split(" ")[0]}</span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-medium text-m-fg">{e.client}</span>
              <span className="num block truncate text-2xs text-m-muted">
                {e.bl} · {e.containers}
              </span>
            </span>
            <MBadge tone={e.status === "Ready for file" ? "success" : "warning"}>{e.status === "Ready for file" ? "Ready" : `${e.docs}/4 docs`}</MBadge>
          </li>
        ))}
      </ul>
    </MCard>
  );
}

function Billing({ className }: { className?: string }) {
  return (
    <MCard
      title="Billing vs collections"
      description="Approved invoices and payments received, last 6 months (PKR)"
      action={
        <span className="text-right">
          <span className="block text-2xs text-m-muted">Collection rate</span>
          <span className="num block text-sm font-semibold text-m-fg">89.6%</span>
        </span>
      }
      className={className}
    >
      <ColumnPairChart data={demoBilling.map((d) => ({ label: d.month, a: d.invoiced, b: d.collected }))} seriesA="Invoiced" seriesB="Collected" height={150} />
    </MCard>
  );
}

function Banks() {
  return (
    <MCard title="Bank balances" description="Bank, cash and wallet accounts">
      <ul className="space-y-2">
        {demoBanks.slice(0, 4).map((b) => (
          <li key={b.name} className="flex items-center gap-2">
            <span className="grid size-6 shrink-0 place-items-center rounded-md bg-m-secondary text-m-muted">
              <Icon name={b.type === "Cash" ? "banknote" : "landmark"} className="size-3.5" />
            </span>
            <span className="min-w-0 flex-1 truncate text-xs text-m-fg">{b.name}</span>
            <span className="num text-xs text-m-fg">{formatAmount(b.balance, 0)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between border-t border-m-border pt-2.5 text-xs">
        <span className="text-m-muted">Total</span>
        <span className="num font-semibold text-m-fg">{formatAmount(demoBanks.reduce((s, b) => s + b.balance, 0), 0)}</span>
      </div>
    </MCard>
  );
}

const PROFIT = [
  { job: "MCF-2026-0131", billed: 412_000, expenses: 351_400 },
  { job: "MCF-2026-0128", billed: 538_200, expenses: 471_900 },
  { job: "MCF-2026-0124", billed: 296_500, expenses: 248_100 },
  { job: "MCF-2026-0121", billed: 621_800, expenses: 559_300 },
];

function FileProfit() {
  const max = Math.max(...PROFIT.map((p) => p.billed));
  return (
    <MCard
      title="File-wise profit"
      description="Billed vs. expenses on recently billed files"
      action={
        <span className="flex gap-3 text-2xs text-m-muted">
          <span className="inline-flex items-center gap-1">
            <span className="size-2 rounded-sm bg-c1" />
            Billed
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="size-2 rounded-sm bg-c3" />
            Expenses
          </span>
        </span>
      }
    >
      <ul className="space-y-2.5">
        {PROFIT.slice(0, 4).map((p, i) => (
          <li key={p.job} className="grid grid-cols-[1.3fr_3fr_0.9fr] items-center gap-3 text-xs">
            <span className="num truncate text-m-muted">{p.job}</span>
            <PairedBars a={p.billed} b={p.expenses} max={max} labelA={`Billed ${formatAmount(p.billed, 0)}`} labelB={`Expenses ${formatAmount(p.expenses, 0)}`} delay={0.05 * i} />
            <span className="num text-right font-medium text-m-fg">+{formatAmount(p.billed - p.expenses, 0)}</span>
          </li>
        ))}
      </ul>
    </MCard>
  );
}

const WORKLOAD = [
  { initials: "BR", name: "Bilal Raza", files: 18, eta: 4, vouchers: 3 },
  { initials: "IA", name: "Imran Ali", files: 9, eta: 1, vouchers: 2 },
  { initials: "SK", name: "Sana Khan", files: 6, eta: 0, vouchers: 0 },
  { initials: "AM", name: "Ayesha Malik", files: 4, eta: 1, vouchers: 0 },
];

function Workload() {
  return (
    <MCard title="Staff workload" description="Open files, ETA entries and pending vouchers per person">
      <div className="grid grid-cols-[2.4fr_repeat(3,minmax(0,0.6fr))] gap-y-2 text-xs">
        <span className="text-2xs uppercase tracking-wider text-m-subtle">Staff</span>
        <span className="text-right text-2xs uppercase tracking-wider text-m-subtle">Files</span>
        <span className="text-right text-2xs uppercase tracking-wider text-m-subtle">ETA</span>
        <span className="text-right text-2xs uppercase tracking-wider text-m-subtle">Vouchers</span>
        {WORKLOAD.map((w) => (
          <div key={w.initials} className="contents">
            <span className="flex min-w-0 items-center gap-2">
              <MAvatar initials={w.initials} tone="primary" />
              <span className="truncate text-m-fg">{w.name}</span>
            </span>
            <span className="num self-center text-right text-m-fg">{w.files}</span>
            <span className="num self-center text-right text-m-fg">{w.eta}</span>
            <span className="num self-center text-right text-m-fg">{w.vouchers}</span>
          </div>
        ))}
      </div>
    </MCard>
  );
}

export function DashboardScreen({ variant = "overview" }: { variant?: "overview" | "finance" }) {
  return (
    <AppShell active="dashboard" crumbs={[demoCompany.short, "Dashboard"]} path="/dashboard">
      <div className="flex h-full flex-col gap-4">
        <Greeting />
        {variant === "overview" ? (
          <>
            <div className="grid grid-cols-5 gap-3">
              <MKpi label="Open job files" value="48" hint="31 in customs" icon="folder-kanban" tone="primary" />
              <MKpi label="Arriving in 7 days" value="9" hint="Port Qasim 5 · KPT 4" icon="ship" tone="info" />
              <MKpi label="Documents pending" value="6" hint="2 missing FI" icon="file-stack" tone="warning" />
              <MKpi label="Awaiting delivery" value="7" hint="3 gate passes issued" icon="truck" tone="neutral" />
              <MKpi label="Empty containers to return" value="5" hint="1 in detention" icon="container" tone="danger" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Pipeline />
              <Alerts />
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-3 gap-4">
              <MyWork />
              <Arrivals />
              <Billing />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-5 gap-3">
              <MKpi label="Outstanding receivables" value="2.18M" hint="PKR · 14 clients" icon="hand-coins" tone="warning" />
              <MKpi label="Invoiced this month" value="4.05M" hint="PKR · 23 invoices" icon="receipt" tone="primary" />
              <MKpi label="Collected this month" value="3.38M" hint="PKR · 19 receipts" icon="coins" tone="success" />
              <MKpi label="Vouchers awaiting approval" value="4" hint="PKR 182,400 claimed" icon="wallet" tone="info" />
              <MKpi label="Open job files" value="48" hint="9 arriving in 7 days" icon="folder-kanban" tone="neutral" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Billing className="col-span-2" />
              <Banks />
              <Alerts />
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-2 gap-4">
              <FileProfit />
              <Workload />
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
