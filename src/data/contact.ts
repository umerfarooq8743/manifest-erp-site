import type { IconName } from "@/components/ui/icon";

/**
 * CONTACT CONFIGURATION — the only place contact details live.
 *
 * Verified business details were not available when this site was built, so
 * every value below is intentionally empty. Empty methods are hidden across the
 * site, and inquiry forms show a notice instead of building a broken link.
 *
 * Set them either here or (recommended) as Vercel environment variables:
 *   NEXT_PUBLIC_WHATSAPP_NUMBER   international format, digits only — e.g. 923001234567
 *   NEXT_PUBLIC_CONTACT_EMAIL     e.g. sales@yourdomain.com
 *   NEXT_PUBLIC_CONTACT_PHONE     e.g. +92 21 0000 0000 (shown as written; used for tel: links)
 *   NEXT_PUBLIC_BUSINESS_HOURS    e.g. Mon–Sat, 9:00–18:00 PKT
 */
const env = (value: string | undefined, fallback = "") => (value ?? "").trim() || fallback;

export const contact = {
  /** WhatsApp Business number in international format, digits only (no +, spaces or leading 00). */
  whatsappNumber: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, ""),
  /** Sales / demo email address. */
  email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL, ""),
  /** Phone number exactly as it should be displayed. */
  phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE, ""),
  /** Optional, e.g. "Mon–Sat, 9:00–18:00 PKT". */
  businessHours: env(process.env.NEXT_PUBLIC_BUSINESS_HOURS, ""),
} as const;

export const hasWhatsApp = () => /^[1-9]\d{7,14}$/.test(contact.whatsappNumber);
export const hasEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email);
export const hasPhone = () => contact.phone.replace(/\D/g, "").length >= 7;
export const telHref = () => `tel:${contact.phone.replace(/[^\d+]/g, "")}`;
export const mailHref = (subject = "Manifest ERP inquiry") =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;

export interface ContactMethod {
  id: "whatsapp" | "email" | "phone";
  label: string;
  value: string;
  href: string;
  icon: IconName;
  hint: string;
  external: boolean;
}

/** Contact methods that are actually configured — never placeholders. */
export function configuredContactMethods(): ContactMethod[] {
  const methods: ContactMethod[] = [];
  if (hasWhatsApp()) {
    methods.push({
      id: "whatsapp",
      label: "WhatsApp",
      value: `+${contact.whatsappNumber}`,
      href: `https://wa.me/${contact.whatsappNumber}`,
      icon: "message-circle",
      hint: "Fastest way to reach the team",
      external: true,
    });
  }
  if (hasEmail()) {
    methods.push({
      id: "email",
      label: "Email",
      value: contact.email,
      href: mailHref(),
      icon: "mail",
      hint: "For detailed requirements and documents",
      external: false,
    });
  }
  if (hasPhone()) {
    methods.push({
      id: "phone",
      label: "Phone",
      value: contact.phone,
      href: telHref(),
      icon: "phone",
      hint: contact.businessHours || "Speak to the team directly",
      external: false,
    });
  }
  return methods;
}
