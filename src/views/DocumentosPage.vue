<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/pages/home" color="dark" />
        </ion-buttons>
        <ion-title>{{ tituloPagina || 'Sem título' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="doc-content">
      <div class="editor-container">
        <input
          v-model="tituloPagina"
          type="text"
          class="page-title-input"
          placeholder="Título do documento"
          @blur="salvarTitulo"
        />

        <div class="blocks-area">
          <div v-for="(bloco, index) in blocos" :key="bloco.id_bloco" class="content-block">
            <div v-if="bloco.tipo === 'texto'" class="text-block">
              <textarea
                v-model="bloco.conteudo"
                class="block-textarea"
                rows="1"
                placeholder="Digite algo..."
                @input="autoResize($event)"
                @blur="salvarConteudo(bloco)"
              ></textarea>
            </div>

            <div v-else-if="bloco.tipo === 'checklist'" class="checklist-block">
              <ion-item lines="none" class="checklist-item">
                <ion-checkbox
                  :checked="bloco.feito === 1"
                  @ion-change="alternarCheck(bloco, $event.detail.checked)"
                />
                <ion-input
                  v-model="bloco.conteudo"
                  placeholder="Item..."
                  class="checklist-input"
                  @ion-blur="salvarConteudo(bloco)"
                />
              </ion-item>
            </div>

            <ion-button fill="clear" size="small" class="remove-block-btn" @click="removerBloco(index)">
              <ion-icon :icon="closeOutline" />
            </ion-button>
          </div>
        </div>

        <div class="add-block-section">
          <ion-button expand="block" fill="outline" color="new" class="add-block-btn" @click="addBlocoTexto">
            <ion-icon slot="start" :icon="addOutline" />
            Texto
          </ion-button>
          <ion-button expand="block" fill="outline" color="new" class="add-block-btn" @click="addBlocoChecklist">
            <ion-icon slot="start" :icon="checkboxOutline" />
            Checklist
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButtons, IonBackButton, IonButton,
  IonIcon, IonItem, IonCheckbox, IonInput,
} from '@ionic/vue';
import { addOutline, closeOutline, checkboxOutline } from 'ionicons/icons';
import { listarBlocos, adicionarBloco, atualizarConteudoBloco, alternarCheck as alternarCheckService, deletarBloco } from '@/database/service/blocoService';
import { atualizarTitulo } from '@/database/service/paginaService';

const route = useRoute();
const idPagina = Number(route.params.id);
const tituloPagina = ref('');
const blocos = ref<any[]>([]);

onMounted(async () => {
  try {
    const lista = await listarBlocos(idPagina);
    blocos.value = lista.map(b => ({ ...b }));
  } catch (e) {
    console.error('Erro ao carregar blocos:', e);
  }
});

async function salvarTitulo() {
  if (!tituloPagina.value) return;
  try {
    await atualizarTitulo(idPagina, tituloPagina.value);
  } catch (e) {
    console.error('Erro ao salvar título:', e);
  }
}

async function addBlocoTexto() {
  try {
    const novo = await adicionarBloco(idPagina, 'texto', '', blocos.value.length);
    blocos.value.push(novo);
  } catch (e) {
    console.error('Erro ao adicionar bloco:', e);
  }
}

async function addBlocoChecklist() {
  try {
    const novo = await adicionarBloco(idPagina, 'checklist', '', blocos.value.length);
    blocos.value.push(novo);
  } catch (e) {
    console.error('Erro ao adicionar checklist:', e);
  }
}

async function salvarConteudo(bloco: any) {
  try {
    await atualizarConteudoBloco(bloco.id_bloco, bloco.conteudo || '');
  } catch (e) {
    console.error('Erro ao salvar conteúdo:', e);
  }
}

async function alternarCheck(bloco: any, checked: boolean) {
  try {
    await alternarCheckService(bloco.id_bloco, checked);
    bloco.feito = checked ? 1 : 0;
  } catch (e) {
    console.error('Erro ao alternar check:', e);
  }
}

async function removerBloco(index: number) {
  const bloco = blocos.value[index];
  if (!bloco) return;
  try {
    await deletarBloco(bloco.id_bloco);
    blocos.value.splice(index, 1);
  } catch (e) {
    console.error('Erro ao remover bloco:', e);
  }
}

function autoResize(event: Event) {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}
</script>


<style scoped>
.doc-toolbar-title {
  font-weight: 500;
  font-size: 16px;
  color: var(--text-primary);
}

.doc-content {
  --background: var(--app-bg);
}

.editor-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 20px 50px;
}

.page-title-input {
  width: 100%;
  font-size: 32px;
  font-weight: 700;
  font-family: var(--font-sans);
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-primary);
  margin-bottom: 30px;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.page-title-input::placeholder {
  color: #c5c5c7;
}

.blocks-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.content-block {
  background: var(--app-bg);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  position: relative;
  transition: box-shadow 0.15s;
}

.content-block:hover {
  box-shadow: var(--shadow-hover);
}

.text-block {
  display: flex;
  align-items: stretch;
}

.block-textarea {
  width: 100%;
  border: none;
  resize: none;
  overflow: hidden;
  font-family: var(--font-sans);
  font-size: 15px;
  color: var(--text-primary);
  background: transparent;
  padding: 6px 4px;
  line-height: 1.5;
}

.block-textarea::placeholder {
  color: #b0b0b3;
}

.checklist-block {
  display: flex;
  align-items: center;
}

.checklist-item {
  --background: transparent;
  --padding-start: 0;
  --inner-padding-end: 0;
  width: 100%;
}

.checklist-checkbox {
  --size: 20px;
  --border-radius: 4px;
  margin-right: 10px;
}

.checklist-input {
  font-size: 15px;
  font-family: var(--font-sans);
  --padding-start: 0;
  --padding-end: 0;
}

.remove-block-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  --padding-start: 4px;
  --padding-end: 4px;
  --color: var(--text-muted);
  opacity: 0;
  transition: opacity 0.2s;
}

.content-block:hover .remove-block-btn {
  opacity: 1;
}

.add-block-section {
  margin-top: 24px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.add-block-btn {
  font-weight: 500;
  font-size: 14px;
  --border-radius: 10px;
  --border-color: #d4d4d8;
  --color: var(--ion-color-new);
  text-transform: none;
}
</style>