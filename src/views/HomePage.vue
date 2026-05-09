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
        <h1 class="greeting-title">Bem‑vindo, {{ usuarioLogado?.nome }} </h1>
        <p class="greeting-sub">Continue de onde parou ou crie algo novo.</p>
      </div>

      <ion-button expand="block" class="new-page-btn" color="new" @click="createNewPage">
        <ion-icon slot="start" :icon="addOutline" />
        Nova página
      </ion-button>

      <div class="recent-section">
        <h2 class="section-label">Documentos recentes</h2>
        <div v-if="documentos.length === 0" class="empty-state">
          <ion-icon :icon="documentOutline" class="empty-icon" />
          <p>Nenhum documento ainda.</p>
        </div>
        <DocumentCard
          v-for="doc in documentos"
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonIcon,
  onIonViewWillEnter
} from '@ionic/vue'
import { addOutline, documentOutline } from 'ionicons/icons'
import DocumentCard from '@/components/DocumentCard.vue'
import { listarPaginas, criarPagina } from '@/database/service/paginaService'
import { getUsuario } from '@/database/service/userService'

const router = useRouter()
const usuarioLogado = ref<{ id_usuario: number; nome: string } | null>(null)
const documentos = ref<{ id: number; title: string; updatedAt: string }[]>([])


onIonViewWillEnter(async () => {
  const str = localStorage.getItem('usuario')
  if (!str) {
    router.push('/pages/login')
    return
  }
  const parsed = JSON.parse(str)
  const usuarioExiste = await getUsuario(parsed.id_usuario)
  if (!usuarioExiste) {
    localStorage.removeItem('usuario')
    router.push('/pages/login')
    return
  }
  usuarioLogado.value = parsed
  await carregarPaginas()
})

async function carregarPaginas() {
  if (!usuarioLogado.value) return
  const paginas = await listarPaginas(usuarioLogado.value.id_usuario)
  documentos.value = paginas.map(p => ({
    id: p.id_pagina,
    title: p.titulo,
    updatedAt: p.criado_em,
  }))
}

async function createNewPage() {
  if (!usuarioLogado.value) return
  const nova = await criarPagina('Nova página', usuarioLogado.value.id_usuario)
  documentos.value.unshift({
    id: nova.id_pagina,
    title: nova.titulo,
    updatedAt: nova.criado_em,
  })
  router.push(`/pages/documentos/${nova.id_pagina}`)
}

function openDocument(id: number) {
  router.push(`/pages/documentos/${id}`)
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