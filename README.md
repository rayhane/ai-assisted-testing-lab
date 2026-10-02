# AI-Assisted Testing Lab

Hands-on experiments on using generative AI (LLMs) to support software testing: test design, test data, Gherkin scenarios and Playwright automation, with a critical human review of every output.

**Author:** Rayhane Jelassi, QA Engineer (ISTQB Foundation, A4Q Selenium Tester)

## Why this repo

AI can speed up test design, but its output must be reviewed. For each experiment I measure:
- how many test cases the AI produced, and how many were valid, wrong or missing,
- what I found that the AI missed (and the other way around),
- the time spent with and without AI.

## Structure

```
01-login-user-story/
  user-story.md                 # input: user story + acceptance criteria
  baseline-manual-cases.md      # my own test cases, written WITHOUT AI
  prompt-v1.md / output-v1.md   # first prompt and raw AI output
  prompt-v2.md / output-v2.md   # improved prompt and output
  evaluation.md                 # review grid + metrics
  tests/login.spec.ts           # Playwright automation (reviewed)
```

## Run the tests

```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

Tests run against the public demo site https://www.saucedemo.com (no real data involved).

## Results (to fill in)

| Metric | Value |
|---|---|
| Manual cases (baseline) | |
| AI cases (v1) | |
| Valid as-is | |
| Needed correction | |
| Wrong / invented | |
| Found by AI, missed by me | |
| Found by me, missed by AI | |
| Time with AI vs without | |

## Key takeaways (to fill in)

- What the AI did well:
- What the AI missed:
- How the prompt improved the result:

## Confidentiality

Only fictional user stories and public demo sites are used. No client data or confidential specifications are ever sent to an AI tool.
