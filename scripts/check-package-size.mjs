#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const failures = [];
const warnings = [];
const rows = [];

const ignoreDirs = new Set([".git", "node_modules", ".DS_Store"]);

function walk(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoreDirs.has(entry.name)) continue;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      total += walk(abs);
      continue;
    }
    if (!entry.isFile()) continue;
    const size = fs.statSync(abs).size;
    rows.push({ rel: path.relative(root, abs), size });
    total += size;
  }
  return total;
}

function sizeOf(rel) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) return 0;
  if (fs.statSync(abs).isFile()) return fs.statSync(abs).size;
  let total = 0;
  const stack = [abs];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (ignoreDirs.has(entry.name)) continue;
      const child = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(child);
      else if (entry.isFile()) total += fs.statSync(child).size;
    }
  }
  return total;
}

function mb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

const total = walk(root);
const assets = sizeOf("assets");
const examples = sizeOf("examples");
const fonts = sizeOf("assets/fonts");
const topFiles = rows.sort((a, b) => b.size - a.size).slice(0, 12);

if (total > 250 * 1024 * 1024) failures.push(`repository package is ${mb(total)} > 250 MB`);
if (examples > 180 * 1024 * 1024) warnings.push(`examples folder is ${mb(examples)}; consider pruning rendered experiments before release`);
if (fonts > 12 * 1024 * 1024) failures.push(`font assets are ${mb(fonts)} > 12 MB; rebuild subsets`);
for (const file of topFiles) {
  if (file.size > 20 * 1024 * 1024) warnings.push(`${file.rel} is ${mb(file.size)}; large binary should be intentional`);
}

console.log("==== check-package-size ====");
console.log(`total tracked package estimate: ${mb(total)}`);
console.log(`assets: ${mb(assets)} · examples: ${mb(examples)} · fonts: ${mb(fonts)}`);
console.log("largest files:");
for (const file of topFiles) {
  console.log(`- ${mb(file.size)}  ${file.rel}`);
}

for (const warning of warnings) console.log(`WARN · ${warning}`);
for (const failure of failures) console.log(`FAIL · ${failure}`);

if (failures.length) process.exit(1);
