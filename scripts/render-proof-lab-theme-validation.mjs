#!/usr/bin/env node

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const target = process.argv[2] || "examples/proof-lab-validation";
const root = path.resolve(process.cwd(), target);
const indexPath = path.join(root, "index.html");
const outputRoot = path.join(root, "output", "themes");
const htmlDir = path.join(outputRoot, "html");
const imageDir = path.join(outputRoot, "images");
const fontHref = path.relative(htmlDir, path.resolve(process.cwd(), "assets", "fonts", "keke-fonts.css")).replaceAll(path.sep, "/");
const themes = [
  "SL-01 Electric Blue",
  "SL-02 Graphite Mint",
  "SL-03 Safety Coral",
  "SL-04 Acid Lime",
  "SL-05 Signal Noir",
];

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

function slugTheme(theme) {
  return theme.toLowerCase().replace(/^sl-\d+\s+/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const summary = [];
let hasFail = false;

for (const theme of themes) {
  const html = baseHtml
    .replace(/<meta name="viewport" content="width=device-width,initial-scale=1" \/>\n(?!<link rel="stylesheet" href=")/, `<meta name="viewport" content="width=device-width,initial-scale=1" />\n<link rel="stylesheet" href="${fontHref}">\n`)
    .replace(/<link rel="stylesheet" href="[^"]*keke-fonts\.css">/, `<link rel="stylesheet" href="${fontHref}">`)
    .replace(/<html([^>]*)data-theme="[^"]+"/, `<html$1data-theme="${theme}"`);
  const slug = slugTheme(theme);
  const htmlPath = path.join(htmlDir, `${slug}.html`);
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
      bg: cs.getPropertyValue("--bg").trim(),
      surface: cs.getPropertyValue("--surface").trim(),
      fg: cs.getPropertyValue("--fg").trim(),
      muted: cs.getPropertyValue("--muted").trim(),
      accent: cs.getPropertyValue("--accent").trim(),
      dark: cs.getPropertyValue("--dark").trim(),
      proofOnDark: cs.getPropertyValue("--proof-on-dark").trim(),
    };
  });

  const posterSample = await page.locator("section.poster").first().evaluate(el => {
    const cs = getComputedStyle(el);
    const label = getComputedStyle(el.querySelector(".sl-label"));
    return {
      bg: cs.backgroundColor,
      color: cs.color,
      labelColor: label.color,
    };
  });
  const surfaceSample = await page.locator(".pl-callout, .pl-proof-side, .pl-step").first().evaluate(el => {
    const cs = getComputedStyle(el);
    const titleNode = el.querySelector("h3") || el;
    const bodyNode = el.querySelector("p") || el;
    const title = getComputedStyle(titleNode);
    const body = getComputedStyle(bodyNode);
    return {
      bg: cs.backgroundColor,
      titleColor: title.color,
      bodyColor: body.color,
    };
  });
  const proofSample = await page.locator(".pl-evidence-hero").first().evaluate(el => {
    const cs = getComputedStyle(el);
    return {
      bg: cs.backgroundColor,
      color: cs.color,
    };
  });

  const posterBg = parseRgb(posterSample.bg);
  const posterInk = parseRgb(posterSample.color);
  const labelColor = parseRgb(posterSample.labelColor);
  const surfaceBg = parseRgb(surfaceSample.bg);
  const surfaceTitle = parseRgb(surfaceSample.titleColor);
  const surfaceBody = parseRgb(surfaceSample.bodyColor);
  const proofBg = parseRgb(proofSample.bg);
  const proofColor = parseRgb(proofSample.color);

  const posterContrast = posterBg && posterInk ? contrast(posterBg, posterInk) : 0;
  const labelContrast = posterBg && labelColor ? contrast(posterBg, labelColor) : 0;
  const surfaceTitleContrast = surfaceBg && surfaceTitle ? contrast(surfaceBg, surfaceTitle) : 0;
  const surfaceBodyContrast = surfaceBg && surfaceBody ? contrast(surfaceBg, surfaceBody) : 0;
  const proofContrast = proofBg && proofColor ? contrast(proofBg, proofColor) : 0;

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
      steps: el.querySelectorAll(".pl-step").length,
      beforeAfter: Boolean(el.querySelector(".pl-before-after")),
    };
  }));

  const failures = [];
  if (posterContrast < 7) failures.push(`poster bg/fg contrast ${posterContrast.toFixed(2)} < 7`);
  if (labelContrast < 4.5) failures.push(`accent label contrast ${labelContrast.toFixed(2)} < 4.5`);
  if (surfaceTitleContrast < 7) failures.push(`surface title contrast ${surfaceTitleContrast.toFixed(2)} < 7`);
  if (surfaceBodyContrast < 4.5) failures.push(`surface body contrast ${surfaceBodyContrast.toFixed(2)} < 4.5`);
  if (proofContrast < 7) failures.push(`proof frame contrast ${proofContrast.toFixed(2)} < 7`);
  if (checks.length !== 3) failures.push(`expected 3 posters, found ${checks.length}`);
  if (!checks.some(check => check.hasHero && check.heroRatio >= 0.55)) failures.push("no evidence hero poster has proof area >= 55%");
  if (!checks.some(check => check.steps === 3)) failures.push("missing 3-step flow poster");
  if (!checks.some(check => check.beforeAfter)) failures.push("missing before/after poster");

  for (const check of checks) {
    if (check.overflow > 4) failures.push(`${check.id} overflows by ${check.overflow}px`);
    if (!check.hasBrand) failures.push(`${check.id} missing brand signature`);
    if (check.callouts > 2) failures.push(`${check.id} has ${check.callouts} callouts; max is 2`);
  }

  const sections = await page.$$("section.poster");
  for (let i = 0; i < sections.length; i += 1) {
    const name = checks[i]?.name || `card-${String(i + 1).padStart(2, "0")}`;
    const safe = name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5_-]+/g, "-").replace(/^-|-$/g, "");
    const file = path.join(imageDir, `${slug}-${String(i + 1).padStart(2, "0")}-${safe}.png`);
    await sections[i].screenshot({ path: file });
    console.log(file);
  }

  summary.push({
    theme,
    slug,
    palette,
    posterContrast: Number(posterContrast.toFixed(2)),
    labelContrast: Number(labelContrast.toFixed(2)),
    surfaceTitleContrast: Number(surfaceTitleContrast.toFixed(2)),
    surfaceBodyContrast: Number(surfaceBodyContrast.toFixed(2)),
    proofContrast: Number(proofContrast.toFixed(2)),
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
  <title>Proof Lab Theme Validation</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 32px; background: #171717; color: #f5f5f5; font-family: Inter, Arial, sans-serif; }
    h1 { margin: 0 0 24px; font-weight: 440; font-size: 32px; }
    .grid { display: grid; grid-template-columns: repeat(3, 216px); gap: 20px 24px; }
    .theme { grid-column: 1 / -1; margin-top: 12px; font: 650 18px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .06em; text-transform: uppercase; color: #dedede; }
    figure { margin: 0; background: #fff; }
    img { width: 216px; height: 288px; display: block; object-fit: cover; }
    figcaption { padding: 8px; color: #111; font: 12px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace; background: #fff; }
  </style>
</head>
<body>
  <h1>Proof Lab Theme Validation</h1>
  <div class="grid">
    ${summary.map(item => `
      <div class="theme">${item.theme}</div>
      ${[1, 2, 3].map(n => {
        const file = fs.readdirSync(imageDir).find(name => name.startsWith(`${item.slug}-${String(n).padStart(2, "0")}-`));
        return `<figure><img src="images/${file}" alt="${item.theme} card ${n}"><figcaption>${file}</figcaption></figure>`;
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

fs.writeFileSync(path.join(outputRoot, "theme-summary.json"), JSON.stringify(summary, null, 2) + "\n");
await browser.close();

for (const item of summary) {
  console.log(`${item.status.toUpperCase()} ${item.theme}: bg/fg ${item.posterContrast}, label ${item.labelContrast}, proof ${item.proofContrast}`);
  for (const failure of item.failures) console.log(`  - ${failure}`);
}

if (hasFail) process.exit(1);
