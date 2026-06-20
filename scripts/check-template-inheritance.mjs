#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const swissPath = path.join(root, "assets", "template-swiss-system.html");
const swiss = fs.readFileSync(swissPath, "utf8");
const proofLabPath = path.join(root, "assets", "template-proof-lab.html");
const proofLab = fs.readFileSync(proofLabPath, "utf8");
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
if (!swissSection.includes("Status: `locked`; Gold example: `examples/swiss-agent-infra-full-candidate`.")) {
  failures.push("Swiss System status must be `locked` with the accepted Gold example path");
}

const proofLabForbidden = [
  { pattern: /\.xhs-proof-/g, reason: "Proof Lab template must not contain Keke-specific proof lookalike classes" },
  { pattern: /fake\s+robot|机器人|bot\s*art/gi, reason: "Proof Lab template must not depend on fake robot art" },
];

for (const rule of proofLabForbidden) {
  const matches = [...proofLab.matchAll(rule.pattern)];
  if (matches.length > 0) {
    failures.push(`${rule.reason}: ${matches.length} match(es)`);
  }
}

for (const required of [".pl-evidence-hero", ".pl-step-flow", ".pl-before-after", ".brand-signature::before"]) {
  if (!proofLab.includes(required)) {
    failures.push(`Proof Lab template missing required primitive ${required}`);
  }
}

if (!/\.pl-before-after\s+\.pl-shot-box\s*\{[^}]*flex:\s*0\s+0\s+\d+px;[^}]*height:\s*\d+px;/s.test(proofLab)) {
  failures.push("Proof Lab before/after image boxes must use a fixed shared height so paired images align even when captions have different line counts");
}

const proofLabSection = visualSystems.match(/## Proof Lab[\s\S]*?(?=\n## |\n$)/)?.[0] || "";
if (!proofLabSection.includes("Status: `locked`; Gold example: `examples/proof-lab-skill-handbook-candidate`.")) {
  failures.push("Proof Lab status must be `locked` with the accepted Gold example path");
}

if (failures.length) {
  console.error("Template inheritance check failed:");
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}

console.log("Template inheritance check passed.");
