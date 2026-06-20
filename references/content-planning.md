# Content Planning

Use this before choosing card count, writing card text, or building a Xiaohongshu deck from long-form source material.

The goal is not to make a short summary. The goal is to decide the smallest card set that can preserve the source's core meaning while remaining readable in a Xiaohongshu carousel.

## Planning Rule

Do not start from an arbitrary card count.

Start from the source structure:

1. Core thesis.
2. Major sections or argument steps.
3. Evidence, examples, screenshots, or diagrams.
4. Required caveats or limitations.
5. Final takeaway.

Then choose card count.

## Card Count Bands

Use these bands as defaults:

| Source shape | Recommended cards | Rule |
|---|---:|---|
| One narrow tip, one product result, or one simple announcement | 3-4 | Cover + credibility/result + usage/takeaway |
| Tool launch, checklist, or compact tutorial with 3-5 points | 5-6 | Cover + one card per core use case or step |
| Technical announcement about an open format/spec/API/data contract | 7-9 | Use Swiss OKF Brief: cover + context + definition + structure + principles + implementation/value + closing |
| Medium essay or framework with 4-7 distinct ideas | 7-9 | Cover + grouped sections + conclusion |
| Long essay/report with 8-10 numbered sections | 10-12 | Cover + one card per major section + conclusion |
| More than 10 major sections or multiple audience goals | Split | Create Part 1 / Part 2 rather than overloading cards |

For structured articles, the safest default is:

```text
1 cover + 1 card per major source section + 0-1 closing card
```

Do not compress unrelated source sections into one card only to keep a set short. A shorter deck is not better if it changes the meaning.

## Split Criteria

Split into two Xiaohongshu posts when any of these is true:

- More than 12 cards are needed for honest coverage.
- The source has two different reader jobs, such as "understand the trend" and "follow a tutorial".
- Card text becomes too small because each page carries multiple arguments.
- The second half is useful only after the first half is understood.
- The visual system would need two different proof modes, such as essay diagrams plus app screenshots.

When splitting, make each part complete:

- Part 1: thesis, background, first set of decisions.
- Part 2: application, caveats, advanced checklist, conclusion.

## Page Plan Schema

Before building, create a page plan in `BRIEF.md`:

| Card | Role | Source anchor | Must carry | Reader sentence | Visual proof | Cut |
|---:|---|---|---|---|---|---|

Definitions:

- **Role**: cover, credibility, concept, mechanism, comparison, checklist, decision, conclusion.
- **Source anchor**: exact heading, paragraph, image, screenshot, or user-supplied note.
- **Must carry**: the idea that cannot be lost.
- **Reader sentence**: one human sentence the card should make clear without the source article.
- **Visual proof**: source image, screenshot, diagram, generated asset, or none.
- **Cut**: details intentionally omitted from the card.

Every non-cover card should map to at least one source anchor. Do not create filler cards.

## Swiss OKF Brief Page Plan

Use this sequence for technical announcements about open specifications, public formats, APIs, data contracts, knowledge formats, or framework standards.

Recommended length: **7-9 cards**.

Default roles:

| Card | Role | Must carry |
|---:|---|---|
| 1 | cover | Name the format/spec/object and the consequence. Avoid abstract headlines. |
| 2 | context problem | Explain what broke before this format existed: scattered knowledge, repeated adaptation, vendor lock-in, brittle context, or manual glue. |
| 3 | definition | State what it is and what it is not. Use plain Chinese and preserve the official term. |
| 4 | structure | Show the format shape: directory, fields, schema, API contract, metadata, or file layout. |
| 5 | principles | Explain the design constraints or philosophy that make the format portable. |
| 6 | implementation proof | List who ships it, sample packages, producer/consumer roles, or how it is written/read. |
| 7 | reader value | Explain why developers, teams, or Agent builders should care. |
| 8 | closing | Distill the durable insight: why the format matters beyond the announcement. |
| 9 | optional caveat | Add only when the source has real limitations, migration costs, or unresolved questions. |

Writing rules:

- The cover must include the exact format/spec name, not only a vague trend.
- Every card must preserve the source's core claim in human language; do not turn technical content into mysterious slogans.
- Use code/directory/metadata proof when available. If none exists, create a text-based schematic rather than decorative art.
- Use `Swiss OKF Brief` visuals only when the source has a concrete format/spec/contract object.
- Page labels like `03 · DEFINITION` are allowed in the top-left metadata area; bottom-right page numbers are not.

## Cover Requirement

For long-form source material, the cover must state:

- Domain or object: what the post is about.
- Timeframe or scope when relevant.
- Core observation or promise.

Bad:

```text
Agent 基础设施变厚
```

Better:

```text
2026 上半年，Agent 基础设施正在变厚
```

The better version tells the reader what the deck is inspecting and why now.

## Card Text Rule

Each card must be understandable without reading the article.

A useful card sentence usually includes:

```text
subject + change/action + reason/consequence
```

Avoid:

- Concept-only headings with no explanation.
- Elegant but vague slogans.
- Pure noun stacks.
- Copy that requires the article context to decode.
- Repeating the source paragraph without compression.

Use plain language first; make it beautiful second.

## Coverage QA

Before final delivery, answer in `QA.md`:

- Why this card count?
- Which source sections were covered?
- Which source sections were intentionally omitted or compressed?
- Can every card be explained in one sentence without the original article?
- Does the cover include domain, timeframe/scope, and core observation?
- Did any card invent a claim, example, number, or endorsement?

If a user says the deck is missing the point, return to the page plan before changing visuals.
