#!/usr/bin/env node

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.cwd());
const templatePath = path.join(root, "assets", "template-rednote-native.html");
const outputRoot = path.join(root, "examples", "rednote-native-validation", "output", "themes");
const htmlDir = path.join(outputRoot, "html");
const imageDir = path.join(outputRoot, "images");
const themes = [
  { name: "plum-cream", role: "default / refined Xiaohongshu" },
  { name: "berry-ink", role: "high-click launch" },
  { name: "matcha-black", role: "lifestyle / calm save value" },
  { name: "sky-butter", role: "tutorial / light knowledge" },
];
const legacyThemes = [
  { name: "coral-blue", role: "legacy compatibility only" },
];

if (!fs.existsSync(templatePath)) {
  console.error(`not found: ${templatePath}`);
  process.exit(2);
}

fs.mkdirSync(htmlDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const posters = `
<section class="poster xhs" id="rn-theme-01" data-name="rn-theme-01-cover">
  <div class="grain"></div>
  <div class="brush-blue"></div>
  <div class="brush-coral"></div>
  <div class="pop-mark"></div>
  <div class="rn-sticker">结果可见</div>
  <div class="rn-cover-system">
    <h1 class="rn-hero-title">小红书<br><strong>不再卡图</strong></h1>
    <div class="rn-subtitle">先看结果，再决定要不要继续读</div>
    <div class="rn-chip-row">
      <span class="rn-chip">首图钩子</span>
      <span class="rn-chip">结果证明</span>
      <span class="rn-chip">可发文案</span>
    </div>
    <div class="rn-proof-lockup">
      <div class="rn-hook-panel">
        <div class="rn-pain-card">别把首图写成说明书<span>用户先要知道为什么点开、能得到什么，再决定要不要继续读。</span></div>
        <div class="rn-evidence-strip">
          <div class="rn-evidence"><b>1</b><span>标题先让人停下</span></div>
          <div class="rn-evidence"><b>2</b><span>证明区必须可见</span></div>
          <div class="rn-evidence"><b>3</b><span>后续页给保存理由</span></div>
        </div>
      </div>
      <div class="rn-proof-panel">
        <div class="rn-phone-shot">
          <div class="rn-phone-bar"></div>
          <div class="rn-chat">这篇内容适合发小红书吗？</div>
          <div class="rn-chat ai">先提炼重点，再决定封面和卡片结构。</div>
          <div class="rn-output-card">
            <div class="rn-output-top"><span class="rn-output-label">XHS PACKAGE</span><span class="rn-output-pill">可直接发</span></div>
            <div class="rn-output-hook">结果先<br><strong>被看见</strong></div>
            <div class="rn-output-sub">不是列功能，而是先交代读者能获得什么。</div>
            <div class="rn-output-shelf">
              <div class="rn-output-chip">首图钩子</div>
              <div class="rn-output-chip">结果证明</div>
              <div class="rn-output-chip">可发文案</div>
              <div class="rn-output-chip">保存理由</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rn-foot"><span class="brand-signature"></span><span>Theme validation</span></div>
  </div>
</section>

<section class="poster xhs" id="rn-theme-02" data-name="rn-theme-02-before-after">
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
    <div class="rn-foot"><span class="brand-signature"></span><span>Theme validation</span></div>
  </div>
</section>
`;

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

const baseHtml = fs.readFileSync(templatePath, "utf8");
const browser = await chromium.launch({
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});

const summary = [];
let hasFail = false;

for (const theme of [...themes, ...legacyThemes]) {
  const html = baseHtml
    .replace(/<html([^>]*)data-theme="[^"]+"/, `<html$1data-theme="${theme.name}"`)
    .replace("<!-- POSTERS_HERE -->", posters);
  const htmlPath = path.join(htmlDir, `${theme.name}.html`);
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
      ink: cs.getPropertyValue("--ink").trim(),
      muted: cs.getPropertyValue("--muted").trim(),
      accent: cs.getPropertyValue("--coral").trim(),
      blue: cs.getPropertyValue("--blue").trim(),
      yellow: cs.getPropertyValue("--yellow").trim(),
      chatUser: cs.getPropertyValue("--chat-user").trim(),
      chatAi: cs.getPropertyValue("--chat-ai").trim(),
      chatResult: cs.getPropertyValue("--chat-result").trim(),
    };
  });

  const colorSamples = await page.locator("section.poster").first().evaluate(el => {
    const poster = getComputedStyle(el);
    const heroStrong = getComputedStyle(el.querySelector(".rn-hero-title strong"));
    const sticker = getComputedStyle(el.querySelector(".rn-sticker"));
    const subtitle = getComputedStyle(el.querySelector(".rn-subtitle"));
    const chat = getComputedStyle(el.querySelector(".rn-chat"));
    const chatAi = getComputedStyle(el.querySelector(".rn-chat.ai"));
    const chatResult = getComputedStyle(el.querySelector(".rn-output-pill"));
    return {
      posterBg: poster.backgroundColor,
      posterColor: poster.color,
      heroStrongColor: heroStrong.color,
      stickerBg: sticker.backgroundColor,
      stickerColor: sticker.color,
      subtitleBg: subtitle.backgroundColor,
      subtitleColor: subtitle.color,
      chatBg: chat.backgroundColor,
      chatColor: chat.color,
      chatAiBg: chatAi.backgroundColor,
      chatAiColor: chatAi.color,
      chatResultBg: chatResult.backgroundColor,
      chatResultColor: chatResult.color,
    };
  });

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

  const posterBg = parseRgb(colorSamples.posterBg);
  const posterInk = parseRgb(colorSamples.posterColor);
  const heroStrong = parseRgb(colorSamples.heroStrongColor);
  const stickerBg = parseRgb(colorSamples.stickerBg);
  const stickerColor = parseRgb(colorSamples.stickerColor);
  const subtitleBg = parseRgb(colorSamples.subtitleBg);
  const subtitleColor = parseRgb(colorSamples.subtitleColor);
  const chatBg = parseRgb(colorSamples.chatBg);
  const chatColor = parseRgb(colorSamples.chatColor);
  const chatAiBg = parseRgb(colorSamples.chatAiBg);
  const chatAiColor = parseRgb(colorSamples.chatAiColor);
  const chatResultBg = parseRgb(colorSamples.chatResultBg);
  const chatResultColor = parseRgb(colorSamples.chatResultColor);

  const posterContrast = posterBg && posterInk ? contrast(posterBg, posterInk) : 0;
  const heroAccentContrast = posterBg && heroStrong ? contrast(posterBg, heroStrong) : 0;
  const stickerContrast = stickerBg && stickerColor ? contrast(stickerBg, stickerColor) : 0;
  const subtitleContrast = subtitleBg && subtitleColor ? contrast(subtitleBg, subtitleColor) : 0;
  const chatContrast = chatBg && chatColor ? contrast(chatBg, chatColor) : 0;
  const chatAiContrast = chatAiBg && chatAiColor ? contrast(chatAiBg, chatAiColor) : 0;
  const chatResultContrast = chatResultBg && chatResultColor ? contrast(chatResultBg, chatResultColor) : 0;

  const failures = [];
  if (posterContrast < 7) failures.push(`poster bg/ink contrast ${posterContrast.toFixed(2)} < 7`);
  if (heroAccentContrast < 3) failures.push(`hero accent contrast ${heroAccentContrast.toFixed(2)} < 3`);
  if (stickerContrast < 3) failures.push(`sticker contrast ${stickerContrast.toFixed(2)} < 3`);
  if (subtitleContrast < 7) failures.push(`subtitle contrast ${subtitleContrast.toFixed(2)} < 7`);
  if (chatContrast < 7) failures.push(`chat contrast ${chatContrast.toFixed(2)} < 7`);
  if (chatAiContrast < 7) failures.push(`AI chat contrast ${chatAiContrast.toFixed(2)} < 7`);
  if (chatResultContrast < 7) failures.push(`result chat contrast ${chatResultContrast.toFixed(2)} < 7`);
  if (checks.length !== 2) failures.push(`expected 2 posters, found ${checks.length}`);
  if (!checks.some(check => check.hasProofLockup && check.hasPhoneShot && check.hasEvidenceStrip)) {
    failures.push("missing proof lockup with phone shot and evidence strip");
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
    if (check.titleSize < 96) failures.push(`${check.id} missing thumbnail-scale hero title`);
    if (check.proofRatio < 0.26) failures.push(`${check.id} proof/result area too small (${check.proofRatio.toFixed(2)})`);
  }

  const sections = await page.$$("section.poster");
  for (let i = 0; i < sections.length; i += 1) {
    const safe = checks[i].name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5_-]+/g, "-").replace(/^-|-$/g, "");
    const file = path.join(imageDir, `${theme.name}-${String(i + 1).padStart(2, "0")}-${safe}.png`);
    await sections[i].screenshot({ path: file });
    console.log(file);
  }

  summary.push({
    theme: theme.name,
    role: theme.role,
    production: themes.some(item => item.name === theme.name),
    palette,
    posterContrast: Number(posterContrast.toFixed(2)),
    heroAccentContrast: Number(heroAccentContrast.toFixed(2)),
    stickerContrast: Number(stickerContrast.toFixed(2)),
    subtitleContrast: Number(subtitleContrast.toFixed(2)),
    chatContrast: Number(chatContrast.toFixed(2)),
    chatAiContrast: Number(chatAiContrast.toFixed(2)),
    chatResultContrast: Number(chatResultContrast.toFixed(2)),
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
  <title>Rednote Native Theme Validation</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 32px; background: #181514; color: #f7f3ee; font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif; }
    h1 { margin: 0 0 24px; font-size: 32px; }
    .grid { display: grid; grid-template-columns: repeat(2, 216px); gap: 20px 24px; }
    .theme { grid-column: 1 / -1; margin-top: 18px; font: 760 18px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .04em; text-transform: uppercase; color: #f7f3ee; }
    figure { margin: 0; background: #fff; }
    img { width: 216px; height: 288px; display: block; object-fit: cover; }
    figcaption { padding: 8px; color: #111; font: 12px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace; background: #fff; }
  </style>
</head>
<body>
  <h1>Rednote Native Theme Validation</h1>
  <div class="grid">
    ${summary.map(item => `
      <div class="theme">${item.theme} · ${item.role} · ${item.status}</div>
      ${[1, 2].map(n => {
        const file = `${item.theme}-${String(n).padStart(2, "0")}-rn-theme-${String(n).padStart(2, "0")}-${n === 1 ? "cover" : "before-after"}.png`;
        return `<figure><img src="images/${file}" alt="${item.theme} card ${n}"><figcaption>${file}</figcaption></figure>`;
      }).join("")}
    `).join("")}
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(outputRoot, "contact-sheet.html"), contactHtml);
fs.writeFileSync(path.join(outputRoot, "theme-summary.json"), JSON.stringify(summary, null, 2) + "\n");

await browser.close();

for (const item of summary) {
  console.log(`${item.status.toUpperCase()} ${item.theme}: bg/ink ${item.posterContrast}, accent ${item.heroAccentContrast}, sticker ${item.stickerContrast}`);
  for (const failure of item.failures) console.log(`  - ${failure}`);
}

if (hasFail) {
  console.error("Rednote Native theme validation failed.");
  process.exit(1);
}

console.log("Rednote Native theme validation passed.");
