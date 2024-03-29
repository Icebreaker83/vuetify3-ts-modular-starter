/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

// Plugins
import { registerPlugins } from '@/plugins';

// Styles
import '@/assets/scss/main.scss';
import 'tabulator-tables/dist/css/tabulator_bootstrap4.css';

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
