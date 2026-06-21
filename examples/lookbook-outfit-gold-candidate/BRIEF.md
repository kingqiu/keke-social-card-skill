# Lookbook Outfit Gold

Status: Gold
Visual system: Lookbook Journal
Source type: AI Skill lifestyle use case with generated outfit result assets.
Card count: 3

## Proposal Confirmation

- requiredBeforeBuild: yes
- status: legacy-confirmed
- confirmationSource: accepted reference example or validation package created before the proposal-confirmation gate became mandatory; future article/long-form tasks must receive explicit user confirmation before build

## Route Decision

- visualSystem: Lookbook Journal
- theme: soft-paper
- recipeSequence: complete outfit result -> item breakdown -> detail adjustment rules
- imagePolicy: central full-body outfit bitmap plus flatlay/detail bitmap assets; keep clothing and accessories inspectable
- copyStrategy: practical outfit advice for a first client meeting; explain why each item works in human language
- qaFocus: result image appeal, annotation clarity, lifestyle usefulness, exact brand signature, no page serials
- confidence: high
- matchedKeywords: outfit, OOTD, first client meeting, item breakdown, lifestyle result image

## Card Count Rationale

Three cards are enough because the source scenario is focused: one outfit recommendation for a first client meeting. The deck needs to prove the complete look, explain why each item works, and give practical adjustment rules. More cards would dilute the save value.

## Page Plan

| Card | Role | Source anchor | Must carry | Reader sentence | Visual proof | Cut |
|---|---|---|---|---|---|---|
| 01 | Cover / complete result | Outfit-stylist Skill use case: first client meeting, Shanghai 18-24°C | Soft business outfit that feels professional but not stiff | First client meeting can look prepared without looking cold or over-formal. | Full-body generated outfit result | Full prompt and backend workflow |
| 02 | Item breakdown | Outfit item logic | The look works because blue, beige, black, and simple leather/silver details control distance and polish | Each piece has a reason: color softens, cut cleans up, accessories stabilize. | Generated flat lay | Alternative brands and shopping links |
| 03 | Detail / adjustment rules | Styling constraints: temperature, walking, formality | Keep the palette calm and adjust warmth/formality with outerwear and accessories | Use texture and small details to look intentional without adding visual noise. | Generated material/detail collage | Long body-shape and budget variants |

## Gold Acceptance

- Result image is central, inspectable, and emotionally appealing.
- Card 2 and 3 remain useful after the cover, not filler.
- Copy is practical and clear enough to understand without the source prompt.
- Uses high-quality bitmap assets, not CSS/SVG placeholders.
- Brand signature is exactly `「两克伴」出品`.
