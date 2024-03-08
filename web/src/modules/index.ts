import type { Router, RouteRecordRaw } from 'vue-router';
import type { RouteDefinition } from '@/types';
import { useSecurityModule } from './security';
import { useRegistrationModule } from './registration';
import { useExamplePageModule } from './example-page';
import type { I18n } from 'vue-i18n';

const addRoutes = (router: Router, routes: RouteDefinition[]) => {
  routes.forEach(route => {
    const parent = route.meta?.requiresAuth ? 'privateRoutes' : 'publicRoutes';
    router.addRoute(parent, route as RouteRecordRaw);
  });
};

interface TI18n {
  global: Pick<I18n['global'], 'messages' | 'setLocaleMessage'>;
}
const addI18n = (i18n: TI18n, messages: Record<string, unknown>) => {
  const globalMessages = ('value' in i18n.global.messages ? i18n.global.messages.value : {}) as Record<string, string>;

  Object.keys(globalMessages).forEach(key => {
    const existingMessages = globalMessages[key] || {};
    const newMessages = messages[key] || {};

    i18n.global.setLocaleMessage(key, {
      ...existingMessages,
      ...newMessages,
    });
  });
};

export default (router: Router, i18n: TI18n) => {
  const { i18n: securityI18n } = useSecurityModule();
  const { i18n: registrationI18n } = useRegistrationModule();
  const { i18n: examplePageI18n } = useExamplePageModule();
  addI18n(i18n, securityI18n);
  addI18n(i18n, registrationI18n);
  addI18n(i18n, examplePageI18n);
  // i18n messages have to be added before routes,
  // othervise, there would be no locales avaliable to the routes
  const { routes: securityRoutes } = useSecurityModule();
  const { routes: registrationRoutes } = useRegistrationModule();
  const { routes: examplePageRoutes } = useExamplePageModule();
  addRoutes(router, securityRoutes);
  addRoutes(router, registrationRoutes);
  addRoutes(router, examplePageRoutes);
};
