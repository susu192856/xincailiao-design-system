/**
 * Generate a component delivery audit from the Figma handoff manifest.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const MANIFEST = "figma/components.manifest.json";
const OUTPUT = "docs/COMPONENT_DELIVERY_AUDIT.md";

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(ROOT, file));
}

function routeToDoc(route, componentName) {
  if (componentName === "DatePicker") return "docs/components/datepicker.md";
  if (componentName === "Textarea") return "docs/components/input.md";
  return `docs/components/${route.replace(/^\/components\//, "")}.md`;
}

function routeToPage(component) {
  if (component.name === "Icon") return "src/pages/design-system/IconPage.tsx";
  if (component.name === "Textarea") return "src/pages/design-system/components/InputPage.tsx";
  if (component.name === "DatePicker") return "src/pages/design-system/components/SelectPage.tsx";
  return `src/pages/design-system/components/${component.name}Page.tsx`;
}

function lineCount(file) {
  if (!exists(file)) return 0;
  return read(file).split(/\r?\n/).length;
}

function status(value) {
  return value ? "Yes" : "No";
}

if (!exists(MANIFEST)) {
  console.error(`${MANIFEST} is missing.`);
  process.exit(1);
}

const manifest = JSON.parse(read(MANIFEST));
const generatedAt = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

const rows = manifest.components.map((component) => {
  const doc = routeToDoc(component.route, component.name);
  const page = routeToPage(component);

  return {
    name: component.name,
    route: component.route,
    react: exists(component.reactSource),
    vue: exists(component.vueSource),
    page: exists(page),
    markdown: exists(doc),
    states: component.states.length,
    variants: component.variants.length,
    tones: component.tones.length,
    pageLines: lineCount(page),
  };
});

const totals = {
  components: rows.length,
  react: rows.filter((row) => row.react).length,
  vue: rows.filter((row) => row.vue).length,
  pages: rows.filter((row) => row.page).length,
  markdown: rows.filter((row) => row.markdown).length,
};

const table = rows
  .map((row) =>
    [
      row.name,
      row.route,
      status(row.react),
      status(row.vue),
      status(row.page),
      status(row.markdown),
      row.variants,
      row.tones,
      row.states,
      row.pageLines,
    ].join(" | "),
  )
  .join("\n");

const content = `# Component Delivery Audit

Generated: ${generatedAt}

This audit records the current component delivery surface for the design system. It is generated from \`${MANIFEST}\` and should be read alongside \`npm run verify\`.

## Summary

- Components in manifest: ${totals.components}
- React UI sources present: ${totals.react}/${totals.components}
- Vue SFC sources present: ${totals.vue}/${totals.components}
- Web documentation pages present: ${totals.pages}/${totals.components}
- Markdown handoff docs present: ${totals.markdown}/${totals.components}

## Delivery Matrix

Component | Route | React Source | Vue Source | Web Page | Markdown Doc | Variants | Tones | States | Page Lines
--- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---:
${table}

## Verification

Run this command before handoff:

\`\`\`bash
npm run verify
\`\`\`

The verification gate checks component routes, sidebar entries, Markdown docs, React UI source exports, Vue SFC exports, and whether each component documentation page imports and uses the real UI component family.

## Current Handoff Notes

- Web docs are available through the \`/components/*\` routes.
- React source components live in \`src/components/ui\` and are exported from \`src/components/ui/index.ts\`.
- Vue source components live in \`packages/vue-ui/src/components\` and are exported from \`packages/vue-ui/src/index.ts\`.
- Figma handoff metadata lives in \`figma/components.manifest.json\`; actual Figma file synchronization should be done only after explicit authorization.
- Git commit, push, PR, and GitHub Pages deployment are intentionally not performed in this local preview iteration.
`;

fs.writeFileSync(path.join(ROOT, OUTPUT), content);
console.log(`Wrote ${OUTPUT}`);
