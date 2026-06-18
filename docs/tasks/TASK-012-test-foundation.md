# TASK-012: Base de testes com Vitest e Testing Library

## Objetivo
Encerrar formalmente a fase 4 de TypeScript e iniciar a fase 5 com a base inicial de testes automatizados usando Vitest e Testing Library, sem alterar layout, textos, classes Tailwind, comportamento, rotas, deploy, GitHub Pages, React ou Vite.

## Escopo
- Validar e documentar o encerramento da fase 4.
- Instalar dependencias de teste e configurar Vitest em `jsdom`.
- Adicionar scripts `test` e `test:watch`.
- Atualizar `validate` para incluir testes.
- Criar setup de testes com Testing Library.
- Criar testes pequenos e uteis para `Button`, `SectionHeading`, `Projects` e `Nasa`.
- Registrar o inicio da fase 5 no estado atual do repositorio.

## Arquivos Autorizados
- `package.json`
- `package-lock.json`
- `vitest.config.ts`
- `src/test/setup.ts`
- `src/**/*.test.tsx`
- `docs/STATE.md`
- `docs/tasks/TASK-012-test-foundation.md`

## Confirmacao De Merge Da TASK-011
- O PR `#12` (`chore: migrate nasa to typescript`) foi confirmado como merged na `main`.
- `src/components/Nasa.tsx` existe na `main`.
- `src/components/Nasa.jsx` nao existe na `main`.
- `docs/STATE.md` ja registrava `TASK-011` antes desta task.

## Confirmacao De Ausencia De .jsx
- Em `src/components`: nenhum arquivo `.jsx`.
- Em `src`: nenhum arquivo `.jsx`.

## Arquivos .js Restantes Em src
- `src/data/projects.js`
- `src/data/projects.min.js`
- Esses arquivos permanecem fora do escopo desta task.

## Dependencias De Teste Adicionadas
- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `jsdom`

## Scripts Adicionados Ou Alterados
- `test`: `vitest run`
- `test:watch`: `vitest`
- `validate`: `npm run lint && npm run format:check && npm run typecheck && npm run test && npm run build`

## Configuracao Do Vitest
- Arquivo criado: `vitest.config.ts`
- Ambiente: `jsdom`
- Setup carregado: `./src/test/setup.ts`
- `clearMocks: true`
- A configuracao de build do Vite existente nao foi alterada.

## Setup Da Testing Library
- Arquivo criado: `src/test/setup.ts`
- Import principal: `@testing-library/jest-dom/vitest`
- `cleanup()` executado a cada teste.
- `IntersectionObserver` simulado localmente no setup para estabilizar componentes com `framer-motion` em `jsdom`.

## Testes Criados
- `src/components/ui/Button.test.tsx`
- `src/components/ui/SectionHeading.test.tsx`
- `src/components/Projects.test.tsx`
- `src/components/Nasa.test.tsx`

## Cobertura De Cada Teste
- `Button`
  - renderiza como link quando recebe `href`
  - renderiza como botao quando nao recebe `href`
  - aplica `type="button"` no modo botao
  - repassa `disabled`
  - preserva `children`
- `SectionHeading`
  - renderiza `title`
  - renderiza `subtitle` quando informado
  - nao quebra sem `subtitle`
  - aceita `align` e `className` sem acoplamento a detalhes visuais excessivos
- `Projects`
  - renderiza o titulo da secao
  - renderiza pelo menos um projeto do dataset real
  - renderiza links de projeto com `href`
  - preserva o texto `Ver no GitHub`
- `Nasa`
  - renderiza o titulo da secao
  - renderiza o input de data
  - renderiza o botao `Buscar`
  - ao clicar em `Buscar` sem data, mostra `Selecione uma data.`
  - nao chama a API nesse caso

## Fora Do Escopo
- Nao alterar layout.
- Nao alterar textos.
- Nao alterar classes Tailwind.
- Nao alterar comportamento da aplicacao.
- Nao alterar rotas.
- Nao adicionar React Router.
- Nao adicionar GitHub Actions.
- Nao atualizar React.
- Nao atualizar Vite.
- Nao mexer em SEO.
- Nao mexer em performance.
- Nao alterar conteudo dos projetos.
- Nao alterar deploy ou `gh-pages`.

## Validacoes Executadas
- `cmd /c npm ci`
- `cmd /c npm.cmd run lint`
- `cmd /c npm.cmd run format:check`
- `cmd /c npm.cmd run typecheck`
- `cmd /c npm.cmd run build`
- `cmd /c npm.cmd run validate`
- `bash -lc "find src/components -name '*.jsx' -print"` tentou executar a busca pedida, mas o ambiente Windows nao possui WSL instalado
- `Get-ChildItem -Path src/components -Recurse -Filter *.jsx`
- `Get-ChildItem -Path src -Recurse -Filter *.jsx`
- `Get-ChildItem -Path src -Recurse -Filter *.js`
- `cmd /c npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`
- `cmd /c npx prettier package.json --write`
- `cmd /c npm.cmd run lint`
- `cmd /c npm.cmd run format:check`
- `cmd /c npm.cmd run typecheck`
- `cmd /c npm.cmd run test`
- `cmd /c npm.cmd run build`
- `cmd /c npm.cmd run validate`
- `Remove-Item -LiteralPath node_modules -Recurse -Force`
- `cmd /c npm ci`
- `cmd /c npm.cmd run lint`
- `cmd /c npm.cmd run format:check`
- `cmd /c npm.cmd run typecheck`
- `cmd /c npm.cmd run test`
- `cmd /c npm.cmd run build`
- `cmd /c npm.cmd run validate`
- `git diff --name-status origin/main...HEAD`
- `git diff --check origin/main...HEAD`
- `rg -n ':\s*any\b|<any>|as any|@ts-ignore|@ts-nocheck|React\.FC|asserts|type guard' src`
- busca de mojibake com `rg` em `src`, `docs/tasks/TASK-012-test-foundation.md`, `docs/STATE.md` e `docs/ARCHITECTURE.md`
- PowerShell BOM scan em `docs/tasks/TASK-012-test-foundation.md`, `docs/STATE.md` e `docs/ARCHITECTURE.md`

## Criterios De Aceite
- PR `#12` confirmado como merged na `main`.
- Fase 4 registrada como concluida.
- Fase 5 registrada como iniciada.
- Nenhum `.jsx` em `src/components`.
- Nenhum `.jsx` em `src`.
- Arquivos `.js` restantes em `src` documentados.
- Vitest instalado.
- Testing Library instalada.
- `jsdom` configurado.
- Setup de testes existente.
- Scripts `test` e `test:watch` existentes.
- `validate` incluindo `test`.
- Testes para `Button`, `SectionHeading`, `Projects` e `Nasa`.
- Nenhum teste depende de rede.
- Nenhum snapshot foi criado.
- Nenhuma mudanca visual ou funcional foi introduzida.
- Nenhuma alteracao de deploy foi feita.
- React e Vite nao foram atualizados deliberadamente.
- Documentacao mantida em UTF-8 sem BOM e sem mojibake.

## Proximo Passo Recomendado
- Iniciar a fase 6 com GitHub Actions em PR separado, somente depois da validacao desta base de testes.
