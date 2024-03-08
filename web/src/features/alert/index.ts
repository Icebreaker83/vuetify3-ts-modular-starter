import TheToaster from './components/TheToaster.vue';
import { useAlertsStore } from './store';

export const useAlertFeature = () => {
  const { showAlert } = useAlertsStore();
  return {
    showAlert,
    TheToaster,
  };
};
