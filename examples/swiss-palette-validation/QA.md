# QA

Status: `Pass`

## Machine Checks

Command:

```bash
npm run validate:swiss-palettes
```

Result:

| Accent | Paper/ink contrast | Accent text contrast | Status |
|---|---:|---:|---|
| `ikb` | 18.94 | 10.69 | Pass |
| `lemon-yellow` | 18.94 | 13.92 | Pass |
| `lemon-green` | 18.94 | 14.06 | Pass |
| `safety-orange` | 18.94 | 6.98 | Pass |
| `peacock` | 7.01 | 9.97 | Pass |

The script also checks:

- No poster overflow.
- Exact visible brand signature: `「两克伴」出品`.
- All 3 representative poster sections render for each accent.

## Fixes Applied

- `safety-orange`: changed `--accent-on` from white to black because white-on-orange failed contrast.
- `peacock`: darkened `--paper` from the original green to `#12633c` because the earlier green background failed body-text contrast.

## Manual Review

- Light-background palettes remain clean and Swiss.
- `safety-orange` is now readable but should be used for warning/contrast emphasis.
- `peacock` is readable and distinctive, but visually heavier. Use it for special issues or strong editorial emphasis.

## Artifacts

- Contact sheet: `output/contact-sheet.png`
- Machine summary: `output/palette-summary.json`
