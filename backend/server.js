const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let profiles = [
  {
    id: 1,
    name: 'Lucas',
    email: 'lucas@email.com',
    imageUrl: ''
  }
];

let nextId = 2;

app.get('/api/status', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend Express funcionando' });
});

app.get('/api/profiles', (req, res) => {
  res.status(200).json(profiles);
});

app.get('/api/profiles/:id', (req, res) => {
  const id = Number(req.params.id);
  const profile = profiles.find((item) => item.id === id);

  if (!profile) {
    return res.status(404).json({ error: 'Perfil não encontrado' });
  }

  return res.status(200).json(profile);
});

app.post('/api/profiles', (req, res) => {
  const { name, email, imageUrl } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }

  const newProfile = {
    id: nextId,
    name,
    email,
    imageUrl: imageUrl || ''
  };

  nextId += 1;
  profiles.push(newProfile);

  return res.status(201).json(newProfile);
});

app.put('/api/profiles/:id', (req, res) => {
  const id = Number(req.params.id);
  const profile = profiles.find((item) => item.id === id);

  if (!profile) {
    return res.status(404).json({ error: 'Perfil não encontrado' });
  }

  const { name, email, imageUrl } = req.body;

  if (name !== undefined) profile.name = name;
  if (email !== undefined) profile.email = email;
  if (imageUrl !== undefined) profile.imageUrl = imageUrl;

  return res.status(200).json(profile);
});

app.delete('/api/profiles/:id', (req, res) => {
  const id = Number(req.params.id);
  const exists = profiles.some((item) => item.id === id);

  if (!exists) {
    return res.status(404).json({ error: 'Perfil não encontrado' });
  }

  profiles = profiles.filter((item) => item.id !== id);

  return res.status(204).send();
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
