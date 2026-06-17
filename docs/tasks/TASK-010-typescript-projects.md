# TASK-010: Migracao do Projects para TypeScript

## Objetivo
Migrar exclusivamente `src/components/Projects.jsx` para `src/components/Projects.tsx` com tipagem local simples e explicita, sem alterar comportamento, layout, textos, classes, links, animacoes, dados, consumidores, SPA ou compatibilidade com GitHub Pages.

## Arquivos Autorizados
- `src/components/Projects.jsx` -> `src/components/Projects.tsx`
- `docs/tasks/TASK-010-typescript-projects.md`
- `docs/STATE.md`

## Consumidor Encontrado
- `src/App.tsx`
  - `import Projects from "./components/Projects";`
  - `<Projects />`

## Confirmacao Sobre Props
- `Projects` nao recebe props.

## Contrato Project
```ts
type Project = {
  title: string;
  description: string;
  link: string;
  image?: string;
  Icon: IconType;
};
```

## Motivo Do Uso De IconType
- `IconType` tipa explicitamente `proj.Icon` sem alterar o contrato atual do array `projects`.
- O fallback visual de icone continua igual quando `proj.image` nao existe.

## Motivo Do Uso De Variants
- `Variants` tipa `cardVariants` localmente sem alterar `hidden`, `visible`, `opacity`, `y`, `delay`, `duration`, `ease`, `initial`, `whileInView`, `viewport` ou `custom`.

## Justificativa Do Cast Local
- `const typedProjects = projects as Project[];` foi usado apenas no consumo local porque `projects` ainda vem de `src/data/projects.js` durante a coexistencia JS/TS da fase 4.
- Nenhum outro cast foi introduzido.

## Confirmacao Sobre Os Dados
- `src/data/projects.js` nao foi alterado.
- `src/data/projects.min.js` nao foi alterado.
- O import de dados foi preservado.

## Estrutura Preservada
- Estrutura JSX preservada.
- `SectionHeading` preservado.
- `motion.a` preservado.
- `cardVariants` preservado.
- Fallback de icone preservado quando `proj.image` nao existe.
- Texto `Ver no GitHub ->` preservado no componente.
- Textos, links, classes, icones, imagens e layout preservados.

## Animacao Preservada
- `hidden` e `visible` preservados.
- `opacity` e `y` preservados.
- `delay: i * 0.08` preservado.
- `duration: 0.5` preservado.
- `ease: [0.25, 0.1, 0.25, 1]` preservado.
- `initial="hidden"` preservado.
- `whileInView="visible"` preservado.
- `viewport={{ once: true, amount: 0.2 }}` preservado.
- `custom={index}` preservado.

## Fora Do Escopo
- Nao migrar `src/components/Nasa.jsx`.
- Nao alterar `src/App.tsx`.
- Nao alterar consumidores.
- Nao alterar `src/data/projects.js`.
- Nao alterar `src/data/projects.min.js`.
- Nao alterar dependencias, configuracoes, rotas, deploy, layout, classes, textos ou comportamento.

## Validacoes Executadas
- `cmd /c npm ci`
- `cmd /c npm.cmd run lint`
- `cmd /c npm.cmd run format:check`
- `cmd /c npx prettier src/components/Projects.tsx --write`
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
- `rg -n ':\s*any\b|<any>|as any|@ts-ignore|@ts-nocheck|React\.FC|asserts|type guard|unknown' src/components/Projects.tsx`
- `mojibake scan with rg on src/components/Projects.tsx, docs/tasks/TASK-010-typescript-projects.md, and docs/STATE.md`
- `PowerShell BOM scan for docs/tasks/TASK-010-typescript-projects.md and docs/STATE.md`

## Criterios De Aceite
- `src/components/Projects.tsx` existe.
- `src/components/Projects.jsx` nao existe.
- `src/components/Nasa.jsx` continua existindo.
- Nenhum consumidor foi alterado.
- Nenhum outro componente foi migrado.
- `Projects` nao recebe props.
- `Project` esta tipado localmente.
- `cardVariants` esta tipado com `Variants`.
- `Icon` esta tipado com `IconType`.
- O cast local `projects as Project[]` esta documentado.
- `src/data/projects.js` nao foi alterado.
- `src/data/projects.min.js` nao foi alterado.
- Textos, links, icones, imagens, classes, animacoes e layout foram preservados.
- Nenhum `any`, `as any`, `@ts-ignore`, `@ts-nocheck`, `unknown` ou `React.FC` foi introduzido.
- `npm ci`, `lint`, `format:check`, `typecheck`, `build` e `validate` passam.
- A documentacao permanece em UTF-8 sem BOM.
- A aplicacao continua SPA, o build continua gerando `dist/`, GitHub Pages permanece inalterado e a fase 4 continua em andamento.
