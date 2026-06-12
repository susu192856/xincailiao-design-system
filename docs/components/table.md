# 表格 Table

> 用于承载高密度结构化数据，覆盖筛选、选择、加载、空状态、错误和分页组合。

- 规范页面：`/components/table`
- React 源码：`src/components/ui/Table.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcTable.vue`
- Figma 组件名：`Table`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `columns` | `array / number` | `—` | 字段列数或表格列定义。 |
| `data` | `array` | `—` | 组件展示的数据源。 |
| `density` | `string | boolean | array` | `—` | 组件属性，具体使用以规范页面和源码为准。 |
| `rowSelection` | `string | boolean | array` | `—` | 组件属性，具体使用以规范页面和源码为准。 |
| `loading` | `boolean` | `false` | 加载或提交中状态，防止重复操作。 |
| `empty` | `string | boolean | array` | `—` | 组件属性，具体使用以规范页面和源码为准。 |
| `align` | `left \| center \| right` | `left` | 列对齐方式，数字、金额、百分比等可比较数据右对齐。 |
| `minWidth` | `number \| string` | `—` | 宽表格最小宽度，由外层容器横向滚动承载。 |

## 组件属性

### Variants

- `basic`
- `dense`
- `selectable`
- `with-toolbar`
- `with-pagination`
- `wide-scroll`

### Tones

- `neutral`
- `product`
- `danger`
- `warning`
- `success`

### Sizes

- `compact`
- `regular`

### States

- `default`
- `hover-row`
- `selected-row`
- `loading`
- `empty`
- `error`
- `no-permission`
- `partial-selected`
- `overflow`


## 使用指南

- 表格必须优先覆盖后台高密度场景：筛选、排序、选择、空状态、分页、加载和权限受限。
- 字段过多时使用横向滚动，不强行压缩列宽；外层容器必须允许 `overflow-x`。
- 文本列左对齐，操作列右对齐，数字、金额、百分比等可比较数据右对齐并建议使用等宽数字。
- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## Vue 3 引用示例

```ts
import { XcTable } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Table`。
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
