#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const fontsDir = path.join(root, "assets", "fonts");
const subsetTextPath = path.join(fontsDir, "subset-chars.txt");
const pyftsubset = process.env.PYFTSUBSET || "pyftsubset";
const removeTtf = process.argv.includes("--remove-ttf");

const includeExt = new Set([".css", ".html", ".js", ".json", ".md", ".mjs", ".txt"]);
const excludedParts = new Set([".git", "node_modules", "output", "fonts"]);

const safetyText = `
「两克伴」出品
小红书封面卡片标题正文注释配色场景证据方法流程案例结果对比总结观点清单步骤
人工智能模型工具工作流写作阅读旅行文化产品器物美食咖啡穿搭职场教程说明发布
一二三四五六七八九十年月日上下左右中英文数字图片素材来源风险提醒适用不适用
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
，。！？；：、（）《》“”‘’·—-+×/|[]{}.,!?;:'"@#$%&*=<>~_ 
`;

function shouldSkip(filePath) {
  const rel = path.relative(root, filePath);
  return rel.split(path.sep).some(part => excludedParts.has(part));
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (shouldSkip(full)) continue;
    if (entry.isDirectory()) walk(full, files);
    else if (includeExt.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

const chars = new Set(safetyText);
for (const file of walk(root)) {
  const text = fs.readFileSync(file, "utf8");
  for (const char of text) chars.add(char);
}

const subsetText = [...chars].sort().join("");
fs.writeFileSync(subsetTextPath, subsetText + "\n");

const fontFiles = [];
function collectFonts(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectFonts(full);
    else if (entry.name.endsWith(".ttf")) fontFiles.push(full);
  }
}
collectFonts(fontsDir);

if (!fontFiles.length) {
  console.log("No .ttf fonts found. Nothing to subset.");
  process.exit(0);
}

for (const fontFile of fontFiles) {
  const out = fontFile.replace(/\.ttf$/i, ".woff2");
  const result = spawnSync(pyftsubset, [
    fontFile,
    `--text-file=${subsetTextPath}`,
    "--layout-features=*",
    "--flavor=woff2",
    `--output-file=${out}`,
  ], { stdio: "inherit" });

  if (result.status !== 0) {
    console.error(`Failed to subset ${path.relative(root, fontFile)}`);
    process.exit(result.status || 1);
  }
}

const cssPath = path.join(fontsDir, "keke-fonts.css");
const css = fs.readFileSync(cssPath, "utf8")
  .replaceAll(".ttf", ".woff2")
  .replaceAll('format("truetype")', 'format("woff2")');
fs.writeFileSync(cssPath, css);

if (removeTtf) {
  for (const fontFile of fontFiles) fs.rmSync(fontFile);
}

console.log(`Subset text chars: ${chars.size}`);
console.log(`Generated ${fontFiles.length} WOFF2 font files.`);
