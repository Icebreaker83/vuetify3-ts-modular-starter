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
      isNavigation: true,
      isRoot: true,
      icon: 'mdi mdi-shield-account',
    },
  },
  {
    path: '/administration',
    redirect: { name: 'pageNotFound' },
    meta: {
      title: t('administration.self'),
      isNavigation: true,
      isRoot: true,
      icon: 'mdi mdi-cog',
    },
    children: [
      {
        name: 'usersList',
        path: 'users',
        component: () => import('@/views/private/administration/users/list/UsersList.vue'),
        meta: {
          title: t('users.list.self'),
          isNavigation: true,
          icon: 'mdi mdi-account-multiple',
        },
      },
      {
        name: 'usersItem',
        path: 'users/:id',
        component: () => import('@/views/private/administration/users/item/UsersItem.vue'),
        meta: {
          title: t('users.item.self'),
        },
      },
    ],
  },
];
