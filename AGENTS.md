# Resume website — Codex instructions

This is the production portfolio at serhatozdursun.com. Prioritize correctness,
maintainability, accessibility, security, and performance. These are the canonical
project instructions for Codex; `.cursorrules` and `claude.md` are legacy sources.

## Stack and layout

- Next.js 15 Pages Router, React 18, strict TypeScript, Styled Components, Material UI.
- Jest, React Testing Library, and jest-axe; ESLint, Prettier, Danger, SonarCloud.
- `src/pages/`: routes and API handlers; preserve the Pages Router architecture.
- `src/components/`: UI, styles, and hooks; `src/data/`: static site content.
- `src/types/`: shared types; `src/utils/`: utilities; `src/tests/`: tests.
- Centralize SEO metadata in `src/data/profile.ts` and use the existing SEO component.

## Development rules

- Prefer focused, incremental improvements to rewrites or new dependencies.
- Maintain strict typing. Do not introduce `any`; use `unknown` and type guards.
- Define interfaces for props and use `as const` for configuration where useful.
- Prefer functional components, one component per file, and reusable hooks. Aim for
  components under roughly 150 lines. Preserve the existing error boundary pattern.
- Keep static site content in `src/data/` rather than hardcoding it in components.
- Use `next/image` for images and dynamic imports for heavy components where useful.
- Memoize only when it improves performance; avoid unnecessary renders.
- Use semantic HTML, descriptive alt text, logical headings, keyboard support, and
  ARIA when needed. Cover accessibility behavior with jest-axe where appropriate.
- Lighthouse targets: performance 95+, accessibility/SEO/best practices 100.
  Report measurements only when actually measured.
- Do not remove existing tests, weaken thresholds, or bypass lint, test, or build errors.

## Security and environment

- Never commit or print credentials, tokens, or `.env.local` contents.
- Keep local environment values in `.env.local`; document variable names in `env.example`.
- Application environment access belongs in `src/utils/env.ts`; do not access
  `process.env` directly inside components.
- Never render user input with `dangerouslySetInnerHTML`.
- Use the existing signed-in Codex account. Do not copy its session credentials into
  this repository or GitHub Actions. The existing Danger API review is configured
  separately in `.github/workflows/quality-gate.yml`.

## Commands and validation

Use Yarn and the committed `yarn.lock`. Install with `yarn install --frozen-lockfile`.

```sh
yarn dev
yarn lint
yarn test --coverage --runInBand
yarn build
```

- Add meaningful tests under `src/tests/` for changed behavior. The coverage target
  is at least 80%; Danger enforces coverage rules for changed files.
- Before committing application changes, run lint, tests with coverage, and build.
- For instruction-only changes, validate skill frontmatter, agent TOML, file links,
  and formatting; application tests/build are unnecessary unless behavior changes.
- Pre-commit runs lint-staged. Pre-push runs tests, lint, formatting, and build.
- CI includes Jest/SonarCloud/Danger, CodeQL, and Chrome/Firefox UI tests from
  `serhatozdursun/serhatozdursun-ui-tests`.
- Report what was checked and any blocked checks. Never describe unrun checks as passing.

## PR workflows

- Use `.agents/skills/open-pr/SKILL.md` when asked to open a PR or when the enabled
  repository automation discovers a pushed feature branch without an open PR.
- Use `.agents/skills/babysit-pr/SKILL.md` when asked to investigate/fix PR CI or when
  the enabled repository automation discovers failed checks.
- The user authorizes automatic PR creation and scoped CI fixes. **Leave all merges
  to the user**, including UI-test healer PRs. Do not enable GitHub auto-merge.
- Only push work belonging to the selected repository and PR branch. Preserve
  unrelated local changes; use an isolated checkout for other branches when needed.
- Named agents `pr-opener` and `ci-maintainer` are defined in `.codex/agents/` and
  may be requested explicitly. Follow the corresponding skill when working directly.
- Do not post PR comments unless the user or the explicitly invoked workflow
  authorizes them. Opening a PR includes writing its title and description.
- Codex scheduling lives in the app, not Cursor workflow JSON. See `docs/codex.md`.

## Code Review Rules

Prioritize defects, security issues, accessibility regressions, missing behavioral
tests, and meaningful performance regressions. Check the diff against these
instructions and existing patterns. Cite concrete files/lines and explain impact;
avoid speculative findings or unrelated refactors.
