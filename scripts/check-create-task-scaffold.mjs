#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import process from "node:process";

const root = process.cwd();
const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "keke-task-scaffold-"));
const taskDir = path.join(tmpRoot, "demo-task");
const relTaskDir = path.relative(root, taskDir);

const create = spawnSync("node", [
  "scripts/create-task.mjs",
  "--dir", relTaskDir,
  "--name", "Demo Task",
  "--source", "article.md",
  "--system", "Swiss System",
  "--sub-template", "Swiss Anthropic Clay",
  "--theme", "anthropic-clay",
], {
  cwd: root,
  encoding: "utf8",
  stdio: "inherit",
});

const failures = [];
if (create.status !== 0) failures.push("create-task command failed");

for (const rel of [
  "PROPOSAL.md",
  "BRIEF.md",
  "assets/SOURCES.md",
  "assets/IMAGE_REQUESTS.md",
]) {
  if (!fs.existsSync(path.join(taskDir, rel))) failures.push(`scaffold missing ${rel}`);
}

for (const rel of [
  "output/images",
  "xiaohongshu-caption.md",
  "copy-variants.md",
  "QA.md",
]) {
  if (fs.existsSync(path.join(taskDir, rel))) failures.push(`proposal-stage scaffold must not create ${rel}`);
}

const proposal = fs.existsSync(path.join(taskDir, "PROPOSAL.md"))
  ? fs.readFileSync(path.join(taskDir, "PROPOSAL.md"), "utf8")
  : "";
const brief = fs.existsSync(path.join(taskDir, "BRIEF.md"))
  ? fs.readFileSync(path.join(taskDir, "BRIEF.md"), "utf8")
  : "";

if (!proposal.includes("你确认这套方案后，我再开始生成卡片图片和小红书文案。要按这个方案继续吗？")) {
  failures.push("scaffold proposal missing fixed confirmation question");
}
if (!/status:\s*pending/i.test(brief)) failures.push("scaffold BRIEF must keep confirmation status pending");

fs.rmSync(tmpRoot, { recursive: true, force: true });

if (failures.length) {
  console.error("Create-task scaffold check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Create-task scaffold check passed.");
