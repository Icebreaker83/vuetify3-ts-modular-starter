<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const id = computed(() => {
  return router.currentRoute.value.params.id;
});
</script>
<template>
  <h1>USER: {{ id }}</h1>
</template>
