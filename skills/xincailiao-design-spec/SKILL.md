---
name: xincailiao-design-spec
version: 0.1.0
description: 新材道设计规范 Skill。当你需要生成、修改、审查新材道（xincailiao）产品的 UI 页面或组件时使用——包括官网门户、后台系统、数据空间、材库、材小模等全线产品。涵盖 29 个共享 UI 组件、设计 Token、布局系统、多产品线变体。生成任何前端代码前必须先查阅此 Skill。不使用此 Skill 的场景：纯后端逻辑、非新材道品牌的通用页面、与设计规范无关的代码。
---

# 新材道设计规范 Skill

## 触发条件

当用户提到以下任一关键词时，必须加载此 Skill：
- 新材道、xincailiao、材库、材小模、数据空间
- 设计规范、设计系统、组件库、design system
- 修改/新增/优化 UI 组件或页面
- 颜色、字体、间距、圆角、阴影等设计 Token
- 官网、门户、后台、dashboard

## 使用流程

1. **先查规则** — 生成任何 UI 前，先查阅对应的 reference 文件
2. **读取 Token** — 颜色/字号/间距/圆角/阴影必须来自 CSS 变量或 `assets/product-lines.json`
3. **匹配模板** — 官网用 portal 模板，后台用 dashboard 模板
4. **对照案例库** — 避免重复已知错误
5. **自检** — 生成结果后用 `evals/evals.json` 中的检查项验证
6. **运行构建** — 修改完成后执行 `npm run build`

## 路由表

| 场景 | 查阅文件 |
|---|---|
| 修改/使用任何 UI 组件 | `references/components-shared.md` |
| 官网/门户/营销页面 | `references/page-portal.md` |
| 后台/管理系统页面 | `references/page-dashboard.md` |
| 排版/布局/网格 | `references/layout-system.md` |
| 设计语言有歧义（"简约""大气"等） | `GLOSSARY.md` |
| 出现已知错误模式 | `references/case-studies.md` |
| 多产品线颜色/字号差异 | `assets/product-lines.json` |
| Figma Token 同步 | `assets/figma-tokens.json` |
| 验证规则是否生效 | `evals/evals.json` |

## 行为准则

- 所有颜色值必须来自 `src/styles/tokens.css` 中的 CSS 变量，禁止硬编码色值
- 所有间距必须使用 `--spacing-*` 系列变量
- 所有字号必须使用 `--type-*` 系列变量
- 修改 Token 后必须同步更新 `figma/tokens.json`
- 修改后必须运行 `npm run build` 确认通过
- 不修改 `packages/vue-ui/` 中的 Vue 组件（那是给开发用的落地代码，由开发团队维护）
