# 标签 Tag

> 用于分类、状态和轻量标记，区分中性、产品、品牌和语义反馈。

- 规范页面：`/components/tag`
- React 源码：`src/components/ui/Tag.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcTag.vue`
- Figma 组件名：`Tag`

- 分类：数据与内容
- 合同版本：`0.2.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于分类、属性和轻量状态展示；语义色必须与状态含义一致。

**避免：** 不要把 Tag 当按钮，也不要用品牌红表达错误或危险状态。

## 结构 Anatomy

- 可选状态点或图标
- 标签文字
- 可选关闭入口
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `string` | `default` | 组件的结构或视觉层级；不得承载业务颜色语义。 |
| `tone` | `string` | `neutral` | 组件的操作或业务颜色语义；Button 中 task 推进任务，product 调用产品能力。 |
| `size` | `string` | `md` | 组件尺寸，必须映射到组件尺寸 Token。 |
| `disabled` | `boolean` | `false` | 禁用状态；不可交互但仍保留上下文。 |
| `closable` | `boolean` | `—` | 是否提供明确关闭入口。 |
| `icon` | `ReactNode | slot` | `—` | 图标插槽；遵循 Icon 规范。 |
| `dot` | `boolean` | `—` | 仅显示状态点。 |

## 变体、语义、尺寸与状态

### Variants

- `soft`
- `outline`
- `solid`

### Tones

- `neutral`
- `product`
- `brand`
- `danger`
- `warning`
- `success`
- `info`
- `teal`
- `violet`
- `slate`
- `cyan`

### Sizes

- `sm`
- `md`

### States

- `default`
- `disabled`
- `closable`
- `with-icon`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

桌面端按规范尺寸展示；窄屏时允许内容换行或纵向排列，交互目标不小于 44px。

## 可访问性

必须提供可见 focus-visible、键盘操作和不依赖颜色的状态表达。

## 内容规范

文字优先名词或短状态，保持单行；同一组使用一致的语法和语义。

## 示例要求

- 基础示例：Tag 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Tag 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcTag } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Tag`。
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
