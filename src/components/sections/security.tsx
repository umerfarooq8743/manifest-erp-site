import { requestFlow, securityControls, securityNote } from "@/data/security";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { IconTile } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

export function SecurityControls({ variant = "full" }: { variant?: "full" | "teaser" }) {
  const items = variant === "teaser" ? securityControls.filter((c) => ["Company-level data isolation", "Role-based access control", "Two-factor authentication", "Company-scoped file access", "Audit history", "Accounting-period locking"].includes(c.title)) : securityControls;
  return (
    <Section id="security" tone={variant === "teaser" ? "muted" : "plain"} labelledBy="security-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="security-title"
          eyebrow="Security & trust"
          title={variant === "teaser" ? "Your data stays your company’s." : "Controls built into every request."}
          description="Isolation, access control and accountability are enforced on the server — explained here in plain business terms."
        />
        {variant === "teaser" && (
          <ButtonLink href="/security" variant="secondary" icon="arrow-right" className="self-start lg:self-auto">
            Security & architecture
          </ButtonLink>
        )}
      </div>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <Reveal as="li" key={c.title} delay={(i % 3) * 0.05} className="card flex flex-col p-6">
            <div className="flex items-center justify-between">
              <IconTile name={c.icon} />
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">{c.group}</span>
            </div>
            <h3 className="text-h3 mt-5">{c.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{c.description}</p>
          </Reveal>
        ))}
      </ul>
      <p className="mt-8 flex max-w-3xl gap-2 text-sm leading-relaxed text-muted">
        <Icon name="info" className="mt-0.5 size-4 shrink-0" />
        {securityNote}
      </p>
    </Section>
  );
}

function TenancyDiagram() {
  const companies = [
    { name: "Meridian C&F", current: true },
    { name: "Company B", current: false },
    { name: "Company C", current: false },
  ];
  const tables = ["Job files", "Vouchers", "Invoices", "Payments"];
  return (
    <div className="rounded-3xl border border-line bg-surface p-5 sm:p-7">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-2/60 px-3 py-2 text-sm dark:bg-surface-2">
          <Icon name="users-round" className="size-4 text-muted" />
          Signed-in user
        </span>
        <Icon name="arrow-right" className="size-4 text-muted" />
        <span className="inline-flex items-center gap-2 rounded-xl border border-brand/30 bg-brand-soft px-3 py-2 text-sm text-ink">
          <Icon name="server" className="size-4 text-brand" />
          Server resolves current company
        </span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted">Taken from the signed-in session — never from the request body.</p>

      <div className="mt-6 rounded-2xl border border-dashed border-line-strong p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-ink">
          <Icon name="database" className="size-4 text-brand" />
          One database
          <span className="ml-auto font-mono text-[0.68rem] text-muted">every query filtered by company</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {companies.map((c) => (
            <div
              key={c.name}
              className={`rounded-xl border p-3 ${c.current ? "border-brand/40 bg-brand-soft/60 dark:bg-brand-soft" : "border-line bg-surface-2/50 opacity-60 dark:bg-surface-2/60"}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink">{c.name}</span>
                <Icon name={c.current ? "eye" : "lock"} className={`size-3.5 ${c.current ? "text-brand" : "text-muted"}`} />
              </div>
              <ul className="mt-2.5 space-y-1">
                {tables.map((t) => (
                  <li key={t} className="flex items-center justify-between rounded-md bg-surface px-2 py-1 text-[0.7rem] text-ink-2">
                    {t}
                    <span className="font-mono text-[0.62rem] text-muted">{c.current ? "visible" : "isolated"}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Architecture() {
  return (
    <Section id="architecture" tone="muted" labelledBy="architecture-title">
      <SectionHeading
        id="architecture-title"
        eyebrow="Architecture"
        title="How a request reaches your data."
        description="Every request for company data passes the same checks, in the same order, before any business logic runs."
      />

      <Reveal className="mt-12">
        <ol className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {requestFlow.map((step, i) => (
            <li key={step.label} className="relative">
              <div className="card h-full p-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon name={step.icon} className="size-4" />
                  </span>
                  <span className="font-mono text-[0.68rem] text-muted">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-ink">{step.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{step.detail}</p>
              </div>
              {i < requestFlow.length - 1 && (
                <span className="absolute -right-2.5 top-1/2 z-10 hidden size-5 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface text-muted xl:grid" aria-hidden="true">
                  <Icon name="chevron-right" className="size-3" />
                </span>
              )}
            </li>
          ))}
        </ol>
      </Reveal>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <h3 className="text-2xl font-semibold tracking-tight">Many companies, one installation.</h3>
          <p className="mt-3 text-[0.9875rem] leading-relaxed text-ink-2">
            Manifest ERP is multi-tenant: a single database where every business table carries the company it belongs to. The server determines the current company from the signed-in user and scopes every read and write to it — so one company can’t read or change another’s records.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-ink-2">
            {[
              "Per-company numbering for job files, ETA references, invoices, payments and vouchers",
              "Uploads stored per company; a file path from another company is rejected",
              "Money documents locked during changes to prevent double-billing or overpayment",
              "Every response carries a request ID that also appears in the logs",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <Icon name="check" className="mt-0.5 size-4 shrink-0 text-brand" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <TenancyDiagram />
        </Reveal>
      </div>
    </Section>
  );
}
