# AGENTS

## Operating Rules
- Execute only one task at a time.
- Every task must define explicit acceptance criteria before implementation starts.
- Out-of-scope changes are prohibited, even if they appear low risk.
- Run `build`, `lint`, and `test` whenever those commands are available in the current repository state.
- Review the full diff before concluding any task.
- Update `docs/STATE.md` after each completed task.
- Each task must end in its own separate commit.
- Architecture decisions documented in this repository must not be changed silently; any change requires an explicit documentation update.
- Nenhum fato pode ser declarado como confirmado sem ter sido verificado diretamente no checkout atual. Inferências devem ser marcadas como hipóteses, evidências parciais ou confirmações pendentes.

## Workflow
1. Read the active task document and confirm scope, constraints, and acceptance criteria.
2. Inspect current repository state before editing.
3. Make only the changes required for the active task.
4. Run available verification commands and record blocked checks when they cannot run.
5. Review the diff for unintended changes.
6. Update `docs/STATE.md` with the task result, decisions, and verification status.
7. Create a dedicated commit for that task.
