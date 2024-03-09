<script setup lang="ts">
import { useAuthorizationService } from '@/services/authorization';

const { authState } = useAuthorizationService();
const { name } = authState.value.user;
</script>
<template>
  <h1>{{ $t('dashboard.title') }}, {{ name }}</h1>
</template>
