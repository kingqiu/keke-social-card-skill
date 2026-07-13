# QA · OpenAI Prompt Guide Sample

## Automated

- `node scripts/validate-social-deck.mjs examples/chromatic-modular-grid-openai-prompt-guide-sample`: PASS
- `node scripts/check-aesthetic-qa.mjs examples/chromatic-modular-grid-openai-prompt-guide-sample`: PASS score 92/100; one advisory warning remains for 18px source-label/support text, accepted because it is non-primary metadata and remains readable at full-card review.

## Aesthetic QA

- Cover hook: “复杂任务只补 4 件事” names the topic and gives a concrete save reason.
- Source proof: the complete official ChatGPT Prompting panel is retained at its original ratio as a labelled evidence tile on page 2; its source label sits outside the image and does not mask the ChatGPT, Prompting, or OpenAI marks.
- Cover visual-integrity gate: PASS. The supplied official panel was reviewed and rejected for the portrait cover because its title and mark would be cut. `prompt-structure-hero-v1.png` is a GPT Image 2 generated, topic-matched portrait asset; its four paper modules and routing line are fully visible in the final placement.
- Layout integrity: PASS after v3. The cover title, summary, thesis, and evidence rail now occupy fixed non-overlapping vertical bands; no lower-rail text may enter the cover-copy region.
- Density: page 2 has one central four-part structure, two source-backed side notes, and one takeaway strip. No module repeats another module’s job.
- No claim exceeds the source: the four parts come from the article’s Prompting overview; the article explicitly says to use only the parts that help and to iterate with follow-ups.

## Scope / content coverage

- This two-card set tests the visual system only. It does not claim to summarize the long article’s sections on plugins, Work, Codex, voice input, or example prompts.

## Status

- Cover and representative content page: pending user review.
- Do not mark Chromatic Modular Grid as `template-locked` until this real-source pair is approved.
