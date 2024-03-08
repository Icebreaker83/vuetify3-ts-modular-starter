<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const login = computed(() => {
  return router.currentRoute.value.params.login;
});
</script>
<template>
  <h3>Detalji {{ login }}</h3>
</template>
