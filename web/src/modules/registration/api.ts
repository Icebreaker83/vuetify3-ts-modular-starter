import { useApis } from '@/services/api';
import { type RegisterUser } from '@/modules/registration';
import type { Router } from 'vue-router';
import type { ComposerTranslation } from 'vue-i18n';

export const useEndpoints = () => {
  const { sendRequest } = useApis();

  const registerUser = (data: RegisterUser, router: Router, t: ComposerTranslation) => {
    return sendRequest({
      method: 'POST',
      url: 'users',
      data: data,
      onSuccess: {
        message: t('users.registration.success'),
        callback: () => {
          router.push({ name: 'home' });
        },
      },
    });
  };

  return {
    registerUser,
  };
};
