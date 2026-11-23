import { showcaseScreens } from "@/data/showcase";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProductTour } from "./product-tour";

export function ProductTourSection() {
  return (
    <Section id="product-tour" labelledBy="tour-title">
      <SectionHeading
        id="tour-title"
        align="center"
        eyebrow="Product tour"
        title="Sixteen screens. One consistent product."
        description="Browse the screens your team would use every day — from the ETA sheet to the activity log. These are illustrative previews built from the product documentation, with fictional sample data."
      />
      <ProductTour items={showcaseScreens} initialIndex={1} />
    </Section>
  );
}
