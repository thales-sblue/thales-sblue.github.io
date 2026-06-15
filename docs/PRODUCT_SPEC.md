# Product Spec

## Summary
This repository currently powers a personal portfolio website implemented as a single-page React application. The immediate goal is not to redesign or rewrite the site, but to create a controlled path for future evolution while preserving the current interface, content, and behavior until later roadmap phases explicitly allow change.

## Current Product Behavior
- The site loads as a single document and uses anchor navigation between sections.
- The page presents a hero introduction, a NASA APOD interactive section, project listings, skills, an about section, and contact actions.
- The site includes fixed navigation and a floating WhatsApp shortcut.
- The NASA section lets the visitor choose a date and request astronomy content from the official APOD API.

## Product Constraints For The Evolution Plan
- No interface changes during documentation and audit work.
- No content edits during documentation and audit work.
- The earlier prohibition on source changes under `src/`, package changes, and TypeScript migration applied to the initial documentation and audit phase only.
- Later roadmap phases may authorize controlled source and package changes explicitly, and those changes must stay inside the approved task scope.
- No architecture changes are allowed without an explicit recorded decision.

## Evolution Principles
- Preserve current user-visible behavior until the roadmap phase that explicitly authorizes a change.
- Decompose work into small, reviewable tasks with acceptance criteria.
- Prefer reversible changes and isolated upgrades over large parallel migrations.
- Treat deployment, routing, accessibility, performance, and SEO as first-class concerns rather than cleanup after design changes.

## Direcao Futura
The portfolio should evolve to present Thales Santos as a mid-level full stack developer with emphasis on backend engineering, APIs, system modernization, code quality, databases, integrations, and CI/CD.

The future interface should prioritize engineering evidence, technical decisions, architecture, tests, results, and learnings instead of only listing technologies or emphasizing visual effects.

Do not invent experiences, metrics, or credentials.

## Current Non-Goals
- Redesigning the hero.
- Reordering sections.
- Rewriting content.
- Introducing routes now.
- Expanding the TypeScript migration beyond the scope explicitly authorized by the active phase-4 task.
- Updating React or Vite now.
- Adding tests, CI, or new tooling now.
