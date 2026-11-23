import { BarMeter } from "@/components/charts/bar-meter";
import { Icon, type IconName } from "@/components/ui/icon";
import { demoAging, demoBanks, demoCompany, demoInvoiceLines, demoLedger, demoSoa, demoVouchers, type Tone } from "@/data/demo";
import { cn, formatAmount } from "@/lib/utils";
import { AppShell } from "../app-shell";
import { MBadge, MButton, MCard, MCheckbox, MDialog, MField, MInput, MKpi, MMono, MMuted, MPageHeader, MSegmented, MSelect, MTable, MTabs } from "../ui";

const BILLING_TABS = ["Invoices", "Payments", "Statement of account", "Adjustments", "Sale returns"];

/* ── Expenses & vouchers (with approval dialog) ──────────────────── */
export function ExpensesScreen() {
  const statusTone: Record<string, Tone> = { Pending: "warning", Approved: "success", Rejected: "danger" };
  return (
    <AppShell
      active="expenses"
      crumbs={[demoCompany.short, "Accounts", "Expenses"]}
      path="/expenses"
      overlay={
        <MDialog
          title="Approve voucher VCH-2026-0412"
          description="MCF-2026-0146 · Crescent Polymers · Customs duty · submitted by Bilal Raza"
          className="left-1/2 top-16 w-104 -translate-x-1/2"
          footer={
            <>
              <MButton>Cancel</MButton>
              <MButton variant="primary" icon="check">
                Approve
              </MButton>
            </>
          }
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <MField label="Claimed amount" value="486,250.00" mono />
              <MField label="Approved amount" value="486,250.00" mono hint="Reason needed if it differs — both are kept" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <MField label="Paid from account" value="Bank Al Habib — Duty" hint="Reduces that account’s balance" />
              <MField label="Paid on" value="22 Nov 2026" />
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-m-secondary p-2.5 text-xs text-m-muted">
              <Icon name="paperclip" className="size-3.5" />
              <span className="flex-1 truncate text-m-fg">duty-challan-48177.pdf</span>
              <MBadge tone="primary">Billable</MBadge>
            </div>
          </div>
        </MDialog>
      }
    >
      <div className="flex h-full flex-col gap-4">
        <MPageHeader
          title="Expenses"
          description="Staff vouchers per job file — billable or not, with receipts"
          actions={
            <MButton variant="primary" icon="plus">
              New voucher
            </MButton>
          }
        />
        <div className="flex items-center gap-3">
          <MSegmented items={["Pending · 3", "Approved", "Rejected", "All"]} active="Pending · 3" />
          <MInput icon="search" placeholder="Voucher, job file, head…" className="ml-auto w-56" />
          <MSelect value="All heads" />
        </div>
        <MTable
          columns={[
            { label: "Voucher", className: "w-32" },
            { label: "Date", className: "w-16" },
            { label: "Job file", className: "w-32" },
            { label: "Head" },
            { label: "Claimed", className: "w-24", align: "right" },
            { label: "Approved", className: "w-24", align: "right" },
            { label: "Billable", className: "w-18", align: "center" },
            { label: "Status", className: "w-24" },
          ]}
          rows={demoVouchers.map((v) => [
            <MMono key="n">{v.no}</MMono>,
            <MMono key="d" className="text-m-muted">
              {v.date}
            </MMono>,
            <span key="j" className="num text-m-primary">
              {v.job}
            </span>,
            <span key="h" className="flex items-center gap-1.5">
              {v.head}
              {!v.receipt && <MBadge tone="warning">No receipt</MBadge>}
            </span>,
            <MMono key="c">{formatAmount(v.claimed)}</MMono>,
            v.approved === null ? (
              <MMuted key="a">—</MMuted>
            ) : (
              <MMono key="a" className={cn(v.approved !== v.claimed && "text-m-warning")}>
                {formatAmount(v.approved)}
              </MMono>
            ),
            <span key="b" className="flex justify-center">
              <MCheckbox checked={v.billable} />
            </span>,
            <MBadge key="s" dot tone={statusTone[v.status] ?? "neutral"}>
              {v.status}
            </MBadge>,
          ])}
        />
      </div>
    </AppShell>
  );
}

/* ── Invoice editor ──────────────────────────────────────────────── */
const PRINTED_WITH: { icon: IconName; title: string; meta: string }[] = [
  { icon: "landmark", title: "Bank Alfalah — Current", meta: "Printed on invoices" },
  { icon: "stamp", title: "Letterhead, stamp & signature", meta: "From company branding" },
  { icon: "badge-percent", title: "Tax per line", meta: "Rate kept as billed" },
];

export function InvoicesScreen() {
  const agency = demoInvoiceLines.filter((l) => l.kind === "Agency").reduce((s, l) => s + l.amount, 0);
  const reimb = demoInvoiceLines.filter((l) => l.kind === "Reimbursement").reduce((s, l) => s + l.amount, 0);
  const tax = demoInvoiceLines.reduce((s, l) => s + l.taxAmount, 0);
  return (
    <AppShell active="billing" crumbs={[demoCompany.short, "Accounts", "Billing & SOA"]} path="/billing">
      <div className="flex h-full flex-col gap-4">
        <MPageHeader title="Billing & SOA" description="Invoices, payments, statements of account and adjustments" />
        <MTabs items={BILLING_TABS} active="Invoices" />
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-4">
          <MCard
            title={
              <span className="flex items-center gap-2">
                Draft invoice <MBadge tone="neutral">Draft</MBadge>
              </span>
            }
            description="MCF-2026-0142 · Arcadia Pharma Imports"
            className="col-span-2 min-h-0"
          >
            <div className="mb-3 grid grid-cols-4 gap-3">
              <MField label="Client" value="Arcadia Pharma Imports" />
              <MField label="Job file" value="MCF-2026-0142" mono />
              <MField label="Invoice date" value="15 Nov 2026" />
              <MField label="Due date" value="Set on approval" />
            </div>
            <MTable
              dense
              columns={[
                { label: "Type", className: "w-32" },
                { label: "Description" },
                { label: "Tax", className: "w-20" },
                { label: "Amount", className: "w-24", align: "right" },
                { label: "Tax amt", className: "w-20", align: "right" },
              ]}
              rows={demoInvoiceLines.map((l) => [
                <MBadge key="k" tone={l.kind === "Agency" ? "primary" : "info"}>
                  {l.kind}
                </MBadge>,
                <span key="d">{l.desc}</span>,
                <MMono key="t" className="text-m-muted">
                  {l.tax}
                </MMono>,
                <MMono key="a">{formatAmount(l.amount)}</MMono>,
                <MMono key="x" className="text-m-muted">
                  {l.taxAmount ? formatAmount(l.taxAmount) : "—"}
                </MMono>,
              ])}
            />
            <div className="mt-3 rounded-xl border border-dashed border-m-input p-3">
              <p className="mb-2 text-2xs font-medium uppercase tracking-wider text-m-subtle">Pending & available vouchers for this job</p>
              <div className="flex items-center gap-3 text-xs">
                <MMono>VCH-2026-0411</MMono>
                <span className="text-m-fg">D/O charges</span>
                <MBadge tone="warning">Pending approval</MBadge>
                <MMono className="ml-auto">38,500.00</MMono>
                <MButton className="h-7">Review &amp; add</MButton>
              </div>
            </div>
          </MCard>
          <div className="flex min-h-0 flex-col gap-4">
            <MCard title="Totals" description="Live, as lines change">
              <dl className="space-y-2 text-xs">
                {[
                  ["Agency services", agency],
                  ["Reimbursements", reimb],
                  ["Sales tax (ST 13%)", tax],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <dt className="text-m-muted">{label}</dt>
                    <dd className="num text-m-fg">{formatAmount(Number(value))}</dd>
                  </div>
                ))}
                <div className="flex justify-between border-t border-m-border pt-2 text-sm">
                  <dt className="font-semibold text-m-fg">Invoice total</dt>
                  <dd className="num font-semibold text-m-fg">PKR {formatAmount(agency + reimb + tax)}</dd>
                </div>
              </dl>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <MButton className="justify-center">Save draft</MButton>
                <MButton variant="primary" className="justify-center">
                  Approve
                </MButton>
              </div>
              <p className="mt-2 text-2xs text-m-muted">Approval stamps the due date: invoice date + client’s payment terms.</p>
            </MCard>
            <MCard title="Printed with" className="min-h-0 flex-1">
              <ul className="space-y-2 text-xs">
                {PRINTED_WITH.map(({ icon, title, meta }) => (
                  <li key={title} className="flex items-center gap-2.5">
                    <span className="grid size-7 place-items-center rounded-md bg-m-secondary text-m-muted">
                      <Icon name={icon} className="size-3.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-m-fg">{title}</span>
                      <span className="block truncate text-2xs text-m-muted">{meta}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </MCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Statement of account ────────────────────────────────────────── */
export function SoaScreen() {
  const opening = demoSoa[0].balance;
  const invoiced = demoSoa.filter((r) => r.type === "Invoice").reduce((s, r) => s + r.debit, 0);
  const received = demoSoa.filter((r) => r.type.startsWith("Payment")).reduce((s, r) => s + r.credit, 0);
  const notes = demoSoa.filter((r) => r.type === "Credit note").reduce((s, r) => s + r.credit, 0);
  const closing = demoSoa[demoSoa.length - 1].balance;
  return (
    <AppShell active="billing" crumbs={[demoCompany.short, "Accounts", "Billing & SOA", "Statement"]} path="/billing">
      <div className="flex h-full flex-col gap-4">
        <MPageHeader
          title="Billing & SOA"
          description="Invoices, payments, statements of account and adjustments"
          actions={
            <>
              <MButton icon="plus">Record payment</MButton>
              <MButton variant="primary" icon="download">
                Statement PDF
              </MButton>
            </>
          }
        />
        <MTabs items={BILLING_TABS} active="Statement of account" />
        <div className="flex items-center gap-3">
          <MSelect icon="users-round" value="Arcadia Pharma Imports" className="w-64" />
          <MSelect icon="calendar" value="01 Nov – 22 Nov 2026" className="w-56" />
          <MMuted className="ml-auto text-2xs">Customer code IMP-000118 · terms 15 days</MMuted>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <MKpi label="Opening balance" value={formatAmount(opening)} />
          <MKpi label="Invoiced" value={formatAmount(invoiced)} tone="info" />
          <MKpi label="Received" value={formatAmount(received)} hint="incl. withholding tax" />
          <MKpi label="Credit notes" value={formatAmount(notes)} />
          <MKpi label="Closing balance" value={formatAmount(closing)} hint="In credit — unapplied advance" className="border-m-primary/40 bg-m-primary-soft" />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-4">
          <MTable
            className="col-span-2 self-start"
            columns={[
              { label: "Date", className: "w-16" },
              { label: "Reference", className: "w-32" },
              { label: "Type" },
              { label: "Debit", className: "w-24", align: "right" },
              { label: "Credit", className: "w-24", align: "right" },
              { label: "Balance", className: "w-24", align: "right" },
            ]}
            rows={demoSoa.map((r) => [
              <MMono key="d" className="text-m-muted">
                {r.date}
              </MMono>,
              <MMono key="r">{r.ref}</MMono>,
              <span key="t" className={cn(r.type === "Opening" && "text-m-muted")}>
                {r.type}
              </span>,
              <MMono key="db">{r.debit ? formatAmount(r.debit) : ""}</MMono>,
              <MMono key="cr" className="text-m-success">
                {r.credit ? formatAmount(r.credit) : ""}
              </MMono>,
              <MMono key="b" className={cn("font-medium", r.balance < 0 && "text-m-primary")}>
                {formatAmount(r.balance)}
              </MMono>,
            ])}
          />
          <div className="flex flex-col gap-4">
            <MCard title="Advances" description="Kept from overpayments">
              <p className="num text-2xl font-semibold text-m-fg">{formatAmount(Math.abs(closing))}</p>
              <p className="text-2xs text-m-muted">Unapplied advance · applied oldest first</p>
              <MButton variant="primary" className="mt-3 w-full justify-center">
                Apply advance to next invoice
              </MButton>
            </MCard>
            <MCard title="Withholding tax">
              <div className="flex items-center justify-between text-xs">
                <span className="text-m-muted">Certificate WHT-11/2026-0042</span>
                <MMono>8,160.00</MMono>
              </div>
              <p className="mt-1.5 text-2xs text-m-muted">Reduces the client balance — never touches a bank account.</p>
            </MCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Banks & accounts ────────────────────────────────────────────── */
/** Newest-first ledger rows with the balance after each entry, working back from the closing balance. */
function withRunningBalance<T extends { in: number; out: number }>(rows: T[], closing: number) {
  const result: (T & { balance: number })[] = [];
  let balance = closing;
  for (const row of rows) {
    result.push({ ...row, balance });
    balance = balance - row.in + row.out;
  }
  return result;
}

export function BanksScreen() {
  const ledger = withRunningBalance(demoLedger, demoBanks[0].balance);
  return (
    <AppShell active="banks" crumbs={[demoCompany.short, "Accounts", "Banks"]} path="/banks">
      <div className="flex h-full flex-col gap-4">
        <MPageHeader
          title="Banks & accounts"
          description="Bank, cash and mobile-wallet accounts with balances and ledgers"
          actions={
            <>
              <MButton icon="arrow-left-right">Money in / out</MButton>
              <MButton icon="file-text">Bank pay orders</MButton>
              <MButton variant="primary" icon="plus">
                New account
              </MButton>
            </>
          }
        />
        <div className="grid grid-cols-5 gap-3">
          {demoBanks.map((b, i) => (
            <div key={b.name} className={cn("rounded-xl border bg-m-card p-3", i === 0 ? "border-m-primary ring-2 ring-m-primary/15" : "border-m-border")}>
              <div className="flex items-center justify-between">
                <span className="grid size-7 place-items-center rounded-md bg-m-secondary text-m-muted">
                  <Icon name={b.type === "Cash" ? "banknote" : b.type === "Wallet" ? "wallet-cards" : "landmark"} className="size-3.5" />
                </span>
                <MBadge tone="neutral">{b.type}</MBadge>
              </div>
              <p className="mt-2.5 truncate text-xs text-m-muted">{b.name}</p>
              <p className="num mt-0.5 text-base font-semibold text-m-fg">{formatAmount(b.balance)}</p>
              {b.onInvoices ? <MBadge tone="primary" className="mt-1.5">Printed on invoices</MBadge> : <span className="mt-1.5 block h-4" />}
            </div>
          ))}
        </div>
        <MCard
          title="Ledger · Bank Alfalah — Current"
          description="Client receipts in, pay orders out, deposit refunds back"
          action={
            <span className="flex gap-2">
              <MSelect icon="calendar" value="This month" />
              <MButton icon="file-spreadsheet">Export Excel</MButton>
            </span>
          }
          className="min-h-0 flex-1"
        >
          <MTable
            columns={[
              { label: "Date", className: "w-16" },
              { label: "Description" },
              { label: "Reference", className: "w-32" },
              { label: "Money in", className: "w-28", align: "right" },
              { label: "Money out", className: "w-28", align: "right" },
              { label: "Balance", className: "w-32", align: "right" },
            ]}
            rows={ledger.map((r) => [
              <MMono key="d" className="text-m-muted">
                {r.date}
              </MMono>,
              <span key="ds">{r.desc}</span>,
              <MMono key="r" className="text-m-muted">
                {r.ref}
              </MMono>,
              <MMono key="i" className="text-m-success">
                {r.in ? formatAmount(r.in) : ""}
              </MMono>,
              <MMono key="o">{r.out ? formatAmount(r.out) : ""}</MMono>,
              <MMono key="b" className="font-medium">
                {formatAmount(r.balance)}
              </MMono>,
            ])}
          />
        </MCard>
      </div>
    </AppShell>
  );
}

/* ── Reports catalogue ───────────────────────────────────────────── */
const CATALOGUE: { title: string; desc: string; icon: IconName; group: string; tags: string[]; fav?: boolean }[] = [
  { title: "Receivables aging", desc: "Client balances by age as of a date", icon: "hourglass", group: "Finance", tags: ["As of", "Client"], fav: true },
  { title: "Job file profitability", desc: "Billed vs approved expenses, projected margin", icon: "chart-column", group: "Finance", tags: ["Date range", "Client"], fav: true },
  { title: "Files pending by stage", desc: "Open files by customs stage", icon: "list-checks", group: "Operations", tags: ["Client"], fav: true },
  { title: "Sales tax invoice register", desc: "Approved invoices with tax and balance", icon: "receipt-text", group: "Finance", tags: ["Date range", "Client"] },
  { title: "Tax summary", desc: "Tax per code plus withholding tax deducted", icon: "badge-percent", group: "Finance", tags: ["Date range"] },
  { title: "Collections register", desc: "Payments against invoices and advances", icon: "hand-coins", group: "Finance", tags: ["Date range", "Client"] },
  { title: "Document compliance", desc: "Files against the required-documents rule", icon: "file-check", group: "Operations", tags: ["Client"] },
  { title: "Arrival variance", desc: "Estimated vs actual arrivals", icon: "calendar-clock", group: "Operations", tags: ["Date range", "Client"] },
  { title: "Container returns & detention", desc: "Empty returns and detention charges", icon: "container", group: "Operations", tags: ["Date range", "Client"] },
  { title: "Bank position", desc: "Balances and movements per account", icon: "landmark", group: "Finance", tags: ["Date range"] },
  { title: "Draft invoice queue", desc: "Invoices waiting for approval", icon: "clipboard-list", group: "Finance", tags: ["Date range", "Client"] },
  { title: "Staff performance", desc: "Stage events, vouchers and files per person", icon: "users", group: "Team", tags: ["Date range"] },
];

export function ReportsScreen() {
  return (
    <AppShell active="reports" crumbs={[demoCompany.short, "Accounts", "Reports"]} path="/reports">
      <div className="flex h-full flex-col gap-4">
        <MPageHeader title="Reports" description="Calculated live from the same rules your screens use · Excel and PDF export" />
        <div className="flex items-center gap-3">
          <MInput icon="search" placeholder="Search reports…" className="w-72" kbd="/" />
          <MSegmented items={["All", "Favourites", "Finance", "Operations", "Team"]} active="All" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {CATALOGUE.map((r) => (
            <div key={r.title} className="flex gap-3 rounded-xl border border-m-border bg-m-card p-3.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-m-primary-soft text-m-primary">
                <Icon name={r.icon} className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-m-fg">{r.title}</p>
                  <svg viewBox="0 0 24 24" className={cn("ml-auto size-3.5 shrink-0", r.fav ? "fill-m-warning text-m-warning" : "fill-none text-m-subtle")} stroke="currentColor" strokeWidth="2">
                    <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="mt-0.5 truncate text-xs text-m-muted">{r.desc}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <MBadge tone="neutral">{r.group}</MBadge>
                  {r.tags.map((t) => (
                    <MBadge key={t} tone="neutral" className="bg-transparent ring-1 ring-m-border">
                      {t}
                    </MBadge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

/* ── Report detail: receivables aging ────────────────────────────── */
export function ReportDetailScreen() {
  const rows = demoAging.map((r) => ({ ...r, net: r.current + r.d30 + r.d60 + r.d90 + r.d90p }));
  const total = (key: "current" | "d30" | "d60" | "d90" | "d90p" | "net") => rows.reduce((s, r) => s + r[key], 0);
  const overdue = total("d30") + total("d60") + total("d90") + total("d90p");
  const maxNet = Math.max(...rows.map((r) => r.net));
  return (
    <AppShell active="reports" crumbs={[demoCompany.short, "Reports", "Receivables aging"]} path="/reports/receivables-aging">
      <div className="flex h-full flex-col gap-4">
        <MPageHeader
          title="Receivables aging"
          description="Client balances by age · ties to each client’s SOA closing balance"
          actions={
            <>
              <MButton icon="file-spreadsheet">Excel</MButton>
              <MButton icon="file-text">PDF</MButton>
              <MButton icon="printer">Print</MButton>
            </>
          }
        />
        <div className="flex items-center gap-3 rounded-xl border border-m-border bg-m-card p-2.5">
          <MSelect icon="calendar" label="As of" value="22 Nov 2026" className="w-52" />
          <MSelect icon="users-round" label="Client" value="All clients" className="w-56" />
          <MButton variant="primary" className="h-8">
            Apply filters
          </MButton>
          <MButton variant="ghost">Clear filters</MButton>
          <MMuted className="ml-auto text-2xs">Generated 22 Nov 2026, 10:44 · Asia/Karachi</MMuted>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <MKpi label="Net receivable" value={formatAmount(total("net"))} icon="hand-coins" tone="primary" />
          <MKpi label="Overdue" value={formatAmount(overdue)} hint={`${Math.round((overdue / total("net")) * 100)}% of invoice dues`} icon="clock" tone="warning" />
          <MKpi label="90+ days" value={formatAmount(total("d90p"))} icon="triangle-alert" tone="danger" />
          <MKpi label="Clients in credit" value={String(rows.filter((r) => r.net < 0).length)} hint="Advance exceeds dues" icon="users-round" tone="neutral" />
        </div>
        <MTable
          dense
          columns={[
            { label: "Client" },
            { label: "Not yet due", className: "w-24", align: "right" },
            { label: "1–30 days", className: "w-22", align: "right" },
            { label: "31–60", className: "w-20", align: "right" },
            { label: "61–90", className: "w-20", align: "right" },
            { label: "90+", className: "w-20", align: "right" },
            { label: "Net receivable", className: "w-28", align: "right" },
            { label: "", className: "w-28" },
          ]}
          rows={[
            ...rows.map((r) => [
              <span key="c" className="font-medium text-m-primary">
                {r.client}
              </span>,
              <MMono key="a">{formatAmount(r.current, 0)}</MMono>,
              <MMono key="b">{r.d30 ? formatAmount(r.d30, 0) : "—"}</MMono>,
              <MMono key="c2">{r.d60 ? formatAmount(r.d60, 0) : "—"}</MMono>,
              <MMono key="d">{r.d90 ? formatAmount(r.d90, 0) : "—"}</MMono>,
              <MMono key="e" className={cn(r.d90p && "text-m-danger")}>
                {r.d90p ? formatAmount(r.d90p, 0) : "—"}
              </MMono>,
              <MMono key="n" className="font-semibold">
                {formatAmount(r.net, 0)}
              </MMono>,
              <BarMeter key="bar" value={(r.net / maxNet) * 100} className="h-1.5" label={`${r.client}: ${formatAmount(r.net, 0)}`} />,
            ]),
            [
              <span key="t" className="font-semibold">
                Total
              </span>,
              <MMono key="a" className="font-semibold">
                {formatAmount(total("current"), 0)}
              </MMono>,
              <MMono key="b" className="font-semibold">
                {formatAmount(total("d30"), 0)}
              </MMono>,
              <MMono key="c" className="font-semibold">
                {formatAmount(total("d60"), 0)}
              </MMono>,
              <MMono key="d" className="font-semibold">
                {formatAmount(total("d90"), 0)}
              </MMono>,
              <MMono key="e" className="font-semibold">
                {formatAmount(total("d90p"), 0)}
              </MMono>,
              <MMono key="n" className="font-semibold">
                {formatAmount(total("net"), 0)}
              </MMono>,
              <span key="x" />,
            ],
          ]}
        />
        <div className="grid min-h-0 flex-1 grid-cols-[1.4fr_1fr] gap-4">
          <MCard title="Receivables by age" description="Share of invoice dues in each bucket">
            <ul className="space-y-2">
              {(
                [
                  ["Not yet due", total("current")],
                  ["1–30 days", total("d30")],
                  ["31–60 days", total("d60")],
                  ["61–90 days", total("d90")],
                  ["90+ days", total("d90p")],
                ] as const
              ).map(([label, value], i) => (
                <li key={label} className="grid grid-cols-[1fr_2.6fr_1fr] items-center gap-3 text-xs">
                  <span className="text-m-muted">{label}</span>
                  <BarMeter value={(value / total("current")) * 100} color="var(--c2)" delay={i * 0.05} label={`${label}: ${formatAmount(value, 0)}`} />
                  <span className="num text-right text-m-fg">{Math.round((value / total("net")) * 100)}%</span>
                </li>
              ))}
            </ul>
          </MCard>
          <MCard title="Export includes" description="Same figures as on screen">
            <ul className="space-y-2 text-xs text-m-fg">
              {["Company header & period", "Totals row", "Summary sheet with KPIs", "Landscape PDF for wide reports"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Icon name="check" className="size-3.5 text-m-success" />
                  {t}
                </li>
              ))}
            </ul>
          </MCard>
        </div>
      </div>
    </AppShell>
  );
}
