# Figma 同步说明

Figma 文件：

https://www.figma.com/design/8nsNC3DOyRpk3fA7mEmBwl/2026-%E6%96%B0%E6%9D%90%E9%81%93%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83%E5%8F%8A%E7%BB%84%E4%BB%B6

## Token 来源

Figma Token 的源码来自：

- `src/styles/tokens.css`
- `figma/tokens.json`

当 `tokens.css` 修改后，运行：

```bash
npm run export
```

脚本会重新生成 `figma/tokens.json` 和 `docs/design-tokens/*.md`。

## 建议同步顺序

1. 在 Codex 中确认 Token、组件语义和网页规范站已经稳定。
2. 运行 `npm run verify`，确认 Vue 组件和网页构建通过。
3. 将 `figma/tokens.json` 导入 Figma Tokens / Tokens Studio。
4. 在 Figma 中建立 Variables：颜色、字体、间距、圆角、阴影。
5. 按组件优先级同步 Figma Components：
   - Button
   - Input
   - Select
   - Tag
   - Tabs
   - Card
   - Table
   - Pagination
   - Modal
6. 组件命名、状态和属性应与 `packages/vue-ui` 保持一致。

## 命名约定

- Figma 组件名使用英文，例如 `Button`、`Input`、`Select`。
- 组件属性优先对齐代码字段，例如 `variant`、`tone`、`size`、`disabled`、`loading`。
- Token 命名不重新翻译，保持 `brand-600`、`product-blue-500`、`neutral-900` 这类可追溯名称。

## 当前状态

目前仓库已经具备 Token 导入文件和 Vue 3 组件源码包起点，但 Figma Components 还没有被自动生成或同步。设计师可以先导入 Token，再按网页规范站和 Vue 组件 API 手动建立组件库。
