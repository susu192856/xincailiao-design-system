# 分页码 Pagination

> 用于长列表分页，适合表格、卡片列表和搜索结果。

- 规范页面：`/components/pagination`
- React 源码：`src/components/ui/Pagination.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcPagination.vue`
- Figma 组件名：`Pagination`

- 分类：数据与内容
- 合同版本：`0.3.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于将长列表分段浏览，并保持筛选、排序和选择上下文。

**避免：** 不要在数据量较少时显示分页，也不要在移动端强塞完整页码序列。

## 结构 Anatomy

- 上一页
- 页码范围
- 下一页
- 每页数量
- 快速跳转
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `page` | `number` | `—` | 当前页码。 |
| `total` | `number` | `—` | 总页数。 |
| `pageSize` | `number` | `—` | 每页数据条数。 |
| `disabled` | `boolean` | `false` | 禁用状态；不可交互但仍保留上下文。 |
| `compact` | `boolean` | `false` | 只显示上一页、当前页 / 总页数和下一页。 |
| `size` | `'sm' | 'md'` | `md` | 页码按钮尺寸。 |
| `totalItems` | `number` | `—` | 数据总条数。 |
| `showTotal` | `boolean` | `false` | 是否显示总条数。 |
| `showQuickJumper` | `boolean` | `false` | 是否显示页码快速跳转。 |
| `pageSizeOptions` | `number[]` | `—` | 可选的每页条数。 |

## 变体、语义、尺寸与状态

### Variants

- `short`
- `long`
- `compact`
- `with-jumper`
- `with-size-changer`

### Tones

- `neutral`
- `product`

### Sizes

- `sm`：28px，用于紧凑表格、窄工具栏和高密度后台页面。
- `md`：32px，用于常规列表、搜索结果和默认后台页面。

### States

- `default`
- `active`
- `hover`
- `disabled`
- `ellipsis`


## 使用指南

- 短分页：总页数不超过 7 页，直接显示全部页码。
- 长分页：总页数超过 7 页，显示首尾页、当前页邻近页与省略号。
- 紧凑分页：用于侧栏、移动端和其他明确受限的窄区域，仅显示上一页、当前页 / 总页数和下一页。
- 快速跳转只用于页数很多且用户通常已知目标页的桌面场景。
- 每页条数切换用于数据量较大且用户需要控制浏览密度的场景。
- 与表格组合时，分页作为 footer 与数据区共用一个外边框，通过顶部边框分隔；总数在左、分页在右，二者均保持单行。

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

分页内部禁止折行。分页可用宽度小于 480px 时，长分页自动切换为紧凑结构，并隐藏总数、快速跳转和每页条数等次要信息；紧凑结构的翻页按钮触控目标不小于 44px。

## 可访问性

必须提供可见 focus-visible、键盘操作和不依赖颜色的状态表达。

## 内容规范

显示总量、当前范围或总页数中的必要信息；总数与当前范围不得在桌面布局中折行。移动端使用“当前页 / 总页数”，优先保留上一页和下一页。

## 示例要求

- 基础示例：Pagination 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Pagination 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcPagination } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Pagination`。
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
