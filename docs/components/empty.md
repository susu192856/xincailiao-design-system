# 空状态 Empty

> 用于无数据、无结果、无权限、错误和首次使用引导。

- 规范页面：`/components/empty`
- React 源码：`src/components/ui/Empty.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcEmpty.vue`
- Figma 组件名：`Empty`

- 分类：数据与内容
- 合同版本：`0.2.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于无数据、无结果、无权限、页面不存在、网络异常、首次使用和处理中等明确空白情境。

**避免：** 不要混用五类状态插图，不要用同一套“暂无数据”覆盖所有原因，也不要提供与恢复任务无关的操作。

## 结构 Anatomy

- 情境图形
- 状态标题
- 解释说明
- 可选主操作
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `string` | `default` | 组件的结构或视觉层级；不得承载业务颜色语义。 |
| `title` | `ReactNode | string` | `—` | 组件标题。 |
| `description` | `ReactNode | string` | `—` | 辅助说明。 |
| `action` | `ReactNode | slot` | `—` | 可选操作入口。 |

## 变体、语义、尺寸与状态

### Variants

- `noData`
- `noResult`
- `noPermission`
- `notFound`
- `network`
- `firstUse`
- `error`
- `processing`
- `disabled`

### Tones

- `neutral`
- `product`
- `danger`
- `warning`

### Sizes

- `sm`
- `md`
- `lg`

### States

- `default`
- `with-action`
- `disabled-action`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

桌面端按规范尺寸展示；窄屏时允许内容换行或纵向排列，交互目标不小于 44px。

## 可访问性

必须提供可见 focus-visible、键盘操作和不依赖颜色的状态表达。

## 内容规范

插图固定映射暂无数据、无结果、无权限、页面不存在和网络异常；标题说明发生了什么，描述解释原因，操作给出下一步。

## 示例要求

- 基础示例：Empty 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Empty 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcEmpty } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Empty`。
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
