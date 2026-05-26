# 标签 Tag

> 用于标记、分类和状态展示。支持 6 种色彩变体和 2 种尺寸。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'neutral' | 'brand' | 'product' | 'success' | 'warning' | 'error'` | `'neutral'` | 色彩变体 |
| `size` | `'sm' | 'md'` | `'md'` | 尺寸 |
| `icon` | `slot` | `—` | 前置图标 |

## 使用指南

### 推荐做法

- ✅ success / warning / error 用于状态反馈
- ✅ Tag 内部文字保持简洁，不超过 6 个字

### 避免做法

- ❌ 不要用 brand 红色 Tag 替代 error 语义

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
