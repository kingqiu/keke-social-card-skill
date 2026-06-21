#!/usr/bin/env node

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const target = process.argv[2];

if (!target) {
  console.error("Usage: node scripts/check-aesthetic-qa.mjs <task-dir|index.html>");
  process.exit(2);
}

const abs = path.resolve(process.cwd(), target);
const stat = fs.statSync(abs);
const taskDir = stat.isDirectory() ? abs : path.dirname(abs);
const htmlPath = stat.isDirectory() ? path.join(abs, "index.html") : abs;
const qaPath = path.join(taskDir, "QA.md");

if (!fs.existsSync(htmlPath)) {
  console.error(`not found: ${htmlPath}`);
  process.exit(2);
}

const qa = fs.existsSync(qaPath) ? fs.readFileSync(qaPath, "utf8") : "";
const issues = [];
const warnings = [];
let score = 100;

function penalize(points, message, fix, hard = false) {
  score -= points;
  const item = { points, message, fix };
  if (hard) issues.push(item);
  else warnings.push(item);
}

if (!qa) {
  penalize(10, "QA.md is missing", "Create QA.md and include an Aesthetic QA section.", true);
} else {
  if (!/Aesthetic QA|审美|视觉|美观/i.test(qa)) {
    penalize(8, "QA.md does not record aesthetic review", "Add an Aesthetic QA section with weakest-page notes and visual tradeoffs.");
  }
  if (!/weakest|最弱|风险|改进|review/i.test(qa)) {
    penalize(5, "QA.md does not name the weakest visual risk", "Record the weakest page or remaining visual risk instead of only saying passed.");
  }
}

const browser = await chromium.launch({
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const ctx = await browser.newContext({
  viewport: { width: 1400, height: 1700 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto("file://" + htmlPath, { waitUntil: "networkidle" });
await page.waitForTimeout(800);

const audit = await page.evaluate(() => {
  const sections = [...document.querySelectorAll("section.poster")];
  const hasBrand = (el) => {
    const expected = "「两克伴」出品";
    const text = el.innerText || el.textContent || "";
    const cssBrand = [...el.querySelectorAll(".brand-signature")].some(node => {
      const raw = getComputedStyle(node, "::before").content || "";
      return raw.replace(/^["']|["']$/g, "") === expected;
    });
    return text.includes(expected) || cssBrand;
  };
  const result = {
    sectionCount: sections.length,
    coverTitleChars: 0,
    coverHasEvidenceArea: false,
    coverHasBrand: false,
    tinyImageCount: 0,
    unalignedPairCount: 0,
    serialCount: 0,
    minBodyFont: Infinity,
    pages: [],
  };

  for (const [index, section] of sections.entries()) {
    const sr = section.getBoundingClientRect();
    const pageResult = {
      id: section.id || section.dataset.id || `page-${index + 1}`,
      tinyImages: 0,
      unalignedPairs: 0,
      hasBrand: hasBrand(section),
    };
    if (index === 0) {
      const titleNode = section.querySelector("h1, .h-xl, .h-hero, .h-display, .title, .rn-title, .lj-title");
      const title = titleNode?.textContent?.trim() || "";
      result.coverTitleChars = [...title.replace(/\s/g, "")].length;
      result.coverHasBrand = pageResult.hasBrand;
      result.coverHasEvidenceArea = Boolean(section.querySelector("img, figure, .proof, .proof-card, .result, .rn-phone, .visual, .matrix, .code, .terminal, .lj-hero, .photo"));
    }
    for (const img of section.querySelectorAll("img")) {
      const r = img.getBoundingClientRect();
      const areaRatio = (r.width * r.height) / (sr.width * sr.height);
      if (areaRatio > 0 && areaRatio < 0.025 && !img.closest(".avatar, .icon, .badge, .chip")) {
        pageResult.tinyImages += 1;
        result.tinyImageCount += 1;
      }
    }
    const media = [...section.querySelectorAll("img, figure, .proof-card, .media-card, .lj-panel, .compare-card")].filter(node => {
      const r = node.getBoundingClientRect();
      return r.width > sr.width * 0.18 && r.height > sr.height * 0.12;
    });
    for (let i = 0; i < media.length - 1; i++) {
      const a = media[i].getBoundingClientRect();
      const b = media[i + 1].getBoundingClientRect();
      const sameRow = Math.abs(a.top - b.top) < 24 || Math.abs(a.bottom - b.bottom) < 24;
      const drift = Math.abs(a.top - b.top) > 10 && Math.abs(a.bottom - b.bottom) > 10;
      if (sameRow && drift) {
        pageResult.unalignedPairs += 1;
        result.unalignedPairCount += 1;
      }
    }
    for (const node of section.querySelectorAll(".sl-number, .num-mega, .foot span:last-child, .rn-foot span:last-child, .lj-summary strong")) {
      const text = (node.textContent || "").trim();
      if (/^\d{1,2}$/.test(text)) result.serialCount += 1;
    }
    for (const node of section.querySelectorAll("p, .body, .lead, .caption, .copy")) {
      if (node.children.length > 0) continue;
      const text = node.textContent.trim();
      if (!text) continue;
      const size = parseFloat(getComputedStyle(node).fontSize) || 0;
      if (size > 0) result.minBodyFont = Math.min(result.minBodyFont, size);
    }
    result.pages.push(pageResult);
  }
  if (!Number.isFinite(result.minBodyFont)) result.minBodyFont = 0;
  return result;
});

await browser.close();

if (audit.sectionCount === 0) {
  penalize(40, "No poster sections found", "Build cards as <section class=\"poster ...\">.", true);
}
if (audit.coverTitleChars < 8) {
  penalize(10, "Cover title is too weak or not detectable", "Use a concrete cover title with object + consequence, not a tiny label.", true);
}
if (!audit.coverHasEvidenceArea) {
  penalize(8, "Cover lacks a visible evidence/result area", "Add proof/result/image/code/product/scene material to the cover composition.");
}
if (!audit.coverHasBrand) {
  penalize(8, "Cover lacks exact brand signature", "Show the exact visible brand signature 「两克伴」出品.");
}
if (audit.tinyImageCount > 0) {
  penalize(Math.min(12, audit.tinyImageCount * 4), `${audit.tinyImageCount} image(s) are too small to work as proof`, "Enlarge proof/result images or remove decorative thumbnails.");
}
if (audit.unalignedPairCount > 0) {
  penalize(Math.min(10, audit.unalignedPairCount * 5), `${audit.unalignedPairCount} media pair(s) look vertically misaligned`, "Align paired proof cards/images to a shared top or baseline.");
}
if (audit.serialCount > 0) {
  penalize(Math.min(12, audit.serialCount * 3), `${audit.serialCount} plain page serial(s) detected`, "Remove bottom/right page-number styling; use semantic labels instead.");
}
if (audit.minBodyFont > 0 && audit.minBodyFont < 20) {
  penalize(8, `Smallest body text is ${Math.round(audit.minBodyFont)}px`, "Cut text or change recipe instead of shrinking readable copy.");
}

const rating = score >= 90 ? "Gold-ready" : score >= 80 ? "Pass" : score >= 70 ? "Needs polish" : "Fail";

console.log("==== check-aesthetic-qa ====");
console.log(`target: ${target}`);
console.log(`score: ${Math.max(0, score)}/100 · ${rating}`);
console.log(`sections: ${audit.sectionCount}`);
console.log(`cover title chars: ${audit.coverTitleChars}`);
console.log(`tiny images: ${audit.tinyImageCount} · unaligned media pairs: ${audit.unalignedPairCount} · serials: ${audit.serialCount}`);

for (const issue of [...issues, ...warnings]) {
  console.log(`${issues.includes(issue) ? "FAIL" : "WARN"} · -${issue.points} · ${issue.message}`);
  console.log(`       fix: ${issue.fix}`);
}

if (issues.length || score < 70) process.exit(1);
