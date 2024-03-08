import type { AxiosResponse as ApiResponse, AxiosError } from 'axios';

export interface HttpFinally {
  (): void;
}

export interface HttpResponse {
  callback?(response: ApiResponse): void;
  message?: string;
}
export interface HttpError {
  callback?(error: AxiosError): void;
  message?: string;
}

export interface HttpRequest {
  url: string;
  method: string;
  data?: object;
  headers?: object;
  onSuccess?: HttpResponse;
  onError?: HttpError;
  finally?: HttpFinally;
  debounce?: boolean | number;
}

export interface IndexedHttpRequest extends HttpRequest {
  id: number;
}

export { ApiResponse };
