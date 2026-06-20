# QA

Status: `Gold Candidate / Full Coverage`

## Card Count

10 cards.

Reason:

- The source article has one core thesis and nine numbered sections.
- One cover plus one card per section gives complete coverage without compressing unrelated ideas into the same page.

## Content Coverage

- Cover: states domain, timeframe, and core observation.
- Cards 2-10: map to the nine numbered sections of the source article.
- Compressed details: vendor-specific timelines, implementation minutiae, protocol details, and speculative extras.
- No source section is silently dropped.
- No unsupported claims, numbers, endorsements, or examples are added.

Standalone readability:

- Each card can be read without the original article.
- Each card has one main job.
- Card text prioritizes plain explanation over vague slogan language.

## Copy QA

- Title matches the cover promise: 2026 H1 Agent infrastructure is getting thicker.
- Caption opening explains why the reader should care before listing card details.
- Caption body stays within 1000 characters while remaining detailed enough for a long-form technical deck.
- Caption has a visible human position: the writer is explaining why they no longer only watch model rankings.
- Caption adds a reader-use angle: use the cards as a checklist for judging whether an Agent project can enter production.
- Caption summarizes the 10-card path without pasting the full source article.
- CTA is discussion-oriented, not hard conversion.
- Hashtags: 8 relevant tags, no unrelated hot tags.
- Copy does not add unsupported claims, fake data, fake endorsements, or platform-external pressure.

## Checks

- Visual system: Swiss System
- Template status: `template-locked`
- Board size: 1080x1440
- Brand signature: `「两克伴」出品`
- Source images: local article assets

## Validation

Rendered with `scripts/render-social-deck.mjs`.

Validator result:

- Sections: 10
- Fails: 0
- Warnings: density only

Density warnings are accepted for this candidate because the deck follows the inherited Swiss System spacing and avoids overfilling cards with small text.

## Manual Review Focus

- Does each card explain its point without requiring article context?
- Are the later cards as strong as the first five-card candidate?
- Does the 10-card length still feel useful for Xiaohongshu, or should it be split into Part 1 / Part 2 later?
- Does the page plan in `BRIEF.md` still match the rendered cards after future edits?
