#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const target = process.argv[2];

if (!target) {
  console.error("Usage: node scripts/check-portrait-fit.mjs <task-dir>");
  process.exit(2);
}

const root = path.resolve(process.cwd(), target);
const htmlPath = path.join(root, "index.html");
const requestsPath = path.join(root, "assets", "IMAGE_REQUESTS.md");
const failures = [];

function read(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function parseImageRequests(text) {
  const decisions = new Map();
  if (!text) return decisions;

  for (const block of text.matchAll(/```text\s*([\s\S]*?)```/g)) {
    const raw = block[1];
    const assetLine = raw.match(/^asset:\s*(.+)$/m)?.[1]?.trim();
    if (!assetLine) continue;
    const decision = raw.match(/^portrait-fit decision:\s*(.+)$/m)?.[1]?.trim() || "";
    const reason = raw.match(/^reason:\s*(.+)$/m)?.[1]?.trim() || "";
    const assets = assetLine
      .split(/\s*\/\s*/)
      .map(value => value.trim())
      .filter(Boolean);
    for (const asset of assets) {
      decisions.set(asset, { decision, reason, raw });
    }
  }

  return decisions;
}

function parseReferencedImages(html) {
  const images = [];
  const sectionPattern = /<section\b([^>]*)>([\s\S]*?)(?=<section\b|<\/body>)/gi;
  let sectionIndex = 0;
  for (const sectionMatch of html.matchAll(sectionPattern)) {
    sectionIndex += 1;
    const attrs = sectionMatch[1] || "";
    const body = sectionMatch[2] || "";
    const id = attrs.match(/\bid="([^"]+)"/)?.[1] || `section-${sectionIndex}`;
    const name = attrs.match(/\bdata-name="([^"]+)"/)?.[1] || id;
    const isCover = sectionIndex === 1 || /\bcover\b/.test(attrs) || /cover/i.test(name);
    for (const imgMatch of body.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/gi)) {
      images.push({ src: imgMatch[1], section: id, isCover });
    }
  }
  return images;
}

function pngSize(buffer) {
  if (buffer.length < 24) return null;
  if (buffer.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function jpgSize(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) return null;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  return null;
}

function svgSize(text) {
  const svg = text.match(/<svg\b([^>]*)>/i)?.[1] || "";
  const width = Number(svg.match(/\bwidth="([0-9.]+)"/i)?.[1]);
  const height = Number(svg.match(/\bheight="([0-9.]+)"/i)?.[1]);
  if (width > 0 && height > 0) return { width, height };
  const viewBox = svg.match(/\bviewBox="([0-9.\s-]+)"/i)?.[1]?.trim().split(/\s+/).map(Number);
  if (viewBox?.length === 4 && viewBox[2] > 0 && viewBox[3] > 0) {
    return { width: viewBox[2], height: viewBox[3] };
  }
  return null;
}

function imageSize(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const buffer = fs.readFileSync(filePath);
  if (ext === ".png") return pngSize(buffer);
  if (ext === ".jpg" || ext === ".jpeg") return jpgSize(buffer);
  if (ext === ".svg") return svgSize(buffer.toString("utf8"));
  return null;
}

const html = read(htmlPath);
if (!html) {
  console.error(`not found: ${htmlPath}`);
  process.exit(2);
}

const decisions = parseImageRequests(read(requestsPath));
const images = parseReferencedImages(html);

for (const image of images) {
  const rel = image.src.replace(/^\.\//, "");
  if (/^https?:/i.test(rel) || rel.startsWith("data:")) continue;

  const imagePath = path.resolve(root, rel);
  if (!fs.existsSync(imagePath)) {
    failures.push(`${image.section}: image not found: ${image.src}`);
    continue;
  }

  const size = imageSize(imagePath);
  if (!size) continue;

  const ratio = size.width / size.height;
  const filename = path.basename(rel);
  const decision = decisions.get(filename) || decisions.get(rel);
  const isLandscape = ratio >= 1.2;
  const ext = path.extname(rel).toLowerCase();

  if (decision && /^redrawn asset\b/i.test(decision.decision) && ext === ".svg") {
    failures.push(`${image.section}: redrawn source illustration ${rel} is SVG; use a bitmap PNG/JPG/WebP asset unless this is a tiny structural icon`);
  }

  if (!isLandscape) continue;

  if (!decision) {
    failures.push(`${image.section}: landscape image ${rel} (${size.width}x${size.height}) missing portrait-fit decision in assets/IMAGE_REQUESTS.md`);
    continue;
  }

  if (!/^(redraw|recompose|split|keep-landscape|redrawn asset)\b/i.test(decision.decision)) {
    failures.push(`${image.section}: landscape image ${rel} has unsupported portrait-fit decision "${decision.decision}"`);
  }

  if (/before gold|todo|pending/i.test(decision.decision)) {
    failures.push(`${image.section}: landscape image ${rel} still has unresolved decision "${decision.decision}"`);
  }

  if (
    /keep-landscape/i.test(decision.decision)
    && !/source evidence|evidence diagram|proof diagram|原始证据|来源证据|证明图|图表证据/i.test(decision.reason)
    && /supporting|auxiliary|concept|illustration|mood|hero|cover|comparison|辅助|概念|插图|解释|对比/i.test(decision.reason)
  ) {
    failures.push(`${image.section}: landscape image ${rel} is described as auxiliary/concept/comparison art; redraw or recompose instead of keep-landscape`);
  }

  if (image.isCover && /keep-landscape/i.test(decision.decision)) {
    failures.push(`${image.section}: cover uses landscape image ${rel}; redraw or recompose instead of keep-landscape`);
  }

  if (!decision.reason) {
    failures.push(`${image.section}: landscape image ${rel} decision missing reason`);
  }
}

console.log("==== check-portrait-fit ====");
console.log(`target: ${target}`);
console.log(`referenced images: ${images.length}`);

if (failures.length) {
  for (const failure of failures) console.error(`FAIL · ${failure}`);
  process.exit(1);
}

console.log("PASS · all referenced landscape images have acceptable portrait-fit decisions");
