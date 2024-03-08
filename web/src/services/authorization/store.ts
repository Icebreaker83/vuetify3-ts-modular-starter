import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { AuthorizationState } from './types';

export const clearState: AuthorizationState = {
  isAuth: false,
  user: {
    login: '',
    name: '',
  },
  expirationDate: null,
  lastActivity: null,
};

export const useAuthStore = defineStore(
  'authorization',
  () => {
    // IMPORTANT: Because of interaction between persistance and shared state plugins,
    // all of the refs need to be inside authState ref
    const authState = ref<AuthorizationState>(JSON.parse(JSON.stringify(clearState)));
    const keepAlive = ref<string[]>([]);

    const setAuthState = (value: object) => {
      authState.value = Object.assign(authState.value, value);
    };
    const refreshActivity = () => {
      authState.value.lastActivity = Date.now();
    };

    const setKeepAlive = (routeNames: string[]) => {
      keepAlive.value = routeNames;
    };

    return {
      authState,
      keepAlive,
      setAuthState,
      refreshActivity,
      setKeepAlive,
    };
  },
  {
    persist: true,
  },
);
