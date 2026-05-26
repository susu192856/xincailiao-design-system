# 标签页 Tabs

> 用于在同一区域内切换不同视图。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `TabItem[]` | `[]` | 标签项 { value, label, content, disabled? } |
| `value` | `string` | `—` | 当前激活值（受控） |
| `onValueChange` | `function` | `—` | 切换回调 |

## 使用指南

### 推荐做法

- ✅ Tabs 数量控制在 3-7 个，超过建议用 dropdown 收纳

### 避免做法

- ❌ 不要嵌套 Tabs，会导致视觉混乱

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
