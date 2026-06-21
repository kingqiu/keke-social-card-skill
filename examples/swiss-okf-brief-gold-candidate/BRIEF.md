# Swiss OKF Brief Gold Candidate

Status: `Gold`

Source:

- User-supplied Xiaohongshu/WeChat card reference deck about Google Cloud Open Knowledge Format.
- User-supplied engagement screenshot showing the published graphic post performed well.
- Public-facing source named in the supplied cards: Google Cloud Blog, 2026.06.

## Proposal Confirmation

- requiredBeforeBuild: yes
- status: legacy-confirmed
- confirmationSource: accepted reference example or validation package created before the proposal-confirmation gate became mandatory; future article/long-form tasks must receive explicit user confirmation before build

## Route Decision

- visualSystem: Swiss System
- subTemplate: Swiss OKF Brief
- theme: okf-yellow
- recipeSequence: cover -> context problem -> definition -> structure -> principles -> implementations -> value -> closing
- imagePolicy: code/directory/metadata proof; avoid decorative stock art; keep format evidence readable
- copyStrategy: explain the technical announcement in plain Chinese and repeat the exact OKF/Open Knowledge Format object on cover and caption
- qaFocus: source fidelity, format/spec terms, proof rows, exact brand signature, no bottom-right page serials
- confidence: high
- matchedKeywords: technical announcement, open format, Google Cloud, Open Knowledge Format, Agent context, YAML, Markdown

## Card Count

Use 8 cards.

Reason:

- The source has one public announcement, one context problem, one definition, one structure explanation, one design-principle section, one implementation proof section, one Agent value section, and one closing thesis.
- Fewer than 8 cards would preserve the look but lose the explanatory sequence that made the reference deck work.
- More than 8 cards is unnecessary because the source is an announcement/spec explainer, not a long report.

## Page Plan

| Card | Role | Source anchor | Must carry | Reader sentence | Visual proof | Cut |
|---:|---|---|---|---|---|---|
| 1 | cover | `Google 推出 Open Knowledge Format` | OKF is a knowledge format for AI Agent context | Google 推出的 OKF 不是新平台，而是让 Agent 读取组织知识的开放格式。 | Directory + YAML metadata proof cards | Detailed implementation names |
| 2 | context problem | `Agent 真正卡住的，往往不是模型能力` | Agents fail when organizational context is scattered | 模型越来越强，但缺表含义、指标口径和系统关系时，答案仍然不稳。 | Three problem rows | Full enterprise examples |
| 3 | definition | `OKF 不是知识库产品，而是一个格式` | Define what OKF is and is not | OKF 用普通目录、Markdown、YAML 和链接表达组织知识。 | It is / it is not comparison | Low-level spec grammar |
| 4 | structure | `一屏看懂 OKF 的结构` | Show folder hierarchy and frontmatter structure | OKF 的结构是目录承载层级、Markdown 承载正文、YAML 承载可查询字段。 | Directory tree + frontmatter code blocks | Complete schema |
| 5 | principles | `它只强约束最少的东西` | Minimal required field, producer/consumer independence, format not platform | OKF 把格式做轻，让不同生产方和消费方能解耦。 | Three proof rows | Edge cases |
| 6 | implementations | `Google 一起开源了哪些东西` | Reference producer, consumer, and sample package proof | Google 不只发布规范，也给了生产方、消费方和样例包证明可运行。 | Producer/consumer/sample rows | Repository URLs |
| 7 | value | `为什么这对 Agent 开发者重要` | Knowledge delivery changes for Agent builders | OKF 把知识交付从临时拼上下文，变成可版本化、可导航、可迁移的知识包。 | Four value rows | Vendor comparison |
| 8 | closing | `这次真正重要的是格式本身` | Durable insight: format as exchange language | 如果 Agent 要长期工作，知识上下文需要可迁移、可审计、可共同维护。 | Black thesis block + three memory rows | Speculation beyond source |

## Visual System

- System: Swiss System
- Sub-template: Swiss OKF Brief
- Template status: `locked`
- Board: Xiaohongshu 1080x1440
- Accent: OKF yellow

## Acceptance

- Uses `.poster.swiss-okf` on every card.
- Includes left yellow rail, warm paper, top metadata, exact brand signature, ghost keyword, orange lead rail, proof rows, code/directory evidence, black/yellow emphasis blocks, and source/footer metadata.
- No bottom-right page serials.
- Rendered images pass validator with 0 fails.
- Example is registered in `references/golden-examples.md`.
