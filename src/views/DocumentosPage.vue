<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Documentos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Documentos</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card>
        <ion-checkbox>Check Box</ion-checkbox>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCheckbox, IonCard  } from '@ionic/vue';


</script>
