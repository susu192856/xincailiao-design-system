# 复选框 Checkbox

> 用于多选场景，支持选中、未选中和禁用状态。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | `string` | `—` | 标签文字 |
| `defaultChecked` | `boolean` | `false` | 默认选中 |
| `disabled` | `boolean` | `false` | 禁用 |

## 使用指南

### 推荐做法

- ✅ Checkbox 用于多选，同一组中可选中多个

### 避免做法

- ❌ 不要用 Checkbox 代替 Switch（开关动作）

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
