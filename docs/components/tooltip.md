# 文字提示 Tooltip

> 用于解释图标、字段或被截断内容，只承载短文本，不打断当前操作。

- 规范页面：`/components/tooltip`
- React 源码：`src/components/ui/Tooltip.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcTooltip.vue`
- Figma 组件名：`Tooltip`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `content` | `ReactNode / slot` | `—` | 提示或气泡主体内容。 |
| `placement` | `'top' | 'right' | 'bottom' | 'left'` | `top / bottom` | 浮层相对触发对象的位置。 |
| `open` | `boolean` | `false` | 浮层或面板是否展开。 |

## 组件属性

### Variants

- `short-text`
- `long-text`
- `disabled-trigger`

### Tones

- `neutral`

### Sizes

- `sm`

### States

- `hidden`
- `visible`
- `top`
- `right`
- `bottom`
- `left`
- `focus`


## 使用指南

- 只放短文本，不放按钮、链接、表单和复杂说明；需要操作时使用 Popover。
- 触发方式必须同时支持 hover 与 keyboard focus。
- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## Vue 3 引用示例

```ts
import { XcTooltip } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Tooltip`。
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
| `--z-tooltip` | Z-index Token |
| `--shadow-md` | 阴影 Token |
| `--shadow-lg` | 阴影 Token |
