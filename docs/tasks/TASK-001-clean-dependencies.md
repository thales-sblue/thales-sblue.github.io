# TASK-001: Clean Dependencies

## Goal
Remove invalid and unused dependencies from the repository without changing the site interface, current content, or runtime behavior.

## Scope
- Review dependency declarations in `package.json` and lockfile impact.
- Confirm whether each suspect dependency is referenced directly or indirectly by current source code and build configuration.
- Remove only dependencies proven to be invalid or unused.
- Update documentation and verification notes after the cleanup.
- No dependency may be removed without complete import search, configuration/script verification, controlled lockfile update, clean installation, and successful build validation.

## Suspect Dependencies
- `thales-dev`
- `@headlessui/react`
- `react-tsparticles`
- `tsparticles`
- `recharts`

## Out Of Scope
- Upgrading package versions.
- Refactoring components for new libraries.
- Introducing ESLint, Prettier, tests, CI, routes, or TypeScript.
- Removing unrelated source files unless a separate task explicitly authorizes it.

## Proposed Steps
1. Run a complete repository-wide import and reference search for each suspect dependency.
2. Verify relevant configuration files, scripts, and build tooling so no indirect usage is missed.
3. Remove only dependencies whose lack of required usage was confirmed directly in the current checkout.
4. Update the lockfile in a controlled manner through the normal package manager flow.
5. Perform a clean installation to validate the dependency graph after removal.
6. Run a successful build in the cleaned environment.
7. Review the diff for accidental source or UI changes.
8. Update `docs/STATE.md` with the task result.

## Acceptance Criteria
- `package.json` no longer contains dependencies proven invalid or unused.
- Lockfile is consistent with the dependency changes.
- No dependency was removed without complete import search and configuration/script verification.
- The lockfile update was performed in a controlled package-manager flow.
- A clean installation succeeded after the dependency changes.
- No files under `src/` are changed unless required solely by an import removal caused by a dependency cleanup.
- The site build completes successfully in an environment with installed dependencies.
- The final diff is limited to dependency-manifest and documentation updates for this task.
