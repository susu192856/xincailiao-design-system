# 提示反馈 Toast

> 用于轻量操作反馈，不阻断当前任务。

- 规范页面：`/components/toast`
- React 源码：`src/components/ui/Toast.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcToast.vue`
- Figma 组件名：`Toast`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `tone` | `string` | `neutral` | 业务色彩语义，不等同于视觉层级。 |
| `title` | `string` | `—` | 气泡标题，用于说明信息主题。 |
| `description` | `string | boolean | array` | `—` | 组件属性，具体使用以规范页面和源码为准。 |
| `action` | `string | boolean | array` | `—` | 组件属性，具体使用以规范页面和源码为准。 |
| `closable` | `string | boolean | array` | `—` | 组件属性，具体使用以规范页面和源码为准。 |
| `placement` | `'top' | 'right' | 'bottom' | 'left'` | `top / bottom` | 浮层相对触发对象的位置。 |

## 组件属性

### Variants

- `basic`
- `with-description`
- `with-action`

### Tones

- `success`
- `error`
- `warning`
- `info`
- `loading`

### Sizes

- `md`

### States

- `enter`
- `visible`
- `closing`
- `with-close`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## Vue 3 引用示例

```ts
import { XcToast } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Toast`。
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
