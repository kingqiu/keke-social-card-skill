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
- whether visible attribution is needed

## SOURCES.md

Use:

```text
filename.png <- user supplied
filename.jpg <- AI-generated image asset
filename.jpg <- https://source-url
```

## Rules

- AI generation should produce assets, not completed posters, unless explicitly requested.
- Screenshots must remain readable.
- Product, food, person, and outfit result images cannot become tiny decorations.
- Full-bleed images need subject map, safe text zone, avoid zone, and object position.
