# 表格 Table

> 用于承载高密度结构化数据，覆盖筛选、选择、加载、空状态、错误和分页组合。

- 规范页面：`/components/table`
- React 源码：`src/components/ui/Table.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcTable.vue`
- Figma 组件名：`Table`

- 分类：数据与内容
- 合同版本：`0.3.1`
- 规范状态：稳定

## 定位与边界

**适用：** 用于高密度结构化数据；通栏型为默认，格子型仅用于行列关系明确的参数矩阵；文本、日期时间和操作左对齐，短枚举居中，可比较数字右对齐。

**避免：** 不要强行压缩大量列；优先保留列宽并允许横向滚动。

## 结构 Anatomy

- 筛选/工具栏
- 表头
- 数据行
- 固定表头/列
- 展开内容行
- 空态/加载态
- 分页
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `density` | `'compact' | 'standard' | 'comfortable'` | `—` | 数据密度。 |
| `variant` | `'line' | 'grid'` | `line` | 表格分隔形式；line 为默认通栏型，grid 为逐格对照型。 |
| `selected` | `boolean` | `—` | 表格行或可交互容器的选中状态。 |
| `disabled` | `boolean` | `false` | 禁用状态；不可交互但仍保留上下文。 |
| `align` | `'left' | 'center' | 'right'` | `—` | 内容对齐方式。 |
| `sticky` | `'left' | 'right' | 'top' | 'bottom'` | `—` | 固定表头、数据行或单元格到滚动容器边缘。 |
| `maxHeight` | `number | string` | `—` | 表格容器最大高度；超出后启用纵向滚动。 |
| `sortable` | `boolean` | `false` | 表头是否提供键盘可操作的排序入口。 |
| `sortDirection` | `'asc' | 'desc' | null` | `null` | 当前排序方向，并同步映射到 aria-sort。 |
| `onSort` | `(direction) => void` | `—` | 排序方向变化回调。 |
| `TableEmpty` | `React component` | `—` | 表格空状态辅助组件。 |
| `TableSkeletonRows` | `React component` | `—` | 表格加载骨架辅助组件。 |

## 变体、语义、尺寸与状态

### Variants

- `line`
- `grid`
- `selectable`
- `with-toolbar`
- `with-pagination`
- `wide-scroll`
- `sticky-header-columns`
- `expandable`

### Tones

- `neutral`
- `product`
- `danger`
- `warning`
- `success`

### Sizes

- `compact`
- `standard`
- `comfortable`

### States

- `default`
- `hover-row`
- `selected-row`
- `loading`
- `empty`
- `error`
- `no-permission`
- `partial-selected`
- `overflow`
- `expanded-row`
- `sorted-ascending`
- `sorted-descending`
- `filtered`


## 使用指南

- 表格必须优先覆盖后台高密度场景：筛选、排序、选择、空状态、分页、加载和权限受限。
- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

宽表格只在 TableContainer 内横向滚动；长表格设置 maxHeight 后纵向滚动并固定表头。固定首列与操作列必须使用实体背景和轻量内侧阴影提示边界；窄屏页面本身不得产生横向溢出。

## 可访问性

排序使用可聚焦按钮并通过 aria-sort 表达方向；选择、展开和图标操作必须提供可访问名称，状态不得只依赖颜色。

## 交互

筛选控件放在表格上方，表头保持字段标签；仅明确可比较的列增加排序。展开内容紧邻所属数据行，复杂详情至少使用三行或结构化区域呈现。

- 1 个操作：直接显示高频文字操作。
- 2 个操作：显示两个短文字操作，按使用频率排序。
- 3 个及以上：存在明确主操作时保留一个最高频文字操作，其余收入“更多”菜单；没有明确主操作时只显示“更多”。
- “更多”菜单使用文字项，危险操作与普通操作分组，并在执行前确认。
- 无文字图标仅用于“更多”等认知稳定的动作，并提供 Tooltip 与可访问名称；危险操作不得只用图标表达。

## 内容规范

通栏型与格子型共用同一套语义对齐规则：名称、描述、日期时间、编号和操作左对齐；状态、布尔值和短枚举居中；数量、金额、百分比等可比较数值右对齐。格子型只通过纵横分隔强化逐格核对，不改变内容方向。

表格内的日期、时间、编号及业务数值统一使用正文数字字体，不使用 `font-data` 或等宽代码字体；可比较数值统一小数精度。缺失值显示“—”。长文本、空值、截断、换行和本地化边界必须定义。

- 表格正文（包括名称、日期、数值和状态文字）统一使用中性色 800 与常规字重，不主动加粗名称。
- 表头使用中性色 600 与 Semibold；状态语义仅由前置圆点表达，操作列按 Button 规范使用操作色。

- 默认单行显示，列宽不足时省略，并通过 Tooltip、详情或展开行提供全文。
- 备注、摘要等辅助判断内容最多显示两行。
- 仅大行高、低频阅读且必须直接阅读全文的表格允许完整换行。
- 表头始终单行；字段名过长时缩短名称或增加列宽。

## 行高

- 小：`compact`，36px，用于高频后台列表、批量处理和多字段表格。
- 中：`standard`，44px，用于常规管理页、默认触控场景和混合图文。
- 大：`comfortable`，52px，用于详情对比、审计摘要和低频阅读。

## 列间距

表格不使用 `gap` 控制列与列之间的距离。列距由相邻单元格的右内边距与左内边距共同形成，并与 `density` 保持一致：

- `compact`：单元格水平内边距 12px，相邻列内容最小间距 24px。
- `standard`：单元格水平内边距 16px，相邻列内容间距 32px。
- `comfortable`：单元格水平内边距 20px，相邻列内容间距 40px。

不得将相邻列内容压缩到 24px 以下。空间不足时优先调整列宽、缩短字段名或隐藏低优先级列；必须保留的多列在 `TableContainer` 内启用横向滚动，不通过减少单元格内边距强行塞入。

## 示例要求

- 基础示例：Table 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Table 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcTable } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Table`。
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
