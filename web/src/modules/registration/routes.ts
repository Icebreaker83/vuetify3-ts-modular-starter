import type { RouteDefinition } from '@/types';
import { t } from '@/plugins/i18n';

export default (): RouteDefinition[] => [
  {
    name: 'registration',
    path: 'registration',
    component: () => import('./views/Registration.vue'),
    meta: {
      title: t('registration.self'),
    },
  },
];
