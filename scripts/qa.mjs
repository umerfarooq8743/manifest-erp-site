// End-to-end QA against a running server.
//   npm run build && npx next start -p 3220     (in another terminal)
//   BASE_URL=http://localhost:3220 node scripts/qa.mjs
//   EXPECT_WHATSAPP=923000000000 …  → when the build was made with that number
// Checks: HTTP status, console errors, horizontal overflow (both themes, 5 widths),
// one <h1> per page, SEO tags, JSON-LD, external-link safety, image alt text,
// mobile menu, theme switching + persistence, FAQ, workflow tabs, product-tour
// lightbox, form validation and WhatsApp behaviour.
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3220";
const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const EXPECT_WA = process.env.EXPECT_WHATSAPP;
const ROUTES = ["/", "/features", "/modules", "/solutions", "/workflow", "/security", "/about", "/contact", "/privacy", "/terms"];
const WIDTHS = (process.env.QA_WIDTHS ?? "390,768,1024,1440,1920").split(",").map(Number);

const results = [];
const check = (ok, name, detail = "") => results.push({ ok: Boolean(ok), name, detail });
setTimeout(() => {
  console.log("WATCHDOG: QA took too long");
  process.exit(2);
}, 1_500_000).unref();

const browser = await chromium.launch({ executablePath: CHROME });

async function open(width, { theme, reducedMotion = "reduce", splash = false } = {}) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion });
  // The intro splash is tested on its own (section 5); skip it elsewhere.
  if (!splash) await context.addInitScript(() => sessionStorage.setItem("manifest-splash", "1"));
  if (theme)
    await context.addInitScript((t) => {
      if (!sessionStorage.getItem("qa-seeded")) {
        localStorage.setItem("manifest-theme", t);
        sessionStorage.setItem("qa-seeded", "1");
      }
    }, theme);
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  return { context, page, errors };
}

// 1. Status codes, SEO and structure per route ─────────────────────────────
{
  const { context, page, errors } = await open(1440);
  for (const route of ROUTES) {
    const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
    check(res?.status() === 200, `${route} returns 200`, String(res?.status()));
    const info = await page.evaluate(() => ({
      h1: document.querySelectorAll("h1").length,
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? "",
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "",
      jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
        try {
          JSON.parse(s.textContent ?? "");
          return true;
        } catch {
          return false;
        }
      }),
      unsafeBlank: [...document.querySelectorAll('a[target="_blank"]')].filter((a) => !(a.rel || "").includes("noopener")).length,
      imgNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length,
      dupIds: (() => {
        const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
        return ids.filter((id, i) => ids.indexOf(id) !== i);
      })(),
      unlabeledButtons: [...document.querySelectorAll("button")].filter((b) => !(b.textContent ?? "").trim() && !b.getAttribute("aria-label")).length,
      emptyLinks: [...document.querySelectorAll("a[href]")].filter((a) => !(a.textContent ?? "").trim() && !a.getAttribute("aria-label")).length,
      inputsNoLabel: [...document.querySelectorAll("input:not([type=hidden]):not([type=checkbox]),textarea,select")].filter(
        (el) => !el.id || !document.querySelector(`label[for="${el.id}"]`),
      ).length,
    }));
    check(info.h1 === 1, `${route} has exactly one h1`, String(info.h1));
    check(info.title.length > 10 && info.title.length <= 70, `${route} title length`, `${info.title.length}: ${info.title}`);
    check(info.desc.length >= 70 && info.desc.length <= 300, `${route} meta description`, String(info.desc.length));
    check(info.canonical.startsWith("http"), `${route} canonical`, info.canonical);
    check(info.ogTitle && info.ogImage, `${route} Open Graph tags`);
    check(info.jsonld.length > 0 && info.jsonld.every(Boolean), `${route} JSON-LD valid`, String(info.jsonld.length));
    check(info.unsafeBlank === 0, `${route} target=_blank links use noopener`);
    check(info.imgNoAlt === 0, `${route} images have alt`);
    check(info.dupIds.length === 0, `${route} no duplicate ids`, info.dupIds.slice(0, 5).join(","));
    check(info.unlabeledButtons === 0, `${route} buttons have names`, String(info.unlabeledButtons));
    check(info.emptyLinks === 0, `${route} links have names`, String(info.emptyLinks));
    check(info.inputsNoLabel === 0, `${route} form fields have labels`, String(info.inputsNoLabel));
  }
  for (const path of ["/robots.txt", "/sitemap.xml", "/manifest.webmanifest", "/opengraph-image", "/icon.svg", "/apple-icon.png", "/does-not-exist"]) {
    const res = await page.request.get(BASE + path);
    check(path === "/does-not-exist" ? res.status() === 404 : res.status() === 200, `${path} → ${res.status()}`);
  }
  const sitemap = await (await page.request.get(BASE + "/sitemap.xml")).text();
  check(ROUTES.every((r) => sitemap.includes(`${r === "/" ? "" : r}</loc>`)), "sitemap lists every route");
  check(errors.length === 0, "no console errors across routes", errors.slice(0, 3).join(" | "));
  await context.close();
}

// 2. Horizontal overflow, both themes, all widths ───────────────────────────
for (const theme of ["light", "dark"]) {
  for (const width of WIDTHS) {
    const { context, page, errors } = await open(width, { theme });
    for (const route of ROUTES) {
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      const res = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        theme: document.documentElement.getAttribute("data-theme"),
      }));
      check(res.overflow <= 0, `${route} @${width} ${theme}: no horizontal overflow`, `${res.overflow}px`);
      check(res.theme === theme, `${route} @${width}: theme ${theme} applied before paint`, res.theme);
    }
    check(errors.length === 0, `no console errors @${width} ${theme}`, errors.slice(0, 2).join(" | "));
    await context.close();
  }
}

// 3. Interactions ───────────────────────────────────────────────────────────
{
  // Mobile menu
  const { context, page } = await open(390);
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.click('button[aria-controls="mobile-menu"]');
  await page.waitForSelector("#mobile-menu");
  check(await page.isVisible("#mobile-menu"), "mobile menu opens");
  check((await page.evaluate(() => document.body.style.overflow)) === "hidden", "mobile menu locks scroll");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  check(!(await page.isVisible("#mobile-menu")), "mobile menu closes on Escape");
  await page.click('button[aria-controls="mobile-menu"]');
  await page.click('#mobile-menu a[href="/workflow"]');
  await page.waitForURL("**/workflow");
  await page.waitForTimeout(400);
  check(!(await page.isVisible("#mobile-menu")), "mobile menu closes after navigation");
  await context.close();
}
{
  // Theme switching & persistence
  const { context, page } = await open(1440, { theme: "light" });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.click("header button[aria-haspopup=menu]");
  await page.click('[role=menuitemradio]:has-text("Dark")');
  check((await page.getAttribute("html", "data-theme")) === "dark", "theme switches to dark");
  check((await page.evaluate(() => localStorage.getItem("manifest-theme"))) === "dark", "theme preference persisted");
  await page.reload({ waitUntil: "networkidle" });
  check((await page.getAttribute("html", "data-theme")) === "dark", "theme survives reload");
  await page.click("header button[aria-haspopup=menu]");
  await page.click('[role=menuitemradio]:has-text("System")');
  check((await page.evaluate(() => localStorage.getItem("manifest-theme"))) === null, "system preference clears storage");
  await context.close();
}
{
  // FAQ, workflow tabs, product tour + lightbox, keyboard
  const { context, page, errors } = await open(1440);
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const faqButtons = page.locator("#faq button[aria-expanded]");
  check((await faqButtons.count()) >= 10, "FAQ has 10+ questions");
  await faqButtons.nth(2).click();
  await page.waitForTimeout(500);
  check((await faqButtons.nth(2).getAttribute("aria-expanded")) === "true", "FAQ item expands");
  check((await faqButtons.nth(0).getAttribute("aria-expanded")) === "false", "FAQ opens one item at a time");

  const wfTabs = page.locator('#workflow [role="tab"]');
  check((await wfTabs.count()) === 12, "workflow has 12 steps");
  await wfTabs.nth(6).click();
  await page.waitForTimeout(500);
  check((await page.locator('#workflow [role="tabpanel"] h3').first().textContent())?.includes("Gate pass"), "workflow step selection updates panel");
  await wfTabs.nth(6).focus();
  await page.keyboard.press("ArrowDown");
  check((await wfTabs.nth(7).getAttribute("aria-selected")) === "true", "workflow tabs support arrow keys");

  const tourTabs = page.locator('#product-tour [role="tab"]');
  check((await tourTabs.count()) === 16, "product tour has 16 screens");
  await tourTabs.nth(4).click();
  check((await tourTabs.nth(1).getAttribute("aria-selected")) === "false", "tour moved off its initial screen");
  await page.waitForTimeout(500);
  check((await page.locator("#product-tour h3").first().textContent())?.includes("Customs board"), "product tour switches screen");
  check((await page.locator("#product-tour [role=img] h1, #product-tour [role=img] h2, #product-tour [role=img] h3").count()) === 0, "mockups contain no document headings");
  await page.click('#product-tour button[aria-label^="Expand"]');
  await page.waitForSelector('[role="dialog"]');
  check(await page.isVisible('[role="dialog"]'), "lightbox opens");
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(400);
  check((await page.locator('[role="dialog"] p').first().textContent())?.includes("Documentation"), "lightbox arrow keys browse screens");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  check((await page.locator('[role="dialog"]').count()) === 0, "lightbox closes on Escape");

  const rolesTabs = page.locator('#roles [role="tab"]');
  check((await rolesTabs.count()) === 5, "five role journeys");
  await rolesTabs.nth(2).click();
  await page.waitForTimeout(600);
  check((await page.locator("#roles [role=tabpanel]").textContent())?.includes("Accounts Staff"), "role tab switches journey");

  await page.keyboard.press("Tab");
  const skip = await page.evaluate(() => document.activeElement?.textContent);
  check(errors.length === 0, "no console errors during interactions", errors.slice(0, 2).join(" | "));
  void skip;
  await context.close();
}
{
  // Scroll reveal (motion allowed) and sprite icons
  const { context, page, errors } = await open(1440, { reducedMotion: "no-preference" });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const hidden = await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 160));
    }
    await new Promise((r) => setTimeout(r, 1200));
    return [...document.querySelectorAll("[data-reveal]")].filter((el) => getComputedStyle(el).opacity !== "1").length;
  });
  check(hidden === 0, "every reveal element ends fully visible after scrolling", `${hidden} still hidden`);
  const icons = await page.evaluate(() => {
    const uses = [...document.querySelectorAll("svg.icon use")];
    const href = uses[0]?.getAttribute("href") ?? "";
    const box = uses.find((u) => u.getBoundingClientRect().width > 0)?.getBBox();
    return { count: uses.length, href, w: box?.width ?? 0 };
  });
  check(icons.count > 50, "icons use the sprite", String(icons.count));
  check(icons.w > 0, "sprite icons render with a size", String(icons.w));
  const sprite = await page.request.get(BASE + icons.href.split("#")[0]);
  check(sprite.status() === 200 && (sprite.headers()["content-type"] ?? "").includes("svg"), "sprite file is served as SVG");
  check(errors.length === 0, "no console errors while scrolling", errors.slice(0, 2).join(" | "));
  await context.close();
}
{
  // Skip link
  const { context, page } = await open(1440);
  await page.goto(BASE + "/features", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  check((await page.evaluate(() => document.activeElement?.textContent?.trim())) === "Skip to content", "first Tab focuses the skip link");
  await context.close();
}

// 4. Forms & WhatsApp ───────────────────────────────────────────────────────
{
  const { context, page, errors } = await open(1440);
  await page.addInitScript(() => {
    window.__opened = [];
    window.open = (url) => {
      window.__opened.push(String(url));
      return { opener: null };
    };
  });
  await page.goto(BASE + "/contact?inquiry=general#inquiry", { waitUntil: "networkidle" });
  check((await page.getAttribute('[role=tab][aria-selected="true"]', "id"))?.endsWith("general"), "?inquiry=general preselects the form");

  for (const type of ["Request a demo", "General inquiry", "Product question", "Partnership"]) {
    await page.click(`[role=tab]:has-text("${type}")`);
    await page.click('form button[type="submit"]');
    await page.waitForTimeout(250);
    const state = await page.evaluate(() => ({
      alert: document.querySelector("form [role=alert]")?.textContent ?? "",
      invalid: document.querySelectorAll('form [aria-invalid="true"]').length,
      focused: document.activeElement?.getAttribute("name"),
      opened: window.__opened.length,
    }));
    check(state.alert.includes("Please fix") && state.invalid > 0, `${type}: empty submit shows errors`, `${state.invalid} invalid`);
    check(state.focused === "name", `${type}: focus moves to first invalid field`, String(state.focused));
    check(state.opened === 0, `${type}: empty submit does not open WhatsApp`);
  }

  await page.click('[role=tab]:has-text("Request a demo")');
  await page.fill('form input[name="name"]', "QA Tester");
  await page.fill('form input[name="company"]', "QA Clearing");
  await page.fill('form input[name="email"]', "bad-email");
  await page.click('form button[type="submit"]');
  check((await page.locator('form [aria-invalid="true"]').count()) === 1, "invalid email is reported");
  await page.fill('form input[name="email"]', "qa@example.com");
  await page.click('form label:has-text("Customs workflow")');
  await page.click('form button[type="submit"]');
  await page.waitForTimeout(400);
  const after = await page.evaluate(() => ({ opened: window.__opened, status: document.querySelector("form [role=status]")?.textContent ?? "" }));
  if (EXPECT_WA) {
    check(after.opened.length === 1 && after.opened[0].startsWith(`https://wa.me/${EXPECT_WA}?text=`), "valid submit opens wa.me with the configured number", after.opened[0]?.slice(0, 60));
    const text = decodeURIComponent((after.opened[0] ?? "").split("?text=")[1] ?? "");
    check(text.includes("QA Tester") && text.includes("QA Clearing") && text.includes("Customs workflow"), "WhatsApp message contains the inquiry");
    check(after.status.includes("Redirecting you to WhatsApp"), "redirect notice shown");
  } else {
    check(after.opened.length === 0, "no WhatsApp URL when the number is not configured");
    check(after.status.includes("aren’t connected yet"), "configuration notice shown when number missing", after.status.slice(0, 80));
  }
  check(errors.length === 0, "no console errors on contact page", errors.slice(0, 2).join(" | "));
  await context.close();
}

// 5. Intro splash ─────────────────────────────────────────────────────────
{
  const { context, page, errors } = await open(1440, { splash: true, reducedMotion: "no-preference" });
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  check(await page.evaluate(() => document.documentElement.classList.contains("splash")), "splash shows on the first home visit");
  check(await page.isVisible("[data-splash]"), "splash overlay is visible");
  check((await page.getAttribute("[data-splash]", "role")) === "status", "splash is announced as a status");
  await page.waitForTimeout(4200);
  check(!(await page.evaluate(() => document.documentElement.classList.contains("splash"))), "splash removes itself after the intro");
  check(!(await page.isVisible("[data-splash]")), "splash overlay hidden afterwards");
  await page.reload({ waitUntil: "domcontentloaded" });
  check(!(await page.evaluate(() => document.documentElement.classList.contains("splash"))), "splash shows only once per session");
  check(errors.length === 0, "no console errors with the splash", errors.slice(0, 2).join(" | "));
  await context.close();
}
{
  const { context, page } = await open(1440, { splash: true, reducedMotion: "no-preference" });
  await page.goto(BASE + "/features", { waitUntil: "domcontentloaded" });
  check(await page.evaluate(() => document.documentElement.classList.contains("splash")), "splash shows on the first page view, whichever page it is");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(900);
  check(!(await page.evaluate(() => document.documentElement.classList.contains("splash"))), "Escape skips the splash");
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  check(!(await page.evaluate(() => document.documentElement.classList.contains("splash"))), "no repeat splash later in the session");
  await page.goto(BASE + "/?splash", { waitUntil: "domcontentloaded" });
  check(await page.evaluate(() => document.documentElement.classList.contains("splash")), "?splash replays the splash on demand");
  await context.close();
}
{
  const { context, page } = await open(1440, { splash: true, reducedMotion: "reduce" });
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  check(!(await page.evaluate(() => document.documentElement.classList.contains("splash"))), "no splash with reduced motion");
  await context.close();
}

await browser.close();
const failed = results.filter((r) => !r.ok);
for (const r of results) if (!r.ok) console.log(`✗ ${r.name}  ${r.detail}`);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
