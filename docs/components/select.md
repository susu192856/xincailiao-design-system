# 选择器 Select

> 用于从选项中选择数据，覆盖单选、多选、搜索、禁用项、加载和错误状态。

- 规范页面：`/components/select`
- React 源码：`src/components/ui/Select.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcSelect.vue`
- Figma 组件名：`Select`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `sm | md | lg` | `md` | 选择器高度：28px / 32px / 36px；文字统一 14px、常规字重。 |
| `disabled` | `boolean` | `false` | 禁用状态，保留可见但不可操作。 |
| `error` | `boolean | string` | `—` | 错误状态或错误提示。 |
| `loading` | `boolean` | `false` | 加载或提交中状态，防止重复操作。 |
| `labelPosition` | `top | left` | `top` | 名称位置；与输入框保持一致。 |
| `labelWidth` | `number | string` | `96` | 左右结构时的名称宽度，推荐 96px–120px。 |
| `multiple` | `boolean` | `—` | 多选模式；多选值以 Tag 呈现。 |
| `options` | `{ label; value; disabled? }[]` | `—` | 选项集合，必须覆盖禁用项。 |

## 组件属性

### Variants

- `single`
- `multiple`
- `searchable`

### Tones

- `neutral`
- `product`
- `danger`

### Sizes

- `sm`
- `md`
- `lg`

### States

- `placeholder`
- `selected`
- `focus`
- `error`
- `disabled`
- `loading`
- `disabled-option`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 正式录入字段使用 label；筛选工具栏可省略 label，但 placeholder 必须说明筛选维度。
- 下拉面板宽度与选择器同宽，选项高度 36px，最大高度 240px，超出滚动。
- 宽页面可使用左右 label，与 Input 的 label 宽度保持一致。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## Vue 3 引用示例

```ts
import { XcSelect } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Select`。
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
