import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { IndexedHttpRequest } from './types';
import { useLoaderStore } from '@/store/loader';

export const useRequestsStore = defineStore('requests', () => {
  const { showLoader } = useLoaderStore();

  const requests = ref<IndexedHttpRequest[]>([]);
  watch(
    requests,
    newValue => {
      showLoader(!!newValue.length);
    },
    { deep: true },
  );

  const addRequest = (request: IndexedHttpRequest) => {
    requests.value.push(request);
  };

  const removeRequest = (request: IndexedHttpRequest) => {
    requests.value = requests.value.filter(r => r.id !== request.id);
  };

  return { requests, addRequest, removeRequest };
});
