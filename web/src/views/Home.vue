<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useDisplay } from 'vuetify';
import { required } from '@vuelidate/validators';
import useValidation from '@/composables/validation';
import { useRouter } from 'vue-router';
import { useAuthorizationService } from '@/services/authorization';

import { useLoaderStore } from '@/store/loader';
import { storeToRefs } from 'pinia';

const { mdAndUp } = useDisplay();
const { login } = useAuthorizationService();
const { loading } = storeToRefs(useLoaderStore());

const showPassword = ref(false);
const user = reactive({
  login: '',
  password: '',
});

const rules = {
  login: { required },
  password: { required },
};

const { v$, errorMessages, touch, touchAll } = useValidation(rules, user);

const router = useRouter();
const onSubmit = () => {
  touchAll();
  if (v$.value.$error) return;
  login(user.login, user.password, router);
};
</script>
<template>
  <v-container fluid class="pa-0 fill-height">
    <v-row no-gutters class="justify-center align-center fill-height">
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <div class="form-wrapper">
          <img class="logo" src="../assets/logo.svg" />
          <h3 class="text-h6 font-weight-thin mt-8 mb-12">{{ $t('home.subheading') }}</h3>
          <v-form ref="form" class="mt-6 mb-4" @submit.prevent="onSubmit">
            <v-text-field
              ref="usernameInput"
              v-model="user.login"
              variant="outlined"
              :label="$t('user.login')"
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
            <v-btn
              color="primary"
              type="submit"
              block
              :disabled="loading"
              :loading="loading"
              class="text-none mt-6"
              size="large"
              data-cy="login-button"
            >
              {{ $t('form.submit') }}
            </v-btn>
          </v-form>
          <div class="d-flex align-center justify-space-between">
            <h6 class="text-grey-lighten-1 text-subtitle-1">{{ $t('home.notRegistered') }}</h6>
            <router-link :to="{ name: 'registration' }" class="text-decoration-none text-indigo text-subtitle-1">{{
              $t('home.register')
            }}</router-link>
          </div>
        </div>
      </v-col>
      <v-col v-if="mdAndUp" cols="12" md="6" class="pa-16 bg-indigo fill-height d-flex align-center justify-center">
        <img class="illustration" src="../assets/home-illustration.svg" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.form-wrapper {
  max-width: 400px;
}
.illustration {
  width: 100%;
  max-width: 500px;
}
</style>
