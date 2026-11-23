import { Section, SectionHeading } from "@/components/ui/section";
import { RolesJourneys } from "./roles-journeys";

export function RolesSection() {
  return (
    <Section id="roles" labelledBy="roles-title">
      <SectionHeading
        id="roles-title"
        eyebrow="User journeys"
        title="One platform, a different day for every role."
        description="Each person works in the areas their role allows. Permissions are enforced on the server — and financial figures stay with the people allowed to see them."
      />
      <RolesJourneys />
    </Section>
  );
}
