const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const pairs = [
  ["figma/tokens.json", "skills/xincailiao-design-spec/assets/design-tokens.json"],
  ["figma/components.manifest.json", "skills/xincailiao-design-spec/assets/component-contracts.json"],
];

for (const [source, target] of pairs) {
  const sourcePath = path.join(ROOT, source);
  const targetPath = path.join(ROOT, target);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`Synced ${source} -> ${target}`);
}
