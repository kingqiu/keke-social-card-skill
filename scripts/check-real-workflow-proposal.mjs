#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import process from "node:process";

const root = process.cwd();
const fixture = path.join("examples", "real-workflow-proposal-validation");
const articlePath = path.join(root, fixture, "ARTICLE.md");
const proposalPath = path.join(root, fixture, "PROPOSAL.md");
const failures = [];

if (!fs.existsSync(articlePath)) failures.push(`${fixture}/ARTICLE.md missing`);
if (!fs.existsSync(proposalPath)) failures.push(`${fixture}/PROPOSAL.md missing`);

if (fs.existsSync(articlePath)) {
  const article = fs.readFileSync(articlePath, "utf8");
  if (!/先给方案|不能直接生成|方案阶段/.test(article)) {
    failures.push("ARTICLE.md must describe the proposal-first pressure scenario");
  }
}

const result = spawnSync("node", ["scripts/check-proposal-quality.mjs", fixture], {
  cwd: root,
  encoding: "utf8",
  stdio: "inherit",
});

if (result.status !== 0) failures.push("proposal quality check failed for real workflow fixture");

if (failures.length) {
  console.error("Real workflow proposal check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Real workflow proposal check passed.");
