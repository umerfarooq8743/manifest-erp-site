// Records a CPU-throttled (4x) load trace and summarises style/layout/script events.
//   node scripts/trace.mjs [route]
import { chromium } from "playwright-core";
const BASE = process.env.BASE_URL ?? "http://localhost:3220";
const route = process.argv[2] ?? "/";
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const context = await browser.newContext({ viewport: { width: 412, height: 823 }, deviceScaleFactor: 2.6, isMobile: true, hasTouch: true });
const page = await context.newPage();
if (process.env.INJECT_CSS) {
  await context.addInitScript((css) => {
    const add = () => {
      const st = document.createElement("style");
      st.textContent = css;
      document.documentElement.appendChild(st);
    };
    if (document.documentElement) add();
    else document.addEventListener("readystatechange", add, { once: true });
  }, process.env.INJECT_CSS);
}
const cdp = await context.newCDPSession(page);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
await browser.startTracing(page, { categories: ["devtools.timeline", "blink.user_timing", "loading"] });
await page.goto(BASE + route, { waitUntil: "load" });
await page.waitForTimeout(5000);
const buf = await browser.stopTracing();
const { traceEvents } = JSON.parse(buf.toString());
const nav = traceEvents.find((e) => e.name === "navigationStart" || e.name === "NavigationStart")?.ts ?? traceEvents[0].ts;
const pick = (name) => traceEvents.filter((e) => e.name === name && e.dur).map((e) => ({ t: Math.round((e.ts - nav) / 1000), d: Math.round(e.dur / 1000), a: e.args?.elementCount ?? e.args?.beginData?.dirtyObjects ?? e.args?.data?.url ?? "" }));
for (const name of ["UpdateLayoutTree", "Layout", "EvaluateScript", "FunctionCall", "ParseHTML", "Paint"]) {
  const ev = pick(name);
  const total = ev.reduce((s, e) => s + e.d, 0);
  console.log(`${name}: ${ev.length} events, ${total} ms`);
  for (const e of ev.sort((a, b) => b.d - a.d).slice(0, 6)) console.log(`   @${e.t}ms ${e.d}ms ${String(e.a).slice(0, 70)}`);
}
const fcp = traceEvents.find((e) => e.name === "firstContentfulPaint");
const lcp = traceEvents.filter((e) => e.name === "largestContentfulPaint::Candidate").pop();
console.log("FCP", fcp ? Math.round((fcp.ts - nav) / 1000) : "?", "LCP", lcp ? Math.round((lcp.ts - nav) / 1000) : "?");
await browser.close();
