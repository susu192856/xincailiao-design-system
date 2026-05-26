/**
 * 设计系统导出脚本
 * 从 tokens.css 和组件源码生成：
 *   1. docs/design-tokens/*.md — 设计 Token 规范文档
 *   2. docs/components/*.md — 组件规范文档（含 Vue 3 示例）
 *   3. figma/tokens.json — Tokens Studio 格式，可导入 Figma
 *
 * 用法: node scripts/export.cjs
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

// ============================================================
//  1. 读取 tokens.css 解析设计变量
// ============================================================
function parseTokens() {
  const css = fs.readFileSync(path.join(ROOT, "src/styles/tokens.css"), "utf-8");
  const categories = {};
  const lines = css.split("\n");

  let sectionTitle = null;
  let inComment = false;
  let inContent = false;
  let buffer = [];

  const keyFor = (s) => s.replace(/[\s/]+/g, "_").toLowerCase();

  for (const line of lines) {
    const trimmed = line.trim();

    // When we hit a new section header, finalize the previous section first
    if (/^\/\*\s+={5,}/.test(trimmed)) {
      if (inContent && sectionTitle) {
        const vars = [];
        for (const l of buffer) {
          const vRe = /--([\w-]+)\s*:\s*([^;]+);/;
          const m = vRe.exec(l);
          if (m) vars.push({ name: m[1], value: m[2].trim() });
        }
        if (vars.length > 0) {
          categories[keyFor(sectionTitle)] = { title: sectionTitle, vars };
        }
      }
      sectionTitle = null;
      inComment = true;
      inContent = false;
      buffer = [];
      continue;
    }

    // Inside the comment block
    if (inComment) {
      // Detect closing: =====... */
      if (/={5,}\s*\*\//.test(trimmed) || (trimmed.startsWith("=") && trimmed.endsWith("*/"))) {
        inComment = false;
        if (sectionTitle) {
          inContent = true;
          buffer = [];
        }
        continue;
      }
      // Read title (first meaningful line in the comment that is not a comment line)
      if (!sectionTitle && trimmed && !trimmed.startsWith("*")) {
        sectionTitle = trimmed.replace(/\s*\([^)]*\)\s*$/, "").trim();
      }
      continue;
    }

    // In content section: collect lines until next section
    if (inContent) {
      buffer.push(line);
    }
  }

  // Handle last section
  if (inContent && sectionTitle) {
    const vars = [];
    for (const l of buffer) {
      const vRe = /--([\w-]+)\s*:\s*([^;]+);/;
      const m = vRe.exec(l);
      if (m) vars.push({ name: m[1], value: m[2].trim() });
    }
    if (vars.length > 0) {
      categories[keyFor(sectionTitle)] = { title: sectionTitle, vars };
    }
  }

  return categories;
}

// ============================================================
//  2. 生成 Design Tokens .md
// ============================================================
function generateTokenMD(categories) {
  const order = [
    "颜色",
    "字体",
    "间距",
    "圆角",
    "阴影",
    "布局",
    "z-index",
  ];

  const fileMap = {
    颜色: "colors",
    字体: "typography",
    间距: "spacing",
    圆角: "radius",
    阴影: "shadow",
    布局: "layout",
    "z-index": "z-index",
  };

  const docDir = path.join(ROOT, "docs/design-tokens");

  for (const cat of order) {
    const key = cat.toLowerCase().replace(/[\s/]+/g, "_");
    const data = categories[key];
    if (!data) continue;

    const filename = fileMap[cat] || key;
    const slug = filename;

    let md = `# ${data.title}\n\n`;
    md += `> 新材道设计系统 — ${cat} Token\n\n`;
    md += "## Token 列表\n\n";
    md += "| Token | 值 | 说明 |\n|------|-----|------|\n";

    for (const v of data.vars) {
      const desc = describeToken(v.name, v.value, cat);
      md += `| \`--${v.name}\` | \`${v.value}\` | ${desc} |\n`;
    }

    md += "\n## CSS 使用方式\n\n```css\n/* 直接在样式文件中引用 */\n.element {\n";
    md += `  ${getSampleProp(cat)}: var(--${data.vars[0].name});\n`;
    md += "}\n```\n\n";

    if (cat === "颜色") {
      md += `## 颜色预览\n\n`;
      for (const v of data.vars) {
        md += `<span style="display:inline-block;width:16px;height:16px;background:${v.value};border:1px solid #e5e7eb;vertical-align:middle;margin-right:8px;border-radius:2px;"></span> `;
        md += `\`--${v.name}\` = ${v.value}\n\n`;
      }
    }

    if (cat === "字体") {
      md += `## 字号行高对照\n\n`;
      md += "| 层级 | 字号 | 行高 | 行高比 | 字重 |\n|------|------|------|--------|------|\n";
      const typeMap = [
        ["Display/L", "56px", "64px", "1.14", "700"],
        ["Heading/H1", "40px", "48px", "1.2", "600"],
        ["Heading/H2", "32px", "40px", "1.25", "600"],
        ["Heading/H3", "24px", "32px", "1.33", "500"],
        ["Heading/H4", "20px", "28px", "1.4", "500"],
        ["Heading/H5", "18px", "26px", "1.44", "500"],
        ["Body/L", "16px", "24px", "1.5", "400"],
        ["Body/M", "14px", "22px", "1.57", "400"],
        ["Body/S", "13px", "20px", "1.54", "400"],
        ["Caption", "12px", "18px", "1.5", "400"],
      ];
      for (const [level, size, lh, ratio, weight] of typeMap) {
        md += `| ${level} | ${size} | ${lh} | ${ratio} | ${weight} |\n`;
      }

      md += `\n## 字体栈\n\n`;
      md += "```css\n";
      md += `font-family: "PingFang SC", "Microsoft YaHei", "Source Han Sans CN",\n`;
      md += `             ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,\n`;
      md += `             "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;\n`;
      md += "```\n";
    }

    if (cat === "间距") {
      md += `## 间距使用原则\n\n`;
      md += `- **xs (4px)** — 图标与文字极小间距\n`;
      md += `- **sm (8px)** — 按钮内部元素 / 标签内边距\n`;
      md += `- **md (16px)** — 表单项间距 / 卡片内边距\n`;
      md += `- **lg (24px)** — 模块内部区块间距\n`;
      md += `- **xl (32px)** — 页面区块常规间距\n`;
      md += `- **2xl (48px)** — 大模块分隔\n`;
      md += `- **3xl-4xl (64-96px)** — 官网大区块间距\n`;
    }

    if (cat === "圆角") {
      md += `## 圆角使用原则\n\n`;
      md += `| 层级 | 圆角 | 适用场景 |\n|------|------|----------|\n`;
      md += `| radius-sm | 2px | 按钮、输入框、选择器、标签等交互控件 — **组件默认圆角** |\n`;
      md += `| radius-md | 4px | 卡片容器、弹窗内容区、分组容器 |\n`;
      md += `| radius-lg | 8px | 大卡片、浮层、对话框 |\n`;
      md += `| radius-xl | 12px | 官网营销卡片、展示容器（后台慎用） |\n`;
      md += `| radius-2xl | 16px | 官网品牌展示模块（后台慎用） |\n`;
      md += `| radius-full | 9999px | 胶囊标签、头像、圆形按钮 |\n`;
    }

    if (cat === "z-index") {
      md += `## 层级说明\n\n`;
      md += `| Token | 值 | 适用场景 |\n|------|-----|----------|\n`;
      for (const v of data.vars) {
        const desc = describeToken(v.name, v.value, cat);
        md += `| \`--${v.name}\` | \`${v.value}\` | ${desc} |\n`;
      }
      md += `\n> 层级间隔为 100，方便未来在中间插入新层级而不冲突。\n`;
    }

    fs.writeFileSync(path.join(docDir, `${slug}.md`), md, "utf-8");
    console.log(`  ✓ docs/design-tokens/${slug}.md`);
  }
}

function describeToken(name, value, cat) {
  const map = {
    "brand-50": "最浅背景",
    "brand-100": "浅背景",
    "brand-200": "辅助强调",
    "brand-300": "装饰描边",
    "brand-400": "悬停辅助",
    "brand-500": "悬停态",
    "brand-600": "品牌主色",
    "brand-700": "按下态",
    "brand-800": "深色文字",
    "brand-900": "极深装饰",
    "product-blue-50": "页面浅背景",
    "product-blue-100": "信息背景",
    "product-blue-200": "弱强调",
    "product-blue-300": "浅交互态",
    "product-blue-400": "辅助功能",
    "product-blue-500": "功能主色",
    "product-blue-600": "Hover",
    "product-blue-700": "Active",
    "product-blue-800": "深色重点",
    "product-blue-900": "深色背景",
    "neutral-50": "页面底色",
    "neutral-100": "卡片背景",
    "neutral-200": "分割线/边框",
    "neutral-300": "输入框边框",
    "neutral-400": "Placeholder",
    "neutral-500": "次级文字/图标",
    "neutral-600": "辅助文字",
    "neutral-700": "次标题",
    "neutral-800": "主正文",
    "neutral-900": "标题/主行动",
    "success-text": "成功文字",
    "success-bg": "成功背景",
    "success-tag": "成功标签",
    "warning-text": "警告文字",
    "warning-bg": "警告背景",
    "warning-tag": "警告标签",
    "error-text": "错误文字",
    "error-bg": "错误背景",
    "error-tag": "错误标签",
    "info-text": "信息文字",
    "info-bg": "信息背景",
    "info-tag": "信息标签",
    "z-dropdown": "下拉菜单",
    "z-sticky": "粘性定位",
    "z-overlay": "遮罩层",
    "z-modal": "弹窗",
    "z-toast": "消息提示",
    "z-tooltip": "工具提示",
  };
  // spacing: extract number
  if (name.startsWith("spacing-")) {
    const size = name.replace("spacing-", "");
    const sizes = { xs: "极小", sm: "小", md: "中", lg: "大", xl: "较大", "2xl": "大", "3xl": "很大", "4xl": "极大" };
    return `${sizes[size] || size}间距`;
  }
  // radius
  if (name.startsWith("radius-")) {
    const r = name.replace("radius-", "");
    const usage = {
      none: "表格/数据网格",
      sm: "交互控件（按钮/输入框等）",
      md: "卡片/弹窗容器",
      lg: "大卡片/浮层",
      xl: "官网营销展示",
      "2xl": "品牌展示模块",
      full: "胶囊/头像/圆形",
    };
    return usage[r] || "圆角";
  }
  // shadow
  if (name.startsWith("shadow-")) {
    const s = name.replace("shadow-", "");
    const usage = { xs: "极轻微（按钮悬停）", sm: "轻微（卡片）", md: "中等（浮层）", lg: "较重（弹窗）", xl: "重（大浮层）", "2xl": "最重（特殊强调）" };
    return usage[s] || "阴影";
  }
  // type
  if (name.startsWith("type-")) {
    const parts = name.replace("type-", "").split("-");
    return parts.join(" ");
  }
  // layout
  if (name.startsWith("layout-")) {
    const parts = name.replace("layout-", "").split("-");
    return parts.join(" ");
  }
  if (name.startsWith("docs-")) return name.replace("docs-", "").replace(/-/g, " ");

  return map[name] || "";
}

function getSampleProp(cat) {
  const map = {
    颜色: "color",
    字体: "font-size",
    间距: "gap",
    圆角: "border-radius",
    阴影: "box-shadow",
    布局: "max-width",
    "z-index": "z-index",
  };
  return map[cat] || "/* property */";
}

// ============================================================
//  3. 生成组件规范 .md（含 Vue 3 示例）
// ============================================================
const components = [
  {
    name: "Switch",
    title: "开关 Switch",
    desc: "用于切换开关状态，常用于功能启停、权限开关等二选一场景。",
    props: [
      ["label", "string", "—", "标签文字"],
      ["size", "'sm' | 'md'", "'md'", "尺寸"],
      ["disabled", "boolean", "false", "禁用"],
    ],
    guidelines: [
      { type: "do", text: "Switch 用于二选一场景，不需要额外的确认按钮" },
      { type: "dont", text: "不要用 Switch 代替提交操作，它应该立即生效" },
    ],
  },
  {
    name: "Checkbox",
    title: "复选框 Checkbox",
    desc: "用于多选场景，支持选中、未选中和禁用状态。",
    props: [
      ["label", "string", "—", "标签文字"],
      ["defaultChecked", "boolean", "false", "默认选中"],
      ["disabled", "boolean", "false", "禁用"],
    ],
    guidelines: [
      { type: "do", text: "Checkbox 用于多选，同一组中可选中多个" },
      { type: "dont", text: "不要用 Checkbox 代替 Switch（开关动作）" },
    ],
  },
  {
    name: "Radio",
    title: "单选框 Radio",
    desc: "用于单选场景，同一组中只能选择一个选项。",
    props: [
      ["name", "string", "—", "互斥组名称"],
      ["label", "string", "—", "标签文字"],
      ["disabled", "boolean", "false", "禁用"],
    ],
    guidelines: [
      { type: "do", text: "同一 name 的 Radio 自动形成互斥组" },
      { type: "dont", text: "选项少于 3 个时建议使用 Select 代替" },
    ],
  },
  {
    name: "Textarea",
    title: "文本域 Textarea",
    desc: "用于多行文本输入，支持 label、helper text 和 error 态。",
    props: [
      ["label", "string", "—", "标签文字"],
      ["inputSize", "'sm' | 'md' | 'lg'", "'md'", "尺寸"],
      ["helperText", "string", "—", "帮助文字"],
      ["error", "string", "—", "错误提示"],
      ["disabled", "boolean", "false", "禁用"],
    ],
    guidelines: [
      { type: "do", text: "Textarea 用于超过一行文本的输入场景" },
      { type: "dont", text: "单行输入使用 Input 组件而非 Textarea" },
    ],
  },
  {
    name: "Toast",
    title: "消息提示 Toast",
    desc: "用于操作后的轻量反馈，自动消失，不打断用户操作流程。",
    props: [
      ["variant", "'success' | 'error' | 'warning' | 'info'", "—", "类型"],
      ["title", "string", "—", "标题"],
      ["description", "string", "—", "描述"],
    ],
    guidelines: [
      { type: "do", text: "Toast 用于操作结果反馈，自动 4 秒消失" },
      { type: "dont", text: "不要用 Toast 展示需要用户确认的信息" },
    ],
  },
  {
    name: "Button",
    title: "按钮 Button",
    desc: "按钮用于触发操作。有 solid / outline / ghost / text 四种层级和 neutral / product / brand / danger 四种色彩语义。",
    vueCode: `<template>
  <button
    class="btn"
    :class="[variantClass, toneClass, sizeClass, { loading, disabled: disabled || loading }]"
    :disabled="disabled || loading"
    :type="type"
    @click="$emit('click', $event)"
  >
    <svg v-if="loading" class="spinner" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.25"/>
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>
    <slot v-if="iconPosition !== 'right'" name="icon" />
    <span v-if="$slots.default"><slot /></span>
    <slot v-if="iconPosition === 'right'" name="icon" />
  </button>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'solid' },
  tone: { type: String, default: 'neutral' },
  size: { type: String, default: 'md' },
  disabled: Boolean,
  loading: Boolean,
  iconPosition: { type: String, default: 'left' },
  type: { type: String, default: 'button' },
});
defineEmits(['click']);
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--radius-sm);
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.15s ease;
  cursor: pointer;
  border: none;
  line-height: 1;
}
.btn.disabled { opacity: 0.5; cursor: not-allowed; }
.btn.loading { cursor: wait; }
.spinner { width: 16px; height: 16px; animation: spin 0.6s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* 尺寸 */
.size-sm { height: 28px; padding: 0 12px; font-size: 14px; }
.size-md { height: 32px; padding: 0 16px; font-size: 14px; }
.size-lg { height: 36px; padding: 0 20px; font-size: 14px; }

/* 类型: solid */
.variant-solid.tone-neutral { background: var(--neutral-900); color: #fff; }
.variant-solid.tone-neutral:hover { background: var(--neutral-800); }
.variant-solid.tone-product { background: var(--product-blue-500); color: #fff; }
.variant-solid.tone-product:hover { background: var(--product-blue-600); }
.variant-solid.tone-brand { background: var(--brand-600); color: #fff; }
.variant-solid.tone-brand:hover { background: var(--brand-700); }
.variant-solid.tone-danger { background: var(--error-text); color: #fff; }

/* 类型: outline */
.variant-outline {
  background: #fff;
  border: 1px solid var(--neutral-900);
  color: var(--neutral-900);
}
.variant-outline.tone-product { border-color: var(--product-blue-500); color: var(--product-blue-500); }
.variant-outline.tone-brand { border-color: var(--brand-600); color: var(--brand-600); }

/* 类型: ghost */
.variant-ghost.tone-neutral { background: var(--neutral-100); color: var(--neutral-900); }

/* 类型: text */
.variant-text.tone-neutral { background: transparent; color: var(--neutral-900); }
.variant-text.tone-text:hover { background: var(--neutral-50); }
</style>`,
    props: [
      ["variant", "'solid' | 'outline' | 'ghost' | 'text'", "'solid'", "视觉层级"],
      ["tone", "'neutral' | 'product' | 'brand' | 'danger'", "'neutral'", "色彩语义"],
      ["size", "'sm' | 'md' | 'lg' | 'xl' | '2xl'", "'md'", "尺寸"],
      ["disabled", "boolean", "false", "禁用状态"],
      ["loading", "boolean", "false", "加载状态"],
      ["iconPosition", "'left' | 'right'", "'left'", "图标位置"],
    ],
    guidelines: [
      { type: "do", text: "每个区域只放一个主按钮（solid），突出最重要操作" },
      { type: "do", text: "使用动词开头文案，如「提交订单」「新建项目」" },
      { type: "do", text: "黑色用于主行动，产品蓝用于功能，品牌红仅限官网营销" },
      { type: "dont", text: "不要在同一组中混用多种颜色的主按钮" },
      { type: "dont", text: "不要把 product 称为「次按钮」——蓝色是业务语义，不是层级" },
      { type: "dont", text: "不要在后台常规操作中滥用品牌红" },
    ],
  },
  {
    name: "Input",
    title: "输入框 Input",
    desc: "用于文本输入，支持 label、helper text、error 态和内嵌图标。",
    props: [
      ["(原生 input 属性)", "—", "—", "透传原生 input 属性"],
      ["label", "string", "—", "标签文字"],
      ["helperText", "string", "—", "帮助文字"],
      ["error", "string", "—", "错误提示（覆盖 helperText）"],
      ["size", "'sm' | 'md' | 'lg'", "'md'", "尺寸"],
      ["icon", "slot", "—", "前置图标"],
    ],
    guidelines: [
      { type: "do", text: "结合 label 一起使用，保证可访问性" },
      { type: "do", text: "error 态同时展示错误提示文字，不只靠颜色" },
      { type: "dont", text: "不要移除 focus 态边框，键盘导航依赖它" },
    ],
  },
  {
    name: "Select",
    title: "选择器 Select",
    desc: "下拉选择器，支持 label、placeholder、error 态。",
    props: [
      ["options", "Option[]", "[]", "选项列表 { label, value, disabled? }"],
      ["placeholder", "string", "—", "占位文案"],
      ["label", "string", "—", "标签文字"],
      ["error", "string", "—", "错误提示"],
      ["size", "'sm' | 'md' | 'lg'", "'md'", "尺寸"],
    ],
    guidelines: [
      { type: "do", text: "选项超过 15 个时建议添加搜索功能" },
      { type: "dont", text: "不要把 Select 当 Navigation 使用" },
    ],
  },
  {
    name: "Modal",
    title: "弹窗 Modal",
    desc: "用于承载需要用户关注或确认的内容，支持 title、description、footer 区域。",
    props: [
      ["open", "boolean", "false", "是否显示"],
      ["title", "string", "—", "标题"],
      ["description", "string", "—", "描述文字"],
      ["footer", "slot", "—", "底部操作区"],
      ["onClose", "function", "—", "关闭回调"],
    ],
    guidelines: [
      { type: "do", text: "弹窗标题 + 描述保持简洁，不超过 3 行" },
      { type: "do", text: "footer 左侧放取消、右侧放确认，符合用户习惯" },
      { type: "dont", text: "不要在一个页面同时打开多个弹窗" },
    ],
  },
  {
    name: "Table",
    title: "表格 Table",
    desc: "用于展示结构化数据。由 Table + TableHeader + TableBody + TableRow + TableHead + TableCell 组合使用。",
    props: [
      ["Table", "容器", "—", "表格根节点"],
      ["TableHeader", "thead", "—", "表头容器"],
      ["TableBody", "tbody", "—", "表体容器"],
      ["TableRow", "tr", "—", "行"],
      ["TableHead", "th", "—", "表头单元格"],
      ["TableCell", "td", "—", "数据单元格"],
    ],
    guidelines: [
      { type: "do", text: "表格内容使用 Body/M (14px)，表头使用 12px semibold" },
      { type: "dont", text: "不要合并过多列，保持横向可滚动" },
    ],
  },
  {
    name: "Tabs",
    title: "标签页 Tabs",
    desc: "用于在同一区域内切换不同视图。",
    props: [
      ["items", "TabItem[]", "[]", "标签项 { value, label, content, disabled? }"],
      ["value", "string", "—", "当前激活值（受控）"],
      ["onValueChange", "function", "—", "切换回调"],
    ],
    guidelines: [
      { type: "do", text: "Tabs 数量控制在 3-7 个，超过建议用 dropdown 收纳" },
      { type: "dont", text: "不要嵌套 Tabs，会导致视觉混乱" },
    ],
  },
  {
    name: "Tag",
    title: "标签 Tag",
    desc: "用于标记、分类和状态展示。支持 6 种色彩变体和 2 种尺寸。",
    props: [
      ["variant", "'neutral' | 'brand' | 'product' | 'success' | 'warning' | 'error'", "'neutral'", "色彩变体"],
      ["size", "'sm' | 'md'", "'md'", "尺寸"],
      ["icon", "slot", "—", "前置图标"],
    ],
    guidelines: [
      { type: "do", text: "success / warning / error 用于状态反馈" },
      { type: "do", text: "Tag 内部文字保持简洁，不超过 6 个字" },
      { type: "dont", text: "不要用 brand 红色 Tag 替代 error 语义" },
    ],
  },
  {
    name: "Card",
    title: "卡片 Card",
    desc: "用于承载一组相关内容，支持 header / title / description / content / footer 区域。",
    props: [
      ["Card", "根容器", "—", "白色背景、p-6、4px 圆角"],
      ["CardHeader", "头部", "—", "标题区域"],
      ["CardTitle", "标题", "—", "卡片标题"],
      ["CardDescription", "描述", "—", "卡片描述"],
      ["CardContent", "内容", "—", "主要内容区"],
      ["CardFooter", "底部", "—", "底部操作，带顶部分割线"],
    ],
    guidelines: [
      { type: "do", text: "卡片内部保持 24px 内边距" },
      { type: "dont", text: "不要在卡片内塞过多信息，一卡一主题" },
    ],
  },
  {
    name: "Pagination",
    title: "分页 Pagination",
    desc: "用于长列表分页导航。",
    props: [
      ["page", "number", "1", "当前页码"],
      ["total", "number", "—", "总页数"],
      ["onPageChange", "function", "—", "翻页回调"],
      ["disabled", "boolean", "false", "禁用"],
    ],
    guidelines: [
      { type: "do", text: "总页数超过 10 页时考虑省略号截断" },
      { type: "dont", text: "不要在移动端展示完整页码列表，用上一页/下一页即可" },
    ],
  },
];

function generateComponentMD() {
  const docDir = path.join(ROOT, "docs/components");

  for (const comp of components) {
    const slug = comp.name.toLowerCase();
    let md = `# ${comp.title}\n\n`;
    md += `> ${comp.desc}\n\n`;

    // Props table
    md += "## Props\n\n";
    md += "| 属性 | 类型 | 默认值 | 说明 |\n|------|------|--------|------|\n";
    for (const [name, type, def, desc] of comp.props) {
      md += `| \`${name}\` | \`${type}\` | \`${def || "—"}\` | ${desc} |\n`;
    }

    // Guidelines
    md += "\n## 使用指南\n\n";
    md += "### 推荐做法\n\n";
    for (const g of comp.guidelines.filter((g) => g.type === "do")) {
      md += `- ✅ ${g.text}\n`;
    }
    md += "\n### 避免做法\n\n";
    for (const g of comp.guidelines.filter((g) => g.type === "dont")) {
      md += `- ❌ ${g.text}\n`;
    }

    // Vue 3 example
    if (comp.vueCode) {
      md += `\n## Vue 3 示例代码\n\n`;
      md += "```vue\n" + comp.vueCode.trim() + "\n```\n";
    }

    // CSS 变量引用
    md += `\n## 依赖 Token\n\n`;
    md += "组件使用的设计变量（CSS Custom Properties）：\n\n";
    md += "| Token | 来源 |\n|-------|------|\n";
    const tokens = getComponentTokens(comp.name);
    for (const [token, source] of tokens) {
      md += `| \`--${token}\` | ${source} |\n`;
    }

    fs.writeFileSync(path.join(docDir, `${slug}.md`), md, "utf-8");
    console.log(`  ✓ docs/components/${slug}.md`);
  }
}

function getComponentTokens(name) {
  const shared = [
    ["radius-sm", "圆角 Token"],
    ["neutral-900", "颜色 Token"],
    ["neutral-800", "颜色 Token"],
    ["neutral-700", "颜色 Token"],
    ["neutral-600", "颜色 Token"],
    ["neutral-500", "颜色 Token"],
    ["neutral-400", "颜色 Token"],
    ["neutral-300", "颜色 Token"],
    ["neutral-200", "颜色 Token"],
    ["neutral-100", "颜色 Token"],
    ["neutral-50", "颜色 Token"],
  ];
  if (name === "Button") {
    return [
      ...shared,
      ["product-blue-500", "颜色 Token"],
      ["product-blue-600", "颜色 Token"],
      ["product-blue-700", "颜色 Token"],
      ["brand-600", "颜色 Token"],
      ["brand-700", "颜色 Token"],
      ["brand-800", "颜色 Token"],
      ["error-text", "语义色"],
      ["error-bg", "语义色"],
    ];
  }
  if (name === "Modal") {
    return [
      ...shared,
      ["z-modal", "Z-index Token"],
      ["neutral-600", "颜色 Token"],
    ];
  }
  return shared;
}

// ============================================================
//  4. 生成 Figma Tokens Studio JSON
// ============================================================
function generateFigmaTokens(categories) {
  const tokens = {};

  // Colors
  const colorCategories = ["颜色", "颜色_colors"];
  for (const key of Object.keys(categories)) {
    if (key.includes("颜色") || key.includes("color")) {
      const data = categories[key];
      const group = data.title.replace(/[\s()]+/g, "_");
      const prefix = group.includes("品牌") ? "brand" :
                     group.includes("产品蓝") ? "product-blue" :
                     group.includes("中性") ? "neutral" :
                     group.includes("语义") ? "semantic" : group.toLowerCase();

      for (const v of data.vars) {
        const name = v.name;
        // Only include actual color tokens (not docs aliases)
        if (name.startsWith("docs-")) continue;
        if (name.startsWith("success-") || name.startsWith("warning-") || name.startsWith("error-") || name.startsWith("info-")) {
          const subCat = name.split("-")[0];
          const subName = name.split("-").slice(1).join("-");
          tokens[`color/${subCat}/${subName}`] = { value: v.value, type: "color" };
        } else if (name.startsWith("brand-") || name.startsWith("product-blue-") || name.startsWith("neutral-")) {
          const parts = name.split("-");
          const cat = parts[0] === "product" ? "product-blue" : parts[0];
          const level = parts.slice(cat === "product-blue" ? 2 : 1).join("-");
          tokens[`color/${cat}/${level}`] = { value: v.value, type: "color" };
        }
      }
    }
  }

  // Spacing
  if (categories["间距"] || categories["spacing"]) {
    const data = categories["间距"] || categories["spacing"];
    for (const v of data.vars) {
      const name = v.name.replace("spacing-", "");
      tokens[`spacing/${name}`] = { value: v.value, type: "spacing" };
    }
  }

  // Border radius
  if (categories["圆角"] || categories["radius"]) {
    const data = categories["圆角"] || categories["radius"];
    for (const v of data.vars) {
      const name = v.name.replace("radius-", "");
      tokens[`border-radius/${name}`] = { value: v.value, type: "borderRadius" };
    }
  }

  // Shadows
  if (categories["阴影"] || categories["shadow"]) {
    const data = categories["阴影"] || categories["shadow"];
    for (const v of data.vars) {
      const name = v.name.replace("shadow-", "");
      tokens[`shadow/${name}`] = { value: v.value, type: "boxShadow" };
    }
  }

  // Typography - simplified
  const typeTokens = {
    "type/display/l": { fontSize: "56px", lineHeight: "64px", fontWeight: "700" },
    "type/heading/h1": { fontSize: "40px", lineHeight: "48px", fontWeight: "600" },
    "type/heading/h2": { fontSize: "32px", lineHeight: "40px", fontWeight: "600" },
    "type/heading/h3": { fontSize: "24px", lineHeight: "32px", fontWeight: "500" },
    "type/heading/h4": { fontSize: "20px", lineHeight: "28px", fontWeight: "500" },
    "type/heading/h5": { fontSize: "18px", lineHeight: "26px", fontWeight: "500" },
    "type/body/l": { fontSize: "16px", lineHeight: "24px", fontWeight: "400" },
    "type/body/m": { fontSize: "14px", lineHeight: "22px", fontWeight: "400" },
    "type/body/s": { fontSize: "13px", lineHeight: "20px", fontWeight: "400" },
    "type/caption": { fontSize: "12px", lineHeight: "18px", fontWeight: "400" },
  };

  for (const [key, val] of Object.entries(typeTokens)) {
    tokens[`typography/${key.replace(/\//g, ".")}`] = {
      value: {
        fontFamily: "PingFang SC",
        fontSize: val.fontSize,
        lineHeight: val.lineHeight,
        fontWeight: val.fontWeight,
      },
      type: "typography",
    };
  }

  // Z-index
  if (categories["z-index"] || categories["z_index"]) {
    const data = categories["z-index"] || categories["z_index"];
    for (const v of data.vars) {
      const name = v.name.replace("z-", "");
      tokens[`z-index/${name}`] = { value: v.value, type: "other" };
    }
  }

  const output = JSON.stringify(tokens, null, 2);
  fs.writeFileSync(path.join(ROOT, "figma/tokens.json"), output, "utf-8");
  console.log("  ✓ figma/tokens.json");
}

// ============================================================
//  Main
// ============================================================
console.log("🔨 导出 Design Tokens .md...");
const cats = parseTokens();
generateTokenMD(cats);

console.log("\n🔨 导出组件规范 .md...");
generateComponentMD();

console.log("\n🔨 导出 Figma Tokens...");
generateFigmaTokens(cats);

console.log("\n✅ 全部完成！");
console.log(`   ├── docs/design-tokens/  (${fs.readdirSync(path.join(ROOT, "docs/design-tokens")).filter(f => f.endsWith(".md")).length} 个文件)`);
console.log(`   ├── docs/components/     (${fs.readdirSync(path.join(ROOT, "docs/components")).filter(f => f.endsWith(".md")).length} 个文件)`);
console.log(`   └── figma/tokens.json`);
