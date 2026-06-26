# 气泡弹窗 Popover

> 用于承载轻量说明、快捷信息和少量操作，适合不打断流程的局部补充。

- 规范页面：`/components/popover`
- React 源码：`src/components/ui/Popover.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcPopover.vue`
- Figma 组件名：`Popover`

- 分类：反馈与浮层
- 合同版本：`0.2.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于轻量详情、筛选和无需离开当前页面的小型操作。

**避免：** 不要承载长表单或关键确认，也不要与其他浮层相互嵌套。

## 结构 Anatomy

- 触发元素
- 浮层容器
- 标题或内容
- 可选操作区
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `ReactNode | string` | `—` | 组件标题。 |
| `content` | `ReactNode | slot` | `—` | 组件主体内容。 |
| `footer` | `ReactNode | slot` | `—` | 底部操作区。 |
| `placement` | `'top' | 'right' | 'bottom' | 'left'` | `top / bottom` | 浮层或抽屉位置。 |
| `open` | `boolean` | `false` | 浮层或面板的受控打开状态。 |

## 变体、语义、尺寸与状态

### Variants

- `basic`
- `with-title`
- `with-footer`
- `action-menu`

### Tones

- `neutral`
- `product`

### Sizes

- `md`

### States

- `hidden`
- `visible`
- `top`
- `right`
- `bottom`
- `left`
- `with-action`


## 使用指南

- 用于局部补充信息和少量快捷操作，不用于复杂表单或强确认流程。
- 需要阻断任务或二次确认时，应升级为 Modal。
- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

桌面端按规范尺寸展示；窄屏时允许内容换行或纵向排列，交互目标不小于 44px。

## 可访问性

必须提供可见 focus-visible、键盘操作和不依赖颜色的状态表达。

## 内容规范

内容保持聚焦，操作数量有限；复杂任务升级为 Drawer 或 Modal。

## 示例要求

- 基础示例：Popover 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Popover 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcPopover } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Popover`。
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
| `--z-tooltip` | Z-index Token |
| `--shadow-md` | 阴影 Token |
| `--shadow-lg` | 阴影 Token |
