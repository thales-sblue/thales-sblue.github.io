# Architecture

## Current Architecture
- Rendering starts in `index.html`, mounts in `src/main.jsx`, and renders a single `App` tree.
- `src/App.jsx` composes the full page in a fixed section order and does not use routing.
- Section components live in `src/components/`.
- Shared presentation helpers live in `src/components/ui/`.
- Project card data lives in `src/data/projects.js`.
- Static images live in `src/assets/`.

## Runtime Boundaries
- Client-side only React application.
- No server-side rendering.
- No route segmentation.
- No persistent backend owned by this repository.
- One external runtime integration: NASA APOD API, configured through `VITE_NASA_API_KEY`.

## Current Interaction Model
- Navigation is based on hash targets and manual smooth scrolling.
- Section activation in the header is derived from `window.scrollY` and DOM section offsets.
- Animation is handled with `framer-motion`.
- Visual styling is driven by Tailwind utilities and a small set of custom component classes in `src/index.css`.

## Operational Architecture
- Local development: Vite dev server.
- Production build: `vite build`.
- Publishing: `gh-pages -d dist`.
- Static hosting target: GitHub Pages.

## Architecture Decisions To Preserve Until Changed Explicitly
- The app remains a single-page portfolio until the roadmap reaches the routing phase.
- Existing section order remains the baseline reference for future refactors.
- Current external integration scope remains limited to the NASA APOD section.
- Documentation is the source of truth for planned architecture changes; no silent deviations are allowed.

## Evolution Pressure Points
- TypeScript migration will touch every component boundary and the project data module.
- React Router adoption will require a hosting-safe fallback for GitHub Pages and a migration plan from anchors.
- Testability will improve only after browser-dependent logic is isolated enough to mock cleanly.
- SEO improvements beyond the current meta tags will be constrained until page boundaries are introduced.
