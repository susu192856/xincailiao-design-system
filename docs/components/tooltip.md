# 文字提示 Tooltip

> 用于解释图标、字段或被截断内容，只承载短文本，不打断当前操作。

- 规范页面：`/components/tooltip`
- React 源码：`src/components/ui/Tooltip.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcTooltip.vue`
- Figma 组件名：`Tooltip`

- 分类：反馈与浮层
- 合同版本：`0.2.0`
- 规范状态：完善中

## 定位与边界

**适用：** 用于Tooltip对应的标准场景，优先复用组件而不是在页面内重新绘制。

**避免：** 不要绕过 Token、组件合同或可访问性要求制作局部特例。

## 结构 Anatomy

- 根容器
- 主要内容
- 可选辅助内容
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `content` | `ReactNode | slot` | `—` | 组件主体内容。 |
| `placement` | `'top' | 'right' | 'bottom' | 'left'` | `top / bottom` | 浮层或抽屉位置。 |
| `open` | `boolean` | `false` | 浮层或面板的受控打开状态。 |

## 变体、语义、尺寸与状态

### Variants

- `short-text`
- `long-text`
- `disabled-trigger`

### Tones

- `neutral`

### Sizes

- `sm`

### States

- `hidden`
- `visible`
- `top`
- `right`
- `bottom`
- `left`
- `focus`


## 使用指南

- 只放短文本，不放按钮、链接、表单和复杂说明；需要操作时使用 Popover。
- 触发方式必须同时支持 hover 与 keyboard focus。
- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

桌面端按规范尺寸展示；窄屏时允许内容换行或纵向排列，交互目标不小于 44px。

## 可访问性

必须提供可见 focus-visible、键盘操作和不依赖颜色的状态表达。

## 示例要求

- 基础示例：Tooltip 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Tooltip 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcTooltip } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Tooltip`。
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
| `--z-tooltip` | Z-index Token |
| `--shadow-md` | 阴影 Token |
| `--shadow-lg` | 阴影 Token |
