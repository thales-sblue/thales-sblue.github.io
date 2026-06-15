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
  - `SectionHeading title="Universo no seu dia" subtitle="JÃ¡ pensou em ver o cÃ©u no dia do seu aniversÃ¡rio?"`
- `src/components/Projects.jsx`
  - `SectionHeading title="Meus Projetos" subtitle="SoluÃ§Ãµes que desenvolvi em diferentes stacks e contextos."`
- `src/components/Skills.jsx`
  - `SectionHeading title="Hard Skills" subtitle="Tecnologias que uso no dia a dia para entregar soluÃ§Ãµes."`
- `src/App.tsx`
  - `WhatsAppButton` sem props

## Contratos De Props Identificados
- `SectionHeading`
  - `title`: sempre utilizado; atualmente apenas strings, mas o contrato aceito serÃ¡ `ReactNode`
  - `subtitle`: opcional; atualmente utilizado com strings em `Contact`, `Nasa`, `Projects` e `Skills`
  - `align`: opcional; valor encontrado na base atual: apenas `"left"` em `About`
  - `className`: opcional; valor encontrado na base atual: apenas `"md:mb-12"` em `About`
- `WhatsAppButton`
  - nÃ£o recebe props

## EstratÃ©gia De Tipagem
- Declarar `SectionHeadingProps` com `title` e `subtitle` como `ReactNode`, `align` como uniÃ£o `"left" | "center" | "right"`, e `className` como `string`.
- Aplicar o tipo diretamente ao parÃ¢metro da funÃ§Ã£o `SectionHeading`.
- Manter `WhatsAppButton` como funÃ§Ã£o sem props e sem tipo artificial vazio.
- Preservar imports sem extensÃ£o, porque os consumidores atuais continuam vÃ¡lidos com a troca de `.jsx` para `.tsx`.

## Itens Fora Do Escopo
- Migrar `Button`, `Reveal`, componentes de seÃ§Ã£o, arquivos de dados, `main.tsx`, configuraÃ§Ãµes, dependÃªncias, testes, CI, deploy, rotas, textos, classes CSS ou estrutura visual.
- Alterar `App.tsx`, salvo incompatibilidade diretamente causada por `WhatsAppButton`, o que nÃ£o foi identificado na inspeÃ§Ã£o atual.
- Ampliar o contrato de `align` para valores fora de `"left" | "center" | "right"`.

## Etapas
1. Registrar baseline validada em `main` antes da implementaÃ§Ã£o.
2. Renomear os dois componentes autorizados para `.tsx`.
3. Adicionar tipagem explÃ­cita apenas onde necessÃ¡rio em `SectionHeading`.
4. Verificar se os consumidores atuais continuam vÃ¡lidos sem ediÃ§Ãµes.
5. Atualizar `docs/STATE.md` com escopo, comandos, resultados e fase 4 ainda em andamento.
6. Executar lint, format, typecheck, build e validate, repetir apÃ³s reinstalaÃ§Ã£o limpa, revisar diff e concluir com um Ãºnico commit.

## CritÃ©rios De Aceite
- `src/components/ui/SectionHeading.tsx` existe e `src/components/ui/SectionHeading.jsx` deixa de existir.
- `src/components/WhatsAppButton.tsx` existe e `src/components/WhatsAppButton.jsx` deixa de existir.
- `SectionHeading` possui contrato explÃ­cito com `title: ReactNode`, `subtitle?: ReactNode`, `align?: "left" | "center" | "right"` e `className?: string`.
- `WhatsAppButton` permanece sem props e sem tipo vazio artificial.
- Nenhum `any`, `@ts-ignore` ou `@ts-nocheck` Ã© introduzido.
- Nenhum outro componente Ã© migrado.
- `npm ci`, `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm run build` e `npm run validate` passam antes e depois da reinstalaÃ§Ã£o limpa.
- NÃ£o hÃ¡ mudanÃ§a visual, funcional, de SPA ou de compatibilidade com GitHub Pages.
