# 气泡弹窗 Popover

> 用于承载轻量说明、快捷信息和少量操作，适合不打断流程的局部补充。

- 规范页面：`/components/popover`
- React 源码：`src/components/ui/Popover.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcPopover.vue`
- Figma 组件名：`Popover`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `—` | 气泡标题，用于说明信息主题。 |
| `content` | `ReactNode / slot` | `—` | 提示或气泡主体内容。 |
| `footer` | `ReactNode / slot` | `—` | 气泡底部操作区。 |
| `placement` | `'top' | 'right' | 'bottom' | 'left'` | `top / bottom` | 浮层相对触发对象的位置。 |
| `open` | `boolean` | `false` | 浮层或面板是否展开。 |

## 组件属性

### Variants

- `basic`
- `with-title`
- `with-footer`
- `action-menu`

### Tones

- `neutral`
- `product`

### Sizes

- `md`

### States

- `hidden`
- `visible`
- `top`
- `right`
- `bottom`
- `left`
- `with-action`


## 使用指南

- 用于局部补充信息和少量快捷操作，不用于复杂表单或强确认流程。
- 需要阻断任务或二次确认时，应升级为 Modal。
- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## Vue 3 引用示例

```ts
import { XcPopover } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Popover`。
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
| `--z-tooltip` | Z-index Token |
| `--shadow-md` | 阴影 Token |
| `--shadow-lg` | 阴影 Token |
