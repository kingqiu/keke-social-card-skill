# 克克社交卡片 Skill

面向小红书图文发布的 Codex Skill。它不只生成卡片图片，也会同时生成标题、正文、标签、素材来源记录和发布前 QA。

这个 Skill 的目标是把一段文章、一个产品说明、一个工具介绍或一个生活方式主题，先整理成可确认的设计方案，再生成可以进入小红书发布流程的完整图文包。

## 能做什么

- 生成小红书 3:4 卡片组图。
- 生成小红书标题、正文、标签和备选文案。
- 根据内容自动选择视觉系统和卡片数量。
- 为长文保留核心观点，不把文章粗暴压成 3-5 页。
- 在生成前给出方案：模板、配色、卡片数量、页面计划、图片策略、文案策略和确认问题。
- 把功能/概念翻译成用户场景和用户价值，避免做成漂亮说明书。
- 规划小红书搜索意图，把人群词、场景词、问题词、类目词和产品词自然放进内容。
- 记录图片来源、图片重绘需求、内容取舍和 QA 结果。
- 用脚本检查方案质量、版面溢出、品牌标识、页面序号、图片对齐、文案质量、风格路由和包体积。

## 输出内容

新任务默认先进入方案阶段，通常先生成：

```text
PROPOSAL.md
BRIEF.md
assets/
├── IMAGE_REQUESTS.md
└── SOURCES.md
```

用户确认方案后，一次完整任务通常会生成：

```text
output/
├── images/
│   ├── xhs-01-cover.png
│   └── xhs-02-*.png
├── xiaohongshu-caption.md
├── copy-variants.md
├── QA.md
└── assets/
    ├── IMAGE_REQUESTS.md
    └── SOURCES.md
```

其中：

- `images/`：最终可发布的卡片图片。
- `xiaohongshu-caption.md`：最终标题、正文和标签。
- `copy-variants.md`：标题、开头、互动问题和标签备选。
- `QA.md`：内容覆盖、文案、审美、素材和验证记录。
- `IMAGE_REQUESTS.md` / `SOURCES.md`：图片需求和来源记录。

## 视觉系统

当前内置 5 套视觉系统：

| 视觉系统 | 适合内容 |
|---|---|
| Editorial E-ink | 阅读、旅行、文化、随笔、生活方式 |
| Swiss System | 职场、数据、框架、清单、技术分析、Claude/Anthropic 官方文章解读 |
| Rednote Native | 小红书原生感、强点击、工具发布、结果展示 |
| Proof Lab | AI 工具、教程、截图、流程、前后对比、证据型内容 |
| Lookbook Journal | 穿搭、美妆、食物、家居、产品和单品拆解 |

对于开放规范、API、数据格式、框架标准等技术公告，Swiss System 里包含 `Swiss OKF Brief` 子模板，适合做高信息密度但仍然有传播性的解释型卡片。

对于 Claude/Anthropic 官方文章、AI 工作流机制、上下文治理这类内容，Swiss System 里包含 `Swiss Anthropic Clay` 子模板：暖白纸底、clay 强调色、黑色主文字、官方说明图证据框，更适合做有品牌感但仍然清晰克制的技术卡片。

## 使用方式

在 Codex 中启用 Skill 后，可以直接这样请求：

```text
把这篇文章做成小红书图文发布包：生成封面/组图、标题、正文、标签和发布 QA。
```

也可以给出更明确的要求：

```text
用这篇长文做一组小红书卡片。请先判断需要多少张卡片，尽量完整还原原文观点，不要故弄玄虚。
```

```text
这是一个 AI 工具介绍，请做成适合小红书发布的图文包，重点突出用户能得到什么结果。
```

默认流程会先输出方案并等待确认。只有当你明确说“直接生成完整小红书发布包”或“不用确认方案”时，才会跳过确认门禁。

## 工程命令

安装依赖：

```bash
npm install
```

创建方案阶段任务：

```bash
npm run create:task -- --dir examples/my-task --name "我的选题" --source article.md --system "Swiss System" --theme anthropic-clay
```

渲染任务：

```bash
npm run render -- <task-dir>
```

验证任务：

```bash
npm run validate -- <task-dir>
```

运行主要质量门：

```bash
npm run check:all -- <task-dir>
```

如果只想跳过较耗时的调色板生成：

```bash
npm run check:all -- <task-dir> --skip-palettes
```

常用单项检查：

```bash
npm run check:route-decision -- <task-dir>
npm run check:content-plan -- <task-dir>
npm run check:proposal-quality -- <proposal-dir>
npm run check:real-workflow-proposal
npm run check:create-task
npm run check:aesthetic-qa -- <task-dir>
npm run check:xhs-copy -- <task-dir>
npm run check:portrait-fit -- <task-dir>
npm run check:regression
npm run check:package-size
```

稳定出品流程见 `references/operating-playbook.md`。它定义了什么时候必须先出方案、什么时候可以直接生成、以及最终交付前怎么验收。

## 质量标准

这个 Skill 的核心质量门包括：

- `Route Decision`：记录为什么选择当前视觉系统、主题、图片策略和文案策略。
- 方案优先：生成前先给模板、张数、配色、图片策略、文案策略和确认问题。
- 具体用户：方案里必须说明写给谁、在什么时刻有用、用户为什么会保存或分享。
- 价值翻译：把功能、机制、技术概念翻译成用户能感到的场景、收益、摩擦减少或身份认同。
- 货架测试：方案里要说明封面为什么能让人停下、为什么值得点开、可见证据是什么。
- 搜索意图：自然规划人群词、场景词、问题词、类目词和产品词，而不是只堆标签。
- Product Brief：APP、AI Skill、工具、产品发布类内容必须先明确目标用户、使用时刻、核心痛点、主证明和不要夸大的边界。
- 内容规划：长文必须先判断卡片数量，每页对应明确的 source anchor。
- 审美 QA：检查封面证据区、图片大小、对齐、页面序号、品牌标识和弱页风险。
- 小红书文案评分：检查标题具体度、正文信息量、人味、核心观点、互动问题和标签。
- 图片策略：横版素材不适合竖版时，应重绘或重组插图资产，而不是把整张卡片交给图像模型生成。
- 品牌标识：所有公开卡片统一使用 `「两克伴」出品`。

## 示例

仓库里的 `examples/` 目录包含多套 Gold 样例和验证样例：

- `rednote-native-card-skill-launch-candidate`
- `proof-lab-skill-handbook-candidate`
- `lookbook-outfit-gold-candidate`
- `lookbook-coffee-gear-gold-candidate`
- `swiss-agent-infra-full-candidate`
- `swiss-okf-brief-gold-candidate`
- `anthropic-steering-claude-code-candidate`
- `editorial-reading-travel-gold-candidate`
- `proposal-confirmation-gate-validation`
- `real-workflow-proposal-validation`

这些样例用于验证不同视觉系统、文案标准和内容规划规则不会互相退化。

## 方案优先流程

新任务默认先进入方案阶段：先判断模板、卡片数量、配色、图片策略、小红书文案策略、具体用户、价值翻译、货架测试、搜索意图和 Product Brief，等你确认后才生成最终卡片图片和发布文案。

创建一个方案阶段任务目录：

```bash
npm run create:task -- --dir examples/my-task --name "我的选题" --source article.md --system "Swiss System" --theme anthropic-clay
```

检查方案质量：

```bash
npm run check:proposal-quality -- examples/my-task
```

方案质量检查会确认：

- 是否有具体读者和使用/搜索场景。
- 是否把功能或概念翻译成用户价值。
- 是否说明封面在小红书货架上为什么值得点击。
- 是否规划自然搜索词，而不是只写标签。
- 产品/工具类内容是否有 Product Brief。
- 是否仍然停在方案阶段，没有提前生成最终图片和文案。

## 许可

当前仓库标记为 `UNLICENSED`。
