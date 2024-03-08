/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify';
import pinia from '../store';
import router from '../router';
import i18n from './i18n';
import PortalVue from 'portal-vue';

//Modules
import registerModules from '../modules';

// Types
import type { App } from 'vue';

registerModules(router, i18n);

export const registerPlugins = (app: App) => {
  app.use(vuetify).use(router).use(pinia).use(i18n).use(PortalVue);
};
