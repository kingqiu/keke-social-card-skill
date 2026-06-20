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

const checks = [];

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

function section(text, heading) {
  const pattern = new RegExp(`(?:^|\\n)# +${heading}\\s*\\n([\\s\\S]*?)(?=\\n# +[^#\\s]|$)`);
  return text.match(pattern)?.[1]?.trim() ?? "";
}

function countHashtags(text) {
  return [...text.matchAll(/#[\p{L}\p{N}_\-\u4e00-\u9fff]+/gu)].map((match) => match[0]);
}

const caption = read(captionPath);
const variants = read(variantsPath);
const qa = read(qaPath);

add(Boolean(caption), "xiaohongshu-caption.md exists", "Create xiaohongshu-caption.md with title, body, hashtags, and publishing notes when relevant.");
add(Boolean(variants), "copy-variants.md exists", "Create copy-variants.md with title options, opening options, CTA prompts, and hashtag sets.");
add(Boolean(qa), "QA.md exists", "Create QA.md with copy QA notes.");

if (caption) {
  const title = section(caption, "小红书标题");
  const body = section(caption, "正文");
  const tagsSection = section(caption, "标签");
  const hashtags = countHashtags(tagsSection || caption);

  add(Boolean(title), "Caption has title section", "Add '# 小红书标题' with one final title.");
  add([...title].length >= 8 && [...title].length <= 40, "Title length is reasonable", "Keep final title roughly 8-40 Chinese characters.");
  add(!riskyTitleWords.some((word) => title.includes(word)), "Title avoids risky clickbait words", "Remove unsupported absolutes or low-quality bait words from the title.");
  add(Boolean(body), "Caption has body section", "Add '# 正文' with hook, promise, takeaways, limitation if relevant, and CTA.");
  add(body.length >= 120, "Caption body is substantial", "Write enough body copy to explain the post without relying on the cards alone.");
  add(/评论|你觉得|你会|你最|留言|想看|欢迎|一起聊|你关注/i.test(body), "Caption includes natural CTA", "End with a natural comment prompt or discussion question.");
  add(Boolean(tagsSection), "Caption has hashtag section", "Add '# 标签' with 5-8 relevant tags.");
  add(hashtags.length >= 5 && hashtags.length <= 8, "Hashtag count is 5-8", "Use 5-8 relevant hashtags; avoid stuffing unrelated hot tags.");
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

console.log("==== check-xhs-copy ====");
console.log(`target: ${target}`);
console.log(`checks: ${checks.length - failed.length}/${checks.length} passed`);

for (const check of checks) {
  console.log(`${check.ok ? "PASS" : "FAIL"} · ${check.label}`);
  if (!check.ok) console.log(`       fix: ${check.fix}`);
}

if (failed.length) {
  process.exit(1);
}
