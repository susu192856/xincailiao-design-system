# 输入框 Input / Textarea

> 输入框规范页统一说明单行 Input 与多行 Textarea，覆盖结构、尺寸、前后缀、聚焦、错误、禁用、只读、必填和帮助信息。

- 规范页面：`/components/input`
- React 源码：`src/components/ui/Input.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcInput.vue`
- Figma 组件名：`Input`

Textarea 的规范示例位于本页 `#textarea` 章节；组件源码与合同仍独立维护。

- 分类：操作与输入
- 合同版本：`0.2.1`
- 规范状态：稳定

## 定位与边界

**适用：** 用于单行文本录入；数据空间、参数面板等高密度桌面配置页默认使用左右标签，搜索和筛选可在上下文明确时省略可见标签。

**避免：** 不要把 placeholder 当作唯一字段名称，也不要用禁用代替只读。

## 结构 Anatomy

- 标签
- 输入容器
- 占位文字
- 前后缀
- 帮助或错误文字
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | `string` | `—` | 可见字段名称；正式录入场景必须提供。 |
| `placeholder` | `string` | `—` | 格式、示例或动作提示，不替代 label。 |
| `size` | `string` | `md` | 组件尺寸，必须映射到组件尺寸 Token。 |
| `disabled` | `boolean` | `false` | 禁用状态；不可交互但仍保留上下文。 |
| `readOnly` | `boolean` | `—` | 只读状态；允许查看和复制但不可编辑。 |
| `error` | `string` | `—` | 错误说明，同时驱动错误边框和 aria-invalid。 |
| `loading` | `boolean` | `false` | 异步校验中；输入框只读并显示旋转器替代 suffix。 |
| `labelPosition` | `'top' \| 'left'` | `top` | 标签布局；移动端统一回退为 top。 |
| `labelWidth` | `number \| string` | `96` | 左右布局时的标签宽度，推荐 96–120px。 |
| `prefix` | `ReactNode \| slot` | `—` | 前置图标或短文字，例如搜索图标、货币符号。 |
| `suffix` | `ReactNode \| slot` | `—` | 后置图标、单位或短标签，例如状态图标、MPa。 |
| `prefixAddon` | `ReactNode \| slot` | `—` | 与输入框共享边框的可交互前置控件；用于区号、币种选择。 |
| `suffixAddon` | `ReactNode \| slot` | `—` | 与输入框共享边框的可交互后置控件；用于可切换单位。 |
| `showCount` | `boolean` | `false` | 在控件内部右侧显示字符计数，建议与 maxLength 配合。 |
| `helperText` | `string` | `—` | 字段下方的帮助或校验说明。 |
| `required` | `boolean` | `—` | 必填标记；校验仍由表单逻辑负责。 |

## 变体、语义、尺寸与状态

### Variants

- `default`
- `with-prefix`
- `with-suffix`

### Tones

- 无

### Sizes

- `sm`
- `md`
- `lg`

### States

- `default`
- `hover`
- `focus`
- `error`
- `disabled`
- `readOnly`
- `required`
- `label-left`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

桌面端使用 28/32/36px 三档高度；小于 768px 时统一至少 44px，label-left 回退为上下结构。标签使用 14px Regular 与 text-secondary；Hover 与 Focus 均为 neutral-900 单边框，不叠加额外黑色外描边。

## 可访问性

正式录入字段必须有可见 label；无可见标签的搜索或筛选必须提供 aria-label；错误状态使用 aria-invalid 并关联文字说明。

## 内容规范

标签使用业务名词，placeholder 只描述格式或示例；单位放在 suffix，不写入用户输入值。

## 示例要求

- 基础示例：Input 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Input 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Textarea 扩展合同

Textarea 用于备注、原因、说明等需要换行和上下文的多行纯文本，与 Input 共用标签、提示、状态和可访问性规则。

- 规范章节：`/components/input#textarea`
- React 源码：`src/components/ui/Textarea.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcTextarea.vue`
- Figma 组件名：`Textarea`
- Small / Medium / Large 最小高度：80 / 96 / 120px
- 可选属性：`rows`、`maxLength`、`showCount`、`labelPosition`、`labelWidth`
- 高密度桌面配置页可使用左右标签；窄屏自动回退为上下结构。
- 不用于短名称、编号和单值参数，也不替代富文本、代码或结构化配置编辑器。

## Vue 3 引用示例

```ts
import { XcInput } from "@xincailiao/vue-ui";
import { XcTextarea } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Input`。
- 属性优先按 Props、Variants、Tones、Sizes、States 拆分，不把业务色彩和组件层级混在同一个属性里。
- 仅创建本组件适用的状态，具体以本页 States 为准，不机械复制无关状态。
- 使用 Auto Layout、变量绑定和标准 Variant Property；浮层必须提供静态打开态。

## 依赖 Token

组件使用的设计变量（CSS Custom Properties）：

| Token | 来源 |
|-------|------|
| `--radius-sm` | 圆角 Token |
| `--field-padding-x-sm` | 字段间距 Token |
| `--field-padding-x-md` | 字段间距 Token |
| `--field-padding-x-lg` | 字段间距 Token |
| `--field-border-default` | 字段边框 Token |
| `--field-border-hover` | 字段边框 Token |
| `--field-border-focus` | 字段边框 Token |
| `--field-border-error` | 字段边框 Token |
| `--field-bg-disabled` | 字段背景 Token |
| `--field-bg-readonly` | 字段背景 Token |
| `--control-height-sm` | 组件尺寸 Token |
| `--control-height-md` | 组件尺寸 Token |
| `--control-height-lg` | 组件尺寸 Token |
| `--text-primary` | 文本语义 Token |
| `--text-secondary` | 文本语义 Token |
| `--text-tertiary` | 文本语义 Token |
| `--text-disabled` | 文本语义 Token |
| `--error-text` | 语义色 Token |
| `--brand-600` | 品牌色 Token |
| `--neutral-400` | 颜色 Token (placeholder) |
| `--neutral-500` | 颜色 Token (禁用文本) |
| `--neutral-300` | 颜色 Token (默认边框) |
| `--neutral-900` | 颜色 Token (hover/focus 边框) |
| `--neutral-100` | 颜色 Token (禁用背景) |
| `--neutral-50` | 颜色 Token (只读背景) |
| `--focus-ring-color` | 交互 Token |
