# Chart Chart

> 用于新材道设计系统中的标准组件场景。

- 规范页面：`/components/chart`
- React 源码：`src/components/ui/Chart.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcChart.vue`
- Figma 组件名：`Chart`

- 分类：数据与内容
- 合同版本：`0.5.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于展示趋势、比较、构成、分布或偏离；高频图表的浅色视觉配方以 DBS 01 / 05 / 06 / 07 / 08 页面中的 Examples 画板为依据。

**避免：** 不要用近似色替换 DBS Examples 配方，不要混入 Dark Mode Examples；不要仅依赖颜色表达数据，不要截断柱状图零基线。

## 结构 Anatomy

- 标题与口径说明
- 局部操作区
- 图例
- 绘图区
- 工具提示或选中明细
- 可选等价数据表
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `chartType` | `string` | `—` | 图表类型，决定数据的视觉编码。 |
| `title` | `ReactNode | string` | `—` | 组件标题。 |
| `description` | `ReactNode | string` | `—` | 辅助说明。 |
| `legendItems` | `array` | `—` | 图例条目集合。 |
| `colors` | `string[]` | `—` | 图表数据系列颜色。 |
| `data` | `array` | `—` | 组件数据源。 |
| `size` | `string` | `md` | 组件尺寸，必须映射到组件尺寸 Token。 |
| `showTable` | `boolean` | `—` | 是否同时提供可访问的数据表格。 |
| `empty` | `boolean` | `—` | 是否展示空数据状态。 |
| `loading` | `boolean` | `false` | 异步处理中状态；阻止重复操作。 |
| `state` | `'default' | 'hovered' | 'selected'` | `—` | 图表交互状态。 |
| `edgeCase` | `'none' | 'low-value' | 'no-data' | 'new-data' | 'partially-unavailable'` | `—` | DBS 图表边界状态。 |
| `trendLine` | `boolean` | `—` | 显示 DBS 趋势线或预算线。 |
| `benchmarkPoints` | `boolean` | `—` | 显示 DBS 基准点。 |
| `dots` | `boolean` | `—` | 显示 8px 数据点。 |
| `smoothLine` | `boolean` | `—` | 使用平滑曲线，不得制造不存在的峰谷。 |
| `ariaLabel` | `string` | `—` | 图表或控件的可访问名称。 |

## 变体、语义、尺寸与状态

### Variants

- `line`
- `multi-line`
- `area`
- `stacked-area`
- `bar`
- `grouped-bar`
- `stacked-bar`
- `horizontal-bar`
- `bidirectional-bar`
- `pie`
- `donut`
- `semi-donut`
- `waterfall`
- `histogram`
- `candlestick`
- `heatmap`

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
- `hovered`
- `selected`
- `low-value`
- `no-data`
- `new-data`
- `partially-unavailable`
- `trend-line`
- `benchmark-points`
- `dots`
- `smooth-line`
- `empty`
- `loading`
- `with-table`
- `with-legend`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

桌面端悬浮整列或切片；窄屏改为点击选中并在图下展示明细，复杂绘图区仅允许容器内部滚动。

## 可访问性

图表具有可见标题、键盘可聚焦数据目标和等价数据表；工具提示内容包含名称、数值与单位。

## 内容规范

标题说明业务问题，副标题说明口径、时间与筛选；图例名称、单位、空值和本地化格式必须明确。

## 示例要求

- 基础示例：Chart 默认结构与尺寸
- 业务示例：柱状图五类、饼图三类和曲线图四类高频 Variant 的 DBS 浅色真实业务场景
- 边界示例：悬停、低值、无数据、缺失数据、趋势、基准点、数据点、骨架屏或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcChart } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Chart`。
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
