# TASK-005: Migração do Button para TypeScript

## Objetivo
Migrar exclusivamente `src/components/ui/Button.jsx` para `src/components/ui/Button.tsx`, preservando integralmente o comportamento atual nos dois modos suportados pelo componente: link quando recebe `href` e botão HTML nativo quando não recebe `href`.

## Arquivos Autorizados
- `src/components/ui/Button.jsx` -> `src/components/ui/Button.tsx`
- `docs/tasks/TASK-005-typescript-button.md`
- `docs/STATE.md`

## Consumidores Encontrados
- `src/components/Hero.jsx`
  - `<Button href="#nasa">Explorar o Universo</Button>`
  - `<Button href="#projects" variant="secondary">Ver Projetos</Button>`
- `src/components/Contact.jsx`
  - `<Button href="mailto:thales_sblue@hotmail.com">Vamos conversar</Button>`
- `src/components/Nasa.jsx`
  - `<Button onClick={fetchApod} className="w-full disabled:opacity-50 sm:w-auto" disabled={loading}>...</Button>`

## Props Encontradas Por Consumidor
- `Hero`
  - `href`
  - `children`
  - `variant="secondary"` em um dos usos
- `Contact`
  - `href`
  - `children`
- `Nasa`
  - `onClick`
  - `className`
  - `disabled`
  - `children`
  - ausência de `href`

## Modos Link E Botão
- Modo link
  - selecionado pela presença de `href`
  - renderiza `<a>`
- Modo botão nativo
  - selecionado pela ausência de `href`
  - renderiza `<button type="button">`

## Estratégia De União Discriminada
- Derivar `ButtonVariant` com `keyof typeof variants`.
- Declarar `SharedButtonProps` com `variant?: ButtonVariant`, `className?: string` e `children: ReactNode`.
- Declarar `LinkButtonProps` como `SharedButtonProps` combinado com os atributos nativos de `<a>`, removendo `children` e `className`, e exigindo `href: string`.
- Declarar `NativeButtonProps` como `SharedButtonProps` combinado com os atributos nativos de `<button>`, removendo `children`, `className` e `type`, e proibindo `href` explicitamente com `href?: never`.
- Declarar `ButtonProps = LinkButtonProps | NativeButtonProps`.
- Discriminar os ramos com `if ("href" in props)`.

## Atributos Permitidos Em Cada Modo
- Link
  - atributos nativos compatíveis com âncora
  - `target`
  - `rel`
  - `download`
  - `aria-*`
  - handlers compatíveis com `<a>`
- Botão nativo
  - atributos nativos compatíveis com botão
  - `onClick`
  - `disabled`
  - `name`
  - `value`
  - `aria-*`
  - handlers compatíveis com `<button>`
  - `type` removido do contrato para preservar `type="button"` fixo no componente
  - `href` proibido explicitamente no modo nativo

## Regras De Propagação
- Em ambos os ramos, remover `variant`, `className` e `children` antes de propagar props ao elemento HTML.
- No ramo de link, remover também `href` e passá-lo explicitamente ao `<a>`.
- No ramo de botão, não aceitar sobrescrita de `type` e manter `type="button"`.
- Não propagar props internas ou inválidas ao DOM.

## Itens Fora Do Escopo
- Migrar `Reveal`, componentes de seção, arquivos de dados, `App.tsx`, `main.tsx`, `SectionHeading.tsx`, `WhatsAppButton.tsx`, configurações, dependências, testes, CI, rotas, deploy, conteúdo, classes, layout ou comportamento.
- Adicionar `forwardRef`.
- Alterar consumidores sem incompatibilidade real diretamente causada pelo contrato correto de `Button`.

## Etapas
1. Atualizar a `main` e confirmar diretamente o merge da TASK-004 no checkout atual.
2. Ler integralmente as fontes de verdade exigidas e inspecionar `Button.jsx`.
3. Rodar o baseline com `npm ci`, `lint`, `format:check`, `typecheck`, `build` e `validate`, registrando restrições do ambiente quando necessário.
4. Confirmar todos os imports e usos de `Button` com busca e revisão manual de `Hero`, `Contact` e `Nasa`.
5. Migrar somente `Button` para `.tsx` usando união discriminada por presença de `href`.
6. Atualizar `docs/STATE.md` e revisar o diff completo.
7. Reexecutar as validações, repetir após reinstalação limpa e concluir com um único commit.

## Critérios De Aceite
- `src/components/ui/Button.tsx` existe e `src/components/ui/Button.jsx` deixa de existir.
- Nenhum outro componente é migrado.
- `ButtonVariant` é derivado de `keyof typeof variants`.
- O modo link exige `href` e aceita apenas atributos compatíveis com âncora.
- O modo botão não aceita `href`, aceita `onClick` e `disabled`, e preserva `type="button"`.
- `variant`, `className`, `children` e `href` não vazam como atributos inválidos no DOM.
- Nenhum `any`, `@ts-ignore`, `@ts-nocheck`, `React.FC` ou cast de silenciamento é introduzido.
- Nenhum consumidor precisa ser alterado, salvo incompatibilidade real documentada, o que não foi identificado na inspeção atual nem após proibir `href` explicitamente no modo nativo.
- `npm ci`, `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm run build` e `npm run validate` passam após a implementação e após reinstalação limpa.
- Nenhuma dependência ou configuração é alterada.
- Nenhuma mudança visual, funcional, de SPA ou de compatibilidade com GitHub Pages é introduzida.
- A fase 4 permanece em andamento após esta tarefa.
