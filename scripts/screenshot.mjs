// Visual QA helper: screenshots of a route at given widths and theme.
//   node scripts/screenshot.mjs <path> <widths,comma> <light|dark> <outDir> [--viewport]
// Tall pages are captured in viewport-sized chunks (Chrome can't capture
// a single image taller than 16,384px). Env: BASE_URL, CHROME_PATH, CHUNK_H, HYDRATE_MS.
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const [route = "/", widthsArg = "1440", theme = "light", outDir = "screenshots", flag] = process.argv.slice(2);
const BASE = process.env.BASE_URL ?? "http://localhost:3210";
const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const CHUNK_H = Number(process.env.CHUNK_H ?? 2000);
const widths = widthsArg.split(",").map(Number);
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME });
try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, reducedMotion: "reduce" });
    await context.addInitScript((t) => {
      localStorage.setItem("manifest-theme", t);
      sessionStorage.setItem("manifest-splash", "1");
    }, theme);
    const page = await context.newPage();
    const errors = [];
    page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
    page.on("pageerror", (err) => errors.push(String(err)));
    await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 90_000 });
    await page.waitForTimeout(Number(process.env.HYDRATE_MS ?? 2500));
    // Reveal everything that animates on scroll.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForTimeout(900);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const base = `${route === "/" ? "home" : route.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}-${width}-${theme}`;
    if (flag === "--viewport") {
      await page.screenshot({ path: join(outDir, `${base}.png`) });
      console.log(`${base}.png  overflowX=${overflow}px  consoleErrors=${errors.length}`);
    } else {
      await page.setViewportSize({ width, height: CHUNK_H });
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      let i = 0;
      for (let y = 0; y < total; y += CHUNK_H) {
        await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
        await page.waitForTimeout(250);
        await page.screenshot({ path: join(outDir, `${base}-${String(i).padStart(2, "0")}.png`) });
        i += 1;
      }
      console.log(`${base}  chunks=${i}  height=${total}px  overflowX=${overflow}px  consoleErrors=${errors.length}`);
    }
    for (const e of errors.slice(0, 5)) console.log("   ", e.slice(0, 300));
    await context.close();
  }
} finally {
  await browser.close();
}
