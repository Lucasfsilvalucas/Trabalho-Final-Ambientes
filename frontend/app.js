const API_URL = 'http://localhost:3000/api';

let currentProfile = null;

function getElement(id) {
  return document.getElementById(id);
}

function renderProfile(profile) {
  const profileElement = getElement('profile');

  if (!profile) {
    profileElement.innerHTML = 'Perfil não encontrado.';
    return;
  }

  profileElement.innerHTML = `
    <p><strong>ID:</strong> ${profile.id}</p>
    <p><strong>Nome:</strong> ${profile.name}</p>
    <p><strong>Email:</strong> ${profile.email}</p>
  `;
}

async function createProfile(name, email) {
  const response = await fetch(`${API_URL}/profiles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email })
  });

  if (!response.ok) {
    throw new Error('Erro ao cadastrar perfil');
  }

  return response.json();
}

async function loadProfile(id) {
  const response = await fetch(`${API_URL}/profiles/${id}`);

  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function updateProfile(id, name) {
  const response = await fetch(`${API_URL}/profiles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar perfil');
  }

  return response.json();
}

getElement('registerBtn').addEventListener('click', async () => {
  const name = getElement('regName').value.trim();
  const email = getElement('regEmail').value.trim();
  const message = getElement('registerMessage');

  if (!name || !email) {
    message.textContent = 'Preencha nome e email.';
    return;
  }

  try {
    currentProfile = await createProfile(name, email);
    getElement('profileId').value = currentProfile.id;
    renderProfile(currentProfile);
    message.textContent = 'Perfil cadastrado com sucesso!';
  } catch (error) {
    message.textContent = error.message;
  }
});

getElement('loadBtn').addEventListener('click', async () => {
  const id = getElement('profileId').value;
  currentProfile = await loadProfile(id);
  renderProfile(currentProfile);
});

getElement('updateBtn').addEventListener('click', async () => {
  const message = getElement('updateMessage');

  if (!currentProfile) {
    message.textContent = 'Carregue ou cadastre um perfil primeiro.';
    return;
  }

  const newName = getElement('newName').value.trim();

  if (!newName) {
    message.textContent = 'Digite um novo nome.';
    return;
  }

  try {
    currentProfile = await updateProfile(currentProfile.id, newName);
    renderProfile(currentProfile);
    message.textContent = 'Perfil atualizado com sucesso!';
  } catch (error) {
    message.textContent = error.message;
  }
});
