# Style Routing

Route by platform, intent, assets, and content type.

## Routing Table

| Request | Visual System | Notes |
|---|---|---|
| 小红书 + 强点击 / 结果 / 情绪 | Rednote Native | First image must stop the feed. |
| 小红书 + AI 工具 / 截图 / 教程 | Proof Lab | Screenshot/result must be readable. |
| 小红书 + 穿搭 / 食谱 / 单品拆解 | Lookbook Journal | Result image is the anchor. |
| 小红书 + 职场 / 数据 / 框架 / 清单 | Swiss System | Keep hierarchy clean, but avoid PPT-like pages. |
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

Tie-breakers:

- If over half the pages need screenshots, diagrams, or visible workflow states, choose Proof Lab.
- If the cover promise is an emotional/use-case hook and proof can be represented as a native result package, choose Rednote Native.
- If the source has both a high-click launch angle and detailed tutorial proof, produce separate Rednote Native and Proof Lab decks rather than merging grammars.
- If the only "proof" is a list of features, do not call it proof. Rewrite it as reader outcome, ask for assets, or lower confidence in `QA.md`.

## Route Output

For every task decide:

- `visualSystem`
- `theme`
- `recipeSequence`
- `imagePolicy`
- `copyStrategy`
- `qaFocus`
