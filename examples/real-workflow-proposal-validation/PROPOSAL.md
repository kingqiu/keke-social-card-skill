# Real Workflow Proposal Validation

Status: `Pass / Proposal Only`

## Source Summary

- Source type: official AI product explainer.
- Topic: Claude Code customization and context governance.
- Reader job: quickly understand where different instructions should live.
- Material cues: mechanism descriptions, official diagrams/screenshots, decision guidance.

## Concrete Reader

- Who: Claude Code users who have started collecting project instructions, workflow notes, and automation rules.
- Moment: when they notice CLAUDE.md is getting long or a team wants reusable AI coding standards.
- Pain/emotion: the setup feels clever but increasingly hard to reason about.
- Save/share reason: the post gives a quick decision checklist for where to put each type of instruction.
- Identity: a cleaner AI workflow builder who treats context as a managed resource.

## Value Translation

| Source / feature language | User translation |
|---|---|
| CLAUDE.md files | 适合少量常驻事实，不适合装下所有流程。 |
| Rules | 只和某个目录有关的约束，按路径触发更省上下文。 |
| Skills | 可复用流程应该像手册一样按需打开。 |
| Hooks | 必须执行的动作要交给确定性机制。 |
| Subagents | 会产生噪声的辅助任务不要污染主会话。 |

## Shelf Test

- Stop reason: the cover names a familiar AI coding problem: Claude Code 规则到底该放哪。
- Reader relevance: it targets users whose rules and prompts are becoming hard to maintain.
- Visible payoff: the deck promises a placement checklist instead of another feature tour.
- Proof: official diagrams/screenshots are used as evidence.

## Search Intent Plan

- audience terms: Claude Code 用户, AI 开发者, 产品工程师
- scene terms: AI 编程, 项目规范, 上下文治理
- problem terms: 规则混乱, prompt 太长, 上下文变重
- category terms: AI 工具, 工作流, Agent
- product terms: Claude Code, CLAUDE.md, Rules, Skills, Hooks, Subagents
- placement: put Claude Code and 规则 in cover/title, put 上下文管理 and mechanism terms in caption opening and hashtags.

## Product Brief

- Product / Skill name: Claude Code customization mechanisms
- One-line value: make instruction placement easier to choose and easier to maintain.
- Target user: people using Claude Code for real projects, not only one-off chats.
- Use moment: before writing or reorganizing project-level AI instructions.
- Core pain: all instructions look important, but not all should be loaded all the time.
- Main proof/result: official source mechanisms and diagrams.
- Design intent or belief: stable AI workflows need scope, cost, and reliability boundaries.
- Do-not-say / boundary: do not turn this into a universal automation recipe or ignore security/cost tradeoffs.
- Search words: Claude Code, CLAUDE.md, Rules, Skills, Hooks, Subagents, AI 工作流.
- Desired user identity: a deliberate maintainer of AI coding systems.

## Recommended Visual System

- visualSystem: Swiss System
- subTemplate: Swiss Anthropic Clay
- theme: anthropic-clay
- reason: the source is a Claude/Anthropic-adjacent official mechanism explainer; it needs warm official-document credibility, stable Chinese/English technical typography, and source diagrams as evidence.

## Recommended Card Count

Use 8 cards.

Reason:

- One cover names the decision problem.
- One context-problem card explains why always-loaded instructions are costly.
- Five mechanism pages cover Rules, Skills, Subagents, Hooks, and Output Styles / append-system-prompt.
- One closing checklist turns the article into a reusable judgment tool.

## Page Plan

| Card | Role | Source anchor | Must carry | Reader sentence | Visual proof | Cut |
|---:|---|---|---|---|---|---|
| 1 | cover | Article title and thesis | Claude Code steering is a placement problem | 规则不是越多越好，关键是放在正确层级。 | Mechanism map | Full metadata |
| 2 | context problem | Context-window explanation | Always-loaded context has cost | CLAUDE.md 像常驻内存，写多了会让当前任务背无关规则。 | Cost/control rows | Detailed docs links |
| 3 | mechanism | Rules | Path-scoped rules reduce irrelevant loading | 只影响某类文件的约束，应该按路径触发。 | Path rule example | Full YAML variants |
| 4 | mechanism | Skills | Skills hold reusable procedures | 流程手册应该按需加载，不该塞进常驻记忆。 | Official Skills diagram | Built-in skill list |
| 5 | mechanism | Subagents | Subagents isolate noisy work | 大量中间材料交给子代理，主会话只接总结。 | Official Subagents diagram | Nested-agent limits |
| 6 | mechanism | Hooks | Hooks enforce deterministic events | 必须发生的动作交给 Hooks 或权限，而不是靠模型记住。 | Official Hooks diagram | Full hook taxonomy |
| 7 | tradeoff | Output Styles and append-system-prompt | High-weight styles are powerful but risky | 长期交互模式才用 Output Styles，临时标准优先追加提示。 | Weight/risk ladder | Default style internals |
| 8 | checklist | Customization quick tips | Decide by scope, cost, reliability, isolation | 常驻事实、路径规则、流程技能、确定性钩子、隔离子代理各有边界。 | Decision table | Getting-started links |

## Image Policy

- Use official diagrams/screenshots as source evidence when they explain a mechanism.
- Keep landscape diagrams only inside bounded evidence frames; if an inserted illustration is not evidence and looks weak in 3:4, redraw or recompose it into a portrait-friendly asset.
- Do not generate full-card AI posters.
- Record source images, crop decisions, and redraw decisions in `assets/IMAGE_REQUESTS.md` after confirmation.

## Copy Strategy

- Title: ask a concrete placement question around Claude Code rules.
- Caption body: explain context as budget, then give practical placement rules in human language.
- CTA: ask readers which layer they currently overuse.
- Hashtags: Claude Code, AI Agent, 大模型, 工作流, AI工具, 技术笔记.

## Main Risks And QA Focus

- Mixed Chinese/English titles must not show uneven stroke weights.
- Official diagrams must be inspectable, not decorative thumbnails.
- Each card must explain when to use the mechanism.
- Xiaohongshu copy must tell the source story directly and must not say the article was split into cards.
- Public brand signature must be exactly `「两克伴」出品`.

## Required Confirmation Question

你确认这套方案后，我再开始生成卡片图片和小红书文案。要按这个方案继续吗？
