# TASK-004: TypeScript Simple Components

## Objetivo
Migrar apenas `src/components/ui/SectionHeading.jsx` e `src/components/WhatsAppButton.jsx` para TypeScript, preservando integralmente estrutura visual, classes, conteúdo e comportamento da SPA atual.

## Arquivos Autorizados
- `src/components/ui/SectionHeading.jsx` -> `src/components/ui/SectionHeading.tsx`
- `src/components/WhatsAppButton.jsx` -> `src/components/WhatsAppButton.tsx`
- `docs/STATE.md`
- `docs/tasks/TASK-004-typescript-simple-components.md`

## Consumidores Encontrados
- `src/components/About.jsx`
  - `SectionHeading title="Sobre Mim" align="left" className="md:mb-12"`
- `src/components/Contact.jsx`
  - `SectionHeading title="Contato" subtitle="Me envie uma mensagem ou conecte-se comigo nas redes."`
- `src/components/Nasa.jsx`
  - `SectionHeading title="Universo no seu dia" subtitle="Já pensou em ver o céu no dia do seu aniversário?"`
- `src/components/Projects.jsx`
  - `SectionHeading title="Meus Projetos" subtitle="Soluções que desenvolvi em diferentes stacks e contextos."`
- `src/components/Skills.jsx`
  - `SectionHeading title="Hard Skills" subtitle="Tecnologias que uso no dia a dia para entregar soluções."`
- `src/App.tsx`
  - `WhatsAppButton` sem props

## Contratos De Props Identificados
- `SectionHeading`
  - `title`: sempre utilizado; atualmente apenas strings, mas o contrato aceito será `ReactNode`
  - `subtitle`: opcional; atualmente utilizado com strings em `Contact`, `Nasa`, `Projects` e `Skills`
  - `align`: opcional; valor encontrado na base atual: apenas `"left"` em `About`
  - `className`: opcional; valor encontrado na base atual: apenas `"md:mb-12"` em `About`
- `WhatsAppButton`
  - não recebe props

## Estratégia De Tipagem
- Declarar `SectionHeadingProps` com `title` e `subtitle` como `ReactNode`, `align` como união `"left" | "center" | "right"`, e `className` como `string`.
- Aplicar o tipo diretamente ao parâmetro da função `SectionHeading`.
- Manter `WhatsAppButton` como função sem props e sem tipo artificial vazio.
- Preservar imports sem extensão, porque os consumidores atuais continuam válidos com a troca de `.jsx` para `.tsx`.

## Itens Fora Do Escopo
- Migrar `Button`, `Reveal`, componentes de seção, arquivos de dados, `main.tsx`, configurações, dependências, testes, CI, deploy, rotas, textos, classes CSS ou estrutura visual.
- Alterar `App.tsx`, salvo incompatibilidade diretamente causada por `WhatsAppButton`, o que não foi identificado na inspeção atual.
- Ampliar o contrato de `align` para valores fora de `"left" | "center" | "right"`.

## Etapas
1. Registrar baseline validada em `main` antes da implementação.
2. Renomear os dois componentes autorizados para `.tsx`.
3. Adicionar tipagem explícita apenas onde necessário em `SectionHeading`.
4. Verificar se os consumidores atuais continuam válidos sem edições.
5. Atualizar `docs/STATE.md` com escopo, comandos, resultados e fase 4 ainda em andamento.
6. Executar lint, format, typecheck, build e validate, repetir após reinstalação limpa, revisar diff e concluir com um único commit.

## Critérios De Aceite
- `src/components/ui/SectionHeading.tsx` existe e `src/components/ui/SectionHeading.jsx` deixa de existir.
- `src/components/WhatsAppButton.tsx` existe e `src/components/WhatsAppButton.jsx` deixa de existir.
- `SectionHeading` possui contrato explícito com `title: ReactNode`, `subtitle?: ReactNode`, `align?: "left" | "center" | "right"` e `className?: string`.
- `WhatsAppButton` permanece sem props e sem tipo vazio artificial.
- Nenhum `any`, `@ts-ignore` ou `@ts-nocheck` é introduzido.
- Nenhum outro componente é migrado.
- `npm ci`, `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm run build` e `npm run validate` passam antes e depois da reinstalação limpa.
- Não há mudança visual, funcional, de SPA ou de compatibilidade com GitHub Pages.
