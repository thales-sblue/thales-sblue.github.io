# APOD proxy Worker

Cloudflare Worker que protege a chave da API NASA APOD e atende o frontend pelo
URL padrao `workers.dev`. O pacote foi projetado para o Cloudflare Workers Free:
nao configura KV, D1, R2, Durable Objects, Queues, Analytics Engine, Logpush,
Rate Limiting pago ou armazenamento pago.

## Desenvolvimento local

```bash
npm ci
```

Crie `worker/apod-proxy/.dev.vars` apenas na maquina local:

```dotenv
NASA_API_KEY=sua_chave_nasa
```

Nao adicione `.dev.vars`, `.env` ou chaves ao Git. Inicie e teste o Worker:

```bash
npm run dev
npm test
npm run typecheck
```

O CORS permite a origem local `http://localhost:5173`.

## Deploy

Autentique o Wrangler, grave a chave como secret e publique:

```bash
npx wrangler secret put NASA_API_KEY
npm run deploy
```

No repositorio do GitHub, crie o secret de Actions `VITE_APOD_PROXY_URL` com o
URL publicado, por exemplo:

```text
https://apod-proxy.<cloudflare-subdomain>.workers.dev
```

## Controles de requisicao

- origens, metodo e data sao validados antes da chamada a NASA;
- respostas APOD bem-sucedidas ficam no Cache API por data durante 24 horas;
- o cache usa apenas a data validada como chave e e compartilhado entre origens;
- cada isolate limita, em memoria, cada combinacao IP/origem a 20 requisicoes em
  10 minutos;
- o limite em memoria reduz abuso, mas nao e um contador global exato;
- nenhum contador persistente ou produto pago e usado.

O limite diario do Workers Free continua sendo a barreira final de custo. Se a
cota gratuita for excedida, o Worker pode falhar; ele nao tenta contornar esse
limite nem contratar capacidade adicional.
