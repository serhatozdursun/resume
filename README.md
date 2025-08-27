[![Unit Tests](https://github.com/serhatozdursun/resume/actions/workflows/ci.yml/badge.svg)](https://github.com/serhatozdursun/resume/actions/workflows/ci.yml)
[![CodeQL Static Code Analysis](https://github.com/serhatozdursun/resume/actions/workflows/codeql.yml/badge.svg)](https://github.com/serhatozdursun/resume/actions/workflows/codeql.yml)

[![UI Automation Tests (Chrome|Firefox)](https://github.com/serhatozdursun/resume/actions/workflows/ui_cross_browser_test.yml/badge.svg)](https://github.com/serhatozdursun/resume/actions/workflows/ui_cross_browser_test.yml)

# Simple Resume Website

A modern, accessible, and performant resume website built with Next.js, React, and Styled Components. This project is designed for learning, portfolio, and as a best-practice reference for TypeScript-based React apps.

---

## Features

- **No template:** 100% custom design and layout
- **TypeScript:** Full type safety and maintainability
- **Responsive:** Mobile-friendly and adapts to all screen sizes
- **Accessible:** Keyboard navigation, semantic HTML, and a11y tests
- **SEO Optimized:** Meta tags, Open Graph, and Twitter Card support
- **Performance:** Code splitting, lazy loading, and bundle analysis
- **Image Optimization:** Only the profile image uses a custom styled-component; all other images use default or original components
- **Testing:** Unit, integration, and accessibility tests with Jest and jest-axe
- **Pre-commit hooks:** Linting, formatting, and build checks with Husky and lint-staged

## About

This project is built with Next.js, React, and Styled Components. It includes basic functionality to showcase a resume and is intended as a learning exercise.

## Installation

1. **Clone the repository:**

```bash
   git clone https://github.com/serhatozdursun/resume.git
   cd resume
```

2. **Install dependencies:**

```bash
yarn install
```

3. **Set up environment variables:**

```bash
cp env.example .env.local
```

Then edit `.env.local` and add your actual API keys and configuration values.

## Usage

### Development

To run the development server:

```bash
yarn dev
```

This will start the Next.js development server at [http://localhost:3000](http://localhost:3000).

### Building

To build the project for production:

```bash
yarn build
```

### Running in Production

To start the production server:

```bash
yarn start
```

## Scripts

- `yarn lint` – Run ESLint to lint your code
- `yarn test` – Run all tests (unit, integration, a11y)
- `yarn format` – Format code with Prettier
- `yarn analyze` – Analyze bundle size with @next/bundle-analyzer

## Accessibility & SEO

- All interactive elements are keyboard accessible
- Uses semantic HTML and ARIA where appropriate
- Automated accessibility tests with jest-axe
- SEO meta tags, Open Graph, and Twitter Card support

## Testing

- **Unit & Integration:** Jest and React Testing Library
- **Accessibility:** jest-axe for a11y checks
- **Coverage:** High test coverage for components and utilities

## Performance

- Code splitting and lazy loading for major components
- Bundle analysis with @next/bundle-analyzer
- Optimized image handling (profile image uses a dedicated styled-component)

## Contribution & Code Readability

- Use clear, descriptive variable and function names
- Keep components small and focused
- Use TypeScript types and interfaces for all props and state
- Add comments for complex logic
- Run `yarn lint` and `yarn format` before committing
- All code is auto-checked with Husky pre-commit hooks

---

## Dependencies

- **Next.js:** React framework for production
- **React:** JavaScript library for building user interfaces
- **React DOM:** React package for working with the DOM
- **React Icons:** Easily use icons from popular icon sets in your React projects
- **Styled Components:** Visual primitives for the component age

## Dev Dependencies

- **TypeScript:** Typed superset of JavaScript
- **@types/node:** TypeScript definitions for Node.js modules
- **@types/react:** TypeScript definitions for React
- **@types/styled-components:** TypeScript definitions for Styled Components

## Docker

You can run this app in a production-like environment using Docker and Docker Compose.

### 1. Build and Run with Docker Compose

```bash
docker compose up --build
```

This will build the Next.js app, serve it with Nginx, and expose it on [http://localhost:3000](http://localhost:3000).

### 2. Environment Variables

Copy the example env file and fill in your values:

```bash
cp env.example .env.local
```

The `.env.local` file will be used at build time. If you change environment variables, rebuild the image.

### 3. Stopping the App

```bash
docker compose down
```

### 4. Production Notes
- The app is served by Nginx in the container.
- The default Nginx config is used; you can customize it in the `default` file.
- Healthchecks are enabled for orchestration.
