# TASK-006: Correção do contrato nativo do Button

## Objetivo
Corrigir exclusivamente o contrato tipado de `src/components/ui/Button.tsx` para proibir explicitamente `href` no modo botão nativo, sem alterar comportamento, layout, classes, consumidores, dependências, configuração ou conteúdo.

## Problema Identificado
O contrato anterior de `NativeButtonProps` removia `children`, `className` e `type` dos atributos nativos de `<button>`, mas não proibia explicitamente `href`. A correção final mantém somente a restrição `href?: never` no contrato nativo e dois ramos diretos de execução: `props.href !== undefined` seleciona o modo link e a ausência de `href` seleciona o modo botão.

## Arquivo Alterado
- `src/components/ui/Button.tsx`

## Contrato Anterior
```ts
type NativeButtonProps = SharedButtonProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className" | "type">;
```

## Contrato Corrigido
```ts
type NativeButtonProps = SharedButtonProps &
  Omit<
    ComponentPropsWithoutRef<"button">,
    "children" | "className" | "type"
  > & {
    href?: never;
  };
```

## Motivo Do Uso De `href?: never`
- Proíbe explicitamente `href` no modo botão nativo.
- Preserva o modo link como o único ramo que aceita e exige `href: string`.
- Mantém apenas dois ramos diretos no componente.
- Não usa assertion artificial.
- Não usa type guard.
- Não usa cast.
- Não introduz branch runtime extra.

## Critérios De Aceite
- `NativeButtonProps` contém `href?: never`.
- `LinkButtonProps` continua exigindo `href: string`.
- `props.href !== undefined` seleciona o modo link.
- A ausência de `href` seleciona o modo botão.
- `type="button"` continua fixo.
- Nenhum consumidor é alterado.
- Nenhuma dependência ou configuração é alterada.
- Nenhuma mudança visual ou funcional é introduzida.
- `lint`, `format:check`, `typecheck`, `build` e `validate` passam.
- A documentação permanece em UTF-8 válido.
- A fase 4 permanece em andamento.

## Validações Executadas
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
- `rg -n "any|@ts-ignore|@ts-nocheck|React\.FC|asserts props is|assertLinkButtonProps|as LinkButtonProps|typeof props\.href !== \"string\"" src/components/ui/Button.tsx`
- `$utfPattern = [string]([char]0x00C3) + "|" + [char]0x00C2 + "|" + [char]0xFFFD`
- `rg -n $utfPattern docs/tasks/TASK-006-button-native-href-contract.md docs/STATE.md`

## Confirmação De Ausência De Mudança Visual Ou Funcional
A alteração ficou limitada ao contrato de `NativeButtonProps` e à seleção direta dos dois ramos em `src/components/ui/Button.tsx`. As classes atuais, o `type="button"` e todos os consumidores existentes foram preservados sem qualquer mudança visual ou funcional.
