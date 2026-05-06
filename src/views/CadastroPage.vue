<template>
  <ion-page>
    <ion-content :fullscreen="true" class="auth-background">
      <ion-grid class="auth-grid">
        <ion-row class="ion-justify-content-center ion-align-items-center auth-row">
          <ion-col size="11" size-md="8" size-lg="5" size-xl="4" class="auth-col">

            <div class="auth-card">
              <div class="auth-header">
                <div class="logo-dot"></div>
                <h1 class="auth-app-name">Notion Lite</h1>
                <p class="auth-subtitle">Crie sua conta gratuita</p>
              </div>

              <div class="input-group">
                <label class="input-label">Nome completo</label>
                <ion-input
                  v-model="form.name"
                  type="text"
                  placeholder="Seu nome"
                  class="auth-input"
                />
              </div>

              <div class="input-group">
                <label class="input-label">E-mail</label>
                <ion-input
                  v-model="form.email"
                  type="email"
                  placeholder="email@exemplo.com"
                  class="auth-input"
                />
              </div>

              <div class="input-group">
                <label class="input-label">Senha</label>
                <ion-input
                  v-model="form.password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  class="auth-input"
                />
              </div>

              <div class="input-group">
                <label class="input-label">Confirmar senha</label>
                <ion-input
                  v-model="form.confirmPassword"
                  type="password"
                  placeholder="Repita a senha"
                  class="auth-input"
                />
              </div>

              <ion-button expand="block" color="new" class="auth-btn" @click="register">
                Criar conta
              </ion-button>

              <p class="auth-alt-text">
                Já tem uma conta? <router-link to="/pages/login" class="auth-link">Faça login</router-link>
              </p>
            </div>

          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
} from '@ionic/vue';

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

function register() {
  console.log('Cadastro (visual)', form);
}
</script>

<style scoped>
.auth-background {
  --background: #f7f7f8;
}


.auth-grid {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.auth-row {
  flex: 1;
}

.auth-col {
  display: flex;
  justify-content: center;
  align-items: center;
}


.auth-card {
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  border-radius: 14px;
  padding: 40px 28px 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
  border: 1px solid #e8e8ea;
}

.auth-header {
  text-align: center;
  margin-bottom: 28px;
}

.logo-dot {
  width: 40px;
  height: 40px;
  background: #6366F1;
  border-radius: 10px;
  margin: 0 auto 16px;
}

.auth-app-name {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #1e1e1e;
  margin: 0 0 4px;
  letter-spacing: -0.02em;
}

.auth-subtitle {
  font-size: 14px;
  color: #6b6b6b;
  margin: 0;
}

.input-group {
  margin-bottom: 16px;
}

.input-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #9a9a9a;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}

.auth-input {
  --background: #f4f4f5;
  --border-radius: 10px;
  --padding-start: 14px;
  --padding-end: 14px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #1e1e1e;
}

.auth-btn {
  margin-top: 8px;
  --border-radius: 10px;
  font-weight: 600;
  height: 46px;
  text-transform: none;
  --box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
}

.auth-alt-text {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #6b6b6b;
}

.auth-link {
  color: #6366F1;
  text-decoration: none;
  font-weight: 500;
}
</style>