# 卡片 Card

> 用于承载可独立理解、重复排列、整体移动或操作的信息单元。

- 规范页面：`/components/card`
- React 源码：`src/components/ui/Card.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcCard.vue`
- Figma 组件名：`Card`

- 分类：数据与内容
- 合同版本：`0.3.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于组织一个可独立理解的对象、入口或摘要；该单元可以脱离当前页面位置仍保持完整语义。

**避免：** 页面大分区、连续阅读内容和单纯视觉分隔不使用 Card。不要同时让卡片整体和内部按钮、链接争夺主点击行为。

## 结构 Anatomy

- `Card` 容器
- `CardHeader` 标题与摘要
- `CardContent` 主体内容
- `CardFooter` 补充信息或主操作
- `CardActions` 标题区辅助操作
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'plain' \| 'outlined' \| 'muted'` | `plain` | 容器视觉层级，不表示业务场景。 |
| `size` | `'sm' \| 'md' \| 'lg'` | `md` | 对应 16、24、32px 内边距。 |
| `status` | `'default' \| 'product' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `default` | 顶部状态线，仅作辅助识别。 |
| `interactive` | `boolean` | `false` | 是否允许卡片作为整体交互目标；启用后提供焦点和键盘触发。 |
| `selected` | `boolean` | `false` | 可选择卡片的辅助选中反馈。 |
| `disabled` | `boolean` | `false` | 禁用状态；不可交互但仍保留上下文。 |
| `loading` | `boolean` | `false` | 异步处理中状态；阻止重复操作。 |

## 变体、语义、尺寸与状态

### Variants

- `plain`
- `outlined`
- `muted`

### Tones

- `neutral`
- `product`
- `brand`
- `error`
- `warning`
- `success`

### Sizes

- `sm`
- `md`
- `lg`

### States

- `default`
- `hover`
- `focus`
- `disabled`
- `selected`
- `with-status`
- `loading`


## 使用指南

- `plain`、`outlined`、`muted` 是组件 Variant；数据资产、功能入口、状态摘要属于业务使用模式，不是 Variant。
- `sm`、`md`、`lg` 分别使用 16、24、32px 内边距；同组卡片保持尺寸一致。
- 整体可点击卡片内部不得再放置按钮或链接；存在内部操作时取消整卡交互。
- 批量选择显示 Checkbox，互斥方案显示 Radio；整卡选中样式只作为辅助反馈。
- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

卡片网格在窄屏改为单列；Header、Content、Footer 内部内容按需要纵向排列，页面不得因固定卡片宽度产生横向溢出。

## 可访问性

整体可交互卡片必须提供 `role="button"`、可见 `focus-visible`，并支持 Enter 与 Space；禁用和加载状态退出 Tab 顺序。状态与选中不能只依赖边框或颜色。

## 内容规范

标题明确对象，描述控制在两到三行；主操作不超过一个。顶部状态线不能替代标题、标签或状态说明。Card 可以组合 DescriptionList、Tag 和 Button，但不替代这些组件的语义。

## 示例要求

- 基础示例：Card 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Card 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcCard } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Card`。
- 属性优先按 Props、Variants、Tones、Sizes、States 拆分，不把业务色彩和组件层级混在同一个属性里。
- 仅创建本组件适用的状态，具体以本页 States 为准，不机械复制无关状态。
- 使用 Auto Layout、变量绑定和标准 Variant Property；浮层必须提供静态打开态。

## 依赖 Token

组件使用的设计变量（CSS Custom Properties）：

| Token | 来源 |
|-------|------|
| `--radius-sm` | 圆角 Token |
| `--neutral-900` | 颜色 Token |
| `--neutral-800` | 颜色 Token |
| `--neutral-700` | 颜色 Token |
| `--neutral-600` | 颜色 Token |
| `--neutral-500` | 颜色 Token |
| `--neutral-400` | 颜色 Token |
| `--neutral-300` | 颜色 Token |
| `--neutral-200` | 颜色 Token |
| `--neutral-100` | 颜色 Token |
| `--neutral-50` | 颜色 Token |
