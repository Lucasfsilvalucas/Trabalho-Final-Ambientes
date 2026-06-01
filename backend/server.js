const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let profile = {
  name: 'Lucas',
  email: 'lucas@email.com',
  summary: 'Este é um perfil de exemplo salvo apenas em memória no backend ExpressJS.'
};

app.get('/api/status', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend Express funcionando sem banco de dados' });
});

app.get('/api/profile', (req, res) => {
  res.status(200).json(profile);
});

app.post('/api/profile', (req, res) => {
  const { name, email, summary } = req.body;

  if (!name || !email || !summary) {
    return res.status(400).json({ error: 'Nome, email e resumo são obrigatórios' });
  }

  profile = { name, email, summary };
  return res.status(201).json(profile);
});

app.put('/api/profile', (req, res) => {
  const { name, email, summary } = req.body;

  if (name !== undefined) profile.name = name;
  if (email !== undefined) profile.email = email;
  if (summary !== undefined) profile.summary = summary;

  return res.status(200).json(profile);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
