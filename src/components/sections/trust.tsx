import { realities } from "@/data/marketing";
import { testimonials } from "@/data/testimonials";
import { IconTile } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

/**
 * Shows approved testimonials when they exist; otherwise the
 * "Built for the realities of clearing & forwarding" section. Nothing is invented.
 */
export function Trust() {
  const approved = testimonials.filter((t) => t.approved);
  if (approved.length > 0) {
    return (
      <Section id="customers" labelledBy="customers-title">
        <SectionHeading id="customers-title" eyebrow="Customers" title="What teams say about Manifest ERP." />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {approved.map((t) => (
            <li key={`${t.name}-${t.company}`} className="card flex flex-col p-6">
              <blockquote className="flex-1 text-[0.9875rem] leading-relaxed text-ink">“{t.quote}”</blockquote>
              <p className="mt-6 text-sm font-semibold text-ink">{t.name}</p>
              <p className="text-xs text-muted">
                {t.role}, {t.company}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    );
  }
  return (
    <Section id="realities" labelledBy="realities-title">
      <SectionHeading
        id="realities-title"
        align="center"
        eyebrow="Built for the realities of clearing & forwarding"
        title="Designed around how the port actually works."
        description="The details that make Manifest ERP fit the job — taken straight from what the product does today."
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {realities.map((r, i) => (
          <Reveal as="li" key={r.title} delay={(i % 3) * 0.05} className="card card-hover p-6">
            <IconTile name={r.icon} />
            <h3 className="text-h3 mt-5">{r.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{r.description}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
