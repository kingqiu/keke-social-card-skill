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

Status: `template-locked`; Gold example: `pending`.

Audit result:

- The Proof Lab seed keeps the Signal Ledger / Graphite Mint evidence-first grammar.
- The Proof Lab seed now declares the full `SL-01` to `SL-05` Signal theme token set and blocks one-off per-card palette drift.
- Native primitives are `pl-evidence-hero`, `pl-callout`, `pl-step-flow`, `pl-before-after`, `pl-proof-side`, and `pl-takeaway`.
- Public card branding is added only through `.brand-signature::before`, with exact text `「两克伴」出品`.
- Proof Lab must keep screenshots/results as the visual center; abstract AI art and generic robot illustrations are not valid proof.

Accepted deviations:

- CSS-only fake UI blocks are allowed only in `examples/proof-lab-validation` as smoke-test placeholders.
- Gold examples must use real, user-supplied, public-source, or documented generated proof assets.

Guard:

- `npm run validate:proof-lab`
- `npm run check:proof-lab-theme`

Still required before `locked`:

- One accepted Proof Lab Gold example rendered from a real AI tool/tutorial scenario.
- Proof/result areas are inspectable and not decorative.
- Manual visual review confirms page 2+ do not collapse into generic SaaS UI.
