#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const fixtureDir = path.join(root, "examples", "proposal-confirmation-gate-validation");
const proposalPath = path.join(fixtureDir, "PROPOSAL.md");
const skillPath = path.join(root, "SKILL.md");
const contentPlanningPath = path.join(root, "references", "content-planning.md");

function read(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

const proposal = read(proposalPath);
const skill = read(skillPath);
const contentPlanning = read(contentPlanningPath);
const failures = [];

function requireText(label, text, needle) {
  if (!text.includes(needle)) failures.push(`${label}: missing "${needle}"`);
}

function requireAbsentPath(relPath, reason) {
  const absPath = path.join(fixtureDir, relPath);
  if (fs.existsSync(absPath)) failures.push(`${relPath} must not exist: ${reason}`);
}

requireText("PROPOSAL.md", proposal, "Status: `Pass / Workflow Gate`");
requireText("PROPOSAL.md", proposal, "## Pressure Scenario");
requireText("PROPOSAL.md", proposal, "## Proposal Response");
requireText("PROPOSAL.md", proposal, "### Recommended Visual System");
requireText("PROPOSAL.md", proposal, "### Recommended Card Count");
requireText("PROPOSAL.md", proposal, "### Page Plan");
requireText("PROPOSAL.md", proposal, "### Image Policy");
requireText("PROPOSAL.md", proposal, "### Copy Strategy");
requireText("PROPOSAL.md", proposal, "### Main Risks And QA Focus");
requireText("PROPOSAL.md", proposal, "你确认这套方案后，我再开始生成卡片图片和小红书文案。要按这个方案继续吗？");
requireText("PROPOSAL.md", proposal, "No rendered `output/images` should exist");

requireText("SKILL.md", skill, "### 5. Proposal Confirmation Gate");
requireText("SKILL.md", skill, "Do not build cards, render images, or write final `xiaohongshu-caption.md` until the user clearly confirms");
requireText("references/content-planning.md", contentPlanning, "## Proposal Confirmation Gate");
requireText("references/content-planning.md", contentPlanning, "Only after the user confirms should the task folder include final rendered cards and final Xiaohongshu publishing copy.");

requireAbsentPath("output/images", "proposal-only validation must not render images before confirmation");
requireAbsentPath("xiaohongshu-caption.md", "proposal-only validation must not write final publishing copy before confirmation");
requireAbsentPath("copy-variants.md", "proposal-only validation must not write final copy variants before confirmation");

if (failures.length) {
  console.error("Proposal confirmation gate check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Proposal confirmation gate check passed.");
