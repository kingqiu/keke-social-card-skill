#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const args = process.argv.slice(2);

function usage() {
  console.error(`Usage:
  node scripts/create-task.mjs --dir <task-dir> --name <display-name> [--source <file-or-url>] [--system <visual-system>] [--theme <theme>] [--sub-template <name>]

Creates a proposal-stage task scaffold. It does not create final images, xiaohongshu-caption.md, or copy-variants.md.`);
  process.exit(2);
}

function option(name) {
  const index = args.indexOf(name);
  if (index === -1) return "";
  const value = args[index + 1];
  if (!value || value.startsWith("--")) usage();
  return value;
}

if (args.includes("--help") || args.includes("-h")) usage();

const taskDir = option("--dir");
const name = option("--name") || path.basename(taskDir || "");
const source = option("--source");
const visualSystem = option("--system") || "TBD";
const theme = option("--theme") || "TBD";
const subTemplate = option("--sub-template");

if (!taskDir || !name) usage();

const root = path.resolve(process.cwd(), taskDir);
if (fs.existsSync(root) && fs.readdirSync(root).length > 0) {
  console.error(`Refusing to overwrite non-empty directory: ${taskDir}`);
  process.exit(1);
}

fs.mkdirSync(path.join(root, "assets"), { recursive: true });

const today = new Date().toISOString().slice(0, 10);
const sourceLine = source ? `- Source: ${source}` : "- Source: TBD";
const subTemplateLine = subTemplate ? `- subTemplate: ${subTemplate}\n` : "";

const proposal = `# ${name} Proposal

Status: \`Draft / Proposal Only\`

## Source Summary

${sourceLine}
- Source type: TBD
- Reader job: TBD
- Material cues: TBD

## Concrete Reader

- Who: TBD
- Moment: TBD
- Pain/emotion: TBD
- Save/share reason: TBD
- Identity: TBD

## Value Translation

| Source / feature language | User translation |
|---|---|
| TBD | TBD |

## Shelf Test

- Stop reason: TBD
- Reader relevance: TBD
- Visible payoff: TBD
- Proof: TBD

## Search Intent Plan

- audience terms: TBD
- scene terms: TBD
- problem terms: TBD
- category terms: TBD
- product terms: TBD
- placement: TBD

## Product Brief

- Product / Skill name: TBD
- One-line value: TBD
- Target user: TBD
- Use moment: TBD
- Core pain: TBD
- Main proof/result: TBD
- Design intent or belief: TBD
- Do-not-say / boundary: TBD
- Search words: TBD
- Desired user identity: TBD

## Recommended Visual System

- visualSystem: ${visualSystem}
${subTemplateLine}- theme: ${theme}
- reason: TBD

## Recommended Card Count

Use TBD cards.

Reason:

- TBD

## Page Plan

| Card | Role | Source anchor | Must carry | Reader sentence | Visual proof | Cut |
|---:|---|---|---|---|---|---|
| 1 | cover | TBD | TBD | TBD | TBD | TBD |
| 2 | content | TBD | TBD | TBD | TBD | TBD |
| 3 | content | TBD | TBD | TBD | TBD | TBD |

## Image Policy

- Source/proof assets: TBD
- Crop/redraw/portrait-fit decisions: TBD
- Full-card AI image policy: do not generate full-card AI posters unless explicitly requested and confirmed.

## Copy Strategy

- Title: TBD
- Caption body: TBD
- CTA: TBD
- Hashtags: TBD

## Main Risks And QA Focus

- TBD

## Required Confirmation Question

你确认这套方案后，我再开始生成卡片图片和小红书文案。要按这个方案继续吗？
`;

const brief = `# ${name}

Status: \`Draft / Proposal Pending\`

Created: ${today}

## Proposal Confirmation

- requiredBeforeBuild: yes
- status: pending
- confirmationSource: pending user confirmation

## Route Decision

- visualSystem: ${visualSystem}
${subTemplateLine}- theme: ${theme}
- recipeSequence: TBD
- imagePolicy: see PROPOSAL.md
- copyStrategy: see PROPOSAL.md
- qaFocus: see PROPOSAL.md
- confidence: low
- matchedKeywords: TBD

## Next Step

Complete \`PROPOSAL.md\` and ask for confirmation before rendering cards or writing final Xiaohongshu copy.
`;

const sources = `# Sources

${sourceLine}
- Notes: record public URLs, user-provided files, generated assets, and any private-source exclusions here.
`;

const imageRequests = `# Image Requests

No final image generation or redraw has been approved yet.

After proposal confirmation, record:

- source image path or URL
- whether it is source evidence or illustrative material
- crop/redraw/portrait-fit decision
- model used for any generated asset
- prompt summary without secrets
`;

fs.writeFileSync(path.join(root, "PROPOSAL.md"), proposal);
fs.writeFileSync(path.join(root, "BRIEF.md"), brief);
fs.writeFileSync(path.join(root, "assets", "SOURCES.md"), sources);
fs.writeFileSync(path.join(root, "assets", "IMAGE_REQUESTS.md"), imageRequests);

console.log(`Created proposal-stage task scaffold: ${taskDir}`);
