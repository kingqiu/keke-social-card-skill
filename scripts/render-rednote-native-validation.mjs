#!/usr/bin/env node

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.cwd());
const templatePath = path.join(root, "assets", "template-rednote-native.html");
const outRoot = path.join(root, "examples", "rednote-native-validation", "output");
const htmlPath = path.join(outRoot, "index.html");
const imageDir = path.join(outRoot, "images");

if (!fs.existsSync(templatePath)) {
  console.error(`not found: ${templatePath}`);
  process.exit(2);
}

fs.mkdirSync(imageDir, { recursive: true });

const posters = `
<section class="poster xhs" id="rn-01" data-name="rn-01-cover">
  <div class="grain"></div>
  <div class="brush-blue"></div>
  <div class="brush-coral"></div>
  <div class="pop-mark"></div>
  <div class="rn-sticker">真实可试</div>
  <div class="rn-cover-system">
    <h1 class="rn-hero-title">这次<br><strong>真的能用</strong></h1>
    <div class="rn-subtitle">一句话输入，直接看到结果</div>
    <div class="rn-chip-row">
      <span class="rn-chip">省时间</span>
      <span class="rn-chip">有证据</span>
      <span class="rn-chip">能收藏</span>
    </div>
    <div class="rn-proof-lockup">
      <div class="rn-hook-panel">
        <div class="rn-pain-card">别把首图写成说明书<span>用户先要知道为什么点开、能得到什么，再决定要不要继续读。</span></div>
        <div class="rn-evidence-strip">
          <div class="rn-evidence"><b>1步</b><span>说清场景</span></div>
          <div class="rn-evidence"><b>3项</b><span>给出结果</span></div>
          <div class="rn-evidence"><b>可改</b><span>继续追问</span></div>
        </div>
      </div>
      <div class="rn-proof-panel">
        <div class="rn-phone-shot">
          <div class="rn-phone-bar"></div>
          <div class="rn-chat">我想做一组小红书卡片，重点要能一眼看懂。</div>
          <div class="rn-chat ai">先给你标题、结构、首图钩子，再给可发布文案。</div>
          <div class="rn-output-card">
            <div class="rn-output-top"><span class="rn-output-label">XHS PACKAGE</span><span class="rn-output-pill">可直接发</span></div>
            <div class="rn-output-hook">先看<br><strong>真实结果</strong></div>
            <div class="rn-output-sub">封面先说清为什么点开，内页再给证据和保存价值。</div>
            <div class="rn-output-shelf">
              <div class="rn-output-chip">首图钩子</div>
              <div class="rn-output-chip">结果证明</div>
              <div class="rn-output-chip">可发文案</div>
              <div class="rn-output-chip">保存理由</div>
            </div>
            <div class="rn-caption-preview"><b>标题建议：别只介绍功能点</b><span>正文直接讲内容价值，不讲生成动作。</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="rn-foot"><span class="brand-signature"></span><span>Rednote Native Validation</span></div>
  </div>
</section>

<section class="poster xhs" id="rn-02" data-name="rn-02-before-after">
  <div class="grain"></div>
  <div class="content">
    <h1 class="rn-hero-title">别只写<br><strong>功能点</strong></h1>
    <div class="rn-before-after">
      <div class="rn-card">
        <h3>Before</h3>
        <p>标题像说明书，用户不知道为什么要点开。</p>
        <div class="rn-result-list">
          <div class="rn-result">功能很多</div>
          <div class="rn-result">流程完整</div>
          <div class="rn-result">但没有证明</div>
        </div>
      </div>
      <div class="rn-card">
        <h3>After</h3>
        <p>先给场景和结果，再把证据放在用户能看见的位置。</p>
        <div class="rn-result-list">
          <div class="rn-result">痛点清楚</div>
          <div class="rn-result">结果可见</div>
          <div class="rn-result">值得收藏</div>
        </div>
      </div>
    </div>
    <div class="rn-save-strip">先证明 <mark>能用</mark> 再解释功能</div>
    <div class="rn-foot"><span class="brand-signature"></span><span>Rednote Native Validation</span></div>
  </div>
</section>
`;

const html = fs.readFileSync(templatePath, "utf8").replace("<!-- POSTERS_HERE -->", posters);
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
  const proof = el.querySelector(".rn-proof-lockup, .rn-before-after");
  const proofArea = proof ? proof.getBoundingClientRect().width * proof.getBoundingClientRect().height : 0;
  const title = el.querySelector(".rn-hero-title");
  const titleSize = title ? Number.parseFloat(getComputedStyle(title).fontSize) : 0;
  return {
    id: el.id || `poster-${index + 1}`,
    name: el.dataset.name || el.id || `poster-${index + 1}`,
    overflow: el.scrollHeight - el.clientHeight,
    hasBrand: cssBrand || (el.innerText || "").includes(expected),
    hasHeroTitle: Boolean(title),
    titleSize,
    proofRatio: proofArea / area,
    hasProofLockup: Boolean(el.querySelector(".rn-proof-lockup")),
    hasPhoneShot: Boolean(el.querySelector(".rn-phone-shot")),
    hasOutputCard: Boolean(el.querySelector(".rn-output-card")),
    hasPainCard: Boolean(el.querySelector(".rn-pain-card")),
    hasEvidenceStrip: Boolean(el.querySelector(".rn-evidence-strip")),
    hasBeforeAfter: Boolean(el.querySelector(".rn-before-after")),
    hasSaveStrip: Boolean(el.querySelector(".rn-save-strip")),
  };
}));

const failures = [];
if (checks.length !== 2) failures.push(`expected 2 posters, found ${checks.length}`);
if (!checks.some(check => check.hasProofLockup && check.hasPhoneShot && check.hasEvidenceStrip)) {
  failures.push("missing Rednote cover proof lockup with phone shot and evidence strip");
}
if (!checks.some(check => check.hasOutputCard)) {
  failures.push("missing native output/publishing package card");
}
if (!checks.some(check => check.hasPainCard)) {
  failures.push("missing scenario/pain card");
}
if (!checks.some(check => check.hasBeforeAfter && check.hasSaveStrip)) {
  failures.push("missing before/after save-value page");
}
for (const check of checks) {
  if (check.overflow > 4) failures.push(`${check.id} overflows by ${check.overflow}px`);
  if (!check.hasBrand) failures.push(`${check.id} missing brand signature`);
  if (!check.hasHeroTitle || check.titleSize < 96) failures.push(`${check.id} missing thumbnail-scale hero title`);
    if (check.proofRatio < 0.26) failures.push(`${check.id} proof/result area too small (${check.proofRatio.toFixed(2)})`);
}

const sections = await page.$$("section.poster");
for (let i = 0; i < sections.length; i += 1) {
  const safe = checks[i].name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5_-]+/g, "-").replace(/^-|-$/g, "");
  const file = path.join(imageDir, `${String(i + 1).padStart(2, "0")}-${safe}.png`);
  await sections[i].screenshot({ path: file });
  console.log(file);
}

fs.writeFileSync(path.join(outRoot, "rednote-native-summary.json"), JSON.stringify({
  status: failures.length ? "fail" : "pass",
  checks,
  failures,
}, null, 2) + "\n");

await browser.close();

if (failures.length) {
  console.error("Rednote Native validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Rednote Native validation passed.");
