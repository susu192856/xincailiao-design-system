# 2026 新材道设计规范

这是新材道设计系统的工作仓库，用于持续维护设计规范、网页文档、设计 Token、组件规范和后续 Figma 组件库同步资产。

## 使用对象

- 设计师：通过 Codex 维护规范内容，并将稳定后的 Token 与组件同步到 Figma 组件库。
- 前端开发：通过 GitHub 查看设计 Token、组件规范、Vue 3 落地示例和网页文档。
- 团队成员：通过 GitHub Pages 查看规范说明和组件使用方式。

## 当前产物

- 网页规范站：Vite + React + TypeScript + Tailwind CSS
- 基础规范页面：颜色、字体、图标、布局、间距、圆角、阴影
- 组件规范页面：按钮、输入框、选择器、表格、卡片、弹窗、标签、Tabs、分页等
- React 示例组件：`src/components/ui`
- Vue 3 源码组件包：`packages/vue-ui`（覆盖全部 32 个规范组件）
- 设计 Token 源：`src/styles/tokens.css`
- Figma Token 文件：`figma/tokens.json`
- Markdown 规范文档：`docs/design-tokens`、`docs/components`
- 视觉治理说明：`docs/VISUAL_GOVERNANCE.md`

## 重要说明

当前 `src/components/ui` 是网页文档站使用的 React 示例组件；`packages/vue-ui` 是面向 Vue 3 项目的源码级组件包起点，已包含按钮、输入框、选择器、标签、卡片、Tabs、表格和分页等高频组件。

开发团队如果使用 Vue 3，应优先复用：

- `src/styles/tokens.css` 中的 CSS 变量
- `packages/vue-ui` 中已经落地的 Vue 3 基础组件
- `docs/components/*.md` 中的组件语义和使用原则
- 网页规范站中的组件语义、尺寸、状态和使用原则

`packages/vue-ui` 当前仍是源码级组件包，不是已经发布到 npm 的稳定组件库。后续需要补齐构建产物、版本策略和组件测试后，再作为正式开发依赖推广。

## 本地开发

```bash
npm install
npm run dev
```

本地预览默认地址：

```text
http://127.0.0.1:5173/
```

## 反馈收集

规范站每个页面右下角都有反馈入口。线上环境使用 Supabase 共享反馈库：访客无需主动登录即可提交，并能在“反馈记录”页面查看当前浏览器提交的内容；管理员通过邮箱登录后可以查看和处理全部反馈。

首次启用时，在 Supabase SQL Editor 中运行：

```bash
supabase/feedback-schema.sql
```

然后在 Supabase 的 Authentication 设置中启用 Anonymous Sign-Ins，并为本地或生产环境配置：

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

数据库通过 Row Level Security 控制访问：访客只能读取自己的提交，管理员邮箱可以读取、更新和删除全部记录。Publishable key 可以用于浏览器端；不要把 Secret key 或 `service_role` key 写入项目。

## 构建

```bash
npm run build
```

完整校验建议使用：

```bash
npm run verify
```

它会检查组件合同、页面交互与折叠代码覆盖、视觉治理、Figma 准备度、Vue SFC 解析和网页构建。

构建产物输出到 `dist`，GitHub Pages 由 `.github/workflows/deploy.yml` 自动部署。

线上地址：

```text
https://susu192856.github.io/xincailiao-design-system/
```

## Figma 同步

Figma 文件：

```text
新材道设计规范 v2.0
https://www.figma.com/design/KjkKSAd9eufpg9eFR9xZVX/%E6%96%B0%E6%9D%90%E9%81%93%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83v2.0?node-id=0-1
```

旧文件 `8nsNC3DOyRpk3fA7mEmBwl` 仅作历史参考，不再作为同步目标。

当前仓库已经提供 `figma/tokens.json`，可作为 Figma Tokens / Tokens Studio 的导入来源。组件层面的 Figma 同步以 `figma/components.manifest.json` 和 `figma/sync-state.json` 为准；在规范完成并通过成熟度与视觉验收前，不执行组件写入：

- Figma Variables：颜色、字号、间距、圆角、阴影
- Figma Components：按钮、输入框、选择器、表格、卡片、弹窗等
- 组件命名与代码组件保持一致
- 组件状态与网页规范站保持一致

更详细的同步说明见：

- `figma/README.md`
- `docs/MAINTENANCE.md`

## 维护流程

1. 在 Codex 中修改规范页面、Token 或组件示例。
2. 运行 `npm run build` 确认构建通过。
3. 如修改 Token，检查 `src/styles/tokens.css` 与 `figma/tokens.json` 是否需要同步。
4. 将稳定后的规范同步到 Figma 组件库。
5. 推送到 GitHub，触发 GitHub Pages 自动部署。
6. 设计师和开发通过网页规范站查看最新规范。

## 当前架构边界

当前仓库已经适合作为“网页规范站”和“规范内容维护仓库”，并具备 32 个 Vue 3 源码组件、Token 导入文件与 Figma 组件合同；但在发布构建、组件测试和 Figma 实体组件完成前，还不等同于可直接安装的正式组件库或完整 Figma 组件库。

建议下一阶段优先补齐：

- 组件导出入口和版本发布策略
- Token 自动同步脚本
- Figma 组件库生成或同步流程
- 设计规范变更记录
