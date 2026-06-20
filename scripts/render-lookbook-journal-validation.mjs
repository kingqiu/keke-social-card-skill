#!/usr/bin/env node

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.cwd());
const templatePath = path.join(root, "assets", "template-lookbook-journal.html");
const outRoot = path.join(root, "examples", "lookbook-journal-validation", "output");
const htmlPath = path.join(outRoot, "index.html");
const imageDir = path.join(outRoot, "images");
const fontHref = path.relative(path.dirname(htmlPath), path.join(root, "assets", "fonts", "keke-fonts.css")).replaceAll(path.sep, "/");

if (!fs.existsSync(templatePath)) {
  console.error(`not found: ${templatePath}`);
  process.exit(2);
}

fs.mkdirSync(imageDir, { recursive: true });

const posters = `
<section class="poster xhs" id="lj-01" data-name="lj-01-result-board">
  <div class="grain"></div>
  <div class="tape t1"></div>
  <div class="tape t2"></div>
  <div class="content">
    <h1 class="lj-title">柔和商务 OOTD</h1>
    <div class="lj-meta">场景：第一次见客户 | 上海 18-24°C</div>
    <div class="lj-reason">首选理由：专业但不硬</div>
    <div class="lj-result-board">
      <div class="lj-callouts">
        <div class="lj-item-card"><h3>外套</h3><p>米色针织，降低距离感。</p><div class="swatch" style="background:#ded2bf"></div></div>
        <div class="lj-item-card"><h3>鞋包</h3><p>黑色乐福鞋和托特包，稳重不抢戏。</p><div class="swatch" style="background:#151515"></div></div>
        <div class="lj-callout"><h3>风格提醒</h3><p>避免过甜元素，保留干净线条。</p></div>
      </div>
      <div class="lj-photo-stage">
        <div class="lj-photo">
          <svg viewBox="0 0 440 760" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="outfit placeholder">
            <rect width="440" height="760" fill="#fffdf7"/>
            <circle cx="220" cy="96" r="48" fill="#e7c6ad"/>
            <path d="M168 94c18-58 94-50 108 0 10 38-22 64-58 64-38 0-62-28-50-64Z" fill="#2a211d"/>
            <path d="M145 170h150l28 210H118l27-210Z" fill="#cbddec"/>
            <path d="M118 182h205v226H118z" fill="#e5d9c5" opacity=".82"/>
            <path d="M142 382h156l-18 290H160l-18-290Z" fill="#171717"/>
            <path d="M133 682h112v36H122c0-18 5-28 11-36Z" fill="#111"/>
            <path d="M205 682h112c8 8 12 18 12 36H205z" fill="#111"/>
          </svg>
          <div class="lj-photo-caption">浅蓝衬衫 + 米色针织 + 黑色直筒裤</div>
        </div>
      </div>
      <div class="lj-callouts">
        <div class="lj-item-card"><h3>上衣</h3><p>浅蓝衬衫提亮肤色，保留职场感。</p><div class="swatch" style="background:#cbddec"></div></div>
        <div class="lj-item-card"><h3>下装</h3><p>黑色直筒裤，利落显瘦。</p><div class="swatch" style="background:#171717"></div></div>
        <div class="lj-callout"><h3>替换建议</h3><p>怕冷可加薄风衣，颜色仍保持浅中性色。</p></div>
      </div>
    </div>
    <div class="lj-verdict">
      <div class="lj-verdict-card"><strong>适配场景：</strong>见客户、通勤、轻商务。</div>
      <div class="lj-verdict-card"><strong>风险提醒：</strong>首饰少量即可，不要堆叠。</div>
    </div>
    <div class="lj-summary"><span class="brand-signature"></span><strong>Lookbook Journal Validation</strong></div>
  </div>
</section>
`;

const html = fs.readFileSync(templatePath, "utf8")
  .replace('href="fonts/keke-fonts.css"', `href="${fontHref}"`)
  .replace("<!-- POSTERS_HERE -->", posters);
fs.writeFileSync(htmlPath, html);

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
  const photo = el.querySelector(".lj-photo, .lj-figure");
  const photoArea = photo ? photo.getBoundingClientRect().width * photo.getBoundingClientRect().height : 0;
  return {
    id: el.id || `poster-${index + 1}`,
    name: el.dataset.name || el.id || `poster-${index + 1}`,
    overflow: el.scrollHeight - el.clientHeight,
    hasBrand: cssBrand || (el.innerText || "").includes(expected),
    hasTitle: Boolean(el.querySelector(".lj-title")),
    hasMeta: Boolean(el.querySelector(".lj-meta")),
    hasReason: Boolean(el.querySelector(".lj-reason")),
    hasResultBoard: Boolean(el.querySelector(".lj-result-board")),
    hasPhoto: Boolean(photo),
    photoRatio: photoArea / area,
    itemCards: el.querySelectorAll(".lj-item-card").length,
    callouts: el.querySelectorAll(".lj-callout").length,
    hasVerdict: Boolean(el.querySelector(".lj-verdict")),
  };
}));

const failures = [];
if (checks.length !== 1) failures.push(`expected 1 poster, found ${checks.length}`);
for (const check of checks) {
  if (check.overflow > 4) failures.push(`${check.id} overflows by ${check.overflow}px`);
  if (!check.hasBrand) failures.push(`${check.id} missing brand signature`);
  if (!check.hasTitle || !check.hasMeta || !check.hasReason) failures.push(`${check.id} missing title/meta/reason header`);
  if (!check.hasResultBoard || !check.hasPhoto) failures.push(`${check.id} missing result-first board with central photo`);
  if (check.photoRatio < 0.20) failures.push(`${check.id} central result too small (${check.photoRatio.toFixed(2)})`);
  if (check.itemCards < 4) failures.push(`${check.id} needs at least 4 item cards`);
  if (check.callouts < 2) failures.push(`${check.id} needs explanatory callouts`);
  if (!check.hasVerdict) failures.push(`${check.id} missing bottom verdict strip`);
}

const sections = await page.$$("section.poster");
for (let i = 0; i < sections.length; i += 1) {
  const safe = checks[i].name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5_-]+/g, "-").replace(/^-|-$/g, "");
  const file = path.join(imageDir, `${String(i + 1).padStart(2, "0")}-${safe}.png`);
  await sections[i].screenshot({ path: file });
  console.log(file);
}

fs.writeFileSync(path.join(outRoot, "lookbook-journal-summary.json"), JSON.stringify({
  status: failures.length ? "fail" : "pass",
  checks,
  failures,
}, null, 2) + "\n");

await browser.close();

if (failures.length) {
  console.error("Lookbook Journal validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Lookbook Journal validation passed.");
