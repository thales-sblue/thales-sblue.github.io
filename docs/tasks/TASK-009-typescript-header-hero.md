# TASK-009: Migracao do Header e Hero para TypeScript

## Objetivo
Migrar exclusivamente `src/components/Header.jsx` e `src/components/Hero.jsx` para `.tsx` com contratos simples e locais, preservando textos, links, classes, icones, layout, navegacao por ancora, animacoes, consumidores, SPA e compatibilidade com GitHub Pages.

## Arquivos Autorizados
- `src/components/Header.jsx` -> `src/components/Header.tsx`
- `src/components/Hero.jsx` -> `src/components/Hero.tsx`
- `docs/tasks/TASK-009-typescript-header-hero.md`
- `docs/STATE.md`

## Consumidores Encontrados
- `src/App.tsx`
  - `import Header from "./components/Header";`
  - `import Hero from "./components/Hero";`
  - `<Header />`
  - `<Hero />`

## Confirmacao Sobre Props
- `Header` nao recebe props.
- `Hero` nao recebe props.

## Tipos Locais Adicionados
```ts
type NavItem = {
  name: string;
  href: string;
};

type Skill = {
  name: string;
  Icon: IconType;
};
```

## Motivo De Cada Tipo
- `NavItem` tipa o array local de navegacao do `Header` sem alterar comportamento, ordem, links ou estrutura JSX.
- `Skill` tipa o array local de icones orbitais do `Hero`; `IconType` foi usado porque o arquivo ja possui um array local com icones.

## Estrutura Preservada
- Textos preservados.
- Links preservados.
- Classes Tailwind preservadas.
- Estrutura JSX preservada.
- Ordem dos elementos preservada.
- Navegacao por ancora preservada.
- Animacoes preservadas.
- `Button` preservado.
- Nenhum consumidor foi alterado.
- `src/App.tsx` nao foi alterado.
- Uma correcao posterior de mojibake restaurou `Início`, `Olá` e `soluções` sem alterar tipagens, estrutura JSX, classes, links ou comportamento.

## Fora Do Escopo
- Nao refatorar nem redesenhar.
- Nao alterar `src/App.tsx`.
- Nao alterar `Button`, `Reveal`, `Nasa`, `Projects`, `About`, `Contact`, `Skills`, `SectionHeading` ou `WhatsAppButton`.
- Nao alterar arquivos de dados, configs, dependencias, `package.json`, `package-lock.json`, rotas, deploy, textos, classes, layout ou links.
- Nao corrigir falhas preexistentes de baseline fora do escopo desta task.

## Validacoes Executadas
- `cmd /c npm ci`
- `cmd /c npm.cmd run lint`
- `cmd /c npm.cmd run format:check`
- `cmd /c npm.cmd run typecheck`
- `cmd /c npm.cmd run build`
- `cmd /c npm.cmd run validate`
- `Remove-Item -LiteralPath node_modules -Recurse -Force`
- `cmd /c npm ci`
- `cmd /c npm.cmd run lint`
- `cmd /c npm.cmd run format:check`
- `cmd /c npm.cmd run typecheck`
- `cmd /c npm.cmd run build`
- `cmd /c npm.cmd run validate`
- `git diff --name-status origin/main...HEAD`
- `git diff --check origin/main...HEAD`
- `rg -n ':\s*any\b|<any>|as any|@ts-ignore|@ts-nocheck|React\.FC|asserts|type guard' src/components/Header.tsx src/components/Hero.tsx`
- `UTF-8 artifact scan for docs/tasks/TASK-009-typescript-header-hero.md and docs/STATE.md`
- `PowerShell BOM scan for docs/tasks/TASK-009-typescript-header-hero.md and docs/STATE.md`

## Criterios De Aceite
- `src/components/Header.tsx` existe e `src/components/Header.jsx` nao existe.
- `src/components/Hero.tsx` existe e `src/components/Hero.jsx` nao existe.
- Nenhum consumidor foi alterado.
- Nenhum outro componente foi migrado.
- `Header` nao recebe props.
- `Hero` nao recebe props.
- Apenas os tipos locais necessarios foram adicionados.
- Nenhum `any`, `as any`, `@ts-ignore`, `@ts-nocheck`, `React.FC`, assertion artificial ou type guard artificial foi introduzido.
- Todos os textos, links, icones, classes e layout foram preservados.
- A documentacao permanece em UTF-8 sem BOM.
- A aplicacao continua SPA, o build continua gerando `dist/`, GitHub Pages permanece inalterado e a fase 4 continua em andamento.
