#!/usr/bin/env node

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const target = process.argv[2] || "examples/swiss-okf-brief-gold-candidate";
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
  const text = el.innerText || "";
  const cssBrand = [...el.querySelectorAll(".brand-signature")].some(node => {
    const raw = getComputedStyle(node, "::before").content || "";
    return raw.replace(/^["']|["']$/g, "") === expected;
  });
  const before = getComputedStyle(el, "::before");
  const beforeWidth = Number.parseFloat(before.width) || 0;
  const beforeBg = before.backgroundColor || "";
  const footer = el.querySelector(".okf-footer");
  const topbar = el.querySelector(".okf-topbar");
  const hasBottomSerial = [...el.querySelectorAll(".sl-number, .num-mega")].some(node => /^\d{1,2}$/.test((node.textContent || "").trim()));

  return {
    id: el.id || `poster-${index + 1}`,
    name: el.dataset.name || el.id || `poster-${index + 1}`,
    overflow: el.scrollHeight - el.clientHeight,
    isOkf: el.classList.contains("swiss-okf"),
    hasBrand: cssBrand || text.includes(expected),
    hasLeftRail: beforeWidth >= 60 && !/rgba?\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0?\s*\)/.test(beforeBg),
    hasTopbar: Boolean(topbar),
    hasFooter: Boolean(footer),
    hasTitle: Boolean(el.querySelector(".okf-title")),
    hasGhost: Boolean(el.querySelector(".okf-ghost")),
    hasLead: Boolean(el.querySelector(".okf-lead")),
    codeCards: el.querySelectorAll(".okf-code-card").length,
    proofRows: el.querySelectorAll(".okf-proof-row").length,
    darkCards: el.querySelectorAll(".okf-dark-card, .okf-proof-row.is-dark").length,
    accentCards: el.querySelectorAll(".okf-accent-card, .okf-proof-row.is-accent").length,
    hasBottomSerial,
  };
}));

const failures = [];
if (checks.length < 3) failures.push(`expected at least 3 OKF Brief posters, found ${checks.length}`);

const isGoldCandidate = /swiss-okf-brief-gold-candidate$/.test(root);
if (isGoldCandidate && checks.length !== 8) failures.push(`gold candidate must have 8 posters, found ${checks.length}`);

if (!checks.some(check => check.codeCards >= 2)) {
  failures.push("missing directory/frontmatter code evidence card");
}
if (!checks.some(check => check.proofRows >= 3)) {
  failures.push("missing proof-row page with at least 3 rows");
}
if (!checks.some(check => check.darkCards >= 1)) {
  failures.push("missing black proof/emphasis block");
}
if (!checks.some(check => check.accentCards >= 1)) {
  failures.push("missing yellow accent proof block");
}

for (const check of checks) {
  if (check.overflow > 4) failures.push(`${check.id} overflows by ${check.overflow}px`);
  if (!check.isOkf) failures.push(`${check.id} missing .swiss-okf class`);
  if (!check.hasBrand) failures.push(`${check.id} missing exact brand signature`);
  if (!check.hasLeftRail) failures.push(`${check.id} missing left yellow rail`);
  if (!check.hasTopbar) failures.push(`${check.id} missing OKF topbar`);
  if (!check.hasFooter) failures.push(`${check.id} missing OKF footer/source metadata`);
  if (!check.hasTitle) failures.push(`${check.id} missing OKF title`);
  if (!check.hasGhost) failures.push(`${check.id} missing ghost keyword`);
  if (!check.hasLead && check.proofRows === 0) failures.push(`${check.id} needs lead rail or proof rows`);
  if (check.hasBottomSerial) failures.push(`${check.id} uses bottom/page serial class; OKF Brief should use top-left labels only`);
}

const sections = await page.$$("section.poster");
for (let i = 0; i < sections.length; i += 1) {
  const safe = checks[i].name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5_-]+/g, "-").replace(/^-|-$/g, "");
  const file = path.join(outputDir, `${String(i + 1).padStart(2, "0")}-${safe}.png`);
  await sections[i].screenshot({ path: file });
  console.log(file);
}

fs.writeFileSync(path.join(root, "output", "swiss-okf-brief-summary.json"), JSON.stringify({
  status: failures.length ? "fail" : "pass",
  checks,
  failures,
}, null, 2) + "\n");

await browser.close();

if (failures.length) {
  console.error("Swiss OKF Brief validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Swiss OKF Brief validation passed.");
