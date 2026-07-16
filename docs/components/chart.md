# Chart 图表

> 用于新材道设计系统中的标准组件场景。

- 规范页面：`/components/chart`
- React 源码：`src/components/ui/Chart.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcChart.vue`
- Figma 组件名：`Chart`

- 分类：数据与内容
- 合同版本：`0.3.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于在页面中展示数据可视化图表。先判断数据关系（趋势/比较/构成/分布/偏离），再选择图表类型和配色模型。高频规范优先覆盖柱状图、饼图和曲线图，每个图表必须回答一个明确业务问题。

**避免：** 不要把 10 个色系当作装饰色随机排列；不要用分类色表达连续强弱；环图不超过 5 个切片；折线图不超过 4 条系列；柱状图必须从零基线开始。

## 结构 Anatomy

- 标题区
- 副标题与口径说明
- 图例区
- 绘图区
- 坐标与网格
- 工具提示或选中明细
- 可选明细表
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `chartType` | `string` | `—` | 图表类型；决定绘图区渲染方式和默认交互。 |
| `title` | `string` | `—` | 图表标题，回答业务问题。 |
| `description` | `string` | `—` | 副标题说明口径、时间范围和样本量。 |
| `legendItems` | `array` | `—` | 图例项，每项含名称、颜色和形态。 |
| `colors` | `array` | `—` | 数据色组合，优先从 10 个数据色系中选取。 |
| `data` | `array` | `—` | 图表数据源。 |
| `size` | `'sm' | 'md' | 'lg'` | `md` | 图表容器尺寸。 |
| `showTable` | `boolean` | `—` | 是否在图表下方展示明细表。 |
| `empty` | `boolean` | `—` | 空数据状态。 |
| `loading` | `boolean` | `false` | 加载状态；保留标题并向辅助技术播报进度。 |
| `ariaLabel` | `string` | 由标题生成 | 绘图区的无障碍名称。 |

## 变体、语义、尺寸与状态

### Variants

- `line`
- `bar`
- `donut`
- `waterfall`
- `histogram`
- `area`
- `candlestick`
- `heatmap`
- `stacked-bar`
- `stacked-area`

### Tones

- `blue`
- `green`
- `purple`
- `amber`
- `red`
- `orange`
- `coral`
- `pink`
- `magenta`
- `indigo`

### Sizes

- `sm`
- `md`
- `lg`

### States

- `default`
- `hover`
- `selected`
- `empty`
- `loading`
- `with-table`
- `with-legend`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

桌面端图表容器按 12 / 8 / 4 栅格列宽提供大、中、小三档；移动端标题、操作、图例、图表和表格纵向堆叠。复杂绘图区和表格只允许容器内部横向滚动，不造成页面级溢出，也不通过缩小正文解决空间不足。

## 可访问性

图表必须有可见标题和坐标说明；数据目标支持键盘聚焦，名称、数值和单位通过可访问名称播报；状态信息不只用颜色表达；明细表提供等价数据而不是仅作为装饰性补充。

## 内容规范

标题回答业务问题；副标题说明口径、时间范围、样本量；坐标轴文字使用说明字号；明细表字段短而明确。

## 示例要求

- 基础示例：Chart 默认结构与尺寸
- 业务示例：可交互柱状图、饼图与曲线图，包含工具提示、选中明细和等价数据表
- 边界示例：空数据、加载、长标签、多系列溢出、移动端点击与内部滚动
- 错误示例：绕过组件、混用分类色和连续色、环图超过 5 切片、柱状图非零基线

## 开发实现说明

React `Chart` 与 Vue `XcChart` 共同负责标题、口径说明、操作区、图例、加载、空状态、绘图区和可选明细表的统一结构；具体图形通过渲染函数或默认插槽接入，并获得 `data`、`colors` 和 `chartType`。复杂图表在窄屏允许绘图区内部横向滚动，但不得造成页面级溢出。

## Figma 同步要求

- Figma 组件命名使用 `Chart`。
- 属性优先按图表类型（chartType）、颜色模型（colorFamily）、尺寸（size）、状态（state）和是否显示表格（showTable）拆分，不把业务色彩和组件层级混在同一个属性里。
- 仅创建本组件适用的状态，具体以本页 States 为准，不机械复制无关状态。
- 使用 Auto Layout、变量绑定和标准 Variant Property；必须提供默认、悬浮、选中、加载、空状态与带表格的静态验收画板。

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
