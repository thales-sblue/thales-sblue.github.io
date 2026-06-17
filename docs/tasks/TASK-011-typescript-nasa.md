# TASK-011: Migracao do Nasa para TypeScript

## Objetivo
Migrar exclusivamente `src/components/Nasa.jsx` para `src/components/Nasa.tsx` com contratos locais explicitos para APOD, `localStorage` e estados de carregamento e erro, sem alterar comportamento, layout, classes, textos, API, validacoes, consumidores, SPA ou compatibilidade com GitHub Pages.

## Arquivos Autorizados
- `src/components/Nasa.jsx` -> `src/components/Nasa.tsx`
- `docs/tasks/TASK-011-typescript-nasa.md`
- `docs/STATE.md`

## Consumidor Encontrado
- `src/App.tsx`
  - `import Nasa from "./components/Nasa";`
  - `<Nasa />`

## Confirmacao Sobre Props
- `Nasa` nao recebe props.

## Contrato ApodMediaType
```ts
type ApodMediaType = "image" | "video";
```

## Contrato ApodResponse
```ts
type ApodResponse = {
  title: string;
  date: string;
  explanation: string;
  url: string;
  media_type: ApodMediaType;
};
```

## Contrato StoredRequestTimestamp
```ts
type StoredRequestTimestamp = string;
```

## Justificativa Do Cast Local Do JSON.parse
- `localStorage.getItem("apod_requests")` retorna `string | null`.
- `JSON.parse(...)` nao preserva tipagem.
- O cast local `as StoredRequestTimestamp[]` foi aplicado apenas no ponto permitido para manter o formato atual salvo em `localStorage` sem adicionar validacao extra de runtime.
- Nenhum outro cast foi introduzido.

## Confirmacoes De Preservacao
- `APOD_API` foi preservado.
- `API_KEY` com `import.meta.env.VITE_NASA_API_KEY` foi preservado.
- `fetchApod` foi preservado.
- `date`, `apod`, `loading` e `error` foram preservados.
- A validacao de data vazia foi preservada.
- A validacao de data futura foi preservada.
- A validacao de data anterior a `1995-06-16` foi preservada.
- O limite horario de `30` requests foi preservado.
- O limite diario de `50` requests foi preservado.
- A chave `apod_requests` foi preservada.
- O uso de `localStorage` foi preservado.
- O fetch para `${APOD_API}?api_key=${API_KEY}&date=${date}` foi preservado.
- O tratamento de erro foi preservado.
- O bloco `finally` foi preservado.
- O background fallback da NASA foi preservado.
- `media_type === "video"` foi preservado.
- `iframe`, `frameBorder="0"` e `allowFullScreen` foram preservados.
- A imagem foi preservada.
- Todos os textos, mensagens, classes e layout foram preservados.
- O texto `Carregando…` foi preservado.
- O texto `Buscar` foi preservado.
- O paragrafo de credito da NASA foi preservado.
- `Button` foi preservado.
- `SectionHeading` foi preservado.

## Estrutura Preservada
- Estrutura JSX preservada.
- Consumidor preservado.
- `src/App.tsx` nao foi alterado.
- Nenhum helper compartilhado novo foi criado.
- Nenhuma dependencia ou configuracao foi alterada.

## Fora Do Escopo
- Nao alterar `src/App.tsx`.
- Nao alterar consumidores.
- Nao alterar `Button`.
- Nao alterar `SectionHeading`.
- Nao alterar outros componentes.
- Nao alterar dependencias, configuracoes, rotas, deploy ou GitHub Pages.
- Nao alterar textos, classes, layout, API, mensagens, limites ou comportamento.
- Nao iniciar a fase 5.

## Validacoes Executadas
- `cmd /c npm ci`
- `cmd /c npm.cmd run lint`
- `cmd /c npm.cmd run format:check`
- `cmd /c npx prettier src/components/Nasa.tsx --write`
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
- `rg -n ':\s*any\b|<any>|as any|@ts-ignore|@ts-nocheck|React\.FC|asserts|type guard|unknown' src/components/Nasa.tsx`
- `mojibake scan with rg on src/components/Nasa.tsx, docs/tasks/TASK-011-typescript-nasa.md, and docs/STATE.md`
- `find src/components -name "*.jsx" -print`
- `PowerShell BOM scan for docs/tasks/TASK-011-typescript-nasa.md and docs/STATE.md`

## Criterios De Aceite
- `src/components/Nasa.tsx` existe.
- `src/components/Nasa.jsx` nao existe.
- Nenhum `.jsx` resta em `src/components`.
- Nenhum consumidor foi alterado.
- Nenhum outro componente foi migrado.
- `Nasa` nao recebe props.
- `ApodResponse` esta tipado.
- `ApodMediaType` esta tipado.
- `StoredRequestTimestamp` esta tipado.
- `apod` esta como `ApodResponse | null`.
- O cast local do `JSON.parse` esta documentado.
- `APOD_API` foi preservado.
- `VITE_NASA_API_KEY` foi preservado.
- `localStorage` foi preservado.
- `apod_requests` foi preservado.
- Os limites de `30/hora` e `50/dia` foram preservados.
- As mensagens foram preservadas.
- O background fallback foi preservado.
- `iframe` e imagem foram preservados.
- Os creditos da NASA foram preservados.
- Todos os textos, classes e layout foram preservados.
- Nenhuma dependencia ou configuracao foi alterada.
- Nenhum `any`, `as any`, `@ts-ignore`, `@ts-nocheck`, `unknown` ou `React.FC` foi introduzido.
- `npm ci`, `lint`, `format:check`, `typecheck`, `build` e `validate` passam.
- A documentacao permanece em UTF-8 sem BOM.
- A aplicacao continua SPA, o build continua gerando `dist/`, GitHub Pages permanece inalterado e a fase 4 continua em andamento.
