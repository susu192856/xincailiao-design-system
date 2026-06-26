# Upload Upload

> 用于新材道设计系统中的标准组件场景。

- 规范页面：`/components/upload`
- React 源码：`src/components/ui/Upload.tsx`
- Vue 源码：`packages/vue-ui/src/components/XcUpload.vue`
- Figma 组件名：`Upload`

- 分类：操作与输入
- 合同版本：`0.2.0`
- 规范状态：稳定

## 定位与边界

**适用：** 用于文件选择与上传，支持拖拽、多文件、格式和大小限制。适用于材料数据导入、检测报告上传和图片附件场景。

**避免：** 不要在不提供格式说明时直接限制上传；不要在上传失败后清除用户已选文件信息。

## 结构 Anatomy

- 上传区域
- 文件列表
- 进度指示
- 操作按钮
## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | `string` | `—` | 字段标签文字。 |
| `helperText` | `string` | `—` | 字段下方的帮助说明，如格式和大小限制。 |
| `error` | `string` | `—` | 错误提示；覆盖 helperText 显示。 |
| `accept` | `string` | `—` | 允许的文件格式，如 '.pdf,.xlsx'。 |
| `multiple` | `boolean` | `—` | 是否允许多文件上传。 |
| `maxFiles` | `number` | `—` | 最大文件数量。 |
| `maxSize` | `number` | `—` | 单个文件最大字节数。 |
| `disabled` | `boolean` | `false` | 禁用状态。 |
| `listType` | `'text' | 'card'` | `—` | 文件列表展示样式。 |

## 变体、语义、尺寸与状态

### Variants

- `text-list`
- `card-list`
- `drag-drop`

### Tones

- `neutral`
- `danger`

### Sizes

- `md`

### States

- `default`
- `uploading`
- `done`
- `error`
- `disabled`
- `drag-over`


## 使用指南

- 优先使用现有 token，不新增孤立颜色、字号、圆角或阴影。
- 后台场景必须考虑禁用、加载、错误、空状态、权限受限和批量操作反馈。
- Figma 属性、网页示例和前端源码 API 需要保持同名同义。

## 响应式

桌面端按规范尺寸展示；窄屏时上传区域可纵向排列，交互目标不小于 44px。

## 可访问性

必须有可见标签或 aria-label；错误状态提供文字说明；上传按钮可通过键盘触发。

## 内容规范

标签使用业务名词；helperText 说明格式和大小限制；error 说明具体失败原因。

## 示例要求

- 基础示例：Upload 默认结构与尺寸
- 业务示例：新材道后台材料数据导入或检测报告上传场景
- 边界示例：多文件、大小限制、格式限制、禁用、错误和空列表
- 错误示例：绕过组件、硬编码数值或仅依赖颜色表达状态

## Vue 3 引用示例

```ts
import { XcUpload } from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

## Figma 同步要求

- Figma 组件命名使用 `Upload`。
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
