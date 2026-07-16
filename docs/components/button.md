# 按钮 Button

> 用于触发操作，区分组件层级和业务色彩语义，覆盖官网转化、后台功能和风险操作。

- 规范页面：`/components/button`
- React 源码：`src/components/ui/Button.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcButton.vue`
- Figma 组件名：`Button`

- 分类：操作与输入
- 合同版本：`0.2.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于触发明确操作；每个独立操作区域只保留一个主操作。

**避免：** 不要用颜色代替层级；同一按钮组禁止同时出现 task 与 product 两个 solid 按钮。

## 结构 Anatomy

- 容器
- 可选图标
- 文字标签
- 加载指示器
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `string` | `default` | 组件的结构或视觉层级；不得承载业务颜色语义。 |
| `tone` | `string` | `task` | 组件的操作或业务颜色语义；Button 中 task 推进任务，product 调用产品能力。 |
| `size` | `string` | `md` | 组件尺寸，必须映射到组件尺寸 Token。 |
| `disabled` | `boolean` | `false` | 禁用状态；不可交互但仍保留上下文。 |
| `loading` | `boolean` | `false` | 异步处理中状态；阻止重复操作。 |
| `icon` | `ReactNode | slot` | `—` | 图标插槽；遵循 Icon 规范。 |
| `iconPosition` | `'left' | 'right'` | `—` | 图标相对文字的位置。 |

## 变体、语义、尺寸与状态

### Variants

- `solid`
- `outline`
- `ghost`
- `text`

### Tones

- `task`
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
- `xl`
- `2xl`

### States

- `default`
- `hover`
- `active`
- `disabled`
- `loading`
- `icon-only`


## 使用指南

- 按钮文字使用常规字重；主要、次要、弱按钮、文字按钮是层级，neutral、product、brand、danger 是业务语义。
- 后台功能操作可使用 product，但不能把蓝色等同于次按钮。
- task、product 与 brand 的业务语义以颜色规范为唯一判断来源；按钮规范只维护操作组内的层级、顺序和组合方式。
- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

桌面端按规范尺寸展示；窄屏时允许内容换行或纵向排列，交互目标不小于 44px。

## 可访问性

必须提供可见 focus-visible、键盘操作和不依赖颜色的状态表达。

## 内容规范

task 使用提交、确认、发布、创建等推进任务的动词；product 使用分析、生成、连接、筛选、导出等调用能力的动词。

## 示例要求

- 基础示例：Button 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Button 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcButton } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Button`。
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
| `--color-action-task-default` | 任务主行动 Token |
| `--color-action-task-hover` | 任务主行动 Hover Token |
| `--color-action-task-active` | 任务主行动 Active Token |
| `--color-action-product-default` | 产品能力 Token |
| `--color-action-product-hover` | 产品能力 Hover Token |
| `--color-action-product-active` | 产品能力 Active Token |
| `--product-blue-500` | 颜色 Token |
| `--product-blue-600` | 颜色 Token |
| `--product-blue-700` | 颜色 Token |
| `--brand-600` | 颜色 Token |
| `--brand-700` | 颜色 Token |
| `--brand-800` | 颜色 Token |
| `--error-text` | 语义色 |
| `--error-bg` | 语义色 |
