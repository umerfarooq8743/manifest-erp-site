import { solutionNodes } from "@/data/marketing";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

/** Desktop positions (percent of the diagram box) for the ten nodes around the hub. */
const POSITIONS = [
  { x: 13, y: 12 },
  { x: 37.5, y: 12 },
  { x: 62.5, y: 12 },
  { x: 87, y: 12 },
  { x: 9, y: 50 },
  { x: 91, y: 50 },
  { x: 13, y: 88 },
  { x: 37.5, y: 88 },
  { x: 62.5, y: 88 },
  { x: 87, y: 88 },
];
// slot → node index, so the lifecycle reads clockwise from the top-left.
const ORDER = [0, 1, 2, 3, 9, 4, 8, 7, 6, 5];

function HubCard() {
  return (
    <div className="relative w-full max-w-xs rounded-2xl border border-brand/30 bg-surface p-5 shadow-elevated">
      <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-b from-brand/30 to-brand-2/10 blur-xl" aria-hidden="true" />
      <div className="flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-lg bg-brand text-brand-ink">
          <Icon name="folder-kanban" className="size-4" />
        </span>
        <div>
          <p className="text-[0.7rem] font-medium uppercase tracking-wider text-muted">Job file</p>
          <p className="font-mono text-sm font-semibold text-ink">MCF-2026-0142</p>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
        <dt className="text-muted">Client</dt>
        <dd className="truncate text-right text-ink">Arcadia Pharma</dd>
        <dt className="text-muted">BL</dt>
        <dd className="text-right font-mono text-ink">MEDU4790218</dd>
        <dt className="text-muted">Stage</dt>
        <dd className="text-right text-ink">Delivery Order</dd>
        <dt className="text-muted">Status</dt>
        <dd className="text-right">
          <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[0.68rem] font-medium text-brand">In progress</span>
        </dd>
      </dl>
    </div>
  );
}

export function SolutionHub() {
  return (
    <Section id="solution" labelledBy="solution-title">
      <SectionHeading
        id="solution-title"
        align="center"
        eyebrow="The solution"
        title="One job file connects every desk."
        description="Operations, documentation, customs, transport and accounts all write to the same record — so information entered once flows to everyone who needs it."
      />

      {/* Desktop diagram */}
      <Reveal className="relative mx-auto mt-16 hidden aspect-[2/1] max-w-6xl lg:block">
        <svg className="absolute inset-0 size-full" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden="true">
          {POSITIONS.map((p, i) => (
            <line
              key={i}
              x1={50}
              y1={25}
              x2={p.x}
              y2={p.y / 2}
              stroke="var(--brand)"
              strokeOpacity={0.35}
              strokeWidth={1.25}
              strokeDasharray="4 6"
              vectorEffect="non-scaling-stroke"
              className="animate-flow"
            />
          ))}
        </svg>
        {ORDER.map((nodeIndex, slot) => {
          const node = solutionNodes[nodeIndex];
          const pos = POSITIONS[slot];
          return (
            <div
              key={node.label}
              className="absolute w-48 -translate-x-1/2 -translate-y-1/2 xl:w-52"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div className="card flex items-center gap-3 p-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                  <Icon name={node.icon} className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink">{node.label}</span>
                  <span className="block text-xs leading-snug text-muted">{node.detail}</span>
                </span>
              </div>
            </div>
          );
        })}
        <div className="absolute left-1/2 top-1/2 flex w-80 -translate-x-1/2 -translate-y-1/2 justify-center">
          <HubCard />
        </div>
      </Reveal>

      {/* Mobile / tablet layout */}
      <div className="mt-12 lg:hidden">
        <div className="flex justify-center">
          <HubCard />
        </div>
        <div className="mx-auto my-4 h-8 w-px bg-gradient-to-b from-brand/50 to-transparent" aria-hidden="true" />
        <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3">
          {solutionNodes.map((node) => (
            <li key={node.label} className="card flex items-center gap-3 p-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                <Icon name={node.icon} className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-ink">{node.label}</span>
                <span className="block text-xs text-muted">{node.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
