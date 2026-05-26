# 字体

> 新材道设计系统 — 字体 Token

## Token 列表

| Token | 值 | 说明 |
|------|-----|------|
| `--type-display-l-size` | `56px` | display l size |
| `--type-display-l-line-height` | `64px` | display l line height |
| `--type-display-l-weight` | `700` | display l weight |
| `--type-heading-h1-size` | `40px` | heading h1 size |
| `--type-heading-h1-line-height` | `48px` | heading h1 line height |
| `--type-heading-h1-weight` | `600` | heading h1 weight |
| `--type-heading-h2-size` | `32px` | heading h2 size |
| `--type-heading-h2-line-height` | `40px` | heading h2 line height |
| `--type-heading-h2-weight` | `600` | heading h2 weight |
| `--type-heading-h3-size` | `24px` | heading h3 size |
| `--type-heading-h3-line-height` | `32px` | heading h3 line height |
| `--type-heading-h3-weight` | `500` | heading h3 weight |
| `--type-heading-h4-size` | `20px` | heading h4 size |
| `--type-heading-h4-line-height` | `28px` | heading h4 line height |
| `--type-heading-h4-weight` | `500` | heading h4 weight |
| `--type-heading-h5-size` | `18px` | heading h5 size |
| `--type-heading-h5-line-height` | `26px` | heading h5 line height |
| `--type-heading-h5-weight` | `500` | heading h5 weight |
| `--type-body-l-size` | `16px` | body l size |
| `--type-body-l-line-height` | `24px` | body l line height |
| `--type-body-l-weight` | `400` | body l weight |
| `--type-body-m-size` | `14px` | body m size |
| `--type-body-m-line-height` | `22px` | body m line height |
| `--type-body-m-weight` | `400` | body m weight |
| `--type-body-s-size` | `13px` | body s size |
| `--type-body-s-line-height` | `20px` | body s line height |
| `--type-body-s-weight` | `400` | body s weight |
| `--type-caption-size` | `12px` | caption size |
| `--type-caption-line-height` | `18px` | caption line height |
| `--type-caption-weight` | `400` | caption weight |

## CSS 使用方式

```css
/* 直接在样式文件中引用 */
.element {
  font-size: var(--type-display-l-size);
}
```

## 字号行高对照

| 层级 | 字号 | 行高 | 行高比 | 字重 |
|------|------|------|--------|------|
| Display/L | 56px | 64px | 1.14 | 700 |
| Heading/H1 | 40px | 48px | 1.2 | 600 |
| Heading/H2 | 32px | 40px | 1.25 | 600 |
| Heading/H3 | 24px | 32px | 1.33 | 500 |
| Heading/H4 | 20px | 28px | 1.4 | 500 |
| Heading/H5 | 18px | 26px | 1.44 | 500 |
| Body/L | 16px | 24px | 1.5 | 400 |
| Body/M | 14px | 22px | 1.57 | 400 |
| Body/S | 13px | 20px | 1.54 | 400 |
| Caption | 12px | 18px | 1.5 | 400 |

## 字体栈

```css
font-family: "PingFang SC", "Microsoft YaHei", "Source Han Sans CN",
             ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
             "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```
