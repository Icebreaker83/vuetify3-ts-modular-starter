<script setup lang="ts">
import { useAlertsStore } from '../store';
import { storeToRefs } from 'pinia';
const { hideAlert } = useAlertsStore();
const { alerts } = storeToRefs(useAlertsStore());
</script>

<template>
  <div v-if="alerts?.length" class="alerts-container">
    <v-alert
      v-for="toast in alerts"
      :key="toast.id"
      :color="toast.type"
      :icon="`$${toast.type}`"
      :title="toast.title"
      :text="toast.message"
      closable
      @close="hideAlert(toast)"
    />
  </div>
</template>
<style scoped lang="scss">
.alerts-container {
  position: fixed;
  bottom: 40px;
  right: 0;
  padding: 10px;
  .v-alert {
    :deep(.v-alert__content) {
      white-space: pre-wrap;
      .v-alert-title {
        border-bottom: 1px solid #fff;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
