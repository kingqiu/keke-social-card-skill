---
name: keke-social-card-skill
description: "Generate Xiaohongshu/Rednote card-style image sets plus Chinese titles, captions, hashtags, source notes, and QA. Use when asked for 小红书图文, Rednote images, 小红书卡片, carousel covers, 小红书标题/正文/文案, or Chinese Rednote publishing packages."
---

# 克克社交卡片 Skill

Create complete Xiaohongshu/Rednote publishing packages: rendered 3:4 card-style images plus titles, captions, tags, provenance, and QA notes.

Architecture:

```text
deterministic render workflow + Xiaohongshu visual systems + routing layer
```

- Use seed HTML templates, local assets, HTML/CSS to PNG, platform specs, provenance files, and QA.
- Use feed-native Xiaohongshu cover patterns, proof cards, paper styles, style packs, and quality gates.
- Use routing to choose the visual system, copy strategy, image policy, and QA focus.

## Output Package

Produce a Xiaohongshu task folder like:

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

Images are not enough. Always generate title/caption/tag copy unless the user explicitly asks for image-only work.

## Brand Signature

Every visible card signature, byline, or footer must use this exact text:

```text
「两克伴」出品
```

Do not replace the brackets, omit `出品`, use half-width punctuation, or show internal names such as `Keke Social Cards` / `克克社交卡片` on rendered cards.

## Required References

Read only the relevant files:

- `references/style-routing.md` for platform/category/intent routing.
- `references/aesthetic-standards.md` before designing or revising any card set.
- `references/golden-examples.md` when creating examples, evaluating quality, or improving this Skill.
- `references/gold-example-inputs.md` before creating or upgrading a `Gold` example.
- `references/roadmap.md` when improving the Skill itself rather than producing a user card package.
- `references/visual-systems.md` when choosing among Editorial E-ink, Swiss System, Rednote Native, Proof Lab, and Lookbook Journal.
- `references/xhs-feed-strategy.md` for Xiaohongshu first-image strategy.
- `references/xhs-cover-quality.md` before delivering a Xiaohongshu cover.
- `references/xhs-copywriting-guidelines.md` before writing Xiaohongshu titles/captions.
- `references/image-source-brief.md` when any user, AI-generated, or public image is used.
- `references/platform-specs.md` for sizes and filenames.
- `references/qa-checklist.md` before final delivery.

## Workflow

### 1. Intake

Gather only missing information that changes the output:

- Target platform and ratio.
- Source content and must-keep title/terms.
- Whether output should be image-only or a full publishing package.
- Supplied images/screenshots/result examples.
- Account voice, banned words, fixed hashtags, or hard constraints.

For `Gold` examples or publishing-quality packages, use `references/gold-example-inputs.md` and do not mark output as `Gold` when proof assets are missing.

If the user has no image but the route needs evidence or a visual, ask once:

```text
这篇需要 1-2 张视觉素材。三种走法：
A. 你提供自己的照片 / 截图 / 结果图
B. 我生成纯图片素材，再放进卡片
C. 我找公开图源，记录到 SOURCES.md
```

Accept the user's choice and do not keep re-prompting.

### 2. Story

Compress the source into:

1. Core claim.
2. Reader promise.
3. Evidence/result.
4. Page plan.
5. One task per page.

### 3. Standard

Use `references/aesthetic-standards.md` before designing:

- Decide what would make the output publishable for the target platform.
- Identify likely failure modes before building.
- Do not rescue a weak demo with one-off edits if the reusable visual system is the real problem.

When improving the Skill itself, use `references/golden-examples.md` and build system-level examples before polishing an individual demo.
Use `references/roadmap.md` to keep the improvement order focused on standards, reusable visual systems, golden examples, then demos.

### 4. Route

Use `references/style-routing.md`:

- Xiaohongshu + hook/result/emotion -> Rednote Native.
- Xiaohongshu + AI/tools/screenshots/tutorial -> Proof Lab.
- Xiaohongshu + outfit/food/home/product breakdown -> Lookbook Journal.
- Xiaohongshu + career/data/framework/checklist -> Swiss System.
- Xiaohongshu + essay/culture/reading/travel -> Editorial E-ink.

### 5. Source

Create `assets/IMAGE_REQUESTS.md` and `assets/SOURCES.md` whenever images are used.

Record image role, source route, subject zone, safe text zone, avoid zone, crop, and `object-position`.

### 6. Copy

Use `references/xhs-copywriting-guidelines.md`:

- Generate `xiaohongshu-caption.md`.
- Generate `copy-variants.md`.
- Make title/caption match the image promise.
- Avoid inflated claims, fake data, fake endorsements, and misleading tags.
- Mark official/platform-rule uncertainty in `QA.md` when needed.

### 7. Build

- Create a task folder in the current workspace or requested output folder.
- Copy the relevant seed template from `assets/`.
- Replace `<!-- POSTERS_HERE -->` with one poster section per page.
- Put assets under the task folder's `assets/`.
- Render with `node scripts/render-social-deck.mjs <task-dir>`.
- Validate only when requested or before final handoff: `node scripts/validate-social-deck.mjs <task-dir>`.

## Visual Systems

- **Editorial E-ink**: paper, editorial pacing, essays, travel, culture, reading notes.
- **Swiss System**: strict grid, checklists, frameworks, data, workplace.
- **Rednote Native**: feed-native Xiaohongshu hooks, large readable title, result/emotion/evidence first.
- **Proof Lab**: screenshots, product proof, AI tools, workflows, before/after, evidence-first tutorials.
- **Lookbook Journal**: central result plus annotations for outfit, food, beauty, home, product, gear.

## Delivery

Show the rendered cover/cards inline when useful, then ask:

```text
先你自己看，还是我先自动核查一遍？
```

If the user asks for auto-check, run the validator, fix FAILs, and re-render.

Final response should include:

- Output folder.
- Main image paths.
- `xiaohongshu-caption.md` path.
- QA status.
- Source/provenance notes.

## Non-Negotiables

- Do not silently publish image-only output for Xiaohongshu when the user expects a post.
- Do not make claims not supported by the source.
- Do not shrink screenshots or result images into decoration.
- Do not let title/caption promise something the cards do not show.
- Do not use AI-generated full card images as the default; generate assets and compose deterministically.
- Do not omit `SOURCES.md` / `IMAGE_REQUESTS.md` for non-trivial image use.
- Do not treat machine QA as visual approval. Human review is the final gate.
- Do not vary the visible brand signature. It must be exactly `「两克伴」出品`.
- Do not optimize the Skill around one demo. Improve standards, visual systems, and golden examples first.
