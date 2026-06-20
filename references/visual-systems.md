# Visual Systems

## Shared Brand Rule

All visual systems must use the exact visible signature `「两克伴」出品` when a footer, credit, or byline appears on a card. Internal Skill names such as `克克社交卡片` or `Keke Social Cards` are not public card branding.

## Shared Quality Rule

Before using any visual system, apply `aesthetic-standards.md`. A visual system is not valid just because it renders. It must produce a publishable page family where page 2+ do not look weaker than the cover.

## Shared Inheritance Rule

The five visual systems are inherited template systems. They are not mood-board labels.

- Use the matching seed template as the baseline for every production card set.
- Preserve that template's native typography, palette discipline, spacing model, shape language, and layout primitives.
- Additions must be scoped and compatible. Do not replace the system with a hand-made approximation.
- If the desired effect needs different visual grammar, switch systems or create a clearly named new system.
- Keke-specific value should appear in routing, page planning, Xiaohongshu copy, proof selection, and QA, not in loosening the inherited template standards.

Inheritance status must be explicit:

- `template-locked`: source template grammar is audited and protected by checks, but no accepted Gold example exists yet.
- `locked`: template grammar is documented, checked, and has at least one accepted rendered example.
- `pending-lock`: template exists but still needs source-template audit, contract checks, and accepted rendered examples.
- Do not call a system visually mature until it reaches `locked`; `template-locked` only means the template baseline is safe to build on.

## Editorial E-ink

Use for Xiaohongshu essays, travel, reading notes, culture, and quiet lifestyle cards.

Status: `template-locked`; Gold example: `pending`.

Inheritance baseline:

- Start from `assets/template-editorial-eink.html`.
- Preserve the magazine-paper grammar: serif/Songti display, paper atmosphere, editorial pacing, image wells, ledgers, pull quotes, and restrained accent.
- Do not turn it into a flat beige infographic or a sans-serif checklist system.

Traits:

- paper and ink
- editorial pacing
- large serif/Songti title
- restrained accent
- image as atmosphere or evidence

Avoid for screenshot-heavy tutorials or high-click result covers.

## Swiss System

Use for workplace, data, frameworks, checklists, structured comparisons.

Status: `locked`; Gold example: `examples/swiss-agent-infra-full-candidate`.

Inheritance baseline:

- Start from `assets/template-swiss-system.html`.
- Preserve strict Swiss grammar: light large type, grid alignment, hairline rules, straight modules, one accent color, and source template primitives.
- Do not use rounded cards, shadows, multi-pastel blocks, heavy 800/900 display titles, or decorative stickers inside this system.
- If a Xiaohongshu page needs warmer rounded proof cards, route it to Rednote Native or Proof Lab instead.

Traits:

- strict grid
- one accent color
- clean hierarchy
- ledgers, matrices, numbered systems

Accent palettes:

| Accent | Use |
|---|---|
| `ikb` | Default serious technical/workplace deck |
| `lemon-yellow` | High-visibility notes, lightweight frameworks |
| `lemon-green` | Fresh/diagnostic/checklist cards |
| `safety-orange` | Warnings, contradictions, mistake-to-avoid cards |
| `peacock` | Special edition or strong editorial emphasis |

Palette validation:

- Run `npm run validate:swiss-palettes`.
- The validation sample lives in `examples/swiss-palette-validation`.
- All five palettes must pass paper/ink contrast, accent text contrast, overflow, and brand-signature checks before they are treated as available for production.
- Do not mix palettes within one production deck.

Required composition:

- Each page must have a clear judgment, not only a neutral framework list.
- Replace equal-weight PPT grids with one dominant thesis block plus supporting proof/check rows.
- Use Rednote-friendly save value: decision tree, diagnostic checklist, myth/fact, before/after, or action ladder.
- Cards may be strict, but should still feel hand-picked for the reader's scenario.
- Page 2+ must include a reason to keep reading: a concrete test, a contradiction, a mistake to avoid, or a useful checklist.

Good recipes:

- Myth/fact block + six diagnostic questions.
- Decision map image + three routing rules + one black verdict strip.
- One oversized number/statement + compact ledger rows.

Avoid turning it into generic corporate PPT.

## Rednote Native

Use for Xiaohongshu first images that need feed-native stopping power.

Status: `pending-lock`.

Inheritance baseline:

- Start from `assets/template-rednote-native.html`.
- Preserve the feed-native grammar: oversized hook, concrete proof/result area, warm high-click color, sticker/brush energy, and thumbnail-first hierarchy.
- Do not sterilize it into a clean corporate grid.

Traits:

- large 6-18 Chinese character hook
- result/emotion/evidence first
- readable at 25% thumbnail
- sticker/arrow/badge only when meaningful

Required composition:

- Cover uses a 60/40 split: one oversized hook area plus one concrete proof/result area.
- The proof/result area must show a screenshot, chat, before/after, product result, or scenario card that validates the hook.
- Page 2 explains credibility quickly: why it works, who it is for, or what changed.
- Page 3+ should become proof/process/save-value pages, not generic feature summaries.
- Use dense but warm Xiaohongshu language: scenario, benefit, proof, and personal relevance.

Good recipes:

- Hook + phone proof + 3 scenario chips.
- Pain point title + before/after result panel.
- Big question + three saved decisions/checklist.

Avoid cheap big-character posters with no proof.

## Proof Lab

Use for AI tools, app tutorials, screenshots, product workflows, before/after proof.

Status: `locked`; Gold example: `examples/proof-lab-skill-handbook-candidate`.

Inheritance baseline:

- Start from `assets/template-proof-lab.html`.
- Preserve the evidence-first grammar: large screenshot/result hero, bounded proof frame, measured callouts, and credible product-lab tone.
- Do not shrink evidence into decoration or replace proof with abstract AI art.
- Use only declared Signal theme tokens `SL-01 Electric Blue`, `SL-02 Graphite Mint`, `SL-03 Safety Coral`, `SL-04 Acid Lime`, or `SL-05 Signal Noir`.
- Do not add one-off hex colors or per-card overrides for core theme variables. Switch `data-theme` instead.

Traits:

- screenshot/result as hero
- 1-2 callouts max
- trustworthy evidence chain
- user-facing benefit in title

Required composition:

- At least 55% of the card should be occupied by the screenshot/result/proof area when proof is the page purpose.
- Use a dark or bounded proof frame only when it improves readability; avoid decorative browser chrome that steals space.
- Callouts must point to actual visible details. Do not label invisible or tiny content.
- Step cards should read as a sequence with one action/result per step.
- The title states the benefit, not the implementation detail.

Template validation:

- Run `npm run validate:proof-lab`.
- Run `npm run check:proof-lab-theme`.
- The validation sample lives in `examples/proof-lab-validation`.
- The validation checks evidence hero size, step-flow structure, before/after structure, overflow, callout count, and exact brand signature.
- The theme contract check blocks non-contract hex colors and core theme variable redeclarations outside `:root` / `html[data-theme]`.
- Gold reference is `examples/proof-lab-skill-handbook-candidate`, covering diagram-heavy AI workflow/tutorial content with portrait-fit decisions and Xiaohongshu copy.

Good recipes:

- Result screenshot hero + two reason callouts.
- Before/after proof split + one takeaway strip.
- 3-step workflow with each step showing a visible output.

Avoid fake robot art and unreadable screenshots.

## Lookbook Journal

Use for outfit, beauty, food, home, product, gear, and result breakdown boards.

Status: `pending-lock`.

Inheritance baseline:

- Start from `assets/template-lookbook-journal.html`.
- Preserve the result-first board grammar: central inspectable result, surrounding item/detail notes, swatches/crops, paper texture, and controlled hand-note energy.
- Do not turn it into an e-commerce spec sheet or a generic scrapbook.

Traits:

- central complete result
- item/step/material callouts
- arrows and swatches
- hand-note feeling, controlled density

Required composition:

- The complete result must be visually dominant and inspectable.
- Callouts orbit the result and explain choices, not merely repeat item names.
- Use real or high-quality generated assets for faces, outfits, food, products, or UI. CSS stand-ins are Prototype-only.
- Every note should answer why this choice matters: scene, comfort, color, texture, risk, or substitution.
- Keep paper texture and hand-note energy, but avoid scrapbook clutter.

Good recipes:

- Center result image + left/right item cards + bottom verdict strip.
- Full-bleed result crop + translucent material/detail annotations.
- Product/food board with numbered detail crops and texture swatches.

Avoid e-commerce detail-page clutter.
