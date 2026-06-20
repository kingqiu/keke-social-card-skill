---
name: keke-social-card-skill
description: "Generate Xiaohongshu/Rednote card-style image sets plus Chinese titles, captions, hashtags, source notes, and QA. Use when asked for 小红书图文, Rednote images, 小红书卡片, carousel covers, 小红书标题/正文/文案, or Chinese Rednote publishing packages."
---

# 克克社交卡片 Skill

Create complete Xiaohongshu/Rednote publishing packages: rendered 3:4 card-style images plus titles, captions, tags, provenance, and QA notes.

Architecture:

```text
deterministic render workflow + locked source templates + Xiaohongshu routing/copy layer
```

- Use seed HTML templates, local assets, HTML/CSS to PNG, platform specs, provenance files, and QA.
- Preserve inherited template standards before adding new styling. Keke may route, adapt copy, and add QA; it must not replace a source template with a looser lookalike.
- Use routing to choose the inherited visual system, copy strategy, image policy, and QA focus.

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
- `references/content-planning.md` before choosing card count or compressing long-form source material.
- `references/aesthetic-standards.md` before designing or revising any card set.
- `references/golden-examples.md` when creating examples, evaluating quality, or improving this Skill.
- `references/gold-example-inputs.md` before creating or upgrading a `Gold` example.
- `references/roadmap.md` when improving the Skill itself rather than producing a user card package.
- `references/template-inheritance-audit.md` when locking or auditing inherited visual-system templates.
- `references/visual-systems.md` when choosing among Editorial E-ink, Swiss System, Rednote Native, Proof Lab, and Lookbook Journal.
- `references/xhs-feed-strategy.md` for Xiaohongshu first-image strategy.
- `references/xhs-cover-quality.md` before delivering a Xiaohongshu cover.
- `references/xhs-copywriting-guidelines.md` before writing Xiaohongshu titles/captions.
- `references/image-source-brief.md` when any user, AI-generated, or public image is used.
- `references/platform-specs.md` for sizes and filenames.
- `references/qa-checklist.md` before final delivery.

## Template Inheritance Contract

This Skill is an integration layer, not a freehand visual rewrite.

- Start every card set from one of the seed templates in `assets/`.
- Treat each seed template as the source of truth for typography, spacing, palette, shape language, and component behavior.
- Do not rename a visual system while changing its grammar. If the template standard is changed, create a new visual system name instead.
- Do not make "similar but softer" replacements for strict systems. A strict system must preserve its hard rules even when adapted for Xiaohongshu.
- Keke-specific improvements belong in routing, Xiaohongshu copy, image policy, QA, example selection, and small wrapper components.
- Any reusable CSS added to a source-derived template must be additive, scoped, and compatible with the template's existing primitives.
- If a page cannot be made publishable while keeping the inherited template rules, route it to another visual system rather than diluting the current one.

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

### 2. Content Plan

Use `references/content-planning.md` before choosing page count.

Do not default to 3-5 cards. Decide the smallest card set that preserves the source meaning:

1. Core claim.
2. Reader promise.
3. Evidence/result.
4. Source structure and major sections.
5. Recommended card count.
6. One task per page.

For long-form or structured source material, create a page plan in `BRIEF.md` with:

```text
Card | Role | Source anchor | Must carry | Reader sentence | Visual proof | Cut
```

Rules:

- Cover must include the domain/object, timeframe or scope when relevant, and the core observation.
- Every non-cover card must map to a source anchor.
- Card text must be understandable without the original article.
- Do not compress unrelated major sections into one card only to keep the deck short.
- If honest coverage needs more than 12 cards, split into Part 1 / Part 2.

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
- Make title, cover, caption opening, and first 2 cards match the same promise.
- For long-form/framework posts, preserve the source meaning while making the copy understandable without the original article.
- Keep the main caption body within 1000 characters; for long-form/framework posts, aim for detailed 650-950 character copy rather than a tiny abstract.
- Give the copy a visible human position, friction, or handprint. Avoid neutral brochure voice and common AI-flavored phrases.
- Do not expose production workflow in the caption. Never say how many cards/images were generated, how the article was split, or which page/card contains what. Tell the source story directly.
- Include 3-5 title variants, 2-3 opening variants, 2-3 CTA/comment prompts, and compact/broader hashtag sets in `copy-variants.md`.
- Use 5-8 relevant hashtags by default.
- Avoid inflated claims, fake data, fake endorsements, and misleading tags.
- Avoid hard external conversion pressure unless the user provides a compliant commercial flow.
- Mark official/platform-rule uncertainty in `QA.md` when needed.

### 7. Build

- Create a task folder in the current workspace or requested output folder.
- Copy the relevant seed template from `assets/`.
- Replace `<!-- POSTERS_HERE -->` with one poster section per page.
- Put assets under the task folder's `assets/`.
- Render with `node scripts/render-social-deck.mjs <task-dir>`.
- For long-form sources, check planning with `node scripts/check-content-plan.mjs <task-dir>`.
- Check Xiaohongshu copy with `node scripts/check-xhs-copy.mjs <task-dir>`.
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
- Do not approximate inherited templates from memory. Use the seed template and its rules as the baseline.
- Do not call a result `Swiss System`, `Editorial E-ink`, `Rednote Native`, `Proof Lab`, or `Lookbook Journal` if it violates that system's template grammar.
- Do not make claims not supported by the source.
- Do not shrink screenshots or result images into decoration.
- Do not let title/caption promise something the cards do not show.
- Do not use AI-generated full card images as the default; generate assets and compose deterministically.
- Do not omit `SOURCES.md` / `IMAGE_REQUESTS.md` for non-trivial image use.
- Do not treat machine QA as visual approval. Human review is the final gate.
- Do not vary the visible brand signature. It must be exactly `「两克伴」出品`.
- Do not optimize the Skill around one demo. Improve standards, visual systems, and golden examples first.
