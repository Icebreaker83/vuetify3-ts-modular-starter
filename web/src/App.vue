<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import AppBar from '@/components/AppBar.vue';
import { useAlertFeature } from '@/features/alert';

const { TheToaster } = useAlertFeature();

const { xs } = useDisplay();
const appKey = computed(() => {
  return Number(xs.value);
});
</script>

<template>
  <v-app>
    <AppBar />
    <v-main :key="appKey">
      <router-view />
    </v-main>
    <TheToaster />
  </v-app>
</template>
