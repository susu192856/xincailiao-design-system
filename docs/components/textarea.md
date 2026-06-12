# 文本域 Textarea

> 用于多行文本录入，适合备注、说明、审核意见和长文本表单。

- 规范页面：`/components/textarea`
- React 源码：`src/components/ui/Textarea.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcTextarea.vue`
- Figma 组件名：`Textarea`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `string` | `md` | 组件尺寸，需匹配官网或后台场景。 |
| `disabled` | `boolean` | `false` | 禁用状态，保留可见但不可操作。 |
| `readOnly` | `boolean` | `—` | 只读状态。 |
| `error` | `boolean | string` | `—` | 错误状态或错误提示。 |
| `helperText` | `string` | `—` | 辅助说明文案。 |
| `required` | `boolean` | `—` | 必填标记。 |
| `rows` | `string | boolean | array` | `—` | 组件属性，具体使用以规范页面和源码为准。 |

## 组件属性

### Variants

- `default`
- `code`
- `with-counter`

### Tones

- `neutral`
- `danger`

### Sizes

- `sm`
- `md`
- `lg`

### States

- `default`
- `hover`
- `focus`
- `error`
- `disabled`
- `readOnly`
- `required`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## Vue 3 引用示例

```ts
import { XcTextarea } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Textarea`。
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
