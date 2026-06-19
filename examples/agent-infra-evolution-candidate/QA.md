# QA

## Golden Example Status

Status: `Silver Candidate`

This candidate uses real article text and user-supplied article images. It validates the package workflow for adapting a long-form technical article into Xiaohongshu cards, but should be upgraded to `Gold` only after manual visual review.

## Dimensions

- `xhs-01-cover`: 1080 x 1440
- `xhs-02-five-layers`: 1080 x 1440
- `xhs-03-enterprise-advice`: 1080 x 1440

## Aesthetic Gate

- Uses real article images rather than placeholder diagrams.
- The first Xiaohongshu card presents the core thesis in one second: do not only watch model rankings.
- Framework card uses Swiss System density, not a generic corporate dashboard.
- The candidate is Xiaohongshu-only and does not include WeChat cover or forwarding images.
- Manual review fixed the first render's diagram crop issue on the Xiaohongshu cover.
- The framework card is readable and structurally useful, but still feels closer to a polished slide than a `Gold` Xiaohongshu reference.
- Manual review still required before marking as `Gold`.

## Validation

- Rendered 3 images.
- Validator result: 3 clean, 0 fails, 0 warns.

## Copy QA

- No fake performance data or unsupported claims were added.
- Titles match the source article's core claim.
- Xiaohongshu caption is a condensed adaptation, not a replacement for the full article.

## Source QA

- `assets/IMAGE_REQUESTS.md` exists.
- `assets/SOURCES.md` exists.
- All images are user-supplied article images.

## Upgrade Notes

To upgrade to `Gold`, inspect rendered images and confirm:

- no important diagram text is cropped or covered;
- page 2+ are not weaker than the first card;
- the weakest card would not be embarrassing beside a polished technical account post.
