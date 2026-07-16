const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const errors = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return fullPath;
  });
}

function rel(file) {
  return path.relative(ROOT, file);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

const pageFiles = walk(path.join(ROOT, "src/pages")).filter((file) => /\.(tsx|ts)$/.test(file));
const docsFiles = walk(path.join(ROOT, "src/components/docs")).filter((file) => /\.(tsx|ts|css)$/.test(file));
const foundationPageNames = new Set([
  "HomePage.tsx",
  "ColorsPage.tsx",
  "SpacingPage.tsx",
  "TypographyPage.tsx",
  "RadiusPage.tsx",
  "ShadowPage.tsx",
  "LayoutPage.tsx",
  "DeliveryPage.tsx",
]);

for (const file of pageFiles) {
  const source = read(file);
  const label = rel(file);

  if (/<table\b/.test(source)) {
    errors.push(`${label}: docs pages must use DocsTable for explanatory tables instead of raw <table>.`);
  }

  const riskyHeadingMarkers = [
    /h-2\s+w-2\s+bg-\[var\(--brand-600\)\]/,
    /h-2\s+w-2\s+bg-\[var\(--product-blue-500\)\]/,
    /h-2\s+w-2\s+bg-\[var\(--neutral-900\)\]/,
    /h-3\s+w-0\.5\s+shrink-0\s+bg-\[var\(--brand-600\)\]/,
    /h-5\s+w-0\.5\s+shrink-0\s+bg-\[var\(--brand-600\)\]/,
  ];

  if (riskyHeadingMarkers.some((pattern) => pattern.test(source))) {
    errors.push(`${label}: use SectionHeading/SubsectionHeading instead of local red/blue heading markers.`);
  }

  if (foundationPageNames.has(path.basename(file))) {
    const sectionHeadingTags = source.match(/<SectionHeading\b[\s\S]*?(?:\/>|>)/g) ?? [];
    for (const tag of sectionHeadingTags) {
      if (!/\beyebrow=/.test(tag)) {
        errors.push(`${label}: every foundation SectionHeading must include an English eyebrow label.`);
        break;
      }
    }

    const docsTableBlocks = source.match(/<DocsTable\b[\s\S]*?<\/DocsTable>/g) ?? [];
    for (const block of docsTableBlocks) {
      if (/<(?:thead|tbody|tr|th|td)\b[^>]*className=["'][^"']*(?:text-xs|text-sm|px-|py-)/.test(block)) {
        errors.push(`${label}: DocsTable typography and cell spacing must be owned by DocsTable, not page-level text/px/py utilities.`);
        break;
      }
    }
  }
}

const docsTable = read(path.join(ROOT, "src/components/docs/DocsTable.tsx"));
const pageHeader = read(path.join(ROOT, "src/components/docs/PageHeader.tsx"));
const componentDoc = read(path.join(ROOT, "src/components/docs/ComponentDoc.tsx"));
const globals = read(path.join(ROOT, "src/styles/globals.css"));
const app = read(path.join(ROOT, "src/app/App.tsx"));
const sidebar = read(path.join(ROOT, "src/components/docs/DocsSidebar.tsx"));
const manifest = JSON.parse(read(path.join(ROOT, "figma/components.manifest.json")));

const operationInputPages = [
  "src/pages/design-system/components/ButtonPage.tsx",
  "src/pages/design-system/IconPage.tsx",
  "src/pages/design-system/components/InputPage.tsx",
  "src/pages/design-system/components/FormPage.tsx",
  "src/pages/design-system/components/SelectPage.tsx",
  "src/pages/design-system/components/DatePickerPage.tsx",
  "src/pages/design-system/components/RadioPage.tsx",
  "src/pages/design-system/components/CheckboxPage.tsx",
  "src/pages/design-system/components/SwitchPage.tsx",
];

for (const relativePath of operationInputPages) {
  const source = read(path.join(ROOT, relativePath));
  if (!source.includes("CodeBlock")) {
    errors.push(`${relativePath}: operation and input pages must provide a collapsible implementation code entry.`);
  }
}

for (const relativePath of [
  "src/pages/design-system/components/ButtonPage.tsx",
  "src/pages/design-system/components/InputPage.tsx",
  "src/pages/design-system/components/SelectPage.tsx",
  "src/pages/design-system/components/DatePickerPage.tsx",
]) {
  const source = read(path.join(ROOT, relativePath));
  if (!source.includes('title="即时体验"')) {
    errors.push(`${relativePath}: multi-property controls must provide an interactive playground.`);
  }
}

if (!docsTable.includes("docs-table")) {
  errors.push("DocsTable must expose the docs-table class for shared typography and spacing.");
}

if (!docsTable.includes("rounded-[var(--radius-none)]")) {
  errors.push("DocsTable must use radius-none so explanatory tables follow the data-grid rule.");
}

if (!pageHeader.includes("rounded-[var(--radius-md)]")) {
  errors.push("PageHeader must use radius-md as a page-level content surface.");
}

for (const sharedSurface of ["SectionCard", "ExampleCard", "RuleCallout", "SpecList"]) {
  if (!componentDoc.includes(sharedSurface)) {
    errors.push(`ComponentDoc must keep the shared ${sharedSurface} surface.`);
  }
}

if ((componentDoc.match(/rounded-\[var\(--radius-md\)\]/g) ?? []).length < 4) {
  errors.push("Shared documentation cards, callouts and spec rows must use radius-md.");
}

for (const requiredRule of [".docs-table th", ".docs-table td", ".docs-table td:first-child"]) {
  if (!globals.includes(requiredRule)) {
    errors.push(`src/styles/globals.css: missing shared table rule ${requiredRule}.`);
  }
}

if (!/\.docs-table th\s*\{[\s\S]*font-size:\s*var\(--type-body-m-size\)/.test(globals)) {
  errors.push("src/styles/globals.css: DocsTable header font size must match body size.");
}

if (!/\.docs-table td code,\s*[\s\S]*?\.docs-table \.font-mono\s*\{[\s\S]*font-size:\s*var\(--type-body-m-size\)/.test(globals)) {
  errors.push("src/styles/globals.css: DocsTable mono/file cells must match body font size.");
}

if (!/\.font-data\s*\{[\s\S]*D-DIN-Pro/.test(globals) || !/\.docs-table td\.font-data/.test(globals)) {
  errors.push("src/styles/globals.css: data numbers need a shared D-DIN-Pro font-data rule, including DocsTable cells.");
}

const typographyPage = read(path.join(ROOT, "src/pages/design-system/TypographyPage.tsx"));
if (!typographyPage.includes("<DocsTable")) {
  errors.push("src/pages/design-system/TypographyPage.tsx: type scale table must use DocsTable.");
}
if (!typographyPage.includes("min-w-[980px]") || !typographyPage.includes("whitespace-nowrap")) {
  errors.push("src/pages/design-system/TypographyPage.tsx: type scale table must preserve a non-wrapping horizontal-scroll layout.");
}
if (!docsTable.includes("overflow-x-auto")) {
  errors.push("DocsTable must allow horizontal scrolling when explanatory tables exceed the viewport.");
}

const spacingPage = read(path.join(ROOT, "src/pages/design-system/SpacingPage.tsx"));
const layoutPage = read(path.join(ROOT, "src/pages/design-system/LayoutPage.tsx"));
const radiusPage = read(path.join(ROOT, "src/pages/design-system/RadiusPage.tsx"));
const shadowPage = read(path.join(ROOT, "src/pages/design-system/ShadowPage.tsx"));
const iconPage = read(path.join(ROOT, "src/pages/design-system/IconPage.tsx"));
const buttonPage = read(path.join(ROOT, "src/pages/design-system/components/ButtonPage.tsx"));

if (!componentDoc.includes("MeasurementLabel") || !spacingPage.includes("MeasurementLabel") || !layoutPage.includes("MeasurementLabel")) {
  errors.push("Measurement annotations must use the shared yellow MeasurementLabel across spacing and layout pages.");
}
if (!iconPage.includes('weight="fill"') || !iconPage.includes('zhName: "提示信息"')) {
  errors.push("src/pages/design-system/IconPage.tsx: status icons must use filled semantic colors and the 提示信息 label.");
}
if (!buttonPage.includes('to="/design-system/colors#task-product-choice"') || !buttonPage.includes('className="xl:col-span-2"')) {
  errors.push("src/pages/design-system/components/ButtonPage.tsx: button tone decisions must link to Colors and danger must span the semantic grid.");
}
if (!(spacingPage.indexOf('title="场景间距配方"') < spacingPage.indexOf('title="间距设计变量（Token）"') && spacingPage.indexOf('title="间距设计变量（Token）"') < spacingPage.indexOf('title="最佳实践"'))) {
  errors.push("src/pages/design-system/SpacingPage.tsx: spacing tokens must sit between scene recipes and best practices.");
}
if (!(radiusPage.indexOf('title="圆角视觉示例"') < radiusPage.indexOf('title="圆角设计变量（Token）"') && radiusPage.indexOf('title="圆角设计变量（Token）"') < radiusPage.indexOf('title="最佳实践"'))) {
  errors.push("src/pages/design-system/RadiusPage.tsx: radius preview must precede tokens and best practices.");
}
if (shadowPage.includes('title="阴影规范"') || !shadowPage.includes("{shadow.usage}") || !(shadowPage.indexOf('title="组件 × 阴影等级"') < shadowPage.indexOf('title="最佳实践"'))) {
  errors.push("src/pages/design-system/ShadowPage.tsx: shadow usage belongs in the preview and component mapping must precede best practices.");
}
if (typographyPage.includes("title=\"数字与代码\"") || typographyPage.includes("Token 与代码名称")) {
  errors.push("src/pages/design-system/TypographyPage.tsx: font family cards must separate data numbers from Token/code naming.");
}
if (!typographyPage.includes("title=\"特殊数字\"") || !typographyPage.includes("D-DIN-Pro，用于数据")) {
  errors.push("src/pages/design-system/TypographyPage.tsx: data number card must state D-DIN-Pro is used for data.");
}
if (!typographyPage.includes("className=\"font-token\"")) {
  errors.push("src/pages/design-system/TypographyPage.tsx: type scale table must apply font-token roles.");
}

if (!docsFiles.some((file) => read(file).includes("SubsectionHeading"))) {
  errors.push("src/components/docs: missing shared SubsectionHeading for local section titles.");
}

if (!app.includes('path="/delivery"') || !sidebar.includes('path: "/delivery"')) {
  errors.push("Delivery and sync page must be registered in App routes and DocsSidebar.");
}

const syncedComponents = manifest.components.filter((component) => component.figma?.syncStatus === "synced");
if (syncedComponents.length > 0) {
  errors.push(`Figma component sync is paused until visual audit is complete: ${syncedComponents.map((component) => component.name).join(", ")}.`);
}

if (errors.length) {
  console.error("Visual governance verification failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Visual governance passed for ${pageFiles.length} docs pages.`);
