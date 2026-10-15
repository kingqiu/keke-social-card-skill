#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

// Structural/provenance gate for raster cards. It cannot OCR or judge aesthetics.
export function checkHanddrawnDeck(taskDir) {
  const root = path.resolve(taskDir);
  const failures = [];
  const insideFile = (relative, label) => {
    if (typeof relative !== "string" || !relative || path.isAbsolute(relative)) {
      failures.push(`${label}: expected relative path`); return null;
    }
    const abs = path.resolve(root, relative);
    if (!abs.startsWith(root + path.sep) || !fs.existsSync(abs) || !fs.statSync(abs).isFile()) {
      failures.push(`${label}: missing or outside task: ${relative}`); return null;
    }
    if (!fs.realpathSync(abs).startsWith(fs.realpathSync(root) + path.sep)) {
      failures.push(`${label}: linked file outside task`); return null;
    }
    return abs;
  };
  let manifest;
  try { manifest = JSON.parse(fs.readFileSync(path.join(root, "deck-manifest.json"), "utf8")); }
  catch { return ["Missing or invalid deck-manifest.json"]; }
  if (manifest.visualSystem !== "Handdrawn Insight" || manifest.renderMode !== "imagegen-full-card") {
    failures.push("Manifest must declare Handdrawn Insight / imagegen-full-card");
  }
  for (const rel of ["BRIEF.md", "QA.md", "assets/SOURCES.md", "assets/IMAGE_REQUESTS.md"]) {
    const file = insideFile(rel, rel);
    if (file && !fs.readFileSync(file, "utf8").trim()) failures.push(`${rel}: empty`);
  }
  const briefPath = path.join(root, "BRIEF.md");
  const brief = fs.existsSync(briefPath) ? fs.readFileSync(briefPath, "utf8") : "";
  if (!/^\s*-?\s*visualSystem:\s*Handdrawn Insight\s*$/m.test(brief)) failures.push("BRIEF route mismatch");
  const confirmation = brief.match(/## Proposal Confirmation\s*\n([\s\S]*?)(?=\n## |$)/)?.[1] || "";
  if (!/^\s*-?\s*status:\s*(confirmed|waived)\s*$/m.test(confirmation)) failures.push("Proposal confirmation or explicit waiver not recorded");
  const caption = insideFile(manifest.captionFile, "selected caption");
  if (caption) {
    const text = fs.readFileSync(caption, "utf8");
    const section = names => text.match(new RegExp(`(?:^|\\n)#{1,2} (?:${names})\\s*\\n([\\s\\S]*?)(?=\\n#{1,2} |$)`))?.[1]?.trim() || "";
    const title = section("小红书标题|标题");
    const body = section("正文|小红书正文|小红书文案");
    const tags = section("标签|小红书标签");
    if (!title || [...title].length > 20) failures.push("Selected caption needs a title of 1–20 characters (document longer-title exceptions for manual review)");
    if (!body || [...body.replace(/\s/g, "")].length > 1000) failures.push("Selected caption body must be nonempty and within 1000 characters");
    const tagCount = (tags.match(/#[\p{L}\p{N}_-]+/gu) || []).length;
    if (tagCount < 5 || tagCount > 8) failures.push("Selected caption needs 5–8 tags");
  }
  const cards = Array.isArray(manifest.cards) ? manifest.cards : [];
  if (!cards.length) failures.push("Ordered card manifest is empty");
  if (cards[0]?.role !== "cover") failures.push("First card must be the selected cover");
  const selected = new Set();
  const directories = new Set();
  for (const [i, card] of cards.entries()) {
    const label = `card ${i + 1}`;
    const file = insideFile(card.file, label);
    if (selected.has(card.file)) failures.push(`${label}: duplicate image`);
    selected.add(card.file);
    if (!["cover", "insight", "comparison", "case", "summary"].includes(card.role)) failures.push(`${label}: unknown role`);
    if (typeof card.title !== "string" || !card.title.trim() || typeof card.sourceAnchor !== "string" || !card.sourceAnchor.trim()) failures.push(`${label}: title or source anchor missing`);
    const prompt = insideFile(card.promptFile, `${label} prompt`);
    if (prompt && !fs.readFileSync(prompt, "utf8").trim()) failures.push(`${label}: empty prompt`);
    if (!file) continue;
    directories.add(path.dirname(file));
    const data = fs.readFileSync(file);
    if (data.length < 24 || !data.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) {
      failures.push(`${label}: expected PNG`); continue;
    }
    const width = data.readUInt32BE(16), height = data.readUInt32BE(20);
    if (width < 1080 || height < 1440 || Math.abs(width / height - 0.75) > 0.005) failures.push(`${label}: insufficient resolution or non-3:4 ratio`);
    const sha = crypto.createHash("sha256").update(data).digest("hex");
    if (card.review?.sha256 !== sha) failures.push(`${label}: missing/stale visual review hash`);
    for (const field of ["textCorrect", "attributionCorrect", "portraitCorrect", "readable", "styleConsistent"]) {
      if (card.review?.[field] !== true) failures.push(`${label}: manual review required: ${field}`);
    }
  }
  for (const dir of directories) {
    for (const name of fs.readdirSync(dir)) {
      if (!/\.(png|jpe?g|webp)$/i.test(name)) continue;
      const rel = path.relative(root, path.join(dir, name));
      if (!selected.has(rel)) failures.push(`Unselected image in delivery directory: ${rel}`);
    }
  }
  return failures;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  if (!process.argv[2]) { console.error("Usage: node scripts/check-handdrawn-deck.mjs <task-dir>"); process.exit(2); }
  const failures = checkHanddrawnDeck(process.argv[2]);
  for (const failure of failures) console.error(`FAIL · ${failure}`);
  if (failures.length) process.exit(1);
  console.log("PASS · raster manifest, files, dimensions, caption, sources and image-bound manual-review records");
  console.log("Limit: not OCR, DOM typography validation or independent visual approval.");
}
