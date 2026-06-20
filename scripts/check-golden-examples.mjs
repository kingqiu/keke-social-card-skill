#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const docPath = path.join(root, "references", "golden-examples.md");
const doc = fs.readFileSync(docPath, "utf8");
const failures = [];

const requiredScenarios = [
  "AI tool launch",
  "AI workflow/tutorial",
  "Outfit/beauty/lifestyle",
  "Product/gear/food breakdown",
  "Opinion/framework",
  "Technical announcement/open spec",
  "Essay/culture/reading/travel",
];

const accepted = [
  ["AI tool launch", "examples/rednote-native-card-skill-launch-candidate"],
  ["AI workflow/tutorial", "examples/proof-lab-skill-handbook-candidate"],
  ["Outfit/beauty/lifestyle", "examples/lookbook-outfit-gold-candidate"],
  ["Opinion/framework", "examples/swiss-agent-infra-full-candidate"],
  ["Technical announcement/open spec", "examples/swiss-okf-brief-gold-candidate"],
];

const pending = [
  "Product/gear/food breakdown",
  "Essay/culture/reading/travel",
];

for (const scenario of requiredScenarios) {
  if (!doc.includes(`| ${scenario} |`)) failures.push(`required scenario missing from matrix: ${scenario}`);
}

for (const [scenario, rel] of accepted) {
  if (!doc.includes(`| ${scenario} | \`${rel}\` |`)) {
    failures.push(`accepted Gold reference missing for ${scenario}: ${rel}`);
  }
  const dir = path.join(root, rel);
  if (!fs.existsSync(dir)) {
    failures.push(`accepted Gold directory missing: ${rel}`);
    continue;
  }
  for (const file of [
    "BRIEF.md",
    "index.html",
    "QA.md",
    "xiaohongshu-caption.md",
    "copy-variants.md",
    "assets/IMAGE_REQUESTS.md",
    "assets/SOURCES.md",
  ]) {
    if (!fs.existsSync(path.join(dir, file))) failures.push(`${rel} missing ${file}`);
  }
  const imageDir = path.join(dir, "output", "images");
  const imageCount = fs.existsSync(imageDir)
    ? fs.readdirSync(imageDir).filter(name => name.endsWith(".png")).length
    : 0;
  if (imageCount < 1) failures.push(`${rel} missing rendered output/images/*.png`);
  const qaPath = path.join(dir, "QA.md");
  if (fs.existsSync(qaPath) && !/Gold/i.test(fs.readFileSync(qaPath, "utf8"))) {
    failures.push(`${rel}/QA.md must declare Gold status`);
  }
}

if (!doc.includes("Coverage gaps:")) failures.push("golden-examples.md must include Coverage gaps");
for (const scenario of pending) {
  if (!doc.includes(`| ${scenario} | Pending |`)) {
    failures.push(`pending coverage gap missing: ${scenario}`);
  }
}

if (failures.length) {
  console.error("Golden example check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Golden example check passed.");
