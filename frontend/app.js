const STORAGE_KEY = 'appSocialProfile'; 

const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const summaryInput = document.getElementById('summaryInput');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const message = document.getElementById('message');
const profilePreview = document.getElementById('profilePreview');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getProfileFromForm() {
  return {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    summary: summaryInput.value.trim()
  };
}

function renderProfile(profile) {
  if (!profile || (!profile.name && !profile.email && !profile.summary)) {
    profilePreview.innerHTML = '<p>Nenhum perfil preenchido ainda.</p>';
    return;
  }

  profilePreview.innerHTML = `
    <h3 class="profile-name">${escapeHtml(profile.name)}</h3>
    <p class="profile-email">${escapeHtml(profile.email)}</p>
    <p class="profile-summary">${escapeHtml(profile.summary)}</p>
  `;
}

function saveProfile() {
  const profile = getProfileFromForm();

  if (!profile.name || !profile.email || !profile.summary) {
    message.textContent = 'Preencha nome, email e resumo.';
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  renderProfile(profile);
  message.textContent = 'Perfil salvo no navegador com sucesso!';
}

function clearProfile() {
  localStorage.removeItem(STORAGE_KEY);
  nameInput.value = '';
  emailInput.value = '';
  summaryInput.value = '';
  message.textContent = 'Perfil limpo.';
  renderProfile(null);
}

function loadSavedProfile() {
  const savedProfile = localStorage.getItem(STORAGE_KEY);

  if (!savedProfile) {
    renderProfile(null);
    return;
  }

  const profile = JSON.parse(savedProfile);
  nameInput.value = profile.name || '';
  emailInput.value = profile.email || '';
  summaryInput.value = profile.summary || '';
  renderProfile(profile);
}

saveBtn.addEventListener('click', saveProfile);
clearBtn.addEventListener('click', clearProfile);

loadSavedProfile();
