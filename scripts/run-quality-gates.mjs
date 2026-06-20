#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import process from "node:process";

const args = process.argv.slice(2);
let taskDir = "examples/swiss-agent-infra-full-candidate";
let skipPalettes = false;

for (const arg of args) {
  if (arg === "--skip-palettes") skipPalettes = true;
  else if (!arg.startsWith("--")) taskDir = arg;
}

const gates = [
  ["content plan", ["node", "scripts/check-content-plan.mjs", taskDir]],
  ["xhs copy", ["node", "scripts/check-xhs-copy.mjs", taskDir]],
  ["portrait fit", ["node", "scripts/check-portrait-fit.mjs", taskDir]],
  ["style routing", ["node", "scripts/check-style-routing.mjs"]],
  ["template inheritance", ["node", "scripts/check-template-inheritance.mjs"]],
  ["proof lab theme contract", ["node", "scripts/check-proof-lab-theme-contract.mjs"]],
  ["social deck", ["node", "scripts/validate-social-deck.mjs", taskDir]],
];

if (!skipPalettes) {
  gates.splice(3, 0,
    ["swiss palettes", ["node", "scripts/render-swiss-palette-validation.mjs"]],
    ["swiss okf brief", ["node", "scripts/render-swiss-okf-brief-validation.mjs"]],
    ["proof lab themes", ["node", "scripts/render-proof-lab-theme-validation.mjs"]],
    ["rednote native themes", ["node", "scripts/render-rednote-native-theme-validation.mjs"]],
    ["rednote native", ["node", "scripts/render-rednote-native-validation.mjs"]],
    ["lookbook journal", ["node", "scripts/render-lookbook-journal-validation.mjs"]],
  );
}
gates.splice(skipPalettes ? 3 : 7, 0, ["proof lab", ["node", "scripts/render-proof-lab-validation.mjs"]]);

const failed = [];

for (const [label, command] of gates) {
  console.log(`\n==== quality gate: ${label} ====`);
  const result = spawnSync(command[0], command.slice(1), {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: "inherit",
  });
  if (result.status !== 0) {
    failed.push(label);
    break;
  }
}

if (failed.length) {
  console.error(`\nQuality gates failed: ${failed.join(", ")}`);
  process.exit(1);
}

console.log("\nAll quality gates passed.");
