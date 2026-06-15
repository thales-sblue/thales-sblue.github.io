# TASK-003: TypeScript Foundation

## Goal
Add a minimal TypeScript foundation to the current React + Vite SPA without changing UI, content, behavior, routing, deployment flow, or expanding the migration beyond the two safest entrypoints.

## Scope
- Add only the approved TypeScript dependencies.
- Create a single `tsconfig.json` and `src/vite-env.d.ts`.
- Rename only `src/main.jsx` to `src/main.tsx` and `src/App.jsx` to `src/App.tsx`.
- Update `index.html`, `eslint.config.js`, `package.json`, `package-lock.json`, and the required documentation only as needed for the foundation.
- Keep the remaining source files in JavaScript or JSX.
- Run the required validation commands before and after the implementation, including a clean reinstall pass.

## Allowed Dependencies
- `typescript`
- `@types/react`
- `@types/react-dom`
- `typescript-eslint`

## Out Of Scope
- Migrating any other file under `src/`.
- Adding `@types/node`, separate `@typescript-eslint/*` packages, aliases, runtime libraries, tests, CI, routes, deploy changes, or UI changes.
- Updating React, Vite, Tailwind, GitHub Pages configuration, or existing dependency versions.
- Converting data files, UI primitives, or the NASA integration.

## Proposed Steps
1. Validate the merged `main` baseline and record any pre-existing issues.
2. Install only the approved TypeScript dependencies.
3. Add `tsconfig.json` and `src/vite-env.d.ts` for strict, no-emit, Vite-compatible gradual adoption with `allowJs: true`.
4. Extend ESLint to lint `.ts` and `.tsx` with non-type-aware `typescript-eslint` recommended rules while preserving the current React, Hooks, Refresh, and Prettier setup.
5. Rename `src/main.jsx` and `src/App.jsx` to `.tsx`, adding only the explicit root guard required for `main`.
6. Update `index.html` and npm scripts, including `typecheck` and the expanded `validate`.
7. Update `docs/ARCHITECTURE.md`, `docs/PRODUCT_SPEC.md`, and `docs/STATE.md` to reflect phase 4 in progress and the temporary JS/TS coexistence strategy.
8. Re-run lint, format, typecheck, build, validate, then repeat after removing `node_modules` and reinstalling with `npm ci`.

## Acceptance Criteria
- Only `typescript`, `@types/react`, `@types/react-dom`, and `typescript-eslint` are added.
- `tsconfig.json`, `src/vite-env.d.ts`, and `docs/tasks/TASK-003-typescript-foundation.md` exist.
- `src/main.tsx` and `src/App.tsx` exist, and the `.jsx` entrypoint files no longer exist.
- `index.html` points to `src/main.tsx`.
- `typecheck` exists and `validate` includes lint, format check, typecheck, and build.
- JavaScript and TypeScript coexist without enabling JS checking or type-aware ESLint.
- Only `main` and `App` are migrated to TypeScript.
- `npm ci`, `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm run build`, and `npm run validate` all succeed.
- No `any`, `@ts-ignore`, `@ts-nocheck`, UI changes, routing changes, or deploy changes are introduced.
- The app remains a single-page static Vite build compatible with GitHub Pages, and phase 4 remains in progress after this task.
