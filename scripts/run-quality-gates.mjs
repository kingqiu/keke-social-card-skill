#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import process from "node:process";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
let taskDir = "examples/swiss-agent-infra-full-candidate";
let skipPalettes = false;

for (const arg of args) {
  if (arg === "--skip-palettes") skipPalettes = true;
  else if (!arg.startsWith("--")) taskDir = arg;
}

// Raster generation is a separate validation branch, not an HTML exception.
const briefFile = path.join(taskDir, "BRIEF.md");
const manifestFile = path.join(taskDir, "deck-manifest.json");
const briefText = fs.existsSync(briefFile) ? fs.readFileSync(briefFile, "utf8") : "";
let manifestSystem = "";
if (fs.existsSync(manifestFile)) {
  try { manifestSystem = JSON.parse(fs.readFileSync(manifestFile, "utf8")).visualSystem; }
  catch { console.error("Invalid deck-manifest.json"); process.exit(1); }
}
if (/^\s*-?\s*visualSystem:\s*Handdrawn Insight\s*$/m.test(briefText) || manifestSystem === "Handdrawn Insight") {
  for (const script of ["scripts/check-route-decision.mjs", "scripts/check-handdrawn-deck.mjs"]) {
    const result = spawnSync(process.execPath, [script, taskDir], { cwd: process.cwd(), stdio: "inherit" });
    if (result.status !== 0) process.exit(result.status || 1);
  }
  console.log("Handdrawn structural checks passed; manual image/text inspection remains required.");
  process.exit(0);
}

const gates = [
  ["route decision", ["node", "scripts/check-route-decision.mjs", taskDir]],
  ["content plan", ["node", "scripts/check-content-plan.mjs", taskDir]],
  ["aesthetic qa", ["node", "scripts/check-aesthetic-qa.mjs", taskDir]],
  ["xhs copy", ["node", "scripts/check-xhs-copy.mjs", taskDir]],
  ["portrait fit", ["node", "scripts/check-portrait-fit.mjs", taskDir]],
];

if (!skipPalettes) {
  gates.push(
    ["swiss palettes", ["node", "scripts/render-swiss-palette-validation.mjs"]],
    ["swiss okf brief", ["node", "scripts/render-swiss-okf-brief-validation.mjs"]],
    ["proof lab themes", ["node", "scripts/render-proof-lab-theme-validation.mjs"]],
    ["rednote native themes", ["node", "scripts/render-rednote-native-theme-validation.mjs"]],
    ["rednote native", ["node", "scripts/render-rednote-native-validation.mjs"]],
    ["lookbook journal", ["node", "scripts/render-lookbook-journal-validation.mjs"]],
  );
}

gates.push(
  ["proof lab", ["node", "scripts/render-proof-lab-validation.mjs"]],
  ["local fonts", ["node", "scripts/check-local-fonts.mjs"]],
  ["golden examples", ["node", "scripts/check-golden-examples.mjs"]],
  ["proposal confirmation gate", ["node", "scripts/check-proposal-confirmation-gate.mjs"]],
  ["proposal quality", ["node", "scripts/check-proposal-quality.mjs", "examples/proposal-confirmation-gate-validation"]],
  ["real workflow proposal", ["node", "scripts/check-real-workflow-proposal.mjs"]],
  ["create task scaffold", ["node", "scripts/check-create-task-scaffold.mjs"]],
  ["style routing", ["node", "scripts/check-style-routing.mjs"]],
  ["handdrawn routing", ["node", "scripts/check-handdrawn-routing.mjs"]],
  ["template inheritance", ["node", "scripts/check-template-inheritance.mjs"]],
  ["proof lab theme contract", ["node", "scripts/check-proof-lab-theme-contract.mjs"]],
  ["regression suite", ["node", "scripts/run-regression-suite.mjs"]],
  ["package size", ["node", "scripts/check-package-size.mjs"]],
  ["social deck", ["node", "scripts/validate-social-deck.mjs", taskDir]],
);

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
