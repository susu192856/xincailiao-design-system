const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const errors = [];
const read = (file) => fs.readFileSync(path.join(ROOT, file), "utf8");

// These pages describe controls that change state, data, selection, navigation,
// or floating UI. They need a real interaction plus a nearby collapsed code entry.
const interactivePages = [
  "src/pages/design-system/components/ButtonPage.tsx",
  "src/pages/design-system/components/CardPage.tsx",
  "src/pages/design-system/components/CheckboxPage.tsx",
  "src/pages/design-system/components/CollapsePage.tsx",
  "src/pages/design-system/components/DatePickerPage.tsx",
  "src/pages/design-system/components/DrawerPage.tsx",
  "src/pages/design-system/components/FormPage.tsx",
  "src/pages/design-system/IconPage.tsx",
  "src/pages/design-system/components/InputPage.tsx",
  "src/pages/design-system/components/MenuPage.tsx",
  "src/pages/design-system/components/ModalPage.tsx",
  "src/pages/design-system/components/PaginationPage.tsx",
  "src/pages/design-system/components/PopoverPage.tsx",
  "src/pages/design-system/components/RadioPage.tsx",
  "src/pages/design-system/components/SelectPage.tsx",
  "src/pages/design-system/components/SwitchPage.tsx",
  "src/pages/design-system/components/TablePage.tsx",
  "src/pages/design-system/components/TabsPage.tsx",
  "src/pages/design-system/components/TagPage.tsx",
  "src/pages/design-system/components/ToastPage.tsx",
  "src/pages/design-system/components/TooltipPage.tsx",
  "src/pages/design-system/components/TransferPage.tsx",
  "src/pages/design-system/components/TreePage.tsx",
  "src/pages/design-system/components/UploadPage.tsx",
];

const interactionPattern = /\binteractive\b|title="即时体验"|useState\s*\(|on(?:Click|Change|ValueChange|Close)=|default(?:Checked|OpenKeys|SelectedKey)\b/;

for (const file of interactivePages) {
  const source = read(file);
  const codeIndex = Math.max(source.lastIndexOf("<CodeBlock"), source.lastIndexOf("code={`"));
  const guidelinesIndex = source.indexOf('eyebrow="Guidelines"');

  if (!interactionPattern.test(source)) {
    errors.push(`${file}: missing a real interactive example.`);
  }
  if (codeIndex < 0) {
    errors.push(`${file}: missing a collapsed implementation code entry.`);
  }
  if (guidelinesIndex >= 0 && codeIndex > guidelinesIndex) {
    errors.push(`${file}: implementation code must be placed with the example, before final guidelines.`);
  }

  const header = source.match(/<PageHeader[\s\S]*?\/>/)?.[0] ?? "";
  if (/设计师|前端|开发者|产品经理/.test(header)) {
    errors.push(`${file}: PageHeader must use shared audience-neutral language.`);
  }
}

const visualPages = [
  "src/pages/design-system/components/AvatarPage.tsx",
  "src/pages/design-system/components/BadgePage.tsx",
  "src/pages/design-system/components/BreadcrumbPage.tsx",
  "src/pages/design-system/components/ChartPage.tsx",
  "src/pages/design-system/components/DescriptionListPage.tsx",
  "src/pages/design-system/components/EmptyPage.tsx",
  "src/pages/design-system/components/ImagePage.tsx",
];

for (const file of visualPages) {
  const source = read(file);
  if (!/ExampleCard|(?:Bar|Line|Pie|Radar|Scatter|Area)Chart|<svg\b|<img\b|<Image\b/.test(source)) {
    errors.push(`${file}: visual-reference page needs a rendered specimen, not text alone.`);
  }
}

if (!fs.existsSync(path.join(ROOT, "docs/DOCS_EXPERIENCE_AUDIT.md"))) {
  errors.push("docs/DOCS_EXPERIENCE_AUDIT.md: missing global experience audit.");
}

if (errors.length) {
  console.error("Documentation experience verification failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Experience gate passed: ${interactivePages.length} interactive pages and ${visualPages.length} visual-reference pages.`);
