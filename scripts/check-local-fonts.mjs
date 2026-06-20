#!/usr/bin/env node

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const fontsCssPath = path.join(root, "assets", "fonts", "keke-fonts.css");
const fontsCss = fs.readFileSync(fontsCssPath, "utf8");

const failures = [];

const requiredFamilies = [
  "Keke Inter",
  "Keke Noto Sans SC",
  "Keke IBM Plex Mono",
  "Keke Noto Serif SC",
  "Keke Playfair Display",
];

const productionTemplates = [
  "assets/template-swiss-system.html",
  "assets/template-rednote-native.html",
  "assets/template-proof-lab.html",
  "assets/template-lookbook-journal.html",
  "assets/template-editorial-eink.html",
];

const validationEntrypoints = [
  "examples/swiss-palette-validation/index.html",
  "examples/proof-lab-validation/index.html",
  "examples/swiss-okf-brief-gold-candidate/index.html",
];

for (const rel of [...productionTemplates, ...validationEntrypoints]) {
  const file = path.join(root, rel);
  const html = fs.readFileSync(file, "utf8");
  if (/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(html)) {
    failures.push(`${rel} must not reference external Google Fonts`);
  }
  if (!/keke-fonts\.css/.test(html)) {
    failures.push(`${rel} must load keke-fonts.css`);
  }
}

for (const family of requiredFamilies) {
  if (!fontsCss.includes(`font-family: "${family}"`)) {
    failures.push(`assets/fonts/keke-fonts.css missing ${family}`);
  }
}

const srcMatches = [...fontsCss.matchAll(/src:\s*url\("([^"]+)"\)\s*format\("woff2"\)/g)];
if (srcMatches.length < 18) failures.push(`expected at least 18 local font src entries, found ${srcMatches.length}`);
for (const match of srcMatches) {
  const rel = match[1].replace(/^\.\//, "");
  const file = path.join(path.dirname(fontsCssPath), rel);
  if (!fs.existsSync(file)) failures.push(`missing font file referenced by CSS: ${match[1]}`);
}

const licensePath = path.join(root, "assets", "fonts", "LICENSE-OFL.txt");
const sourcesPath = path.join(root, "assets", "fonts", "SOURCES.md");
if (!fs.existsSync(licensePath) || !fs.readFileSync(licensePath, "utf8").includes("SIL OPEN FONT LICENSE")) {
  failures.push("assets/fonts/LICENSE-OFL.txt must contain the SIL Open Font License");
}
if (!fs.existsSync(sourcesPath)) {
  failures.push("assets/fonts/SOURCES.md missing");
}
if (!fs.existsSync(path.join(root, "assets", "fonts", "subset-chars.txt"))) {
  failures.push("assets/fonts/subset-chars.txt missing; run npm run build:font-subsets after font changes");
}

if (!failures.length) {
  const browser = await chromium.launch({
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const page = await browser.newPage();
  await page.setContent(`<!doctype html>
    <html lang="zh-CN">
      <head>
        <style>@import url("${pathToFileURL(fontsCssPath).href}");</style>
      </head>
      <body>
        <div id="sans" style="font-family:'Keke Noto Sans SC'; font-weight:400">测试字体</div>
        <div id="serif" style="font-family:'Keke Noto Serif SC'; font-weight:700">测试字体</div>
        <div id="inter" style="font-family:'Keke Inter'; font-weight:500">Agent OKF</div>
        <div id="mono" style="font-family:'Keke IBM Plex Mono'; font-weight:500">type: metric</div>
        <div id="playfair" style="font-family:'Keke Playfair Display'; font-weight:700">Editorial</div>
      </body>
    </html>`, { waitUntil: "networkidle" });
  const loaded = await page.evaluate(async families => {
    await document.fonts.ready;
    return {
      status: document.fonts.status,
      checks: families.map(family => ({
        family,
        loaded: document.fonts.check(`32px "${family}"`, family.includes("SC") ? "测试" : "Test"),
      })),
    };
  }, requiredFamilies);
  await browser.close();
  if (loaded.status !== "loaded") failures.push(`document.fonts.status is ${loaded.status}`);
  for (const check of loaded.checks) {
    if (!check.loaded) failures.push(`${check.family} did not load in browser probe`);
  }
}

if (failures.length) {
  console.error("Local font check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Local font check passed.");
