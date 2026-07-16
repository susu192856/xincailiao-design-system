# DatePicker DatePicker

> 用于新材道设计系统中的标准组件场景。

- 规范页面：`/components/date-picker`
- React 源码：`src/components/ui/DatePicker.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcDatePicker.vue`
- Figma 组件名：`Date Picker`

- 分类：操作与输入
- 合同版本：`0.2.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于单日期、起止日期和日期时间录入；先判断单点或范围，再判断日期精度或分钟精度。TimePicker 仅作为无日期语义的特例。

**避免：** 不要用两个独立日期字段代替范围模式，也不要把日期和时间拆成互不关联的字段；不要把 TimePicker 当成日期时间录入的默认方案。

## 结构 Anatomy

- 标签
- 日期输入容器
- 日历图标
- 日历或时间面板
- 辅助或错误文字
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | `ReactNode | string` | `—` | 组件可见标签。 |
| `helperText` | `string` | `—` | 字段下方的帮助或校验说明。 |
| `error` | `boolean | string` | `—` | 错误状态或错误说明；不得只依赖颜色表达。 |
| `size` | `string` | `md` | 组件尺寸，必须映射到组件尺寸 Token。 |
| `value` | `string` | `—` | 当前受控值。 |
| `defaultValue` | `string` | `—` | 默认值。 |
| `onChange` | `function` | `—` | 值或状态变化回调。 |
| `range` | `boolean` | `—` | 启用起止范围选择模式。 |
| `rangeValue` | `[string, string]` | `—` | 受控的起止范围值。 |
| `defaultRangeValue` | `[string, string]` | `—` | 非受控的起止范围初始值。 |
| `onRangeChange` | `(value: [string, string]) => void` | `—` | 范围确认后的变化回调。 |
| `showTime` | `boolean` | `—` | 在日期面板中启用时间选择。 |
| `open` | `boolean` | `false` | 浮层或面板的受控打开状态。 |
| `defaultOpen` | `boolean` | `—` | 非受控浮层或面板的初始打开状态。 |
| `onOpenChange` | `(open: boolean) => void` | `—` | 浮层或面板开合变化回调。 |
| `disabled` | `boolean` | `false` | 禁用状态；不可交互但仍保留上下文。 |
| `min` | `string | number` | `—` | 允许选择或输入的最小值。 |
| `max` | `number` | `—` | 徽标最大显示数字。 |
| `labelPosition` | `'top' | 'left'` | `—` | 标签布局；移动端统一回退为 top。 |
| `labelWidth` | `number | string` | `—` | 左右布局时的标签宽度。 |
| `required` | `boolean` | `—` | 必填标记；校验仍由表单逻辑负责。 |

## 变体、语义、尺寸与状态

### Variants

- `default`
- `range`
- `date-time`
- `range-time`

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

桌面端使用 28/32/36px 三档高度；单日期 280–360px，范围至少 320px，日期时间单项至少 340px、范围至少 480px；窄容器改用上下布局或分步选择。

## 可访问性

必须有可见标签或 aria-label；支持 Tab、Escape 和手动输入；图标与清除按钮提供独立可访问名称。

## 内容规范

日期使用 YYYY-MM-DD，日期时间使用 YYYY-MM-DD HH:mm；标签使用业务名词。

## 示例要求

- 基础示例：Date Picker 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Date Picker 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
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
