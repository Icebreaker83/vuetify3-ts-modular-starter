import { nextTick } from 'vue';
import { useAuthStore, clearState } from './store';
import { endpoints } from './api';
import type { AccessToken, LoginPayload } from './types';
import { useCookies } from 'vue3-cookies';
import { jwtDecode } from 'jwt-decode';
import { useApis, type ApiResponse } from '../api';
import type { Router } from 'vue-router';
import { storeToRefs } from 'pinia';

export type { LoginPayload };

export const useAuthorizationService = () => {
  const { cookies } = useCookies();
  const { setAuthState } = useAuthStore();
  const { authState } = storeToRefs(useAuthStore());

  const setCredentials = (user: string, accessToken: string, refreshToken: string) => {
    cookies.set('_accessToken', accessToken);
    cookies.set('_refreshToken', refreshToken);

    const decodedToken = jwtDecode<AccessToken>(accessToken);

    const newState = {
      isAuth: true,
      user: {
        login: user,
        name: decodedToken.user_name,
      },
      expirationDate: decodedToken.exp ? decodedToken.exp * 1000 : null,
      lastActivity: Date.now(),
    };

    setAuthState(newState);
  };

  const { sendRequest } = useApis();

  const login = (username: string, password: string, router: Router) => {
    const request = {
      ...endpoints.login(username, password),
      onSuccess: {
        callback: (response: ApiResponse) => {
          const data = response.data;
          setCredentials(username, data.payload.accessToken, data.payload.refreshToken);
          nextTick(() => {
            router.push({ name: 'dashboard' });
          });
        },
      },
    };
    sendRequest(request);
  };

  const refresh = endpoints.refresh;
  const refreshAccessToken = (accessToken: string) => {
    cookies.remove('_accessToken');
    cookies.set('_accessToken', accessToken);

    const decodedToken = jwtDecode<AccessToken>(accessToken);
    decodedToken.exp && setAuthState({ expirationDate: decodedToken.exp * 1000 });
  };

  const logout = (redirect: boolean, router: Router) => {
    // redirect && setAutoLogout(redirect);
    setAuthState(JSON.parse(JSON.stringify(clearState)));
    // remove cookies and other relevant items from localStorage
    cookies.remove('_accessToken');
    cookies.remove('_refreshToken');
    const route = {
      name: 'home',
      ...(redirect ? { query: { redirect: router.currentRoute.value.fullPath } } : {}),
    };
    router.push(route);
  };

  const getAuthorizationHeader = () => {
    return { Authorization: `Bearer ${cookies.get('_accessToken')}` };
  };

  return {
    authState,
    login,
    endpoints: {
      refresh,
    },
    refreshAccessToken,
    logout,
    getAuthorizationHeader,
  };
};
