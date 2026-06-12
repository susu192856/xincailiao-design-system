# 单选框 Radio

> 用于单选决策，适合少量互斥选项和配置项。

- 规范页面：`/components/radio`
- React 源码：`src/components/ui/Radio.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcRadio.vue`
- Figma 组件名：`Radio`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `checked` | `boolean` | `false` | 当前是否选中。 |
| `disabled` | `boolean` | `false` | 禁用状态，保留可见但不可操作。 |
| `error` | `boolean | string` | `—` | 错误状态或错误提示。 |
| `helperText` | `string` | `—` | 辅助说明文案。 |

## 组件属性

### Variants

- `single`
- `group`
- `card`

### Tones

- `neutral`
- `product`
- `danger`

### Sizes

- `md`

### States

- `unchecked`
- `checked`
- `error`
- `disabled`
- `disabled-checked`
- `with-helper`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## Vue 3 引用示例

```ts
import { XcRadio } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Radio`。
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
