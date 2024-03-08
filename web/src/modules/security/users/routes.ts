import type { RouteDefinition } from '@/types';
import { t } from '@/plugins/i18n';

export default (): RouteDefinition[] => [
  {
    name: 'usersList',
    path: 'users',
    component: () => import('./views/list/UsersList.vue'),
    meta: {
      title: t('security.users.views.list.self'),
      requiresAuth: true,
      isNavigation: true,
      icon: 'mdi mdi-account-multiple',
    },
  },
  {
    name: 'usersItem',
    path: 'users/:login/details',
    component: () => import('./views/item/UsersItem.vue'),
    meta: {
      title: t('security.users.views.item.self'),
      requiresAuth: true,
      breadcrumbs: [
        { title: t('security.self') },
        { title: t('security.users.views.list.self'), href: '/administration/users' },
        { title: '', param: 'login' },
      ],
    },
  },
];
