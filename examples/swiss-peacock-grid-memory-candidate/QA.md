# QA

## Aesthetic QA

- Visual system: Swiss System + Peacock.
- Cover hook readable at thumbnail size: yes.
- Weakest likely page: Card 2, because it is template-structured rather than illustration-led.
- Evidence/result area: Cards 3, 4, 6, and 7 use large information-rich diagrams.
- Page family consistency: same topbar, grid background, peacock accent, black judgment block, and footer language.
- Brand signature: exact visible text `「两克伴」出品` on all cards.

## Content Coverage QA

- Non-cover pages map to source sections.
- The source argument is preserved: stateless model -> context window limits -> layered memory -> memory types -> retrieval difficulty -> trade-offs -> practical question.
- Omitted or compressed material: deeper implementation details, research citations, exact API pricing examples, and longer implementation caveats were compressed to keep the deck readable.
- No unsupported claims, fake data, or fake endorsements were added.
- English diagram labels are used for readability and to avoid image-model Chinese text errors.

## Image QA

- Generated assets are recorded in `assets/SOURCES.md`.
- Complex mechanism diagrams use GPT Image assets.
- The newer diagram direction is source-inspired and information-rich, after rejecting earlier abstract assets.
- Cover image background was processed so it blends with the card's own grid background.
- All exported cards checked at 1080 x 1440.

## Copy QA

- Caption body is under 1000 Chinese characters before hashtags.
- Opening tells the source story directly; it does not describe the production process.
- Hashtags are relevant and limited to 8.
- Tone avoids exaggerated claims and generic AI-marketing language.
- Title, cover, caption opening, and first cards share the same promise.
