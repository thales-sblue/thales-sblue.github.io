# TASK-006: Correção do contrato nativo do Button

## Objetivo
Corrigir exclusivamente o contrato tipado de `src/components/ui/Button.tsx` para proibir explicitamente `href` no modo botão nativo, sem alterar comportamento, layout, classes, consumidores, dependências, configuração ou conteúdo.

## Problema Identificado
O contrato anterior de `NativeButtonProps` removia `children`, `className` e `type` dos atributos nativos de `<button>`, mas não proibia explicitamente `href`. Como o componente usa uma união discriminada com `if ("href" in props)`, o modo botão precisa declarar `href?: never` para impedir esse atributo no ramo nativo e tornar o contrato mais preciso.

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
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className" | "type"> & {
    href?: never;
  };
```

## Motivo Do Uso De `href?: never`
- Proíbe explicitamente `href` no modo botão nativo.
- Preserva o modo link como o único ramo que aceita e exige `href: string`.
- Mantém a união discriminada sem alterar a estratégia atual baseada em `if ("href" in props)`.
- Reforça o contrato sem introduzir casts, `any`, `React.FC` ou silenciamento de erros.

## Critérios De Aceite
- `NativeButtonProps` contém `href?: never`.
- `LinkButtonProps` continua exigindo `href: string`.
- O modo botão continua sem aceitar `href`.
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
- `rg -n ':\s*any\b|<any>|as any|@ts-ignore|@ts-nocheck|React\.FC' src`
- `$utfPattern = [string]([char]0x00C3) + "|" + [char]0x00C2 + "|" + [char]0xFFFD`
- `rg -n $utfPattern docs/tasks/TASK-006-button-native-href-contract.md docs/STATE.md`

## Confirmação De Ausência De Mudança Visual Ou Funcional
A alteração ficou limitada ao contrato de `NativeButtonProps` em `src/components/ui/Button.tsx`. A renderização atual, as classes, o `type="button"`, a discriminação por `if ("href" in props)` e todos os consumidores existentes foram preservados sem qualquer mudança visual ou funcional.
