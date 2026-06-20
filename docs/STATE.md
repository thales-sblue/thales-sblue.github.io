# Estado das tarefas

## TASK-020 - Improve Contact section and final CTA

- Resultado: o titulo e o texto da secao Contact foram atualizados para apresentar um CTA direto a recrutadores e avaliadores tecnicos, com foco em oportunidades backend ou full stack e no contexto de PHP 8, Oracle, Docker, manutencao e evolucao de sistemas reais, integracoes, testes e CI/CD.
- Decisao: a estrutura visual, as classes, o botao e os links existentes foram preservados.
- Verificacao: `npm ci` e `npm run validate` concluidos; lint, formatacao, TypeScript, 14 testes e build aprovados.
- Verificacao manual: `npm run dev` foi iniciado, mas a inspecao em navegador ficou bloqueada porque o controlador do navegador nao iniciou no ambiente Windows (`CreateProcessAsUserW: acesso negado`) e o acesso local retornou HTTP 404.
- Escopo: nenhuma dependencia, rota, configuracao de deploy, estilo global, asset ou secao nao relacionada foi alterada.

## TASK-021 - Make portfolio copy more natural and add web security experience

- Resultado: Contact recebeu uma abordagem neutra para conversas tecnicas, networking e contato profissional; Hero, About e Skills tiveram repeticoes e expressoes mecanicas removidas.
- Decisao: a experiencia com validacao de seguranca web e OWASP ZAP foi registrada em About e no grupo `Qualidade, Entrega & Seguranca` de Skills.
- Verificacao: `npm ci` e `npm run validate` concluidos; lint, formatacao, TypeScript, 14 testes e build aprovados. A busca pelas expressoes proibidas nao encontrou resultados nos componentes alterados.
- Verificacao manual: `npm run dev` foi iniciado, mas a inspecao em navegador ficou bloqueada porque o controlador do navegador nao iniciou no ambiente Windows (`CreateProcessAsUserW: acesso negado`).
- Escopo: nenhuma dependencia, rota, configuracao de deploy, estilo global, asset, Projects ou NASA foi alterado.

## TASK-023 - Type Projects data and remove manual casting

- Resultado: `src/data/projects.js` foi migrado para `src/data/projects.ts`, que agora exporta o tipo `Project` e a lista `projects` tipada com suporte a `IconType`.
- Decisao: `Projects.tsx` passou a consumir `projects` diretamente, sem tipo local, variavel intermediaria ou cast manual; o conteudo, a ordem, os links, as imagens, os icones, as stacks e as evidencias dos nove projetos foram preservados.
- Verificacao: `npm ci`, `npm run validate` e `git diff --check` concluidos; lint, formatacao, TypeScript, 14 testes e build aprovados.
- Verificacao manual: `npm run dev` foi iniciado, mas a inspecao em navegador ficou bloqueada porque o controlador do navegador nao iniciou no ambiente Windows (`CreateProcessAsUserW: acesso negado`); a tentativa de acesso local a `http://127.0.0.1:5173` retornou HTTP 404.
- Escopo: nenhuma dependencia, rota, configuracao de deploy, estilo global, asset ou secao nao relacionada foi alterada.
