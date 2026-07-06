# BRIEF

## Proposal Confirmation

- requiredBeforeBuild: yes
- status: confirmed
- confirmationSource: user confirmed the Swiss System + Peacock direction, requested GPT Image illustration assets, then approved the revised cover and asked to build the full deck

## Route Decision

- visualSystem: Swiss System
- subTemplate: none
- theme: peacock
- recipeSequence: cover -> statelessness -> context window -> hierarchy -> memory types -> retrieval loop -> trade-offs -> checklist
- imagePolicy: use GPT Image assets for mechanism diagrams; keep labels readable; use source-inspired information diagrams rather than abstract illustrations
- copyStrategy: explain ByteByteGo's source argument in plain Chinese with a visible product/AI workflow reader position
- qaFocus: 3:4 dimensions, cover thumbnail readability, source fidelity, diagram label readability, exact brand signature
- confidence: high
- matchedKeywords: AI Agent, memory, context window, retrieval, framework, checklist

## Card Count

This deck uses 8 cards because the source has six distinct argument steps that should not be collapsed without losing meaning: statelessness, context-window limits, memory hierarchy, memory types, retrieval loop, and trade-offs. The deck adds one cover card to frame the promise and one closing checklist card to turn the source into a useful reader-facing decision framework.

## Concrete Reader

- Who: AI 产品经理、Agent 开发者、AI 工具重度用户、关注 ChatGPT/Claude memory 功能的人
- Moment: 看到某个 AI 产品说自己有 memory / long-term memory / cross-session memory 时
- Pain/emotion: 直觉上以为“模型变得会记人”，但不知道背后到底是什么系统
- Save/share reason: 这组图可以当作判断智能体记忆架构的速查框架
- Identity: 从“会用 AI”往“能判断 AI 系统设计”靠近

## Value Translation

| Source / concept | User translation |
|---|---|
| Statelessness | 模型不是一直在线记着你，每轮调用都需要重新给它材料 |
| Context window | 窗口只是当前可见文本，不是可靠长期记忆 |
| Memory hierarchy | 好的记忆系统要分层管理速度、容量和成本 |
| Memory types | AI 需要区分当前任务、过去事件、稳定事实和做事偏好 |
| Retrieval loop | 记忆的难点不是写数据库，而是每轮取回什么 |
| Trade-offs | 记忆越有用，越要处理过期、压缩损失和安全风险 |

## Page Plan

| Card | Role | Source anchor | Must carry | Reader sentence | Visual proof | Cut |
|---:|---|---|---|---|---|---|
| 1 | cover | article conclusion | memory is outside the model | 智能体记事靠系统，不靠模型自己记 | GPT Image system overview | detailed tiers |
| 2 | concept | Statelessness | every call starts fresh | 连续性是平台工程，不是模型状态 | template flow | API serving details |
| 3 | mechanism | Context Window + Lost in the Middle | context is not memory | 窗口再大，中间信息也可能被忽略 | GPT Image info diagram | token pricing details |
| 4 | mechanism | Memory Hierarchy | layered memory system | 相关信息被提升，不相关信息沉到存储层 | GPT Image info diagram | OS paging details |
| 5 | matrix | 4 Types of Memory | memory types are orthogonal to tiers | AI 要记的是不同类型的信息 | template matrix | long examples |
| 6 | mechanism | Retrieval Loop | retrieval is the hard part | 生产记忆失败常是检索失败 | GPT Image info diagram | implementation algorithms |
| 7 | risk | Tradeoffs | memory requires maintenance | 记得越久越要判断是否可靠 | GPT Image info diagram | extra security taxonomy |
| 8 | closing | Conclusion | ask architecture questions | 别问模型能不能记，问系统怎么保存和取回 | checklist | duplicate recap |
