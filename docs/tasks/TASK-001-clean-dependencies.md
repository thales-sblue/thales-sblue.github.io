# TASK-001: Clean Dependencies

## Goal
Remove invalid and unused dependencies from the repository without changing the site interface, current content, or runtime behavior.

## Scope
- Review dependency declarations in `package.json` and lockfile impact.
- Confirm whether each suspect dependency is referenced directly or indirectly by current source code and build configuration.
- Remove only dependencies proven to be invalid or unused.
- Update documentation and verification notes after the cleanup.

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
1. Confirm usage with repository-wide search and build/config inspection.
2. Remove only dependencies that have no functional role in the current app.
3. Regenerate lockfile through the normal package manager flow if required by the removal.
4. Run available verification commands.
5. Review the diff for accidental source or UI changes.
6. Update `docs/STATE.md` with the task result.

## Acceptance Criteria
- `package.json` no longer contains dependencies proven invalid or unused.
- Lockfile is consistent with the dependency changes.
- No files under `src/` are changed unless required solely by an import removal caused by a dependency cleanup.
- The site build completes successfully in an environment with installed dependencies.
- The final diff is limited to dependency-manifest and documentation updates for this task.
