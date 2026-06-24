# 菜单标签页 Tabs

> 用于在同一区域切换平级内容，适合详情分区、数据视图和配置面板。

- 规范页面：`/components/tabs`
- React 源码：`src/components/ui/Tabs.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcTabs.vue`
- Figma 组件名：`Tabs`

- 分类：导航与组织
- 合同版本：`0.2.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于同一上下文中的并列视图切换，切换后不改变任务层级。

**避免：** 不要用标签页代替步骤流程，也不要嵌套多层标签页。

## 结构 Anatomy

- 标签列表
- 激活指示
- 可选数量或状态
- 内容面板
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `array` | `—` | 组件条目数据。 |
| `value` | `string` | `—` | 当前受控值。 |
| `defaultValue` | `string` | `—` | 默认值。 |
| `onValueChange` | `function` | `—` | 受控值变化回调。 |
| `variant` | `string` | `default` | 组件的结构或视觉层级；不得承载业务颜色语义。 |
| `size` | `string` | `md` | 组件尺寸，必须映射到组件尺寸 Token。 |

## 变体、语义、尺寸与状态

### Variants

- `line`
- `card`
- `segment`

### Tones

- `neutral`
- `product`

### Sizes

- `sm`
- `md`
- `lg`

### States

- `default`
- `active`
- `hover`
- `disabled`
- `with-icon`
- `with-badge`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

桌面端按规范尺寸展示；窄屏时允许内容换行或纵向排列，交互目标不小于 44px。

## 可访问性

必须提供可见 focus-visible、键盘操作和不依赖颜色的状态表达。

## 示例要求

- 基础示例：Tabs 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Tabs 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcTabs } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Tabs`。
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
