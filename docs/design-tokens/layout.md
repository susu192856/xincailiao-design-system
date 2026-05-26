# 布局

> 新材道设计系统 — 布局 Token

## Token 列表

| Token | 值 | 说明 |
|------|-----|------|
| `--layout-website-width` | `1920px` | website width |
| `--layout-website-content` | `1400px` | website content |
| `--layout-website-nav-height` | `64px` | website nav height |
| `--layout-website-hero-sm` | `500px` | website hero sm |
| `--layout-website-hero-md` | `650px` | website hero md |
| `--layout-website-hero-lg` | `800px` | website hero lg |
| `--layout-backend-width` | `1440px` | backend width |
| `--layout-backend-topbar-height` | `64px` | backend topbar height |
| `--layout-backend-sidebar-expanded` | `240px` | backend sidebar expanded |
| `--layout-backend-sidebar-collapsed` | `56px` | backend sidebar collapsed |
| `--docs-bg` | `var(--neutral-50)` | bg |
| `--docs-bg-card` | `#FFFFFF` | bg card |
| `--docs-fg` | `var(--neutral-900)` | fg |
| `--docs-muted` | `var(--neutral-600)` | muted |
| `--docs-border` | `var(--neutral-200)` | border |
| `--docs-hover-bg` | `var(--neutral-100)` | hover bg |
| `--docs-active-bg` | `var(--neutral-900)` | active bg |
| `--docs-active-fg` | `#FFFFFF` | active fg |
| `--docs-accent` | `var(--brand-600)` | accent |
| `--docs-code-bg` | `var(--neutral-100)` | code bg |

## CSS 使用方式

```css
/* 直接在样式文件中引用 */
.element {
  max-width: var(--layout-website-width);
}
```

