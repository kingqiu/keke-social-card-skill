#!/usr/bin/env node

const RULES = [
  {
    visualSystem: "Swiss System",
    subTemplate: "Swiss OKF Brief",
    theme: "okf-yellow",
    recipeSequence: "cover -> context problem -> definition -> structure -> principles -> implementations -> value -> closing",
    imagePolicy: "prefer code/directory/metadata proof; avoid decorative stock art",
    copyStrategy: "technical announcement explained in plain Chinese, repeat the format/spec name on cover and caption",
    qaFocus: "source fidelity, format/spec terms, proof rows, no bottom-right page serials, exact brand signature",
    keywords: ["开放规范", "open specification", "open spec", "api contract", "数据格式", "知识格式", "file format", "framework standard", "互操作", "schema", "yaml", "markdown", "okf"],
  },
  {
    visualSystem: "Proof Lab",
    theme: "SL-02 Graphite Mint",
    recipeSequence: "evidence hero -> step flow -> before/after -> takeaway",
    imagePolicy: "use real screenshots, workflow states, terminal output, diagrams, or visible generated results",
    copyStrategy: "lead with result proof, then explain the step or reason",
    qaFocus: "inspectable proof size, callout accuracy, screenshot readability, theme-token compliance",
    keywords: ["截图", "教程", "工作流", "before/after", "前后对比", "dashboard", "终端", "terminal", "ui", "操作指南", "步骤", "实测", "benchmark"],
  },
  {
    visualSystem: "Rednote Native",
    theme: "plum-cream",
    recipeSequence: "hook -> native result package -> credibility -> save-value",
    imagePolicy: "show native output package, chat result, scenario result, before/after claim, or publishing package",
    copyStrategy: "high-click personal outcome promise with concrete reader benefit",
    qaFocus: "thumbnail hook, visible result package, not a feature list, exact brand signature",
    keywords: ["发布", "上线", "launch", "新工具", "ai skill", "技能", "产品发布", "使用场景", "帮我", "省时间", "结果包", "小红书"],
  },
  {
    visualSystem: "Lookbook Journal",
    theme: "soft-paper",
    recipeSequence: "result board -> breakdown -> buying/usage logic -> verdict",
    imagePolicy: "use a central product/outfit/food/home result image with callouts and detail crops",
    copyStrategy: "result-first practical explanation; tell the reader what to choose and why",
    qaFocus: "central result size, callout usefulness, detail crop quality, female/lifestyle appeal when relevant",
    keywords: ["穿搭", "ootd", "单品", "食谱", "美食", "咖啡", "器具", "家居", "产品拆解", "购买", "材质", "搭配", "lookbook"],
  },
  {
    visualSystem: "Editorial E-ink",
    theme: "forest-ink",
    recipeSequence: "atmospheric cover -> essay blocks -> quiet takeaway",
    imagePolicy: "use atmospheric raster image, photo, travel/reading/culture scene; avoid screenshot proof",
    copyStrategy: "human essay voice, concrete sensory details, restrained emotional conclusion",
    qaFocus: "editorial mood, readable serif text, no quote-poster vagueness, exact brand signature",
    keywords: ["旅行", "读书", "阅读", "文化", "随笔", "生活方式", "情绪", "书单", "城市", "散文", "essay", "travel"],
  },
  {
    visualSystem: "Swiss System",
    theme: "ikb",
    recipeSequence: "cover -> framework -> matrix/checklist -> decision/takeaway",
    imagePolicy: "use structured diagrams, matrices, ledgers, source-backed charts, or simple generated schematics",
    copyStrategy: "clear framework in plain Chinese; one judgment per card",
    qaFocus: "grid hierarchy, no PPT-like equal-weight pages, density, no decorative page serials",
    keywords: ["框架", "清单", "趋势", "观察", "数据", "职场", "方法论", "对比", "判断", "矩阵", "framework", "checklist"],
  },
];

function normalize(input) {
  return String(input || "").toLowerCase();
}

export function routeStyle(input) {
  const text = normalize(input);
  const scored = RULES.map((rule, index) => {
    const hits = rule.keywords.filter(keyword => text.includes(keyword.toLowerCase()));
    return { rule, score: hits.length, hits, index };
  }).sort((a, b) => b.score - a.score || a.index - b.index);

  const best = scored[0];
  const confidence = best.score >= 2 ? "high" : best.score === 1 ? "medium" : "low";
  return {
    ...best.rule,
    confidence,
    matchedKeywords: best.hits,
    oneDeckRule: "Use one visual system per Xiaohongshu card deck. If two reader jobs are equally strong, create separate packages.",
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = process.argv.slice(2).join(" ").trim();
  if (!input) {
    console.error("usage: node scripts/route-style.mjs <source summary or request>");
    process.exit(2);
  }
  console.log(JSON.stringify(routeStyle(input), null, 2));
}
