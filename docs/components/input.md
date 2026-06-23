# 输入框 Input

> 用于单行文本录入，覆盖聚焦、错误、禁用、只读、必填和帮助信息等后台常见状态。

- 规范页面：`/components/input`
- React 源码：`src/components/ui/Input.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcInput.vue`
- Figma 组件名：`Input`

- 分类：操作与输入
- 合同版本：`0.2.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于单行文本录入；搜索和筛选可在上下文明确时省略可见标签。

**避免：** 不要把 placeholder 当作唯一字段名称，也不要用禁用代替只读。

## 结构 Anatomy

- 标签
- 输入容器
- 前后缀
- 帮助或错误文字
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `string` | `md` | 组件尺寸，必须映射到组件尺寸 Token。 |
| `disabled` | `boolean` | `false` | 禁用状态；不可交互但仍保留上下文。 |
| `readOnly` | `boolean` | `—` | 只读状态；允许查看和复制但不可编辑。 |
| `error` | `boolean | string` | `—` | 错误状态或错误说明；不得只依赖颜色表达。 |
| `labelPosition` | `'top' | 'left'` | `—` | 标签布局；移动端统一回退为 top。 |
| `labelWidth` | `number | string` | `—` | 左右布局时的标签宽度。 |
| `prefix` | `ReactNode | slot` | `—` | 输入内容前方的图标或文本前缀。 |
| `suffix` | `ReactNode | slot` | `—` | 输入内容后方的图标、单位或操作。 |
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

桌面端使用 28/32/36px 三档高度；小于 768px 时统一至少 44px，label-left 回退为上下结构。

## 可访问性

正式录入字段必须有可见 label；无可见标签的搜索或筛选必须提供 aria-label；错误状态使用 aria-invalid 并关联文字说明。

## 示例要求

- 基础示例：Input 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Input 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcInput } from "@xincailiao/vue-ui";
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
