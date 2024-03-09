import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVuelidate, type ErrorObject } from '@vuelidate/core';
import type { ValidationErrorMessages } from './types';
import validators from './validators';

export { validators };
/**
 * Provides validation functionalities based on the provided rules and state.
 * @param {object} rules - The validation rules.
 * @param {object} state - The current state of the object being validated.
 * @returns {object} - An object containing various validation functions and properties.
 */
export const useValidation = (rules: object, state: object) => {
  const v$ = useVuelidate(rules, state);
  const { t, te } = useI18n();

  const errorMessages = ref<ValidationErrorMessages>({});

  /**
   * Triggers the validation process for a specific field.
   * @param {string} fieldName - The name of the field to be validated.
   */
  const touch = (fieldName: string) => {
    if (!v$.value[fieldName]) {
      console.error(`No validation for field "${fieldName}" implemented. Check validation rules or ref.`);
      return;
    }
    v$.value[fieldName].$touch();
    if (!v$?.value[fieldName]?.$error) {
      errorMessages.value[fieldName] = '';
      return;
    }

    const errors = v$.value[fieldName].$errors.map((error: ErrorObject) => {
      if (te(`validators.${error.$uid}`)) return t(`validators.${error.$uid}`);
      let msg = t(`validators.${error.$validator}`);
      if ('min' in error.$params) {
        msg = msg.replace(/%min/, error.$params.min as string);
      }
      if ('max' in error.$params) {
        msg = msg.replace(/%max/, error.$params.max as string);
      }
      return msg;
    });

    errorMessages.value[fieldName] = errors.length ? errors : '';
  };

  /**
   * Triggers the validation process for all fields.
   */
  const touchAll = () => {
    Object.keys(state).forEach(key => {
      if (!v$.value[key]) return;
      touch(key);
    });
  };

  /**
   * Resets the validation state and error messages.
   */
  const reset = () => {
    v$.value.$reset();
    errorMessages.value = {};
  };

  return {
    v$,
    errorMessages,
    touch,
    touchAll,
    reset,
  };
};
