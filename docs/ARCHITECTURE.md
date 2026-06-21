# Arquitetura

## Visão geral

O portfólio é uma aplicação React de página única, executada integralmente no navegador e publicada como site estático. O fluxo de entrada parte de `index.html`, monta a aplicação em `src/main.tsx` e renderiza a árvore definida em `src/App.tsx`.

## Estrutura

- `src/components/`: seções da página e componentes de interface.
- `src/components/ui/`: componentes de apresentação reutilizáveis.
- `src/data/`: dados locais usados pelos projetos.
- `src/assets/`: imagens estáticas importadas pela aplicação.

As seções são compostas em uma única página. A navegação usa âncoras e rolagem suave, sem biblioteca de rotas.

## Integrações

A integração Astronomy Picture of the Day (APOD) usa duas camadas. O frontend
envia somente a data selecionada ao Cloudflare Worker configurado em
`VITE_APOD_PROXY_URL`. O Worker em `worker/apod-proxy/` valida origem e data,
consulta o cache por data e chama a API da NASA no servidor com o secret
`NASA_API_KEY`.

O proxy foi projetado para o Cloudflare Workers Free e não configura serviços
pagos nem armazenamento persistente. O cache usa a Cache API, e o controle de
requisições por IP/origem é local a cada isolate. Se a cota gratuita diária for
excedida, o Worker pode deixar de atender requisições.

## Interface

- Tailwind CSS concentra os estilos utilitários.
- Framer Motion controla animações e transições.
- Imagens são empacotadas pelo Vite a partir de `src/assets/`.
- O estado das interações permanece no cliente; o Worker não possui persistência própria.

## Qualidade e entrega

O comando `npm run validate` executa lint, verificação de formatação, TypeScript, testes e build. O GitHub Actions aplica essa validação em pull requests e pushes para `main`.

O Vite gera o site estático em `dist/`, e o script `npm run deploy` publica esse diretório no GitHub Pages por meio do pacote `gh-pages`.
