# QA

Status: Gold
Visual system: Rednote Native
Card count: 3

## Content Coverage

- Covered: Xiaohongshu card-generation pain point, result-first proof, before/after positioning, card planning logic, proof asset handling, and copy output.
- Compressed: implementation details, inherited template notes, model/provider choices, and repository history.
- Omitted: API keys, private source-skill references, internal design decisions, and exact prompt internals.
- Unsupported claims: none intentionally added. The copy claims practical workflow value, not performance metrics or platform guarantees.

## Visual QA

- Page 01 uses a thumbnail-scale hook and a visible phone/result proof area.
- Page 02 uses before/after logic rather than a generic feature list.
- Page 03 shows native cover/package/copy proof panels as concrete proof.
- All cards use the exact public brand signature `「两克伴」出品`.
- Proof/result panels are native HTML/CSS inside Rednote Native, so the example does not depend on another visual system's Gold output.
- No internal source-skill names appear in public card text.

## Copy QA

- Title matches the cover promise and avoids unsupported absolute claims.
- Body explains the product value without saying how many cards were generated.
- Copy avoids AI-flavored product jargon and keeps the tone concrete.
- Hashtags are relevant and limited to 7.

## Asset QA

- `assets/SOURCES.md` records that no external proof bitmap is used.
- `assets/IMAGE_REQUESTS.md` records the no-image route and future portrait redraw rule.
- All proof areas are portrait-native card modules and fit the 3:4 Xiaohongshu direction.

## Manual Review Notes

- Accepted as the Rednote Native Gold reference after rendered-page review and full quality-gate results.
- Page 01 has feed-native stopping power without becoming a cheap big-character poster.
- Page 03 keeps the proof modules complete and avoids hiding the actual publishing package logic.
