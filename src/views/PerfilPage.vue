<template>
  <ion-page>
    <ion-header class="profile-header">
      <ion-toolbar>
        <ion-title class="profile-toolbar-title">Perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="profile-content">
      <div class="profile-container">
        <div class="avatar-section">
          <div class="avatar-circle">
            <img src="https://i.pravatar.cc/150?u=user" alt="avatar" class="avatar-img" />
          </div>
          <h3 class="avatar-name">{{ perfil.nome }}</h3>
        </div>

        <div class="form-section">
          <div class="input-group">
            <label class="input-label">Nome</label>
            <ion-input v-model="perfil.nome" placeholder="Seu nome" class="custom-input" />
          </div>
          <div class="input-group">
            <label class="input-label">E-mail</label>
            <ion-input v-model="perfil.email" disabled class="custom-input" />
          </div>
          <div class="input-group">
            <label class="input-label">Nova senha</label>
            <ion-input v-model="novaSenha" type="password" placeholder="••••••••" class="custom-input" />
          </div>
        </div>

        <div class="actions-section">
          <ion-button expand="block" color="new" class="save-btn" @click="salvarPerfil">Salvar alterações</ion-button>
          <ion-button expand="block" fill="outline" color="danger" class="logout-btn" @click="logout">Sair da conta</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonInput, IonButton,
} from '@ionic/vue';
import { getUsuario, atualizarNome, atualizarSenha } from '@/database/service/userService';

const router = useRouter();
const perfil = reactive({ nome: '', email: '', id: 0 });
const novaSenha = ref('');

onMounted(async () => {
  const str = localStorage.getItem('usuario');
  if (!str) {
    router.push('/pages/login');
    return;
  }
  const usuarioLogado = JSON.parse(str);
  const dados = await getUsuario(usuarioLogado.id);
  if (dados) {
    perfil.nome = dados.nome;
    perfil.email = dados.email;
    perfil.id = dados.id_usuario;
  }
});

async function salvarPerfil() {
  try {
    await atualizarNome(perfil.id, perfil.nome);
    if (novaSenha.value) {
      await atualizarSenha(perfil.id, novaSenha.value);
      novaSenha.value = '';
    }
    // Atualiza localStorage se mudou nome
    const str = localStorage.getItem('usuario');
    if (str) {
      const usuario = JSON.parse(str);
      usuario.nome = perfil.nome;
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  } catch (e) {
    console.error('Erro ao salvar perfil:', e);
  }
}

function logout() {
  localStorage.removeItem('usuario');
  router.push('/pages/login');
}
</script>

<style scoped>
.profile-toolbar-title {
  font-weight: 600;
  color: var(--text-primary);
}

.profile-content {
  --background: var(--app-bg);
}

.profile-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 30px 20px;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}

.avatar-circle {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--ion-color-new);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-name {
  margin-top: 12px;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.form-section {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  padding: 4px 0;
  margin-bottom: 28px;
}

.input-group {
  padding: 8px 16px 4px;
}

.input-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 4px;
}

.custom-input {
  --background: transparent;
  --padding-start: 0;
  --padding-end: 0;
  font-family: var(--font-sans);
  font-size: 15px;
  color: var(--text-primary);
}

.actions-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.save-btn {
  --border-radius: 12px;
  font-weight: 600;
  height: 46px;
  text-transform: none;
}

.logout-btn {
  --border-radius: 12px;
  --border-color: #fda4af;
  --color: #e11d48;
  font-weight: 500;
  text-transform: none;
}
</style>