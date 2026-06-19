#!/usr/bin/env node
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const target = process.argv[2];
if (!target) {
  console.error("usage: node scripts/render-social-deck.mjs <task-dir|index.html>");
  process.exit(2);
}

const abs = path.resolve(target);
const htmlPath = fs.statSync(abs).isDirectory() ? path.join(abs, "index.html") : abs;
if (!fs.existsSync(htmlPath)) {
  console.error(`not found: ${htmlPath}`);
  process.exit(2);
}

const taskDir = path.dirname(htmlPath);
const outputDir = path.join(taskDir, "output", "images");
fs.mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch({
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({
  viewport: { width: 2200, height: 1800 },
  deviceScaleFactor: 1,
});

await page.goto("file://" + htmlPath, { waitUntil: "networkidle" });
await page.waitForTimeout(800);

const sections = await page.$$("section.poster");
if (!sections.length) {
  console.error("no <section class=\"poster\"> found");
  await browser.close();
  process.exit(1);
}

for (let i = 0; i < sections.length; i++) {
  const section = sections[i];
  const meta = await section.evaluate((el, index) => {
    const name = el.dataset.name || el.id || `card-${String(index + 1).padStart(2, "0")}`;
    const safe = name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5_-]+/g, "-").replace(/^-|-$/g, "");
    return { name: safe || `card-${String(index + 1).padStart(2, "0")}` };
  }, i);
  const file = path.join(outputDir, `${String(i + 1).padStart(2, "0")}-${meta.name}.png`);
  await section.screenshot({ path: file });
  console.log(file);
}

await browser.close();
