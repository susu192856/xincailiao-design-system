---
name: xincailiao-design-spec
version: 0.2.0
description: 新材道设计规范 Skill。生成、修改或审查新材道官网、门户、数据空间、材库、材小模和后台系统的 UI 时使用。覆盖 29 个共享组件、7 个基础规范、桌面优先的移动适配、React/Vue/Figma 合同和页面模式。不用于纯后端逻辑、非新材道品牌项目或与视觉规范无关的任务。
---

# 新材道设计规范

## 使用流程

1. 判断页面类型和产品线。
2. 加载基础规范与对应组件分类。
3. 精确数值只从 `assets/design-tokens.json` 读取。
4. 组件字段只从 `assets/component-contracts.json` 读取。
5. 生成或修改 UI 后执行自检；仓库改动运行 `npm run verify`。

## 路由

| 任务 | 加载 |
|---|---|
| 颜色、字体、间距、圆角、阴影、布局 | `references/foundations.md` |
| Button、Icon、Input、Textarea、Form、Select、Radio、Checkbox、Switch | `references/components-actions-inputs.md` |
| Table、Pagination、DescriptionList、Card、Tag、Empty、Image、Avatar、Badge | `references/components-data-content.md` |
| Menu、Tabs、Breadcrumb、Collapse、Tree、Transfer | `references/components-navigation.md` |
| Modal、Drawer、Tooltip、Popover、Toast | `references/components-feedback-overlays.md` |
| 官网、门户、营销页面 | `references/page-portal.md` |
| 后台、管理、数据页面 | `references/page-dashboard.md` |
| 移动端或窄屏 | `references/mobile.md` |
| 规则冲突、Review 或新增规则 | `references/meta-rules.md` 与 `references/case-studies.md` |
| 模糊设计语言 | `GLOSSARY.md` |

## 最高优先级规则

- `variant` 表示结构或视觉层级，`tone` 表示业务颜色语义。
- 业务页面禁止硬编码颜色、间距、字号、圆角、阴影、动效和层级。
- 每个独立操作区域最多一个 solid 主操作；取消在左，确认在右。
- 后台任务推进使用 task 黑色，产品能力调用使用 product 蓝色；同组禁止二者同时使用 solid。
- neutral 用于取消、返回、关闭等中性操作；neutral + solid 仅作旧代码兼容。
- 官网关键转化使用 brand。
- Checkbox、Radio、Switch 默认选中语义使用 neutral，不把整个后台染成产品蓝。
- 所有可交互组件必须有可见 `focus-visible`，状态不得只依赖颜色。
- 禁用和只读分开；异步操作必须防重复提交并提供失败恢复。
- 桌面端是主规格，窄屏必须保证无横向页面溢出和至少 44px 触控目标。

## 真相源与冲突

权威顺序：

1. 设计负责人确认的决策。
2. `assets/design-tokens.json`。
3. `assets/component-contracts.json`。
4. 分类 reference。
5. 页面示例和案例。

发现真实冲突时不得静默猜测，按 `references/meta-rules.md` 处理。

## 输出自检

- 是否加载了正确页面和组件 reference？
- 是否全部使用 Token 和正式组件？
- 是否正确区分 variant、tone、size 和状态？
- 是否覆盖 loading、empty、error、disabled、readonly 等适用状态？
- 是否提供键盘、焦点、响应式和内容边界？
- 是否保持产品线的品牌色使用边界？
- 是否运行并通过相关验证？
