<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay, DisplayBreakpoint } from 'vuetify';
import { useRouter } from 'vue-router';

const { xs, thresholds } = useDisplay();
const router = useRouter();

const width = computed(() => {
  if (xs.value) return '100%';
  const size = router.currentRoute.value.meta?.size as DisplayBreakpoint;
  if (!size) return '100%';
  return thresholds.value[size];
});
const title = computed(() => {
  return router.currentRoute.value.meta?.title;
});
</script>
<template>
  <v-card variant="flat" :width="width" class="fill-height">
    <v-card-title class="bg-indigo heading-section pa-2 my-6">
      <slot name="title">
        <span v-if="title" class="text-h5">{{ title }}</span>
      </slot>
    </v-card-title>
    <slot></slot>
  </v-card>
</template>
