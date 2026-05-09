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

              <div v-if="erro" class="erro-msg">
                <ion-icon :icon="alertCircleOutline" />
                {{ erro }}
              </div>
              <div v-if="sucesso" class="sucesso-msg">
                Conta criada com sucesso! Redirecionando...
              </div>

              <div class="input-group">
                <label class="input-label">Nome completo</label>
                <ion-input v-model="form.nome" type="text" placeholder="Seu nome" class="auth-input" />
              </div>

              <div class="input-group">
                <label class="input-label">E-mail</label>
                <ion-input v-model="form.email" type="email" placeholder="email@exemplo.com" class="auth-input" />
              </div>

              <div class="input-group">
                <label class="input-label">Senha</label>
                <ion-input v-model="form.senha" type="password" placeholder="Mínimo 6 caracteres"
                  class="auth-input" />
              </div>

              <div class="input-group">
                <label class="input-label">Confirmar senha</label>
                <ion-input v-model="form.confirmarSenha" type="password" placeholder="Repita a senha"
                  class="auth-input" />
              </div>

              <ion-button expand="block" color="new" class="auth-btn" @click="cadastrarUsuario">
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
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage, IonContent, IonGrid, IonRow, IonCol,
  IonInput, IonButton, IonIcon,
} from '@ionic/vue';
import { alertCircleOutline } from 'ionicons/icons';
import { cadastrar } from '@/database/service/authService';

const router = useRouter();
const erro = ref('');
const sucesso = ref(false);

const form = reactive({
  nome: '',
  email: '',
  senha: '',
  confirmarSenha: '',
});

async function cadastrarUsuario() {
  erro.value = '';
  sucesso.value = false;

  if (!form.nome || !form.email || !form.senha || !form.confirmarSenha) {
    erro.value = 'Preencha todos os campos.';
    return;
  }
  if (form.senha !== form.confirmarSenha) {
    erro.value = 'As senhas não coincidem.';
    return;
  }
  try {
    await cadastrar(form.nome, form.email, form.senha);
    sucesso.value = true;
    setTimeout(() => {
      router.push('/pages/login');
    }, 1500);
  } catch (e: any) {
    erro.value = e.message || 'Erro ao cadastrar.';
  }
}
</script>

