# Image Requests

## Cover Memory System

- card name: xhs-01-cover
- image role: hero mechanism illustration
- source route: AI-generated asset, processed to remove yellow image background
- subject zone: middle horizontal band
- safe text zone: no text inside image; title and labels are template text
- portrait-fit decision: keep landscape because the cover has a wide evidence band and the diagram is itself the proof/visual explanation
- target filename: `cover-memory-system.png`

```text
asset: cover-memory-system.png
portrait-fit decision: recompose
reason: cover uses a landscape source evidence diagram recomposed into a wide proof band inside a portrait card; text remains outside the image
```

## Context Window

- card name: xhs-03-context-window
- image role: source-inspired information diagram
- source route: AI-generated asset
- source anchor: original figures `Context Window` and `Lost in the Middle`
- must preserve: context window block list, what the model reads, recall accuracy curve
- text approach: English labels inside diagram for readability
- target filename: `fig-context-window.png`
- portrait-fit decision: keep landscape because the source-inspired information diagram needs horizontal label readability inside a portrait card

```text
asset: fig-context-window.png
portrait-fit decision: keep-landscape
reason: evidence diagram with source-inspired labels; horizontal space is required for readable connectors and the recall curve
```

## Memory Hierarchy

- card name: xhs-04-memory-hierarchy
- image role: source-inspired information diagram
- source route: AI-generated asset
- source anchor: original figure `4-Tier Memory Hierarchy`
- must preserve: Context window, Session memory, Long-term store, Cold archive, promote/demote arrows
- text approach: English labels inside diagram for readability
- target filename: `fig-memory-hierarchy.png`
- portrait-fit decision: keep landscape because the hierarchy diagram is source evidence and must remain wide enough for labels and arrows

```text
asset: fig-memory-hierarchy.png
portrait-fit decision: keep-landscape
reason: evidence diagram with source-inspired hierarchy labels and promote/demote arrows; width preserves readability
```

## Retrieval Loop

- card name: xhs-06-retrieval-loop
- image role: source-inspired information diagram
- source route: AI-generated asset
- source anchor: original figure `Retrieval Loop`
- must preserve: User message, Retrieve, Assemble context, Generate response, Write back, memory persists across messages
- text approach: English labels inside diagram for readability
- target filename: `fig-retrieval-loop.png`
- portrait-fit decision: keep landscape because the retrieval loop is a left-to-right flow and must remain readable

```text
asset: fig-retrieval-loop.png
portrait-fit decision: keep-landscape
reason: evidence diagram with left-to-right retrieval loop; width preserves step labels and memory loop
```

## Memory Trade-offs

- card name: xhs-07-tradeoffs
- image role: source-inspired information diagram
- source route: AI-generated asset
- source anchor: article section `Tradeoffs`
- must preserve: Recency vs relevance, Summary vs fidelity, Staleness, Memory poisoning
- text approach: English labels inside diagram for readability
- target filename: `fig-tradeoffs.png`
- portrait-fit decision: keep landscape because the four-panel trade-off grid needs width for labels and visual metaphors

```text
asset: fig-tradeoffs.png
portrait-fit decision: keep-landscape
reason: evidence diagram with four trade-off panels; width preserves labels and visual comparisons
```
