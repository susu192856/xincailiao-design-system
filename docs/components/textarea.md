# 文本域 Textarea

> 用于多行文本录入，适合备注、说明、审核意见和长文本表单。

- 规范页面：`/components/input#textarea`（旧地址 `/components/textarea` 自动跳转）
- React 源码：`src/components/ui/Textarea.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcTextarea.vue`
- Figma 组件名：`Textarea`

- 分类：操作与输入
- 合同版本：`0.2.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于备注、原因、说明等需要换行和上下文的多行纯文本；与 Input 共用标签、提示、状态和可访问性规则。

**避免：** 不要用于短名称、编号和单值参数，也不要替代富文本、代码或结构化配置编辑器。

## 结构 Anatomy

- 字段容器
- 标签文字
- 多行输入容器
- 占位文字
- 帮助或错误文字
- 可选字符计数
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `string` | `md` | 组件尺寸，必须映射到组件尺寸 Token。 |
| `disabled` | `boolean` | `false` | 禁用状态；不可交互但仍保留上下文。 |
| `readOnly` | `boolean` | `—` | 只读状态；允许查看和复制但不可编辑。 |
| `error` | `boolean | string` | `—` | 错误状态或错误说明；不得只依赖颜色表达。 |
| `helperText` | `string` | `—` | 字段下方的帮助或校验说明。 |
| `required` | `boolean` | `—` | 必填标记；校验仍由表单逻辑负责。 |
| `rows` | `number` | `—` | 文本域初始可见行数，仍受尺寸最小高度约束。 |
| `showCount` | `boolean` | `—` | 是否显示文本长度计数。 |
| `maxLength` | `number` | `—` | 允许输入的最大字符数。 |

## 变体、语义、尺寸与状态

### Variants

- `default`
- `with-counter`

### Tones

- `neutral`
- `danger`

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


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

Small / Medium / Large 最小高度分别为 80 / 96 / 120px；窄屏保持全宽并允许纵向缩放，不产生页面级横向溢出。

## 可访问性

正式录入字段提供可见 label；错误与帮助文字通过 aria-describedby 关联；提供 focus-visible，状态不只依赖颜色。

## 内容规范

标签说明字段语义，placeholder 提供格式或写作提示；限制长度时组合使用 maxLength 与 showCount。

## 示例要求

- 基础示例：Textarea 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Textarea 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcTextarea } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Textarea`。
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
