# Template Inheritance Audit

Use this file to record visual-system inheritance status without exposing private source notes.

## Chromatic Modular Grid

Status: `locked`; Gold example: `examples/chromatic-modular-grid-openai-prompt-guide-gold-candidate`.

Audit result:

- The seed template preserves the Chromatic Modular Grid grammar: 3:4 portrait board, narrow masthead, large Chinese claim, dominant image/assembly zone, three-part evidence rail, content-page proof field, supporting action modules, takeaway strip, and exact brand signature.
- Structure and palette are decoupled. `assets/template-chromatic-modular-grid.html` is the structural source of truth; `assets/themes/chromatic-modular-grid.css` owns `cobalt-coral-lime`, `ultramarine-sand`, and `forest-pink`.
- The typography stack is vendored locally: Source Han Sans Heavy for Chinese display titles, Noto Sans SC for body copy, IBM Plex Mono for labels, and Inter for Latin/numerals.
- Semantic illustrations are inserted GPT Image 2 bitmap assets. SVG/HTML/CSS may provide only the card frame, dividers, grid marks, and tiny accents.
- The accepted Gold example uses a real source-backed OpenAI Prompting deck, a complete official source proof image, a reviewed generated cover asset, and two reviewed generated semantic illustrations.

Guard:

- Run `npm run check:inheritance`.
- Run `node scripts/validate-social-deck.mjs examples/chromatic-modular-grid-openai-prompt-guide-gold-candidate`.
- Run `npm run check:portrait-fit -- examples/chromatic-modular-grid-openai-prompt-guide-gold-candidate` when image assets change.
- Inspect the cover and weakest content page at full size and thumbnail size before delivery.

Locked because:

- The user approved the template direction and the decoupled palette contract.
- The actual 12-card OpenAI Prompting guide passed route, content, layout, portrait-fit, copy, aesthetic, and source-integrity checks.
- The three themes are declared in one theme file and are protected from per-card core-color drift.

## Longform Reader

Status: `template-locked`; reference template: `assets/template-longform-reader.html`; rule reference: `references/longform-reader.md`; first production reference: Meta AI transformation Longform Reader deck.

Audit result:

- The Longform Reader seed keeps a distinct 3:5 reading-card grammar rather than borrowing 3:4 Swiss pages.
- The template structure is separated from palette: `Longform Reader` is the system, `highlighter-blue` is the first theme.
- The seed includes cover highlighter title blocks, cover reading map, wide cover visual, bottom callout, editorial content-page typography, subject-crop / wide-band / art-crop image slots, metric strips, note boxes, verdict strips, list/checklist rows, comparison rows, quote lines, and exact brand signature.
- The system is designed for long articles, reports, WeChat articles, and source-backed case analyses where story continuity matters more than compact framework density.
- Content images are governed by a flexible treatment rule: direct original, subject crop, wide band, redraw/recompose, or omit. Subject crop is not mandatory; it is only used when the meaningful visual is inside a larger incompatible image.
- Public card branding is added through `.brand::before`, with exact text `「两克伴」出品`.

Accepted deviations:

- The board ratio is 3:5 instead of the default 3:4 Xiaohongshu template ratio because long-form reading cards need more vertical text capacity.
- Cover images may be toned for palette cohesion. Content-page images preserve original color by default.
- Cover and closing pages may use stronger editorial/display title treatment, while interior content pages keep a consistent title style.

Guard:

- Use `references/longform-reader.md` for page planning and image policy.
- Run `npm run validate -- <task-dir>` for rendered output.
- Run `npm run check:content-plan -- <task-dir>` and `npm run check:xhs-copy -- <task-dir>` when the task folder includes the full planning/copy package.
- Manual visual review must check story continuity, image treatment intent, accidental blank zones, and final word-count/read-time.

Locked gap:

- Additional themes beyond `highlighter-blue` need production examples before being treated as validated palettes.
- A second accepted example in a non-AI topic would upgrade the system from `template-locked` to `locked`.

## Swiss System

Status: `locked`; Gold examples: `examples/swiss-agent-infra-full-candidate`, `examples/swiss-okf-brief-gold-candidate`; Anthropic Clay reference: `examples/anthropic-steering-claude-code-candidate`.

Audit result:

- The Swiss seed keeps the canonical typography stack, light display type, spacing tokens, accent palettes, straight modules, card primitives, image frames, screenshot frames, and layout primitives.
- Xiaohongshu-only adaptation is limited to using the 1080x1440 board as the production target.
- Public card branding is added only through `.brand-signature::before`, with exact text `「两克伴」出品`.
- Custom rounded/pastel/heavy-title Swiss lookalike components are not allowed.
- Swiss palette smoke test covers `ikb`, `lemon-yellow`, `lemon-green`, `safety-orange`, `peacock`, `anthropic-clay`, `falu-editorial`, `graphite-red`, `falu-dark-lakers`, `iris-embossed`, and `graphite-mint`.
- The Swiss seed includes `Swiss Anthropic Clay` primitives (`.poster.swiss-clay`, `.clay-title`, `.clay-source-figure`, `.clay-decision-row`) for warm official-source explainers.

Accepted deviations:

- Cross-platform board instructions may be removed when this Skill focuses only on Xiaohongshu.
- The visible brand signature may be added as a neutral utility class.
- `safety-orange` uses black `accent-on` for contrast.
- `peacock` uses darker green paper `#12633c` for readable body text.
- `anthropic-clay` intentionally departs from pure white Swiss paper to match Anthropic-like warm official-document cues while preserving straight modules, hairlines, grid, and source-evidence frames.

Guard:

- `npm run check:inheritance`
- `npm run validate:swiss-palettes`

Locked because:

- `examples/swiss-agent-infra-full-candidate` is accepted as the Swiss System Gold reference.
- Validator passes with 0 fails.
- Content planning, Xiaohongshu copy, palette validation, and manual visual review have passed.

## Proof Lab

Status: `locked`; Gold example: `examples/proof-lab-skill-handbook-candidate`.

Audit result:

- The Proof Lab seed keeps the Signal Ledger / Graphite Mint evidence-first grammar.
- The Proof Lab seed includes proof-inspector primitives (`.pl-proof-inspector`, `.pl-inspector-media`, `.pl-inspector-rail`) so evidence images stay inspectable instead of becoming decorative thumbnails.
- The Proof Lab default proof surface is light, with fine borders and restrained shadows. Large black proof blocks are reserved for `SL-05 Signal Noir` or small status elements.
- The Proof Lab seed now declares and validates the full `SL-01` to `SL-05` Signal theme token set and blocks one-off per-card palette drift.
- The accepted Gold example is `examples/proof-lab-skill-handbook-candidate`, upgraded with portrait cover redraw, pattern evidence ledgers, caption package, and portrait-fit decisions.
- Native primitives are `pl-evidence-hero`, `pl-proof-inspector`, `pl-inspector-media`, `pl-inspector-rail`, `pl-callout`, `pl-step-flow`, `pl-before-after`, `pl-proof-side`, and `pl-takeaway`.
- Public card branding is added only through `.brand-signature::before`, with exact text `「两克伴」出品`.
- Proof Lab must keep screenshots/results as the visual center; abstract AI art and generic robot illustrations are not valid proof.

Accepted deviations:

- CSS-only fake UI blocks are allowed only in `examples/proof-lab-validation` as smoke-test placeholders.
- Gold examples must use real, user-supplied, public-source, or documented generated proof assets.

Guard:

- `npm run validate:proof-lab`
- `npm run validate:proof-lab-themes`
- `npm run check:proof-lab-theme`

Locked because:

- A real AI workflow/tutorial Gold example exists and is rendered.
- Proof/result areas are inspectable and not decorative.
- Smoke validation renders and checks proof inspector structure in addition to proof/result size.
- Manual visual review confirms page 2+ do not collapse into generic SaaS UI.
- `npm run check:all -- examples/proof-lab-skill-handbook-candidate` passes.

## Rednote Native

Status: `locked`; Gold example: `examples/rednote-native-card-skill-launch-candidate`.

Audit result:

- The Rednote Native seed keeps the feed-native hook/proof grammar, oversized Chinese title, warm high-click color, sticker/brush energy, phone proof, evidence chips, and before/after save-value primitives.
- The Rednote Native seed includes native scenario and publishing package primitives (`.rn-pain-card`, `.rn-output-card`, `.rn-output-shelf`, `.rn-caption-preview`) so AI/tool launches can show what the reader receives without falling back to a feature-list explainer.
- The accepted Gold example is `examples/rednote-native-card-skill-launch-candidate`, covering AI tool launch cards with a thumbnail-first hook, visible product-result proof, before/after positioning, and Xiaohongshu copy.
- The Rednote Native seed declares four production themes: `plum-cream`, `berry-ink`, `matcha-black`, and `sky-butter`. `plum-cream` is the default refined Xiaohongshu direction. `coral-blue` remains only as a legacy compatibility fallback.
- Public card branding is added only through `.brand-signature::before`, with exact text `「两克伴」出品`.
- Rednote Native should stay thumbnail-first and evidence-backed, not become a clean corporate grid.

Accepted deviations:

- Validation examples may use synthetic phone/chat proof and CSS blocks as smoke-test placeholders.
- Gold examples must use real product proof, screenshots, before/after outputs, or explicitly documented generated assets.

Guard:

- `npm run validate:rednote-native`
- `npm run validate:rednote-native-themes`
- `npm run check:inheritance`

Locked because:

- Native primitives are protected by inheritance checks.
- Smoke validation renders and checks structure, native publishing package proof, proof/result area, overflow, and brand signature.
- `examples/rednote-native-card-skill-launch-candidate` is accepted as the Rednote Native Gold reference.
- Manual visual review confirms the cover has feed-native stopping power and page 2+ remain evidence-led.
- Theme validation passes for all four production themes and the legacy fallback.
- `npm run check:all -- examples/rednote-native-card-skill-launch-candidate` passes.

## Lookbook Journal

Status: `locked`; Gold example: `examples/lookbook-outfit-gold-candidate`.

Audit result:

- The Lookbook Journal seed keeps the result-first board grammar, central inspectable result, surrounding item/detail notes, swatches/crops, paper texture, and controlled hand-note energy.
- The accepted Gold example is `examples/lookbook-outfit-gold-candidate`, covering outfit/lifestyle cards with generated bitmap assets, item logic, texture close-ups, and Xiaohongshu copy.
- Public card branding is added only through `.brand-signature::before`, with exact text `「两克伴」出品`.
- Lookbook Journal must remain lifestyle/product-result led, not become an e-commerce spec sheet or generic scrapbook.

Accepted deviations:

- CSS/SVG placeholder figures are allowed only in validation smoke tests.
- Gold examples must use real or high-quality generated assets for outfits, products, food, beauty, home, or gear.

Guard:

- `npm run validate:lookbook-journal`
- `npm run check:inheritance`

Locked because:

- Native primitives are protected by inheritance checks.
- Smoke validation renders and checks result board structure, central result size, item cards, verdict strip, overflow, and brand signature.
- `examples/lookbook-outfit-gold-candidate` is accepted as the Lookbook Journal Gold reference.
- Manual visual review confirms page 2+ do not collapse into weak template filler.
- Realistic bitmap assets are documented and used inside the inherited template rather than replacing the whole card with generated posters.
