# 共享组件规则 (Shared Components)

新材道设计系统共有 29 个共享 UI 组件。本文档定义每个组件的使用规则、必须使用的 Token 和常见错误。

---

## Button 按钮

**Token 约束：**
- 背景色/文字色：使用 `--neutral-*`、`--product-blue-*`、`--brand-*`、`--error-*`、`--success-*`、`--warning-*`
- 字号：`sm`→13px, `md`/`lg`→14px, `xl`→18px, `2xl`→20px
- 高度：`sm`=28px, `md`=32px, `lg`=36px, `xl`=48px, `2xl`=56px
- 圆角：默认 `--radius-md`（4px）

**规则：**
- 每个视图中最多一个 `variant="solid"` 主操作按钮
- 弹窗底部按钮：确认用 `solid`，取消用 `outline` 或 `ghost`
- 危险操作（删除等）必须使用 `tone="danger"`
- 加载中必须传 `loading={true}`，禁用点击而非隐藏按钮
- 图标按钮必须有 `aria-label`

**常见错误：**
- 弹窗确认/取消按钮不使用 Button 组件，而是手写 `<button>` — 这是禁止的
- 硬编码颜色如 `bg-blue-500` 而非使用 `var(--product-blue-500)`

## Modal 弹窗

**规则：**
- 弹窗内的确认/取消按钮必须使用 Button 组件，`footerAlign` 默认 `"end"`（右对齐）
- 确认按钮：`variant="solid"` `tone="product"`（非危险操作）
- 取消按钮：`variant="outline"` `tone="neutral"`
- 危险确认弹窗：`tone="danger"`，确认按钮 `tone="danger"`
- `size` 按内容量选择：简单确认用 `sm`，表单用 `md` 或 `lg`，详情展示用 `xl`

**常见错误：**
- 弹窗内 confirm/cancel 不使用 Button 组件，导致样式与规范不一致

## Tag 标签

**规则：**
- 分类标签使用 `variant="soft"` + 对应的 `tone`（neutral/product/brand/danger/warning/success）
- 状态标签（如"进行中""已完成"）使用语义色 tone
- `size="sm"` 用于表格内嵌，`size="md"` 用于独立展示
- 可关闭标签须传 `closable={true}`，但不要同时传 `disabled`

## Table 表格

**规则：**
- 表头背景 `--neutral-50`，表头文字 `--neutral-700` + `--type-body-m-weight-semibold`
- 表格行 hover 背景 `--neutral-50`
- 选中行背景 `--product-blue-50`
- 空状态必须使用 Empty 组件
- 加载中必须传 `loading={true}`
- `density`：数据密集用 `"compact"`，常规用 `"regular"`

## Form 表单

**规则：**
- 标签文字使用 `--type-body-m` + `--neutral-800`
- 必填标记使用 `--error-text`
- 错误提示使用 `--type-caption` + `--error-text`
- 表单按钮区：主按钮在右（`solid`），次要按钮在左（`outline`）
- 一行一个表单项用 `layout="single-column"`，一行两个用 `"two-column"`

## Input / Textarea 输入框

**规则：**
- 边框默认 `--neutral-300`，focus 时 `--product-blue-500`
- 错误状态边框 `--error-text`
- 辅助文字使用 `--type-caption` + `--neutral-500`
- 必填标记使用 `--error-text` *
- label 位置默认 top，表单内可设 `labelPosition="left"` + `labelWidth`

## Select 选择器

**规则：**
- 与 Input 使用相同的尺寸和状态规则
- 多选用 `multiple={true}`，可搜索用 `searchable`
- 选项过多时提供搜索功能

## Card 卡片

**规则：**
- 默认白底 + `--shadow-sm`
- 统计数据卡用 `variant="metric"` + 大字号标题
- 可交互卡片 `interactive={true}` + hover 阴影升为 `--shadow-md`
- 卡片间距 ≥ `--spacing-md`（16px）

## Tabs 标签页

**规则：**
- 顶层导航用 `variant="line"`
- 内容筛选用 `variant="segment"`
- 卡片式用 `variant="card"`
- 激活态颜色默认 `--product-blue-500`

## Menu 菜单

**规则：**
- 后台侧边栏用 `orientation="vertical"`，顶部导航用 `"horizontal"`
- 当前激活项使用 `--product-blue-50` 背景 + `--product-blue-500` 文字
- disabled 项使用 `--neutral-400` 文字
- 折叠模式 `collapsed={true}` 时只显示图标

## Breadcrumb 面包屑

**规则：**
- 当前页文字 `--neutral-900` + `--type-body-m-weight-semibold`
- 上级链接文字 `--neutral-500`，hover 变 `--product-blue-500`
- 层级分隔符使用 `--neutral-400`

## Pagination 分页

**规则：**
- 放在表格/列表下方，间距 `--spacing-md`
- 当前页码使用 `--product-blue-500` 背景 + 白色文字
- 总条数文字使用 `--neutral-500` + `--type-body-s`

## Empty 空状态

**规则：**
- 必须出现在所有可能为空的地方：表格无数据、搜索无结果、无权限访问
- `type`：无数据=`"no-data"`，搜索无结果=`"no-result"`，无权限=`"no-permission"`，首次使用=`"first-use"`
- 有操作入口时传 `action` prop，按钮使用 Button 组件 `variant="outline"`

## Drawer 抽屉

**规则：**
- 详情查看用 `variant="detail"`，筛选用 `"filter"`，配置用 `"config"`
- 右侧弹出为默认，左侧用 `placement="left"`
- footer 按钮规则与 Modal 一致

## Toast 消息提示

**规则：**
- 成功用 `tone="success"`，错误用 `tone="error"`，警告用 `tone="warning"`，提示用 `tone="info"`
- 带操作链接用 `variant="with-action"`
- 自动消失时间默认 3 秒

## Tooltip / Popover

**规则：**
- Tooltip 用于简短提示文字，`placement` 默认 `"top"`
- Popover 用于包含标题/内容/操作的内容卡片
- 触发元素必须有明确的交互提示

## Checkbox / Radio / Switch

**规则：**
- Checkbox 多选用 `variant="group"`
- Radio 互斥选用 `variant="group"` 或 `variant="card"`
- Switch 用于即时生效的开关（如启用/禁用），不用于需要提交的表单

## Tree 树控件

**规则：**
- 目录结构用 `variant="directory"`
- 带复选框多用 `variant="with-checkbox"`
- 空节点使用 Empty 组件

## Transfer 穿梭框

**规则：**
- 权限分配场景用 `variant="permission-transfer"`
- 带搜索用 `variant="with-search"`
- 左右列表空时显示 Empty

## DescriptionList 描述列表

**规则：**
- 详情页展示用此组件，不要手写 table
- `columns`：1/2/3 列
- 标签宽度用 `labelWidth` 统一控制

## Collapse 折叠面板

**规则：**
- 筛选区用 `variant="filter-group"`
- 嵌套内容用 `variant="nested"`
- 手风琴模式用 `accordion={true}`

## Avatar / Badge / Image

**规则：**
- Avatar 尺寸：表格内 `sm`，列表中 `md`，详情页 `lg`，个人中心 `xl`
- Badge 红点/数字用于通知提醒
- Image 加载中必须显示 loading 占位，加载失败显示 error 占位

## Icon 图标

**规则：**
- 基于 Phosphor Icons
- 尺寸与相邻文字匹配：14px文字→16px图标，16px文字→20px图标
- 装饰性图标传 `decorative={true}`
- 语义图标传 `label` 属性

---

## 通用禁止事项

1. 不要手写 `<button>` — 必须用 Button 组件
2. 不要手写 `<input>` — 必须用 Input 组件
3. 不要硬编码色值（`#xxx`、`rgb()`）— 必须用 CSS 变量或 Tailwind token
4. 不要硬编码间距数值 — 必须用 `--spacing-*`
5. 不要硬编码字号 — 必须用 `--type-*`
6. 不要硬编码圆角 — 必须用 `--radius-*`
7. 不要硬编码阴影 — 必须用 `--shadow-*`
8. 不要绕过组件直接在页面手写 UI — 先用现有组件，没有对应组件时先确认是否新增
