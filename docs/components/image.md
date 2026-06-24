# 图片 Image

> 用于展示图片、图谱、材料图片和预览内容，覆盖加载、错误和空态。

- 规范页面：`/components/image`
- React 源码：`src/components/ui/Image.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcImage.vue`
- Figma 组件名：`Image`

- 分类：数据与内容
- 合同版本：`0.2.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于材料图片、证书、图谱和业务媒体内容，保持明确比例与加载策略。

**避免：** 不要省略 alt 策略，也不要让失败图片破坏布局或暴露无权限资源。

## 结构 Anatomy

- 媒体容器
- 图片内容
- 占位或错误状态
- 可选说明与预览入口
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | `string` | `—` | 图片资源地址。 |
| `alt` | `string` | `—` | 图片替代文本。 |
| `ratio` | `string` | `—` | 媒体宽高比。 |
| `fit` | `'cover' | 'contain'` | `—` | 媒体填充方式。 |
| `loading` | `boolean` | `false` | 异步处理中状态；阻止重复操作。 |
| `error` | `boolean | string` | `—` | 错误状态或错误说明；不得只依赖颜色表达。 |
| `caption` | `ReactNode | string` | `—` | 图片说明。 |

## 变体、语义、尺寸与状态

### Variants

- `square`
- `wide`
- `video`
- `avatar-preview`

### Tones

- `neutral`

### Sizes

- `sm`
- `md`
- `lg`

### States

- `default`
- `loading`
- `error`
- `empty`
- `with-caption`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

桌面端按规范尺寸展示；窄屏时允许内容换行或纵向排列，交互目标不小于 44px。

## 可访问性

必须提供可见 focus-visible、键盘操作和不依赖颜色的状态表达。

## 示例要求

- 基础示例：Image 默认结构与尺寸
- 业务示例：新材道后台或门户中的真实 Image 场景
- 边界示例：长内容、空数据、禁用、加载或窄屏边界
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcImage } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Image`。
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
