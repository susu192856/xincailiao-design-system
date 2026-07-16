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
| `--docs-border-strong` | `var(--neutral-300)` | border strong |
| `--docs-hover-bg` | `var(--neutral-100)` | hover bg |
| `--docs-active-bg` | `var(--neutral-900)` | active bg |
| `--docs-active-fg` | `#FFFFFF` | active fg |
| `--docs-accent` | `var(--brand-600)` | accent |
| `--docs-code-bg` | `var(--neutral-50)` | code bg |
| `--docs-panel-shadow` | `none` | panel shadow |
| `--docs-soft-shadow` | `none` | soft shadow |

## CSS 使用方式

```css
/* 直接在样式文件中引用 */
.element {
  max-width: var(--layout-website-width);
}
```


## 组件尺寸

| Token | 值 |
|------|-----|
| `--control-height-sm` | `28px` |
| `--control-height-md` | `32px` |
| `--control-height-lg` | `36px` |
| `--control-height-xl` | `48px` |
| `--control-height-2xl` | `56px` |
| `--icon-size-xs` | `12px` |
| `--icon-size-sm` | `16px` |
| `--icon-size-md` | `20px` |
| `--icon-size-lg` | `24px` |
| `--icon-size-xl` | `32px` |
| `--touch-target-min` | `44px` |
| `--disabled-opacity` | `0.48` |
| `--content-reading-width` | `700px` |
| `--content-docs-width` | `1120px` |

## P0 组件尺寸

| Token | 值 |
|------|-----|
| `--button-gap` | `8px` |
| `--button-padding-x-sm` | `12px` |
| `--button-padding-x-md` | `16px` |
| `--button-padding-x-lg` | `20px` |
| `--button-padding-x-xl` | `32px` |
| `--button-padding-x-2xl` | `40px` |
| `--field-padding-x-sm` | `10px` |
| `--field-padding-x-md` | `12px` |
| `--field-padding-x-lg` | `12px` |
| `--field-border-default` | `var(--neutral-300)` |
| `--field-border-hover` | `var(--neutral-900)` |
| `--field-border-focus` | `var(--neutral-900)` |
| `--field-border-error` | `var(--error-text)` |
| `--field-bg-disabled` | `var(--neutral-100)` |
| `--field-bg-readonly` | `var(--neutral-50)` |
| `--textarea-min-height-sm` | `80px` |
| `--textarea-min-height-md` | `96px` |
| `--textarea-min-height-lg` | `120px` |
| `--selection-control-size` | `16px` |
| `--selection-control-gap` | `8px` |
| `--switch-width-sm` | `32px` |
| `--switch-height-sm` | `18px` |
| `--switch-width-md` | `40px` |
| `--switch-height-md` | `22px` |
| `--form-field-gap` | `16px` |
| `--form-section-gap` | `32px` |
| `--form-actions-gap` | `12px` |
| `--table-row-height-compact` | `36px` |
| `--table-row-height-standard` | `44px` |
| `--table-row-height-comfortable` | `52px` |
| `--table-cell-padding-x-compact` | `12px` |
| `--table-cell-padding-x-standard` | `16px` |
| `--table-cell-padding-x-comfortable` | `20px` |
| `--table-column-min-width` | `120px` |
| `--pagination-gap` | `4px` |
| `--modal-width-sm` | `400px` |
| `--modal-width-md` | `520px` |
| `--modal-width-lg` | `720px` |
| `--modal-width-xl` | `960px` |
| `--drawer-width-sm` | `360px` |
| `--drawer-width-md` | `480px` |
| `--drawer-width-lg` | `640px` |
| `--drawer-width-xl` | `800px` |

## 交互与动效

| Token | 值 |
|------|-----|
| `--focus-ring-color` | `var(--neutral-900)` |
| `--focus-ring-width` | `2px` |
| `--focus-ring-offset` | `2px` |
| `--motion-duration-fast` | `120ms` |
| `--motion-duration-normal` | `180ms` |
| `--motion-duration-slow` | `280ms` |
| `--motion-easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--overlay-bg` | `rgb(0 0 0 / 36%)` |
| `--toast-duration-default` | `4000ms` |
| `--tooltip-delay-default` | `400ms` |

## 响应式断点

| Token | 值 |
|------|-----|
| `--breakpoint-sm` | `640px` |
| `--breakpoint-md` | `768px` |
| `--breakpoint-lg` | `1024px` |
| `--breakpoint-xl` | `1280px` |
| `--breakpoint-2xl` | `1440px` |
