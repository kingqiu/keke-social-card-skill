#!/usr/bin/env node

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const target = process.argv[2] || "examples/swiss-palette-validation";
const root = path.resolve(process.cwd(), target);
const indexPath = path.join(root, "index.html");
const outputRoot = path.join(root, "output");
const htmlDir = path.join(outputRoot, "html");
const imageDir = path.join(outputRoot, "images");
const accents = ["ikb", "lemon-yellow", "lemon-green", "safety-orange", "peacock"];

if (!fs.existsSync(indexPath)) {
  console.error(`not found: ${indexPath}`);
  process.exit(2);
}

fs.mkdirSync(htmlDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const baseHtml = fs.readFileSync(indexPath, "utf8");
const browser = await chromium.launch({
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});

function parseRgb(raw) {
  const m = raw.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b] = m[1].split(",").slice(0, 3).map(v => Number.parseFloat(v.trim()));
  return [r, g, b];
}

function channel(v) {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(rgb) {
  return 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
}

function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

const summary = [];
let hasFail = false;

for (const accent of accents) {
  const html = baseHtml.replace(/<html([^>]*)data-accent="[^"]+"/, `<html$1data-accent="${accent}"`);
  const htmlPath = path.join(htmlDir, `${accent}.html`);
  fs.writeFileSync(htmlPath, html);

  const page = await browser.newPage({
    viewport: { width: 1400, height: 1700 },
    deviceScaleFactor: 1,
  });
  await page.goto("file://" + htmlPath, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const palette = await page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    return {
      paper: cs.getPropertyValue("--paper").trim(),
      ink: cs.getPropertyValue("--ink").trim(),
      accent: cs.getPropertyValue("--accent").trim(),
      accentOn: cs.getPropertyValue("--accent-on").trim(),
    };
  });

  const paper = parseRgb(await page.evaluate(() => getComputedStyle(document.body).backgroundColor));
  const sample = await page.locator("section.poster").first().evaluate(el => {
    const cs = getComputedStyle(el);
    return {
      bg: cs.backgroundColor,
      color: cs.color,
    };
  });
  const posterBg = parseRgb(sample.bg);
  const posterInk = parseRgb(sample.color);
  const accentCell = await page.locator(".matrix-cell.is-accent").first().evaluate(el => {
    const cs = getComputedStyle(el);
    const title = getComputedStyle(el.querySelector(".cell-title"));
    return {
      bg: cs.backgroundColor,
      color: title.color,
    };
  });
  const accentBg = parseRgb(accentCell.bg);
  const accentText = parseRgb(accentCell.color);

  const posterContrast = posterBg && posterInk ? contrast(posterBg, posterInk) : 0;
  const accentContrast = accentBg && accentText ? contrast(accentBg, accentText) : 0;

  const checks = await page.$$eval("section.poster", sections => sections.map(el => {
    const expected = "「两克伴」出品";
    const cssBrand = [...el.querySelectorAll(".brand-signature")].some(node => {
      const raw = getComputedStyle(node, "::before").content || "";
      return raw.replace(/^["']|["']$/g, "") === expected;
    });
    return {
      id: el.id,
      name: el.dataset.name || el.id,
      overflow: el.scrollHeight - el.clientHeight,
      hasBrand: cssBrand || (el.innerText || "").includes(expected),
    };
  }));

  const failures = [];
  if (posterContrast < 7) failures.push(`paper/ink contrast ${posterContrast.toFixed(2)} < 7`);
  if (accentContrast < 4.5) failures.push(`accent text contrast ${accentContrast.toFixed(2)} < 4.5`);
  for (const check of checks) {
    if (check.overflow > 4) failures.push(`${check.id} overflows by ${check.overflow}px`);
    if (!check.hasBrand) failures.push(`${check.id} missing brand signature`);
  }

  const sections = await page.$$("section.poster");
  for (let i = 0; i < sections.length; i += 1) {
    const name = checks[i]?.name || `card-${String(i + 1).padStart(2, "0")}`;
    const safe = name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5_-]+/g, "-").replace(/^-|-$/g, "");
    const file = path.join(imageDir, `${accent}-${String(i + 1).padStart(2, "0")}-${safe}.png`);
    await sections[i].screenshot({ path: file });
    console.log(file);
  }

  summary.push({
    accent,
    palette,
    posterContrast: Number(posterContrast.toFixed(2)),
    accentContrast: Number(accentContrast.toFixed(2)),
    sections: checks.length,
    status: failures.length ? "fail" : "pass",
    failures,
  });
  hasFail ||= failures.length > 0;

  await page.close();
}

const contactHtml = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Swiss Palette Contact Sheet</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 32px; background: #1a1a1a; color: #f7f7f7; font-family: Inter, Arial, sans-serif; }
    h1 { margin: 0 0 24px; font-weight: 400; font-size: 32px; }
    .grid { display: grid; grid-template-columns: repeat(3, 216px); gap: 20px 24px; }
    .row { display: contents; }
    .accent { grid-column: 1 / -1; margin-top: 12px; font: 600 18px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .08em; text-transform: uppercase; color: #d4d4d2; }
    figure { margin: 0; background: #fff; }
    img { width: 216px; height: 288px; display: block; object-fit: cover; }
    figcaption { padding: 8px; color: #111; font: 12px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace; background: #fff; }
  </style>
</head>
<body>
  <h1>Swiss Palette Validation</h1>
  <div class="grid">
    ${accents.map(accent => `
      <div class="accent">${accent}</div>
      ${[1, 2, 3].map(n => {
        const file = fs.readdirSync(imageDir).find(name => name.startsWith(`${accent}-${String(n).padStart(2, "0")}-`));
        return `<figure><img src="images/${file}" alt="${accent} card ${n}"><figcaption>${file}</figcaption></figure>`;
      }).join("")}
    `).join("")}
  </div>
</body>
</html>`;

const contactHtmlPath = path.join(outputRoot, "contact-sheet.html");
fs.writeFileSync(contactHtmlPath, contactHtml);

const contactPage = await browser.newPage({
  viewport: { width: 760, height: 2700 },
  deviceScaleFactor: 1,
});
await contactPage.goto("file://" + contactHtmlPath, { waitUntil: "networkidle" });
await contactPage.screenshot({ path: path.join(outputRoot, "contact-sheet.png"), fullPage: true });
await contactPage.close();

fs.writeFileSync(path.join(outputRoot, "palette-summary.json"), JSON.stringify(summary, null, 2) + "\n");
await browser.close();

for (const item of summary) {
  console.log(`${item.status.toUpperCase()} ${item.accent}: paper/ink ${item.posterContrast}, accent ${item.accentContrast}`);
  for (const failure of item.failures) console.log(`  - ${failure}`);
}

if (hasFail) process.exit(1);
