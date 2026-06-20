#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const themes = {
  "SL-01 Electric Blue": {
    "--bg": "#F7F6F2",
    "--surface": "#FFFFFF",
    "--fg": "#15181D",
    "--muted": "#6C7580",
    "--accent": "#2F5EA7",
    "--line": "#DCE3EE",
    "--grid": "#E7EDF5",
    "--dark": "#12161D",
  },
  "SL-02 Graphite Mint": {
    "--bg": "#F6F5F1",
    "--surface": "#FFFFFF",
    "--fg": "#171A1D",
    "--muted": "#6D7680",
    "--accent": "#47756F",
    "--line": "#DCE3E1",
    "--grid": "#E5ECEA",
    "--dark": "#141817",
  },
  "SL-03 Safety Coral": {
    "--bg": "#F7F4F0",
    "--surface": "#FFFFFF",
    "--fg": "#171515",
    "--muted": "#746B67",
    "--accent": "#B84932",
    "--line": "#E5D9D4",
    "--grid": "#EFE5E1",
    "--dark": "#161514",
  },
  "SL-04 Acid Lime": {
    "--bg": "#F5F7EF",
    "--surface": "#FFFFFF",
    "--fg": "#151715",
    "--muted": "#6E7369",
    "--accent": "#566F10",
    "--line": "#DDE5CC",
    "--grid": "#E7ECD8",
    "--dark": "#151713",
  },
  "SL-05 Signal Noir": {
    "--bg": "#131110",
    "--surface": "#1C1916",
    "--fg": "#F2ECDF",
    "--muted": "#A29A8C",
    "--accent": "#C9A461",
    "--line": "#2E2A24",
    "--grid": "#221E18",
    "--dark": "#0C0A08",
  },
};

const coreVars = new Set(["--bg", "--surface", "--fg", "--muted", "--accent", "--line", "--grid", "--dark"]);
const allowedHex = new Set(Object.values(themes).flatMap(theme => Object.values(theme).map(hex => hex.toUpperCase())));
const requiredThemeNames = Object.keys(themes);
const failures = [];

function collectHtmlFiles() {
  const files = [path.join(root, "assets", "template-proof-lab.html")];
  const examplesDir = path.join(root, "examples");
  if (!fs.existsSync(examplesDir)) return files;

  for (const entry of fs.readdirSync(examplesDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || !entry.name.includes("proof-lab")) continue;
    const htmlPath = path.join(examplesDir, entry.name, "index.html");
    if (fs.existsSync(htmlPath)) files.push(htmlPath);
  }
  return files;
}

function normalizeHex(hex) {
  return hex.toUpperCase();
}

function isThemeSelector(selector) {
  return selector === ":root" || /^html\[data-theme="SL-\d\d [^"]+"\]$/.test(selector);
}

function checkFile(filePath) {
  const rel = path.relative(root, filePath);
  const text = fs.readFileSync(filePath, "utf8");

  for (const match of text.matchAll(/#[0-9a-f]{6}\b/gi)) {
    const hex = normalizeHex(match[0]);
    if (!allowedHex.has(hex)) {
      failures.push(`${rel}: disallowed hex ${match[0]}; use Proof Lab theme tokens or add it to the theme contract`);
    }
  }

  const lines = text.split(/\r?\n/);
  let selector = "";
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    const openMatch = line.match(/^([^{}]+)\{\s*$/);
    if (openMatch) selector = openMatch[1].trim();

    const varMatch = line.match(/(--[a-z0-9-]+)\s*:/i);
    if (varMatch && coreVars.has(varMatch[1]) && !isThemeSelector(selector)) {
      failures.push(`${rel}:${i + 1}: core theme variable ${varMatch[1]} may only be declared in :root or html[data-theme] blocks`);
    }

    if (line === "}") selector = "";
  }

  if (rel === path.join("assets", "template-proof-lab.html")) {
    for (const [themeName, vars] of Object.entries(themes)) {
      if (!text.includes(`html[data-theme="${themeName}"]`)) {
        failures.push(`${rel}: missing theme selector ${themeName}`);
      }
      for (const [name, value] of Object.entries(vars)) {
        if (!text.includes(`${name}: ${value};`)) {
          failures.push(`${rel}: ${themeName} missing ${name}: ${value}`);
        }
      }
    }
  }
}

for (const file of collectHtmlFiles()) {
  checkFile(file);
}

if (failures.length) {
  console.error("Proof Lab theme contract check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Proof Lab theme contract passed for ${collectHtmlFiles().length} file(s).`);
