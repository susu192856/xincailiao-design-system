---
name: {{skill_name}}
version: 0.1.0
description: {{third_person_description_with_positive_triggers_and_negative_exclusions}}
---

# {{system_name}} Design Skill

{{one_paragraph_domain_summary}}

This file is the entry point and router. Detailed rules live in `references/`; exact values live in `assets/`.

## Product Or Brand Recognition

{{product_line_rules_or_default}}

## Route Map

| User intent | Read |
|---|---|
| {{primary_page_type_1}} | `references/{{reference_file_1}}` |
| {{primary_page_type_2}} | `references/{{reference_file_2}}` |
| Shared components or uncertain component use | `references/components-shared.md` |
| Mobile / H5 / app surface | `references/mobile.md` |
| Layout or navigation framework | `references/layout-system.md` |
| Rule change, bug diagnosis, or governance | `references/meta-rules.md` and `references/case-studies.md` |

## Component Source Boundary

1. {{business_components}} are owned by this Skill and specified in `references/components-shared.md`.
2. {{customized_framework_components}} use framework behavior plus local theme/tokens.
3. Native framework behavior is deferred to official framework documentation.

## Top Rules

{{top_rules}}

## Token Defaults

Exact values come from `assets/design-tokens.css` and related structured assets. Do not invent values when a token exists.

## Fallback Rules

When the spec is silent:

1. Stay inside the current route and component system.
2. Use the closest semantic token.
3. Prefer existing page skeletons over new layout inventions.
4. Ask for clarification when the decision would create a new rule.
5. Mark unverified assumptions in the output.

## Output Self-Check

Before final output, check:

- [ ] The correct route files were used.
- [ ] Product line or brand variant is correct.
- [ ] Tokens are used instead of invented values.
- [ ] Components come from sanctioned sources.
- [ ] Page skeleton and spacing rules are followed.
- [ ] Any new rule is backed by an authoritative source.

## File Inventory

| File | Purpose |
|---|---|
| `SKILL.md` | Entry point, routing, top rules, self-check |
| `GLOSSARY.md` | Terminology governance |
| `CHANGELOG.md` | Version history |
| `references/components-shared.md` | Shared component rules |
| `references/meta-rules.md` | Rule governance |
| `references/case-studies.md` | Failure cases and lessons |
| `assets/design-tokens.css` | Numeric truth |
| `evals/evals.json` | Test prompts and expectations |
