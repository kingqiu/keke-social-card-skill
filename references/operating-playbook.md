# Operating Playbook

Use this playbook to keep 克克社交卡片 stable across new sessions.

The goal is not to maximize features. The goal is to avoid skipping the decisions that make the final Xiaohongshu package publishable.

## Default Flow

1. Intake the source.
2. Decide whether proposal confirmation is required.
3. If required, stop at `PROPOSAL.md` / proposal response.
4. Wait for user confirmation.
5. Build cards, Xiaohongshu copy, sources, and QA.
6. Render and run checks.
7. Inspect the weakest page before final handoff.

## When To Stop At Proposal

Stop before rendering when the user provides:

- article link, markdown, PDF, long attachment, or pasted long-form source
- request for template choice, card count, design direction, or cover strategy
- product/tool/Skill launch that needs positioning
- source images that require crop/redraw judgment

The proposal must include concrete reader, value translation, shelf test, search intent, image policy, copy strategy, and the fixed confirmation question.

Do not create final `output/images`, `xiaohongshu-caption.md`, or `copy-variants.md` before confirmation.

## When Direct Build Is Acceptable

Proceed directly only when:

- the user explicitly says to skip proposal confirmation
- the task is a tiny revision to an existing confirmed deck
- the user asks for image-only or copy-only work
- the task is internal validation or a smoke test

Even then, record the waiver or scope in `BRIEF.md`.

## Proposal Quality Bar

A good proposal answers:

- Who is this for, in one concrete scene?
- What will make that person stop scrolling?
- What source claim or proof makes the promise believable?
- What feature/concept must be translated into user value?
- What search words should appear naturally before hashtags?
- Which visual system is chosen because of the reader job, not just topic category?
- What will be cut, and why is the meaning still intact?

Run:

```bash
npm run check:proposal-quality -- <proposal-dir>
```

## Build Quality Bar

Before final delivery:

- Render the deck.
- Run `npm run check:all -- <task-dir> --skip-palettes` for routine work.
- Run full `npm run check:all -- <task-dir>` after shared template/routing/checker changes.
- Manually inspect cover, the weakest content page, and any page with source images.
- Confirm the caption tells the source story, not the production action.

## Common Failure Modes

| Failure | Fix |
|---|---|
| Pretty but unclear cover | Return to shelf test and rewrite the promise. |
| Feature-list product copy | Return to value translation and Product Brief. |
| Short deck loses source meaning | Return to card count and source anchors. |
| Page 2+ weaker than cover | Change recipe or visual system, not only colors. |
| Landscape image looks small in portrait | Redraw/recompose inserted asset unless it is source evidence. |
| Caption sounds like AI summary | Add position, friction, concrete takeaways, and natural CTA. |
| QA warning feels noisy | Fix the checker if it is a false signal; do not normalize noisy gates. |

## Release Discipline

- Do not mark examples `Gold` unless every page is publishable.
- Keep private/internal design notes out of commits.
- Run regression after changing shared scripts or templates.
- Prefer small, boring checks over broad subjective rules.
