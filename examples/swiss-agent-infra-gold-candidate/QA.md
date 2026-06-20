# QA

Status: `Gold Candidate`

## Checks

- Visual system: Swiss System
- Template status: `template-locked`
- Board size: 1080x1440, Xiaohongshu 3:4
- Brand signature: `「两克伴」出品`
- Source images: local user-owned article assets

## Swiss Rules

- No rounded cards added.
- No custom Swiss lookalike classes added.
- No heavy display title added.
- One accent palette: IKB.
- Images use straight `frame-img` containers.
- Cards use seed primitives: `h-statement`, `h-xl`, `lead`, `matrix-fill`, `stacked-ledger`, `card-ink`, `frame-img`.

## Validation

- Rendered 5 images to `output/images/`.
- `node scripts/validate-social-deck.mjs examples/swiss-agent-infra-gold-candidate`: 0 fails, 5 density warnings.
- Density warnings are retained for manual review because the strict Swiss system uses deliberate white space; pages 2 and 5 were visually reviewed and adjusted after initial render.

## Manual Review Notes

- Page 01: strong enough as cover; Swiss white space reads intentional.
- Page 01 revised to state the topic directly: `2026 上半年 / Agent 基础设施演进观察`.
- Page 02: source image was cropped to remove whitespace and improve visual weight; copy revised to explain the shift from model capability to deployment capability.
- Page 03: fixed initial overflow by switching from a narrow title grid to full-width title; copy revised so `Harness` is explained as a system boundary, not a slogan.
- Page 04: strongest interior page; image and matrix are balanced.
- Page 05: fixed collapsed image by using a cropped source image and compact matrix instead of stacked ledger; copy revised to explain the task-routing logic without needing article context.

Do not promote to `Gold` until the user confirms the visual standard. Current label remains `Gold Candidate`.
