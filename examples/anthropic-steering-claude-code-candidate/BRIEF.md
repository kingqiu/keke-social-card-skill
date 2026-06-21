# Anthropic Steering Claude Code Candidate

Status: `Candidate`

Source:

- Public article: Anthropic, `Steering Claude Code: CLAUDE.md files, skills, hooks, rules, subagents and more`, published 2026-06-18.
- User-provided Chinese translation and interpretation notes.

## Proposal Confirmation

- requiredBeforeBuild: yes
- status: legacy-confirmed
- confirmationSource: accepted reference example or validation package created before the proposal-confirmation gate became mandatory; future article/long-form tasks must receive explicit user confirmation before build

## Route Decision

- visualSystem: Swiss System
- subTemplate: Swiss Anthropic Clay
- theme: anthropic-clay
- recipeSequence: cover -> context problem -> rules -> skills -> subagents -> hooks -> output styles -> decision checklist
- imagePolicy: use official article diagrams for Skills/Subagents/Hooks plus text-based schematics and mechanism tables; no decorative stock art; no local/private source path in provenance
- copyStrategy: explain the Claude Code customization mechanisms in plain Chinese and preserve the article's decision guidance
- qaFocus: source coverage, mechanism distinctions, readable hierarchy, Anthropic clay palette, title stroke consistency, exact brand signature, no page serials
- confidence: high
- matchedKeywords: Claude Code, customization mechanisms, rules, skills, hooks, subagents, output styles, decision framework

## Card Count

Use 8 cards.

Reason:

- The source has one core problem: how to steer Claude Code without wasting context or weakening guardrails.
- It explains six major mechanisms: Rules, Skills, Subagents, Hooks, Output Styles, and append-system-prompt.
- It ends with practical decision tips about where instructions should live.
- Eight cards can preserve the argument without turning the deck into a long manual.

## Page Plan

| Card | Role | Source anchor | Must carry | Reader sentence | Visual proof | Cut |
|---:|---|---|---|---|---|---|
| 1 | cover | Article title and overall thesis | Claude Code has multiple steering layers, each with different cost and control | 想让 Claude Code 稳定好用，关键是把规则放在正确的位置。 | Mechanism map | Original screenshots |
| 2 | context problem | `Claude Code 定制的快速提示` and context-window discussion | Context is a budget; always-loaded instructions are expensive | 不是所有偏好都应该塞进 CLAUDE.md，加载时机决定成本和可靠性。 | Cost/control axis | Detailed docs links |
| 3 | mechanism | `规则` | Rules can be path-scoped to load only when relevant | 路径限定规则适合文件/目录相关约束，能减少无关上下文。 | Path rule example | Full YAML variants |
| 4 | mechanism | `技能` | Skills hold procedural playbooks and load on demand | 部署、发布、审查这类流程应放进 Skill，而不是常驻记忆。 | Official Skills source image | Built-in skill list |
| 5 | mechanism | `子代理` | Subagents isolate noisy auxiliary work from the parent context | 日志分析、深度搜索、依赖审计这类任务适合交给子代理。 | Official Subagents source image | Nested-agent limits detail |
| 6 | mechanism | `钩子` | Hooks are deterministic controls for events and guardrails | 需要每次都发生的动作，应该用钩子而不是靠模型记住。 | Official Hooks lifecycle image | Hook type taxonomy compressed |
| 7 | mechanism | `输出样式` and `追加系统提示` | High-weight style changes are powerful but risky; append prompt is safer for temporary additions | 输出样式会影响系统提示，适合少用；临时标准更适合追加提示。 | Weight/risk ladder | Full default instruction list |
| 8 | checklist | `Claude Code 定制的快速提示` | Put instructions where their reliability and scope match the job | 每种定制方式都有边界：常驻事实、路径规则、流程技能、确定性钩子、隔离子代理。 | Decision matrix | Getting-started links |

## Acceptance

- Cover names `Claude Code` and the core promise.
- Every mechanism card explains when to use it, not only what it is.
- Caption summarizes the source argument path without mentioning card count or production workflow.
- Rendered deck passes validator with 0 fails.
- Public brand signature is exactly `「两克伴」出品`.
