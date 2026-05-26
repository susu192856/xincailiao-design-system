# 输入框 Input

> 用于文本输入，支持 label、helper text、error 态和内嵌图标。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `(原生 input 属性)` | `—` | `—` | 透传原生 input 属性 |
| `label` | `string` | `—` | 标签文字 |
| `helperText` | `string` | `—` | 帮助文字 |
| `error` | `string` | `—` | 错误提示（覆盖 helperText） |
| `size` | `'sm' | 'md' | 'lg'` | `'md'` | 尺寸 |
| `icon` | `slot` | `—` | 前置图标 |

## 使用指南

### 推荐做法

- ✅ 结合 label 一起使用，保证可访问性
- ✅ error 态同时展示错误提示文字，不只靠颜色

### 避免做法

- ❌ 不要移除 focus 态边框，键盘导航依赖它

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
