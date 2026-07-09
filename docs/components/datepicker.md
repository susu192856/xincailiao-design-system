# DatePicker 日期选择

> 用于新材道设计系统中的标准组件场景。

- 规范页面：`/components/date-picker`
- React 源码：`src/components/ui/DatePicker.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcDatePicker.vue`
- Figma 组件名：`Date Picker`

- 分类：操作与输入
- 合同版本：`0.2.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于单日期、起止日期及需要精确到分钟的日期时间录入。先判断选择数量（单点 / 范围），再判断时间精度（日期 / 分钟）；时间选择是日期精度的扩展，只有完全没有日期语义时才单独使用 TimePicker。

**避免：** 不要用两个独立日期字段代替范围模式，也不要把日期和时间拆成互不关联的字段。不要把 TimePicker 当成日期时间录入的默认方案；不要省略标签，除非筛选区上下文已明确。

## 框架模型

| 模型 | 组件 | 典型场景 | 说明 |
|------|------|----------|------|
| 单点 × 日期精度 | `DatePicker` | 发布日期、到期日 | 一个字段记录一个自然日。 |
| 范围 × 日期精度 | `DatePicker range` | 查询区间、有效期 | 同一触发器完成起始和结束日期。 |
| 单点 × 分钟精度 | `DatePicker showTime` | 发布时间、预约时间 | 日期是主信息，时间补充到分钟。 |
| 范围 × 分钟精度 | `DatePicker range showTime` | 活动起止时间、可预约时段 | 每个端点都携带时间。 |
| 无日期 × 分钟精度 | `TimePicker` | 每日班次、固定提醒时间 | 仅作为无日期语义的特例。 |

## 结构 Anatomy

- 标签
- 日期输入容器
- 日历图标
- 日历或时间面板
- 辅助或错误文字
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | `string` | `—` | 字段标签文字。 |
| `helperText` | `string` | `—` | 字段下方的帮助说明。 |
| `error` | `string` | `—` | 错误提示；覆盖 helperText 显示。 |
| `size` | `'sm' | 'md' | 'lg'` | `md` | 组件尺寸，映射到控件高度 Token。 |
| `value` | `string` | `—` | 当前日期值 YYYY-MM-DD 格式。 |
| `defaultValue` | `string` | `—` | 非受控单日期初始值。 |
| `onChange` | `(value: string) => void` | `—` | 单日期值变化回调。 |
| `range` | `boolean` | `false` | 启用起止日期范围模式。 |
| `rangeValue / defaultRangeValue` | `[string, string]` | `—` | 受控或非受控的起止日期值。 |
| `onRangeChange` | `(value: [string, string]) => void` | `—` | 日期范围确认后的变化回调。 |
| `showTime` | `boolean` | `false` | 在日历面板中增加时分选择；值格式为 YYYY-MM-DD HH:mm。 |
| `open` | `boolean` | `—` | 受控面板开合状态。 |
| `defaultOpen` | `boolean` | `false` | 面板初始展开状态。 |
| `onOpenChange` | `(open: boolean) => void` | `—` | 面板开合变化回调。 |
| `disabled` | `boolean` | `false` | 禁用状态。 |
| `min` | `string` | `—` | 最小可选日期 YYYY-MM-DD。 |
| `max` | `string` | `—` | 最大可选日期 YYYY-MM-DD。 |
| `labelPosition` | `'top' | 'left'` | `top` | 标签布局；窄容器回退为上下结构。 |
| `labelWidth` | `number | string` | `96` | 左右布局标签宽度，推荐 88–120px。 |

## 变体、语义、尺寸与状态

### Variants

- `default`
- `range`
- `date-time`
- `range-time`
- `time-only`（无日期特例）

### Tones

- `neutral`

### Sizes

- `sm`
- `md`
- `lg`

### States

- `default`
- `selected`
- `disabled`
- `error`
- `range-limited`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

桌面端使用 28/32/36px 三档高度；移动端可触发系统原生日期选择器。单日期推荐 280–360px，范围不小于 320px；日期时间单项不小于 340px，日期时间范围不小于 480px。窄容器应改用上下布局或分步选择，不能挤压文字与图标。

## 可访问性

必须有可见标签或 aria-label；通过 min/max 限制可选范围；键盘支持 Tab、Escape 和手动输入；图标按钮与清除按钮提供独立可访问名称。

## 内容规范

日期格式使用 YYYY-MM-DD，日期时间使用 YYYY-MM-DD HH:mm；独立时间使用 HH:mm。标签使用业务名词，优先表达业务对象而不是控件类型。

## 确认规则

- 单日期：选择日期后立即完成，不显示确认按钮。
- 起止日期：按“起始日期 → 确认 → 结束日期 → 确认”完成，避免误触覆盖已选范围。
- 日期时间：日期与时间共同组成最终值，必须点击确认后写入。
- 独立时间：仅用于无日期语义的每日固定时间、班次或提醒，不承接日期时间录入。

## 示例要求

- 基础示例：DatePicker 默认结构与尺寸
- 业务示例：新材道后台筛选表单或详情页中的真实 DatePicker 场景
- 边界示例：禁用、错误、区间限制和移动端原生选择器
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcDatePicker } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Date Picker`。
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
