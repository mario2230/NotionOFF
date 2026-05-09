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

