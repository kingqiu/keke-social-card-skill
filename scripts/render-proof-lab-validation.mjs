#!/usr/bin/env node

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const target = process.argv[2] || "examples/proof-lab-validation";
const root = path.resolve(process.cwd(), target);
const htmlPath = path.join(root, "index.html");
const outputDir = path.join(root, "output", "images");

if (!fs.existsSync(htmlPath)) {
  console.error(`not found: ${htmlPath}`);
  process.exit(2);
}

fs.mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch({
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({
  viewport: { width: 1400, height: 1700 },
  deviceScaleFactor: 1,
});

await page.goto("file://" + htmlPath, { waitUntil: "networkidle" });
await page.waitForTimeout(800);

const checks = await page.$$eval("section.poster", sections => sections.map((el, index) => {
  const expected = "「两克伴」出品";
  const cssBrand = [...el.querySelectorAll(".brand-signature")].some(node => {
    const raw = getComputedStyle(node, "::before").content || "";
    return raw.replace(/^["']|["']$/g, "") === expected;
  });
  const area = el.clientWidth * el.clientHeight;
  const hero = el.querySelector(".pl-evidence-hero");
  const heroArea = hero ? hero.getBoundingClientRect().width * hero.getBoundingClientRect().height : 0;
  return {
    id: el.id || `poster-${index + 1}`,
    name: el.dataset.name || el.id || `poster-${index + 1}`,
    overflow: el.scrollHeight - el.clientHeight,
    hasBrand: cssBrand || (el.innerText || "").includes(expected),
    hasHero: Boolean(hero),
    heroRatio: heroArea / area,
    callouts: el.querySelectorAll(".pl-callout").length,
    hasInspector: Boolean(el.querySelector(".pl-proof-inspector")),
    inspectorItems: el.querySelectorAll(".pl-inspector-rail span").length,
    steps: el.querySelectorAll(".pl-step").length,
    beforeAfter: Boolean(el.querySelector(".pl-before-after")),
  };
}));

const failures = [];
if (checks.length !== 3) failures.push(`expected 3 posters, found ${checks.length}`);
if (!checks.some(check => check.hasHero && check.heroRatio >= 0.55)) {
  failures.push("no evidence hero poster has proof area >= 55%");
}
if (!checks.some(check => check.hasInspector && check.inspectorItems >= 3)) {
  failures.push("missing proof inspector with at least 3 evidence notes");
}
if (!checks.some(check => check.steps === 3)) {
  failures.push("missing 3-step flow poster");
}
if (!checks.some(check => check.beforeAfter)) {
  failures.push("missing before/after poster");
}

for (const check of checks) {
  if (check.overflow > 4) failures.push(`${check.id} overflows by ${check.overflow}px`);
  if (!check.hasBrand) failures.push(`${check.id} missing brand signature`);
  if (check.callouts > 2) failures.push(`${check.id} has ${check.callouts} callouts; max is 2`);
}

const sections = await page.$$("section.poster");
for (let i = 0; i < sections.length; i += 1) {
  const safe = checks[i].name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5_-]+/g, "-").replace(/^-|-$/g, "");
  const file = path.join(outputDir, `${String(i + 1).padStart(2, "0")}-${safe}.png`);
  await sections[i].screenshot({ path: file });
  console.log(file);
}

fs.writeFileSync(path.join(root, "output", "proof-lab-summary.json"), JSON.stringify({
  status: failures.length ? "fail" : "pass",
  checks,
  failures,
}, null, 2) + "\n");

await browser.close();

if (failures.length) {
  console.error("Proof Lab validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Proof Lab validation passed.");
