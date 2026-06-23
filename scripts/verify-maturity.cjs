const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
const manifest = readJson("figma/components.manifest.json");
const config = readJson("figma/sync.config.json");
const errors = [];
const allowed = new Set(["draft", "review", "stable"]);
const requiredExamples = config.stableGate.requiredExamples;
const requiredContractFields = config.stableGate.requiredContractFields;

if (config.target.fileKey !== "KjkKSAd9eufpg9eFR9xZVX" || config.target.status !== "official") {
  errors.push("Figma v2.0 must be the only official sync target.");
}
if (config.theme.mode !== "single" || config.theme.supportsDarkMode) {
  errors.push("Figma v2.0 must use a single Value mode.");
}
if (config.legacyTargets.some((target) => target.status !== "reference-only")) {
  errors.push("Legacy Figma targets must be reference-only.");
}

for (const foundation of config.foundations) {
  if (!allowed.has(foundation.status)) errors.push(`Foundation ${foundation.name}: invalid status.`);
  if (foundation.status === "stable" && (!foundation.desktopReviewed || !foundation.mobileReviewed)) {
    errors.push(`Foundation ${foundation.name}: stable foundation requires desktop and mobile review.`);
  }
}

for (const component of manifest.components) {
  if (!allowed.has(component.status)) errors.push(`${component.name}: invalid maturity status.`);
  if (component.status !== "stable") continue;

  for (const field of requiredContractFields) {
    const value = component.contract?.[field];
    if (!value || (Array.isArray(value) && value.length === 0)) {
      errors.push(`${component.name}: stable contract missing ${field}.`);
    }
  }
  for (const example of requiredExamples) {
    if (!component.contract?.examples?.[example]) {
      errors.push(`${component.name}: stable contract missing ${example} example.`);
    }
  }
  if (component.propDefinitions.some((prop) => prop.type === "unknown")) {
    errors.push(`${component.name}: stable contract contains unknown prop types.`);
  }
  if (!component.delivery?.desktopReviewed || !component.delivery?.mobileReviewed) {
    errors.push(`${component.name}: stable component requires desktop and mobile review.`);
  }
  if (component.figma?.syncStatus === "synced" && component.status !== "stable") {
    errors.push(`${component.name}: only stable components may be synced to Figma.`);
  }
}

if (errors.length) {
  console.error("Maturity verification failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

const summary = manifest.components.reduce((result, component) => {
  result[component.status] = (result[component.status] || 0) + 1;
  return result;
}, {});
console.log(`Maturity gate passed: ${JSON.stringify(summary)}. Official Figma target: ${config.target.name}.`);
