# 弹窗 Modal

> 用于承载需要用户确认或专注处理的任务，覆盖普通、危险、警告和成功反馈。

- 规范页面：`/components/modal`
- React 源码：`src/components/ui/Modal.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcModal.vue`
- Figma 组件名：`Modal`

- 分类：反馈与浮层
- 合同版本：`0.2.0`
- 规范状态：完善中

## 定位与边界

**适用：** 用于阻断式确认和必须聚焦处理的任务。

**避免：** 不要嵌套多个弹窗，也不要用弹窗承载长时间浏览内容。

## 结构 Anatomy

- 遮罩
- 标题区
- 内容区
- 底部操作区
- 关闭入口
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `string` | `md` | 组件尺寸，必须映射到组件尺寸 Token。 |
| `tone` | `string` | `neutral` | 组件的操作或业务颜色语义；Button 中 task 推进任务，product 调用产品能力。 |
| `open` | `boolean` | `false` | 浮层或面板的受控打开状态。 |
| `loading` | `boolean` | `false` | 异步处理中状态；阻止重复操作。 |
| `closable` | `boolean` | `—` | 是否提供明确关闭入口。 |
| `footer` | `ReactNode | slot` | `—` | 底部操作区。 |

## 变体、语义、尺寸与状态

### Variants

- `basic`
- `confirm`
- `danger`
- `warning`
- `success`

### Tones

- `neutral`
- `danger`
- `warning`
- `success`

### Sizes

- `sm`
- `md`
- `lg`
- `xl`

### States

- `open`
- `submitting`
- `without-close`
- `danger-confirm`
- `success`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

桌面端按规范尺寸展示；窄屏时允许内容换行或纵向排列，交互目标不小于 44px。

## 可访问性

必须提供可见 focus-visible、键盘操作和不依赖颜色的状态表达。

## 示例要求

- 基础示例：Modal 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Modal 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcModal } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Modal`。
- 属性优先按 Props、Variants、Tones、Sizes、States 拆分，不把业务色彩和组件层级混在同一个属性里。
- 仅创建本组件适用的状态，具体以本页 States 为准，不机械复制无关状态。
- 使用 Auto Layout、变量绑定和标准 Variant Property；浮层必须提供静态打开态。

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
| `--z-modal` | Z-index Token |
| `--neutral-600` | 颜色 Token |
