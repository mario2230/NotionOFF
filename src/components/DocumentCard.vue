<template>
  <ion-card class="doc-card" button @click="$emit('click')">
    <ion-card-header class="doc-card-header">
      <div class="doc-icon-wrapper">
        <ion-icon :icon="documentTextOutline" class="doc-icon" />
      </div>
      <ion-card-title class="doc-title">{{ title }}</ion-card-title>
    </ion-card-header>
    <ion-card-content class="doc-meta">
      <span class="doc-date">{{ formattedDate }}</span>
      <ion-icon :icon="chevronForward" class="doc-arrow" />
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
} from '@ionic/vue';
import { documentTextOutline, chevronForward } from 'ionicons/icons';

const props = defineProps<{
  title: string;
  date: string;
}>();

defineEmits<{
  click: [];
}>();

const formattedDate = computed(() => {
  const d = new Date(props.date);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
});
</script>

<style scoped>
.doc-card {
  margin: 10px 16px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  background: var(--card-bg);
  border: 1px solid var(--border-light);
  transition: box-shadow 0.2s ease, transform 0.15s ease;
}

.doc-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-1px);
}

.doc-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 2px;
}

.doc-icon-wrapper {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  background: #e0e7ff; 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.doc-icon {
  font-size: 20px;
  color: #4f52c9;
}

.doc-title {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
}

.doc-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0;
}

.doc-date {
  font-size: 13px;
  color: var(--text-secondary);
}

.doc-arrow {
  font-size: 16px;
  color: #c0c0c3;
}
</style>