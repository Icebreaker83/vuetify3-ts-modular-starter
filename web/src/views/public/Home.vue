<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthorizationService, type LoginPayload } from '@/services/authorization';
import LoginForm from '@/components/forms/login/LoginForm.vue';

import { useLoaderStore } from '@/store/loader';
import { storeToRefs } from 'pinia';

const { login } = useAuthorizationService();
const { loading } = storeToRefs(useLoaderStore());

const router = useRouter();
const onSubmit = (user: LoginPayload) => {
  login(user.login, user.password, router);
};
</script>
<template>
  <v-container fluid class="pa-0 fill-height">
    <v-row no-gutters class="justify-center align-center fill-height">
      <v-col cols="12" sm="6" class="d-flex align-center justify-center px-2">
        <div class="form-wrapper">
          <div class="heading">
            <img class="logo" src="@/assets/logo.svg" alt="Home Logo" height="80" />
            <h1>{{ $t('appTitleFull') }}</h1>
          </div>

          <h3 class="text-h6 font-weight-thin my-4">{{ $t('home.subheading') }}</h3>
          <login-form @submit="onSubmit" />
          <div class="d-flex align-center justify-space-between mt-4">
            <h6 class="text-grey-lighten-1 text-subtitle-1">{{ $t('home.notRegistered') }}</h6>
            <router-link :to="{ name: 'registration' }" class="text-decoration-none text-indigo text-subtitle-1">{{
              $t('home.register')
            }}</router-link>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.heading {
  align-items: center;
  display: flex;
  gap: 1em;
}
.form-wrapper {
  max-width: 400px;
}
.illustration {
  width: 100%;
  max-width: 500px;
}
</style>
