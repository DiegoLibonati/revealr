# Revealr

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Description

**Revealr** is a lightweight FAQ accordion web application built with React and TypeScript. It presents a list of frequently asked questions where each item is collapsed by default, showing only the question title. Users can click a toggle button on any question to expand it and reveal the full answer, then click again to collapse it. Only the content the user explicitly requests is shown at any given time, keeping the interface clean and focused.

The application is fully accessible: every toggle button exposes `aria-expanded`, `aria-controls`, and a descriptive `aria-label` that updates dynamically based on whether the answer is open or closed. The expanded answer panel is marked as a `region` and linked back to its title via `aria-labelledby`, making it navigable by screen readers.

The data layer is intentionally simple — questions are loaded from a static constants file into local component state, with no external API calls or global state management. This makes the project easy to extend: swapping the static data for a real API endpoint or adding new questions requires minimal changes.

Styling is handled entirely with TailwindCSS utility classes, using a custom color palette (`primary: #EB5A3C`, `secondary: #DF9755`) for a consistent visual identity. The layout is responsive out of the box, adapting from full width on mobile to a centered 50% column on wider screens.

The codebase follows strict TypeScript configuration with no implicit any, unused variable errors, and path aliases (`@/` for `src/`) to keep imports clean across the project. Code quality is enforced automatically on every commit through Husky pre-commit hooks that run ESLint with auto-fix and Prettier formatting via lint-staged. The test suite uses Jest with Testing Library and covers rendering, toggle behavior, and accessibility attributes, with a minimum coverage threshold of 70%.

## Technologies used

1. React JS
2. TypeScript
3. Vite
4. HTML5
5. TailwindCSS
6. CSS3

## Libraries used

#### Dependencies

```
"react": "^19.2.4"
"react-dom": "^19.2.4"
"react-icons": "^4.4.0"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"autoprefixer": "^10.4.16"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"postcss": "^8.4.33"
"prettier": "^3.0.0"
"tailwindcss": "^3.4.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/revealr`](https://www.diegolibonati.com.ar/#/project/revealr)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Known Issues

None at the moment.
