#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

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
requireText("references/style-routing.md", "open specification", "open specs and technical formats should route before ordinary Swiss");
requireText("references/style-routing.md", "subTemplate: Swiss OKF Brief", "route output should expose the Swiss OKF Brief sub-template");

requireText("references/visual-systems.md", "Boundary with Proof Lab", "Rednote Native must document its boundary with Proof Lab");
requireText("references/visual-systems.md", "Boundary with Rednote Native", "Proof Lab must document its boundary with Rednote Native");
requireText("references/visual-systems.md", "Do not use Proof Lab as a generic AI-tool poster style", "Proof Lab must require inspectable proof");

requireText("SKILL.md", "choose Rednote Native for launches", "main workflow must expose the AI tool route boundary");
requireText("SKILL.md", "choose Proof Lab when screenshots", "main workflow must expose the screenshot/proof route");
requireText("SKILL.md", "do not mix Rednote Native and Proof Lab inside one card deck", "main workflow must prevent grammar mixing");
requireText("SKILL.md", "subTemplate: Swiss OKF Brief", "main workflow must expose the OKF Brief route");

const contentPlanning = fs.readFileSync(path.join(root, "references", "content-planning.md"), "utf8");
if (!contentPlanning.includes("## Swiss OKF Brief Page Plan")) {
  failures.push("references/content-planning.md: missing Swiss OKF Brief page planning rules");
}
if (!contentPlanning.includes("7-9 cards")) {
  failures.push("references/content-planning.md: missing 7-9 card default for Swiss OKF Brief");
}

if (failures.length) {
  console.error("Style routing check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Style routing check passed.");
