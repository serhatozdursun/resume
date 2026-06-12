---
name: babysit-pr
description: >-
  Keep a PR merge-ready on serhatozdursun/resume: triage CI failures (tests,
  SonarCloud, Danger, browser e2e via serhatozdursun-ui-tests), push scoped
  fixes, and squash-merge when all required checks pass. Use for CI babysit
  automations and manual agent runs.
---

# Babysit PR — serhatozdursun/resume

Personal playground repo. Goal: get the PR green and **squash-merge to main** without human approval.

## Required checks (all must pass before merge)

1. `test-and-analyze` — Jest coverage, SonarCloud scan, Danger AI review
2. `Analyze (javascript)` — SonarCloud
3. `Analyze (typescript)` — SonarCloud
4. `browser_e2e_tests (chrome)` — Selenium UI tests
5. `browser_e2e_tests (firefox)` — Selenium UI tests

## Git authentication

Before any `git push` or `gh` command, configure credentials (Cloud env provides
`GH_TOKEN` or `UI_TESTS_DISPATCH_TOKEN`):

```bash
export GH_TOKEN="${GH_TOKEN:-$UI_TESTS_DISPATCH_TOKEN}"
gh auth setup-git
```

The PAT must have **Contents** and **Pull requests** write access on both
`serhatozdursun/resume` and `serhatozdursun/serhatozdursun-ui-tests`.

## Workflow

1. Identify the PR branch from the trigger context.
2. Fetch failed check runs (`gh pr checks`, `gh run view --log-failed`). Read only failure summaries and relevant log sections — not full JSON dumps.
3. Fix issues **in this PR's scope only**:
   - **Coverage** below 80% per changed file (`MIN_FILE_COVERAGE` in `dangerfile.ts`) → add targeted tests under `src/tests/`
   - **SonarCloud** quality gate → fix smells, duplication, uncovered lines in `src/`
   - **Danger** blockers → address valid findings only
   - **Lint / build** → `yarn lint`, `yarn build`
   - **Browser e2e** → follow the section below; do not disable tests or workflows
4. Before pushing resume changes, run locally:
   ```bash
   yarn test --coverage
   yarn lint
   yarn build
   ```
5. Commit with a clear message, push to the correct repo/branch, and wait for CI.
6. Repeat until all five required checks pass **or** 5 fix attempts are exhausted.

## Browser e2e failures (`browser_e2e_tests`)

E2E is owned by [serhatozdursun-ui-tests](https://github.com/serhatozdursun/serhatozdursun-ui-tests).
Resume CI builds this PR's resume branch, serves `http://localhost:3000/`, clones ui-tests
from **main**, and runs `scripts/ui_test_healer.py --push-pr`.

### Triage order

1. Read failed `browser_e2e_tests` logs — note healer output and failing test names.
2. `gh pr list --repo serhatozdursun/serhatozdursun-ui-tests --state open` — healer may already have opened a fix PR.
3. Decide fix target:

| Symptom                             | Fix in                           | Examples                                               |
| ----------------------------------- | -------------------------------- | ------------------------------------------------------ |
| UI broken vs intended design        | **resume** (`src/`, `src/data/`) | missing text, wrong layout, broken link                |
| Expected content changed on purpose | **ui-tests**                     | `config/test_data.json`, `pages/locators.py`, `tests/` |
| Healer classified real bug          | **resume**                       | comment on PR; do not weaken tests                     |

### Local reproduction

From resume repo root (PR branch checked out):

```bash
yarn install --frozen-lockfile && yarn build && yarn start &
```

Clone ui-tests if not in workspace (match CI path):

```bash
git clone https://github.com/serhatozdursun/serhatozdursun-ui-tests.git
cd serhatozdursun-ui-tests && poetry install
poetry run pytest --base_url http://localhost:3000/ --browser chrome
poetry run pytest --base_url http://localhost:3000/ --browser firefox
```

If the Cloud environment has both repos (ui-tests at root, resume at `resume/`):

```bash
bash scripts/resume_env_setup.sh
bash scripts/resume_start.sh
poetry run pytest --base_url http://localhost:3000/
```

### Push and merge rules

- **Resume fix** → commit + push to the **resume PR branch** only.
- **Ui-tests fix** → commit + push to **serhatozdursun/serhatozdursun-ui-tests**; open PR if needed.
- Resume CI always uses ui-tests **main** — merge the ui-tests PR to main before resume e2e can pass again.
- If a green ui-tests healer PR exists, merge it (`gh pr merge --repo serhatozdursun/serhatozdursun-ui-tests ...`) and wait for resume CI to re-run.

See ui-tests `AGENTS.md` and `.cursor/skills/ui-test-healer/` for healer details.

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
- Push ui-tests changes to the resume remote by mistake

## If stuck after 5 attempts

Comment on the PR with: what failed, what was tried, and what needs human input. Do not merge.
