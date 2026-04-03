# Claude Project Instructions

Project: serhatozdursun.com\
Purpose: Personal resume website demonstrating senior-level engineering
practices.

Claude should treat this repository as a **production-grade portfolio
project** that demonstrates:

- modern frontend engineering
- QA engineering discipline
- testing best practices
- accessibility awareness
- performance optimization
- secure coding practices

Claude must prioritize **code quality, maintainability, and
correctness** over speed.

---

# Tech Stack

- Next.js 15
- React 18
- TypeScript (strict mode)
- Styled Components
- Material UI
- Jest
- React Testing Library
- jest-axe
- ESLint
- Prettier
- Danger
- SonarCloud

---

# Core Development Rules

When modifying this repository:

1.  Do not introduce breaking architectural changes.
2.  Prefer improving existing code instead of rewriting large sections.
3.  Always maintain TypeScript strict typing.
4.  Never introduce `any` unless absolutely unavoidable.
5.  Never bypass lint, build, or test errors.
6.  Do not remove existing tests unless explicitly requested.
7.  Prefer small and incremental changes.
8.  Avoid unnecessary dependencies.
9.  Keep code readable and maintainable.

---

# Security Rules

Security rules must always be respected.

### Environment Variables

Never commit secrets.

Environment variables must:

- exist in `.env.local`
- be documented in `env.example`
- be accessed only via:

src/utils/env.ts

Never access `process.env` directly in components.

---

### XSS Safety

Never render user-generated input using:

dangerouslySetInnerHTML

Allowed only when content originates from:

src/data/

---

# Architecture Rules

Project structure must remain consistent.

src/ components/ data/ pages/ types/ utils/ tests/ styles/

### Components

Rules:

- one component per file
- components should remain under \~150 lines
- extract reusable logic into hooks
- keep components as presentational as possible

---

# Content Management

All content must live inside:

src/data/

Components should not hardcode content.

---

# TypeScript Rules

TypeScript strict mode must always remain enabled.

Rules:

- avoid `any`
- prefer `unknown` with type guards
- define interfaces for props
- export config objects using `as const`

---

# React Best Practices

Use functional components only.

Avoid class components.

Prefer memoization when beneficial:

- useMemo
- useCallback

Avoid unnecessary re-renders.

---

# Next.js Best Practices

Images must use:

next/image

Dynamic imports should be used for heavy components.

---

# SEO Rules

All pages must include metadata.

Metadata should be centralized inside:

src/data/profile.ts

---

# Performance Requirements

Target Lighthouse scores:

Performance: 95+\
Accessibility: 100\
SEO: 100\
Best Practices: 100

---

# Accessibility

Accessibility must be respected.

Use:

- semantic HTML
- proper heading hierarchy
- aria attributes when necessary
- alt text for images

Accessibility tests should use:

jest-axe

---

# Testing

Frameworks:

- Jest
- React Testing Library
- jest-axe

Test location:

src/tests/

Coverage minimum:

80%

---

# Code Quality

Before committing changes ensure:

yarn lint\
yarn test\
yarn build

---

# CI/CD

GitHub Actions pipeline runs:

1.  dependency install
2.  tests
3.  lint
4.  build
5.  SonarCloud analysis
6.  Danger QA review

---

# Goal

This repository should demonstrate:

- clean architecture
- strong QA practices
- accessibility awareness
- security discipline
- performance optimization
- modern frontend engineering
