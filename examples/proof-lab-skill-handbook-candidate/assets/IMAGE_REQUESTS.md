# Image Requests

This validation uses GPT Image 2 bitmap redraws only for source illustrations that were landscape and weak inside a portrait template. The HTML/CSS card template, typography, title, layout, and brand signature remain deterministic template work.

## Portrait Fit Decisions

```text
asset: skill-hero.png
original aspect: landscape
portrait-fit decision: redraw
reason: the supplied landscape concept left a weaker portrait cover composition.
redraw brief: portrait 3:4 AI training-manual metaphor; AI learning from a handbook; visual hints for template, pipeline, review, self-improve; leave a clean title zone.
must preserve: Skill is a training manual, not a plugin pile.
```

```text
asset: skill-hero-portrait.png
original aspect: portrait
portrait-fit decision: redrawn asset
reason: portrait-first cover hero for the Gold example.
source route: GPT Image 2 bitmap redraw of the supplied landscape hero illustration; inserted into the existing Proof Lab cover template.
must preserve: Skill is a training manual, not a plugin pile.
```

```text
asset: patterns-overview.jpg
original aspect: landscape
portrait-fit decision: keep-landscape
reason: source evidence diagram; preserving the original structure matters.
must preserve: all five pattern names and relationships.
```

```text
asset: skill-training-manual.png
original aspect: landscape
portrait-fit decision: redraw
reason: auxiliary concept illustration for a definition comparison; the landscape version looked weak inside a portrait card.
must preserve: manual / curriculum / guidelines / instruction metaphor.
```

```text
asset: skillnet-framework.png
original aspect: landscape
portrait-fit decision: redraw
reason: auxiliary concept/framework illustration for a definition comparison; not a primary evidence diagram.
must preserve: data input, core system, data flow, and control signals.
```

```text
asset: skillnet-framework-portrait.png
original aspect: portrait
portrait-fit decision: redrawn asset
reason: portrait comparison panel replacing the unsuitable landscape framework illustration.
source route: GPT Image 2 bitmap redraw of `skillnet-framework.png`; inserted into the existing card template as an illustration asset.
must preserve: central system, module network, data/control flow metaphor.
```

```text
asset: skill-training-manual-portrait.png
original aspect: portrait
portrait-fit decision: redrawn asset
reason: portrait comparison panel replacing the unsuitable landscape Skill framework illustration.
source route: GPT Image 2 bitmap redraw of `skill-training-manual.png`; inserted into the existing card template as an illustration asset.
must preserve: Skill as training manual, reusable know-how, and knowledge cards.
```

```text
asset: pattern-tool-wrapper.jpg / pattern-generator.jpg / pattern-reviewer.jpg / pattern-inversion.jpg / pattern-pipeline.jpg
original aspect: landscape
portrait-fit decision: keep-landscape
reason: source evidence diagrams for individual patterns; redraw would risk semantic drift.
must preserve: original pattern structure and labels.
```

```text
asset: auto-research-loop.png
original aspect: landscape
portrait-fit decision: keep-landscape
reason: proof diagram for iterative optimization; should be enlarged and annotated, not cropped.
must preserve: test-score-improve cycle.
```
