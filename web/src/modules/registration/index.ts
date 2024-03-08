import getRoutes from './routes';
import i18n from './i18n';

export const useRegistrationModule = () => {
  const routes = getRoutes();
  return {
    routes,
    i18n,
  };
};
