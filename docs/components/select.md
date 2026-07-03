# 选择器 Select

> 用于从固定范围中选择值，覆盖单选、多选、搜索式选择和日期选择。与输入框共用字段结构和状态 Token，但不承担自由文本录入。

- 规范页面：`/components/select`
- React 源码：`src/components/ui/Select.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcSelect.vue`
- Figma 组件名：`Select`

- 分类：操作与输入
- 合同版本：`0.2.1`
- 规范状态：稳定

## 定位与边界

**适用：** 固定枚举使用选择器；允许创建新值时改用 Input + 建议列表。搜索用于中等规模本地选项（<200 项）；远程实体需要业务层处理。

**避免：** 不要用选择器处理大量动态数据；不要让 placeholder 替代 label；不要只用红色边框表达错误。

## 结构 Anatomy

- 必填标识
- 标签文字
- 触发器
- 当前值 / 占位文字
- 展开图标
- 辅助或错误文字
- 选项面板

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | `string` | `—` | 可见字段名称；必须存在于正式录入场景。 |
| `placeholder` | `string` | `—` | 无选中值时的动作提示，不替代 label。 |
| `options` | `SelectOption[]` | `—` | 固定选项列表；每项包含 label、value 和可选 disabled。 |
| `size` | `sm \| md \| lg` | `md` | 桌面高度 28 / 32 / 36px，移动端至少 44px。 |
| `disabled` | `boolean` | `false` | 禁用状态；不可交互但仍保留上下文。 |
| `error` | `string` | `—` | 错误说明，同时驱动错误边框和 aria-invalid。 |
| `loading` | `boolean` | `false` | 异步校验中；锁定触发器并显示旋转器。 |
| `searchable` | `boolean` | `false` | 启用选项内搜索过滤。 |
| `multiple` | `boolean` | `false` | 启用多选与标签移除。 |
| `required` | `boolean` | `false` | 必选标记，由表单层驱动校验。 |
| `labelPosition` | `'top' \| 'left'` | `top` | 标签布局；主编辑区可用 left，窄容器自动回到 top。 |
| `labelWidth` | `number \| string` | `96` | 左右布局时的标签宽度，推荐 88–120px。 |
| `helperText` | `string` | `—` | 字段用途、格式或限制说明。 |
| `renderTag` | `(option, onRemove) => ReactNode` | `—` | 多选标签自定义渲染。 |
| `open` | `boolean` | `—` | 受控面板开合状态；规范展示可用它保持面板展开。 |
| `defaultOpen` | `boolean` | `false` | 面板初始展开状态；后续仍响应选择、点击外部和 Escape。 |
| `onOpenChange` | `(open: boolean) => void` | `—` | 面板开合变化回调；与 open 配合管理受控状态。 |

## 变体、语义、尺寸与状态

### Variants

- `single`
- `multiple`
- `searchable`

### Tones

- 无（Select 不设语义色变体，错误通过 state 表达）

### Sizes

- `sm`（28px，用于表格筛选和紧凑工具栏）
- `md`（32px，后台表单默认尺寸）
- `lg`（36px，低密度表单和弹窗）

### States

- `placeholder`（无选中值，显示提示文案）
- `selected`（已选中值，显示选项 label 或已选数量）
- `hover`（鼠标悬停，增强边框）
- `focus`（聚焦，键盘和鼠标均显示清晰焦点）
- `open`（面板展开，图标翻转，选项可交互）
- `error`（错误状态，红色边框 + 具体修正信息）
- `disabled`（禁用状态，不可交互但仍保留上下文）
- `loading`（异步校验中，锁定触发器并显示旋转器）

## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态和权限受限。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。
- 选项文本保持一行，过长时使用缩略 + 完整解释的辅助补全。

## 响应式

桌面端使用 28/32/36px 三档高度；小于 768px 时统一至少 44px，label-left 回退为上下结构。Select 选项面板跟随触发器宽度，限制在 180–480px，最多完整显示 6 行。日期范围触发器不小于 320px，单月面板推荐 320–420px；按“起始日期 → 确认 → 结束日期 → 确认”的顺序完成，不使用被挤压的双月面板。

## 可访问性

正式字段必须有可见 label；触发器使用 button + listbox 模式；错误状态使用 aria-invalid 并关联文字说明；键盘支持上下箭头、Enter 和 Escape。

## 内容规范

标签使用业务名词；placeholder 描述要选择什么（如"请选择材料类型"）；面板最多显示 6 行，第 7 项起仅选项区滚动。

## 示例要求

- 基础示例：Select 默认结构、尺寸与状态
- 业务示例：新材道后台中的材料类型选择、数据标签多选
- 边界示例：空选项、禁用项、加载、长选项文本、窄屏
- 错误示例：替换 Input 作为自由文本录入、只用红色边框表达错误

## Vue 3 引用示例

```ts
import { XcSelect } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Select`。
- 属性优先按 Props、Variants、Sizes、States 拆分，不把业务色彩和组件层级混在同一个属性里。
- 仅创建本组件适用的状态，具体以本页 States 为准，不机械复制无关状态。
- 使用 Auto Layout、变量绑定和标准 Variant Property；面板必须提供静态打开态。

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
| `--control-height-sm` | 组件尺寸 Token |
| `--control-height-md` | 组件尺寸 Token |
| `--control-height-lg` | 组件尺寸 Token |
| `--text-primary` | 文本语义 Token |
| `--text-secondary` | 文本语义 Token |
| `--text-tertiary` | 文本语义 Token |
| `--text-disabled` | 文本语义 Token |
| `--error-text` | 语义色 Token |
| `--brand-600` | 品牌色 Token |
| `--neutral-400` | 颜色 Token（placeholder） |
| `--neutral-300` | 颜色 Token（默认边框） |
| `--neutral-900` | 颜色 Token（hover/focus 边框） |
| `--neutral-100` | 颜色 Token（选中/禁用背景） |
| `--neutral-50` | 颜色 Token（Hover 背景） |
| `--focus-ring-color` | 交互 Token |
| `--shadow-lg` | 阴影 Token |
| `--z-dropdown` | 层级 Token |
| `--motion-duration-fast` | 动效 Token |
| `--type-caption-line-height` | 字体 Token |
| `--type-body-m-size` | 字体 Token |
