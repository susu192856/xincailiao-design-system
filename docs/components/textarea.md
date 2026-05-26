# 文本域 Textarea

> 用于多行文本输入，支持 label、helper text 和 error 态。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | `string` | `—` | 标签文字 |
| `inputSize` | `'sm' | 'md' | 'lg'` | `'md'` | 尺寸 |
| `helperText` | `string` | `—` | 帮助文字 |
| `error` | `string` | `—` | 错误提示 |
| `disabled` | `boolean` | `false` | 禁用 |

## 使用指南

### 推荐做法

- ✅ Textarea 用于超过一行文本的输入场景

### 避免做法

- ❌ 单行输入使用 Input 组件而非 Textarea

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
