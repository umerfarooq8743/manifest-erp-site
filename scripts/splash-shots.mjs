// Captures the intro splash at fixed points of its animation timeline by pausing
// and seeking every CSS animation (deterministic, independent of load speed).
//   node scripts/splash-shots.mjs <outDir> [width] [light|dark]
import { chromium } from "playwright-core";
const BASE = process.env.BASE_URL ?? "http://localhost:3220";
const [out = "screenshots", width = "1440", theme = "light"] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const context = await browser.newContext({ viewport: { width: Number(width), height: Number(width) < 600 ? 844 : 900 }, reducedMotion: "no-preference" });
await context.addInitScript((t) => {
  localStorage.setItem("manifest-theme", t);
  // Hold the splash open while frames are captured (its exit timer is 2600 ms).
  const native = window.setTimeout.bind(window);
  window.setTimeout = (fn, delay, ...args) => native(fn, delay === 2600 ? 1e9 : delay, ...args);
}, theme);
const page = await context.newPage();
await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
await page.waitForSelector("html.splash [data-splash]");
for (const t of [150, 500, 900, 1250, 1650, 2300]) {
  await page.evaluate((ms) => {
    for (const a of document.getAnimations()) {
      a.pause();
      a.currentTime = ms;
    }
  }, t);
  await page.waitForTimeout(120);
  await page.screenshot({ path: `${out}/splash-${width}-${theme}-${t}.png` });
}
await browser.close();
console.log("done");
