# Figma 同步说明

唯一正式 Figma 文件：

https://www.figma.com/design/KjkKSAd9eufpg9eFR9xZVX/%E6%96%B0%E6%9D%90%E9%81%93%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83v2.0?node-id=0-1

旧文件 `8nsNC3DOyRpk3fA7mEmBwl` 仅作历史参考，不再同步。

## Token 来源

Figma Token 的源码来自：

- `src/styles/tokens.css`
- `figma/tokens.json`

当 `tokens.css` 修改后，运行：

```bash
npm run export
npm run sync:skill-assets
```

脚本会重新生成 `figma/tokens.json` 和 `docs/design-tokens/*.md`，并将 Token 与组件合同同步到 Skill 结构化资产。`figma/components.manifest.json` 是组件同步清单，不属于 Token 文件，不会由 `npm run export` 自动重建。

## 组件清单

`figma/components.manifest.json` 是 Figma 组件同步清单，用来把网页规范站、React 示例组件、Vue 源码组件和 Figma 组件命名对齐。

每个组件条目包含：

- `figmaName`：建议在 Figma 中使用的组件名称。
- `route`：网页规范站中的对应页面。
- `reactSource`：当前规范站实际引用的 React 组件源码。
- `vueSource`：如果已有 Vue 3 源码组件，则标记对应文件。
- `props`、`variants`、`tones`、`sizes`、`states`：Figma 组件属性和状态拆分依据。

同步 Figma Components 前，应先检查这个清单与网页组件页面、`src/components/ui`、`packages/vue-ui` 是否一致。

## 建议同步顺序

1. 组件成熟度依次为 `draft → review → stable`。
2. `draft` 与 `review` 只同步仓库、网页和 Skill；只有 `stable` 才同步 Figma。
3. 在 Codex 中确认 Token、组件语义和网页规范站已经稳定。
4. 运行 `npm run verify`，确认成熟度、Vue 组件和网页构建通过。
5. 在 Figma v2.0 中建立单模式 Variables、文字样式和阴影样式。
6. 按组件优先级同步 Figma Components：
   - Button
   - Input
   - Select
   - Tag
   - Tabs
   - Card
   - Table
   - Pagination
   - Modal
7. 组件命名、状态和属性应与 React、Vue 和 manifest 保持一致。

## 命名约定

- Figma 组件名使用英文，例如 `Button`、`Input`、`Select`。
- 组件属性优先对齐代码字段，例如 `variant`、`tone`、`size`、`disabled`、`loading`。
- Token 命名不重新翻译，保持 `brand-600`、`product-blue-500`、`neutral-900` 这类可追溯名称。

## 当前状态

目前仓库已经具备 Token 导入文件、29 个组件的 Figma 同步清单、29 个 Vue 3 组件源码和 React 规范实现。

2026-06-22 已在 v2.0 文件创建：

- 4 个单模式 Variable Collections，共 222 个变量。
- 10 个文字样式，Figma 使用 `Noto Sans SC`；代码字体栈仍以 `PingFang SC` 为首选。
- 6 个阴影样式。
- Button 已达到 stable，但需要 Foundations 人工验收后才创建 Figma 组件。

当前精确同步状态记录在 `figma/sync-state.json`。

组件同步状态应按三层判断：

- 网页规范站：以 `/components/*` 路由作为用户查看入口。
- 前端代码：以 `src/components/ui` 为 React 规范站源码，以 `packages/vue-ui` 为 Vue 组件源码起点。
- Figma 组件：以 `figma/components.manifest.json` 作为命名、属性、状态和优先级清单，实际组件库仍需在 Figma 中创建或同步。
