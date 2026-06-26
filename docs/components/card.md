# 卡片 Card

> 用于承载一组相关业务内容，适合指标、入口、列表项和状态摘要。

- 规范页面：`/components/card`
- React 源码：`src/components/ui/Card.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcCard.vue`
- Figma 组件名：`Card`

- 分类：数据与内容
- 合同版本：`0.2.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于组织一个主题的信息摘要、入口或可比较对象。

**避免：** 不要把所有内容都放入卡片，也不要同时让卡片整体和内部多个区域争夺主点击行为。

## 结构 Anatomy

- 容器
- 标题与摘要
- 主体内容
- 状态或操作区
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `string` | `default` | 组件的结构或视觉层级；不得承载业务颜色语义。 |
| `size` | `string` | `md` | 组件尺寸，必须映射到组件尺寸 Token。 |
| `status` | `string` | `—` | 状态语义；不能只依赖颜色表达。 |
| `interactive` | `boolean` | `—` | 是否允许卡片作为整体交互目标。 |
| `selected` | `boolean` | `—` | 表格行或可交互容器的选中状态。 |
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
- `danger`
- `warning`
- `success`

### Sizes

- `sm`
- `md`
- `lg`

### States

- `default`
- `hover`
- `active`
- `disabled`
- `selected`
- `with-status`
- `loading`
- `empty`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

桌面端按规范尺寸展示；窄屏时允许内容换行或纵向排列，交互目标不小于 44px。

## 可访问性

必须提供可见 focus-visible、键盘操作和不依赖颜色的状态表达。

## 内容规范

标题明确对象，描述控制在两到三行；状态、指标和操作按固定位置排列。

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
