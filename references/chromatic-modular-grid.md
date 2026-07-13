# Chromatic Modular Grid

Status: `locked`; first accepted Gold example: `examples/chromatic-modular-grid-openai-prompt-guide-gold-candidate`.

## What this system is for

Use when a Xiaohongshu post needs a high-density modern card where a large Chinese claim, image evidence, detail crops, and a save-worthy conclusion must coexist without becoming a dashboard.

Good fits:

- AI tools, products, frameworks, workflows, and technical explainers.
- Product or design analysis with screenshots, source figures, diagrams, photos, or image crops.
- Opinion posts where a visual evidence chain strengthens the central judgment.

It is not a 3D-product template. Images may be source screenshots, diagrams, photos, generated semantic illustrations, or detail crops. Do not substitute empty decorative boxes for evidence.

## Locked v1 grammar

- 3:4 portrait board with a narrow masthead and semantic footer.
- Cover: large Chinese title on the left, one dominant image/assembly zone on the right, then a three-part evidence rail.
- Content: one main judgment, one inspectable proof field, two to three supporting proof/action modules, and a takeaway strip.
- Straight rules and modular alignment; slight rotation is reserved for one image or proof tile, never repeated as decoration.
- Chinese titles use `Keke Source Han Sans SC` at 900 and remain visibly open. Cover display line-height: `1.08`; content display line-height: `1.12`.
- No giant cover page numbers, generic SaaS cards, stickers, or nested-card stacks.

## Semantic Illustration Rule — Hard Rule

When a card needs a cohesive explanatory illustration, workflow metaphor, or labelled architecture-style visual, generate it as an inserted bitmap asset with GPT Image 2. Do not fake that illustration with SVG, HTML, CSS circles, arrows, nested boxes, or hand-assembled diagram fragments.

- HTML/CSS may still provide the card frame, typography, grids, dividers, tiny structural marks, and simple accents.
- The generated asset must contain the semantic illustration only, not a completed card, title, footer, or brand signature.
- Compose the generated asset for the exact image bay: match its aspect ratio where possible, or keep every meaningful object and its shadow inside a four-sided safe margin. A visually attractive asset that is clipped at placement fails this rule and must be regenerated or recomposed.
- If two or more cards use illustrations in one deck, they must share a written art direction and be reviewed together for material, palette, composition, and visual weight.

## Cover Visual Integrity — Hard Rule

Never use a partial, clipped, unreadable, or contextless third-party screenshot as the cover visual.

1. First locate a complete original source image that can remain intact in the portrait cover bay.
2. If no complete source image fits, use GPT Image 2 to generate one topic-matched portrait bitmap asset; use it as an inserted asset, never as a complete poster.
3. Keep the original screenshot only in an inspectable evidence position on a later page, with provenance recorded in `SOURCES.md`.
4. Record the decision and a visual inspection result in `IMAGE_REQUESTS.md` and `QA.md`.

## Theme contract

The template consumes only these tokens: `--paper`, `--ink`, `--muted`, `--line`, `--surface`, `--primary`, `--secondary`, `--signal`, and their `--on-*` text colors.

Themes live in `assets/themes/chromatic-modular-grid.css`. Layout files may not introduce one-off core colors.

| Theme | Character | Best use |
|---|---|---|
| `cobalt-coral-lime` | Cobalt, coral, and acid-lime signal on warm paper | Strong product/tool launches, visual frameworks, high-stop covers |
| `ultramarine-sand` | Deeper blue, rust orange, ochre signal | Serious technology, research, product strategy |
| `forest-pink` | Forest green, rose, chartreuse signal | Design, culture, consumer/product commentary without becoming pastel |

Do not mix themes in one deck. A new theme must define every token and be rendered against both the cover and content-page recipes before it is considered production-ready.

## Real-source validation gate

Before accepting a new implementation into this system, test it on one actual article or source pack with:

1. a cover that uses a real image, screenshot, diagram, or generated semantic illustration;
2. one content page whose proof field contains inspectable source evidence;
3. the user-approved theme; and
4. thumbnail review plus the standard layout validator.

## Lock Record

- The OpenAI Prompting guide deck is the first accepted production example: it uses the cover assembly, content-page evidence field, source-proof treatment, semantic GPT Image 2 bitmap assets, and the `cobalt-coral-lime` theme across a complete 12-card set.
- The template and theme remain decoupled: `assets/template-chromatic-modular-grid.html` defines structure and `assets/themes/chromatic-modular-grid.css` defines the three supported themes.
- The system is approved for future AI tools, product, framework, workflow, and technical explainer packages when the page has a clear evidence/result role.
## Typography Standard

- **Chinese display**: `Keke Source Han Sans SC` at 900. Use only for cover titles and content-page core conclusions; it carries the visual weight of the system.
- **Chinese body**: `Keke Noto Sans SC` at 400/500 for readable explanation and supporting copy.
- **Labels, page metadata, source notes**: `Keke IBM Plex Mono` at 500/600.
- **Latin and numerals**: `Keke Inter` at 500/600 where a Latin-only treatment is needed.
- Keep two-line display titles open: cover `line-height: 1.08`; content conclusion `line-height: 1.12`. Do not tighten titles below these values.
