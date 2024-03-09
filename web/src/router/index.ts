// Composables
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { publicRoutes } from './public-routes';
import PrivateLayout from '@/layouts/PrivateLayout.vue';
import { privateRoutes } from './private-routes';
import { useAuthorizationService } from '@/services/authorization';
import { useCookies } from 'vue3-cookies';
import { t } from '@/plugins/i18n';

const routes = [
  {
    path: '/',
    name: 'publicRoutes',
    component: PublicLayout,
    children: publicRoutes,
  },
  {
    path: '/',
    name: 'privateRoutes',
    component: PrivateLayout,
    children: privateRoutes,
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () => import('@/views/redirects/TheForbidden.vue'),
    meta: { title: '' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'pageNotFound',
    component: () => import('@/views/redirects/NotFound.vue'),
    meta: { title: '' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes as RouteRecordRaw[],
});

router.beforeEach((to, from, next) => {
  const appTitle = t('appTitleShort');
  const title = typeof to.meta.title === 'string' && to.meta.title ? `${to.meta.title} | ${appTitle}` : appTitle;
  document.title = title;

  const { authState, logout } = useAuthorizationService();
  const { cookies } = useCookies();
  const accessToken = cookies.get('_accessToken');
  const refreshToken = cookies.get('_refreshToken');

  if (authState.value.isAuth && (!accessToken || !refreshToken)) {
    logout(true, router);
    return;
  }
  // if route requires auth and user not logged
  if (to.matched.some(record => record.meta.requiresAuth) && !authState.value.isAuth) {
    // add redirect to url query and go to login page
    next({ name: 'home', query: { redirect: to.fullPath } });
    return;
  }
  // if logged in and navigating to home redirect to dashboard
  if (to.path === '/' && authState.value.isAuth) {
    next({ name: 'dashboard' });
    return;
  }
  next();
});
export default router;
