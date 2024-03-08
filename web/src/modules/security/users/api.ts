import { useAuthorizationService } from '@/services/authorization';
import type { GetUsers } from './types';
export const endpoints = {
  getUsers: (): GetUsers => {
    const { getAuthorizationHeader } = useAuthorizationService();
    return {
      method: 'GET',
      url: 'security/users',
      headers: getAuthorizationHeader(),
    };
  },
};
