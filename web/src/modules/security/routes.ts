import type { RouteDefinition } from '@/types';
import { t } from '@/plugins/i18n';
import { useUsersModule } from './users';

export default (): RouteDefinition[] => {
  const { routes: usersRoutes } = useUsersModule();
  return [
    {
      path: '/administration',
      children: [...usersRoutes],
      redirect: { name: 'pageNotFound' },
      meta: {
        title: t('security.self'),
        requiresAuth: true,
        isNavigation: true,
        isRoot: true,
        icon: 'mdi mdi-cog-outline',
      },
    },
  ];
};
