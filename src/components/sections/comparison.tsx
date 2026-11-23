import { comparison } from "@/data/marketing";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

/** One table: a three-column grid on tablet and up, stacked cards on phones. */
export function Comparison() {
  return (
    <Section id="comparison" labelledBy="comparison-title">
      <SectionHeading
        id="comparison-title"
        eyebrow="Before and after"
        title="Disconnected records vs. one connected workflow."
        description="A fair comparison of working patterns — not a claim about any other product."
      />
      <Reveal className="mt-12 overflow-hidden rounded-3xl border border-line bg-surface">
        <table className="w-full text-left max-md:block">
          <caption className="sr-only">Working without a connected platform compared with Manifest ERP</caption>
          <thead className="max-md:sr-only">
            <tr className="border-b border-line">
              <th scope="col" className="w-48 px-6 py-4 font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-muted">
                Area
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium text-muted">
                Disconnected way of working
              </th>
              <th scope="col" className="bg-brand-soft/60 px-6 py-4 text-sm font-semibold text-ink dark:bg-brand-soft">
                With Manifest ERP
              </th>
            </tr>
          </thead>
          <tbody className="max-md:block">
            {comparison.map((row) => (
              <tr key={row.dimension} className="border-b border-line last:border-0 max-md:block max-md:p-5">
                <th scope="row" className="px-6 py-4 text-sm font-semibold text-ink max-md:block max-md:p-0">
                  {row.dimension}
                </th>
                <td className="px-6 py-4 text-sm text-muted max-md:block max-md:px-0 max-md:pb-0 max-md:pt-3">
                  <span className="flex gap-2.5">
                    <Icon name="circle-alert" className="mt-0.5 size-4 shrink-0" />
                    <span>
                      <span className="sr-only">Disconnected: </span>
                      {row.without}
                    </span>
                  </span>
                </td>
                <td className="bg-brand-soft/60 px-6 py-4 text-sm text-ink max-md:mt-2 max-md:block max-md:rounded-xl max-md:p-3 dark:bg-brand-soft">
                  <span className="flex gap-2.5">
                    <Icon name="circle-check" className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>
                      <span className="sr-only">With Manifest ERP: </span>
                      {row.with}
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </Section>
  );
}
