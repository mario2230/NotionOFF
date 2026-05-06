<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="page1" href="/pages/home">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="page2" href="/pages/documentos">
          <ion-icon aria-hidden="true" :icon="book" />
          <ion-label>Documentos</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="page3" href="/pages/perfil">
          <ion-icon aria-hidden="true" :icon="person" />
          <ion-label>Perfil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { person, book, home } from 'ionicons/icons';
</script>
