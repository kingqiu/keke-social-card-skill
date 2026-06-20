# Template Inheritance Audit

Use this file to record visual-system inheritance status without exposing private source notes.

## Swiss System

Status: `template-locked`; Gold example: `pending`.

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

Still required before `locked`:

- One accepted Swiss Gold candidate rendered from a real Xiaohongshu content scenario.
- Validator pass with 0 fails.
- Manual visual review confirms it does not look like a corporate PPT or generic checklist card.
