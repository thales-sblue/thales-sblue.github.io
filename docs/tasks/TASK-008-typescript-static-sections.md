# TASK-008: Migracao das secoes estaticas para TypeScript

## Objetivo
Migrar exclusivamente `src/components/About.jsx`, `src/components/Contact.jsx` e `src/components/Skills.jsx` para `.tsx` com contratos simples e explicitos, preservando textos, icones, classes, layout, comportamento, consumidores, SPA e compatibilidade com GitHub Pages.

## Arquivos Autorizados
- `src/components/About.jsx` -> `src/components/About.tsx`
- `src/components/Contact.jsx` -> `src/components/Contact.tsx`
- `src/components/Skills.jsx` -> `src/components/Skills.tsx`
- `docs/tasks/TASK-008-typescript-static-sections.md`
- `docs/STATE.md`

## Consumidores Encontrados
- `src/App.tsx`
  - `import About from "./components/About";`
  - `import Skills from "./components/Skills";`
  - `import Contact from "./components/Contact";`
  - `<Skills />`
  - `<About />`
  - `<Contact />`

## Confirmacao Sobre Props
- `About` nao recebe props.
- `Contact` nao recebe props.
- `Skills` nao recebe props.

## Contratos Adicionados
```ts
type Highlight = {
  Icon: IconType;
  text: string;
};

type ContactLink = {
  label: string;
  href: string;
  Icon: IconType;
};

type Skill = {
  name: string;
  Icon: IconType;
};
```

## Motivo Do Uso De IconType
`IconType` tipa explicitamente os componentes de icone usados nos arrays locais sem introduzir helpers, assertions ou abstractions fora de escopo. Isso cobre `FaCode`, `FaDatabase`, `FaServer`, `FaGithub`, `FaLinkedin`, `FaEnvelope`, `FaReact`, `FaNodeJs`, `FaVuejs`, `DiJava`, `SiPhp`, `SiOracle`, `SiGit` e `SiPostgresql` mantendo o mesmo uso em JSX.

## Estrutura Preservada
- `SectionHeading` foi mantido nos tres componentes.
- `Reveal` foi mantido nos tres componentes.
- Os componentes continuam apresentacionais e sem props, estado, efeitos, fetch ou logica assincrona.
- Os textos, icones, classes e a estrutura JSX foram preservados.
- Nenhum consumidor foi alterado.

## Fora Do Escopo
- Nao alterar `src/App.tsx`.
- Nao migrar outros componentes.
- Nao alterar `Header`, `Hero`, `Nasa`, `Projects`, `Button`, `Reveal`, `SectionHeading` ou `WhatsAppButton`.
- Nao alterar arquivos de dados, configs, dependencias, `package.json`, `package-lock.json`, rotas, deploy, layout ou comportamento.
- Nao criar helpers compartilhados nem arquivos extras.

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
- `rg -n ':\s*any\b|<any>|as any|@ts-ignore|@ts-nocheck|React\.FC|asserts|type guard' src/components/About.tsx src/components/Contact.tsx src/components/Skills.tsx`
- `UTF-8 artifact scan for docs/tasks/TASK-008-typescript-static-sections.md and docs/STATE.md`
- `PowerShell BOM scan for docs/tasks/TASK-008-typescript-static-sections.md and docs/STATE.md`

## Criterios De Aceite
- `src/components/About.tsx` existe e `src/components/About.jsx` nao existe.
- `src/components/Contact.tsx` existe e `src/components/Contact.jsx` nao existe.
- `src/components/Skills.tsx` existe e `src/components/Skills.jsx` nao existe.
- Nenhum consumidor foi alterado.
- Nenhum outro componente foi migrado.
- `About`, `Contact` e `Skills` nao recebem props.
- `Highlight`, `ContactLink` e `Skill` estao tipados.
- Todos os icones estao tipados com `IconType`.
- Nenhum `any`, `as any`, `@ts-ignore`, `@ts-nocheck` ou `React.FC` foi introduzido.
- Todos os textos, icones, classes e layout foram preservados.
- `npm ci`, `lint`, `format:check`, `typecheck`, `build` e `validate` passam.
- A documentacao permanece em UTF-8 sem BOM.
- A aplicacao continua SPA, o build continua gerando `dist/`, GitHub Pages permanece inalterado e a fase 4 continua em andamento.
