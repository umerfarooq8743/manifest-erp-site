import { reportCategories, reportHighlights } from "@/data/reports";
import { ProductMockup } from "@/components/mockups/product-mockup";
import { Icon } from "@/components/ui/icon";
import { IconTile, IllustrativeTag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

const periodLabel = { range: "Date range", "as-of": "As of date", current: "Current" } as const;

export function ReportsShowcase({ detailed = false }: { detailed?: boolean }) {
  return (
    <Section id="reports" labelledBy="reports-title">
      <SectionHeading
        id="reports-title"
        eyebrow="Reports & analytics"
        title="Answers from live records, ready to export."
        description="Finance, operations and team reports are calculated from the same rules the screens use — filtered by date and client, and exported to Excel or PDF."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reportHighlights.map((h, i) => (
          <Reveal key={h.title} delay={i * 0.05} className="rounded-2xl border border-line p-5">
            <p className="text-[0.9375rem] font-semibold text-ink">{h.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{h.description}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Reveal className="min-w-0">
          <ProductMockup screen="report-detail" crop />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <IllustrativeTag />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs text-muted">
              <Icon name="file-spreadsheet" className="size-3.5" /> Excel
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs text-muted">
              <Icon name="file-text" className="size-3.5" /> PDF
            </span>
          </div>
        </Reveal>
        <div className="space-y-8">
          {reportCategories.map((cat) => (
            <Reveal key={cat.id}>
              <div className="flex items-center gap-3">
                <IconTile name={cat.icon} size="sm" />
                <div>
                  <h3 className="text-[0.9875rem] font-semibold text-ink">{cat.title}</h3>
                  <p className="text-xs text-muted">{cat.description}</p>
                </div>
              </div>
              <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-surface">
                {(detailed ? cat.reports : cat.reports.slice(0, 5)).map((r) => (
                  <li key={r.title} className="px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-ink">{r.title}</p>
                      <span className="flex shrink-0 gap-1">
                        <span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[0.68rem] text-muted">{periodLabel[r.period]}</span>
                        {r.customerFilter && <span className="rounded-md bg-brand-soft px-1.5 py-0.5 text-[0.68rem] text-brand">Client filter</span>}
                      </span>
                    </div>
                    {detailed && <p className="mt-1 text-xs leading-relaxed text-muted">{r.description}</p>}
                  </li>
                ))}
                {!detailed && cat.reports.length > 5 && (
                  <li className="px-4 py-3 text-xs text-muted">+ {cat.reports.length - 5} more {cat.title.toLowerCase()} reports</li>
                )}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
