#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const swissPath = path.join(root, "assets", "template-swiss-system.html");
const swiss = fs.readFileSync(swissPath, "utf8");
const visualSystems = fs.readFileSync(path.join(root, "references", "visual-systems.md"), "utf8");

const failures = [];

const swissForbidden = [
  { pattern: /\.xhs-swiss-/g, reason: "Swiss template must not contain Keke-specific Swiss lookalike classes" },
  { pattern: /\.xhs-myth-/g, reason: "Swiss template must not contain rounded myth panel components" },
  { pattern: /\.xhs-check-/g, reason: "Swiss template must not contain pastel checklist components" },
  { pattern: /\.xhs-diagnosis-/g, reason: "Swiss template must not contain custom diagnosis board components" },
  { pattern: /font-weight:\s*9\d\d/g, reason: "Swiss template must not add 900-weight display styles" },
];

for (const rule of swissForbidden) {
  const matches = [...swiss.matchAll(rule.pattern)];
  if (matches.length > 0) {
    failures.push(`${rule.reason}: ${matches.length} match(es)`);
  }
}

const swissSection = visualSystems.match(/## Swiss System[\s\S]*?(?=\n## |\n$)/)?.[0] || "";
if (!swissSection.includes("Status: `template-locked`; Gold example: `pending`.")) {
  failures.push("Swiss System status must be `template-locked` with Gold example pending after template audit passes");
}

if (failures.length) {
  console.error("Template inheritance check failed:");
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}

console.log("Template inheritance check passed.");
