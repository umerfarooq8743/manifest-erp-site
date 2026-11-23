import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, type LegalSection } from "@/components/sections/legal-page";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How the Manifest ERP marketing website handles information: no database, no form storage, no analytics, and a theme preference kept in your browser.",
  path: "/privacy",
});

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "Scope",
    body: (
      <p>
        This policy covers this marketing website for {site.name}. It does not cover the {site.name} application itself, which is governed by the agreement a business enters into when it uses the product.
      </p>
    ),
  },
  {
    id: "forms",
    title: "Inquiry forms",
    body: (
      <>
        <p>
          The demo, inquiry and partnership forms are checked in your browser and then open WhatsApp with a pre-filled message. This website has no database and does not store, log or transmit what you type into the forms.
        </p>
        <p>
          Your message is only sent if you choose to send it in WhatsApp. From that point it is handled by WhatsApp under its own terms and privacy policy, and by the {site.name} team to respond to your inquiry.
        </p>
      </>
    ),
  },
  {
    id: "storage",
    title: "Information stored in your browser",
    body: (
      <p>
        If you choose a light or dark theme, that preference is saved in your browser’s local storage so the site looks the same on your next visit. It never leaves your device and you can clear it at any time from your browser settings. The website does not set advertising or tracking cookies.
      </p>
    ),
  },
  {
    id: "analytics",
    title: "Analytics and third parties",
    body: (
      <p>
        The website does not include analytics, advertising or social-media tracking scripts. Fonts are served from this website rather than a third-party font service. If you follow a link to another site — such as WhatsApp — that site’s own policies apply.
      </p>
    ),
  },
  {
    id: "hosting",
    title: "Hosting",
    body: (
      <p>
        Like any website, the hosting provider may process technical information such as IP addresses and request logs to deliver pages securely and reliably. That processing is carried out by the host under its own policies.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Your choices",
    body: (
      <p>
        Because the website doesn’t store form submissions, there is no website record to access or delete. If you have exchanged messages with the team, you can ask for them to be deleted through the same channel, or via the details on the <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes",
    body: <p>We may update this policy if the website changes — for example if analytics are introduced. The date at the top shows when it was last revised.</p>,
  },
];

export default function PrivacyPage() {
  return <LegalPage crumb="Privacy Policy" title="Privacy Policy" intro="Plain-language information about what this website does — and doesn’t do — with your information." sections={sections} />;
}
