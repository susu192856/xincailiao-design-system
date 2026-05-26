# 开关 Switch

> 用于切换开关状态，常用于功能启停、权限开关等二选一场景。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | `string` | `—` | 标签文字 |
| `size` | `'sm' | 'md'` | `'md'` | 尺寸 |
| `disabled` | `boolean` | `false` | 禁用 |

## 使用指南

### 推荐做法

- ✅ Switch 用于二选一场景，不需要额外的确认按钮

### 避免做法

- ❌ 不要用 Switch 代替提交操作，它应该立即生效

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
