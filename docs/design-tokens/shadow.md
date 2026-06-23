# 阴影

> 新材道设计系统 — 阴影 Token

## Token 列表

| Token | 值 | 说明 |
|------|-----|------|
| `--shadow-xs` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | 极轻微（按钮悬停） |
| `--shadow-sm` | `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)` | 轻微（卡片） |
| `--shadow-md` | `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)` | 中等（浮层） |
| `--shadow-lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)` | 较重（弹窗） |
| `--shadow-xl` | `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)` | 重（大浮层） |
| `--shadow-2xl` | `0 25px 50px -12px rgba(0, 0, 0, 0.25)` | 最重（特殊强调） |

## CSS 使用方式

```css
/* 直接在样式文件中引用 */
.element {
  box-shadow: var(--shadow-xs);
}
```
