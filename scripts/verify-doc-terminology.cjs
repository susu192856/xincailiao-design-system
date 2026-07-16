const fs = require("fs");
const path = require("path");

const root = path.join(process.cwd(), "src/pages/design-system");
const files = [];

function walk(directory) {
  for (const name of fs.readdirSync(directory)) {
    const file = path.join(directory, name);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) walk(file);
    else if (file.endsWith(".tsx")) files.push(file);
  }
}

walk(root);

// 英文眉题、代码块、Token 值与 API 表格允许保留英文；面向阅读者的标题、
// 说明和纯文本必须采用“中文（English）”或“English（中文）”。
const terms = [
  "Token", "API", "Tooltip", "Card", "Input", "Textarea", "Select",
  "Radio", "Checkbox", "Switch", "Modal", "Drawer", "Popover", "Toast", "Dropdown",
  "Small", "Medium", "Large", "Hover", "Active", "Focus", "Disabled", "Loading", "Default", "Task", "Product",
  "Brand", "Figma", "Codex", "AI", "SVG", "Hero", "CTA", "footer",
  "gap", "toast", "task", "product", "brand", "soft", "dot", "tone", "variant",
  "stable", "review", "draft", "eligible", "tokens", "manifest", "Gutter", "Margin",
];

const rawVisibleTerms = new Set([
  "Hover", "Active", "Disabled", "Loading", "Default",
  "Radio", "Checkbox", "Switch", "Modal", "Drawer", "Popover", "Tooltip", "Toast",
  "Plain", "Outlined", "Muted",
]);

const issues = [];

const sourceOrderPatterns = [
  /(?:来自|源自|提取自)既有\s*Figma/g,
  /以\s*Figma(?:（设计工具）)?(?:\s*规范|\s*文件|\s*设计稿)?\s*为准/g,
];

function isPaired(value, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`（[^）]*\\b${escaped}\\b[^）]*）|\\b${escaped}\\b（[^）]+）`).test(value);
}

function checkText(file, source, value, offset) {
  if (!value || value.includes("<") || value.includes("\\n") || value.includes("=") || value.includes("}")) return;
  if (/^[\w\s/.*#·-]+$/.test(value) && !/[\u4e00-\u9fff]/.test(value)) return;
  for (const term of terms) {
    if (!new RegExp(`\\b${term}\\b`).test(value) || isPaired(value, term)) continue;
    const line = source.slice(0, offset).split("\n").length;
    issues.push(`${path.relative(process.cwd(), file)}:${line} ${term} 未提供中英文对应：${value}`);
  }
}

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  for (const pattern of sourceOrderPatterns) {
    for (const match of source.matchAll(pattern)) {
      const line = source.slice(0, match.index).split("\n").length;
      issues.push(`${path.relative(process.cwd(), file)}:${line} Figma 来源关系倒置：本规范是规则源头，验收后再同步到 Figma。`);
    }
  }
  for (const match of source.matchAll(/(?:title|description|note|usage|advice|label|rule|text|caption|standard|suitable|handoff)\s*[:=]\s*"([^"]*)"/g)) {
    checkText(file, source, match[1], match.index);
    if (rawVisibleTerms.has(match[1])) {
      const line = source.slice(0, match.index).split("\n").length;
      issues.push(`${path.relative(process.cwd(), file)}:${line} 纯英文界面术语缺少中文名称：${match[1]}`);
    }
  }
  for (const match of source.matchAll(/>([^<{\n]*[A-Za-z][^<{\n]*)</g)) {
    checkText(file, source, match[1].trim(), match.index);
  }
}

if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}

console.log(`Terminology pairing passed for ${files.length} docs pages.`);
