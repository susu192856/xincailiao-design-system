# 表格 Table

> 用于展示结构化数据。由 Table + TableHeader + TableBody + TableRow + TableHead + TableCell 组合使用。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `Table` | `容器` | `—` | 表格根节点 |
| `TableHeader` | `thead` | `—` | 表头容器 |
| `TableBody` | `tbody` | `—` | 表体容器 |
| `TableRow` | `tr` | `—` | 行 |
| `TableHead` | `th` | `—` | 表头单元格 |
| `TableCell` | `td` | `—` | 数据单元格 |

## 使用指南

### 推荐做法

- ✅ 表格内容使用 Body/M (14px)，表头使用 12px semibold

### 避免做法

- ❌ 不要合并过多列，保持横向可滚动

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
