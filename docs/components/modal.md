# 弹窗 Modal

> 用于承载需要用户关注或确认的内容，支持 title、description、footer 区域。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `open` | `boolean` | `false` | 是否显示 |
| `title` | `string` | `—` | 标题 |
| `description` | `string` | `—` | 描述文字 |
| `footer` | `slot` | `—` | 底部操作区 |
| `onClose` | `function` | `—` | 关闭回调 |

## 使用指南

### 推荐做法

- ✅ 弹窗标题 + 描述保持简洁，不超过 3 行
- ✅ footer 左侧放取消、右侧放确认，符合用户习惯

### 避免做法

- ❌ 不要在一个页面同时打开多个弹窗

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
| `--z-modal` | Z-index Token |
| `--neutral-600` | 颜色 Token |
