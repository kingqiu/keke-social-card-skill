# Proof Lab Validation

Status: `Template Lock Smoke Test`

Purpose:

- Verify Proof Lab can render from the inherited seed template without custom visual grammar.
- Cover the three core Proof Lab page modes: evidence hero, step flow, and before/after.
- Check that proof remains inspectable instead of becoming decoration.

## Proposal Confirmation

- requiredBeforeBuild: yes
- status: legacy-confirmed
- confirmationSource: accepted reference example or validation package created before the proposal-confirmation gate became mandatory; future article/long-form tasks must receive explicit user confirmation before build

## Page Plan

1. Evidence hero: screenshot/result area must be the main visual object.
2. Step flow: input, process, output each get one visible proof block.
3. Before/after: comparison uses the same scale and makes the visible delta clear.

## Validation Method

Run:

```bash
npm run validate:proof-lab
```

The script checks:

- 3 representative posters render.
- Evidence hero proof area is at least 55% of the poster.
- Step flow page has 3 steps.
- Before/after page exists.
- No poster overflow.
- Exact visible brand signature: `「两克伴」出品`.
- No page uses more than 2 callouts.

## Gold Gap

This is not a Gold example. It uses CSS-only fake UI blocks as proof placeholders. A Gold Proof Lab example needs real product screenshots, real workflow outputs, or explicitly documented generated proof assets.
