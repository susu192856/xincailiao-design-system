# 消息提示 Toast

> 用于操作后的轻量反馈，自动消失，不打断用户操作流程。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'success' | 'error' | 'warning' | 'info'` | `—` | 类型 |
| `title` | `string` | `—` | 标题 |
| `description` | `string` | `—` | 描述 |

## 使用指南

### 推荐做法

- ✅ Toast 用于操作结果反馈，自动 4 秒消失

### 避免做法

- ❌ 不要用 Toast 展示需要用户确认的信息

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
