# API de Filmes (Node.js + MongoDB Atlas)

Versão intermediária com:
- Estrutura MVC (src/)
- Autenticação JWT (cadastro/login)
- Média automática de avaliações
- Front-end simples (public/) para testar

## Como usar

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/api-filmes.git
cd api-filmes
```

2. Instale dependências:
```bash
npm install
```

3. Crie um arquivo `.env` baseado em `.env.example` e configure `MONGO_URI` e `JWT_SECRET`.

4. Rode localmente:
```bash
npm start
```

O projeto também está pronto para deploy em serviços como Render, Railway ou Heroku.
O front-end simples fica em `public/index.html`.

Rotas principais:
- POST /usuarios/registrar
- POST /usuarios/login
- POST /filmes (autenticado)
- GET /filmes
- POST /filmes/:id/avaliar (autenticado)
