#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const target = process.argv[2];

if (!target) {
  console.error("Usage: node scripts/check-proposal-quality.mjs <proposal-dir|PROPOSAL.md>");
  process.exit(2);
}

const abs = path.resolve(process.cwd(), target);
const stat = fs.existsSync(abs) ? fs.statSync(abs) : null;
const proposalPath = stat?.isDirectory() ? path.join(abs, "PROPOSAL.md") : abs;
const proposalDir = stat?.isDirectory() ? abs : path.dirname(abs);

function read(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function section(text, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = text.match(new RegExp(`(?:^|\\n)#{2,3} +${escaped}\\s*\\n([\\s\\S]*?)(?=\\n#{2,3} +|$)`, "i"));
  return match?.[1]?.trim() ?? "";
}

function fieldValue(block, key) {
  const patterns = [
    new RegExp(`^\\s*-\\s*${key}\\s*:\\s*(.+)$`, "im"),
    new RegExp(`^\\s*${key}\\s*:\\s*(.+)$`, "im"),
    new RegExp(`^\\s*\\|\\s*${key}\\s*\\|\\s*(.+?)\\s*\\|\\s*$`, "im"),
  ];
  for (const pattern of patterns) {
    const value = block.match(pattern)?.[1]?.trim();
    if (value) return value.replace(/`/g, "");
  }
  return "";
}

const proposal = read(proposalPath);
const checks = [];

function add(ok, label, fix) {
  checks.push({ ok, label, fix });
}

add(Boolean(proposal), "PROPOSAL.md exists", "Create a proposal file before building rendered cards or final Xiaohongshu copy.");

const route = section(proposal, "Recommended Visual System") || section(proposal, "Route Decision");
const count = section(proposal, "Recommended Card Count") || section(proposal, "Card Count");
const pagePlan = section(proposal, "Page Plan");
const imagePolicy = section(proposal, "Image Policy");
const copyStrategy = section(proposal, "Copy Strategy");
const qaFocus = section(proposal, "Main Risks And QA Focus") || section(proposal, "QA Focus");
const concreteReader = section(proposal, "Concrete Reader");
const valueTranslation = section(proposal, "Value Translation");
const shelfTest = section(proposal, "Shelf Test");
const searchIntent = section(proposal, "Search Intent Plan") || section(proposal, "Search Intent");
const productBrief = section(proposal, "Product Brief");

add(Boolean(route), "Proposal recommends a visual system", "Add Recommended Visual System with visualSystem, theme, and reason.");
add(Boolean(count), "Proposal explains card count", "Add Recommended Card Count with an explicit number and rationale.");
add(Boolean(pagePlan), "Proposal includes page plan", "Add a Page Plan table before generating cards.");
add(Boolean(imagePolicy), "Proposal includes image policy", "Add Image Policy describing source images, crops, redraws, and proof usage.");
add(Boolean(copyStrategy), "Proposal includes Xiaohongshu copy strategy", "Add Copy Strategy for title, caption body, CTA, and hashtags.");
add(Boolean(qaFocus), "Proposal includes QA focus", "Add Main Risks And QA Focus so the user sees tradeoffs before confirming.");
add(Boolean(concreteReader), "Proposal includes concrete reader", "Add Concrete Reader with who, moment, pain/emotion, save/share reason, and identity.");
add(Boolean(valueTranslation), "Proposal includes value translation", "Add Value Translation that turns feature/concept language into user scene and benefit.");
add(Boolean(shelfTest), "Proposal includes shelf test", "Add Shelf Test explaining why the cover would earn a tap in a fast Xiaohongshu feed.");
add(Boolean(searchIntent), "Proposal includes search intent plan", "Add Search Intent Plan with natural audience, scene, problem, category, and product terms.");

const productish = /APP|app|Skill|tool|工具|产品|launch|发布|服务|课程|会员|订阅|commercial|offer/i.test(proposal);
if (productish) {
  add(Boolean(productBrief), "Product/tool proposal includes product brief", "Add Product Brief for APP, Skill, tool, service, course, product, or launch content.");
}

if (route) {
  add(Boolean(fieldValue(route, "visualSystem")), "Route has visualSystem", "Set visualSystem under Recommended Visual System.");
  add(Boolean(fieldValue(route, "theme")), "Route has theme", "Set theme under Recommended Visual System.");
  add(/reason\s*:/i.test(route) || /because|source|official|reader|proof|适合|原因|因为/.test(route), "Route explains why this system wins", "Explain the source cues, reader job, or proof assets that made this route win.");
}

if (count) {
  add(/\b\d+\b|[一二三四五六七八九十]+/.test(count), "Card count includes a number", "State the recommended number of cards.");
  add(/reason|because|cover|source|section|rationale|原因|因为|封面|章节|覆盖/.test(count), "Card count has rationale", "Explain why this content needs this many cards.");
}

if (pagePlan) {
  add(/\|\s*Card\s*\|\s*Role\s*\|\s*Source anchor\s*\|\s*Must carry\s*\|\s*Reader sentence\s*\|\s*Visual proof\s*\|\s*Cut\s*\|/i.test(pagePlan), "Page plan uses required columns", "Use columns: Card | Role | Source anchor | Must carry | Reader sentence | Visual proof | Cut.");
  const tableRows = pagePlan.split("\n").filter(line => /^\|\s*\d+/.test(line)).length;
  add(tableRows >= 3, "Page plan has multiple cards", "List at least cover plus two content pages in the proposal.");
  add(/source anchor/i.test(pagePlan) && !/\|\s*\d+\s*\|\s*[^|]*\|\s*(TBD|待定|无|none)\s*\|/i.test(pagePlan), "Non-cover cards avoid empty source anchors", "Map each content card to a source heading, paragraph, image, or user note.");
}

if (imagePolicy) {
  add(/source|official|screenshot|image|diagram|proof|来源|官方|截图|图片|插图|证据/.test(imagePolicy), "Image policy mentions source/proof assets", "Say which source images, screenshots, diagrams, or proof assets will be used.");
  add(/redraw|crop|portrait|landscape|fit|recompose|重绘|裁剪|竖版|横版|适配/.test(imagePolicy), "Image policy covers crop/redraw decisions", "State when to crop, redraw, recompose, or keep landscape evidence.");
}

if (copyStrategy) {
  add(/title|caption|opening|body|CTA|hashtag|标题|正文|开头|标签|互动/.test(copyStrategy), "Copy strategy covers publishing copy", "Mention title, caption body/opening, CTA, and hashtags.");
  add(!/拆成.*张|生成.*张图|卡片组生成|我会生成/.test(copyStrategy), "Copy strategy avoids production-action wording", "Describe the reader-facing story, not the production action of splitting or generating cards.");
}

if (concreteReader) {
  add(/who|moment|pain|emotion|save|share|identity|谁|人群|场景|时刻|痛点|情绪|保存|分享|身份/.test(concreteReader), "Concrete reader covers user context", "Name who, when, pain/emotion, save/share reason, and identity.");
  add(!/所有人|大众|泛用户|anyone|everyone/i.test(concreteReader), "Concrete reader is not a generic audience", "Use a specific reader, not a broad market label.");
}

if (valueTranslation) {
  add(/\|.+\|.+\|/.test(valueTranslation), "Value translation uses a two-column mapping", "Use a table mapping source/feature language to user translation.");
  add(/用户|场景|痛|省|少|更|clarity|confidence|benefit|identity|save|value|解决|不用|不必|避免|减少|克制|需要时|只接|可以|变成/.test(valueTranslation), "Value translation contains user benefit language", "Translate features into user scenes, reduced friction, confidence, identity, or save value.");
}

if (shelfTest) {
  add(/stop|scroll|tap|click|cover|proof|payoff|停|点|封面|货架|证据|冲动|一秒|1 秒/.test(shelfTest), "Shelf test explains stop/tap reason", "Explain why someone stops scrolling and taps the cover.");
  add(/who|problem|desire|scene|contradiction|谁|问题|痛点|场景|矛盾|欲望|结果/.test(shelfTest), "Shelf test names reader relevance", "Name the concrete problem, desire, scene, or contradiction.");
}

if (searchIntent) {
  const termTypes = ["audience", "scene", "problem", "category", "product", "人群", "场景", "问题", "类目", "产品"];
  const matchedTypes = termTypes.filter(term => new RegExp(term, "i").test(searchIntent)).length;
  add(matchedTypes >= 3, "Search intent covers at least three term types", "Plan at least three of audience, scene, problem, category, product, or honest alternative terms.");
  add(/cover|title|caption|hashtags|封面|标题|正文|标签|开头/.test(searchIntent), "Search intent says where terms appear", "Say how search words appear naturally in cover, title, caption/opening, and tags.");
}

if (productBrief) {
  for (const label of ["Product", "Target user", "Use moment", "Core pain", "Main proof", "Do-not-say", "Search words"]) {
    add(new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(productBrief), `Product Brief includes ${label}`, `Add ${label} to Product Brief.`);
  }
}

add(
  proposal.includes("你确认这套方案后，我再开始生成卡片图片和小红书文案。要按这个方案继续吗？"),
  "Proposal asks the fixed confirmation question",
  "End with the exact confirmation question so generation is gated consistently.",
);

for (const rel of ["output/images", "xiaohongshu-caption.md", "copy-variants.md"]) {
  add(!fs.existsSync(path.join(proposalDir, rel)), `Proposal stage has no ${rel}`, `Do not create ${rel} before the user confirms the proposal.`);
}

const failed = checks.filter(check => !check.ok);

console.log("==== check-proposal-quality ====");
console.log(`target: ${target}`);
console.log(`checks: ${checks.length - failed.length}/${checks.length} passed`);

for (const check of checks) {
  console.log(`${check.ok ? "PASS" : "FAIL"} · ${check.label}`);
  if (!check.ok) console.log(`       fix: ${check.fix}`);
}

if (failed.length) process.exit(1);
