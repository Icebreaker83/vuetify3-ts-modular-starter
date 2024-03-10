import { watch, onMounted, onUnmounted } from 'vue';
import { useAuthorizationService } from '@/services/authorization';
import { DateTime } from 'luxon';
import { Router } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';

export const useAutoLogout = (sessionDurationMins: number, router: Router) => {
  const { authState, logout, refreshActivity } = useAuthorizationService();

  const activityDuration = import.meta.env.VITE_USER_ACTIVITY_DEBOUNCE_SEC * 1000;

  const handleUserActivity = useDebounceFn(refreshActivity, 5000, { maxWait: activityDuration }) as () => void;

  onMounted(() => {
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keypress', handleUserActivity);
  });

  onUnmounted(() => {
    document.removeEventListener('mousemove', handleUserActivity);
    document.removeEventListener('keypress', handleUserActivity);
  });

  let logoutTimer: ReturnType<typeof setTimeout> | undefined;
  watch(
    () => authState.value.lastActivity,
    newValue => {
      if (!newValue) return;
      if (!authState.value.isAuth) return;
      // handle case where user closes tab and is not active, then reopens tab
      const currentDate = DateTime.fromMillis(Date.now());
      const lastActivityDate = DateTime.fromMillis(newValue);
      const diff = currentDate.diff(lastActivityDate, 'minutes');
      if ((diff.toObject().minutes ?? 0) > sessionDurationMins) {
        logout(true, router);
        clearTimeout(logoutTimer);
        return;
      }

      clearTimeout(logoutTimer);
      if (!newValue) return;
      const duration = sessionDurationMins * 60 * 1000 - 30 * 1000;
      logoutTimer = setTimeout(() => {
        logout(true, router);
      }, duration);
    },
    { deep: true, immediate: true },
  );
};
