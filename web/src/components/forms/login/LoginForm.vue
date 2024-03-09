<script setup lang="ts">
import { ref, reactive } from 'vue';
import AForm from '../AForm.vue';

const emit = defineEmits(['submit']);

import { useValidation, validators } from '@/composables/validation';

const showPassword = ref(false);
const user = reactive({
  login: '',
  password: '',
});
const { required } = validators;

const rules = {
  login: { required },
  password: { required },
};

const { v$, errorMessages, touch, touchAll } = useValidation(rules, user);

const onSubmit = () => {
  touchAll();
  if (v$.value.$error) return;
  emit('submit', JSON.parse(JSON.stringify(user)));
};
</script>
<template>
  <a-form :cancelable="false" block-actions @submit.prevent="onSubmit">
    <v-text-field
      ref="usernameInput"
      v-model="user.login"
      variant="outlined"
      :label="$t('user.login')"
      autocomplete="username"
      autofocus
      clearable
      :error-messages="errorMessages.login"
      class="mb-4"
      data-cy="username"
      append-inner-icon="mdi-account"
      @input="touch('login')"
      @blur="touch('login')"
    />
    <v-text-field
      v-model="user.password"
      variant="outlined"
      :type="showPassword ? 'text' : 'password'"
      :label="$t('user.password')"
      autocomplete="current-password"
      clearable
      :error-messages="errorMessages.password"
      data-cy="password"
      @input="touch('password')"
      @blur="touch('password')"
    >
      <template #append-inner>
        <v-icon :icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" @click="showPassword = !showPassword" />
      </template>
    </v-text-field>
  </a-form>
</template>
