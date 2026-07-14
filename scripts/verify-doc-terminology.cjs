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
  "Small", "Medium", "Large", "Hover", "Focus", "Task", "Product",
  "Brand", "Figma", "Codex", "AI", "SVG", "Hero", "CTA", "footer",
  "gap", "toast", "task", "product", "brand", "soft", "dot", "tone", "variant",
];

const issues = [];

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
  for (const match of source.matchAll(/(?:title|description)="([^"]*)"/g)) {
    checkText(file, source, match[1], match.index);
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
