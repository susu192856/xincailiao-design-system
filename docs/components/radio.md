# 单选框 Radio

> 用于单选场景，同一组中只能选择一个选项。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | `string` | `—` | 互斥组名称 |
| `label` | `string` | `—` | 标签文字 |
| `disabled` | `boolean` | `false` | 禁用 |

## 使用指南

### 推荐做法

- ✅ 同一 name 的 Radio 自动形成互斥组

### 避免做法

- ❌ 选项少于 3 个时建议使用 Select 代替

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
