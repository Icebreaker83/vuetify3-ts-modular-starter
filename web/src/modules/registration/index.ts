import type { RegisterUser } from './types';
import { useEndpoints } from './api';
export type { RegisterUser };

export const useRegistrationModule = () => {
  const { registerUser } = useEndpoints();
  return {
    registerUser,
  };
};
