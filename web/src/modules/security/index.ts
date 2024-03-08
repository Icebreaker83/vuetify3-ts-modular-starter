import getRoutes from './routes';
import { useUsersModule } from './users';

export const useSecurityModule = () => {
  const { i18n: usersI18n } = useUsersModule();
  const i18n = {
    sr: { ...usersI18n.sr },
    en: { ...usersI18n.en },
  };
  const routes = getRoutes();

  return {
    routes,
    i18n,
  };
};
