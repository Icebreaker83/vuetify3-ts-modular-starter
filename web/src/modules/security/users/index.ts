import { endpoints } from './api';
import getRoutes from './routes';
import i18n from './i18n';

export const useUsersModule = () => {
  const { getUsers } = endpoints;
  const routes = getRoutes();
  return {
    getUsers,
    routes,
    i18n,
  };
};
