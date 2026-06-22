---
name: design-spec-skill-maker
version: 0.1.0
description: Creates or improves design-system and design-guideline Skills. Use this whenever the user wants to make a Skill for UI design rules, brand systems, component libraries, design tokens, page patterns, design reviews, KED-like style guides, frontend visual standards, or a paired design review Skill, even if they only say they have a design spec, Figma library, screenshots, or examples and want AI to follow them. Do not use for ordinary UI implementation unless the task is to package the rules into a reusable Skill.
---

# Design Spec Skill Maker

This Skill helps create a high-quality design-guideline Skill: a reusable folder that teaches an AI how to generate, modify, and eventually review UI according to a team's design system.

The goal is not to paste a long design document into one file. The goal is to guide the user through a co-thinking process, identify the real boundaries and materials, then generate a Skill with a clear trigger, routing, references, structured assets, evals, and a growth mechanism.

## Operating Model

When this Skill triggers, work in this order:

1. Clarify the target Skill's boundary and source materials.
2. Ask only for missing information that materially affects structure.
3. Build or refine the target Skill architecture before writing files.
4. Generate the target Skill folder.
5. Add a small eval set and a maintenance path.
6. Suggest a paired review Skill when the design rules are complex.

Prefer co-thinking questions over premature implementation. A useful default question is:

> To achieve this design-spec Skill, what is still missing, and what do you need to provide?

## Route Map

Use these references as needed:

| Situation | Read |
|---|---|
| User is early, vague, or has scattered materials | `references/intake-workflow.md` |
| Need to decide target Skill file structure | `references/target-skill-architecture.md` |
| Need to convert design docs into executable rules | `references/design-rule-patterns.md` |
| Need tests, examples, or eval prompts | `references/evaluation-playbook.md` |
| Need rule governance, case library, or version policy | `references/meta-rules.md` |
| Need the underlying principles behind this Skill | `references/source-principles.md` |

Use templates from `assets/templates/` when creating the final target Skill:

| Template | Purpose |
|---|---|
| `SKILL.template.md` | Main file skeleton for the generated design Skill |
| `GLOSSARY.template.md` | Terminology governance |
| `CHANGELOG.template.md` | Version and compatibility history |
| `CASE_STUDIES.template.md` | Bug/case flywheel |
| `REVIEW_SKILL.template.md` | Optional paired review Skill |

## Required Intake

Before writing the target Skill, make sure you know at least:

- Target domain: product, brand, platform, and UI surface.
- Core scenarios: 3-5 tasks the Skill should improve.
- Exclusions: nearby tasks it must not own.
- Source materials: docs, screenshots, Figma exports, components, tokens, code examples, review notes.
- Rule truth sources: which materials are authoritative and which are only examples.
- Output mode: generate UI, review UI, adapt UI, or multiple modes.
- Evaluation: what examples prove the Skill works.

If the user has enough context in the conversation or files, extract it first instead of asking again. If key details are missing, ask 1-3 focused questions at a time.

## Target Skill Quality Bar

A good design-guideline Skill should have these properties:

- **Clear entry point**: `description` says what the Skill does, when to use it, and when not to use it.
- **Router structure**: `SKILL.md` routes to relevant references instead of containing every rule.
- **Rule/value separation**: rules live in markdown; numeric values live in token or structured asset files.
- **Verifiable constraints**: discrete rules are checkable; judgment rules include the reason and fallback.
- **Glossary**: terms do not drift across business, design, and code language.
- **Self-check**: generated output is checked against the most important rules before delivery.
- **Growth loop**: cases, meta-rules, changelog, and eval prompts let the Skill improve without rule pollution.

## Architecture Default

For a serious design-system Skill, start with this file tree:

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
│   ├── source-principles.md
│   └── case-studies.md
├── assets/
│   ├── design-tokens.css
│   ├── product-lines.json
│   ├── page-shells/
│   └── schemas/
└── evals/
    └── evals.json
```

Trim this for small systems. Do not create empty ceremony. Add a file only when it has a clear job.

## Rule Writing Standard

Use three rule forms:

- **Token facts**: values that must come from one source, such as colors, spacing, type, radius, z-index.
- **Discrete hard rules**: binary constraints with clear pass/fail boundaries.
- **Judgment rules with reasons**: contextual constraints that explain why the rule exists and what fallback to use.

Avoid vague language such as "clean", "modern", "balanced", "premium", or "brand feeling" unless it is translated into observable decisions.

## Safety And Governance

Do not treat every bug as a new rule. Before adding or changing a rule, check the authority order:

1. Official design system or design owner confirmation.
2. Design tokens and structured assets.
3. Component contracts and code examples already used in production.
4. Approved screenshots or Figma frames.
5. Repeated review cases with confirmed root cause.

Never derive a rule only from a bug symptom, a single unverified preference, a competitor screenshot, or the model's visual instinct.

## Output Contract

When creating a target Skill, deliver:

- The target Skill folder path.
- A short architecture summary.
- The key assumptions and open questions.
- The eval prompts included.
- Any recommended next iteration, especially whether a paired review Skill is warranted.

If the user asks for planning first, provide the plan and then continue executing it unless they pause you.
