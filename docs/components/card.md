# 卡片 Card

> 用于承载一组相关业务内容，适合指标、入口、列表项和状态摘要。

- 规范页面：`/components/card`
- React 源码：`src/components/ui/Card.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcCard.vue`
- Figma 组件名：`Card`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `plain \| outlined \| muted` | `plain` | 卡片视觉层级。 |
| `size / padding` | `sm \| md \| lg` | `md` | 卡片内边距，React 使用 `size`，Vue 兼容 `padding`。 |
| `title` | `string` | `—` | 卡片标题，用于说明信息主题。 |
| `description` | `string` | `—` | 标题下方辅助说明。 |
| `status` | `default \| product \| brand \| success \| warning \| error` | `default` | 顶部 2px 状态线。 |
| `interactive` | `boolean` | `false` | 是否可点击。 |
| `selected` | `boolean` | `false` | 选中态。 |
| `disabled` | `boolean` | `false` | 禁用状态，保留可见但不可操作。 |
| `loading` | `boolean` | `false` | 加载态，保留卡片结构。 |
| `header / content / footer` | `ReactNode / slot` | `—` | 结构插槽。 |

## 组件属性

### Variants

- `basic`
- `metric`
- `list-item`
- `interactive`
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
- 卡片只用于独立信息单元，不作为页面大分区的默认容器。
- 状态线只做快速识别辅助，具体状态仍需通过标题、标签或说明文字表达。
- 主操作不超过一个，次要操作放入 footer/actions，不堆叠过多按钮。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## Vue 3 引用示例

```ts
import { XcCard } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Card`。
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
