import { t } from '@/plugins/i18n';
import type { RouteDefinition } from './types';

export const publicRoutes: RouteDefinition[] = [
  {
    name: 'login',
    path: '/',
    component: () => import('@/views/Home.vue'),
    meta: { title: t('home.login') },
  },
];
