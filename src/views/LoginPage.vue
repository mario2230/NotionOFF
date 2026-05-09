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
                <p class="auth-subtitle">Entre para continuar</p>
              </div>

               <div v-if="erro" class="erro-msg">
                <ion-icon :icon="alertCircleOutline" />
                {{ erro }}
              </div>

              <div class="input-group">
                <label class="input-label">E-mail</label>
                <ion-input
                  v-model="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  class="auth-input"
                />
              </div>
              <div class="input-group">
                <label class="input-label">Senha</label>
                <ion-input
                  v-model="password"
                  type="password"
                  placeholder="Sua senha"
                  class="auth-input"
                />
              </div>

              <ion-button expand="block" color="new" class="auth-btn" @click="entrar">
                Entrar
              </ion-button>

              <p class="auth-alt-text">
                Não tem uma conta? <router-link to="/pages/cadastro" class="auth-link">Cadastre-se</router-link>
              </p>
            </div>

          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
} from '@ionic/vue';
import { alertCircleOutline } from 'ionicons/icons';
import { login } from '@/database/service/authService';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const erro = ref('');


async function entrar() {
  erro.value = ('');
  if(!email.value || !password.value) {
    erro.value = 'Preencha todos os campos.';
    return;
  }
  try {
    const usuario = await login(email.value, password.value);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    router.push('/pages/home');
  } catch (e: any) {
    erro.value = e.message || 'Erro ao fazer login.';
  }
}


</script>
