const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(ROOT, file), "utf8");
const exists = (file) => fs.existsSync(path.join(ROOT, file));
const manifest = JSON.parse(read("figma/components.manifest.json"));
const figmaSync = JSON.parse(read("figma/sync.config.json"));
const errors = [];

const expectedCategories = new Set(["操作与输入", "数据与内容", "导航与组织", "反馈与浮层"]);
const basicRoutes = [
  { route: "/", appFragment: "<Route index element={<HomePage />} />" },
  { route: "/layout", appFragment: 'path="/layout"' },
  { route: "/design-system/colors", appFragment: 'path="/design-system"' },
  { route: "/typography", appFragment: 'path="/typography"' },
  { route: "/spacing", appFragment: 'path="/spacing"' },
  { route: "/shadow", appFragment: 'path="/shadow"' },
  { route: "/radius", appFragment: 'path="/radius"' },
];
const app = read("src/app/App.tsx");
const sidebar = read("src/components/docs/DocsSidebar.tsx");

if (manifest.version !== "0.2.0") errors.push("Manifest version must be 0.2.0.");
if (manifest.components.length !== 32) errors.push("Manifest must contain exactly 32 components.");
if (manifest.scope?.foundationCount !== undefined && manifest.scope?.foundationCount !== 7) errors.push("Manifest foundationCount must be 7.");
if (figmaSync.target?.fileKey !== "KjkKSAd9eufpg9eFR9xZVX") errors.push("Official Figma target must be v2.0.");

for (const { route, appFragment } of basicRoutes) {
  if (!sidebar.includes(`path: "${route}"`)) errors.push(`Sidebar missing foundation route ${route}.`);
  if (!app.includes(appFragment)) errors.push(`App missing foundation route ${route}.`);
}

for (const component of manifest.components) {
  const label = component.name;
  if (!expectedCategories.has(component.category)) errors.push(`${label}: invalid category.`);
  if (!component.contractVersion) errors.push(`${label}: missing contractVersion.`);
  if (!component.propDefinitions || component.propDefinitions.length !== component.props.length) {
    errors.push(`${label}: propDefinitions must match props.`);
  }
  if (!component.contract?.usage || !component.contract?.responsive || !component.contract?.accessibility) {
    errors.push(`${label}: incomplete design contract.`);
  }

  const slug = component.name === "Textarea" ? "input" : component.route.replace("/components/", "").split("#")[0];
  const doc = `docs/components/${slug}.md`;
  if (!exists(doc)) {
    errors.push(`${label}: missing Markdown doc.`);
    continue;
  }
  const source = read(doc);
  for (const heading of ["## 定位与边界", "## 结构 Anatomy", "## Props", "## 响应式", "## 可访问性", "## 示例要求"]) {
    if (!source.includes(heading)) errors.push(`${label}: doc missing ${heading}.`);
  }
  if (source.includes("具体使用以规范页面和源码为准")) {
    errors.push(`${label}: doc still contains placeholder prop text.`);
  }
}

const requiredTokens = [
  "--control-height-sm",
  "--focus-ring-color",
  "--motion-duration-normal",
  "--overlay-bg",
  "--touch-target-min",
  "--breakpoint-md",
  "--error-solid",
  "--success-solid",
  "--warning-solid",
  "--data-blue-2",
];
const tokenSource = read("src/styles/tokens.css");
for (const token of requiredTokens) {
  if (!tokenSource.includes(token)) errors.push(`Missing required token ${token}.`);
}

const legacySemanticHexes = ["#10B981", "#F59E0B", "#EF4444"];
const semanticAuditFiles = [
  "src/components/docs/CopyableColorValue.tsx",
  "src/pages/design-system/components/ButtonPage.tsx",
  ...fs.readdirSync(path.join(ROOT, "src/components/ui")).map((file) => `src/components/ui/${file}`),
  ...fs.readdirSync(path.join(ROOT, "packages/vue-ui/src/components")).map((file) => `packages/vue-ui/src/components/${file}`),
];
for (const file of semanticAuditFiles) {
  const source = read(file);
  for (const hex of legacySemanticHexes) {
    if (source.includes(hex)) errors.push(`${file}: legacy semantic hex ${hex} must use a semantic token.`);
  }
}

const skillTokens = JSON.parse(read("skills/xincailiao-design-spec/assets/design-tokens.json"));
const figmaTokens = JSON.parse(read("figma/tokens.json"));
const skillContracts = JSON.parse(read("skills/xincailiao-design-spec/assets/component-contracts.json"));
if (JSON.stringify(skillTokens) !== JSON.stringify(figmaTokens)) {
  errors.push("Skill design-tokens asset is not synchronized with figma/tokens.json.");
}
if (JSON.stringify(skillContracts) !== JSON.stringify(manifest)) {
  errors.push("Skill component-contracts asset is not synchronized with the manifest.");
}

if (errors.length) {
  console.error("Design-system verification failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Checked 32 component contracts, 7 foundations and shared design-system rules.");
