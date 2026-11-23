// Screenshots of interactive states: mobile menu, lightbox, form errors, WhatsApp notice.
import { chromium } from "playwright-core";
const BASE = process.env.BASE_URL ?? "http://localhost:3220";
const OUT = process.argv[2] ?? "screenshots";
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const ctx = async (w, h = 900, theme = "light") => {
  const c = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce" });
  await c.addInitScript((t) => {
    localStorage.setItem("manifest-theme", t);
    sessionStorage.setItem("manifest-splash", "1");
  }, theme);
  return c.newPage();
};
let p = await ctx(390, 844, "dark");
await p.goto(BASE + "/", { waitUntil: "networkidle" });
await p.click('button[aria-controls="mobile-menu"]');
await p.waitForTimeout(500);
await p.screenshot({ path: `${OUT}/state-mobile-menu.png` });
await p.close();

p = await ctx(1440, 900);
await p.goto(BASE + "/#product-tour", { waitUntil: "networkidle" });
await p.waitForTimeout(800);
await p.click('#product-tour [role="tab"]:has-text("Invoice editor")');
await p.waitForTimeout(800);
await p.click('#product-tour button[aria-label^="Expand"]');
await p.waitForTimeout(1500);
await p.screenshot({ path: `${OUT}/state-lightbox.png` });
await p.close();

p = await ctx(390, 844);
await p.goto(BASE + "/contact?inquiry=general#inquiry", { waitUntil: "networkidle" });
await p.waitForTimeout(600);
await p.click('form button[type="submit"]');
await p.waitForTimeout(400);
await p.locator("form").screenshot({ path: `${OUT}/state-form-errors.png` });
await p.fill('form input[name="name"]', "Sara Ahmed");
await p.selectOption('form select[name="subject"]', "Onboarding & setup");
await p.fill('form textarea[name="message"]', "How long does onboarding usually take for a team of 12?");
await p.click('form button[type="submit"]');
await p.waitForTimeout(500);
await p.locator("form").screenshot({ path: `${OUT}/state-form-notice.png` });
await browser.close();
console.log("done");
