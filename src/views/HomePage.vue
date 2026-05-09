<template>
  <ion-page>
    <ion-header class="home-header" collapse="condense">
      <ion-toolbar class="home-toolbar">
        <ion-title class="app-title">
          <span class="title-dot"></span>
          Notion Lite
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="home-content">
      <div class="greeting-section">
        <h1 class="greeting-title">Bem‑vindo de volta</h1>
        <p class="greeting-sub">Continue de onde parou ou crie algo novo.</p>
      </div>

      <ion-button expand="block" class="new-page-btn" color="new" @click="createNewPage">
        <ion-icon slot="start" :icon="addOutline" />
        Nova página
      </ion-button>

      <div class="recent-section">
        <h2 class="section-label">Documentos recentes</h2>
        <div v-if="recentDocs.length === 0" class="empty-state">
          <ion-icon :icon="documentOutline" class="empty-icon" />
          <p>Nenhum documento ainda.</p>
        </div>
        <DocumentCard
          v-for="doc in recentDocs"
          :key="doc.id"
          :title="doc.title"
          :date="doc.updatedAt"
          @click="openDocument(doc.id)"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon,
} from '@ionic/vue';
import { addOutline, documentOutline } from 'ionicons/icons';
import DocumentCard from '@/components/DocumentCard.vue';


import { criarPagina, listarPaginas } from '@/database/service/paginaService';
import { adicionarBloco, listarBlocos } from '@/database/service/blocoService';

interface Doc {
  id: number;
  title: string;
  updatedAt: string;
}

const recentDocs = ref<Doc[]>([
  { id: 1, title: 'Notas da reunião — Sprint 12', updatedAt: '2026-04-28T10:30:00' },
  { id: 2, title: 'Lista de tarefas da semana', updatedAt: '2026-04-27T18:15:00' },
  { id: 3, title: 'Brainstorm — layout do app', updatedAt: '2026-04-25T09:00:00' },
]);

const router = useRouter();


onMounted(async () => {
  const usuarioTeste = JSON.parse(localStorage.getItem('usuario') || '{}');
  if (!usuarioTeste.id) {
    console.warn('Nenhum usuário logado para teste. Faça cadastro/login primeiro.');
    return;
  }

  try {

    const novaPagina = await criarPagina('Minhas Notas', usuarioTeste.id);
    console.log('Página criada:', novaPagina);

    const paginas = await listarPaginas(usuarioTeste.id);
    console.log('Páginas do usuário:', paginas);

    if (paginas.length > 0) {
      const paginaId = paginas[0].id_pagina;
      await adicionarBloco(paginaId, 'texto', 'Primeiro parágrafo', 1);
      await adicionarBloco(paginaId, 'checklist', 'Comprar leite', 2);

      const blocos = await listarBlocos(paginaId);
      console.log('Blocos da página:', blocos);
    }
  } catch (error) {
    console.error('Erro no teste:', error);
  }
});

function createNewPage() {
  router.push('/pages/document/novo');
}

function openDocument(id: number) {
  router.push(`/tabs/document/${id}`);
}
</script>




<style scoped>
.home-toolbar {
  --background: transparent;
  --border-width: 0;
}

.app-title {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 20px;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.title-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: var(--ion-color-new);
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
}

.home-content {
  --background: var(--app-bg);
  --padding-top: 20px;
}

.greeting-section {
  padding: 0 20px 8px;
}

.greeting-title {
  font-size: 26px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px;
  letter-spacing: -0.03em;
}

.greeting-sub {
  font-size: 15px;
  color: var(--text-secondary);
  margin: 0 0 18px;
}

.new-page-btn {
  margin: 0 16px 28px;
  --border-radius: 12px;
  --box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
  font-weight: 600;
  font-size: 15px;
  height: 48px;
  text-transform: none;
  letter-spacing: -0.01em;
}

.recent-section {
  padding: 0 4px 30px;
}

.section-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 16px 8px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 40px;
  margin-bottom: 10px;
}
</style>