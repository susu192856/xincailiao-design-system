# 图标 Icon

> 用于表达操作、导航、状态和装饰语义，来源优先遵循 Phosphor Icons，并保持统一线宽。

- 规范页面：`/components/icon`
- React 源码：`src/components/ui/Icon.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcIcon.vue`
- Figma 组件名：`Icon`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `12 | 16 | 20 | 24 | 32 | 48` | `20` | 图标尺寸；后台高频操作优先 16/20，装饰或空状态可用 32/48。 |
| `weight` | `IconWeight` | `regular` | Phosphor Icons 线重，默认 regular。 |
| `tone` | `string` | `neutral` | 业务色彩语义，不等同于视觉层级。 |
| `decorative` | `boolean` | `false` | 装饰性图标标识；仅用于品牌、模块入口、空状态等非操作场景。 |
| `disabled` | `boolean` | `false` | 禁用状态。 |
| `label` | `string` | `—` | 可访问名称；纯装饰图标不传。 |
| `redMark` | `boolean` | `false` | 关键节点短线标记，不替代错误/警告/成功状态。 |

## 组件属性

### Variants

- `phosphor`
- `decorative`

### Tones

- `neutral`
- `muted`
- `product`
- `brand`
- `danger`
- `warning`
- `success`

### Sizes

- `12`
- `16`
- `20`
- `24`
- `32`
- `48`

### States

- `regular`
- `active`
- `disabled`
- `decorative`


## 使用指南

- 通用图标优先使用 Phosphor Icons regular 线性风格，装饰图标只小面积点缀。
- 装饰性图标统一使用 48×48px 画布、2px 描边、1 个 brand-600 红色点缀；红色点缀只表示品牌识别或关键节点。
- 组件状态优先使用 tone、disabled、redMark 拆分表达，避免把红色点缀当作错误色或警告色。
- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## Vue 3 引用示例

```ts
import { XcIcon } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Icon`。
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
