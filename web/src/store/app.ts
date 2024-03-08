import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore(
  'app',
  () => {
    const theme = ref('light');
    const locale = ref('sr');
    const sidebarCollapse = ref(true);

    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (theme.value === 'auto') {
      darkMediaQuery.addEventListener('change', () => {
        setTheme(darkMediaQuery.matches ? 'dark' : 'light');
      });
    }

    const setTheme = (t: string) => {
      theme.value = t;
      const body = document.querySelector('body');
      if (!body) return;
      body.className = '';
      body.classList.add(t === 'auto' ? (darkMediaQuery.matches ? 'dark' : 'light') : t);
    };

    const setLocale = (value: string) => {
      locale.value = value;
    };

    const toggleSidebar = () => {
      sidebarCollapse.value = !sidebarCollapse.value;
    };

    return {
      theme,
      setTheme,
      locale,
      setLocale,
      sidebarCollapse,
      toggleSidebar,
    };
  },
  { persist: true },
);
