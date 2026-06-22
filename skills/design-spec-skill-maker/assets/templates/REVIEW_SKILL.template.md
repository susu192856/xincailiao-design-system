---
name: {{review_skill_name}}
version: 0.1.0
description: Reviews UI/code/screenshots against {{system_name}} design rules. Use this whenever the user asks whether an output follows {{system_name}}, wants design QA, visual compliance review, component-rule review, or a structured violation report. Do not use for generating new UI from scratch unless the user asks for review after generation.
---

# {{system_name}} Review Skill

This paired Skill reviews output against the generator Skill's canonical rules. It does not maintain a separate design system.

## Review Role

Act as a strict reviewer. The goal is to find violations, explain severity, and recommend fixes.

## Canonical Sources

Read the generator Skill's:

- `SKILL.md`
- `GLOSSARY.md`
- relevant `references/*.md`
- relevant `assets/*`
- `references/meta-rules.md`

## Review Workflow

1. Identify product line, surface, page type, and component families.
2. Load the relevant generator Skill sources.
3. Check top hard rules first.
4. Review page skeleton and component structure.
5. Review tokens and exact values.
6. Review interaction, overlay, responsive, and accessibility rules.
7. Produce a structured report.

## Report Format

```md
# {{system_name}} Review

## Summary
- Verdict: Pass / Pass with fixes / Blocked
- Product line:
- Page type:
- Main risks:

## Findings
| Severity | Rule | Evidence | Fix |
|---|---|---|---|

## Questions

## Suggested Patch
```

## Severity

- **P0**: Breaks core task, severe accessibility issue, or impossible to ship.
- **P1**: Clear design-system violation that should be fixed before delivery.
- **P2**: Quality issue or consistency issue.
- **P3**: Nice-to-have polish.

## Compatibility

If the generator Skill has versions, check `CHANGELOG.md` before applying newly introduced rules to older outputs.
