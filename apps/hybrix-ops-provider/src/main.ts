// Basic CSS
import '@/assets/styles/global.css';
// Quasar
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';
// AG Grid
import '@/assets/styles/ag-grid.scss';
import '@/assets/styles/ag-theme-hybrix.scss';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// Hybrix
import '@hybrix/styles/main.css';

import { Quasar, Loading } from 'quasar';

import { HBtn, Card, HCheckbox, Dropdown, HImg, HInput, HSelect } from '@hybrix/ui';

import { router } from '@/router';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from '@/App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app
  .component('h-button', HBtn)
  .component('h-card', Card)
  .component('h-check', HCheckbox)
  .component('h-dropdown', Dropdown)
  .component('h-img', HImg)
  .component('h-input', HInput)
  .component('h-select', HSelect);

app.use(Quasar, {
  plugins: {
    Loading,
  },
});

app.mount('#app');
