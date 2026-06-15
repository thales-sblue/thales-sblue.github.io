# TASK-002: ESLint And Prettier

## Goal
Add minimal ESLint and Prettier support for the current React + JavaScript + JSX + Vite codebase without changing behavior, interface, deployment flow, or introducing TypeScript.

## Scope
- Add only the approved linting and formatting dependencies.
- Create a flat ESLint configuration in `eslint.config.js`.
- Create Prettier configuration and ignore rules compatible with the current repository.
- Add validation scripts to `package.json` without changing existing build or deploy behavior.
- Run verification commands in the required order, document findings, and apply only safe corrections needed for lint or formatting compliance.
- Update `docs/STATE.md` with dependencies, configuration, verification, ignored files, and next permitted roadmap step.

## Allowed Dependencies
- `eslint`
- `@eslint/js`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `globals`
- `prettier`
- `eslint-config-prettier`

## Out Of Scope
- Upgrading React, Vite, Tailwind, or any existing dependency.
- Migrating any file to TypeScript.
- Adding tests, CI, GitHub Actions, routes, deploy changes, or UI changes.
- Reformatting the entire repository without evaluating impact first.
- Removing `src/data/projects.min.js`.
- Changing `vite.config.js` unless a strictly necessary technical reason is confirmed and documented first.

## Proposed Steps
1. Install only the approved ESLint and Prettier dependencies.
2. Add `eslint.config.js`, `.prettierrc`, and `.prettierignore` with rules compatible with React, Hooks, browser globals, ES modules, and Vite.
3. Add `lint`, `lint:fix`, `format`, `format:check`, and `validate` scripts to `package.json`.
4. Run `npm run lint`, `npm run format:check`, and `npm run build` before any broad automatic fixes.
5. Record all reported issues and correct only objective, safe, behavior-preserving problems directly required for lint or formatting success.
6. If formatting fallout is broad, document the affected files and defer mass normalization to a future task.
7. Re-run the required validations, review the final diff, and update `docs/STATE.md`.
8. Perform final clean-install validation with `npm ci`, `npm run lint`, `npm run format:check`, `npm run build`, and `npm run validate`.

## Acceptance Criteria
- Only the approved linting and formatting dependencies are added.
- `eslint.config.js`, `.prettierrc`, and `.prettierignore` are present and compatible with the current React + Vite JavaScript codebase.
- `package.json` contains the required scripts:
  - `lint`
  - `lint:fix`
  - `format`
  - `format:check`
  - `validate`
- `npm ci` succeeds on a clean install.
- `npm run lint` succeeds.
- `npm run format:check` succeeds.
- `npm run build` succeeds.
- `npm run validate` succeeds.
- No dependency already present before this task is deliberately upgraded.
- No functional, visual, routing, deployment, or content changes are introduced.
- The final diff is limited to lint/format configuration, package manifests, documentation, and minimal safe code changes required for lint or formatting compliance.
