import apiClient from './client';
import type { HttpRequest, IndexedHttpRequest, ApiResponse } from './types';
import { useAlertFeature } from '@/features/alert';
import { useRequestsStore } from './store';
import { t } from '@/plugins/i18n';
import { storeToRefs } from 'pinia';

export const useApis = () => {
  const { addRequest, removeRequest } = useRequestsStore();
  const { requests } = storeToRefs(useRequestsStore());
  const { showAlert } = useAlertFeature();

  const handleRequest = async (passedRequest: HttpRequest) => {
    const request: IndexedHttpRequest = {
      ...passedRequest,
      id: requests.value.length,
    };
    addRequest(request);

    return apiClient({
      method: request.method,
      url: request.url,
      data: request.data,
      headers: request.headers,
    })
      .then((response: ApiResponse) => {
        const onSuccess = request?.onSuccess?.callback;
        onSuccess && onSuccess(response);

        request?.onSuccess?.message &&
          showAlert({
            type: 'success',
            message: request.onSuccess.message,
          });

        return response;
      })
      .catch((error: any) => {
        if (apiClient.isCancel(error)) return;
        console.error(error);
        const onError = request?.onError;
        const errorMessage = error?.response?.data?.message ?? t('messages.error.default');
        showAlert({
          type: 'error',
          message: onError?.message ?? errorMessage,
        });
        onError?.callback && onError?.callback(error);
      })
      .finally(() => {
        removeRequest(request);
        const finallyCallback = request?.finally;
        finallyCallback && finallyCallback();
      });
  };

  let debounce: ReturnType<typeof setTimeout> | undefined;
  const sendRequest = async (passedRequest: HttpRequest) => {
    if (!passedRequest.debounce) return handleRequest(passedRequest);
    clearTimeout(debounce);
    const timer =
      typeof passedRequest.debounce === 'boolean' ? import.meta.env.VITE_DEFAULT_DEBOUNCE : passedRequest.debounce;
    debounce = setTimeout(() => {
      return handleRequest(passedRequest);
    }, timer);
  };

  return {
    sendRequest,
  };
};

export { ApiResponse, HttpRequest };
