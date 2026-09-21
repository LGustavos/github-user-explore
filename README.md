# GitHub User Explore

Aplicação para buscar usuários do GitHub e ver o perfil e os repositórios de cada um.

Feito com React, TypeScript, React Router, Axios, Bootstrap e Vite.

## Como rodar

Precisa do Node.js 22.22 ou superior.

```bash
npm install
cp .env.example .env
npm run dev
```

Depois é só abrir `http://localhost:5173`.

O `.env` tem a URL da API do GitHub (`VITE_GITHUB_API_URL`).

## Scripts

- `npm run dev`: roda o projeto em modo de desenvolvimento
- `npm run build`: gera o build de produção na pasta `dist`
- `npm run preview`: abre o build localmente
- `npm run lint`: roda o ESLint
- `npm run typecheck`: verifica os tipos
- `npm run deploy`: gera o build e publica no Firebase Hosting

## Rotas

- `/`: busca por username
- `/user/:username`: perfil e repositórios do usuário
- `/repository/:owner/:repo`: detalhes de um repositório

## Deploy

https://github-user-explore-lg.web.app
