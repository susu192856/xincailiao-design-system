# 圆角

> 新材道设计系统 — 圆角 Token

## Token 列表

| Token | 值 | 说明 |
|------|-----|------|
| `--radius-none` | `0px` | 表格/数据网格 |
| `--radius-sm` | `2px` | 交互控件（按钮/输入框等） |
| `--radius-md` | `4px` | 卡片/弹窗容器 |
| `--radius-lg` | `8px` | 大卡片/浮层 |
| `--radius-xl` | `12px` | 官网营销展示 |
| `--radius-2xl` | `16px` | 品牌展示模块 |
| `--radius-full` | `9999px` | 胶囊/头像/圆形 |

## CSS 使用方式

```css
/* 直接在样式文件中引用 */
.element {
  border-radius: var(--radius-none);
}
```

## 圆角使用原则

| 层级 | 圆角 | 适用场景 |
|------|------|----------|
| radius-sm | 2px | 按钮、输入框、选择器、标签等交互控件 — **组件默认圆角** |
| radius-md | 4px | 卡片容器、弹窗内容区、分组容器 |
| radius-lg | 8px | 大卡片、浮层、对话框 |
| radius-xl | 12px | 官网营销卡片、展示容器（后台慎用） |
| radius-2xl | 16px | 官网品牌展示模块（后台慎用） |
| radius-full | 9999px | 胶囊标签、头像、圆形按钮 |
