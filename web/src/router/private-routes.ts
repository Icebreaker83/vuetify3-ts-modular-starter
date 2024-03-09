import { t } from '@/plugins/i18n';
import type { RouteDefinition } from './types';

export const privateRoutes: RouteDefinition[] = [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('@/views/private/dashboard/TheDashboard.vue'),
    meta: {
      title: t('dashboard.self'),
      hideActions: true,
      requiresAuth: true,
      isNavigation: true,
      isRoot: true,
      icon: 'mdi mdi-shield-account',
    },
  },
];
