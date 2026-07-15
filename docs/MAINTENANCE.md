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

## 视觉治理流程

视觉问题先按页面组和问题类型拆分，不做无边界全盘修改。首页、布局和基础规范页优先于组件页；规范站稳定后再同步 Figma。

- 页面标题、章节标题、说明卡片和规范表格优先使用 `src/components/docs` 的共享组件。
- 说明型表格统一使用 `DocsTable`，由全局样式控制表头、单元格、代码列和说明列的字号与行高。
- 标题前标记统一使用 `SectionHeading` 或 `SubsectionHeading`，不在页面中临时写红色或蓝色小方块。
- 每轮视觉修改需要检查 1440px 桌面、375px 移动端和关键局部截图。
- 具体验收清单见 `docs/VISUAL_GOVERNANCE.md`。

## 页面与组件关系

组件规范页不能只写静态说明，应尽量引用真实组件：

- React 文档站：优先使用 `src/components/ui`
- Vue 3 开发包：优先维护 `packages/vue-ui`
- Figma：组件名称、状态和属性应与 Vue 组件 API 对齐

## 页面体验与代码入口

- 会改变状态、选择、数据或浮层的组件页必须提供至少一个可直接操作的真实示例。
- 交互示例标题标注“可直接操作”，说明文字写清触发方式和预期结果。
- 交互组件在主要示例后提供最小实现代码，代码默认收起；基础 Token 页和纯展示组件不机械增加代码。
- 页面正文使用共同语言解释用途、场景和结果；设计、开发或维护专属内容放入明确标注的角色区。
- 文字密集模块优先增加结构图、状态图或真实组件样本，不用重复段落解释已经能从图中看出的关系。
- 交互与代码覆盖清单见 `docs/DOCS_EXPERIENCE_AUDIT.md`，提交前由 `npm run verify:experience` 检查。

## 当前缺口

- Vue 3 组件包还没有正式打包产物和版本发布策略。
- Figma 目前只有 Token 导入文件，组件同步仍需手动或后续用 Figma API 生成。
- 自动检查已覆盖页面交互入口与折叠代码覆盖；组件级行为、可访问性和视觉回归仍需继续补齐。
- 变更记录尚未建立，后续建议增加 `CHANGELOG.md`。

## 专业度审计

后续优化基础规范页和组件页时，先阅读：

- `docs/DESIGN_SYSTEM_PROFESSIONAL_REVIEW.md`
- `docs/COMPONENT_DELIVERY_AUDIT.md`

前者用于判断视觉专业度、业务场景和规则完整性；后者用于确认组件在网页、React、Vue、Figma 清单和 Markdown 文档中的交付链路是否完整。
