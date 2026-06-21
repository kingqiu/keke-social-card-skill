# QA

Status: `Gold`

## Gold Reference

Use this package as the first `Swiss Anthropic Clay` reference for official Claude/Anthropic explainers.

It proves:

- Anthropic clay palette can replace default Swiss blue without losing Swiss hierarchy.
- Large mixed English/Chinese titles can stay visually stable with the Chinese-first title stack.
- Official article images can sit inside the Swiss grid as evidence rather than decorative screenshots.
- Decision/checklist pages can be dense enough without bringing back bottom-right page numbers.

## Card Count

8 cards.

Reason:

- The source contains one thesis, six steering mechanisms, and one decision checklist.
- One card per major mechanism preserves the distinctions without turning the post into a full documentation rewrite.

## Content Coverage

- Covered sections: Rules, Skills, Subagents, Hooks, Output Styles, append-system-prompt, and customization quick tips.
- Included source visuals: official article diagrams for Skills, Subagents, and Hooks.
- Omitted/compressed details: individual documentation links, full hook taxonomy, nested-agent depth details, and getting-started links.
- Cover includes domain, object, and core observation: yes.
- Every non-cover card maps to a source anchor: yes.
- Unsupported claims, fake numbers, or fake endorsements added: no.

Standalone readability:

- Each card explains one mechanism in one reader-facing sentence.
- The deck can be understood without opening the original article.
- Terms are preserved in English where they are product names or file concepts.

## Copy QA

- Title names the object and reader job: Claude Code customization.
- Caption keeps the source meaning: choose the right steering layer instead of stuffing everything into CLAUDE.md.
- Caption body stays within 1000 characters and includes concrete takeaways.
- Caption avoids production workflow leakage.
- CTA is discussion-oriented.
- Hashtags are technical and relevant.

## Aesthetic QA

- Weakest visual risk: mechanism cards can become documentation screenshots if there is too much code-like text.
- Mitigation: each page uses one strong sentence plus compact route/table blocks, and Skills/Subagents/Hooks pages include the official article diagrams as evidence.
- Anthropic palette pass: warm off-white paper, clay accent, near-black ink, muted warm grid.
- Title font pass: large Chinese headings use a Chinese-first font stack and stable medium weight to avoid mixed fallback stroke inconsistency.
- Cover has an explicit mechanism map and does not rely on abstract decoration.
- No bottom-right page serials or giant cover number.
- Exact brand signature is present.

## Validation

Generated as a P1 end-to-end validation package from a real article.

- `npm run check:all -- examples/anthropic-steering-claude-code-candidate --skip-palettes`
- Result: all quality gates passed.
- `node scripts/validate-social-deck.mjs examples/anthropic-steering-claude-code-candidate`
- Result: 8 clean sections, 0 fails, 0 warnings.
- Notes: aesthetic QA scored 90/100 Gold-ready; the remaining media-alignment advisory is a false positive from treating the evidence figure and lower card grid as a same-row media pair.
