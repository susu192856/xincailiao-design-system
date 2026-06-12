# 描述列表 DescriptionList

> 用于展示字段和值的结构化信息，适合详情页、审核页和数据资产摘要。

- 规范页面：`/components/description-list`
- React 源码：`src/components/ui/DescriptionList.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcDescriptionList.vue`
- Figma 组件名：`Description List`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `DescriptionItem[]` | `—` | 描述项数组，包含 `label`、`value`、`span`。 |
| `columns` | `1 \| 2 \| 3` | `2` | 字段列数；详情页默认 2 列，高密参数可 3 列。 |
| `bordered` | `boolean` | `true` | 是否显示字段边框。 |
| `emptyText` | `ReactNode / string` | `--` | 空值占位。 |
| `size` | `sm \| md` | `md` | 字段密度。 |
| `layout` | `stacked \| inline` | `stacked` | 标签和值上下排列或左右排列。 |
| `labelWidth` | `number \| string` | `88` | `inline` 布局下标签固定宽度。 |

## 组件属性

### Variants

- `one-column`
- `two-column`
- `three-column`
- `bordered`
- `inline-label`
- `media-group`

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

### States

- `default`
- `empty`
- `with-status`
- `masked`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- 宽详情页或抽屉详情可使用 `layout="inline"`，label 建议 76px-112px。
- 图片、附件和关键参数应作为同一信息组呈现，避免图文资料和字段列表分离。
- 空值统一显示 `--`，不要留空或直接隐藏字段。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## Vue 3 引用示例

```ts
import { XcDescriptionList } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Description List`。
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
