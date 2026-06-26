# DatePicker DatePicker

> 用于新材道设计系统中的标准组件场景。

- 规范页面：`/components/datepicker`
- React 源码：`src/components/ui/DatePicker.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcDatePicker.vue`
- Figma 组件名：`Date Picker`

- 分类：操作与输入
- 合同版本：`0.2.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于精确到天的日期录入，适用于表单、筛选、数据查询等场景。不应用于时间选择或日期范围选择。

**避免：** 不要用在需要日期范围、时间精度或多选日期的场景。不要省略标签，除非筛选区上下文已明确。

## 结构 Anatomy

- 标签
- 日期输入容器
- 日历图标
- 清除按钮
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | `string` | `—` | 字段标签文字。 |
| `helperText` | `string` | `—` | 字段下方的帮助说明。 |
| `error` | `string` | `—` | 错误提示；覆盖 helperText 显示。 |
| `size` | `'sm' | 'md' | 'lg'` | `md` | 组件尺寸，映射到控件高度 Token。 |
| `value` | `string` | `—` | 当前日期值 YYYY-MM-DD 格式。 |
| `clearable` | `boolean` | `—` | 是否显示清除按钮。 |
| `disabled` | `boolean` | `false` | 禁用状态。 |
| `min` | `string` | `—` | 最小可选日期 YYYY-MM-DD。 |
| `max` | `string` | `—` | 最大可选日期 YYYY-MM-DD。 |

## 变体、语义、尺寸与状态

### Variants

- `default`
- `with-clear`

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

桌面端使用 28/32/36px 三档高度；移动端触发系统原生日期选择器。

## 可访问性

必须有可见标签或 aria-label；通过 min/max 限制可选范围；键盘支持 Tab 进入和手动输入。

## 内容规范

日期格式使用 YYYY-MM-DD；标签使用业务名词。

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
