# 分页 Pagination

> 用于长列表分页导航。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `page` | `number` | `1` | 当前页码 |
| `total` | `number` | `—` | 总页数 |
| `onPageChange` | `function` | `—` | 翻页回调 |
| `disabled` | `boolean` | `false` | 禁用 |

## 使用指南

### 推荐做法

- ✅ 总页数超过 10 页时考虑省略号截断

### 避免做法

- ❌ 不要在移动端展示完整页码列表，用上一页/下一页即可

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
