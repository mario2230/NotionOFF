import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { IonicVue } from '@ionic/vue';

import { Capacitor } from '@capacitor/core';

import {
  CapacitorSQLite,
  SQLiteConnection,
} from '@capacitor-community/sqlite';

import {
  defineCustomElements,
} from 'jeep-sqlite/loader';

import { initDB } from '@/database/service/authService';

import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';



defineCustomElements(window);

const app = createApp(App);

app.use(IonicVue);
app.use(router);

async function bootstrap() {

  if (Capacitor.getPlatform() === 'web') {

    const jeepSqliteEl = document.createElement('jeep-sqlite');

    document.body.appendChild(jeepSqliteEl);

    await customElements.whenDefined('jeep-sqlite');

    const sqlite = new SQLiteConnection(CapacitorSQLite);

    await sqlite.initWebStore();
  }

  await initDB();

  await router.isReady().then(() => {
  app.mount('#app');
});
}

bootstrap().catch(console.error);