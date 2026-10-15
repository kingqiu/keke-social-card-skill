# Ruled Field Guide / 横线纸知识图鉴

Status: `template-locked`. This is an **additional** visual system. It does not replace Editorial E-ink, Swiss System, Longform Reader, or their routing defaults.

## When to choose it

Use when the user explicitly asks for the Greg AI-native-services card look, 横线纸知识图鉴, 荧光绿黑蓝知识卡, or Ruled Field Guide. It works best for a compact, source-backed framework that needs comparisons, process steps, a matrix, cases, and a takeaway. For a long narrative with substantial prose, keep Longform Reader; for screenshot-led proof, keep Proof Lab.

Seed: `assets/template-ruled-field-guide.html`. Two-card structural example: `examples/ruled-field-guide-template-smoke/index.html`. The example uses generic demonstration copy and is a template smoke test, not a Gold content example.

## Locked visual grammar

- Xiaohongshu board: 1080 × 1440, 3:4. Warm paper `#FCFAF1` with subtle 30 px horizontal rules and a 62 px left line-number gutter. Do not flatten the paper to plain white or replace the gutter with a decorative block.
- Top: narrow mono masthead, then a lime `#BEFA3D` chapter bar with a black page-number cell. The large left number is the **publishing page number**. It increments automatically through CSS counters. Leave `.chapter .n` empty; never type chapter numbers there. Smaller numbers inside cards identify steps, cells, or cases and keep their own meaning.
- Title: large, tightly set black Source Han Sans Heavy when every glyph is covered. Body and boxed headings use one complete CJK family and one weight per line; the approved Mac rendering uses PingFang SC. If another host lacks it, choose a full-coverage sans family consistently and re-render. The bundled Source Han Heavy is subsetted, so inspect unusual glyphs before using it in a whole display line. Do not let one missing glyph fall back to a visibly thinner font.
- Structure: black section bars, squared fine borders, restrained corner radius, strong alignment and whitespace. No soft shadows, scattered stickers, gradient cards, or generic concept art.
- Palette roles: ink `#111214`; lime `#BEFA3D`; electric blue `#0968E8`; pale blue field `#EAF4FF`; pale blue badge `#C7E0FF`. A blue module uses a pale-blue badge with black type. A lime module uses a black badge with lime type. Black modules use lime badges with black type. Never place a lime badge in a blue module.
- Footer: centered between two black rules, visible brand exactly `「两克伴」出品` on every card.

## Build contract

1. Copy `assets/template-ruled-field-guide.html` to the task's `index.html`. Copy `assets/fonts/` to the task's `fonts/`, preserving `keke-fonts.css`; the seed intentionally uses a relative font path and contains no private machine path.
2. Replace `<!-- POSTERS_HERE -->` with one `<section class="poster rfg ...">` per page. The page order in the DOM is the publishing order.
3. Every page includes an empty `<div class="gutter"></div>` and an empty `<div class="chapter"><div class="n"></div><div class="label">...</div></div>`. The stylesheet renders gutter numbers and page numbers. Put the actual title, content, and footer inside `<div class="sheet">`.
4. Use `data-name` for stable PNG filenames. Do not put the article's private paths, email address, or workspace metadata in the public masthead or HTML output.
5. Keep the top title rhythm, page margins, section bar, and footer across the deck. Adapt copy and page recipe, not the visual system's core geometry.

Minimal page skeleton:

```html
<section class="poster rfg cover" data-name="cover">
  <div class="gutter"></div>
  <div class="sheet">
    <div class="meta">系列名称 · FIELD GUIDE</div>
    <div class="chapter"><div class="n"></div><div class="label">本页主题</div></div>
    <!-- hero, section bar, content recipe, takeaway -->
    <div class="foot"><span class="brand">「两克伴」出品</span></div>
  </div>
</section>
```

## Page recipes already in the seed

| Classes | Use | Main content region |
|---|---|---|
| `.rfg.cover` | Cover with a readable reader promise | 2+1 comparison modules, black takeaway |
| `.rfg.info.definition` | Explain what a concept delivers | Claim, three-part comparison, takeaway |
| `.rfg.info.workflow` | Show a bounded process | Six cards in a 2×3 grid |
| `.rfg.info.pricing` | Compare two clear models | Two equal-width columns and a unit strip |
| `.rfg.map` | Teach a two-axis framework | Four-quadrant concept map |
| `.rfg.info.opportunity` | Place examples in that framework | Filled four-quadrant map |
| `.rfg.info.examples` | Show concrete cases and units | Five aligned rows per page |
| `.rfg.info.firststeps` | End with an action path | Four numbered steps |

These are layouts, not a fixed nine-page story. Choose the smallest page plan that preserves the source. If a framework has both a definition and concrete opportunities, give the concept map and filled map separate pages when they would otherwise be hard to read. Keep each page's top number sequential from 1 to N; do not use the top strip as a chapter index.

## QA

- Render with `node scripts/render-social-deck.mjs <task-dir>` and validate with `node scripts/validate-social-deck.mjs <task-dir> --style=editorial`.
- Verify the visible top numbers run 1, 2, ... N in order; verify small step/case numbers are semantically distinct.
- Inspect every full-size card and a contact sheet. Check subtle paper rules, hairlines, title weight, one-line text, blue badge color, matrix labels, footers, and 25% thumbnail readability. The cover and densest page must both be publishable.
- Keep text and simple matrices deterministic in HTML/CSS. When a card needs a real semantic illustration or source figure, follow the Skill's existing asset and provenance rules instead of constructing a fake labeled diagram from arbitrary boxes.
