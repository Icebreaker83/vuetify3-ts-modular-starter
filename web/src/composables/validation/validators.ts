import { required, email } from '@vuelidate/validators';

const validIdentityNumber = (value: string) => {
  if (!value) return true;
  return /^\d{9}$/.test(value);
};

export default {
  required,
  email,
  validIdentityNumber,
};
