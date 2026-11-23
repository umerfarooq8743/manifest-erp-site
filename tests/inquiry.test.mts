import { test } from "node:test";
import assert from "node:assert/strict";
import {
  INQUIRY_ORDER,
  INQUIRY_TYPES,
  buildInquiryMessage,
  cleanText,
  createWhatsAppUrl,
  hasErrors,
  isValidEmail,
  isValidPhone,
  isValidWhatsAppNumber,
  normalizeWhatsAppNumber,
  validateInquiry,
  type Inquiry,
} from "../src/lib/inquiry.ts";

const demo: Inquiry = {
  type: "demo",
  name: "Sara Ahmed",
  company: "Example Clearing",
  email: "sara@example.com",
  phone: "+92 300 0000000",
  interests: ["Customs workflow", "Billing & SOA"],
  message: "",
};

test("all four inquiry types are defined", () => {
  assert.deepEqual(INQUIRY_ORDER, ["demo", "general", "product", "partnership"]);
  for (const type of INQUIRY_ORDER) assert.equal(INQUIRY_TYPES[type].type, type);
});

test("empty submissions are rejected with field errors", () => {
  for (const type of INQUIRY_ORDER) {
    const errors = validateInquiry({ type, name: "   ", message: "" });
    assert.ok(errors.name, `${type}: name required`);
    if (INQUIRY_TYPES[type].companyRequired) assert.ok(errors.company, `${type}: company required`);
    if (INQUIRY_TYPES[type].messageRequired) assert.ok(errors.message, `${type}: message required`);
  }
});

test("a complete demo request is valid", () => {
  assert.equal(hasErrors(validateInquiry(demo)), false);
});

test("email and phone are validated only when provided", () => {
  assert.ok(validateInquiry({ ...demo, email: "not-an-email" }).email);
  assert.ok(validateInquiry({ ...demo, phone: "12" }).phone);
  assert.ok(validateInquiry({ ...demo, phone: "call me" }).phone);
  assert.equal(validateInquiry({ ...demo, email: "", phone: "" }).email, undefined);
  assert.equal(isValidEmail("a@b.co"), true);
  assert.equal(isValidPhone("+92 (21) 3456-7890"), true);
});

test("general inquiries need a subject and a real message", () => {
  const errors = validateInquiry({ type: "general", name: "Ali", subject: "", message: "hi" });
  assert.ok(errors.subject);
  assert.ok(errors.message);
});

test("WhatsApp numbers are normalised and validated", () => {
  assert.equal(normalizeWhatsAppNumber("+92 300-123 4567"), "923001234567");
  assert.equal(normalizeWhatsAppNumber("0092 300 1234567"), "923001234567");
  assert.equal(isValidWhatsAppNumber("923001234567"), true);
  assert.equal(isValidWhatsAppNumber(""), false);
  assert.equal(isValidWhatsAppNumber("03001234567"), false, "local numbers with a leading 0 are rejected");
  assert.equal(isValidWhatsAppNumber("1234"), false);
});

test("no URL is produced when the number is not configured", () => {
  assert.equal(createWhatsAppUrl("", demo), null);
  assert.equal(createWhatsAppUrl(undefined, demo), null);
  assert.equal(createWhatsAppUrl("not a number", demo), null);
});

test("the WhatsApp URL is correctly encoded and round-trips", () => {
  const url = createWhatsAppUrl("+92 300 1234567", { ...demo, message: "Need 2×40HC & billing? 50% done #1" });
  assert.ok(url);
  const parsed = new URL(url);
  assert.equal(parsed.origin + parsed.pathname, "https://wa.me/923001234567");
  const text = parsed.searchParams.get("text") ?? "";
  assert.equal(text, buildInquiryMessage({ ...demo, message: "Need 2×40HC & billing? 50% done #1" }));
  assert.match(text, /^Hello Manifest ERP team,/);
  assert.match(text, /\*Name:\* Sara Ahmed/);
  assert.match(text, /\*Interested in:\* Customs workflow, Billing & SOA/);
  assert.match(text, /50% done #1/);
  assert.ok(!url.includes(" "), "spaces are encoded");
});

test("messages omit empty optional fields", () => {
  const text = buildInquiryMessage({ type: "general", name: "Ali", subject: "General question", message: "How does period locking work?" });
  assert.doesNotMatch(text, /Company:/);
  assert.doesNotMatch(text, /Email:/);
  assert.match(text, /\*Subject:\* General question/);
});

test("user text is cleaned of control characters and capped", () => {
  assert.equal(cleanText("  Sara\u0000 \u0007Ahmed  ", 80), "Sara Ahmed");
  assert.equal(cleanText("a".repeat(500), 80).length, 80);
  assert.equal(cleanText("line1\n\n\n\nline2", 100, true), "line1\n\nline2");
  assert.equal(cleanText(42 as unknown as string, 10), "");
});

test("interests outside the allowed list are dropped", () => {
  const text = buildInquiryMessage({ ...demo, interests: ["Billing & SOA", "<script>"] });
  assert.match(text, /Interested in:\* Billing & SOA$/m);
  assert.doesNotMatch(text, /script/);
});
