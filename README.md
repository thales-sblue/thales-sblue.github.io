# Portfolio | Thales Santos

Portfólio pessoal de Thales Santos, desenvolvedor PHP / Full Stack com foco em backend, sustentação e evolução de sistemas. O site apresenta projetos, competências técnicas e uma integração com a API Astronomy Picture of the Day (APOD), da NASA.

**Site:** [thales-sblue.github.io](https://thales-sblue.github.io/)

## Stack

- React 18 e TypeScript
- Vite 4
- Tailwind CSS 3
- Framer Motion
- Vitest e Testing Library
- ESLint e Prettier
- GitHub Actions e GitHub Pages

## Desenvolvimento local

Requisitos: Node.js e npm.

```bash
npm ci
npm run dev
```

O servidor de desenvolvimento informa no terminal o endereço local da aplicação.

## Variável de ambiente

A seção NASA usa o proxy APOD em `worker/apod-proxy/`. Depois de publicar o
Worker, crie um arquivo `.env` na raiz do projeto:

```dotenv
VITE_APOD_PROXY_URL=https://apod-proxy.<cloudflare-subdomain>.workers.dev
```

A chave da NASA deve existir somente no secret `NASA_API_KEY` do Worker. Consulte
o [guia do proxy](worker/apod-proxy/README.md) para desenvolvimento e deploy.

## Qualidade e testes

```bash
npm run lint
npm run format:check
npm run typecheck
npm run test
npm run build
```

Para executar toda a validação em sequência:

```bash
npm run validate
```

O pipeline do GitHub Actions executa `npm ci` e `npm run validate` em pull requests e pushes para `main`.

## Build e deploy

```bash
npm run build
npm run preview
```

O build estático é gerado em `dist/`. A publicação no GitHub Pages usa:

```bash
npm run deploy
```

## Documentação

- [Arquitetura](docs/ARCHITECTURE.md)
- [Especificação do produto](docs/PRODUCT_SPEC.md)
