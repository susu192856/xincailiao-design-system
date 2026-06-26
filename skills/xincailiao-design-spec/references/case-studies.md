# 案例库 (Case Studies)

记录设计规范执行中反复出现的错误模式。每个案例包含：现象、根因、规则、检查方式。

---

## Case 001: 弹窗按钮不遵循规范

**现象**：Modal/Drawer 中的确认/取消按钮样式不一致，有时是手写 `<button>`，有时颜色不对。

**根因**：AI 不了解弹窗按钮有固定搭配规则。

**规则**：
- 确认按钮：`<Button variant="solid" tone="task">确认</Button>`
- 取消按钮：`<Button variant="outline" tone="neutral">取消</Button>`
- 危险确认：`<Button variant="solid" tone="danger">删除</Button>`
- 预览、导出、分析等能力操作：已有 task 主按钮时使用 `variant="outline"` 或 `variant="text"` + `tone="product"`
- 永远不要手写 `<button>` 标签

**检查**：搜索页面中是否出现 `<button` 标签，如果有则替换为 `<Button`。

---

## Case 002: 硬编码色值

**现象**：页面中直接写 `#FF3D52`、`rgb(0,109,234)`、`bg-blue-500` 等。

**根因**：AI 不查 tokens.css，凭记忆或视觉惯性写颜色。

**规则**：所有颜色必须用 CSS 变量：`bg-[var(--brand-600)]`、`text-[var(--product-blue-500)]`、`text-[var(--neutral-700)]`。

**检查**：搜索 `#` 或 `rgb(`，确认是否为新定义的 token。Tailwind 颜色类（`bg-white`、`text-black` 除外）也应替换为 `--neutral-*` 变量。

---

## Case 003: 空状态缺失

**现象**：表格无数据时空白一片，搜索无结果时表格消失。

**根因**：AI 只处理了"有数据"的情况。

**规则**：
- Table `data=[]` → `<Empty type="no-data" />`
- 搜索无结果 → `<Empty type="no-result" />`
- 首次使用 → `<Empty type="first-use" action={<Button>开始使用</Button>} />`
- 无权限 → `<Empty type="no-permission" />`

**检查**：所有 Table 组件须有 `empty` 或 loading 状态处理。

---

## Case 004: 间距不一致

**现象**：同一页面有的用 `mb-4`，有的用 `mb-6`，有的用 `p-5`。

**根因**：手动估算间距，不查 spacing token。

**规则**：
- `mb-4` → `var(--spacing-md)` 16px
- `mb-6` → `var(--spacing-lg)` 24px
- `mb-8` → `var(--spacing-xl)` 32px
- `p-4` → `var(--spacing-md)` 16px
- `gap-6` → `var(--spacing-lg)` 24px

**检查**：搜索 Tailwind 间距类（`p-`、`m-`、`gap-`），替换为对应的 `--spacing-*` token。

---

## Case 005: 颜色 Token 选错类别

**现象**：正文文字用了 `--neutral-700` 是对的，但辅助文字也用了 `--neutral-700` 而不是 `--neutral-500`。

**根因**：不了解中性色各阶梯的语义。

**规则**：
- `--neutral-50/100`：背景（浅灰）
- `--neutral-200/300`：边框、分割线
- `--neutral-400/500`：辅助文字、占位符、disabled
- `--neutral-600/700`：正文、标签、次要标题
- `--neutral-800/900`：主标题、强调

**检查**：审视所有 `--neutral-*` 使用是否符合此阶梯。

---

## Case 006: 多产品线颜色混淆

**现象**：在后台页面用了品牌红色（`--brand-*`），在官网用了产品蓝（`--product-blue-*`）。

**根因**：不区分 Portal 和 Dashboard 的颜色策略。

**规则**：
- Portal 页面主色：`--brand-*`（品牌红），特殊情况用 `--product-blue-*`
- Dashboard 页面主色：`--product-blue-*`
- 品牌红不应出现在后台操作按钮上（danger 除外）

**检查**：后台页面搜索 `--brand-`，出现在非 danger 场景则标记。

---

## Case 007: 图标尺寸不匹配

**现象**：14px 正文旁边用了 24px 图标，或 20px 标题旁边用了 16px 图标。

**根因**：图标尺寸不参考文字层级。

**规则**：
- 12px 文字 → 图标 12px
- 13-14px 文字 → 图标 16px
- 16px 文字 → 图标 20px
- 18-20px 文字 → 图标 24px
- 24px+ 标题 → 图标 32px

**检查**：搜索 `<Icon size=` 并与上下文文字字号对比。

---

## Case 008: 提交前不构建

**现象**：改了文件就宣布完成，实际可能编译报错。

**规则**：每次修改完成后必须运行 `npm run build`，构建不通过不能算完成。

**检查**：`npm run build` 输出中是否有 error。

---

## Case 009: 产品蓝过度使用

**现象**：后台页面里 Checkbox 选中态是蓝色、Radio 选中是蓝色、表格操作按钮全是蓝色——整个页面看起来"一片蓝"，和普通后台毫无区别。

**根因**：AI 看到"后台主色=产品蓝"，就把所有交互元素都设为蓝色。实际上产品蓝是点缀色，仅用于主操作按钮。

**规则**：
- 产品蓝 = 每页 1 个 solid 主按钮 + 链接文字 + 表格行选中背景（浅蓝 `--product-blue-50`）
- Checkbox/Radio/Switch 选中态 = `--neutral-900`（黑色）
- 次要按钮 = outline/ghost + neutral 色
- 页面 95% 以上面积是白色和 neutral 色系

**检查**：搜索生成的页面代码中出现 `--product-blue-` 的次数，表单/表格页面不应超过 5 处。

---

## 案例维护规则

1. 新 bug 出现时，先判断能否归入已有案例 — 不要每个 bug 新建一个案例
2. 同一根因的变体归入同一案例号
3. 每个案例必须可自动检查（grep、lint、或 eval prompt）
4. 规则变更需标注来源：designer confirmed / code pattern / review case
