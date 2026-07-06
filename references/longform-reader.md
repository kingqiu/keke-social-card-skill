# Longform Reader

Use Longform Reader for Xiaohongshu/Rednote decks that turn a long article, report, essay, or source-backed business/technology analysis into a readable card series.

It is a visual system, not a color scheme. The template structure and the palette must be chosen separately.

## When To Use

Choose Longform Reader when most of these are true:

- The source is a long article, report, essay, WeChat article, markdown note, or multi-section analysis.
- The reader job is "understand the story and save the reasoning", not "learn a UI workflow" or "inspect screenshots".
- The post needs more text than a compact Swiss checklist can carry.
- The source has a narrative arc, contradiction, case study, or management lesson.
- The deck may need 10-18 cards, and 9 cards would either flatten the story or force text to become too small.

Do not use Longform Reader when:

- The strongest proof is real UI/screenshots/workflow states. Use Proof Lab.
- The strongest job is a high-click launch/result package. Use Rednote Native.
- The source is a strict framework/checklist with little narrative. Use Swiss System.
- The content is primarily lifestyle/product result curation. Use Lookbook Journal.
- The deck is a quiet culture/travel/reading mood piece with very little structure. Use Editorial E-ink.

## Structure And Theme Separation

Longform Reader has two independent layers:

1. **Template structure**: page ratio, typography, cover architecture, content-page recipes, image-placement rules, and story-flow rules.
2. **Theme / palette**: color tokens only. A theme may change paper, accent, highlight, note, and visual tint, but must not change the template grammar.

Record both in `BRIEF.md`:

```text
- visualSystem: Longform Reader
- template: Highlight Cover + refined reading pages
- ratio: 3:5
- theme: highlighter-blue
- recipeSequence: event hook -> baseline contrast -> reversal -> mechanisms -> consequences -> reader checklist -> final takeaway
```

Do not rename a palette as a new template. If the layout grammar changes, create a new Longform Reader variant and document why.

## Default Theme

`highlighter-blue` is the first locked theme, derived from the Meta AI transformation deck.

Tokens:

- `paper`: warm off-white / editorial paper
- `ink`: dark graphite
- `body`: soft charcoal gray
- `accent`: restrained ochre for emphasis and metadata
- `yellow`: pale highlighter yellow for cover title block
- `blue`: pale highlighter blue for cover title/summary blocks
- `red`: muted terracotta, allowed only for cover visual toning when it improves cover cohesion
- `note`: pale gray note boxes

Rules:

- Keep most content pages light and editorial. Do not turn every page into a colored block.
- Use yellow/blue as structural highlights, not decoration.
- Cover images may be tinted to fit the cover palette.
- Content-page images should generally keep their original color unless the user explicitly asks for recoloring or the image is being redrawn as a new asset.

Future themes should be added as named palettes, for example `peacock-paper`, `mono-ochre`, or `clay-report`, without changing the page recipes.

## Ratio

Default ratio: `3:5`.

Use 1440 x 2400 for deterministic render output. This ratio gives long-form text more room than 3:4 while staying portrait-native for Xiaohongshu.

Do not hard-stretch a landscape source image to fill a square or portrait hole. Preserve meaningful proportions through one of:

- a wide image band aligned to the card text margins
- subject crop
- redraw/recompose only the inserted asset
- omit the image when it harms the page

## Cover Rules

The cover is not a landing page. It must sell the article in one second.

Required cover elements:

- `全文约X字｜阅读约Y分钟`, based on the card/caption package length, not the original source length
- clear title with source object/scope/timeframe when relevant
- one sentence that states the core observation
- a compact reading map or 2-3 promises when the article is complex
- one strong source/generated visual, preferably wide if the layout uses a wide visual slot
- exact visible brand signature: `「两克伴」出品`

Cover anti-patterns:

- large accidental empty area in the middle
- full-bleed image with no margins when the typography uses clear text margins
- stretching a good wide image into a square or portrait shape
- adding a bottom conclusion band that fills the page too aggressively
- placing brand signature in a visually weak or unreadably small corner

## Page Count

Do not force a Longform Reader deck into 9 cards.

Recommended bands:

- 8-10 cards: medium article with one clear argument and few examples
- 11-14 cards: long article/report with one case study and several implications
- 15-18 cards: dense essay/report with multiple argument turns
- More than 18 cards: split into Part 1 / Part 2 unless the user explicitly wants a long deck

Each page must have one story job. If a page exists only because the source had a paragraph, cut or merge it.

## Narrative Page Plan

Longform Reader must read like a story, not a directory of extracted points.

Default narrative sequence:

1. **Cover**: object + consequence.
2. **Inciting question / event**: what happened and why should the reader care?
3. **Baseline contrast**: what was true before the reversal?
4. **Reversal**: what changed in status, incentive, identity, or system logic?
5. **Mechanism 1**: first cause or pressure.
6. **Mechanism 2**: second cause or pressure.
7. **Metric / evidence**: a concrete number, example, or source-backed proof.
8. **Consequence 1**: culture, trust, quality, cost, or user impact.
9. **Consequence 2**: incident, risk, or failure mode.
10. **Reader transfer**: what this means for the reader's company/workflow/life.
11. **Checklist / decision lens**: what to check before acting.
12. **Final takeaway**: one durable sentence worth saving.

For every page, write a `Reader sentence` in `BRIEF.md`: one sentence that the reader should understand without the original article. Pages should connect through cause/effect language such as:

- "故事从..."
- "问题恰恰在于..."
- "转折发生在..."
- "接下来..."
- "然后，后果会落到..."
- "所以..."

Avoid page titles that only name topics: `指标`, `安全`, `文化`. Prefer titles that move the story: `低信任之后，指标会开始变形`.

## Content Writing Rules

Card copy is not a full copy of the source. It is a faithful extraction and rewrite.

- Preserve the source thesis, argument turns, examples, caveats, and final lesson.
- Rewrite from the account/user's perspective, not from the assistant's production perspective.
- Do not say "我重新读了这篇文章" or describe the writing process.
- Use natural explanatory prose, not directory-style summaries.
- Keep interior body text readable; if the page becomes too dense, add a page rather than shrinking the font.
- Use accent paragraphs to carry the point of the page, not random decoration.
- The caption should usually be 650-950 Chinese characters for long-form/framework posts, unless the user asks shorter.

## Interior Page Recipes

Use these recipes as the first choice:

- **Reader page**: title + rule + 3-5 prose blocks with 1-2 accent paragraphs.
- **Image + explanation page**: title + subject image + 2-3 prose blocks.
- **Pressure/list page**: title + 3 numbered rows + final verdict strip.
- **Metric page**: title + lead + metric strip + explanation + note box.
- **Comparison page**: title + image or lead + two-column comparison + verdict.
- **Checklist page**: title + 3-5 large rows + final save-worthy callout.
- **Closing page**: title + optional subject image + final human sentence.

Keep the page family consistent:

- Content pages use the same interior title style.
- Cover and closing may use a more editorial/display title if the set needs a bookend effect.
- Brand signature usually sits top-right on content pages. Increase it enough to read on phone, but keep it secondary.
- Avoid bottom-right page serials as decoration.

## Image Policy

This is the most important flexible rule.

Content images are optional. They must support the story, not merely fill space.

For every image, decide one of five treatments:

1. **Use original image directly** when its aspect ratio and internal composition already fit the slot and the whole image carries useful meaning.
2. **Subject crop** when the original image is a full card, has embedded slogans, small people, footers, or large empty areas, but contains one useful central diagram/object.
3. **Wide band** when a landscape image is proof or the whole composition matters; align it with the text/rule margins.
4. **Redraw/recompose asset** with GPT Image when the idea matters but the source image is the wrong ratio, too low quality, or visually incompatible. Redraw only the inserted image asset, then place it back inside the deterministic HTML template.
5. **Omit** when the image does not add information or makes the page worse.

Subject crop does not mean "always crop every original image." It means "crop only when the meaningful subject is inside a larger, less compatible image." If the original image already works, keep it.

When using source images:

- Do not change content-page image color by default.
- Do not keep embedded source-card slogans, tiny footer brands, or unrelated small characters if they conflict with the new page's text system.
- Do not stretch images to fill the slot.
- Record `image role`, `treatment`, `crop/object-position`, and reason in `assets/SOURCES.md` or `assets/IMAGE_REQUESTS.md`.

## QA Checklist

Before delivery, inspect:

- Does the deck have a story arc, or is it only a stack of points?
- Does page 2 establish why the reader should continue?
- Are cover, title, caption opening, and first two pages making the same promise?
- Are content-page titles visually consistent?
- Did any original image accidentally remain as a mini-card inside the card?
- Is every image treatment intentional: direct, subject crop, wide band, redraw, or omit?
- Does any page have accidental middle/bottom blank space?
- Are note boxes/verdict strips sized as emphasis, not heavy fillers?
- Is `全文约X字｜阅读约Y分钟` based on the final package length?
- Is `「两克伴」出品` visible and readable but not dominant?
- Does `BRIEF.md` record page roles and source anchors?
- Does `QA.md` record ratio, validation, image-treatment decisions, and remaining risks?

## Required Files In Output Package

In addition to rendered images:

- `BRIEF.md`: route decision, theme, ratio, page plan, image policy, story sequence
- `xiaohongshu-caption.md`: title, detailed caption, hashtags
- `copy-variants.md`: title/opening/CTA/tag variants
- `QA.md`: render check, visual check, content/story check
- `assets/SOURCES.md`: source article and image treatment
- `assets/IMAGE_REQUESTS.md`: generated/redrawn image prompts and crop notes when relevant

## How To Ask For This Template

You do not need to remember the English name `Longform Reader`.

These natural phrases should all route to this template:

- "长文阅读卡片"
- "深度阅读卡片"
- "阅读型小红书模板"
- "公众号长文转小红书"
- "把这篇长文/报告做成小红书"
- "像上次 Meta 那套长文卡片"
- "适合长文章的阅读型模板"

Short prompt:

```text
把这篇长文做成小红书阅读卡片。
像上次 Meta 那套长文卡片一样，先给我方案和页数，不要直接生成。
```

Explicit prompt:

```text
用 keke-social-card-skill 的 Longform Reader 模板，把这篇长文做成小红书图文。
模板结构用 Longform Reader，配色用 highlighter-blue。
请先给方案和页数，不要直接生成。
```

If you already want the full package:

```text
用 keke-social-card-skill 的 Longform Reader 模板直接生成完整小红书发布包。
结构用 Longform Reader，theme 用 highlighter-blue，比例 3:5。
内容页图片按规则判断：可直接用原图、截主体、宽图保留、重绘或不用图，不要机械裁切。
```
