#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const target = process.argv[2];

if (!target) {
  console.error("Usage: node scripts/check-route-decision.mjs <task-dir>");
  process.exit(2);
}

const root = path.resolve(process.cwd(), target);
const briefPath = path.join(root, "BRIEF.md");
const qaPath = path.join(root, "QA.md");

function read(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function routeBlock(text) {
  const match = text.match(/(?:^|\n)## +Route Decision\s*\n([\s\S]*?)(?=\n## +|$)/i);
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

const brief = read(briefPath);
const qa = read(qaPath);
const block = routeBlock(brief) || routeBlock(qa);
const checks = [];

function add(ok, label, fix) {
  checks.push({ ok, label, fix });
}

add(Boolean(brief), "BRIEF.md exists", "Create BRIEF.md with source, page plan, and route decision.");
add(Boolean(block), "Route Decision block exists", "Add '## Route Decision' to BRIEF.md with route fields.");

const requiredFields = [
  "visualSystem",
  "theme",
  "recipeSequence",
  "imagePolicy",
  "copyStrategy",
  "qaFocus",
  "confidence",
  "matchedKeywords",
];

const values = {};
for (const field of requiredFields) {
  values[field] = fieldValue(block, field);
  add(Boolean(values[field]), `Route field ${field}`, `Add '${field}: ...' under ## Route Decision.`);
}

const allowedSystems = [
  "Editorial E-ink",
  "Swiss System",
  "Rednote Native",
  "Proof Lab",
  "Lookbook Journal",
];
if (values.visualSystem) {
  add(
    allowedSystems.includes(values.visualSystem),
    "visualSystem is a known system",
    `Use one of: ${allowedSystems.join(", ")}.`,
  );
}

if (values.confidence) {
  add(
    /^(high|medium|low)$/i.test(values.confidence),
    "confidence is high/medium/low",
    "Set confidence to high, medium, or low.",
  );
}

const subTemplate = fieldValue(block, "subTemplate");
if (/OKF|open specification|开放规范|技术公告/i.test(`${brief}\n${values.recipeSequence}\n${values.matchedKeywords}`)) {
  add(
    /Swiss OKF Brief/i.test(subTemplate) || /Swiss OKF Brief/i.test(values.recipeSequence),
    "Open-spec routes declare Swiss OKF Brief when applicable",
    "For public format/spec explainers, set subTemplate: Swiss OKF Brief.",
  );
}

add(
  /source|keyword|reader|proof|hook|asset|format|screenshot|result|framework|lifestyle|essay|读者|证据|截图|结果|格式|框架|情绪|生活/i.test(values.matchedKeywords || ""),
  "matchedKeywords include route evidence",
  "matchedKeywords should record the source cues or reader job that made this route win.",
);

const failed = checks.filter(check => !check.ok);

console.log("==== check-route-decision ====");
console.log(`target: ${target}`);
console.log(`checks: ${checks.length - failed.length}/${checks.length} passed`);
if (block) {
  console.log(`route: ${values.visualSystem || "(missing)"}${subTemplate ? ` / ${subTemplate}` : ""} · ${values.theme || "(missing theme)"} · confidence ${values.confidence || "(missing)"}`);
}

for (const check of checks) {
  console.log(`${check.ok ? "PASS" : "FAIL"} · ${check.label}`);
  if (!check.ok) console.log(`       fix: ${check.fix}`);
}

if (failed.length) process.exit(1);
