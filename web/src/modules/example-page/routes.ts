import type { RouteDefinition } from '@/types';
// import { t } from '@/plugins/i18n';

export default (): RouteDefinition[] => [
  {
    name: 'example-page',
    path: 'example-page',
    component: () => import('./views/ExamplePage.vue'),
    meta: {
      title: 'Example page',
      requiresAuth: true,
      isNavigation: true,
      // isRoot: true,
      icon: 'mdi mdi-view-list',
    },
  },
];
