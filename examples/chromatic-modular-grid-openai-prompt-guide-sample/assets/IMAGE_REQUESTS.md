# Image Requests

## prompt-structure-hero-v1.png

- role: cover hero illustration
- source route: AI-generated asset with GPT Image 2
- generation intent: four connected paper-like information modules that express goal, context, output, and boundary; no text, UI, logo, or complete social-card frame
- subject zone: central four-module assembly and blue routing line
- safe text zone: the card-left title column; image contains no required embedded text
- avoid zone: no cropped modules, no third-party screenshot fragments, no unreadable UI
- original aspect: portrait 3:4
- portrait-fit decision: use generated portrait asset
- cover-integrity decision: source screenshot was checked but no complete official portrait visual existed; replaced with a topic-matched generated asset for the cover
- original checked: `openai-prompting-source.png` and `openai-prompting-panel.png`
- replacement route: GPT Image 2, rendered as a local PNG insertion
- visual inspection result: all four modules and the central routing line remain complete at cover placement; no text or logo is cut off
- visible attribution: not needed on-card; provenance is recorded in `SOURCES.md`

## openai-prompting-panel.png

```text
asset: openai-prompting-panel.png
portrait-fit decision: keep-landscape as source evidence
reason: original source evidence; this complete 1040×540 ChatGPT Prompting panel is used only as a labelled, inspectable content-page proof tile, never as cover art.
```

- role: official-source proof on content page only
- source route: crop of supplied local article asset
- subject zone: official blue ChatGPT Prompting panel
- safe text zone: evidence-side source tile; source crop carries no overlaid card title
- avoid zone: the repost author/avatar and the translated post text at the upper screenshot region
- crop: source asset is cropped to the complete blue Prompting panel before placement; `object-fit: contain; object-position: center` is permitted because this is labelled source proof, not cover art
- original aspect: landscape panel crop
- portrait-fit decision: keep landscape as source evidence
- reason: the panel is source proof, not cover art; it remains large enough to read as an intact, labelled evidence tile and no longer carries repost UI
- cover-integrity decision: do not use on cover because its landscape ratio forces loss of the visible Prompting title and OpenAI mark in the portrait hero bay
- original checked: `openai-prompting-source.png`
- replacement route: `prompt-structure-hero-v1.png` generated with GPT Image 2
- visual inspection result: complete panel is retained at its original ratio in the content-page evidence tile; the source label sits outside the image and does not cover the ChatGPT, Prompting, or OpenAI marks
- visible attribution: source label on-card; full provenance in SOURCES.md
