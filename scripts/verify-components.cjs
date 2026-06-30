/**
 * Component contract verification for docs, Figma handoff, React source, and Vue source.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(ROOT, file));
}

function routeToDoc(component) {
  if (component.name === "Textarea") return "docs/components/input.md";
  return `docs/components/${component.route.replace(/^\/components\//, "").split("#")[0]}.md`;
}

function routeToPage(component) {
  if (component.name === "Icon") return "src/pages/design-system/IconPage.tsx";
  if (component.name === "Textarea") return "src/pages/design-system/components/InputPage.tsx";
  return `src/pages/design-system/components/${component.name}Page.tsx`;
}

function vueExportName(vueSource) {
  return path.basename(vueSource, ".vue");
}

function componentNameFromSource(source) {
  return path.basename(source, ".tsx");
}

function importsUiSource(pageSource, reactName) {
  return (
    pageSource.includes(`components/ui/${reactName}`) ||
    new RegExp(`import\\s+\\{[^}]*\\b${reactName}\\b[^}]*\\}\\s+from\\s+["'][^"']*components/ui["']`).test(pageSource)
  );
}

function usesUiComponentFamily(pageSource, reactName) {
  const jsxTagPattern = new RegExp(`<${reactName}\\b|<${reactName}[A-Z]`);
  const staticUsagePattern = new RegExp(`\\b${reactName}\\.`);
  const toastUsagePattern = reactName === "Toast" && /\btoast\./.test(pageSource);
  return jsxTagPattern.test(pageSource) || staticUsagePattern.test(pageSource) || toastUsagePattern;
}

const manifestPath = "figma/components.manifest.json";

if (!exists(manifestPath)) {
  console.error(`${manifestPath} is missing.`);
  process.exit(1);
}

const manifest = JSON.parse(read(manifestPath));
const app = read("src/app/App.tsx");
const sidebar = read("src/components/docs/DocsSidebar.tsx");
const reactIndex = exists("src/components/ui/index.ts") ? read("src/components/ui/index.ts") : "";
const vueIndex = exists("packages/vue-ui/src/index.ts") ? read("packages/vue-ui/src/index.ts") : "";

const errors = [];
const seenRoutes = new Set();
const seenNames = new Set();

for (const component of manifest.components) {
  const label = `${component.name} (${component.route})`;
  const routePath = component.route.split("#")[0];

  if (seenRoutes.has(component.route)) errors.push(`${label}: duplicated route.`);
  if (seenNames.has(component.name)) errors.push(`${label}: duplicated name.`);
  seenRoutes.add(component.route);
  seenNames.add(component.name);

  if (!component.route.startsWith("/components/")) {
    errors.push(`${label}: route must start with /components/.`);
  }

  if (!app.includes(`path="${routePath}"`) && !app.includes(`path="${routePath.replace(/^\//, "")}"`)) {
    errors.push(`${label}: route is not registered in src/app/App.tsx.`);
  }

  if (!sidebar.includes(`path: "${routePath}"`)) {
    errors.push(`${label}: route is not present in DocsSidebar.`);
  }

  if (!exists(routeToDoc(component))) {
    errors.push(`${label}: generated docs file is missing at ${routeToDoc(component)}.`);
  }

  const pageFile = routeToPage(component);
  if (!exists(pageFile)) {
    errors.push(`${label}: docs page is missing at ${pageFile}.`);
  }

  if (!component.reactSource || !exists(component.reactSource)) {
    errors.push(`${label}: reactSource is missing or file does not exist.`);
  } else if (component.reactSource.startsWith("src/components/ui/")) {
    const reactName = componentNameFromSource(component.reactSource);
    if (!reactIndex.includes(`from "./${reactName}"`)) {
      errors.push(`${label}: ${reactName} is not exported from src/components/ui/index.ts.`);
    }
    if (exists(pageFile)) {
      const pageSource = read(pageFile);
      if (!importsUiSource(pageSource, reactName)) {
        errors.push(`${label}: docs page does not import ${reactName} from src/components/ui.`);
      }
      if (!usesUiComponentFamily(pageSource, reactName)) {
        errors.push(`${label}: docs page does not render or call the ${reactName} component family.`);
      }
    }
  }

  if (!component.vueSource || !exists(component.vueSource)) {
    if (component.vueSource === null) {
      console.warn(`  ⚠ ${label}: vueSource is null (spec-only component, Vue source pending).`);
    } else {
      errors.push(`${label}: vueSource is missing or file does not exist.`);
    }
  } else {
    const exportName = vueExportName(component.vueSource);
    if (!vueIndex.includes(`as ${exportName}`)) {
      errors.push(`${label}: ${exportName} is not exported from packages/vue-ui/src/index.ts.`);
    }
  }
}

if (errors.length > 0) {
  console.error("Component contract verification failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Checked ${manifest.components.length} component contracts.`);
