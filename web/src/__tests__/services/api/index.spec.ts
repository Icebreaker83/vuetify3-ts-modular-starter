import { createApp } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import { useApis } from '@/services/api/index.js';

describe('useApis - sendRequest', () => {
  beforeEach(() => {
    const app = createApp({});
    const pinia = createPinia();
    app.use(pinia);
    setActivePinia(createPinia());
  });

  it('should clear and set timeout if debounce is set', async () => {
    const { sendRequest } = useApis();
    vi.spyOn(global, 'setTimeout');
    vi.spyOn(global, 'clearTimeout');

    await sendRequest({ url: 'test-url', method: 'test', debounce: 500 });

    expect(clearTimeout).toHaveBeenCalledOnce();
    expect(setTimeout).toHaveBeenCalledOnce();
  });
});
