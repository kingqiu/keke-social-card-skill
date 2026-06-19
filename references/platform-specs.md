# Platform Specs

## Xiaohongshu / Rednote

- Ratio: `3:4`
- Export size: `1080 x 1440`
- Default filenames:
  - `images/xhs-01-cover.png`
  - `images/xhs-02-*.png`
- Full package should include:
  - `xiaohongshu-caption.md`
  - `copy-variants.md`
  - `QA.md`

Do not create WeChat cover pairs, WeChat forwarding images, or generic social sizes in this Skill. Keep the output focused on Xiaohongshu 3:4 card-style images.

All cards should be rendered as individual `.poster.xhs` nodes.
