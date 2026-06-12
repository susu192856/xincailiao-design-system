# 表单 Form

> 用于组织数据录入流程，覆盖分组、校验、只读、权限锁定、提交中和错误反馈。

- 规范页面：`/components/form`
- React 源码：`src/components/ui/Form.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcForm.vue`
- Figma 组件名：`Form`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `layout` | `single-column | two-column | sectioned | inline-filter` | `two-column` | 表单结构，需按页面宽度和字段密度选择。 |
| `density` | `standard | compact` | `standard` | 表单密度，筛选区和表格工具栏使用 compact。 |
| `state` | `default | readonly | disabled | error | submitting | permission-locked` | `default` | 页面级状态，必须和字段状态同步表达。 |
| `actions` | `start | end | between` | `end` | 操作区排列，编辑表单右对齐，筛选工具栏可左对齐。 |
| `labelPosition` | `top | left` | `top` | 透传给字段组件；宽表单可使用 left。 |

## 组件属性

### Variants

- `single-column`
- `two-column`
- `sectioned`
- `inline-filter`

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
- `readonly`
- `disabled`
- `error`
- `submitting`
- `permission-locked`


## 使用指南

- 表单必须同时说明录入、校验、只读、提交中、保存失败和权限锁定状态。
- 1000px 以上宽容器优先 2 列或左右 label，筛选工具栏可使用 3-4 列紧凑布局。
- 常规输入框建议 280px-360px，长文本、说明、地址类字段可跨列但不超过 720px。
- 编辑表单次要操作在左、主操作在右；筛选工具栏按钮可紧跟筛选项左对齐。
- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## Vue 3 引用示例

```ts
import { XcForm } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Form`。
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
