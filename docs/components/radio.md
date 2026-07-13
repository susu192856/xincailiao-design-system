# 单选框 Radio

> 用于单选决策，适合少量互斥选项和配置项。

- 规范页面：`/components/radio`
- React 源码：`src/components/ui/Radio.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcRadio.vue`
- Figma 组件名：`Radio`

- 分类：操作与输入
- 合同版本：`0.2.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于从少量互斥选项中选择一个结果，尤其适合需要直接比较后果的策略。

**避免：** 不要用于多项选择；选项超过五个或无需同时比较时优先 Select。

## 结构 Anatomy

- 单选控件
- 选项标签
- 可选说明
- 错误或帮助信息
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `checked` | `boolean` | `false` | 选择控件的选中状态。 |
| `disabled` | `boolean` | `false` | 禁用状态；不可交互但仍保留上下文。 |
| `error` | `boolean | string` | `—` | 错误状态或错误说明；不得只依赖颜色表达。 |
| `helperText` | `string` | `—` | 字段下方的帮助或校验说明。 |

## 变体、语义、尺寸与状态

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

## 响应式

桌面端按规范尺寸展示；窄屏时允许内容换行或纵向排列，交互目标不小于 44px。

## 可访问性

必须提供可见 focus-visible、键盘操作和不依赖颜色的状态表达。

## 内容规范

选项文案保持同一语法结构，高风险选项直接说明影响与限制。

## 示例要求

- 基础示例：Radio 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Radio 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcRadio } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Radio`。
- 属性优先按 Props、Variants、Tones、Sizes、States 拆分，不把业务色彩和组件层级混在同一个属性里。
- 仅创建本组件适用的状态，具体以本页 States 为准，不机械复制无关状态。
- 使用 Auto Layout、变量绑定和标准 Variant Property；浮层必须提供静态打开态。

## 依赖 Token

组件使用的设计变量（CSS Custom Properties）：

| Token | 来源 |
|-------|------|
| `--radius-sm` | 圆角 Token |
| `--product-blue-600` | 颜色 Token（按下） |
| `--product-blue-500` | 颜色 Token（选中 / 悬停） |
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
