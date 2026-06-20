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
- optional `Swiss OKF Brief` sub-template for high-performing technical announcement explainers

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
- Palette validation should use publishable Xiaohongshu-style content, not empty smoke-test copy. The current validation deck uses an AI-tool decision checklist to test cover hook, diagnostic matrix, verdict ledger, semantic footer labels, and no cover page mark.
- Do not mix palettes within one production deck.

Required composition:

- Each page must have a clear judgment, not only a neutral framework list.
- Replace equal-weight PPT grids with one dominant thesis block plus supporting proof/check rows.
- Use Rednote-friendly save value: decision tree, diagnostic checklist, myth/fact, before/after, or action ladder.
- Cards may be strict, but should still feel hand-picked for the reader's scenario.
- Page 2+ must include a reason to keep reading: a concrete test, a contradiction, a mistake to avoid, or a useful checklist.
- Do not place a giant `01` on the cover, and do not use bottom-right page serials as decoration. Large numeric typography is for metrics, framework steps, or interior page structure, not pagination.

Swiss OKF Brief sub-template:

- Use when a technical announcement, open specification, data/API framework, or knowledge-format story needs the sharper public-feed look shown by the OKF reference deck.
- Use `.poster.swiss-okf` from `assets/template-swiss-system.html`.
- Core grammar: left yellow rail, warm paper, monospaced section label, exact brand signature, hairline top/footer rules, oversized light title, pale ghost keyword, orange lead rail, black proof block, yellow highlight block, and source/meta footer.
- Strong pages combine one big judgment with proof rows, code/directory blocks, or producer/consumer cards. Do not use this as a decorative yellow skin for generic listicles.
- Page numbers may appear only in the top-left section label such as `03 · DEFINITION`; do not use bottom-right serials or large cover `01`.

Good recipes:

- Myth/fact block + six diagnostic questions.
- Decision map image + three routing rules + one black verdict strip.
- One oversized number/statement + compact ledger rows.
- OKF Brief cover: split title + directory/code proof cards + three compact bottom claims.
- OKF Brief context page: lead paragraph + three problem rows, with one black row for the dominant pain.
- OKF Brief definition/principle page: two-column `it is / it is not` or numbered proof rows with one yellow and one black emphasis row.

Avoid turning it into generic corporate PPT.

## Rednote Native

Use for Xiaohongshu first images that need feed-native stopping power.

Status: `locked`; Gold example: `examples/rednote-native-card-skill-launch-candidate`.

Inheritance baseline:

- Start from `assets/template-rednote-native.html`.
- Preserve the feed-native grammar: oversized hook, concrete proof/result area, warm high-click color, sticker/brush energy, and thumbnail-first hierarchy.
- Do not sterilize it into a clean corporate grid.
- Use the native scenario/proof components (`.rn-pain-card`, `.rn-output-card`, `.rn-output-shelf`, `.rn-caption-preview`) when the page must prove an AI/tool result without relying on screenshots.
- Reject feature-list explainer pages: "can generate cover/images/copy" is not proof unless the page also shows what the reader receives.

Traits:

- large 6-18 Chinese character hook
- result/emotion/evidence first
- readable at 25% thumbnail
- sticker/arrow/badge only when meaningful

Required composition:

- Cover uses a 60/40 split: one oversized hook area plus one concrete proof/result area.
- The proof/result area must show a screenshot, chat, before/after, product result, scenario card, or native publishing package that validates the hook.
- Page 2 explains credibility quickly: why it works, who it is for, or what changed.
- Page 3+ should become proof/process/save-value pages, not generic feature summaries.
- Use dense but warm Xiaohongshu language: scenario, benefit, proof, and personal relevance.
- For AI Skill launches, prefer "reader receives this result" over "this tool supports these features." The visible proof should include at least two of: cover hook, card plan, output/result, caption/title, save reason.

Template validation:

- Run `npm run validate:rednote-native`.
- Run `npm run validate:rednote-native-themes`.
- The validation sample is generated under `examples/rednote-native-validation/output`.
- The validation checks oversized hero title, proof/result area size, phone proof, native publishing package, evidence strip, before/after save-value page, overflow, and exact brand signature.
- Theme validation renders all production themes plus the legacy fallback and checks background/ink contrast, accent readability, sticker contrast, chat contrast, proof/result area size, overflow, and exact brand signature.
- This is a template smoke test only. It is not a Gold aesthetic reference.

Production themes:

| Theme | Best use |
|---|---|
| `plum-cream` | Default refined Xiaohongshu look; AI tool launch, female-user lifestyle, soft proof |
| `berry-ink` | Stronger high-click launch cards when the hook needs more urgency |
| `matcha-black` | Calm lifestyle, save-value, personal experience, low-pressure education |
| `sky-butter` | Light tutorials, friendly knowledge cards, practical how-to posts |

Legacy theme:

| Theme | Use |
|---|---|
| `coral-blue` | Compatibility only. Do not use as the default Gold direction because it reads more like a basic tool explainer. |

Good recipes:

- Hook + phone proof + native publishing package + 3 scenario chips.
- Pain point title + before/after result panel.
- Big question + three saved decisions/checklist.

Avoid cheap big-character posters with no proof, and avoid feature-list explainer covers that read like product documentation.

Boundary with Proof Lab:

- Use Rednote Native when the AI/tool card set is a launch, positioning, use-case, or high-click first-image package.
- Use Rednote Native when proof is a native output package, chat result, scenario result, or before/after claim that does not require inspecting a real screenshot.
- Do not use Rednote Native for step-by-step UI tutorials where the screenshot is the content.

## Proof Lab

Use for AI tools, app tutorials, screenshots, product workflows, before/after proof.

Status: `locked`; Gold example: `examples/proof-lab-skill-handbook-candidate`.

Inheritance baseline:

- Start from `assets/template-proof-lab.html`.
- Preserve the evidence-first grammar: large screenshot/result hero, bounded proof frame, measured callouts, and credible product-lab tone.
- Do not shrink evidence into decoration or replace proof with abstract AI art.
- Use `.pl-proof-inspector`, `.pl-inspector-media`, and `.pl-inspector-rail` when a diagram, screenshot, or workflow state needs to be inspected rather than merely shown.
- Default Proof Lab proof surfaces should be light: use paper/surface backgrounds, fine borders, and restrained shadows. Do not use large black proof blocks outside `SL-05 Signal Noir` or a small local status element.
- Use only declared Signal theme tokens `SL-01 Electric Blue`, `SL-02 Graphite Mint`, `SL-03 Safety Coral`, `SL-04 Acid Lime`, or `SL-05 Signal Noir`.
- Do not add one-off hex colors or per-card overrides for core theme variables. Switch `data-theme` instead.

Traits:

- screenshot/result as hero
- 1-2 callouts max
- trustworthy evidence chain
- user-facing benefit in title

Required composition:

- At least 55% of the card should be occupied by the screenshot/result/proof area when proof is the page purpose.
- Inspector pages must give the proof image/state the dominant width; explanatory rails sit below or beside it and must not make the proof unreadable.
- Use a bounded proof frame when it improves readability; reserve dark proof frames for `SL-05 Signal Noir` or small status/chrome details.
- Do not place a giant `01` in the cover footer or a right-bottom page serial on interior pages. Proof Lab footers should use takeaway text plus a semantic label such as `Step Flow`, not `02`.
- Callouts must point to actual visible details. Do not label invisible or tiny content.
- Step cards should read as a sequence with one action/result per step.
- The title states the benefit, not the implementation detail.

Template validation:

- Run `npm run validate:proof-lab`.
- Run `npm run validate:proof-lab-themes`.
- Run `npm run check:proof-lab-theme`.
- The validation sample lives in `examples/proof-lab-validation`.
- The validation checks evidence hero size, proof inspector structure, step-flow structure, before/after structure, overflow, callout count, and exact brand signature.
- The theme validation renders all five Signal themes and checks background/text, accent-label, surface, and proof-frame contrast.
- The theme contract check blocks non-contract hex colors and core theme variable redeclarations outside `:root` / `html[data-theme]`.
- Gold reference is `examples/proof-lab-skill-handbook-candidate`, covering diagram-heavy AI workflow/tutorial content with portrait-fit decisions and Xiaohongshu copy.

Signal themes:

| Theme | Best use |
|---|---|
| `SL-01 Electric Blue` | default technical/product proof and SaaS workflows |
| `SL-02 Graphite Mint` | calm AI workflow/tutorial cards; current default |
| `SL-03 Safety Coral` | warnings, before/after, failure analysis, mistakes |
| `SL-04 Acid Lime` | diagnostic/checklist/highlight pages that need sharper attention |
| `SL-05 Signal Noir` | dark product screenshots, premium/night-mode proof pages |

Good recipes:

- Result screenshot hero + two reason callouts.
- Before/after proof split + one takeaway strip.
- 3-step workflow with each step showing a visible output.

Avoid fake robot art and unreadable screenshots.

Boundary with Rednote Native:

- Use Proof Lab when the reader must inspect a screenshot, generated output, workflow state, before/after result, or benchmark evidence.
- Use Proof Lab when most pages are tutorial/proof pages rather than launch/persuasion pages.
- Do not use Proof Lab as a generic AI-tool poster style when no inspectable proof asset exists.

## Lookbook Journal

Use for outfit, beauty, food, home, product, gear, and result breakdown boards.

Status: `locked`; Gold example: `examples/lookbook-outfit-gold-candidate`.

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

Template validation:

- Run `npm run validate:lookbook-journal`.
- The validation sample is generated under `examples/lookbook-journal-validation/output`.
- The validation checks result-first board structure, central result size, item cards, explanatory callouts, bottom verdict strip, overflow, and exact brand signature.
- CSS/SVG placeholder figures are allowed only in validation smoke tests. Gold examples must use real or high-quality generated result assets.

Good recipes:

- Center result image + left/right item cards + bottom verdict strip.
- Full-bleed result crop + translucent material/detail annotations.
- Product/food board with numbered detail crops and texture swatches.

Avoid e-commerce detail-page clutter.
