#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { routeStyle } from "./route-style.mjs";

const root = process.cwd();
const styleRoutingPath = path.join(root, "references", "style-routing.md");
const visualSystemsPath = path.join(root, "references", "visual-systems.md");
const skillPath = path.join(root, "SKILL.md");

const files = {
  "references/style-routing.md": fs.readFileSync(styleRoutingPath, "utf8"),
  "references/visual-systems.md": fs.readFileSync(visualSystemsPath, "utf8"),
  "SKILL.md": fs.readFileSync(skillPath, "utf8"),
};

const failures = [];

function requireText(file, text, reason) {
  if (!files[file].includes(text)) failures.push(`${file}: missing "${text}" (${reason})`);
}

requireText("references/style-routing.md", "## AI Tool Routing Boundary", "AI tools need an explicit Rednote Native vs Proof Lab decision rule");
requireText("references/style-routing.md", "Use one visual system per Xiaohongshu card deck", "mixed-system decks should be prevented");
requireText("references/style-routing.md", "If over half the pages need screenshots", "screenshot-heavy AI workflows must route to Proof Lab");
requireText("references/style-routing.md", "native result package", "Rednote Native needs a non-screenshot proof route");
requireText("references/style-routing.md", "do not call it proof", "feature lists must not be treated as evidence");
requireText("references/style-routing.md", "Swiss OKF Brief", "technical format/spec announcements need an explicit Swiss OKF Brief route");
requireText("references/style-routing.md", "Swiss Anthropic Clay", "Claude/Anthropic official explainers need an explicit Swiss Anthropic Clay route");
requireText("references/style-routing.md", "open specification", "open specs and technical formats should route before ordinary Swiss");
requireText("references/style-routing.md", "subTemplate: Swiss OKF Brief", "route output should expose the Swiss OKF Brief sub-template");
requireText("references/style-routing.md", "subTemplate: Swiss Anthropic Clay", "route output should expose the Swiss Anthropic Clay sub-template");
requireText("references/style-routing.md", "confidence", "route output should include confidence");
requireText("references/style-routing.md", "matchedKeywords", "route output should expose routing evidence");

requireText("references/visual-systems.md", "Boundary with Proof Lab", "Rednote Native must document its boundary with Proof Lab");
requireText("references/visual-systems.md", "Boundary with Rednote Native", "Proof Lab must document its boundary with Rednote Native");
requireText("references/visual-systems.md", "Do not use Proof Lab as a generic AI-tool poster style", "Proof Lab must require inspectable proof");

requireText("SKILL.md", "choose Rednote Native for launches", "main workflow must expose the AI tool route boundary");
requireText("SKILL.md", "choose Proof Lab when screenshots", "main workflow must expose the screenshot/proof route");
requireText("SKILL.md", "do not mix Rednote Native and Proof Lab inside one card deck", "main workflow must prevent grammar mixing");
requireText("SKILL.md", "subTemplate: Swiss OKF Brief", "main workflow must expose the OKF Brief route");
requireText("SKILL.md", "subTemplate: Swiss Anthropic Clay", "main workflow must expose the Anthropic Clay route");

const contentPlanning = fs.readFileSync(path.join(root, "references", "content-planning.md"), "utf8");
if (!contentPlanning.includes("## Swiss OKF Brief Page Plan")) {
  failures.push("references/content-planning.md: missing Swiss OKF Brief page planning rules");
}
if (!contentPlanning.includes("7-9 cards")) {
  failures.push("references/content-planning.md: missing 7-9 card default for Swiss OKF Brief");
}
if (!contentPlanning.includes("## Swiss Anthropic Clay Page Plan")) {
  failures.push("references/content-planning.md: missing Swiss Anthropic Clay page planning rules");
}

const routeFixtures = [
  ["Google 推出 Open Knowledge Format，开放规范，Markdown YAML 知识格式", "Swiss OKF Brief"],
  ["Anthropic 官方文章 Steering Claude Code，CLAUDE.md，Skills，Hooks，Subagents，上下文治理", "Swiss Anthropic Clay"],
  ["AI 工具教程，三张 UI 截图，前后对比，操作步骤", "Proof Lab"],
  ["新开发的 AI Skill 发布，小红书结果包，使用场景和省时间", "Rednote Native"],
  ["新手手冲咖啡器具购买，滤杯，电子秤，产品拆解", "Lookbook Journal"],
  ["旅行阅读随笔，窗边咖啡，慢书和生活方式", "Editorial E-ink"],
  ["2026 Agent 基础设施趋势观察，框架，清单，判断矩阵", "Swiss System"],
];

for (const [input, expected] of routeFixtures) {
  const route = routeStyle(input);
  const actual = route.subTemplate || route.visualSystem;
  if (actual !== expected) {
    failures.push(`route-style fixture failed: expected ${expected}, got ${actual} for "${input}"`);
  }
  for (const field of ["visualSystem", "theme", "recipeSequence", "imagePolicy", "copyStrategy", "qaFocus", "confidence", "matchedKeywords"]) {
    if (!(field in route)) failures.push(`route-style output missing ${field}`);
  }
}

if (failures.length) {
  console.error("Style routing check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Style routing check passed.");
