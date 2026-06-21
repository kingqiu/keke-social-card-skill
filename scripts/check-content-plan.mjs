#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const target = process.argv[2];

if (!target) {
  console.error("Usage: node scripts/check-content-plan.mjs <task-dir>");
  process.exit(2);
}

const root = path.resolve(process.cwd(), target);
const briefPath = path.join(root, "BRIEF.md");
const qaPath = path.join(root, "QA.md");

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

const brief = read(briefPath);
const qa = read(qaPath);

add(Boolean(brief), "BRIEF.md exists", "Create BRIEF.md with source notes, card count rationale, and page plan.");
add(Boolean(qa), "QA.md exists", "Create QA.md with content coverage and visual QA notes.");

if (brief) {
  add(/## +Proposal Confirmation/i.test(brief), "BRIEF records proposal confirmation", "Add a Proposal Confirmation section before building rendered cards or final copy.");
  add(/requiredBeforeBuild\s*:\s*(yes|true)/i.test(brief), "Proposal confirmation marks requiredBeforeBuild", "Set requiredBeforeBuild: yes unless the user explicitly waived the confirmation gate.");
  add(/status\s*:\s*(confirmed|waived|legacy-confirmed)/i.test(brief), "Proposal confirmation status is confirmed or waived", "Set status: confirmed after user approval, or waived only when the user explicitly skipped confirmation.");
  add(/confirmationSource\s*:/i.test(brief), "Proposal confirmation records source", "Record how the user confirmed or waived the proposal.");
  add(/Card Count/i.test(brief), "BRIEF explains card count", "Add a Card Count section explaining why this deck uses this many cards.");
  add(/Page Plan/i.test(brief), "BRIEF contains page plan", "Add a Page Plan table before building cards.");
  add(/\|\s*Card\s*\|\s*Role\s*\|\s*Source anchor\s*\|\s*Must carry\s*\|\s*Reader sentence\s*\|\s*Visual proof\s*\|\s*Cut\s*\|/i.test(brief), "Page plan uses required columns", "Use columns: Card | Role | Source anchor | Must carry | Reader sentence | Visual proof | Cut.");
  add(/Cover/i.test(brief) || /封面/.test(brief), "Page plan includes cover", "Map card 1 to the cover role.");
  add(/Source anchor/i.test(brief), "Page plan records source anchors", "Map each non-cover card to a source heading, paragraph, image, or user note.");
}

if (qa) {
  add(/Content Coverage/i.test(qa), "QA includes content coverage", "Add a Content Coverage section.");
  add(/omitted|compressed|省略|压缩/i.test(qa), "QA names omitted or compressed material", "Name what was omitted or compressed, even when the answer is 'none'.");
  add(/unsupported|invented|Claims invented|未支持|编造/i.test(qa), "QA checks unsupported claims", "State whether any claims, numbers, examples, or endorsements were added beyond the source.");
}

const failed = checks.filter((check) => !check.ok);

console.log("==== check-content-plan ====");
console.log(`target: ${target}`);
console.log(`checks: ${checks.length - failed.length}/${checks.length} passed`);

for (const check of checks) {
  console.log(`${check.ok ? "PASS" : "FAIL"} · ${check.label}`);
  if (!check.ok) console.log(`       fix: ${check.fix}`);
}

if (failed.length) {
  process.exit(1);
}
