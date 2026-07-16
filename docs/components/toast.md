# 消息反馈 Toast

> 用于轻量操作反馈，不阻断当前任务。

- 规范页面：`/components/toast`
- React 源码：`src/components/ui/Toast.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcToast.vue`
- Figma 组件名：`Toast`

- 分类：反馈与浮层
- 合同版本：`0.2.0`
- 规范状态：稳定

## 定位与边界

**适用：** 消息反馈组件族包含顶部轻提示、通知提示和页面提示，按影响范围与阅读时长选择形态。

**避免：** 不要用消息反馈承载必须确认的信息，也不要把页面内提示误当作全局浮层。

## 结构 Anatomy

- 语义图标
- 标题
- 可选说明
- 可选操作
- 关闭入口
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `presentation` | `string` | `—` | 反馈展示形态：顶部轻提示、通知提示或页面提示。 |
| `tone` | `string` | `neutral` | 组件的操作或业务颜色语义；Button 中 task 推进任务，product 调用产品能力。 |
| `title` | `ReactNode | string` | `—` | 组件标题。 |
| `description` | `ReactNode | string` | `—` | 辅助说明。 |
| `action` | `ReactNode | slot` | `—` | 可选操作入口。 |
| `closable` | `boolean` | `—` | 是否提供明确关闭入口。 |
| `duration` | `number` | `—` | 提示持续时间，默认来自 Toast duration Token。 |
| `position` | `string` | `—` | 提示容器位置。 |

## 变体、语义、尺寸与状态

### Variants

- `toast`
- `notification`
- `alert`
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

## 响应式

桌面端按规范尺寸展示；窄屏时允许内容换行或纵向排列，交互目标不小于 44px。

## 可访问性

使用正确语义结构；图片或装饰内容必须提供合适的替代文本策略。

## 内容规范

标题直接说明结果，描述补充对象或恢复方法；错误消息避免只写“失败”。

## 示例要求

- 基础示例：三类消息反馈的默认结构与位置
- 业务示例：新材道后台或门户中的真实消息反馈场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcToast } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Toast`。
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
