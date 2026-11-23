// Counts DOM nodes per top-level section of a route (initial HTML, before lazy mounts).
import { chromium } from "playwright-core";
const BASE = process.env.BASE_URL ?? "http://localhost:3220";
const route = process.argv[2] ?? "/";
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const page = await browser.newPage({ viewport: { width: 390, height: 900 }, javaScriptEnabled: false });
await page.goto(BASE + route, { waitUntil: "load" });
const rows = await page.evaluate(() => {
  const out = [["header", document.querySelector("header")?.querySelectorAll("*").length ?? 0]];
  for (const s of document.querySelectorAll("main > *")) out.push([s.id || s.getAttribute("aria-labelledby") || s.tagName, s.querySelectorAll("*").length]);
  out.push(["footer", document.querySelector("footer")?.querySelectorAll("*").length ?? 0]);
  out.push(["svg descendants", [...document.querySelectorAll("svg *")].length]);
  out.push(["TOTAL", document.querySelectorAll("*").length]);
  return out;
});
for (const [k, v] of rows) console.log(String(v).padStart(6), k);
await browser.close();
