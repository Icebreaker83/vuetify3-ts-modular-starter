<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useValidation, validators } from '@/composables/validation';
import AForm from '@/components/forms/AForm.vue';

const emit = defineEmits(['submit']);
const showPassword = ref(false);

const user = reactive({
  username: '',
  name: '',
  email: '',
  password: '',
});

const { required, email } = validators;
const rules = {
  username: { required },
  name: { required },
  email: { required, email },
  password: { required },
};

const { v$, errorMessages, touch, touchAll } = useValidation(rules, user);

const submit = () => {
  touchAll();
  if (v$.value.$error) return;
  const data = JSON.parse(JSON.stringify(user));
  emit('submit', data);
};
</script>

<template>
  <AForm @submit.prevent="submit">
    <v-text-field
      v-model="user.username"
      variant="outlined"
      :label="$t('users.fields.username')"
      autocomplete="username"
      autofocus
      clearable
      :error-messages="errorMessages.username"
      class="mb-4"
      data-cy="username"
      @input="touch('username')"
      @blur="touch('username')"
    />
    <v-text-field
      v-model="user.name"
      variant="outlined"
      :label="$t('users.fields.name')"
      autocomplete="name"
      clearable
      :error-messages="errorMessages.name"
      class="mb-4"
      data-cy="name"
      @input="touch('name')"
      @blur="touch('name')"
    />
    <v-text-field
      v-model="user.email"
      variant="outlined"
      :label="$t('users.fields.email')"
      clearable
      autocomplete="email"
      :error-messages="errorMessages.email"
      class="mb-4"
      data-cy="email"
      @input="touch('email')"
      @blur="touch('email')"
    />
    <v-text-field
      v-model="user.password"
      variant="outlined"
      :type="showPassword ? 'text' : 'password'"
      :label="$t('users.fields.password')"
      clearable
      autocomplete="current-password"
      :error-messages="errorMessages.password"
      data-cy="password"
      @input="touch('password')"
      @blur="touch('password')"
    >
      <template #append-inner>
        <v-icon :icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" @click="showPassword = !showPassword" />
      </template>
    </v-text-field>
  </AForm>
</template>
