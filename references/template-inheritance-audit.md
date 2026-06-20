# Template Inheritance Audit

Use this file to record visual-system inheritance status without exposing private source notes.

## Swiss System

Status: `locked`; Gold example: `examples/swiss-agent-infra-full-candidate`.

Audit result:

- The Swiss seed keeps the canonical typography stack, light display type, spacing tokens, accent palettes, straight modules, card primitives, image frames, screenshot frames, and layout primitives.
- Xiaohongshu-only adaptation is limited to using the 1080x1440 board as the production target.
- Public card branding is added only through `.brand-signature::before`, with exact text `「两克伴」出品`.
- Custom rounded/pastel/heavy-title Swiss lookalike components are not allowed.
- Swiss palette smoke test covers `ikb`, `lemon-yellow`, `lemon-green`, `safety-orange`, and `peacock`.

Accepted deviations:

- Cross-platform board instructions may be removed when this Skill focuses only on Xiaohongshu.
- The visible brand signature may be added as a neutral utility class.
- `safety-orange` uses black `accent-on` for contrast.
- `peacock` uses darker green paper `#12633c` for readable body text.

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
- The Proof Lab seed now declares and validates the full `SL-01` to `SL-05` Signal theme token set and blocks one-off per-card palette drift.
- The accepted Gold example is `examples/proof-lab-skill-handbook-candidate`, upgraded with portrait cover redraw, pattern evidence ledgers, caption package, and portrait-fit decisions.
- Native primitives are `pl-evidence-hero`, `pl-callout`, `pl-step-flow`, `pl-before-after`, `pl-proof-side`, and `pl-takeaway`.
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
- Manual visual review confirms page 2+ do not collapse into generic SaaS UI.
- `npm run check:all -- examples/proof-lab-skill-handbook-candidate` passes.

## Rednote Native

Status: `locked`; Gold example: `examples/rednote-native-card-skill-launch-candidate`.

Audit result:

- The Rednote Native seed keeps the feed-native hook/proof grammar, oversized Chinese title, warm high-click color, sticker/brush energy, phone proof, evidence chips, and before/after save-value primitives.
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
- Smoke validation renders and checks structure, proof/result area, overflow, and brand signature.
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
