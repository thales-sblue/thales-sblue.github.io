# TASK-007: Migracao do Reveal para TypeScript

## Objetivo
Migrar exclusivamente `src/components/ui/Reveal.jsx` para `src/components/ui/Reveal.tsx`, preservando comportamento, animacao, classes, layout, consumidores, dependencias, configuracao e compatibilidade atual.

## Arquivos Autorizados
- `src/components/ui/Reveal.jsx` -> `src/components/ui/Reveal.tsx`
- `docs/tasks/TASK-007-typescript-reveal.md`
- `docs/STATE.md`

## Consumidores Encontrados
- `src/components/About.jsx`
- `src/components/Contact.jsx`
- `src/components/Skills.jsx`

## Props Utilizadas Pelos Consumidores
- `children`
- `className`

## Contrato Final De RevealProps
```ts
type RevealProps = HTMLMotionProps<"div"> & {
  as?: typeof motion.div;
  children: ReactNode;
  className?: string;
  delay?: number;
};
```

## Motivo Para Nao Criar Componente Polimorfico Generico
O uso atual nao exige um contrato polimorfico amplo. Os consumidores existentes passam apenas `children` e `className`, e a tarefa exige substituir o componente pelo contrato exato fornecido. Introduzir generics, type guards, assertions ou casts aumentaria a complexidade sem necessidade e fugiria do escopo.

## Animacao Preservada
- `motion` foi mantido.
- `defaultVariants` foi mantido.
- `hidden` continua com `opacity: 0` e `y: 24`.
- `visible` continua com `opacity: 1`, `y: 0` e `transition` com `duration: 0.6` e `ease: [0.25, 0.1, 0.25, 1]`.
- `initial="hidden"` foi mantido.
- `whileInView="visible"` foi mantido.
- `viewport={{ once: true, amount: 0.2 }}` foi mantido.
- `transition={{ delay }}` foi mantido.
- `className = ""` e `delay = 0` foram mantidos.
- O spread `{...props}` permaneceu depois das props padrao.

## Regras Fora Do Escopo
- Nao migrar `About`, `Contact` ou `Skills`.
- Nao alterar `App.tsx`, `main.tsx`, `Button.tsx`, `SectionHeading.tsx` ou `WhatsAppButton.tsx`.
- Nao alterar outros componentes, dados, rotas, deploy, dependencias, configuracoes, textos, classes, layout ou comportamento.
- Nao criar helper, generic polimorfico, type guard, assertion ou cast para silenciar TypeScript.

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
- `rg -n ':\s*any\b|<any>|as any|@ts-ignore|@ts-nocheck|React\.FC|asserts|type guard' src/components/ui/Reveal.tsx`
- `UTF-8 artifact scan for docs/tasks/TASK-007-typescript-reveal.md and docs/STATE.md`
- `PowerShell BOM scan for docs/tasks/TASK-007-typescript-reveal.md and docs/STATE.md`

## Criterios De Aceite
- `src/components/ui/Reveal.tsx` existe.
- `src/components/ui/Reveal.jsx` nao existe.
- Nenhum consumidor foi alterado.
- Nenhum outro componente foi migrado.
- `Reveal.tsx` usa exatamente o contrato definido na tarefa.
- Nenhuma animacao, classe, texto, dependencia ou configuracao foi alterada.
- Nenhum `any`, `as any`, `@ts-ignore`, `@ts-nocheck`, `React.FC`, helper, type guard ou assertion foi introduzido.
- `npm ci`, `lint`, `format:check`, `typecheck`, `build` e `validate` passam.
- A documentacao permanece em UTF-8 sem BOM.
- A aplicacao continua SPA, o build continua gerando `dist/`, GitHub Pages permanece inalterado e a fase 4 continua em andamento.
