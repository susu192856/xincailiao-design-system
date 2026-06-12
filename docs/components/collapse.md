# 折叠面板 Collapse

> 用于收纳高密度内容，适合筛选条件、权限规则、历史记录和分组信息。

- 规范页面：`/components/collapse`
- React 源码：`src/components/ui/Collapse.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcCollapse.vue`
- Figma 组件名：`Collapse`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `CollapseItem[]` | `—` | 面板项数组，包含 `key`、`title`、`children`、`disabled`、`extra`。 |
| `defaultOpenKeys` | `string[]` | `[]` | 默认展开项。 |
| `openKeys` | `string[]` | `—` | 受控展开项。 |
| `accordion` | `boolean` | `false` | 是否一次只展开一个面板。 |
| `onChange` | `(openKeys: string[]) => void` | `—` | 展开状态变化回调。 |
| `size` | `sm \| md` | `md` | 面板高度和内边距。 |
| `variant` | `outlined \| plain` | `outlined` | 有边框或无边框。 |

## 组件属性

### Variants

- `multiple`
- `accordion`
- `nested`
- `filter-group`

### Tones

- `neutral`
- `product`

### Sizes

- `sm`
- `md`

### States

- `closed`
- `open`
- `disabled`
- `nested`
- `with-extra`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- 折叠面板适合收纳次级信息，不应用来隐藏主流程必须填写的关键字段。
- 高级筛选默认可折叠，但常用筛选项应始终外露；查询按钮高度使用 28px/32px，最小宽度 80px。
- `extra` 区域只放数量、状态或轻量说明，不承载主操作按钮。
- Figma 原型至少需要 closed、open、disabled、with-extra 四种状态，并配置点击标题切换展开。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## Vue 3 引用示例

```ts
import { XcCollapse } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Collapse`。
- 属性优先按 Props、Variants、Tones、Sizes、States 拆分，不把业务色彩和组件层级混在同一个属性里。
- 状态必须覆盖后台常见场景：禁用、加载、错误、空状态、权限受限或批量操作反馈，具体以本页 States 为准。

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
