#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import process from "node:process";

const examples = [
  "examples/rednote-native-card-skill-launch-candidate",
  "examples/proof-lab-skill-handbook-candidate",
  "examples/lookbook-coffee-gear-gold-candidate",
  "examples/swiss-okf-brief-gold-candidate",
  "examples/editorial-reading-travel-gold-candidate",
];

const checks = [
  ["route decision", "scripts/check-route-decision.mjs"],
  ["content plan", "scripts/check-content-plan.mjs"],
  ["xhs copy", "scripts/check-xhs-copy.mjs"],
  ["social deck", "scripts/validate-social-deck.mjs"],
];

const failed = [];

for (const example of examples) {
  console.log(`\n==== regression target: ${example} ====`);
  for (const [label, script] of checks) {
    console.log(`-- ${label}`);
    const result = spawnSync("node", [script, example], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: "inherit",
    });
    if (result.status !== 0) {
      failed.push(`${example} / ${label}`);
      break;
    }
  }
  if (failed.length) break;
}

if (failed.length) {
  console.error(`\nRegression suite failed: ${failed.join(", ")}`);
  process.exit(1);
}

console.log("\nRegression suite passed.");
