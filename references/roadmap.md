# Roadmap

## Release Hygiene

- Keep route decisions, content plans, copy, image provenance, and QA files inside every Gold example.
- Run `npm run check:regression` after changing shared templates, routing, or validation scripts.
- Run `npm run check:package-size` before publishing the Skill repository; prune oversized experiments, rebuild font subsets, and avoid shipping private/internal design notes.

Use this roadmap when improving 克克社交卡片 itself.

## Current State

The Skill has a working engineering base:

- Skill metadata and OpenAI UI metadata.
- Five seed visual systems.
- Render and validation scripts.
- Xiaohongshu copy package workflow.
- Example packages and rendered PNGs.

The current weak point is not rendering. The weak points are content-planning reliability, publishing-copy reliability, and aesthetic reliability.

## Correct Improvement Order

### Phase 0: Inheritance Lock

Done when:

- Each visual system starts from its matching seed template.
- Template grammar is documented for typography, palette, spacing, shape language, and layout primitives.
- Each visual system is labeled `pending-lock`, `template-locked`, or `locked`; no system is treated as mature while its source-template audit is incomplete.
- `template-inheritance-audit.md` records accepted deviations and remaining Gold-example gaps.
- Existing custom CSS that weakens the inherited identity is removed, quarantined, or renamed as a separate experimental system.
- Swiss System and Editorial E-ink are checked against their strict identity tests.
- Rednote Native, Proof Lab, and Lookbook Journal keep their native feed/proof/lookbook grammar instead of being normalized into generic grids.

### Phase 1: Standards

Done when:

- `aesthetic-standards.md` defines the publishable bar.
- `content-planning.md` defines card-count selection, source coverage, page-plan schema, and split criteria.
- `xhs-copywriting-guidelines.md` defines title, caption, hashtag, CTA, copy-variant, and copy-QA standards.
- `golden-examples.md` defines the acceptance matrix.
- `qa-checklist.md` includes content coverage, copy, and aesthetic gates, not only technical gates.

### Phase 1.5: Content Planning Reliability

Done when:

- Every long-form example has a `BRIEF.md` page plan with card count rationale.
- Cover copy includes the source topic, timeframe/scope when relevant, and core observation.
- Every non-cover card maps to a source anchor.
- Card text can stand alone without the source article.
- The Skill can choose between compact deck, full-coverage deck, and Part 1 / Part 2 split.

### Phase 1.6: Publishing Copy Reliability

Done when:

- Every example has `xiaohongshu-caption.md` and `copy-variants.md`.
- Title, cover, caption opening, and first 2 cards make the same promise.
- Caption body explains the post without relying on the cards alone.
- Hashtags stay relevant and normally stay within 5-8 tags.
- CTA/comment prompts are natural and do not create hard external conversion pressure.
- `scripts/check-xhs-copy.mjs` passes for long-form regression examples.

### Phase 2: Visual System Upgrade

Upgrade reusable systems before demos:

1. Swiss System: restore strict inherited Swiss first, then adapt framework/data pages for Xiaohongshu.
2. Editorial E-ink: restore inherited editorial magazine grammar before adding lifestyle warmth.
3. Rednote Native: preserve the inherited high-click feed grammar with result/proof, not generic big text.
4. Proof Lab: preserve inherited screenshot/result readability with credible product evidence.
5. Lookbook Journal: preserve inherited result-first lifestyle/product boards with high-quality assets.

Done when each system has a `Gold` example or a clearly marked missing gap.

### Phase 3: Golden Examples

Build the golden matrix from `golden-examples.md`.

Do not mark an example `Gold` unless every page in the set is publishable.

### Phase 4: Demo Rebuild

Only after the relevant visual system has a Gold reference:

- Rebuild `examples/outfit-stylist-xhs-demo` and other Xiaohongshu-only candidates.
- Replace the current `Prototype` status.
- Use it as proof of system quality, not as a hand-polished one-off.

### Phase 5: Release

Before committing/pushing:

- Run render and validator.
- Inspect rendered images manually.
- Confirm no Prototype output is described as Gold.
- Keep failed experiments out of commits unless they are explicitly labeled as failure cases.
