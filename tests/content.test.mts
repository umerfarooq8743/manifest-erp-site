import { test } from "node:test";
import assert from "node:assert/strict";
import { features } from "../src/data/features.ts";
import { modules } from "../src/data/modules.ts";
import { customsStages, documentedSteps, workflowSteps } from "../src/data/workflows.ts";
import { showcaseScreens } from "../src/data/showcase.ts";
import { testimonials } from "../src/data/testimonials.ts";
import { faqs } from "../src/data/faqs.ts";
import { personas } from "../src/data/roles.ts";
import { reportCategories } from "../src/data/reports.ts";
import { footerNav, mainNav, sitemapRoutes } from "../src/data/navigation.ts";

test("the workflow keeps the documented 17 steps and 14 customs stages", () => {
  assert.equal(documentedSteps.length, 17);
  assert.deepEqual(
    documentedSteps.map((s) => s.n),
    Array.from({ length: 17 }, (_, i) => i + 1),
  );
  assert.equal(customsStages.length, 14);
  assert.equal(workflowSteps.length, 12);
});

test("the 12 presentation steps cover every documented step", () => {
  const covered = new Set(workflowSteps.flatMap((s) => s.docSteps));
  for (let n = 1; n <= 17; n++) assert.ok(covered.has(n), `documented step ${n} is covered`);
  for (const n of covered) assert.ok(n >= 1 && n <= 17);
});

test("every feature links to an existing module", () => {
  const ids = new Set(modules.map((m) => m.id));
  for (const f of features) assert.ok(ids.has(f.moduleId), `${f.id} → ${f.moduleId}`);
  assert.equal(new Set(features.map((f) => f.id)).size, features.length, "feature ids are unique");
});

test("there are 16 modules with unique ids", () => {
  assert.equal(modules.length, 16);
  assert.equal(new Set(modules.map((m) => m.id)).size, 16);
});

test("the product tour has 16 distinct screens", () => {
  assert.equal(showcaseScreens.length, 16);
  assert.equal(new Set(showcaseScreens.map((s) => s.key)).size, 16);
  const tourKeys = new Set(showcaseScreens.map((s) => s.key));
  for (const m of modules) if (m.screen) assert.ok(tourKeys.has(m.screen), `${m.id} screen is in the tour`);
});

test("no testimonial is published without written approval", () => {
  for (const t of testimonials) {
    assert.equal(t.approved, true);
    assert.ok(t.quote && t.name && t.company);
  }
});

test("FAQs, personas and reports are populated", () => {
  assert.ok(faqs.length >= 10);
  assert.equal(personas.length, 5);
  assert.ok(reportCategories.every((c) => c.reports.length > 0));
});

test("content avoids unsupported claims", () => {
  const corpus = JSON.stringify({ features, modules, faqs, personas, workflowSteps }).toLowerCase();
  for (const phrase of ["100% secure", "unhackable", "iso 27001", "soc 2", "guaranteed", "trusted by"]) {
    assert.ok(!corpus.includes(phrase), `must not claim “${phrase}”`);
  }
});

test("navigation links are internal and every sitemap route is reachable", () => {
  const hrefs = [...mainNav, ...footerNav.flatMap((g) => g.links)].map((l) => l.href);
  for (const href of hrefs) assert.ok(href.startsWith("/"), href);
  const pages = new Set(hrefs.map((h) => h.split(/[?#]/)[0]));
  for (const route of sitemapRoutes) assert.ok(route.path === "/" || pages.has(route.path), `${route.path} is linked`);
});
