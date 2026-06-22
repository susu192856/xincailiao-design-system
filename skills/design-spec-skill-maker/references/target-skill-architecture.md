# Target Skill Architecture

Use this to decide the folder structure for the design-guideline Skill being generated.

## Core Model

A design-spec Skill should use progressive disclosure:

- **Metadata**: `name` and `description` help the agent decide when to use the Skill.
- **Main file**: `SKILL.md` provides routing, essential rules, and self-check.
- **Bundled resources**: detailed references and assets load only when relevant.

The main file should be a router, not a textbook.

## Recommended File Tree

```text
target-design-skill/
├── SKILL.md
├── GLOSSARY.md
├── CHANGELOG.md
├── references/
│   ├── components-shared.md
│   ├── page-list.md
│   ├── page-detail.md
│   ├── page-form.md
│   ├── page-dashboard.md
│   ├── mobile.md
│   ├── layout-system.md
│   ├── meta-rules.md
│   └── case-studies.md
├── assets/
│   ├── design-tokens.css
│   ├── product-lines.json
│   ├── antd-theme.json
│   ├── page-shells/
│   └── schemas/
└── evals/
    └── evals.json
```

For a smaller system, collapse page files into fewer references. Keep `SKILL.md`, at least one reference file, and an eval file.

## What Belongs Where

| File or folder | Put here |
|---|---|
| `SKILL.md` | Trigger intent, routing table, essential hard rules, defaults, output self-check |
| `GLOSSARY.md` | Business/design/code vocabulary and forbidden synonyms |
| `CHANGELOG.md` | Version history, rule introductions, compatibility notes |
| `references/components-shared.md` | Shared components, component groups, business components |
| `references/page-*.md` | Page skeletons, local rules, component combinations, ASCII diagrams |
| `references/mobile.md` | Mobile component behavior, sticky, overlays, safe areas, touch targets |
| `references/layout-system.md` | Navigation frameworks, grids, shells, responsive rules |
| `references/meta-rules.md` | Rule-source policy, conflict resolution, rule addition workflow |
| `references/case-studies.md` | Bug cases, review findings, why rules exist |
| `assets/design-tokens.css` | Numeric truth for colors, spacing, type, radius, shadows |
| `assets/product-lines.json` | Brand/product-line variants |
| `assets/page-shells/*.json` | Structured page skeleton measurements |
| `assets/schemas/*.json` | JSON schemas for structured assets |
| `evals/evals.json` | Test prompts and expected outcomes |

## Routing Pattern

Use three layers:

### 1. Skeleton Route

Mutually exclusive page or task type. Examples:

- List / search results / data table -> `references/page-list.md`
- Detail / profile / property page -> `references/page-detail.md`
- Form / create / edit / submit flow -> `references/page-form.md`
- Dashboard / KPI / chart / report -> `references/page-dashboard.md`

### 2. Common Route

Always load the shared layer for generated UI:

- `references/components-shared.md`
- `assets/design-tokens.css`
- `GLOSSARY.md` when terminology is likely ambiguous

### 3. Overlay Route

Conditional additions:

- Mobile or H5 -> `references/mobile.md`
- Multi-brand -> `assets/product-lines.json`
- Complex navigation -> `references/layout-system.md`
- Rule changes or bug diagnosis -> `references/meta-rules.md` and `references/case-studies.md`

## Main File Structure

`SKILL.md` should usually include:

1. What the design system is.
2. Product-line or brand recognition.
3. Routing table.
4. Component-source boundaries.
5. Top hard rules.
6. Compact token defaults.
7. Fallback rules when the spec is silent.
8. Output self-check.
9. File inventory.

Keep detailed specs out of the main file unless they are the most common defaults.

## Asset Strategy

Use structured assets when:

- The value must be exact.
- The value changes over time.
- Multiple files need the same value.
- A review Skill may later need to validate the value.

Good structured assets:

- Design tokens.
- Product line variants.
- Page shell dimensions.
- Component inventories.
- Theme configuration for a UI library.

## Scripts

Do not add scripts by default for a design guideline Skill. Add scripts only when there is deterministic work:

- Validating JSON assets against schemas.
- Checking token references.
- Packaging the Skill.
- Scanning generated CSS for forbidden hard-coded values.

Semantic judgment, visual hierarchy, and rule interpretation should stay in instructions and references.

## Paired Review Skill

Recommend a paired review Skill when:

- The design system has many hard rules.
- The user repeatedly sees "almost right" details slip through.
- The Skill must evaluate existing code or screenshots.
- The generator Skill's self-check misses issues because it created the output itself.

The review Skill should not duplicate the whole specification. It should reference the generator Skill's sources, add a review role, severity model, and structured report format.
