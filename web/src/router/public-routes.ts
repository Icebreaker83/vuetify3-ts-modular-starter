import { t } from '@/plugins/i18n';
import type { RouteDefinition } from './types';

export const publicRoutes: RouteDefinition[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/public/Home.vue'),
    meta: { title: t('home.login') },
  },
  {
    name: 'registration',
    path: 'registration',
    component: () => import('@/views/public/Registration.vue'),
    meta: {
      title: t('users.registration.self'),
      size: 'sm',
    },
  },
];
