# TASK-014: Update Vite toolchain

## Objetivo
Iniciar a fase 7 atualizando somente o tooling do Vite, limitado a `vite` e `@vitejs/plugin-react`, sem atualizar React, React DOM, Tailwind, Framer Motion, ESLint, TypeScript, Vitest, deploy, GitHub Actions, UI, rotas ou arquivos em `src/**`.

## Confirmacao Previa
- O PR `#15` (`ci: add validation workflow`) foi confirmado como merged na `main` antes do inicio desta task.
- O workflow `Validate` foi confirmado com pelo menos uma execucao `success` antes do inicio desta task.
- A fase `6. GitHub Actions` estava em progresso na `main` antes desta task.

## Dependencias Atualizadas
- `vite`: `4.5.14` -> `8.0.16`
- `@vitejs/plugin-react`: `4.4.1` -> `6.0.2`

## Dependencias Mantidas
- `react`: mantido em `18.3.1`
- `react-dom`: mantido em `18.3.1`

## Arquivos Alterados
- `package.json`
- `package-lock.json`
- `docs/STATE.md`
- `docs/tasks/TASK-014-update-vite-toolchain.md`

## Compatibilidade
- `@vitejs/plugin-react` ja estava instalado e em uso no projeto.
- Nenhum arquivo de configuracao do Vite precisou ser alterado para compatibilidade.

## Confirmacoes De Escopo
- React nao foi atualizado.
- React DOM nao foi atualizado.
- Nenhum arquivo em `src/**` foi alterado.
- Nenhum teste existente foi alterado.
- Nenhuma mudanca visual ou funcional intencional foi introduzida.
- Deploy e GitHub Pages nao foram alterados.
- GitHub Actions nao foi alterado.

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
- `rg` scan for mojibake in `docs/tasks/TASK-014-update-vite-toolchain.md` and `docs/STATE.md`

## Resultado Do Workflow No PR
- Pendente ate a abertura do PR desta task.

## Criterios De Aceite
- O PR `#15` estava merged na `main` antes do inicio da task.
- O workflow `Validate` ja havia passado pelo menos uma vez antes do inicio da task.
- Somente o tooling do Vite foi atualizado.
- React e React DOM nao foram atualizados.
- Nenhum arquivo em `src/**` foi alterado.
- Deploy e GitHub Actions nao foram alterados.
- Os testes existentes continuaram passando.
- `npm run validate` passou localmente.
- A documentacao registra versoes anteriores e novas.
- A fase 7 foi registrada como iniciada.
