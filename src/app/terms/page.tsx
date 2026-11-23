import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, type LegalSection } from "@/components/sections/legal-page";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms for using the Manifest ERP marketing website, including how product previews and descriptions should be read.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Using this website",
    body: <p>By using this website you agree to these terms. If you don’t agree, please don’t use the site.</p>,
  },
  {
    id: "information",
    title: "Product information",
    body: (
      <>
        <p>
          The website describes {site.name} for general information. Features, screens and workflows are described as the product works at the time of writing and may change as the product develops.
        </p>
        <p>
          Nothing on this website is an offer or a contract. The terms that apply to using {site.name} itself are agreed separately with each business.
        </p>
      </>
    ),
  },
  {
    id: "previews",
    title: "Illustrative previews",
    body: (
      <p>
        Product screens, dashboards, reports and scenarios on this website are illustrative previews built from the product documentation. They use fictional companies, people and figures, and do not represent real customers, transactions or results.
      </p>
    ),
  },
  {
    id: "compliance",
    title: "Tax and regulatory matters",
    body: (
      <p>
        References to tax codes, withholding tax, customs procedures or regulators describe product capabilities only. They are not tax, legal or customs advice. Rates and compliance requirements should be confirmed with a qualified adviser.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: <p>The {site.name} name, logo, website design and content belong to their owner. You may not copy or reuse them without permission, except to share links to the website.</p>,
  },
  {
    id: "links",
    title: "Third-party services",
    body: (
      <p>
        Inquiry forms open WhatsApp, a third-party service with its own terms. We are not responsible for the content or practices of external services linked from this website.
      </p>
    ),
  },
  {
    id: "liability",
    title: "No warranty",
    body: <p>The website is provided “as is”. While we aim to keep it accurate and available, we don’t guarantee that it is error-free or uninterrupted.</p>,
  },
  {
    id: "contact",
    title: "Questions",
    body: (
      <p>
        Questions about these terms can be sent through the <Link href="/contact?inquiry=general#inquiry">contact page</Link>. See also the <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return <LegalPage crumb="Terms of Use" title="Terms of Use" intro="The terms for using this website and how to read the product information on it." sections={sections} />;
}
