import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { PiniaColada } from '@pinia/colada';
import { createHead } from '@unhead/vue/client';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';

import { router } from './router';
import { i18n } from './i18n';

import './styles/main.scss';

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(PiniaColada);
app.use(head);
app.use(router);
app.use(i18n);
app.mount('#app');
