/**
 * Vue 3 component source verification.
 *
 * The docs site is React-based, while the code package for development is Vue 3.
 * This script keeps the Vue source package in the verification loop by parsing
 * every .vue file with the official Vue SFC compiler.
 */
const fs = require("fs");
const path = require("path");
const { parse } = require("@vue/compiler-sfc");

const ROOT = path.resolve(__dirname, "..");
const COMPONENT_DIR = path.join(ROOT, "packages/vue-ui/src/components");

function listVueFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listVueFiles(fullPath);
    return entry.isFile() && entry.name.endsWith(".vue") ? [fullPath] : [];
  });
}

const files = listVueFiles(COMPONENT_DIR);

if (files.length === 0) {
  console.error("No Vue component files found in packages/vue-ui/src/components.");
  process.exit(1);
}

let hasError = false;

for (const file of files) {
  const source = fs.readFileSync(file, "utf-8");
  const result = parse(source, { filename: file });

  if (result.errors.length > 0) {
    hasError = true;
    console.error(`\n${path.relative(ROOT, file)}`);
    for (const error of result.errors) {
      console.error(`  - ${error.message || String(error)}`);
    }
  }
}

if (hasError) {
  process.exit(1);
}

console.log(`Checked ${files.length} Vue SFC files.`);
