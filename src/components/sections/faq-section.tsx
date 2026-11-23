import { faqs } from "@/data/faqs";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { FaqAccordion } from "./faq";

export function FaqSection({ withSchema = false }: { withSchema?: boolean }) {
  return (
    <Section id="faq" labelledBy="faq-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          title="Questions, answered."
          description="Straight answers about what Manifest ERP does — and what it doesn’t."
        />
        <FaqAccordion items={faqs} />
      </div>
      {withSchema && <JsonLd data={faqJsonLd(faqs)} />}
    </Section>
  );
}
