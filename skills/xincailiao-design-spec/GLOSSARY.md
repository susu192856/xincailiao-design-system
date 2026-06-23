# 设计词典 (Design Glossary)

将抽象的设计描述翻译为具体的、可检查的数值和规则。当用户使用模糊的设计语言时，按此词典转换为可执行的约束。

---

## 简约 (Minimalist / Clean)

**翻译为可执行规则：**

- 每页最多使用 **2 种字号层级**（标题 + 正文），特殊情况不超过 3 种
- 不使用装饰性边框，功能性分割线使用 `--neutral-200`
- 卡片间间距统一使用 `--spacing-md`（16px）或 `--spacing-lg`（24px）
- 背景色使用 `--neutral-50` 或白色，不用渐变或纹理
- 按钮默认使用 `variant="outline"` 或 `variant="ghost"`，主操作按钮才用 `variant="solid"`
- 高频控件使用 `--radius-sm`（2px），分组容器使用 `--radius-sm` 或 `--radius-md`；展示型卡片才使用更大圆角

## 大气 (Grand / Spacious)

**翻译为可执行规则：**

- Hero 区域高度使用 `--layout-website-hero-md`（650px）或 `--layout-website-hero-lg`（800px）
- 大标题使用 `--type-display-l`（56px / 700 weight）
- 内容区最大宽度使用 `--layout-website-content`（1400px），留足两侧留白
- 区块之间间距 `--spacing-3xl`（64px）或 `--spacing-4xl`（96px）
- 卡片内边距不少于 `--spacing-lg`（24px）
- 按钮使用 `size="lg"` 或更大，主操作按钮用 `variant="solid"` + `tone="brand"`

## 专业/可信赖 (Professional / Trustworthy)

**翻译为可执行规则：**

- 颜色体系以中性色 `--neutral-*` 为主，品牌色 `--brand-*` 仅用于关键操作和高亮
- 字体统一使用 PingFang SC，不混用多种字体
- 表格/表单严格对齐，列间距不低于 `--spacing-md`
- 数据展示使用 `--data-*` 色板，不使用随机颜色
- 状态标记严格使用语义色：成功=success，警告=warning，错误=error，信息=info

## 排版优化 (Typography Refinement)

**翻译为可执行规则：**

- 正文默认 `--type-body-m`（14px / 22px line-height），大段文字用 `--type-body-l`（16px / 24px）
- 标题与正文间距 ≥ `--spacing-sm`（8px）
- 正文行宽使用 `--content-reading-width`（700px）作为上限
- 段落间距 = `--spacing-md`（16px）
- 辅助文字（captions/注释）使用 `--type-caption`（12px）+ `--neutral-500` 或 `--neutral-600`

## 精致/细节感 (Refined / Polished)

**翻译为可执行规则：**

- 图标尺寸与文字尺寸匹配：正文14px → 图标16px，标题20px → 图标24px
- Hover 状态必须有反馈：颜色变化、轻微阴影（`--shadow-sm` 或 `--shadow-md`）
- 过渡动画使用 `--motion-duration-fast` / `--motion-duration-normal` 与 `--motion-easing-standard`
- 空状态必须使用 Empty 组件，不能只显示空白区域
- 加载状态必须有 Spinner 或 Skeleton，不能显示空白

## 现代感 (Modern)

**翻译为可执行规则：**

- 现代感来自清晰层级、留白和动效，不通过全局放大圆角表达
- 阴影只用于真实层级；普通卡片优先边框或 `--shadow-sm`
- 主操作按钮使用 `variant="solid"` + 品牌色或产品蓝
- 卡片使用白色背景 + `--shadow-sm` 或 `--shadow-md`
- 不使用的风格：拟物化效果、过重的边框、纯黑色文字

---

## 使用方式

当用户说"我要做一个简约大气的首页"时，AI 应：

1. 查"简约"→ 最多2种字号、outline按钮为主、间距16-24px
2. 查"大气"→ Hero 650px高、大标题56px、内容区1400px宽、区块间距64px+
3. 合并规则 → 首页：display-l标题 + body-l正文，Hero 650px，outline按钮+1个solid主按钮，白色背景+neutral-50区块，高频控件使用2px圆角
4. 按照 `references/page-portal.md` 的骨架模板生成代码

**同一描述词冲突时**，按以下优先级：品牌规范 > Token 数值 > 本词典
