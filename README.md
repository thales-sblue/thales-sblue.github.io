# 🌌 Portfólio | Thales Santos

Bem-vindo ao meu portfólio! Aqui você encontra uma vitrine interativa dos meus projetos, tecnologias que domino, e até uma experiência de visualização do universo através da API oficial da NASA.

[🔗 Acesse agora](https://thales-sblue.github.io/)

## 🛠️ Tecnologias Utilizadas

- **React** + **Vite**
- **TailwindCSS**
- **Framer Motion**
- **React Icons**
- **NASA APOD API**
- Deploy via **GitHub Pages**

## 🚀 Desenvolvimento local

```bash
npm install
npm run dev
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```
VITE_NASA_API_KEY=sua_chave_nasa
```

### Assets (imagens)

As imagens ficam em `src/assets/` (não em `dist/assets`, que só contém o bundle compilado).

Se precisar restaurar do Git:

```bash
git checkout HEAD -- src/assets/
```

### Publicar no GitHub Pages

```bash
npm run deploy
```
