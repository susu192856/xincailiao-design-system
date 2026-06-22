# 官网门户页面骨架 (Portal Page Skeleton)

适用于：新材道官网、产品介绍页、营销落地页、数据空间门户、材库首页等面向外部的页面。

---

## 布局结构

```
┌──────────────────────────────────────────┐
│  Navigation (--layout-website-nav-height) │  ← 64px, 固定在顶
├──────────────────────────────────────────┤
│  Hero Section                             │  ← 500/650/800px 三种高度
├──────────────────────────────────────────┤
│  Content Section 1                        │
│  (max-width: --layout-website-content)    │  ← 1400px 内容区
├──────────────────────────────────────────┤
│  Content Section 2 (optional full-width)  │
├──────────────────────────────────────────┤
│  Content Section N ...                    │
├──────────────────────────────────────────┤
│  Footer                                   │
└──────────────────────────────────────────┘
```

## 间距系统

- 导航到 Hero：0（紧贴）
- Hero 到第一个内容区：`--spacing-4xl`（96px）
- 内容区之间：`--spacing-3xl`（64px）或 `--spacing-4xl`（96px）
- 内容区内区块间距：`--spacing-2xl`（48px）
- Footer 到最后一个内容区：`--spacing-4xl`（96px）
- Footer 内边距：上下 `--spacing-2xl`（48px），左右 `--spacing-lg`（24px）

## 导航规则

- 品牌 Logo 左对齐，高度 32-40px
- 导航项间距 `--spacing-lg`（24px）
- 导航项文字 `--type-body-m-weight-medium` + `--neutral-700`，hover 变 `--neutral-900`
- 当前页导航项 `--neutral-900` + `--type-body-m-weight-semibold`
- 右侧 CTA 按钮：`variant="solid"` `tone="brand"` `size="md"`
- 移动端导航折叠为汉堡菜单

## Hero 规则

- 背景：品牌色渐变或产品截图，不使用纯色
- 标题：`--type-display-l`（56px / 700）或 `--type-heading-h1`（40px / 600）
- 副标题：`--type-body-l`（16px）+ `--neutral-600`
- 标题区最大宽度：720px（保证可读性）
- CTA 按钮组：1个主按钮（solid+brand+lg）+ 1~2个次按钮（outline+neutral+lg）
- Hero 内容垂直居中

## 内容区规则

- 每区块有一个清晰的标题（`--type-heading-h2` 32px 或 `--type-heading-h3` 24px）
- 特性卡片用 Card 组件 `variant="basic"`，3-4 列网格
- 对比/定价表格用 Table 组件，表头高亮
- 客户案例/Logo 墙用白色背景
- CTA 区块在页面底部：居中、大标题 + solid 按钮

## 响应式规则

- 1920px+：内容区 1400px，16 列网格
- 1440px：内容区 1200px，12 列网格
- 1024px：内容区 960px，8 列网格，卡片 2 列
- 768px：内容区 100%，padding `--spacing-lg`，卡片 1 列
- 导航在 768px 以下折叠

## 颜色使用

- 背景：白色为主，交替使用 `--neutral-50` 区分区块
- 标题：`--neutral-900`
- 正文：`--neutral-700`
- 浅色文字：`--neutral-500` 或 `--neutral-600`
- CTA 色：优先 `--brand-600`，数据/产品页可用 `--product-blue-500`
- 不要在同一页面使用超过 2 种强调色
