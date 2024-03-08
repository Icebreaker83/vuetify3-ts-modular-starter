import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Alert, IndexedAlert } from './types';

export const useAlertsStore = defineStore('alerts', () => {
  const alerts = ref<IndexedAlert[]>([]);
  const defaultAlert: Alert = {
    type: 'success',
    message: '<< SUCCESS MESSAGE >>',
  };

  const showAlert = (alert: Alert) => {
    const indexedAlert = {
      id: alerts.value.length,
      ...JSON.parse(JSON.stringify(defaultAlert)),
      ...alert,
    };
    alerts.value.unshift(indexedAlert);
    if (alert.type !== 'success') return;
    setTimeout(() => {
      hideAlert(indexedAlert);
    }, 7000);
  };

  const hideAlert = (alert: IndexedAlert) => {
    const index = alerts.value.findIndex(e => e.id === alert.id);
    if (index === -1) return;
    alerts.value.splice(index, 1);
  };

  return { alerts, showAlert, hideAlert };
});
