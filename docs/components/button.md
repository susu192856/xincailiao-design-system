# 按钮 Button

> 用于触发操作，区分组件层级和业务色彩语义，覆盖官网转化、后台功能和风险操作。

- 规范页面：`/components/button`
- React 源码：`src/components/ui/Button.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcButton.vue`
- Figma 组件名：`Button`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `string` | `default` | 组件视觉层级或结构类型。 |
| `tone` | `string` | `neutral` | 业务色彩语义，不等同于视觉层级。 |
| `size` | `string` | `md` | 组件尺寸，需匹配官网或后台场景。 |
| `disabled` | `boolean` | `false` | 禁用状态，保留可见但不可操作。 |
| `loading` | `boolean` | `false` | 加载或提交中状态，防止重复操作。 |
| `icon` | `ReactNode / slot` | `—` | 图标插槽，图标来源遵循基础图标规范。 |
| `iconPosition` | `'left' | 'right'` | `—` | 图标相对文字的位置。 |

## 组件属性

### Variants

- `solid`
- `outline`
- `ghost`
- `text`

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

- 按钮文字使用常规字重；主要、次要、弱按钮、文字按钮是层级，neutral、product、brand、danger、warning、success 是业务语义。
- 后台功能操作可使用 product，但不能把蓝色等同于次按钮。
- warning / success 仅用于状态反馈或流程结果，不替代常规主按钮。
- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## Vue 3 引用示例

```ts
import { XcButton } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Button`。
- 属性优先按 Props、Variants、Tones、Sizes、States 拆分，不把业务色彩和组件层级混在同一个属性里。
- 状态必须覆盖后台常见场景：禁用、加载、错误、空状态、权限受限或批量操作反馈，具体以本页 States 为准。

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
| `--product-blue-500` | 颜色 Token |
| `--product-blue-600` | 颜色 Token |
| `--product-blue-700` | 颜色 Token |
| `--brand-600` | 颜色 Token |
| `--brand-700` | 颜色 Token |
| `--brand-800` | 颜色 Token |
| `--error-text` | 语义色 |
| `--error-bg` | 语义色 |
| `--error-tag` | 语义色 |
| `--success-text` | 语义色 |
| `--success-bg` | 语义色 |
| `--success-tag` | 语义色 |
| `--warning-text` | 语义色 |
| `--warning-bg` | 语义色 |
| `--warning-tag` | 语义色 |
