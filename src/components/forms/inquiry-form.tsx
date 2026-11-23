"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  INQUIRY_TYPES,
  INTEREST_OPTIONS,
  LIMITS,
  ROLE_OPTIONS,
  SUBJECT_OPTIONS,
  createWhatsAppUrl,
  hasErrors,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
  type InquiryField,
  type InquiryType,
} from "@/lib/inquiry";
import { contact, configuredContactMethods, mailHref } from "@/data/contact";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const FIELD_ORDER: InquiryField[] = ["name", "company", "role", "email", "phone", "subject", "interests", "message"];

type Status = { kind: "idle" } | { kind: "redirecting"; url: string; blocked: boolean } | { kind: "not-configured" };

const inputClass =
  "block w-full rounded-xl border border-line-strong bg-surface px-3.5 py-2.5 text-[0.9375rem] text-ink shadow-[inset_0_1px_1px_hsl(var(--shadow-color)/0.04)] outline-none transition-[border-color,box-shadow] placeholder:text-muted/80 focus:border-brand focus:ring-4 focus:ring-brand/15 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/15";

const selectClass = cn(inputClass, "appearance-none bg-[length:1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10");
const selectStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
};

function Label({ htmlFor, children, required, optional }: { htmlFor: string; children: string; required?: boolean; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-1 text-sm font-medium text-ink">
      {children}
      {required && (
        <span className="text-danger" aria-hidden="true">
          *
        </span>
      )}
      {optional && <span className="font-normal text-muted">(optional)</span>}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-sm text-danger">
      <Icon name="circle-alert" className="size-3.5 shrink-0" />
      {message}
    </p>
  );
}

export function InquiryForm({ type }: { type: InquiryType }) {
  const def = INQUIRY_TYPES[type];
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Inquiry>({ type, name: "", company: "", role: "", email: "", phone: "", subject: "", interests: [], message: "" });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const id = (field: string) => `${uid}-${field}`;
  const describedBy = (field: InquiryField, hint?: boolean) =>
    [errors[field] ? id(`${field}-error`) : null, hint ? id(`${field}-hint`) : null].filter(Boolean).join(" ") || undefined;

  const update = <K extends keyof Inquiry>(key: K, value: Inquiry[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validateInquiry(next));
    if (status.kind !== "idle") setStatus({ kind: "idle" });
  };

  const toggleInterest = (interest: string) => {
    const current = values.interests ?? [];
    update("interests", current.includes(interest) ? current.filter((i) => i !== interest) : [...current, interest]);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const found = validateInquiry(values);
    setErrors(found);
    if (hasErrors(found)) {
      const first = FIELD_ORDER.find((f) => found[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      setStatus({ kind: "idle" });
      return;
    }
    const url = createWhatsAppUrl(contact.whatsappNumber, values);
    if (!url) {
      setStatus({ kind: "not-configured" });
      return;
    }
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    setStatus({ kind: "redirecting", url, blocked: !win });
  };

  const errorCount = Object.keys(errors).length;
  const methods = configuredContactMethods().filter((mth) => mth.id !== "whatsapp");
  const messageLength = (values.message ?? "").length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={id("privacy")} className="space-y-5">
      {submitted && errorCount > 0 && (
        <div role="alert" className="flex gap-3 rounded-xl border border-danger/25 bg-danger-soft p-4 text-sm text-ink">
          <Icon name="circle-alert" className="mt-0.5 size-4 shrink-0 text-danger" />
          <p>
            Please fix {errorCount === 1 ? "1 field" : `${errorCount} fields`} below before continuing.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={id("name")} required>
            Full name
          </Label>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={inputClass}
          />
          <FieldError id={id("name-error")} message={errors.name} />
        </div>
        <div>
          <Label htmlFor={id("company")} required={def.companyRequired} optional={!def.companyRequired}>
            Company
          </Label>
          <input
            id={id("company")}
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.company}
            required={def.companyRequired}
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={describedBy("company")}
            className={inputClass}
          />
          <FieldError id={id("company-error")} message={errors.company} />
        </div>
        <div>
          <Label htmlFor={id("email")} optional>
            Email
          </Label>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={inputClass}
            placeholder="name@company.com"
          />
          <FieldError id={id("email-error")} message={errors.email} />
        </div>
        <div>
          <Label htmlFor={id("phone")} optional>
            Phone
          </Label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            className={inputClass}
            placeholder="+92 …"
          />
          <FieldError id={id("phone-error")} message={errors.phone} />
        </div>
        {(type === "demo" || type === "partnership") && (
          <div className="sm:col-span-2">
            <Label htmlFor={id("role")} optional>
              Your role
            </Label>
            <select id={id("role")} name="role" value={values.role} onChange={(e) => update("role", e.target.value)} className={selectClass} style={selectStyle}>
              <option value="">Select a role</option>
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        )}
        {def.showSubject && (
          <div className="sm:col-span-2">
            <Label htmlFor={id("subject")} required>
              Subject
            </Label>
            <select
              id={id("subject")}
              name="subject"
              required
              value={values.subject}
              onChange={(e) => update("subject", e.target.value)}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={describedBy("subject")}
              className={selectClass}
              style={selectStyle}
            >
              <option value="">Choose a subject</option>
              {SUBJECT_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <FieldError id={id("subject-error")} message={errors.subject} />
          </div>
        )}
      </div>

      {def.showInterests && (
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-ink">
            {type === "demo" ? "What would you like to see?" : "Which area is this about?"} <span className="font-normal text-muted">(optional)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((interest) => {
              const checked = (values.interests ?? []).includes(interest);
              return (
                <label
                  key={interest}
                  className={cn(
                    "relative inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
                    checked ? "border-brand/40 bg-brand-soft text-ink" : "border-line-strong text-ink-2 hover:border-ink/25",
                  )}
                >
                  <input type="checkbox" name="interests" value={interest} checked={checked} onChange={() => toggleInterest(interest)} className="sr-only" />
                  <span className={cn("grid size-4 place-items-center rounded-full border", checked ? "border-brand bg-brand text-brand-ink" : "border-line-strong")} aria-hidden="true">
                    {checked && <Icon name="check" className="size-2.5" strokeWidth={3} />}
                  </span>
                  {interest}
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <div>
        <Label htmlFor={id("message")} required={def.messageRequired} optional={!def.messageRequired}>
          {def.messageLabel.replace(" (optional)", "")}
        </Label>
        <textarea
          id={id("message")}
          name="message"
          rows={5}
          maxLength={LIMITS.message}
          required={def.messageRequired}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message", true)}
          placeholder={def.messagePlaceholder}
          className={cn(inputClass, "resize-y")}
        />
        <div className="mt-1.5 flex items-start justify-between gap-4">
          <FieldError id={id("message-error")} message={errors.message} />
          <p id={id("message-hint")} className="ml-auto shrink-0 font-mono text-xs text-muted">
            {messageLength}/{LIMITS.message}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p id={id("privacy")} className="max-w-sm text-xs leading-relaxed text-muted">
          Sending opens WhatsApp with your message pre-filled, so you can review it before it’s sent. This website doesn’t store your details.
        </p>
        <Button type="submit" size="lg" icon="message-circle" iconPosition="start" className="w-full sm:w-auto">
          {def.submitLabel}
        </Button>
      </div>

      <div aria-live="polite" role="status">
        <AnimatePresence>
          {status.kind === "redirecting" && (
            <m.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-3 rounded-xl border border-brand/25 bg-brand-soft p-4 text-sm text-ink">
              <Icon name="message-circle" className="mt-0.5 size-4 shrink-0 text-brand" />
              <div>
                <p className="font-medium">{status.blocked ? "Your browser blocked the new tab." : "Redirecting you to WhatsApp…"}</p>
                <p className="mt-1 text-ink-2">
                  Your message is ready to review and send in WhatsApp. If it didn’t open,{" "}
                  <a href={status.url} target="_blank" rel="noopener noreferrer" className="font-medium text-brand underline underline-offset-4">
                    open WhatsApp here
                  </a>
                  .
                </p>
              </div>
            </m.div>
          )}
          {status.kind === "not-configured" && (
            <m.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-3 rounded-xl border border-warn/30 bg-warn-soft p-4 text-sm text-ink">
              <Icon name="info" className="mt-0.5 size-4 shrink-0 text-warn" />
              <div>
                <p className="font-medium">Online inquiries aren’t connected yet.</p>
                <p className="mt-1 text-ink-2">
                  The WhatsApp line for this website hasn’t been published. Your details are still in the form — nothing was sent or stored.
                  {methods.length > 0 ? " You can reach the team directly:" : " Please check back soon."}
                </p>
                {methods.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {methods.map((mth) => (
                      <li key={mth.id}>
                        <a href={mth.id === "email" ? mailHref(`${def.label} — Manifest ERP`) : mth.href} className="font-medium text-brand underline underline-offset-4">
                          {mth.label}: {mth.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                {process.env.NODE_ENV !== "production" && (
                  <p className="mt-2 font-mono text-xs text-muted">Site owner: set NEXT_PUBLIC_WHATSAPP_NUMBER (see src/data/contact.ts).</p>
                )}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
