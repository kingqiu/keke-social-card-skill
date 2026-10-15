#!/usr/bin/env node

const RULES = [
  {
    visualSystem: "Chromatic Modular Grid",
    theme: "cobalt-coral-lime",
    recipeSequence: "cover assembly -> evidence map -> mechanism/action pages -> saveable takeaway",
    imagePolicy: "use real source proof, diagrams, photos, or reviewed GPT Image 2 semantic bitmap assets; keep evidence inspectable",
    copyStrategy: "direct, source-backed, high-density explanation with a clear reader action",
    qaFocus: "cover hook, image integrity, one judgment per page, template/theme separation, exact brand signature",
    keywords: ["chromatic modular grid", "模块化拼图", "高密度卡片", "视觉证据", "图文拼接", "modular card"],
  },
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
    visualSystem: "Swiss System",
    subTemplate: "Swiss Anthropic Clay",
    theme: "anthropic-clay",
    recipeSequence: "cover -> context problem -> mechanism pages with source figures -> decision checklist",
    imagePolicy: "use official diagrams in .clay-source-figure; log portrait-fit decisions; redraw only unsuitable non-evidence landscape assets",
    copyStrategy: "explain mechanism placement in plain Chinese; preserve product terms like CLAUDE.md, Skills, Hooks, Subagents",
    qaFocus: "title stroke consistency, source-image alignment, Anthropic clay palette, no page serials, exact brand signature",
    keywords: ["anthropic", "claude", "claude code", "claude.md", "hooks", "subagents", "skills", "output styles", "steering", "上下文治理", "上下文", "子代理", "钩子", "技能", "规则放哪"],
  },
  {
    visualSystem: "Longform Reader",
    theme: "highlighter-blue",
    recipeSequence: "event hook -> baseline contrast -> reversal -> mechanisms -> consequences -> reader checklist -> final takeaway",
    imagePolicy: "choose per image: direct original, subject crop, wide band, redraw/recompose, or omit; preserve content-page original color by default",
    copyStrategy: "faithful source-backed longform rewrite in natural Chinese; story arc, not directory summary",
    qaFocus: "story continuity, content-page title consistency, image treatment intent, whitespace, readable brand signature, final package word-count/read-time",
    keywords: ["长文", "报告", "深度解读", "案例分析", "商业解读", "技术解读", "微信文章", "公众号文章", "阅读卡片", "长文阅读卡片", "深度阅读卡片", "阅读型小红书模板", "公众号长文转小红书", "像上次 Meta 那套", "适合长文章", "longform", "report", "case study", "source-backed", "story arc", "叙事"],
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

const HANDDRAWN = {
  visualSystem: "Handdrawn Insight",
  theme: "ink-orange",
  renderMode: "imagegen-full-card",
  recipeSequence: "benefit cover -> illustrated insights with attributed author panel -> reader checklist",
  imagePolicy: "generate complete cards using approved visual references; verify author identity and all rendered text",
  copyStrategy: "source-backed viewpoints plus clearly separated personal interpretation; direct reader benefit",
  qaFocus: "text accuracy, portrait identity, attribution, readability, style consistency, selected final versions",
  keywords: ["手绘观点解读", "黑白橙手绘", "作者头像观点卡", "像上次 pg 那套", "handdrawn insight"],
};

const ALIASES = new Map([
  ["Handdrawn Insight", HANDDRAWN.keywords],
  ["Longform Reader", ["longform reader", "长文阅读卡片", "深度阅读卡片", "长文阅读模板", "像上次 meta 那套"]],
  ["Swiss System", ["swiss system", "swiss", "瑞士网格"]],
  ["Proof Lab", ["proof lab", "证据型模板"]],
  ["Editorial E-ink", ["editorial e-ink", "电子墨水编辑模板"]],
  ["Rednote Native", ["rednote native"]],
  ["Lookbook Journal", ["lookbook journal"]],
  ["Chromatic Modular Grid", ["chromatic modular grid", "模块化拼图"]],
]);

function normalize(input) {
  return String(input || "").toLowerCase();
}

function optionFor(rule) {
  const descriptions = {
    "Handdrawn Insight": ["手绘观点解读", "人物场景解释独立观点，作者观点与个人启发分开呈现"],
    "Longform Reader": ["长文阅读", "保留案例和连续因果，适合需要读懂完整论证的内容"],
    "Swiss System": ["瑞士网格", "用紧凑的比较、框架和清单承载信息"],
    "Proof Lab": ["证据型模板", "以真实截图、操作过程和结果证据为主体"],
    "Editorial E-ink": ["编辑阅读", "重阅读氛围和自然叙述，结构较轻"],
  };
  const [label, reason] = descriptions[rule.visualSystem] || [rule.visualSystem, rule.copyStrategy];
  return { visualSystem: rule.visualSystem, ...(rule.subTemplate ? {subTemplate: rule.subTemplate} : {}), theme: rule.theme, label, reason };
}

export function routeStyle(input) {
  const text = normalize(input);
  const excluded = new Set();
  const explicit = new Set();
  for (const [system, aliases] of ALIASES) {
    for (const alias of aliases) {
      const index = text.indexOf(alias);
      if (index < 0) continue;
      const before = text.slice(Math.max(0, index - 12), index);
      if (/(?:不要|不用|不选|避免|排除|别用)\s*(?:再|使用|采用|用)?\s*$/.test(before)) excluded.add(system);
      else explicit.add(system);
    }
  }
  const scored = RULES.filter(rule => !excluded.has(rule.visualSystem)).map((rule, index) => {
    const hits = rule.keywords.filter(keyword => text.includes(keyword.toLowerCase()));
    return { rule, score: hits.length, hits, index };
  }).sort((a, b) => b.score - a.score || a.index - b.index);
  const oldBest = scored[0];
  const findRule = system => system === HANDDRAWN.visualSystem ? HANDDRAWN :
    scored.find(item => item.rule.visualSystem === system)?.rule;
  const source = /访谈|演讲|作者|名人|阅读笔记|读书笔记|paul graham|\bpg\b|商业文章/.test(text);
  const insights = /观点|启发|启示|商业思考|管理建议|经营建议|独立判断/.test(text);
  const narrative = /完整(?:论证|因果|故事)|连续(?:叙事|因果)|故事线|叙事|事件经过|案例演变/.test(text);
  const proof = /真实截图|操作步骤|操作教程|实测|终端输出|benchmark|ui 截图/.test(text);
  const handdrawnFits = source && insights && !proof && !excluded.has(HANDDRAWN.visualSystem);
  const choiceRequested = /给.{0,8}(?:选择项|选项)|让我选|供我选|选哪(?:个|种)|哪种模板|比较.{0,12}(?:模板|风格)/.test(text);
  const autoRequested = /自动选|自动判断|你来选|直接选/.test(text) && !choiceRequested;
  const explicitRules = [...explicit].filter(s => !excluded.has(s)).map(findRule).filter(Boolean);
  let best = oldBest?.rule || RULES[RULES.length - 1];
  let confidence = oldBest?.score >= 2 ? "high" : oldBest?.score === 1 ? "medium" : "low";
  let selectionMode = "recommend";
  let reason = "按内容线索推荐；需结合原文与用户参考图复核";
  let candidates = [];

  if (explicitRules.length === 1 && !choiceRequested) {
    best = explicitRules[0];
    confidence = "high";
    selectionMode = "selected";
    reason = "用户指定模板，沿用明确选择";
  } else if (explicitRules.length > 1) {
    best = explicitRules[0]; candidates = explicitRules;
    selectionMode = "choose"; confidence = "medium";
    reason = "请求涉及多个模板，展示差异供用户选择";
  } else if (handdrawnFits) {
    best = narrative ? findRule("Longform Reader") || best : HANDDRAWN;
    candidates = [best, narrative ? HANDDRAWN : findRule("Longform Reader"), findRule("Swiss System")].filter(Boolean);
    selectionMode = narrative || choiceRequested ? "choose" : "recommend";
    confidence = narrative ? "medium" : "high";
    reason = narrative ? "既有独立观点也要求连续因果，需选择图解重点或叙事完整度" : "明确作者来源与可独立解释的观点，适合手绘场景及观点框";
  } else if (choiceRequested || confidence === "low" ||
    (oldBest?.score > 0 && scored[1]?.score === oldBest.score && scored[1].rule.visualSystem !== best.visualSystem)) {
    selectionMode = "choose";
    reason = "信息不足、匹配接近或用户要求选项；给出少量候选而非强制选定";
  }
  if (selectionMode === "choose" && !candidates.length) {
    candidates = explicitRules.length ? explicitRules : scored.filter(x => x.score > 0).map(x => x.rule);
    if (candidates.length < 2) candidates.push(...[findRule("Swiss System"), findRule("Editorial E-ink")].filter(Boolean));
  }
  if (selectionMode === "choose" && candidates.length && !candidates.includes(best)) best = candidates[0];
  if (selectionMode === "choose" && autoRequested) {
    selectionMode = "recommend";
    reason = "用户授权自动选择，采用当前最匹配模板并说明取舍";
  }
  const options = [...new Map(candidates.map(rule => [rule.visualSystem, optionFor(rule)])).values()].slice(0, 3);
  return {
    ...best,
    renderMode: best.renderMode || "html-template",
    confidence,
    selectionMode,
    reason,
    options: selectionMode === "choose" ? options : [],
    matchedKeywords: best === HANDDRAWN ? [...(source ? ["source: 作者来源"] : []), ...(insights ? ["reader: 观点/启发"] : []), ...HANDDRAWN.keywords.filter(k => text.includes(k)).map(k => `keyword: ${k}`)] :
      (scored.find(x => x.rule === best)?.hits || []),
    oneDeckRule: "Use one visual system per Xiaohongshu card deck. If options are returned, let the user select before mixing visual grammars.",
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
