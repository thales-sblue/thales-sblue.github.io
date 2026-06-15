# State

## Current Snapshot
- Active branch target: `docs/portfolio-evolution-plan`
- Current roadmap status: phase `1. Auditoria e documentação` documented; next executable task is `TASK-001-clean-dependencies`
- Source application type: single-page React + Vite portfolio
- Current deployment model: GitHub Pages via `gh-pages`

## Confirmed Decisions
- Only one task may be executed at a time.
- Every task must define acceptance criteria.
- No source edits under `src/` are allowed during the documentation phase.
- No dependency or version changes are allowed during the documentation phase.
- Architecture decisions must be documented explicitly.

## Open Findings
- `thales-dev: "file:"` is likely invalid and should be addressed in the dependency cleanup phase.
- `@headlessui/react`, `react-tsparticles`, `tsparticles`, and `recharts` appear unused from repository search and should be verified during dependency cleanup.
- `src/data/projects.min.js` appears redundant and should be reviewed in a later cleanup task.
- `base: ''` in `vite.config.js` is a risk area for future Vite and routing changes on GitHub Pages.
- No lint, test, Playwright, or CI workflow exists yet.

## Verification
- `build`: blocked in current workspace because local dependencies are not installed and `vite` is unavailable.
- `lint`: unavailable because no lint script exists.
- `test`: unavailable because no test script exists.

## Task History
- 2026-06-15: documentation baseline created with `AGENTS.md`, audit, product spec, architecture notes, roadmap, initial state file, and `TASK-001-clean-dependencies`.
