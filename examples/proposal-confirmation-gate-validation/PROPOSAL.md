# Proposal Confirmation Gate Validation

Status: `Pass / Workflow Gate`

## Pressure Scenario

User input:

```text
我给你一篇 Anthropic 官方文章链接。先帮我判断应该用哪套模板、生成几张小红书卡片、用什么配色，并给出设计方案。等我确认后再开始生成图片和小红书文案。
```

Source summary used for validation:

- Anthropic official article about Claude Code steering.
- Key terms: `CLAUDE.md`, Rules, Skills, Hooks, Subagents, Output Styles, context window.
- Source contains official section diagrams.

## Expected Behavior

The Skill must stop at proposal stage. It must not render card images, create final `xiaohongshu-caption.md`, or produce final output assets before user confirmation.

## Proposal Response

### Recommended Visual System

- visualSystem: Swiss System
- subTemplate: Swiss Anthropic Clay
- theme: anthropic-clay
- reason: the source is an Anthropic/Claude official mechanism explainer with warm official-brand cues and source diagrams that should be treated as evidence.

### Recommended Card Count

Use 8 cards.

Reason:

- One cover is needed to name the core placement question.
- One context-problem card explains why stuffing everything into always-loaded instructions fails.
- Five mechanism cards cover Rules, Skills, Subagents, Hooks, and Output Styles / append-system-prompt.
- One closing checklist turns the article into a reusable placement decision.

### Page Plan

| Card | Role | Source anchor | Must carry | Reader sentence | Visual proof | Cut |
|---:|---|---|---|---|---|---|
| 1 | cover | Article title and thesis | Claude Code steering is about placing instructions in the right layer | 想让 Claude Code 稳定好用，关键不是多写规则，而是把规则放到正确位置。 | Mechanism map | Full article title metadata |
| 2 | context problem | Context-window explanation | Always-loaded instructions are costly | CLAUDE.md 像常驻内存，写得越多，当前任务越容易背着无关规则前进。 | Cost/control rows | Detailed docs links |
| 3 | mechanism | Rules | Path-scoped constraints reduce irrelevant context | 只影响某类文件的规则，应该按路径触发，而不是全局常驻。 | Path rule example | Full YAML variants |
| 4 | mechanism with source figure | Skills section | Skills hold reusable procedures and load on demand | 部署、发布、审查这类流程应放进 Skill，而不是塞进常驻记忆。 | Official Skills diagram | Built-in skill list |
| 5 | mechanism with source figure | Subagents section | Subagents isolate noisy intermediate work | 日志扫描、深度搜索、依赖审计适合交给子代理，主会话只收结论。 | Official Subagents diagram | Nested-agent limits detail |
| 6 | mechanism with source figure | Hooks section | Hooks are deterministic controls | 每次都必须发生的动作，应该交给 Hooks 或权限，而不是靠模型记住。 | Official Hooks lifecycle diagram | Full hook taxonomy |
| 7 | risk / tradeoff | Output Styles and append-system-prompt | High-weight style changes are powerful but easy to overuse | 长期改变交互模式才用 Output Styles；临时标准更适合追加提示。 | Weight/risk ladder | Default style internals |
| 8 | decision checklist | Customization quick tips | Decide by scope, cost, reliability, and isolation need | 常驻事实、路径规则、流程技能、确定性钩子、隔离子代理，各有边界。 | Decision table | Getting-started links |

### Image Policy

- Use official source diagrams for Skills, Subagents, and Hooks.
- Keep landscape diagrams only when they are source evidence; record portrait-fit decisions in `assets/IMAGE_REQUESTS.md` after confirmation.
- Do not generate full-card AI images.
- Redraw only inserted source illustration assets if a non-evidence landscape image is visually unsuitable for 3:4.

### Copy Strategy

- Title direction: concrete placement question, for example `Claude Code 规则到底该放哪？`.
- Caption tone: human technical observation, not neutral product brochure.
- Caption body: explain why context is a budget, then list concrete placement rules.
- Hashtags: Claude Code, AI Agent, 大模型, 工作流, AI工具, 技术笔记.

### Main Risks And QA Focus

- Chinese-heavy titles must use stable medium-weight rendering.
- Official diagrams must be large enough to be evidence, not decoration.
- Cards must explain when to use each mechanism, not only define terms.
- Caption must not mention card count, generated images, or article splitting.
- Brand signature must be exactly `「两克伴」出品`.

## Required Confirmation Question

```text
你确认这套方案后，我再开始生成卡片图片和小红书文案。要按这个方案继续吗？
```

## No-Build Assertion

- No rendered `output/images` should exist in this validation folder.
- No final `xiaohongshu-caption.md` should exist in this validation folder.
- No final `copy-variants.md` should exist in this validation folder.
