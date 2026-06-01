# App Social - Perfil

Aplicação web simples com frontend em HTML, CSS e JavaScript, backend em JavaScript com ExpressJS, testes automatizados com Cypress e workflows do GitHub Actions.

A aplicação não usa banco de dados. O frontend salva o perfil no `localStorage` do navegador e o backend Express mantém um perfil apenas em memória enquanto o servidor está rodando.

## Funcionalidades

- Criar uma página de perfil.
- Informar nome, email e um resumo/post pessoal.
- Visualizar a prévia do perfil na tela.
- Limpar o perfil salvo no navegador.
- Backend ExpressJS sem banco de dados.
- Testes Cypress para frontend e backend.
- Workflows GitHub Actions para frontend e backend.

## Estrutura

```txt
app-social-pronto/
├── frontend/              # HTML, CSS, JS e testes Cypress do frontend
├── backend/               # ExpressJS sem banco e testes Cypress do backend
└── .github/workflows/     # Workflows para rodar testes em push
```

## Executar o backend

```bash
cd backend
npm install
npm start
```

Backend: http://localhost:3000

## Executar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm start
```

Frontend: http://localhost:8080

## Rodar os testes do backend

```bash
cd backend
npm install
npm test
```

## Rodar os testes do frontend

```bash
cd frontend
npm install
npm test
```

## GitHub

Depois de subir para o GitHub, convide o professor pelo caminho:

Settings > Collaborators > Add people > regis.simao@unifor.br
