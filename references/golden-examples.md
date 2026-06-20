# Golden Examples

Golden examples are the acceptance set for 克克社交卡片. They prevent the Skill from optimizing around one demo.

## Purpose

Use golden examples to prove that the visual systems, copy workflow, and QA rules can produce publishable packages across common social-content scenarios.

Do not treat a single successful cover as proof that the Skill works.

## Required Golden Matrix

Maintain examples across these scenarios:

| Scenario | Primary System | Must Prove |
|---|---|---|
| AI tool launch | Rednote Native + Proof Lab | strong hook, credible product proof, clear CTA |
| AI workflow/tutorial | Proof Lab | readable screenshots, step logic, result before explanation |
| Outfit/beauty/lifestyle | Lookbook Journal | result-first composition, item callouts, female-user appeal |
| Product/gear/food breakdown | Lookbook Journal | central result, material/detail callouts, useful density |
| Opinion/framework | Swiss System | hierarchy, memorable concept, not corporate PPT |
| Technical announcement/open spec | Swiss System / Swiss OKF Brief | feed-native technical hook, code/spec proof, source-backed explanation |
| Essay/culture/reading/travel | Editorial E-ink | editorial mood, image atmosphere, restrained text |

Accepted Gold references:

| Scenario | Example |
|---|---|
| AI tool launch | `examples/rednote-native-card-skill-launch-candidate` |
| AI workflow/tutorial | `examples/proof-lab-skill-handbook-candidate` |
| Outfit/beauty/lifestyle | `examples/lookbook-outfit-gold-candidate` |
| Opinion/framework | `examples/swiss-agent-infra-full-candidate` |
| Technical announcement/open spec | `examples/swiss-okf-brief-gold-candidate` |

## Example Package Requirements

Each golden example should include:

- `BRIEF.md` or equivalent source notes describing the user inputs from `gold-example-inputs.md`
- `index.html`
- rendered `output/images/*.png`
- `xiaohongshu-caption.md`
- `copy-variants.md`
- `QA.md`
- `assets/IMAGE_REQUESTS.md`
- `assets/SOURCES.md`

## Evaluation Levels

Use these labels in `QA.md`:

- `Gold`: publishable, reusable as a reference for future work.
- `Silver`: structurally correct but needs visual polish before public publishing.
- `Prototype`: proves a layout or workflow only; do not use as aesthetic reference.
- `Rejected`: useful as a failure case only.

Only `Gold` examples should be copied into future prompts or used as style references.

## Gold Criteria

A `Gold` example must satisfy:

- First card has an immediate reason to click.
- Every page shares one visual system.
- Page 2+ are not lower quality than the cover.
- Result/proof is big enough to inspect.
- Proof assets are real, user-supplied, public-source, or explicitly documented AI assets.
- Copy is human, concrete, and not inflated.
- Brand signature is exactly `「两克伴」出品`.
- Assets and sources are recorded.
- Rendered images pass validator with 0 fails.
- Manual visual review finds no embarrassing page.

## Failure Case Library

When an example fails, keep the lesson rather than repeatedly hand-fixing the demo.

Record:

- What failed: cover, page 2, proof, typography, crop, asset quality, or copy.
- Why it failed: wrong system, weak asset, wrong density, bad crop, generic SaaS UI, etc.
- What system rule should change.

Do not keep polishing a failure if the right fix is to improve the visual system.
