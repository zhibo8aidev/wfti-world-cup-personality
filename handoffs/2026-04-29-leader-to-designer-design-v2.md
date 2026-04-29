# Handoff

- Project: wfti-world-cup-personality
- Current stage: design
- From owner: leader
- To owner: designer
- Owner agent/session: gemini ACP session
- Approved inputs:
  - artifacts/proposal.md
  - artifacts/specs/product-spec.md
  - artifacts/specs/question-algorithm-spec.md
  - artifacts/specs/technical-notes.md
  - artifacts/source-prd/design-direction.md
  - artifacts/source-prd/head-image-reference.md
  - artifacts/design.md
  - artifacts/react_native_mockups/index.html
  - artifacts/react_native_mockups/styles.css
  - artifacts/react_native_mockups/script.js
- New artifacts to update:
  - artifacts/design.md
  - artifacts/react_native_mockups/index.html
  - artifacts/react_native_mockups/styles.css
  - artifacts/react_native_mockups/script.js

## Request
已收到实际头图链接，请基于 `artifacts/source-prd/head-image-reference.md` 对设计稿进行二次校准：
1. 页面首屏与正文衔接色必须贴合头图底部像素采样结果。
2. 更新 design.md 中原先“待头图补齐后校准”的占位说明，改为已基于实图完成校准，并保留色值说明。
3. 更新 HTML mockups 的背景、按钮、卡片高光与文字对比，使其更贴近头图蓝白 3D / 柔光质感。
4. 不要改动已批准的页面结构与信息范围，只做视觉精修。

## Exit Criteria
- design.md 完成二次修订
- react_native_mockups 完成吸色与风格校准
- 新增执行 run 与 designer -> leader handoff v2
