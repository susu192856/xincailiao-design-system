# 输入框 Input

> 用于单行文本录入，覆盖聚焦、错误、禁用、只读、必填和帮助信息等后台常见状态。

- 规范页面：`/components/input`
- React 源码：`src/components/ui/Input.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcInput.vue`
- Figma 组件名：`Input`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `sm | md | lg` | `md` | 输入框高度：28px / 32px / 36px；文字统一 14px、常规字重。 |
| `disabled` | `boolean` | `false` | 禁用状态，保留可见但不可操作。 |
| `readOnly` | `boolean` | `—` | 只读状态。 |
| `error` | `boolean | string` | `—` | 错误状态或错误提示。 |
| `labelPosition` | `top | left` | `top` | 名称位置；宽页面配置表单可使用 left。 |
| `labelWidth` | `number | string` | `96` | 左右结构时的名称宽度，推荐 96px–120px。 |
| `prefix` | `ReactNode` | `—` | 前置图标或内容。 |
| `suffix` | `string | boolean | array` | `—` | 组件属性，具体使用以规范页面和源码为准。 |
| `helperText` | `string` | `—` | 辅助说明文案。 |
| `required` | `boolean` | `—` | 必填标记。 |

## 组件属性

### Variants

- `default`
- `with-prefix`
- `with-suffix`

### Tones

- `neutral`
- `product`
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
- 正式录入字段必须有 label；搜索、筛选工具栏等上下文明确场景可省略 label。
- 窄表单和弹窗默认上下结构；宽页面、数据配置和审批配置可使用左右结构。
- 只读用于可查看不可修改的系统结果、审批锁定或权限受限字段；禁用用于当前不可操作且通常不参与提交的字段。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## Vue 3 引用示例

```ts
import { XcInput } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Input`。
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
