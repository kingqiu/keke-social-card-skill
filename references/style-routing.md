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

## Route Output

For every task decide:

- `visualSystem`
- `theme`
- `recipeSequence`
- `imagePolicy`
- `copyStrategy`
- `qaFocus`
