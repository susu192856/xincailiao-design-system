# Source Principles

This file captures the principles behind this Skill. Use it when improving the maker itself or explaining why the generated target Skill should be structured a certain way.

## From The Skill Methodology Articles

- A Skill is not a prompt or a static document. It is a reusable, inspectable skill package that teaches the model how to work in a domain.
- A good Skill starts with AI assistance but matures through real usage and failure-driven iteration.
- The main file should be a router, not an encyclopedia. Progressive disclosure keeps context focused.
- A capable Skill needs seven parts: trigger description, routing, verifiable constraints, numeric truth source, glossary, self-check, and version history.
- Start with evaluation. Run high-frequency scenarios without the Skill to reveal real gaps before writing elaborate instructions.
- Test both positive and negative triggers.漏触发 and 误触发 are both design failures.
- Accumulate failures and classify them before fixing. A batch of bugs often reveals a small number of structural gaps.
- Use AI as a co-thinker: ask what is missing, what context is needed, and how the structure maps to official Skill conventions.
- Growth needs a case flywheel and meta-rules. Not every failure becomes a rule.
- For complex rule systems, generation and review should often become paired Skills with separate roles.

## From `ke-style`

- `SKILL.md` should carry routing, top hard rules, compact defaults, and self-checks.
- Detailed specs should live in `references/` and load only when relevant.
- Exact values should live in `assets/` as tokens, product-line JSON, page-shell JSON, or schemas.
- Product-line recognition belongs early in the workflow.
- Component-source boundaries prevent the Skill from duplicating external UI framework docs.
- `GLOSSARY.md` prevents business/design/code vocabulary drift.
- `meta-rules.md` protects the design system from rules invented from bug symptoms.
- `CHANGELOG.md` and compatibility notes make paired generator/review Skills sustainable.

## From `skill-creator`

- Capture intent before writing: task, trigger, output format, tests, and dependencies.
- The description is the primary trigger mechanism; write it in third person, include trigger contexts, and add exclusions.
- Keep the Skill lean; move bulky material into resources.
- Write realistic eval prompts and expectations.
- Use qualitative human review for subjective output, and quantitative assertions where possible.
- Optimize the trigger description after the structure and behavior are sound.

## Practical North Star

When unsure, ask:

> Is this instruction helping the future model choose the right source, route, rule, or token for the current design task?

If yes, it belongs in the Skill. If no, it may be a case, a note, or source material rather than an instruction.
