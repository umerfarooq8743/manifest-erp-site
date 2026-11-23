import { Icon } from "@/components/ui/icon";
import { demoCompany, demoEta, demoJobs, statusTone, type Tone } from "@/data/demo";
import { cn } from "@/lib/utils";
import { AppShell } from "../app-shell";
import {
  MAvatar,
  MBadge,
  MButton,
  MCard,
  MCheckbox,
  MDot,
  MField,
  MInput,
  MMono,
  MMuted,
  MPageHeader,
  MProgress,
  MSegmented,
  MSelect,
  MTable,
  MTabs,
} from "../ui";

const JOB_TABS = ["Overview", "Documents", "Forms", "Customs", "Pay orders", "Transport", "Containers", "Expenses", "Billing", "Remarks"];

/* ── ETA sheet ─────────────────────────────────────────────────────── */
export function EtaScreen() {
  const docTone = (n: number) => (n >= 4 ? "success" : n >= 2 ? "warning" : "danger");
  return (
    <AppShell active="eta" crumbs={[demoCompany.short, "Operations", "ETA Sheet"]} path="/eta-sheet">
      <div className="flex h-full flex-col gap-4">
        <MPageHeader
          title="ETA Sheet"
          description="Pre-arrival register — track arrivals before they land"
          actions={
            <>
              <MButton icon="file-spreadsheet">Export Excel</MButton>
              <MButton icon="mail">Email arrival notice</MButton>
              <MButton variant="primary" icon="plus">
                New ETA entry
              </MButton>
            </>
          }
        />
        <div className="flex items-center gap-3">
          <MSegmented items={["All · 24", "Documents pending · 6", "Ready for file · 4", "File created · 14"]} active="All · 24" />
          <MInput icon="search" placeholder="Search BL, client, vessel…" className="ml-auto w-64" />
          <MButton icon="funnel">Filters · 1</MButton>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-m-primary/30 bg-m-primary-soft px-3.5 py-2 text-xs">
          <MCheckbox checked />
          <span className="font-medium text-m-fg">2 selected</span>
          <span className="text-m-muted">Arrival notices go to each client’s e-mail · clients without one are listed as skipped</span>
          <span className="ml-auto flex gap-2">
            <MButton icon="mail" className="h-7">
              Email arrival notice
            </MButton>
          </span>
        </div>
        <MTable
          columns={[
            { label: "", className: "w-8" },
            { label: "Reference", className: "w-36" },
            { label: "Client" },
            { label: "BL / Vessel", className: "w-44" },
            { label: "ETA", className: "w-16" },
            { label: "Containers", className: "w-20" },
            { label: "Documents", className: "w-28" },
            { label: "Status", className: "w-32" },
            { label: "", className: "w-28", align: "right" },
          ]}
          rows={demoEta.map((e, i) => [
            <MCheckbox key="c" checked={i === 1 || i === 3} />,
            <MMono key="r">{e.ref}</MMono>,
            <span key="cl" className="font-medium">
              {e.client}
            </span>,
            <span key="b" className="block leading-tight">
              <span className="num flex items-center gap-1.5 text-m-fg">
                {e.bl}
                {e.dup && (
                  <MBadge tone="warning" className="px-1.5">
                    <Icon name="triangle-alert" className="size-2.5" /> Duplicate BL?
                  </MBadge>
                )}
              </span>
              <MMuted className="text-2xs">{e.vessel}</MMuted>
            </span>,
            <MMono key="e">{e.eta}</MMono>,
            <MMono key="ct">{e.containers}</MMono>,
            <span key="d" className="flex items-center gap-2">
              <span className="flex gap-0.5">
                {[0, 1, 2, 3].map((n) => (
                  <span key={n} className={cn("h-1.5 w-3 rounded-full", n < e.docs ? (e.docs >= 4 ? "bg-m-success" : "bg-m-warning") : "bg-m-secondary")} />
                ))}
              </span>
              <span className="num text-2xs text-m-muted">{e.docs}/4</span>
            </span>,
            <MBadge key="s" dot tone={e.status === "Ready for file" ? "success" : e.status === "File created" ? "primary" : docTone(e.docs)}>
              {e.status}
            </MBadge>,
            e.status === "Ready for file" ? (
              <span key="a" className="inline-flex items-center gap-1 text-xs font-medium text-m-primary">
                Convert to job file <Icon name="arrow-right" className="size-3" />
              </span>
            ) : e.status === "File created" ? (
              <MMono key="a" className="text-2xs text-m-muted">
                MCF-2026-0139
              </MMono>
            ) : (
              <MMuted key="a" className="text-2xs">
                Collect documents
              </MMuted>
            ),
          ])}
        />
      </div>
    </AppShell>
  );
}

/* ── Job files list ───────────────────────────────────────────────── */
export function JobFilesScreen() {
  return (
    <AppShell active="files" crumbs={[demoCompany.short, "Operations", "Job Files"]} path="/shipment-files">
      <div className="relative flex h-full flex-col gap-4">
        <MPageHeader
          title="Job Files"
          description="One job file per shipment — BL, containers, customs, transport and money"
          actions={
            <>
              <MButton icon="download">Export</MButton>
              <MButton variant="primary" icon="plus">
                New job file
              </MButton>
            </>
          }
        />
        <div className="flex items-center gap-3">
          <MSegmented items={["All · 52", "Open · 8", "In progress · 31", "Delivered · 6", "Billed · 4", "Closed"]} active="In progress · 31" />
          <MInput icon="search" placeholder="Job no., BL, container, client…" className="ml-auto w-60" />
          <MSelect value="All ports" />
          <MButton icon="funnel">Filters</MButton>
        </div>
        <MTable
          columns={[
            { label: "Job file", className: "w-32" },
            { label: "Client" },
            { label: "BL", className: "w-32" },
            { label: "Port", className: "w-24" },
            { label: "Customs stage", className: "w-44" },
            { label: "Status", className: "w-24" },
            { label: "Staff", className: "w-12", align: "center" },
            { label: "ETA", className: "w-14" },
            { label: "", className: "w-8" },
          ]}
          rows={demoJobs.map((j, i) => [
            <span key="j" className="num font-medium text-m-primary">
              {j.job}
            </span>,
            <span key="c" className="block leading-tight">
              <span className="block truncate font-medium">{j.client}</span>
              <MMuted className="num text-2xs">{j.containers}</MMuted>
            </span>,
            <MMono key="b" className="text-m-muted">
              {j.bl}
            </MMono>,
            <MMuted key="p">{j.port}</MMuted>,
            <span key="s" className="block">
              <span className="block truncate text-xs">{j.stage}</span>
              <MProgress value={(j.stageIndex / 14) * 100} tone={j.stageIndex >= 14 ? "success" : "primary"} className="mt-1 h-1" />
            </span>,
            <MBadge key="st" tone={statusTone[j.status]}>
              {j.status}
            </MBadge>,
            <span key="a" className="flex justify-center">
              <MAvatar initials={j.assignee} tone="primary" />
            </span>,
            <MMono key="e" className="text-m-muted">
              {j.eta}
            </MMono>,
            <span key="m" className={cn("grid size-6 place-items-center rounded-md text-m-muted", i === 4 && "bg-m-secondary text-m-fg")}>
              <Icon name="ellipsis" className="size-4" />
            </span>,
          ])}
        />
        {/* Row action menu */}
        <div className="absolute right-2 top-96 z-10 w-52 rounded-xl border border-m-border bg-m-card p-1 shadow-[0_16px_40px_-12px_rgb(2_6_23/0.35)]">
          {[
            { icon: "eye" as const, label: "Open job file" },
            { icon: "printer" as const, label: "Print job file" },
            { icon: "mail" as const, label: "Send arrival notice" },
            { icon: "message-circle" as const, label: "Add remark" },
          ].map((item, i) => (
            <span key={item.label} className={cn("flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-m-fg", i === 0 && "bg-m-secondary")}>
              <Icon name={item.icon} className="size-3.5 text-m-muted" />
              {item.label}
            </span>
          ))}
          <span className="my-1 block border-t border-m-border" />
          <span className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-m-muted">
            <Icon name="folder-check" className="size-3.5" />
            Close file… <span className="ml-auto text-2xs">checklist</span>
          </span>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Job file detail ─────────────────────────────────────────────── */
function JobHeader({ tab }: { tab: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="num text-2xl font-semibold tracking-tight text-m-fg">MCF-2026-0142</p>
            <MBadge tone="info" dot>
              In progress
            </MBadge>
            <MBadge tone="neutral">FCL · Import</MBadge>
          </div>
          <p className="mt-0.5 text-xs text-m-muted">Arcadia Pharma Imports · BL MEDU4790218 · Port Qasim</p>
        </div>
        <div className="flex items-center gap-2">
          <MButton icon="mail">Arrival notice</MButton>
          <MButton icon="printer">Print</MButton>
          <MButton icon="folder-check" className="opacity-60">
            Close file
          </MButton>
        </div>
      </div>
      <MTabs items={JOB_TABS} active={tab} />
    </div>
  );
}

const CHECKLIST: { label: string; state: "done" | "current" | "todo" }[] = [
  { label: "ETA recorded & documents collected", state: "done" },
  { label: "Job file opened", state: "done" },
  { label: "GD prepared & filed", state: "done" },
  { label: "Assessment & duty paid", state: "done" },
  { label: "Pay orders issued", state: "done" },
  { label: "Delivery order & NOC", state: "current" },
  { label: "Gate pass & delivery", state: "todo" },
  { label: "Empty containers returned", state: "todo" },
  { label: "Expenses approved", state: "todo" },
  { label: "Invoiced", state: "todo" },
  { label: "File closed", state: "todo" },
];

export function JobFileDetailScreen() {
  return (
    <AppShell active="files" crumbs={[demoCompany.short, "Job Files", "MCF-2026-0142"]} path="/shipment-files/MCF-2026-0142">
      <div className="flex h-full flex-col gap-4">
        <JobHeader tab="Overview" />
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-4">
          <div className="col-span-2 flex min-h-0 flex-col gap-4">
            <div className="flex items-center gap-4 rounded-xl border border-m-primary/30 bg-m-primary-soft p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-m-primary text-m-primary-fg">
                <Icon name="target" className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-2xs font-semibold uppercase tracking-wider text-m-primary">Next step</p>
                <p className="mt-0.5 text-sm font-semibold text-m-fg">Record the NOC number and its expiry</p>
                <p className="text-xs text-m-muted">D/O DO-55120 recorded on 22 Nov · expires 05 Dec — then issue the gate pass</p>
              </div>
              <MButton variant="primary">Update stage</MButton>
            </div>
            <MCard title="Shipment" description="Copied from ETA-2026-000309 on conversion">
              <div className="grid grid-cols-4 gap-3">
                <MField label="BL number" value="MEDU4790218" mono />
                <MField label="Carrier" value="MSC" />
                <MField label="Vessel / voyage" value="MSC Aurelia · 646W" />
                <MField label="Port" value="Port Qasim" />
                <MField label="ETA / Arrived" value="15 Nov / 16 Nov" />
                <MField label="GD number" value="KPQI-HC-48213" mono />
                <MField label="Assigned to" value="Bilal Raza" />
                <MField label="Customs stage" value="Delivery Order" />
              </div>
            </MCard>
            <MCard title="Containers" description="2 × 20GP · free time tracked per container" className="min-h-0 flex-1">
              <MTable
                dense
                columns={[{ label: "Container" }, { label: "Type" }, { label: "Free time until" }, { label: "Gate pass" }, { label: "Status", align: "right" }]}
                rows={[
                  [<MMono key="a">MSCU 479021-8</MMono>, "20GP", <span key="f" className="num text-m-warning">28 Nov</span>, <MMuted key="g">—</MMuted>, <MBadge key="s" tone="neutral">At terminal</MBadge>],
                  [<MMono key="a">MSCU 479188-3</MMono>, "20GP", <span key="f" className="num text-m-warning">28 Nov</span>, <MMuted key="g">—</MMuted>, <MBadge key="s" tone="neutral">At terminal</MBadge>],
                ]}
              />
            </MCard>
          </div>
          <div className="flex min-h-0 flex-col gap-4">
            <MCard title="Workflow checklist" description="6 of 11 complete" action={<span className="num text-xs font-semibold text-m-primary">55%</span>}>
              <MProgress value={55} className="mb-3" />
              <ul className="space-y-1.5">
                {CHECKLIST.map((c) => (
                  <li key={c.label} className="flex items-center gap-2 text-xs">
                    <span
                      className={cn(
                        "grid size-4 shrink-0 place-items-center rounded-full",
                        c.state === "done" && "bg-m-success text-white",
                        c.state === "current" && "border-2 border-m-primary",
                        c.state === "todo" && "border border-m-input",
                      )}
                    >
                      {c.state === "done" && <Icon name="check" className="size-2.5" strokeWidth={3} />}
                    </span>
                    <span className={cn("truncate", c.state === "todo" ? "text-m-muted" : "text-m-fg", c.state === "current" && "font-medium")}>{c.label}</span>
                  </li>
                ))}
              </ul>
            </MCard>
            <MCard title="Customs log" description="Every stage move, dated" className="min-h-0 flex-1">
              <ol className="relative space-y-2.5 border-l border-m-border pl-3.5">
                {[
                  { stage: "Delivery Order", meta: "22 Nov · Bilal Raza · DO-55120" },
                  { stage: "Examination", meta: "20 Nov · Bilal Raza · cleared" },
                  { stage: "Duty Payment", meta: "19 Nov · Sana Khan · voucher VCH-2026-0398" },
                ].map((l, i) => (
                  <li key={l.stage} className="relative">
                    <span className={cn("absolute -left-4.5 top-1 size-2 rounded-full ring-2 ring-m-card", i === 0 ? "bg-m-primary" : "bg-m-subtle")} />
                    <p className="text-xs font-medium text-m-fg">{l.stage}</p>
                    <p className="truncate text-2xs text-m-muted">{l.meta}</p>
                  </li>
                ))}
              </ol>
            </MCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Customs board ───────────────────────────────────────────────── */
const BOARD = [
  {
    stage: "GD Filed",
    count: 5,
    cards: [
      { job: "MCF-2026-0147", client: "Saltwater Textiles", ref: "KAPW-HC-90412", who: "BR", days: 1 },
      { job: "MCF-2026-0144", client: "Lumen Electronics", ref: "KPQI-HC-48190", who: "BR", days: 2 },
      { job: "MCF-2026-0140", client: "Orchid Home Goods", ref: "KAPW-HC-90388", who: "HT", days: 3 },
    ],
  },
  {
    stage: "Assessment",
    count: 7,
    cards: [
      { job: "MCF-2026-0146", client: "Crescent Polymers", ref: "KPQI-HC-48177", who: "SK", days: 2 },
      { job: "MCF-2026-0143", client: "Northgate Steel", ref: "KPQI-HC-48151", who: "BR", days: 4 },
      { job: "MCF-2026-0138", client: "Kestrel Auto Parts", ref: "KAPW-HC-90301", who: "BR", days: 8 },
    ],
  },
  {
    stage: "Examination",
    count: 2,
    cards: [
      { job: "MCF-2026-0145", client: "Blue Delta Foods", ref: "Lab sample taken", who: "BR", days: 1 },
      { job: "MCF-2026-0137", client: "Saltwater Textiles", ref: "Group examination", who: "IA", days: 2 },
    ],
  },
  {
    stage: "Delivery Order",
    count: 4,
    cards: [
      { job: "MCF-2026-0142", client: "Arcadia Pharma Imports", ref: "DO-55120", who: "BR", days: 0 },
      { job: "MCF-2026-0135", client: "Crescent Polymers", ref: "DO-55102", who: "IA", days: 1 },
    ],
  },
];

export function CustomsBoardScreen() {
  return (
    <AppShell active="customs" crumbs={[demoCompany.short, "Operations", "Customs Board"]} path="/operations">
      <div className="flex h-full flex-col gap-4">
        <MPageHeader
          title="Customs Board"
          description="14 customs stages · progress is recorded here, filing happens on WeBOC"
          actions={
            <>
              <MSelect value="All customers" />
              <MSelect value="Any assignee" />
              <MButton icon="funnel">Filters</MButton>
            </>
          }
        />
        <div className="flex gap-1.5 overflow-hidden">
          {[
            ["Docs Pending", 6],
            ["GD Prepared", 4],
            ["GD Filed", 5],
            ["Assessment", 7],
            ["Duty Payment", 3],
            ["Shipping Order", 2],
            ["Scanning", 3],
            ["Grounding", 1],
            ["Examination", 2],
            ["D/O", 4],
            ["NOC", 2],
            ["Gate Pass", 3],
          ].map(([label, n]) => (
            <span
              key={label}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-lg border px-2 py-1 text-2xs",
                label === "Assessment" ? "border-m-primary/40 bg-m-primary-soft text-m-fg" : "border-m-border bg-m-card text-m-muted",
              )}
            >
              {label}
              <span className="num font-semibold text-m-fg">{n}</span>
            </span>
          ))}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1fr_1fr_1fr_1.25fr] gap-3">
          {BOARD.map((col) => (
            <div key={col.stage} className="flex min-h-0 flex-col rounded-xl bg-m-secondary/70 p-2">
              <div className="flex items-center justify-between px-1 pb-2">
                <span className="text-xs font-semibold text-m-fg">{col.stage}</span>
                <span className="num rounded-full bg-m-card px-1.5 text-2xs text-m-muted">{col.count}</span>
              </div>
              <div className="space-y-2">
                {col.cards.map((c) => (
                  <div
                    key={c.job}
                    className={cn(
                      "rounded-lg border bg-m-card p-2.5 shadow-[0_1px_2px_rgb(15_23_42/0.05)]",
                      c.job === "MCF-2026-0146" ? "border-m-primary ring-2 ring-m-primary/20" : "border-m-border",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="num text-xs font-medium text-m-primary">{c.job}</span>
                      <MAvatar initials={c.who} className="size-5" />
                    </div>
                    <p className="mt-1 truncate text-xs text-m-fg">{c.client}</p>
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <span className="num truncate text-2xs text-m-muted">{c.ref}</span>
                      <span className={cn("num shrink-0 text-2xs", c.days >= 7 ? "text-m-danger" : "text-m-subtle")}>{c.days}d</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <MCard title="Update stage" description="MCF-2026-0146 · Crescent Polymers" className="min-h-0">
            <div className="space-y-2.5">
              <MField label="Move to stage" value="Duty Payment" />
              <div className="grid grid-cols-2 gap-2">
                <MField label="Date" value="22 Nov 2026" />
                <MField label="Responsible" value="Sana Khan" />
              </div>
              <MField label="Reference" value="KPQI-HC-48177" mono />
              <div>
                <p className="mb-1 text-2xs font-medium uppercase tracking-wider text-m-subtle">Remarks</p>
                <div className="h-12 rounded-lg border border-m-border bg-m-card p-2 text-xs text-m-fg">Assessed; duty challan issued.</div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-dashed border-m-input p-2 text-2xs text-m-muted">
                <Icon name="paperclip" className="size-3.5" /> assessment-notice.pdf
              </div>
              <MButton variant="primary" className="w-full justify-center">
                Save stage move
              </MButton>
              <p className="text-center text-2xs text-m-muted">Logged with your name and time</p>
            </div>
          </MCard>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Documentation checklist ─────────────────────────────────────── */
const DOCS = [
  { doc: "Bill of Lading (BL)", required: true, status: "Original received", tone: "success" as const, date: "14 Nov", expiry: "—", file: true },
  { doc: "Commercial Invoice", required: true, status: "Verified", tone: "success" as const, date: "14 Nov", expiry: "—", file: true },
  { doc: "Packing List", required: true, status: "Copy received", tone: "info" as const, date: "15 Nov", expiry: "—", file: true },
  { doc: "Financial Instrument (FI)", required: true, status: "Received", tone: "success" as const, date: "13 Nov", expiry: "28 Nov", file: true, warn: true },
  { doc: "Certificate of Origin", required: false, status: "Missing", tone: "danger" as const, date: "—", expiry: "—", file: false },
  { doc: "Import Permit / NOC", required: false, status: "Received", tone: "success" as const, date: "18 Nov", expiry: "05 Dec", file: true },
  { doc: "Insurance", required: false, status: "Not applicable", tone: "neutral" as const, date: "—", expiry: "—", file: false },
];

export function DocumentsScreen() {
  return (
    <AppShell active="files" crumbs={[demoCompany.short, "Job Files", "MCF-2026-0142", "Documents"]} path="/shipment-files/MCF-2026-0142">
      <div className="flex h-full flex-col gap-4">
        <JobHeader tab="Documents" />
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-4">
          <div className="col-span-2 flex min-h-0 flex-col gap-3">
            <div className="flex items-center gap-3">
              <MBadge tone="success" dot>
                4 of 4 required documents in
              </MBadge>
              <MBadge tone="warning" dot>
                1 expiring soon
              </MBadge>
              <MButton icon="upload" className="ml-auto">
                Upload scan
              </MButton>
            </div>
            <MTable
              columns={[
                { label: "Document" },
                { label: "Required", className: "w-20", align: "center" },
                { label: "Status", className: "w-32" },
                { label: "Received", className: "w-20" },
                { label: "Expiry", className: "w-24" },
                { label: "Scan", className: "w-14", align: "center" },
              ]}
              rows={DOCS.map((d) => [
                <span key="d" className="font-medium">
                  {d.doc}
                </span>,
                <span key="r" className="flex justify-center">
                  {d.required ? <MBadge tone="primary">Required</MBadge> : <MMuted className="text-2xs">Optional</MMuted>}
                </span>,
                <MBadge key="s" tone={d.tone} dot>
                  {d.status}
                </MBadge>,
                <MMono key="dt" className="text-m-muted">
                  {d.date}
                </MMono>,
                d.warn ? (
                  <span key="e" className="num inline-flex items-center gap-1 text-m-warning">
                    <Icon name="clock" className="size-3" />
                    {d.expiry}
                  </span>
                ) : (
                  <MMono key="e" className="text-m-muted">
                    {d.expiry}
                  </MMono>
                ),
                <span key="f" className="flex justify-center text-m-muted">
                  {d.file ? <Icon name="paperclip" className="size-3.5" /> : <Icon name="upload" className="size-3.5 text-m-subtle" />}
                </span>,
              ])}
            />
            <div className="flex items-center gap-3 rounded-xl border border-m-warning/30 bg-m-warning-soft p-3 text-xs">
              <Icon name="triangle-alert" className="size-4 text-m-warning" />
              <span className="text-m-fg">
                Financial Instrument expires in 6 days — alerts start 7 days ahead <MMuted>(Business rules)</MMuted>
              </span>
            </div>
          </div>
          <MCard title="Forms & undertakings" description="Generated as PDF from this job file" className="min-h-0">
            <ul className="space-y-2">
              {[
                { name: "D/O request", meta: "Generated 21 Nov", done: true },
                { name: "Container undertaking — MSC", meta: "Generated 21 Nov", done: true },
                { name: "AQD undertaking", meta: "Not generated" },
                { name: "PSQCA undertaking", meta: "Not generated" },
                { name: "Authority letter", meta: "Generated 15 Nov", done: true },
                { name: "Job file sales tax invoice", meta: "Original · Duplicate · Triplicate" },
              ].map((f) => (
                <li key={f.name} className="flex items-center gap-2.5 rounded-lg border border-m-border p-2">
                  <span className={cn("grid size-7 shrink-0 place-items-center rounded-md", f.done ? "bg-m-primary-soft text-m-primary" : "bg-m-secondary text-m-muted")}>
                    <Icon name="file-text" className="size-3.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-medium text-m-fg">{f.name}</span>
                    <span className="block truncate text-2xs text-m-muted">{f.meta}</span>
                  </span>
                  <span className="text-2xs font-medium text-m-primary">{f.done ? "Download" : "Generate"}</span>
                </li>
              ))}
            </ul>
          </MCard>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Transport ───────────────────────────────────────────────────── */
const GATE_PASSES: { no: string; job: string; container: string; transporter: string; vehicle: string; driver: string; status: string; tone: Tone }[] = [
  { no: "GP-0381", job: "MCF-2026-0139", container: "ONEU 611204-7", transporter: "Indus Haulage Co.", vehicle: "TKS-4471", driver: "Rashid K. · 42101-•••••••-3", status: "In transit", tone: "info" },
  { no: "GP-0380", job: "MCF-2026-0139", container: "ONEU 611204-7", transporter: "Indus Haulage Co.", vehicle: "TKS-2218", driver: "Naveed A. · 42201-•••••••-9", status: "Delivered", tone: "success" },
  { no: "GP-0377", job: "MCF-2026-0136", container: "OOLU 268831-0", transporter: "Seaview Logistics", vehicle: "JW-9035", driver: "Asif M. · 42401-•••••••-1", status: "Empty returned", tone: "primary" },
  { no: "GP-0376", job: "MCF-2026-0136", container: "OOLU 268844-2", transporter: "Seaview Logistics", vehicle: "JW-9102", driver: "Tariq S. · 42301-•••••••-5", status: "Delivered", tone: "success" },
  { no: "GP-0372", job: "MCF-2026-0133", container: "TSLU 880117-4", transporter: "Harbour Movers", vehicle: "LES-7310", driver: "Kamran B. · 42501-•••••••-2", status: "Issued", tone: "warning" },
];

export function TransportScreen() {
  return (
    <AppShell active="transport" crumbs={[demoCompany.short, "Operations", "Transport"]} path="/transport">
      <div className="flex h-full flex-col gap-4">
        <MPageHeader
          title="Transport"
          description="Transporters, gate passes, deliveries and empty returns"
          actions={
            <>
              <MButton icon="truck">Transporters</MButton>
              <MButton variant="primary" icon="plus">
                Issue gate pass
              </MButton>
            </>
          }
        />
        <MTabs items={["Gate passes", "Deliveries", "Empty returns", "Transporters"]} active="Gate passes" />
        <MTable
          columns={[
            { label: "Gate pass", className: "w-24" },
            { label: "Job file", className: "w-32" },
            { label: "Container", className: "w-32" },
            { label: "Transporter" },
            { label: "Vehicle", className: "w-24" },
            { label: "Driver · CNIC", className: "w-48" },
            { label: "Status", className: "w-28" },
          ]}
          rows={GATE_PASSES.map((g) => [
            <MMono key="g">{g.no}</MMono>,
            <span key="j" className="num text-m-primary">
              {g.job}
            </span>,
            <MMono key="c" className="text-m-muted">
              {g.container}
            </MMono>,
            <span key="t">{g.transporter}</span>,
            <MMono key="v">{g.vehicle}</MMono>,
            <MMuted key="d">{g.driver}</MMuted>,
            <MBadge key="s" dot tone={g.tone}>
              {g.status}
            </MBadge>,
          ])}
        />
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-4">
          <MCard title="Deliveries · MCF-2026-0139" description="Orchid Home Goods · 700 packages" action={<MButton variant="primary" icon="plus" className="h-7">Record delivery</MButton>}>
            <div className="mb-3 flex items-center gap-3">
              <MProgress value={60} className="flex-1" />
              <span className="num text-xs font-medium text-m-fg">420 / 700</span>
              <MBadge tone="warning">Partial</MBadge>
            </div>
            <ul className="space-y-2">
              {[
                { n: "Delivery 1", meta: "21 Nov · 420 packages · received by F. Hussain", proof: true },
                { n: "Delivery 2", meta: "In transit · GP-0381 · 280 packages expected", proof: false },
              ].map((d) => (
                <li key={d.n} className="flex items-center gap-2.5 rounded-lg border border-m-border p-2 text-xs">
                  <Icon name={d.proof ? "package-check" : "truck"} className={cn("size-4", d.proof ? "text-m-success" : "text-m-info")} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-m-fg">{d.n}</span>
                    <span className="block truncate text-2xs text-m-muted">{d.meta}</span>
                  </span>
                  {d.proof && <MBadge tone="success">Proof attached</MBadge>}
                </li>
              ))}
            </ul>
          </MCard>
          <MCard title="Empty container return" description="OOLU 268831-0 · MCF-2026-0136">
            <div className="grid grid-cols-2 gap-2.5">
              <MField label="Free time ended" value="18 Nov 2026" />
              <MField label="Actual return" value="20 Nov 2026" />
              <MField label="Detention days" value="2" mono />
              <MField label="Detention charges" value="PKR 24,000.00" mono />
            </div>
            <div className="mt-3 flex items-center gap-2 text-2xs text-m-muted">
              <MDot tone="warning" /> Damage: none · Cleaning: not required · billable to client
            </div>
          </MCard>
        </div>
      </div>
    </AppShell>
  );
}
