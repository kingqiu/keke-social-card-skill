# Swiss Agent Infrastructure

Status: `Gold`

Source article:

User-supplied long-form article: `Agent 基础设施演进全景`

## Route Decision

- visualSystem: Swiss System
- theme: ikb
- recipeSequence: cover -> nine source-section explainers -> H2 watchlist closing
- imagePolicy: use portrait-cropped/generated technical illustrations only when they clarify the section; preserve source diagrams and avoid tiny decorative proof
- copyStrategy: preserve the article's core observations in clear Chinese; each card should stand alone without the original article
- qaFocus: source coverage, grid hierarchy, readable density, aligned illustrations, exact brand signature, no page serials
- confidence: high
- matchedKeywords: 2026 Agent infrastructure, framework, runtime, deployment, enterprise checklist, long-form technical analysis

## Card Count Decision

The source has one core thesis plus nine numbered sections. Five cards can validate the Swiss visual system, but cannot fully represent the article.

Use 10 cards:

1. Cover: 2026 H1 Agent infrastructure thesis.
2. Model capability -> deployment capability.
3. FDE and deployment as product capability.
4. Harness as system boundary.
5. API / CLI / MCP as scenario routing.
6. Context management as information scheduling.
7. Runtime, not only framework.
8. Loop Engineering as feedback.
9. Enterprise adoption: task routing before Agent.
10. H2 watchlist and closing takeaway.

## Page Plan

| Card | Role | Source anchor | Must carry | Reader sentence | Visual proof | Cut |
|---:|---|---|---|---|---|---|
| 1 | Cover | Title + opening thesis | 2026 H1 Agent infrastructure is shifting from model-centric to runtime-centric | 2026 上半年，Agent 从 demo 走向生产时，模型外面的运行时系统正在变厚。 | `01-runtime-thickening-crop.png` | Vendor-by-vendor details |
| 2 | Concept shift | `Agent 的主战场，正在从模型能力转向部署能力` | The market conversation is moving from model capability to deployability | 模型仍是底座，但真实竞争开始转向角色、任务状态、协作界面和部署证明。 | `02-model-to-deployment-crop.png` | Individual product timelines |
| 3 | Deployment | `FDE 重新变热，说明部署本身正在变成产品的一部分` | FDE matters because enterprise AI needs workflow, permission, evaluation, and org integration | FDE 重新变热，说明部署不是售后服务，而是产品能力的一部分。 | `03-fde-bridge-crop.png` | Specific company comparisons |
| 4 | Boundary | `Harness 不再只是“外壳”` | Harness defines what an Agent can and cannot do | Harness 是系统边界：目录、命令、网络、凭据和人工介入都要被设计。 | `04-harness-boundary-crop.png` | Low-level sandbox implementation |
| 5 | Routing | `MCP、CLI 和 API，不是信仰之争` | API, CLI, and MCP serve different connection and permission scenarios | API、CLI、MCP 不是站队问题，而是 Agent 要接哪里、怎么管权限、哪些结果进上下文。 | `05-api-cli-mcp-crop.png` | Protocol details |
| 6 | Information scheduling | `上下文管理，从窗口大小变成信息调度` | Context is not only window size; it is information scheduling | 上下文管理从“能塞多少”变成“哪些常驻、哪些按需加载、哪些留在工具里”。 | `06-context-routing-crop.png` | Cache pricing details |
| 7 | Runtime | `部署 Agent，需要 Runtime，不只是 Framework` | Production Agents need durable state, recovery, trace, tenant isolation, and approval flow | Demo 可以跑一次就结束，生产里的 Agent 需要 Runtime 承接长任务和失败恢复。 | `07-runtime-not-framework-crop.png` | Framework catalog |
| 8 | Feedback | `Loop Engineering：重点不是循环，是反馈` | The loop is valuable only when validation, events, traces, and improvement are present | 让模型多跑几轮不难，难的是每轮之后能验证、记录、恢复和改进。 | `08-feedback-loop-crop.png` | Academic loop terminology |
| 9 | Enterprise routing | `企业落地：先别急着多 Agent` | Do not over-Agent simple or stable workflows; route tasks first | 企业落地前先分任务：简单任务用一次调用，稳定路径用 Workflow，开放步骤再上 Agent。 | `09-agent-decision-map-crop.png` | Department-specific cases |
| 10 | Conclusion | `下半年我会重点看什么` | Watch deployment, harness, context, runtime, FDE, and enterprise choices | 下半年最值得看的不是漂亮 demo，而是谁能让 Agent 在真实系统里稳定运行。 | None | Additional trend speculation |

## Visual System

- System: Swiss System
- Template status: `locked`
- Accent: IKB
- Board: Xiaohongshu 1080x1440

## Gold Acceptance

- Validator has 0 fails.
- User confirmed the 10-card full-coverage plan.
- Copy coverage and card text are clear without the original article context.
- Weakest page is still acceptable for publishing.
- Swiss palette validation passes.

## Content Coverage QA

- Covered sections: opening thesis plus all nine numbered source sections.
- Omitted/compressed details: vendor-specific timelines, implementation minutiae, protocol details, and speculative extras.
- Cover includes domain, timeframe, and core observation: yes.
- Every non-cover card maps to a source anchor: yes.
- Claims invented beyond the source: no.
