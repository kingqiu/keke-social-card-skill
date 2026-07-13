# Image Source Brief

Create `assets/IMAGE_REQUESTS.md` and `assets/SOURCES.md` for any non-trivial image use.

## IMAGE_REQUESTS.md

Record:

- card name
- visual system / recipe
- image role: hero, proof, mood, result, product, screenshot
- source route: user supplied, AI-generated asset, public source
- search terms or generation intent
- target filename
- subject zone
- safe text zone
- avoid zone
- crop and `object-position`
- original aspect ratio and portrait-fit decision
- whether a landscape source must be redrawn/recomposed for 3:4
- whether visible attribution is needed

## SOURCES.md

Use:

```text
filename.png <- user supplied
filename.jpg <- AI-generated image asset
filename.jpg <- https://source-url
```

## Rules

- AI generation should produce inserted assets, not completed posters, unless explicitly requested.
- Keep the inherited HTML/CSS card template as the frame. If a landscape source illustration looks bad in a portrait card, redraw or recompose that illustration itself as a portrait bitmap, then place it back into the template.
- For illustration redraws, prefer GPT Image 2 or an equivalent bitmap image model and save PNG/JPG/WebP. SVG is acceptable only for tiny structural icons, line markers, or template-native symbols, not as the final redraw of a source illustration.
- Screenshots must remain readable.
- Product, food, person, and outfit result images cannot become tiny decorations.
- Full-bleed images need subject map, safe text zone, avoid zone, and object position.

## Cover Visual Integrity Gate — Hard Rule

Do not use a third-party screenshot, public image crop, or source preview as cover decoration when its essential subject, title, logo, data, or UI is cut off, unreadable, or stripped of context.

Before placing it on a cover:

1. Look for a complete original asset in the source material.
2. If that asset cannot fit intact in the portrait composition, generate a new topic-matched bitmap asset with GPT Image 2 and use that asset for the cover.
3. Preserve the original source screenshot only as a clearly labelled, inspectable proof image on a content card.
4. In `IMAGE_REQUESTS.md`, record `cover-integrity decision`, `original checked`, `replacement route`, and `visual inspection result`.

This gate applies even for validation samples. A crop that technically fills a box but loses the image's identity fails the gate.

## Portrait Fit Gate

Xiaohongshu cards are portrait-first. Do not treat a wide image as automatically usable just because CSS can `contain` it.

When a source image is landscape and will become a cover, hero illustration, mood image, product/person/scene visual, or any non-evidence visual, make a portrait-fit decision before layout:

- **Redraw / regenerate** when the image is wider than roughly `4:3`, leaves large empty bands in a 3:4 card, forces the subject to become small, or looks like a pasted web screenshot.
- **Recompose** when the source contains useful elements but needs a vertical arrangement: keep the same idea, objects, labels, and visual metaphor, then rebuild as a 3:4 or 4:5 asset.
- **Split** when a wide diagram contains several independent ideas that read better as multiple portrait pages.
- **Keep landscape** only when the image itself is the evidence, screenshot, chart, or original diagram and fidelity matters more than beauty. In that case, make it large enough to inspect and record the reason in `QA.md`.

For redraws, `IMAGE_REQUESTS.md` must include:

```text
original aspect:
portrait-fit decision: redraw | recompose | split | keep-landscape
reason:
redraw brief:
must preserve:
```

Do not use `object-fit: contain` as the default fix for an unsuitable landscape hero. `contain` is acceptable for proof diagrams, not for weak cover art.

The redraw brief must describe the source illustration and what to preserve. It must not ask the image model to regenerate the whole Xiaohongshu card, title, footer, template border, or brand signature.
