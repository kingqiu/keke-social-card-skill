# Swiss Palette Validation

Status: `Palette Smoke Test`

Purpose:

- Verify all Swiss System accent palettes render from the same seed template.
- Check cover, matrix/accent cell, and verdict/ink-card compositions across palettes.
- Produce a contact sheet for manual review.

## Proposal Confirmation

- requiredBeforeBuild: yes
- status: legacy-confirmed
- confirmationSource: accepted reference example or validation package created before the proposal-confirmation gate became mandatory; future article/long-form tasks must receive explicit user confirmation before build

## Palettes

| Accent | Role |
|---|---|
| `ikb` | Default serious technical/workplace deck |
| `lemon-yellow` | High-visibility notes, lightweight frameworks |
| `lemon-green` | Fresh/diagnostic/checklist cards |
| `safety-orange` | Warning, contradiction, mistake-to-avoid cards |
| `peacock` | Strong special edition / editorial emphasis |

## Validation Method

Run:

```bash
npm run validate:swiss-palettes
```

The script:

1. Creates one temporary HTML file per accent.
2. Renders 3 representative Xiaohongshu cards per accent.
3. Checks paper/ink contrast, accent/accent-on contrast, overflow, and brand signature.
4. Writes `output/palette-summary.json`.
5. Writes `output/contact-sheet.png` for manual review.

## Manual Review Notes

- `ikb`, `lemon-yellow`, `lemon-green`, and `safety-orange` work as standard light-background variants.
- `safety-orange` must use black `accent-on`; white text on orange failed contrast.
- `peacock` must use a darker green paper color; the original green failed body-text contrast.
- `peacock` is visually heavier and should be used intentionally, not as the default for long technical decks.
