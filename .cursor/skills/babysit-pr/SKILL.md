---
name: babysit-pr
description: >-
  Keep a PR merge-ready on serhatozdursun/resume: triage CI failures (tests,
  SonarCloud, Danger, browser e2e), push scoped fixes, and squash-merge when
  all required checks pass. Use for CI babysit automations and manual agent runs.
---

# Babysit PR — serhatozdursun/resume

Personal playground repo. Goal: get the PR green and **squash-merge to main** without human approval.

## Required checks (all must pass before merge)

1. `test-and-analyze` — Jest coverage, SonarCloud scan, Danger AI review
2. `Analyze (javascript)` — SonarCloud
3. `Analyze (typescript)` — SonarCloud
4. `browser_e2e_tests (chrome)` — Selenium UI tests
5. `browser_e2e_tests (firefox)` — Selenium UI tests

## Workflow

1. Identify the PR branch from the trigger context.
2. Fetch failed check runs (`gh pr checks`, `gh run view --log-failed`). Read only failure summaries and relevant log sections — not full JSON dumps.
3. Fix issues **in this PR's scope only**:
   - **Coverage** below 80% per changed file (`MIN_FILE_COVERAGE` in `dangerfile.ts`) → add targeted tests under `src/tests/`
   - **SonarCloud** quality gate → fix smells, duplication, uncovered lines in `src/`
   - **Danger** blockers → address valid findings only
   - **Lint / build** → `yarn lint`, `yarn build`
   - **Browser e2e** → fix UI regressions; do not disable tests or workflows
4. Before pushing, run locally:
   ```bash
   yarn test --coverage
   yarn lint
   yarn build
   ```
5. Commit with a clear message, push to the PR branch, and wait for CI.
6. Repeat until all five required checks pass **or** 5 fix attempts are exhausted.

## Merge (when all checks green)

```bash
gh pr merge --squash --delete-branch
```

Post a PR comment summarizing fixes and confirming auto-merge.

## Hard stops — do NOT

- Modify `.github/workflows/` or CI config to make failures pass
- Lower Sonar/coverage thresholds
- Skip or delete tests
- Merge while any required check is failing or pending
- Make unrelated refactors

## If stuck after 5 attempts

Comment on the PR with: what failed, what was tried, and what needs human input. Do not merge.
