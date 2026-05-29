# 设计系统维护说明

这份仓库承担三类产物：网页规范站、开发代码组件、Figma 同步资产。维护时应先保证语义一致，再调整视觉细节。

## 维护原则

1. `src/styles/tokens.css` 是设计 Token 的源码。
2. `figma/tokens.json` 是给 Figma Tokens / Tokens Studio 的导入文件。
3. `src/components/ui` 是网页文档站的 React 示例组件。
4. `packages/vue-ui` 是给 Vue 3 项目使用的组件源码包。
5. `docs/components` 和 `docs/design-tokens` 是给开发查看的 Markdown 规范补充。

## 常规修改流程

1. 先在 Codex 中修改规范页面、Token 或组件源码。
2. 如果改了 Token，运行 `npm run export` 同步 Markdown 文档和 `figma/tokens.json`。
3. 如果改了 Vue 组件，运行 `npm run verify:vue-ui`。
4. 每次提交前运行 `npm run build`，推荐直接运行 `npm run verify`。
5. 网页确认无误后，将稳定内容同步到 Figma 组件库。
6. 推送 GitHub 后由 GitHub Pages workflow 自动部署网页规范站。

## 页面与组件关系

组件规范页不能只写静态说明，应尽量引用真实组件：

- React 文档站：优先使用 `src/components/ui`
- Vue 3 开发包：优先维护 `packages/vue-ui`
- Figma：组件名称、状态和属性应与 Vue 组件 API 对齐

## 当前缺口

- Vue 3 组件包还没有正式打包产物和版本发布策略。
- Figma 目前只有 Token 导入文件，组件同步仍需手动或后续用 Figma API 生成。
- 组件测试还没有覆盖交互行为、可访问性和视觉回归。
- 变更记录尚未建立，后续建议增加 `CHANGELOG.md`。
