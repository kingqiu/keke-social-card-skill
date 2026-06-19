# Roadmap

Use this roadmap when improving 克克社交卡片 itself.

## Current State

The Skill has a working engineering base:

- Skill metadata and OpenAI UI metadata.
- Five seed visual systems.
- Render and validation scripts.
- Xiaohongshu copy package workflow.
- Example packages and rendered PNGs.

The current weak point is not rendering. The weak point is aesthetic reliability.

## Correct Improvement Order

### Phase 1: Standards

Done when:

- `aesthetic-standards.md` defines the publishable bar.
- `golden-examples.md` defines the acceptance matrix.
- `qa-checklist.md` includes aesthetic gates, not only technical gates.

### Phase 2: Visual System Upgrade

Upgrade reusable systems before demos:

1. Rednote Native: high-click first card with result/proof, not generic big text.
2. Lookbook Journal: result-first lifestyle/product boards with high-quality assets.
3. Proof Lab: screenshot/result readability with credible product evidence.
4. Editorial E-ink: refined Xiaohongshu reading, culture, travel, and essay cards.
5. Swiss System: framework/data cards that avoid corporate PPT.

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
