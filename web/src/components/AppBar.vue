<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useAuthorizationService } from '@/services/authorization';
import { useLoaderStore } from '@/store/loader';
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter, RouteRecordName } from 'vue-router';
import { publicRoutes } from '../router/public-routes';

const { authState, logout } = useAuthorizationService();
const { xs } = useDisplay();
const { loading } = storeToRefs(useLoaderStore());
const { toggleSidebar } = useAppStore();
const route = useRoute();
const router = useRouter();

const backgroundColor = import.meta.env.VITE_ENV_COLOR || 'primary';
const environment = import.meta.env.MODE;
const displayEnvironmentChip = ['ptest', 'development', 'staging', 'atest', 'local'].includes(environment);

const isPublicRoute = computed(() => publicRoutes.map(item => item.name).includes(route.name as RouteRecordName));
</script>
<template>
  <v-app-bar :elevation="2" :color="backgroundColor">
    <!-- <v-app-bar-nav-icon /> -->
    <template #title>
      <v-icon v-if="xs && !isPublicRoute" icon="mdi-menu" class="mr-3" @click="toggleSidebar"></v-icon>
      <img class="logo" src="../assets/logo.svg" />
      <v-chip v-if="!xs && displayEnvironmentChip" variant="elevated" color="primary" class="mx-2">
        {{ $t(`environments.${environment}`) }}
      </v-chip>
      <v-progress-circular v-if="loading" indeterminate class="mx-2" />
    </template>

    <template v-if="authState.isAuth">
      <v-menu>
        <template #activator="{ props }">
          <v-btn v-bind="props" class="text-none px-2">
            <span data-cy="logged-in-user">{{ authState.user.login }}</span>
            <v-icon icon="mdi-menu-down" />
          </v-btn>
        </template>
        <v-list>
          <!-- <v-list-item :to="{ name: 'userProfile' }" nav data-cy="administration.profile">
            <v-icon icon="mdi-account-circle" />
            {{ $t('administration.profile') }}
          </v-list-item> -->
          <v-list-item nav data-cy="logout" @click="logout(false, router)">
            <v-icon icon="mdi-logout" />
            {{ $t('misc.logout') }}
          </v-list-item>
          <v-divider />
        </v-list>
      </v-menu>
    </template>

    <!-- <TheCrest v-if="!xs && !authState.isAuth" class="me-2" /> -->
  </v-app-bar>
</template>
<style lang="scss" scoped>
.actions-bar {
  min-height: 52px;
}

.logo {
  width: 70px;
}
</style>

<style lang="scss">
.v-toolbar {
  &-title {
    &__placeholder {
      display: flex;
      align-items: center;
    }
  }
}
</style>
