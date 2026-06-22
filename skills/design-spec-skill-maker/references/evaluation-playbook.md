# Evaluation Playbook

Use this when adding tests, examples, or eval prompts to a generated design-guideline Skill.

## Why Evaluation Comes First

A Skill should solve real failures. Before writing or revising the target Skill, collect examples of generic AI behavior without the Skill:

- Where did it choose the wrong component?
- Where did it invent values?
- Where did it use vague aesthetics instead of rules?
- Where did it fail to identify the right page pattern?
- Where would it trigger incorrectly?

These failures become the first eval set.

## Baseline Set

Start with 5 high-frequency prompts. Use new conversations or isolated runs.

A balanced design-system baseline often includes:

1. A common list/table page.
2. A detail page.
3. A form or workflow page.
4. A dashboard or data page.
5. A modification/review prompt for an existing UI.

Record expected improvements, not only expected outputs.

## Trigger Tests

Create positive and negative trigger tests.

Positive examples should include:

- Direct names of the design system.
- Real user wording that omits the word "Skill".
- Page type phrases.
- Brand/product-line phrases.
- "Make this follow our design spec" type prompts.

Negative examples should be near misses:

- Product requirements writing.
- Marketing copy.
- General frontend bug fixing unrelated to visual standards.
- Data analysis or spreadsheet work.
- UI implementation that should use another existing design Skill instead.

## `evals/evals.json`

Use this shape:

```json
{
  "skill_name": "target-design-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "Create a mobile listing page for [domain] with filters and cards.",
      "expected_output": "A UI/code output that loads the correct list-page and mobile references, uses tokens, and follows card/filter rules.",
      "files": [],
      "expectations": [
        "The response identifies the list-page route and mobile overlay route.",
        "The output uses design-token names rather than invented raw values.",
        "The output includes a self-check against the relevant page rules."
      ]
    }
  ]
}
```

Good expectations verify substance. Avoid assertions that only check whether a file exists or a keyword appears.

## Design Quality Rubric

For subjective UI output, use a mixed rubric:

| Dimension | What to check |
|---|---|
| Triggering | Did the Skill activate in the right cases and stay out of wrong cases? |
| Routing | Did it load only relevant references and assets? |
| Token use | Did exact values come from structured sources? |
| Component fit | Did it choose sanctioned components for the scenario? |
| Rule reasoning | Did it apply reasons in ambiguous situations? |
| Output usability | Is the result actually useful for designers or engineers? |
| Self-check | Did it catch and correct its own likely violations? |
| Maintainability | Did it leave cases, TODOs, or changelog notes where appropriate? |

## First Eval Prompts

For a newly generated design-system Skill, include at least these:

1. "Help me create a [primary page type] using [system name], including [common business detail]."
2. "Adapt this rough UI description to [system name] mobile rules."
3. "I have this design review feedback list; update the Skill structure so it prevents these mistakes next time."
4. "Create a [brand/product-line] variant of an existing page."
5. "Should this Skill be used for writing a PRD / debugging backend code / making a marketing article?" expected no.

## Human Review

For visual design Skills, human review is not optional. Ask the user to inspect:

- Whether the route choices match their mental model.
- Whether the rules are too broad or too specific.
- Whether source authority is correct.
- Whether token names fit team language.
- Whether generated UI feels like their system, not generic UI.

## Iteration Loop

1. Run the evals.
2. Classify failures.
3. Decide whether the fix is description, routing, tokens, rules, examples, or meta-rules.
4. Update the Skill.
5. Add or revise cases.
6. Update changelog.

If repeated self-check failures remain, recommend a paired review Skill.
