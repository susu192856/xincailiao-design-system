# 卡片 Card

> 用于承载一组相关内容，支持 header / title / description / content / footer 区域。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `Card` | `根容器` | `—` | 白色背景、p-6、4px 圆角 |
| `CardHeader` | `头部` | `—` | 标题区域 |
| `CardTitle` | `标题` | `—` | 卡片标题 |
| `CardDescription` | `描述` | `—` | 卡片描述 |
| `CardContent` | `内容` | `—` | 主要内容区 |
| `CardFooter` | `底部` | `—` | 底部操作，带顶部分割线 |

## 使用指南

### 推荐做法

- ✅ 卡片内部保持 24px 内边距

### 避免做法

- ❌ 不要在卡片内塞过多信息，一卡一主题

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
