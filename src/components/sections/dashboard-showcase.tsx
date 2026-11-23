import type { IconName } from "@/components/ui/icon";
import { ProductMockup } from "@/components/mockups/product-mockup";
import { IconTile, IllustrativeTag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

const POINTS: { title: string; text: string; icon: IconName }[] = [
  { title: "My work today", text: "A personal list of what needs doing now, by role.", icon: "list-checks" },
  { title: "Live alerts", text: "FI, D/O and NOC expiries, detention and arrivals — before they become problems.", icon: "bell" },
  { title: "Pipeline & workload", text: "Files by customs stage and open work per staff member.", icon: "gauge" },
  { title: "Banks & profit", text: "Bank balances, billing vs collections and file-wise profit — for finance roles only.", icon: "landmark" },
];

export function DashboardShowcase() {
  return (
    <Section id="dashboard" tone="muted" labelledBy="dashboard-title">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)] lg:gap-14">
        <div>
          <SectionHeading
            id="dashboard-title"
            eyebrow="Dashboard"
            title="The whole desk, on one screen."
            description="The dashboard opens on what matters today. Figures respect each viewer’s role: money appears only for people with finance permissions."
          />
          <ul className="mt-8 space-y-5">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.05} className="flex gap-4">
                <IconTile name={p.icon} size="sm" />
                <div>
                  <p className="text-[0.9375rem] font-semibold text-ink">{p.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal className="min-w-0">
          <ProductMockup screen="dashboard" variant="finance" crop />
          <div className="mt-4 flex justify-center lg:justify-start">
            <IllustrativeTag>Illustrative product preview · fictional figures</IllustrativeTag>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
