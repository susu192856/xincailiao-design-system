# Design Rule Patterns

Use this when transforming raw design documents into executable Skill instructions.

## Rule Taxonomy

### Token Facts

Use for numeric or enumerated values:

```text
Primary color comes from `assets/product-lines.json`.
Spacing must use `--space-*` tokens from `assets/design-tokens.css`.
Card radius is `--radius-card`.
```

Token facts should not be repeated in multiple prose files. Reference the token source.

### Discrete Hard Rules

Use when the boundary is binary:

```text
NEVER use dashed dividers inside data cards; use a 1px solid divider token.
ALWAYS put badge elements inside a wrapper with `position: relative`.
```

Hard rules are best for:

- Whitelists and blacklists.
- DOM structure.
- Component-source boundaries.
- Required ordering.
- Formula-based rules.

### Judgment Rules With Reasons

Use when context matters:

```text
Limit the main content area to at most three parallel card types. More than three forces users to switch visual models while scanning. If more categories are needed, group them under tabs or progressive disclosure.
```

Include:

- The rule.
- Why it matters.
- What to do when the user has a valid exception.

## Bad Rule Smells

Rewrite these before putting them in a Skill:

| Vague source text | Better direction |
|---|---|
| "Keep the layout clean" | Define max component types, spacing rhythm, and grouping rules |
| "Use brand feeling" | Define brand tokens, imagery, shape, tone, and examples |
| "Make it modern" | Define density, typography, motion, and component choices |
| "Avoid clutter" | Define caps for actions, columns, badges, or nested panels |
| "Use the right component" | Map decision criteria to components |

## Rule Template

Use this format for important rules:

```md
### R-[AREA]-[NN]: [Rule Name]

**Rule:** [Observable rule.]

**Why:** [Reason the model can generalize from.]

**Applies to:** [Surfaces/components/page types.]

**Source:** [Official doc, token, approved page, case id.]

**Examples:**
- Correct: [brief example]
- Wrong: [brief example]
```

For small Skills, the source line may be omitted only if the whole file is sourced from one confirmed spec.

## Component Boundary Pattern

Design-system Skills often sit above a UI framework. Be explicit:

1. **Business components**: fully specified in this Skill.
2. **Customized framework components**: specify theme/tokens and local differences only.
3. **Native framework behavior**: defer to official docs; do not restate API details.

This prevents the Skill from becoming a stale clone of external documentation.

## Page Pattern Pattern

Each page reference should include:

- Purpose and trigger words.
- ASCII skeleton or concise layout diagram.
- Required component sequence.
- Spacing and density rules.
- Mobile/responsive differences.
- Common mistakes.
- Token references.
- A short self-check for that page type.

## Token File Pattern

A design-token file should group:

- Brand and product-line colors.
- Semantic colors.
- Text colors.
- Background and border colors.
- Typography.
- Spacing.
- Radius.
- Shadows.
- Component dimensions.
- Motion, if used.
- Breakpoints, if relevant.

Use semantic names, not only raw values. A model can reason with `--price-color` better than with `#E64B3E`.

## Glossary Pattern

Add a glossary when:

- Business names differ from code names.
- Designers and engineers use different terms.
- Product lines, products, and modules are easily confused.
- Similar design concepts need strict separation.

For each term, include:

- Preferred term.
- Meaning.
- Code or file name.
- Do-not-use synonyms or nearby borrowed terms.

## Case Study Pattern

Use cases to capture failures without overfitting rules.

```md
## CASE-001: [Short Name]

**Context:** [Where it happened.]
**Symptom:** [What went wrong.]
**Root cause:** [Why it happened.]
**Fix:** [What changed.]
**Rule impact:** [New rule, revised rule, no rule yet, or needs owner confirmation.]
**Source:** [Link/file/screenshot/commit if available.]
```

Cases are evidence. They are not automatically rules.

## Self-Check Pattern

A self-check should be short enough that the agent will actually use it.

Group checks by risk:

- Token and value usage.
- Layout and spacing.
- Component selection.
- Interaction and layering.
- Accessibility and responsive behavior.
- Product-line consistency.
- Rule-source compliance.

Avoid 100-item checklists on day one. Start with the 10-20 rules most likely to fail.
