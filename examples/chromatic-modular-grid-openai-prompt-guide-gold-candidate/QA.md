# QA · OpenAI 官方 Prompt 指南

## Automated

- `node scripts/check-content-plan.mjs outputs/openai-official-prompt-guide`: PASS (14/14)
- `node scripts/check-xhs-copy.mjs outputs/openai-official-prompt-guide`: PASS (100/100, Gold-ready)
- `node scripts/check-portrait-fit.mjs outputs/openai-official-prompt-guide`: PASS
- `node scripts/validate-social-deck.mjs outputs/openai-official-prompt-guide`: PASS (12/12 clean, 0 failures, 0 warnings)
- `node scripts/check-aesthetic-qa.mjs outputs/openai-official-prompt-guide`: 92/100, Gold-ready. The 18px minimum is limited to non-primary metadata/support text and was manually checked at full-card size.
- `check-public-assets.sh outputs/openai-official-prompt-guide`: PASS

## Aesthetic QA

- Cover hook: `OpenAI官方：Prompt别再套公式` makes the official-source object and the reader’s likely mistake visible at thumbnail speed.
- First proof: card 2 carries the complete official Prompting panel at its original landscape ratio. Its source label is outside the image.
- Image integrity: cover uses a complete GPT Image 2 inserted portrait asset; the official source panel is never cropped into portrait cover decoration.
- Illustration integrity: cards 5 and 7 use matched square GPT Image 2 bitmap assets with four-sided safe margins and the cover’s cool ivory/engineering-line material language; the earlier CSS/HTML loop diagrams, cropped landscape assets, and warm craft-paper v2 assets were rejected.
- Cover typography revision: title, subtitle, and thesis were given additional vertical breathing room after the user review; the lower information rail remains independent and collision-free.
- Cover rail revision: the redundant secondary proof tile was replaced by a four-item information index (`目标 / 上下文 / 输出 / 边界`), reducing decorative weight and making the cover structure more regular across themes.
- Cover illustration revision: the redundant white annotation label over the right-side hero image was removed; the unoccluded illustration now carries the visual message by itself.
- System consistency: all cards use the cobalt/coral/lime Chromatic Modular Grid grammar, Source Han Sans SC display titles, Noto Sans SC body text, and IBM Plex Mono labels.
- Weakest-page risk: cards 9–11 have the highest information density. Their titles, task modules, and footers must remain readable after rendering.

## Content Coverage

- Coverage: Prompting overview; Goal; Context; Boundaries; Output; Iteration/Steer/Queue; Chat; Work; Codex prompting; Codex task examples; final combined checklist.
- Omitted or compressed material: voice dictation, connected-plugin setup detail, individual Chat prompt examples, and nine Codex walkthroughs are grouped into reusable task patterns rather than reproduced line by line.
- Boundary: this deck is a source-backed official-guide summary, not a personal long-term product review.

## Copy QA

- Title, cover, caption opening, and card 2 all make the same promise: stop treating Prompt as a rigid formula; add only conditions that matter.
- Caption gives five actionable takeaways, names Chat / Work / Codex roles, stays below 1000 characters, and uses seven relevant hashtags; tag relevance and count were checked.
- No unsupported performance claims, invented metrics, or personal-use claims.
