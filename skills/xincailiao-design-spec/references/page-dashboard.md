# 后台页面骨架 (Dashboard Page Skeleton)

适用于：管理后台、数据看板、材库管理、材小模配置、系统设置等内部操作页面。

---

## 布局结构

```
┌──────────────────────────────────────────────────┐
│  Topbar (--layout-backend-topbar-height)          │  ← 64px
├────────┬─────────────────────────────────────────┤
│Sidebar │  Page Header                             │
│240px   │  (面包屑 + 标题 + 操作按钮)                 │
│(56px   ├─────────────────────────────────────────┤
│ 折叠)  │  Page Content                             │
│        │  (表格 / 表单 / 详情 / 看板)                │
│        │                                           │
│        │  max-width: 根据内容自适应                  │
│        │  padding: --spacing-lg (24px)              │
├────────┴─────────────────────────────────────────┤
```

## 骨架结构（必须）

```tsx
// 后台每个页面都用这个结构
<div className="min-h-screen bg-[var(--neutral-50)]">
  <Topbar />                      {/* 顶栏 64px */}
  <div className="flex">
    <Sidebar />                   {/* 侧栏 240px/56px */}
    <main className="flex-1 p-[var(--spacing-lg)]">
      {/* 面包屑 */}
      <Breadcrumb items={[...]} />

      {/* 页面标题区 */}
      <div className="flex items-center justify-between mb-[var(--spacing-lg)]">
        <h3 style={{fontSize: 'var(--type-heading-h3-size)'}}>页面标题</h3>
        <Button variant="solid" tone="product">主操作</Button>
      </div>

      {/* 内容区 */}
      <Card variant="basic">{/* 表格/表单/内容 */}</Card>
    </main>
  </div>
</div>
```

## Topbar 规则

- 高度：`--layout-backend-topbar-height`（64px）
- 背景：白色 `#FFFFFF` + 底边框 `--neutral-200`
- 左侧：收起/展开侧栏按钮 + Logo
- 右侧：搜索、通知、用户头像（Avatar 组件）

## Sidebar 规则

- 展开宽度 240px，折叠宽度 56px
- 使用 Menu 组件 `orientation="vertical"`
- 菜单项图标 + 文字，折叠时仅显示图标
- 当前激活项：`--product-blue-50` 背景 + `--product-blue-500` 文字
- 分组用分割线（`--neutral-200`）

## 页面标题区规则

- 面包屑在最上
- 标题使用 `--type-heading-h3`（24px）或 `--type-heading-h4`（20px）
- 主操作按钮在右侧：`variant="solid"` `tone="product"`
- 多个操作时：主按钮 solid 在右，次按钮 outline 在左

## 内容区规则

- 列表/表格页：Card 包裹 Table 组件 + 上方搜索/筛选区
- 表单页：Card 包裹 Form 组件，固定宽度 640-800px 居中，底部固定按钮栏
- 详情页：DescriptionList + Card 分段展示
- 看板页：卡片网格，2-4 列，数据用 `--type-heading-h2` 大字号
- 空数据时必须用 Empty 组件

## 表格页模式

```
┌─────────────────────────────────────┐
│ Card                                │
│ ┌─────────────────────────────┐     │
│ │ 搜索/筛选区 (Collapse)      │     │
│ ├─────────────────────────────┤     │
│ │ 工具栏 (新增按钮 + 批量操作)  │     │
│ ├─────────────────────────────┤     │
│ │ Table                        │     │
│ ├─────────────────────────────┤     │
│ │ Pagination (右对齐)          │     │
│ └─────────────────────────────┘     │
└─────────────────────────────────────┘
```

## 表单页模式

```
┌───────────────────────────┐
│ Card (max-w-3xl mx-auto)  │
│                           │
│ Form                      │
│   labelPosition="left"    │
│   labelWidth={120}        │
│                           │
│ ───────────────────────   │
│  [取消]        [提交]      │  ← 按钮右对齐
└───────────────────────────┘
```

## 间距规则

- 侧栏到内容区：0（flex 并排）
- 内容区内 padding：`--spacing-lg`（24px）
- 标题区到内容 Card：`--spacing-lg`（24px）
- 表格到分页：`--spacing-md`（16px）
- Card 之间：`--spacing-lg`（24px）
- 表单组件之间：Form 组件自动处理

## 颜色使用

- 页面背景：`--neutral-50`
- 卡片背景：白色 `#FFFFFF`
- 标题文字：`--neutral-900`
- 正文/表格文字：`--neutral-700`
- 辅助文字：`--neutral-500`
- 主操作色：`--product-blue-500`（后台以产品蓝为主操作按钮色，**仅用于主按钮 + 链接文字 + 表格选中行背景**）
- 不使用品牌红色（`--brand-*`），红色仅用于 danger/error
- Checkbox/Radio/Switch 选中态：`--neutral-900`（黑色），不是产品蓝
- **产品蓝是点缀色，不是铺底色**——页面 95% 以上的面积应该是白色和 neutral 色系

## 响应式规则

- 1440px+：侧栏展开 240px，表格全宽
- 1024-1440px：侧栏可折叠 56px
- 768-1024px：侧栏隐藏（overlay 模式），表格横向滚动
- <768px：侧栏 overlay + 遮罩，内容区 full-width
