# Meta-Rules For Generated Design Skills

Use this file when creating the governance layer for a target design-guideline Skill.

## Why Meta-Rules Exist

Design Skills grow through real use. Without governance, they also collect accidental rules:

- A bug symptom gets mistaken for the correct rule.
- A single stakeholder preference becomes global law.
- The model invents a visual reason from generic training data.
- Two files drift into contradictory terminology.

Meta-rules prevent this. They define how rules are allowed to be created, changed, or removed.

## MR-01: Source Authority

Before adding or revising a rule, identify the source.

Recommended authority order:

1. Official design-system documentation or owner confirmation.
2. Design-token files and structured assets.
3. Component contracts or production code accepted by the team.
4. Approved Figma frames, screenshots, or page shells.
5. Repeated review cases with confirmed root cause.
6. Single user feedback marked as provisional only.

Not valid by itself:

- Bug symptoms.
- The model's visual instinct.
- Unverified competitor designs.
- One-off taste feedback.
- The phrasing "looks wrong, so the opposite must be right".

## MR-02: Rule Addition Workflow

Use this workflow:

1. Confirm the current Skill has no existing rule.
2. Locate the authoritative source.
3. Decide rule type: token fact, discrete hard rule, judgment rule with reason, or case only.
4. Add the rule to the narrowest relevant file.
5. Add or update a case if the rule came from a failure.
6. Update changelog.
7. Add an eval if the issue could regress.

## MR-03: Conflict Resolution

When rules conflict, use this order:

```text
specific authoritative source > structured asset > detailed reference > SKILL.md summary > inferred rule
```

If the conflict is real, do not silently choose. Mark the inconsistency and ask the user or design owner.

## MR-04: Granularity

Rules should be specific enough to stop real failures, but not so specific that they freeze the system.

Usually good as rules:

- Component source boundaries.
- Token use.
- Page skeleton dimensions.
- DOM structure needed for overlay/sticky/badge behavior.
- Formula rules.
- Product-line differences.

Usually bad as hard rules:

- One-off layout preference.
- Micro-adjustments not backed by tokens.
- Aesthetic words without observable criteria.
- Competitor-specific patterns.

## MR-05: Case-To-Rule Gate

A case may become a formal rule when:

- It repeats, or its impact is severe.
- The root cause is understood.
- The correct behavior is backed by a trusted source.
- The new rule generalizes beyond one output.
- It can be checked by a future model or reviewer.

Otherwise, keep it as a case and mark it for observation.

## MR-06: Review Skill Boundary

If a paired review Skill exists:

- The generator Skill owns creation guidance.
- The review Skill owns violation detection and severity.
- Shared truth must live in shared references/assets or be referenced from one canonical place.
- Version compatibility must say which review rules apply to which generator versions.

Do not let the review Skill silently fork the design system.
