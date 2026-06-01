# App Social

Aplicação web com frontend em HTML, CSS e JavaScript, backend em JavaScript com ExpressJS, testes automatizados com Cypress e workflows do GitHub Actions.

## Estrutura

```txt
app-social-pronto/
├── frontend/              # HTML, CSS, JS e testes Cypress do frontend
├── backend/               # ExpressJS e testes Cypress do backend
└── .github/workflows/     # Workflows para rodar testes em push
```

## Como executar o backend

```bash
cd backend
npm install
npm start
```

Backend: http://localhost:3000

## Como executar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm start
```

Frontend: http://localhost:8080

## Como rodar os testes do backend

```bash
cd backend
npm install
npm test
```

## Como rodar os testes do frontend

Com o backend livre na porta 3000:

```bash
cd frontend
npm install
npm test
```

## GitHub

Depois de subir para o GitHub, convide o professor pelo caminho:

Settings > Collaborators > Add people > regis.simao@unifor.br
