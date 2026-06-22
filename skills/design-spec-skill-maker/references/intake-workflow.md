# Intake Workflow

Use this when the user wants a design-spec Skill but has not yet provided a complete brief.

## Principle

The user knows the product context; the model knows Skill structure. The best result comes from co-thinking: ask for the missing context, explain why it matters, then turn answers into structure.

Do not start by writing a giant `SKILL.md`. First discover the target Skill's boundary, materials, and failure cases.

## Minimum Viable Brief

Proceed when you can fill this:

| Field | What to capture |
|---|---|
| Domain | Product, business, platform, audience, brand/system name |
| Core tasks | 3-5 high-frequency prompts the target Skill should handle |
| Exclusions | Similar tasks that should not trigger this Skill |
| Surfaces | PC, mobile, H5, dashboard, admin, marketing page, app shell |
| Product lines | Brands, themes, tenant variants, or one-system-only |
| Source truth | Which docs, Figma frames, code, screenshots, and examples are authoritative |
| Tokens | Colors, typography, spacing, radius, shadows, motion, breakpoints |
| Components | Shared components, business components, wrappers around existing libraries |
| Page patterns | List, detail, form, dashboard, workflow, onboarding, empty states, etc. |
| Failure cases | Where generic AI currently goes wrong |
| Output target | HTML, React, Figma handoff, design review, code review, prose guidelines |
| Evaluation | What prompts and outputs prove the Skill works |

## Conversation Flow

### Step 1: Establish Boundary

Ask:

- What should this design Skill help AI do that generic AI currently does poorly?
- Which 3-5 scenarios happen most often?
- Which nearby tasks should remain outside this Skill?

Turn the answer into a first-pass trigger description and exclusions.

### Step 2: Inventory Materials

Ask for source materials in their raw form. The user does not need to polish them first.

Accept:

- Design guideline docs.
- Figma component lists or screenshots.
- Design-token exports.
- Existing frontend code.
- Approved pages and anti-examples.
- Review comments and bug lists.
- Chat notes where undocumented rules were discussed.

For each material, label it as one of:

- **Authoritative**: official spec or owner-approved truth.
- **Reference**: useful example, not binding by itself.
- **Case**: bug or review record that may suggest a rule only after validation.
- **Unknown**: needs user confirmation.

### Step 3: Build Baseline Cases

Ask the user for 5 prompts or infer them from the domain. Run or at least write them as baseline scenarios.

Capture failures in buckets:

- Numeric truth: wrong color, spacing, type, radius, sizing.
- Routing: wrong page pattern or irrelevant rules loaded.
- Judgment: vague rule caused guessing.
- Triggering: Skill should have triggered or should not have triggered.
- Asset gap: missing icons, templates, shells, tokens, or sample code.

Do not fix individual issues immediately. Classify first.

### Step 4: Ask The Co-Thinking Questions

Use these questions before proposing architecture:

1. To make this Skill enforce the design system reliably, what is missing?
2. Which failures share the same root cause?
3. Which content belongs in `SKILL.md`, and which belongs in `references/` or `assets/`?
4. Which numeric values need a single source of truth?
5. Which rules are discrete hard rules, and which need a reason?
6. What evidence is authoritative enough to create or revise a rule?

### Step 5: Confirm The Target Shape

Before writing files, summarize:

- The Skill name.
- Trigger description and exclusions.
- Proposed file tree.
- Routing layers.
- Required assets.
- Evals to include.
- Open questions that can be deferred.

Then create or update the Skill.

## Question Bank

Use these only as needed; do not interrogate the user with the full list at once.

### Product And Brand

- What is the system name users would naturally mention?
- Are there multiple product lines or brand variants?
- Which brand value changes across variants: only primary color, or layout/components too?

### Components

- Which components are custom to your business and not covered by common UI libraries?
- Which components are wrappers around a framework such as Ant Design, Material UI, or shadcn?
- Which component APIs should the Skill defer to official docs instead of duplicating?

### Pages

- What page types repeat enough to deserve separate reference files?
- Which page type is the default when a prompt is ambiguous?
- Which mobile or responsive rules commonly fail?

### Tokens

- Is there an exported token file already?
- Are tokens expected to be consumed by code, by designers, or by both?
- Which values change often enough to live in structured assets?

### Review

- Does generated UI often fail in small but important details?
- Should the target Skill include self-check only, or should it recommend a paired review Skill?
- What severity levels should a review Skill use?

## Do Not

- Do not rewrite all source material into one prose file.
- Do not add rules from a single bug without source confirmation.
- Do not ask the user to reformat raw materials before the model has tried to extract structure.
- Do not create a paired review Skill on day one unless the user explicitly wants it; design the path so it can be added later.
