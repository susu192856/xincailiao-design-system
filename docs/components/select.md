# 选择器 Select

> 下拉选择器，支持 label、placeholder、error 态。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `options` | `Option[]` | `[]` | 选项列表 { label, value, disabled? } |
| `placeholder` | `string` | `—` | 占位文案 |
| `label` | `string` | `—` | 标签文字 |
| `error` | `string` | `—` | 错误提示 |
| `size` | `'sm' | 'md' | 'lg'` | `'md'` | 尺寸 |

## 使用指南

### 推荐做法

- ✅ 选项超过 15 个时建议添加搜索功能

### 避免做法

- ❌ 不要把 Select 当 Navigation 使用

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
