# QA Checklist

## Aesthetic Gate

- Read `aesthetic-standards.md` before judging visual quality.
- The weakest page in the set is still acceptable for publishing.
- Page 2+ do not collapse into an engineering demo after a strong cover.
- The design improves the reusable system, not only the current demo.
- If this is a golden example, classify it using `golden-examples.md`.

## Brand Signature

- Visible card signature, byline, or footer is exactly `「两克伴」出品`.
- Rendered cards do not use internal Skill names such as `Keke Social Cards` or `克克社交卡片` as the public-facing brand.
- Punctuation uses full-width Chinese book-title brackets: `「` and `」`.

## Dimensions

- Xiaohongshu: `1080 x 1440`.
- Do not deliver WeChat cover pairs, WeChat forwarding images, or generic social sizes from this Skill.

## Visual QA

- One clear focal point per card.
- Title readable at thumbnail size.
- Text does not overflow or touch edges.
- Footer/captions do not collide.
- Screenshots and result images are readable.
- Images are not stretched.
- Paired comparison images align on the same top and bottom edge even when captions have different line counts.
- Landscape hero/illustration images are either redrawn/recomposed for portrait, split across pages, or explicitly justified as proof assets.
- Redraws are inserted bitmap assets inside the inherited template, not generated full-card replacements.
- Source illustration redraws use PNG/JPG/WebP; SVG is not accepted as the final redraw unless it is only a tiny structural symbol.
- Faces, logos, food, product details, and key UI text are not covered.
- 3:4 cards fill the portrait canvas intentionally.

## Xiaohongshu QA

At 25% size, cover should show:

1. What this is.
2. Why it is worth tapping.
3. Where proof/result lives.

## Content Coverage QA

- `BRIEF.md` explains why this card count was chosen.
- Long-form sources are not forced into 3-5 cards when that would lose major arguments.
- Page plan maps every non-cover card to a source heading, paragraph, image, screenshot, or user-provided note.
- Cover states the topic/domain, timeframe or scope when relevant, and the core observation.
- Each card can be understood without reading the original source.
- Each card has one main job; unrelated source sections are not merged just to reduce page count.
- Omitted or compressed source material is named in `QA.md`.
- The deck does not invent claims, numbers, examples, or endorsements.

## Copy QA

- Title is not exaggerated or misleading.
- Title, cover, caption opening, and first 2 cards make the same promise.
- Caption explains why the post matters before listing details.
- Main body stays within 1000 characters.
- Main body is detailed enough for the source; long-form/framework posts should not collapse into a tiny abstract.
- Copy has a visible human position, friction, or handprint instead of a neutral brochure voice.
- Copy does not expose production workflow: no mention of how many cards/images were generated, how the article was split, or which card says what.
- Copy avoids common AI-flavored phrases such as `赋能`, `重塑`, `重新定义`, `随着...发展`, and `未来可期`.
- Caption has 3-6 concrete takeaways, steps, or use cases.
- Caption includes a natural comment/discussion prompt.
- Caption does not invent facts.
- Hashtags are relevant and normally limited to 5-8.
- High-risk claims are sourced or removed.
- Copy matches the card images.
- `copy-variants.md` includes title options, opening options, CTA/comment prompts, and hashtag alternatives.

## Asset QA

- `IMAGE_REQUESTS.md` exists when images are used.
- `SOURCES.md` exists when images are used.
- Public-source URLs are recorded.
- AI images are marked as AI-generated assets.
- Wide source images record `portrait-fit decision` in `IMAGE_REQUESTS.md` or `QA.md`.
- `object-fit: contain` is not used as a lazy fix for unsuitable landscape cover art.
- `IMAGE_REQUESTS.md` states whether AI generation redrew an inserted asset or a complete poster; complete-poster generation requires explicit user request.

## Human Gate

Technical PASS does not equal visual PASS. Human review is the final gate.
