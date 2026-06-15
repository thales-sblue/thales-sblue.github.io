# Audit

## Repository Snapshot
- Stack: React 18 + Vite 4 + Tailwind CSS 3.
- Entry flow: `index.html` -> `src/main.jsx` -> `src/App.jsx`.
- Current app shape: single-page application with section-based navigation and no router.
- Build scripts present: `dev`, `build`, `preview`, `predeploy`, `deploy`.
- Quality tooling present: none for linting, formatting, unit tests, e2e tests, or CI workflows.
- Deployment model: GitHub Pages via `gh-pages -d dist`.

## Observed Structure
- Root files: `index.html`, `package.json`, `package-lock.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `README.md`.
- Source layout:
  - `src/App.jsx`
  - `src/main.jsx`
  - `src/index.css`
  - `src/components/*`
  - `src/components/ui/*`
  - `src/data/projects.js`
  - `src/data/projects.min.js`
  - `src/assets/*`
- `.github/` is absent.
- `docs/` was absent before this task.

## Current Sections And Order
- `Header`
- `Hero`
- `Nasa`
- `Projects`
- `Skills`
- `About`
- `Contact`
- `WhatsAppButton`

## Component Notes
- `Header` implements anchor navigation, active-section tracking on scroll, and a mobile menu.
- `Hero` is content-heavy, uses multiple icon imports, local assets, animation, and DOM measurement via `getBoundingClientRect`.
- `Nasa` is the only data-fetching section; it uses `fetch`, `localStorage`, `import.meta.env.VITE_NASA_API_KEY`, date validation, and conditional image/video rendering.
- `Projects` renders cards from `src/data/projects.js`.
- `About`, `Skills`, and `Contact` are presentational sections built from local arrays.
- UI primitives currently consist of `Button`, `SectionHeading`, and `Reveal`.

## Dependency Review

### In Use
- `react`
- `react-dom`
- `framer-motion`
- `react-icons`
- `vite`
- `@vitejs/plugin-react`
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `gh-pages`

### Suspect Or Invalid
- `thales-dev: "file:"`
  - Invalid as a normal application dependency and likely self-referential residue.
  - High-confidence cleanup candidate.
- `@headlessui/react`
  - No usage found in repository search.
  - Likely unused.
- `react-tsparticles`
  - No usage found in repository search.
  - Likely unused.
- `tsparticles`
  - No usage found in repository search.
  - Likely unused.
- `recharts`
  - No usage found in repository search.
  - Likely unused.

## Additional Cleanup Candidates
- `src/data/projects.min.js`
  - Minified source file committed alongside the readable source version.
  - Not imported by the current app.
  - Candidate for later cleanup after dependency work, because it is source-level clutter rather than a package dependency.

## Technical Risks

### Gradual TypeScript Migration
- Entire codebase is `.jsx`, with no `tsconfig.json`, no declaration files, and no typed props.
- Several components rely on implicit object shapes from arrays and imported data.
- `Nasa` uses nullable API state and browser-only APIs, which will need explicit typing and runtime guards.
- `Reveal` accepts a polymorphic `as` prop and forwards props, which is a common TypeScript friction point.

### React Upgrade
- Current code already uses `createRoot` and `StrictMode`, which reduces migration friction.
- Compatibility must be verified for `framer-motion`, `react-icons`, and any future router/test libraries before changing React.
- Scroll effects and animation timing should be regression-tested because they drive perceived behavior.

### Vite Upgrade
- `vite.config.js` uses `base: ''`, which is fragile for static hosting and should be validated before any upgrade.
- The app depends on `import.meta.env`, asset imports, and GitHub Pages output behavior.
- Plugin compatibility with the chosen React version must be validated independently.

### Routes
- Current navigation assumes a single document with anchor targets and manual `window.scrollTo`.
- Adding React Router will require a compatibility plan for existing section links, scroll restoration, and direct entry on GitHub Pages.
- Future route-level SEO and metadata are blocked until route boundaries exist.

### GitHub Pages
- Current deployment strategy works for a single-page static bundle pushed to `dist`.
- SPA routing will need a static-hosting fallback strategy before routes can go live.
- `base: ''` should be reviewed carefully during any tooling change because asset paths on Pages are sensitive.

### Automated Tests
- No test runner, no assertions library, no test scripts, and no CI workflow exist today.
- Components mix rendering, animation, browser APIs, and external fetch logic, so test introduction should start with contained units and smoke coverage.
- `Nasa` requires mocking `fetch`, `localStorage`, and environment variables.

### SEO
- Baseline SEO exists in `index.html`: `lang`, `title`, description, theme color, and Open Graph title/description/type/url.
- There is no canonical tag, structured data, social preview image, robots policy, or page-level metadata model.
- Single-document architecture limits semantic separation of future portfolio pages and detailed case studies.

### Accessibility
- Some positive signals exist: `lang="pt-BR"`, mobile menu labels, WhatsApp aria-label, visible button labels.
- Gaps remain: no skip link, no documented heading outline policy, clickable project cards rely on card semantics rather than explicit call-to-action text, and dynamic content has not been audited with assistive technology.
- Date input, iframe content, focus states, keyboard flow, and color contrast need explicit verification.

## Verification Status
- `cmd /c npm run build` fails because local dependencies are not installed and `vite` is unavailable in the current workspace.
- `lint` and `test` scripts do not exist yet.
