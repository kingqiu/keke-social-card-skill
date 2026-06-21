#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const target = process.argv[2];

if (!target) {
  console.error("Usage: node scripts/check-xhs-copy.mjs <task-dir>");
  process.exit(2);
}

const root = path.resolve(process.cwd(), target);
const captionPath = path.join(root, "xiaohongshu-caption.md");
const variantsPath = path.join(root, "copy-variants.md");
const qaPath = path.join(root, "QA.md");

const riskyTitleWords = [
  "震惊",
  "爆火",
  "不看后悔",
  "全网",
  "第一",
  "最强",
  "必看",
  "100%",
];

const aiFlavorPhrases = [
  "随着",
  "在当今",
  "近年来",
  "本文将",
  "以下是",
  "赋能",
  "颠覆",
  "重塑",
  "重新定义",
  "开启新篇章",
  "未来可期",
  "彰显",
  "标志着",
  "不容错过",
  "令人惊叹",
  "极致体验",
  "值得注意的是",
  "需要指出的是",
  "总而言之",
];

const workflowLeakagePatterns = [
  /这组\s*\d+\s*张(?:卡|图|图片)/,
  /这篇.{0,12}拆成/,
  /我.{0,8}拆成/,
  /按.{0,12}拆/,
  /生成了?\s*\d+\s*张/,
  /做成了?\s*\d+\s*张/,
  /第\s*\d+\s*张(?:卡|图|图片)/,
  /卡片里(?:会)?讲/,
  /这组卡/,
  /这些卡/,
  /卡组/,
];

const checks = [];
const scoreItems = [];

function read(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function add(ok, label, fix) {
  checks.push({ ok, label, fix });
}

function score(points, ok, label, fix) {
  scoreItems.push({ points, ok, label, fix });
}

function section(text, heading) {
  const pattern = new RegExp(`(?:^|\\n)# +${heading}\\s*\\n([\\s\\S]*?)(?=\\n# +[^#\\s]|$)`);
  return text.match(pattern)?.[1]?.trim() ?? "";
}

function firstSection(text, headings) {
  for (const heading of headings) {
    const found = section(text, heading);
    if (found) return found;
  }
  return "";
}

function countHashtags(text) {
  return [...text.matchAll(/#[\p{L}\p{N}_\-\u4e00-\u9fff]+/gu)].map((match) => match[0]);
}

function compactLength(text) {
  return [...text.replace(/\s/g, "")].length;
}

const caption = read(captionPath);
const variants = read(variantsPath);
const qa = read(qaPath);

add(Boolean(caption), "xiaohongshu-caption.md exists", "Create xiaohongshu-caption.md with title, body, hashtags, and publishing notes when relevant.");
add(Boolean(variants), "copy-variants.md exists", "Create copy-variants.md with title options, opening options, CTA prompts, and hashtag sets.");
add(Boolean(qa), "QA.md exists", "Create QA.md with copy QA notes.");

if (caption) {
  const title = firstSection(caption, ["小红书标题", "标题"]);
  const body = firstSection(caption, ["正文", "小红书正文", "小红书文案"]);
  const tagsSection = firstSection(caption, ["标签", "小红书标签"]);
  const hashtags = countHashtags(tagsSection || caption);
  const bodyLength = compactLength(body);
  const titleChars = [...title.replace(/\s/g, "")].length;
  const aiFlavorCount = aiFlavorPhrases.filter((phrase) => body.includes(phrase) || title.includes(phrase)).length;
  const concreteTermCount = [...new Set((`${title}\n${body}`).match(/[A-Za-z][A-Za-z0-9.+#-]{2,}|[\u4e00-\u9fff]{2,}/g) || [])].length;
  const paragraphCount = body.split(/\n{2,}/).filter(part => compactLength(part) >= 20).length;
  const humanVoiceHits = (body.match(/我|你|其实|但|不过|最近|踩过|发现|会更|别急|先|再|如果|为什么|真正|说白了/g) || []).length;
  const takeawayHits = (body.match(/第一|第二|第三|首先|其次|最后|关键|重点|记住|换句话说|原因|建议|观察|结论|问题|价值/g) || []).length;

  add(Boolean(title), "Caption has title section", "Add '# 小红书标题' with one final title.");
  add(titleChars >= 8 && titleChars <= 40, "Title length is reasonable", "Keep final title roughly 8-40 Chinese characters.");
  add(!riskyTitleWords.some((word) => title.includes(word)), "Title avoids risky clickbait words", "Remove unsupported absolutes or low-quality bait words from the title.");
  add(Boolean(body), "Caption has body section", "Add '# 正文' with hook, promise, takeaways, limitation if relevant, and CTA.");
  add(bodyLength >= 450, "Caption body is substantial", "Write enough body copy to explain the post without relying on the cards alone; aim for 650-950 chars for long-form posts.");
  add(bodyLength <= 1000, "Caption body stays within 1000 chars", "Keep the main body within 1000 characters.");
  add(!aiFlavorPhrases.some((phrase) => body.includes(phrase) || title.includes(phrase)), "Copy avoids common AI-flavored phrases", "Remove generic AI/product-marketing language such as 赋能、重塑、未来可期、随着、本文将.");
  add(!workflowLeakagePatterns.some((pattern) => pattern.test(body) || pattern.test(title)), "Copy avoids production workflow leakage", "Do not mention card/image count, splitting, generation, or which card/page explains what.");
  add(!body.includes("——"), "Copy avoids em dash polish", "Use commas, periods, or plain rewrites instead of decorative em dashes.");
  add((body.match(/不是[^。！？\n]{1,30}而是/g) || []).length <= 1, "Copy limits mechanical contrast formulas", "Avoid repeated '不是 X，而是 Y' style formulas.");
  add(/评论|你觉得|你会|你最|留言|想看|欢迎|一起聊|你关注/i.test(body), "Caption includes natural CTA", "End with a natural comment prompt or discussion question.");
  add(Boolean(tagsSection), "Caption has hashtag section", "Add '# 标签' with 5-8 relevant tags.");
  add(hashtags.length >= 5 && hashtags.length <= 8, "Hashtag count is 5-8", "Use 5-8 relevant hashtags; avoid stuffing unrelated hot tags.");

  score(12, titleChars >= 10 && titleChars <= 32, "Title is concrete and feed-readable", "Make the title specific enough to say what the post is about in the feed.");
  score(10, concreteTermCount >= 18, "Copy carries concrete source terms", "Keep enough original concepts, object names, scenarios, or mechanism words after compression.");
  score(14, bodyLength >= 650 && bodyLength <= 950, "Body uses the 1000-char budget well", "For framework/long-form posts, aim for 650-950 compact characters.");
  score(10, paragraphCount >= 3, "Body has readable paragraph rhythm", "Use short paragraphs instead of one compressed block.");
  score(12, humanVoiceHits >= 5, "Copy has a human point of view", "Add a natural reader-facing position, friction, or observation.");
  score(12, takeawayHits >= 4, "Copy gives clear takeaways", "State the main observations directly; avoid letting the cards do all explanation.");
  score(10, aiFlavorCount === 0, "Copy avoids AI-brochure language", "Remove common AI/product-marketing filler.");
  score(8, !workflowLeakagePatterns.some((pattern) => pattern.test(body) || pattern.test(title)), "Copy tells the story, not the production action", "Do not mention splitting, generating, card count, or which page explains what.");
  score(6, /评论|你觉得|你会|你最|留言|想看|欢迎|一起聊|你关注/i.test(body), "CTA feels natural", "End with a real discussion prompt.");
  score(6, hashtags.length >= 5 && hashtags.length <= 8, "Hashtags are platform-sized", "Use 5-8 relevant tags.");
}

if (variants) {
  const titleOptionCount = [...variants.matchAll(/^\s*\d+\.\s+\S+/gm)].length;
  add(/标题备选|Title/i.test(variants), "Variants include title options", "Add 3-5 title options.");
  add(titleOptionCount >= 3, "At least 3 numbered title options", "Provide at least 3 numbered title options.");
  add(/开头备选|Opening/i.test(variants), "Variants include opening options", "Add 2-3 opening options.");
  add(/CTA|评论|互动|Comment/i.test(variants), "Variants include CTA prompts", "Add 2-3 CTA/comment prompts.");
  add(/标签|Hashtag/i.test(variants), "Variants include hashtag alternatives", "Add compact and broader hashtag sets.");
}

if (qa) {
  add(/Copy QA|文案/i.test(qa), "QA includes copy QA", "Add a Copy QA section or bullets.");
  add(/title|标题/i.test(qa), "QA mentions title check", "Record whether the title matches the cover and avoids unsupported claims.");
  add(/hashtag|标签/i.test(qa), "QA mentions hashtag check", "Record hashtag relevance and count.");
}

const failed = checks.filter((check) => !check.ok);
const earnedScore = scoreItems.reduce((sum, item) => sum + (item.ok ? item.points : 0), 0);
const totalScore = scoreItems.reduce((sum, item) => sum + item.points, 0) || 100;
const finalScore = Math.round((earnedScore / totalScore) * 100);
const scoreRating = finalScore >= 90 ? "Gold-ready" : finalScore >= 78 ? "Pass" : finalScore >= 68 ? "Needs rewrite" : "Fail";

console.log("==== check-xhs-copy ====");
console.log(`target: ${target}`);
console.log(`checks: ${checks.length - failed.length}/${checks.length} passed`);
console.log(`copy score: ${finalScore}/100 · ${scoreRating}`);

for (const check of checks) {
  console.log(`${check.ok ? "PASS" : "FAIL"} · ${check.label}`);
  if (!check.ok) console.log(`       fix: ${check.fix}`);
}

for (const item of scoreItems) {
  console.log(`${item.ok ? "SCORE" : "MISS"} · ${item.points}pt · ${item.label}`);
  if (!item.ok) console.log(`       improve: ${item.fix}`);
}

if (failed.length) {
  process.exit(1);
}

if (finalScore < 68) {
  process.exit(1);
}
