/**
 * Inquiry validation, message formatting and WhatsApp deep links.
 *
 * Pure, dependency-free functions (no path aliases) so the same file runs in
 * the browser, during the Next.js build and directly under `node --test`.
 * Nothing here stores or transmits data: the visitor's own WhatsApp opens
 * with a pre-filled message that they review and send themselves.
 */

export type InquiryType = "demo" | "general" | "product" | "partnership";

export interface Inquiry {
  type: InquiryType;
  name: string;
  company?: string;
  role?: string;
  email?: string;
  phone?: string;
  subject?: string;
  interests?: string[];
  message?: string;
}

export type InquiryField = "name" | "company" | "role" | "email" | "phone" | "subject" | "interests" | "message";
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export interface InquiryDefinition {
  type: InquiryType;
  label: string;
  title: string;
  description: string;
  intro: string;
  submitLabel: string;
  companyRequired: boolean;
  messageRequired: boolean;
  messageLabel: string;
  messagePlaceholder: string;
  showInterests: boolean;
  showSubject: boolean;
}

export const INQUIRY_TYPES: Record<InquiryType, InquiryDefinition> = {
  demo: {
    type: "demo",
    label: "Request a demo",
    title: "See Manifest ERP on your own workflow",
    description:
      "Tell us a little about your business and we'll walk you through the modules that matter to you — from ETA tracking to billing and statements of account.",
    intro: "I would like to request a product demonstration of Manifest ERP.",
    submitLabel: "Request demo on WhatsApp",
    companyRequired: true,
    messageRequired: false,
    messageLabel: "Anything we should prepare? (optional)",
    messagePlaceholder: "e.g. We clear around 40 import files a month through Port Qasim and want to see job files, vouchers and billing.",
    showInterests: true,
    showSubject: false,
  },
  general: {
    type: "general",
    label: "General inquiry",
    title: "Ask us anything",
    description: "Questions about Manifest ERP, onboarding or how it could fit your business.",
    intro: "I have a general inquiry about Manifest ERP.",
    submitLabel: "Send on WhatsApp",
    companyRequired: false,
    messageRequired: true,
    messageLabel: "Your message",
    messagePlaceholder: "How can we help?",
    showInterests: false,
    showSubject: true,
  },
  product: {
    type: "product",
    label: "Product question",
    title: "Questions about a specific capability",
    description: "Ask how a module works — customs stages, documents, vouchers, invoices, banks, reports or team permissions.",
    intro: "I have a product question about Manifest ERP.",
    submitLabel: "Ask on WhatsApp",
    companyRequired: false,
    messageRequired: true,
    messageLabel: "Your question",
    messagePlaceholder: "e.g. Can an invoice include both reimbursements and agency service charges?",
    showInterests: true,
    showSubject: false,
  },
  partnership: {
    type: "partnership",
    label: "Partnership",
    title: "Business partnership inquiry",
    description: "For implementation partners, resellers and organisations that want to work with the Manifest ERP team.",
    intro: "I would like to discuss a business partnership with the Manifest ERP team.",
    submitLabel: "Start the conversation",
    companyRequired: true,
    messageRequired: true,
    messageLabel: "Tell us about the partnership",
    messagePlaceholder: "Who you are, what you have in mind and how you'd like to work together.",
    showInterests: false,
    showSubject: false,
  },
};

export const INQUIRY_ORDER: InquiryType[] = ["demo", "general", "product", "partnership"];

export const INTEREST_OPTIONS = [
  "ETA sheet & job files",
  "Customs workflow",
  "Documents & forms",
  "Transport & deliveries",
  "Expenses & vouchers",
  "Billing & SOA",
  "Banks & pay orders",
  "Reports",
  "Team & permissions",
  "Multi-company setup",
] as const;

export const SUBJECT_OPTIONS = ["General question", "Onboarding & setup", "Data & security", "Pricing & plans", "Something else"] as const;

export const ROLE_OPTIONS = ["Owner / Director", "Operations", "Accounts & finance", "IT / Systems", "Other"] as const;

export const LIMITS = { name: 80, company: 120, role: 60, email: 120, phone: 24, subject: 80, message: 1000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Removes control characters (keeps newlines), trims and caps the length. */
export function cleanText(value: unknown, max: number, multiline = false): string {
  if (typeof value !== "string") return "";
  let text = value.replace(/\r\n?/g, "\n");
  text = text.replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, multiline ? "" : " ");
  if (!multiline) text = text.replace(/\n/g, " ").replace(/\s{2,}/g, " ");
  else text = text.replace(/\n{3,}/g, "\n\n").replace(/[ \t]{2,}/g, " ");
  return text.trim().slice(0, max);
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value) && value.length <= LIMITS.email;
}

export function isValidPhone(value: string): boolean {
  if (!/^[+\d][\d\s().-]*$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

/** Returns a cleaned copy of the inquiry with only the fields its type uses. */
export function normalizeInquiry(input: Inquiry): Inquiry {
  const def = INQUIRY_TYPES[input.type];
  const interests = def.showInterests
    ? (input.interests ?? []).filter((i): i is (typeof INTEREST_OPTIONS)[number] =>
        (INTEREST_OPTIONS as readonly string[]).includes(i),
      )
    : [];
  return {
    type: input.type,
    name: cleanText(input.name, LIMITS.name),
    company: cleanText(input.company, LIMITS.company),
    role: cleanText(input.role, LIMITS.role),
    email: cleanText(input.email, LIMITS.email),
    phone: cleanText(input.phone, LIMITS.phone),
    subject: def.showSubject ? cleanText(input.subject, LIMITS.subject) : "",
    interests,
    message: cleanText(input.message, LIMITS.message, true),
  };
}

export function validateInquiry(input: Inquiry): InquiryErrors {
  const def = INQUIRY_TYPES[input.type];
  const data = normalizeInquiry(input);
  const errors: InquiryErrors = {};

  if (!data.name) errors.name = "Please enter your name.";
  else if (data.name.length < 2) errors.name = "Name should be at least 2 characters.";

  if (def.companyRequired && !data.company) errors.company = "Please enter your company name.";

  if (data.email && !isValidEmail(data.email)) errors.email = "Please enter a valid email address, e.g. name@company.com.";
  if (data.phone && !isValidPhone(data.phone)) errors.phone = "Please enter a valid phone number with 7–15 digits.";

  if (def.showSubject && !data.subject) errors.subject = "Please choose a subject.";

  const message = data.message ?? "";
  if (def.messageRequired && !message) errors.message = "Please write a short message.";
  else if (message && message.length < 10) errors.message = "Please add a little more detail (at least 10 characters).";

  return errors;
}

export const hasErrors = (errors: InquiryErrors) => Object.keys(errors).length > 0;

/** Formats the professional, pre-filled WhatsApp message. */
export function buildInquiryMessage(input: Inquiry): string {
  const def = INQUIRY_TYPES[input.type];
  const data = normalizeInquiry(input);
  const lines: string[] = ["Hello Manifest ERP team,", "", def.intro, ""];
  lines.push(`*Inquiry:* ${def.label}`);
  lines.push(`*Name:* ${data.name}`);
  if (data.company) lines.push(`*Company:* ${data.company}`);
  if (data.role) lines.push(`*Role:* ${data.role}`);
  if (data.email) lines.push(`*Email:* ${data.email}`);
  if (data.phone) lines.push(`*Phone:* ${data.phone}`);
  if (data.subject) lines.push(`*Subject:* ${data.subject}`);
  if (data.interests && data.interests.length) lines.push(`*Interested in:* ${data.interests.join(", ")}`);
  if (data.message) lines.push("", "*Message:*", data.message);
  lines.push("", "— Sent from the Manifest ERP website");
  return lines.join("\n");
}

/** Strips formatting from a configured number: "+92 300-1234567" → "923001234567". */
export function normalizeWhatsAppNumber(raw: string | undefined | null): string {
  if (!raw) return "";
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  return digits;
}

/** E.164 without the plus sign: 8–15 digits, no leading zero. */
export function isValidWhatsAppNumber(raw: string | undefined | null): boolean {
  return /^[1-9]\d{7,14}$/.test(normalizeWhatsAppNumber(raw));
}

/**
 * Builds a wa.me link with the encoded inquiry. Returns null when the number
 * is missing or malformed, so callers can show a configuration notice
 * instead of a broken link.
 */
export function createWhatsAppUrl(number: string | undefined | null, inquiry: Inquiry): string | null {
  if (!isValidWhatsAppNumber(number)) return null;
  const text = buildInquiryMessage(inquiry);
  return `https://wa.me/${normalizeWhatsAppNumber(number)}?text=${encodeURIComponent(text)}`;
}
