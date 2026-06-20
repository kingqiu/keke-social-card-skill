# QA

Status: `Gold`

## Card Count

8 cards.

Reason:

- The source announcement naturally breaks into cover, context, definition, structure, principles, implementation proof, Agent value, and closing thesis.
- The sequence preserves the original explanatory arc instead of only copying the visual style.

## Content Coverage

- Covered: OKF announcement, context problem, definition, structure, design principles, Google reference implementations, Agent developer value, closing insight.
- Omitted/compressed: repository URLs, complete field schema, implementation details, and speculative comparisons beyond the supplied material.
- Unsupported claims: none intentionally added beyond the supplied reference deck. The source is recorded as user-supplied cards plus the named Google Cloud Blog reference.
- Every non-cover card maps to one source anchor from the supplied reference deck.
- Every card can be understood without reading the original article.

## Copy QA

- Caption explains why OKF matters before naming internal mechanics.
- Caption avoids saying the article was split into cards or images.
- Caption stays within 1000 characters.
- Titles preserve the exact term `Open Knowledge Format / OKF`.
- Hashtags are relevant to AI Agent, data knowledge, and technical formats.

## Visual QA

- Visual system: Swiss System, sub-template `Swiss OKF Brief`.
- Every card uses warm paper, left yellow rail, top label, exact `「两克伴」出品`, and footer/source metadata.
- Cover has a strong clickable object: `Google 推出 OKF`.
- Page 2+ remain visually strong and do not collapse into generic PPT.
- Code/directory evidence appears on cards 1 and 4.
- Black proof/emphasis blocks appear on cards 1, 2, 4, 5, 6, 7, and 8.
- Bottom-right page serials are not used.

## Validation

- Render with `npm run render -- examples/swiss-okf-brief-gold-candidate`.
- Validate with `npm run validate -- examples/swiss-okf-brief-gold-candidate --style=swiss`.
- Validate OKF system with `npm run validate:swiss-okf-brief`.

Known advisory:

- If the generic density heuristic warns on the cover, treat it as advisory unless there is overflow or visual emptiness. The OKF Brief cover intentionally uses large type and breathing room.

## Gold Reference

This example is the accepted Swiss OKF Brief Gold reference for technical announcements about open formats, specs, API/data contracts, and knowledge-format explainers.
