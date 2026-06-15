# Roadmap

## Sequencing Rule
Each phase is executed in order. A later phase starts only after the current phase is completed or explicitly deferred with a recorded decision in `docs/STATE.md`.

## Phases
1. Auditoria e documentação
   - Consolidate repository findings, operating rules, architecture notes, and execution state.
2. Limpeza das dependências
   - Remove invalid or unused dependencies only after confirming repository references and build impact.
3. ESLint e Prettier
   - Add formatting and linting with minimal behavioral risk.
4. Migração gradual para TypeScript
   - Introduce TypeScript incrementally without changing the UI.
5. Testes com Vitest e Testing Library
   - Add automated component and behavior coverage.
6. GitHub Actions
   - Automate verification for build, lint, and tests.
7. Atualização separada de React e Vite
   - Upgrade framework and bundler in isolated steps with regression checks.
8. React Router e estrutura de páginas
   - Introduce page boundaries and routing safely for static hosting.
9. Reformulação do hero
   - Rework the hero section after foundation work is stable.
10. Projetos em destaque
   - Improve the portfolio project presentation model.
11. Cases detalhados
   - Add deeper project/case-study content structure.
12. Experiência profissional anonimizada
   - Introduce anonymized professional experience content.
13. Competências com evidências
   - Connect skills to visible proof points.
14. Transferência da NASA para Labs
   - Move the NASA experience into a broader labs/experiments model.
15. Playwright
   - Add end-to-end coverage after routes and stable UI flows exist.
16. Acessibilidade
   - Run focused accessibility improvements and audits.
17. Performance
   - Optimize asset loading, rendering cost, and bundle behavior.
18. SEO
   - Expand metadata, indexing quality, and content discoverability.
19. Deploy e auditoria final
   - Perform final verification, deployment preparation, and release audit.
