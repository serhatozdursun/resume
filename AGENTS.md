# AGENTS.md

Guidance for AI agents working in this repository.

## Cursor Cloud specific instructions

### Product overview

Single-process **Next.js 15** resume/portfolio site. Pages are static or client-rendered; the only API route is `/api/contact` (EmailJS). ISTQB practice exam pages load from static JSON in `public/`. No database, Redis, or separate backend.

### Required service

| Service            | Command    | URL                   |
| ------------------ | ---------- | --------------------- |
| Next.js dev server | `yarn dev` | http://localhost:3000 |

`yarn dev` runs `scripts/validate-env.js` first. **`.env.local` must exist** with at least: `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `NEXT_PUBLIC_GA_TRACKING_ID`. If missing, run `cp env.example .env.local` (placeholders are enough for browsing pages and exams; real EmailJS keys are only needed to test contact-form submission).

### Standard commands

See `package.json` and `README.md`. Quick reference:

| Task        | Command                           |
| ----------- | --------------------------------- |
| Install     | `yarn install --frozen-lockfile`  |
| Dev         | `yarn dev`                        |
| Lint        | `yarn lint`                       |
| Test        | `yarn test`                       |
| Build       | `yarn build`                      |
| Prod server | `yarn start` (after `yarn build`) |

### Environment notes

- **Node 22** matches CI (`.github/workflows/quality-gate.yml`). Dockerfile uses Node 18 for production images; use Node 22 locally.
- **Package manager:** Yarn 1 (`yarn.lock`). Do not use npm/pnpm unless the repo migrates.
- **Husky:** pre-commit runs lint-staged; pre-push runs tests, lint, format check, and build.

### Optional / out of scope for local dev

- **Docker:** `docker compose up --build` serves via Nginx on port 3000 (production-like).
- **External UI E2E:** Python/Selenium tests live in `serhatozdursun-ui-tests`, not this repo.
- **EmailJS / reCAPTCHA:** External SaaS; contact form E2E needs valid keys in `.env.local`.

### Gotchas

- Env validation checks that variable **names** appear in `.env.local`, not that values are real.
- `yarn build` skips type-check and lint during Next build; run `yarn lint` and `yarn test` separately before pushing.
- `postbuild` runs `next-sitemap`; sitemap URLs use production domain from config.
