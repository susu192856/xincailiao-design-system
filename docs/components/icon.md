# 图标 Icon

> 用于表达操作、导航、状态和装饰语义，来源优先遵循 Phosphor Icons，并保持统一线宽。

- 规范页面：`/components/icon`
- React 源码：`src/components/ui/Icon.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcIcon.vue`
- Figma 组件名：`Icon`

- 分类：操作与输入
- 合同版本：`0.2.0`
- 规范状态：稳定

## 定位与边界

**适用：** 系统功能图标统一使用 Phosphor；装饰图标仅用于官网展示、模块入口和空状态，不代替状态文字。

**避免：** 不要混用多套图标库，不要仅靠图标表达危险、成功或权限状态。

## 结构 Anatomy

- 固定尺寸容器
- Phosphor 图形或业务装饰图形
- 可选品牌红识别短线
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `string` | `md` | 组件尺寸，必须映射到组件尺寸 Token。 |
| `weight` | `IconWeight` | `—` | Phosphor 图标线条粗细，默认 regular。 |
| `tone` | `string` | `neutral` | 组件的操作或业务颜色语义；Button 中 task 推进任务，product 调用产品能力。 |
| `decorative` | `boolean` | `—` | 是否为无语义装饰图标。 |
| `disabled` | `boolean` | `false` | 禁用状态；不可交互但仍保留上下文。 |
| `label` | `ReactNode | string` | `—` | 组件可见标签。 |
| `redMark` | `boolean` | `—` | 是否显示品牌红识别短线；仅用于指定品牌图形。 |

## 变体、语义、尺寸与状态

### Variants

- `phosphor`
- `decorative`

### Tones

- `neutral`
- `muted`
- `product`
- `brand`
- `danger`
- `warning`
- `success`

### Sizes

- `12`
- `16`
- `20`
- `24`
- `32`
- `48`

### States

- `regular`
- `active`
- `disabled`
- `decorative`
- `red-mark`


## 使用指南

- 通用图标优先使用 Phosphor Icons regular 线性风格，装饰图标只小面积点缀。
- 状态图标使用 Phosphor fill 填充样式，采用 success、warning、error、product 的高亮实色色值与白色镂空，并始终配合状态文字。
- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

图标尺寸不随容器任意缩放；后台优先 16px/20px，移动端保持图形尺寸并由外层扩大触控区域。

## 可访问性

有语义图标使用 role=img 与可访问名称；装饰图标 aria-hidden；状态信息必须同时提供文字。

## 内容规范

非装饰图标需要 label；纯装饰图标使用 decorative 并从辅助技术隐藏。redMark 只控制品牌识别短线，不等同 decorative。

## 示例要求

- 基础示例：Icon 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Icon 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcIcon } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Icon`。
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
