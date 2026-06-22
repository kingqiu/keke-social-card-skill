# Style Routing

Route by platform, intent, assets, and content type.

## Routing Table

| Request | Visual System | Notes |
|---|---|---|
| 小红书 + 强点击 / 结果 / 情绪 | Rednote Native | First image must stop the feed. |
| 小红书 + AI 工具 / 截图 / 教程 | Proof Lab | Screenshot/result must be readable. |
| 小红书 + 穿搭 / 食谱 / 单品拆解 | Lookbook Journal | Result image is the anchor. |
| 小红书 + 职场 / 数据 / 框架 / 清单 | Swiss System | Keep hierarchy clean, but avoid PPT-like pages. Use `ikb` when the topic is technical management, AI workflow, engineering productivity, or a serious source-backed checklist. |
| 小红书 + 技术公告 / 开放规范 / API 或数据格式 / 开源框架解读 | Swiss OKF Brief | Use the Swiss sub-template when a public technical announcement needs a high-click explainer with code/format proof. |
| 小红书 + Claude/Anthropic 官方文章 / 上下文治理 / AI 工作流机制 | Swiss Anthropic Clay | Use the Swiss sub-template when warm official-brand cues and source diagrams should become credible evidence. |
| 小红书 + 旅行 / 生活 / 读书 / 情绪 | Editorial E-ink | Photo and mood can lead. |
| 工具测评 + 有证据图 | Proof Lab | Evidence first. |
| 工具测评 + 无证据图 | Rednote Native or Swiss | Ask once for assets. |

Do not route requests to WeChat cover pairs or generic social sizes. If source material is a WeChat article, adapt it into Xiaohongshu cards instead.

## AI Tool Routing Boundary

For AI tools, apps, Skills, and workflow products, decide the route by the primary reader job, not by the topic label.

Use one visual system per Xiaohongshu card deck. Do not mix Rednote Native and Proof Lab inside one deck to compensate for an unclear route. If the user needs both a high-click launch deck and a screenshot-heavy proof/tutorial deck, create two separate packages or ask which one matters more.

| Situation | Route | Reason |
|---|---|---|
| Launch / announcement / "what is this useful for" | Rednote Native | The first job is stopping the feed and making the result feel personally relevant. |
| No strong screenshot, but the product can be shown as an output package, chat, before/after, or scenario result | Rednote Native | Use native publishing-package proof instead of fake UI screenshots. |
| Real UI screenshot, terminal output, generated result, dashboard, before/after, or workflow state is the main evidence | Proof Lab | The proof must be large, inspectable, and credible. |
| Tutorial / operation guide / step-by-step workflow | Proof Lab | Each step needs visible input, action, or result evidence. |
| Tool review / benchmark / failure analysis with screenshots or concrete evidence | Proof Lab | The reader needs proof before persuasion. |
| Tool review with no screenshots or concrete evidence | Ask once for assets; if unavailable, route to Rednote Native and make the limitation explicit in `QA.md` | Do not pretend that feature lists are proof. |
| Long-form thought piece about a tool category, with no product UI focus | Swiss System or Rednote Native | Choose Swiss for frameworks/checklists; choose Rednote Native for feed-native hook and personal relevance. |
| Technical announcement about an open specification, file format, API contract, data/knowledge format, or framework standard | Swiss OKF Brief | The reader job is "understand why this format matters"; use code/directory proof, definition cards, and producer/consumer or implementation rows. |
| Claude/Anthropic official article about Claude Code steering, context, skills, hooks, subagents, or workflow rules | Swiss Anthropic Clay | The reader job is "place the mechanism correctly"; use source article diagrams as evidence and keep Chinese headings medium-weight. |

Tie-breakers:

- If the source is a technology announcement whose strongest hook is a new public format/spec rather than a product result, choose Swiss OKF Brief before ordinary Swiss.
- If the source is a Claude/Anthropic official article and the strongest hook is steering/context/workflow mechanism rather than a UI tutorial, choose Swiss Anthropic Clay before ordinary Swiss or Proof Lab.
- If over half the pages need screenshots, diagrams, or visible workflow states, choose Proof Lab.
- If the cover promise is an emotional/use-case hook and proof can be represented as a native result package, choose Rednote Native.
- If the source has both a high-click launch angle and detailed tutorial proof, produce separate Rednote Native and Proof Lab decks rather than merging grammars.
- If the source is a management/workflow analysis where trust and clarity matter more than bright-feed energy, choose Swiss System with `theme: ikb`; if the same layout needs stronger feed pop, choose `lemon-yellow`.
- If the only "proof" is a list of features, do not call it proof. Rewrite it as reader outcome, ask for assets, or lower confidence in `QA.md`.

## Swiss OKF Brief Routing

Route to the Swiss OKF Brief sub-template when most of these are true:

- The source announces or explains an open format, public spec, API/data contract, framework standard, knowledge package, or interoperability pattern.
- The audience needs the "why it matters" before the "how to use it".
- Proof can be shown as code, directory structure, metadata fields, producer/consumer roles, implementation list, or portability claims.
- The best cover hook is a concrete technology object plus consequence, such as "Google 推出 OKF" or "这个格式让 Agent 知识可迁移".
- There is little need for app screenshots, product UI proof, lifestyle imagery, or emotional scenario proof.

Do not route to Swiss OKF Brief when:

- The post is primarily a hands-on tutorial with UI screenshots. Use Proof Lab.
- The post is primarily a product launch with personal outcome promise. Use Rednote Native.
- The source lacks a format/spec/contract object and is only a generic opinion essay. Use ordinary Swiss or Editorial E-ink.

Swiss OKF Brief route output should include:

- `visualSystem: Swiss System`
- `subTemplate: Swiss OKF Brief`
- `theme: okf-yellow`
- `recipeSequence: cover -> context problem -> definition -> structure -> principles -> implementations -> value -> closing`
- `imagePolicy: prefer code/directory/metadata proof; avoid decorative stock art`
- `copyStrategy: technical announcement explained in plain Chinese, with the exact format/spec name repeated on cover and caption`
- `qaFocus: source fidelity, format/spec terms, proof rows, no bottom-right page serials, exact brand signature`

## Swiss Anthropic Clay Routing

Route to the Swiss Anthropic Clay sub-template when most of these are true:

- The source is Anthropic/Claude official material or a closely adjacent Claude Code workflow analysis.
- The topic is mechanism placement: context, steering, rules, skills, hooks, subagents, output styles, or prompt/system layers.
- The source contains official diagrams or screenshots that should appear as evidence instead of decorative illustration.
- The desired mood is warm, restrained, official, and technical, not native Xiaohongshu sticker/card energy.
- The card titles contain Chinese-heavy phrases that need stable medium-weight rendering.

Do not route to Swiss Anthropic Clay when:

- The post is primarily a UI tutorial or screenshot walkthrough. Use Proof Lab.
- The post is primarily a launch/result/emotion hook. Use Rednote Native.
- The source is unrelated to Claude/Anthropic and only wants a warm palette. Use ordinary Swiss, Editorial, or the appropriate system.

Swiss Anthropic Clay route output should include:

- `visualSystem: Swiss System`
- `subTemplate: Swiss Anthropic Clay`
- `theme: anthropic-clay`
- `recipeSequence: cover -> context problem -> mechanism pages with source figures -> decision checklist`
- `imagePolicy: use official diagrams in .clay-source-figure; log portrait-fit decisions; redraw only unsuitable non-evidence landscape assets`
- `copyStrategy: explain mechanism placement in plain Chinese; preserve product terms like CLAUDE.md, Skills, Hooks, Subagents`
- `qaFocus: title stroke consistency, source-image alignment, Anthropic clay palette, no page serials, exact brand signature`

## Route Output

For every task decide:

- `visualSystem`
- `subTemplate` when applicable
- `theme`
- `recipeSequence`
- `imagePolicy`
- `copyStrategy`
- `qaFocus`
- `confidence`: `high`, `medium`, or `low`
- `matchedKeywords`: the terms or source cues that made this route win

Use `node scripts/route-style.mjs "<request or source summary>"` as a deterministic first pass, then override only when the source assets or reader job clearly contradict the keyword route.

If confidence is `low`, do not silently guess for a publishing-quality package. Ask once for the missing route-changing information: platform intent, proof assets, or whether the user wants a launch deck, tutorial deck, framework deck, product/lifestyle board, or essay deck.

## Route Decision Record

Every `Gold` example and every publishing-quality task must write the final route to `BRIEF.md`:

```text
## Route Decision

- visualSystem: Swiss System
- subTemplate: Swiss OKF Brief
- theme: okf-yellow
- recipeSequence: cover -> context problem -> definition -> structure -> principles -> implementations -> value -> closing
- imagePolicy: code/directory/metadata proof; keep screenshots faithful; redraw only unsuitable portrait assets
- copyStrategy: explain the source point in plain Chinese; do not describe card production
- qaFocus: source fidelity, proof readability, exact brand signature, no page serials
- confidence: high
- matchedKeywords: technical announcement, open format, knowledge package, Agent context
```

This record is not decoration. It lets future maintainers see why a deck used Rednote Native instead of Proof Lab, ordinary Swiss instead of Swiss OKF Brief, or Lookbook Journal instead of Editorial E-ink.
