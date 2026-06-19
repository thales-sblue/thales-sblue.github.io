# TASK-013: GitHub Actions validation workflow

## Objetivo
Iniciar a fase 6 adicionando um workflow de GitHub Actions para validar automaticamente pull requests para `main` e pushes para `main`, sem alterar deploy, dependencias, testes existentes, UI, rotas, React ou Vite.

## Confirmacao Previa
- O PR `#14` (`test: add vitest testing foundation`) foi confirmado como merged na `main` antes do inicio desta task.
- A fase `5. Testes com Vitest e Testing Library` foundation foi concluida na `main` antes desta task.

## Workflow Criado
- Arquivo criado: `.github/workflows/validate.yml`
- Nome do workflow: `Validate`
- Job criado: `validate`
- Runner usado: `ubuntu-latest`

## Eventos Configurados
- `pull_request` para a branch `main`
- `push` para a branch `main`

## Node Usado
- `actions/setup-node@v4`
- `node-version: 22`
- `cache: npm`

## Comandos Executados No CI
- `npm ci`
- `npm run validate`

## Motivo Para Usar `npm run validate`
- O repositorio ja centraliza a verificacao completa no script `validate`.
- `npm run validate` cobre `lint`, `format:check`, `typecheck`, `test` e `build`.
- Reutilizar esse contrato reduz duplicacao entre validacao local e CI.

## Confirmacoes De Escopo
- O deploy via `gh-pages` nao foi alterado.
- Nenhum arquivo em `src/**` foi alterado.
- Nenhuma dependencia foi alterada.
- Nenhum secret, permissao especial, matrix, coverage, Playwright ou upload de artefatos foi adicionado.

## Validacoes Locais Executadas
- `cmd /c npm ci`
- `cmd /c npm.cmd run lint`
- `cmd /c npm.cmd run format:check`
- `cmd /c npm.cmd run typecheck`
- `cmd /c npm.cmd run test`
- `cmd /c npm.cmd run build`
- `cmd /c npm.cmd run validate`
- `git diff --name-status origin/main...HEAD`
- `git diff --name-only origin/main...HEAD -- src`
- `git diff --check origin/main...HEAD`
- `rg` scan for mojibake in `.github/workflows/validate.yml`, `docs/tasks/TASK-013-github-actions-validation.md`, `docs/STATE.md`, and `docs/ARCHITECTURE.md`

## Criterios De Aceite
- `.github/workflows/validate.yml` existe.
- O workflow roda em pull request para `main`.
- O workflow roda em push para `main`.
- O workflow usa `actions/checkout@v4`.
- O workflow usa `actions/setup-node@v4`.
- O workflow usa Node 22.
- O workflow usa cache npm.
- O workflow executa `npm ci`.
- O workflow executa `npm run validate`.
- Nenhum arquivo em `src/**` foi alterado.
- Nenhuma dependencia foi alterada.
- Deploy e GitHub Pages nao foram alterados.
- Nenhum secret ou permissao especial foi adicionado.
- As validacoes locais passaram.
- A documentacao foi atualizada.
- A fase 6 foi registrada como iniciada.
