import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { useAuthorizationService } from '@/services/authorization';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  async config => {
    // if public request, skip
    if (!config.headers.Authorization) return config;
    const { authState, endpoints, refreshAccessToken } = useAuthorizationService();
    const refreshRegex = new RegExp(`${endpoints.refresh.url}`)
    // if refresh token endpoint, skip
    if(config.url && refreshRegex.test(config.url)) return config
    const { cookies } = useCookies();
    const now = Date.now();
    
    const refreshToken = cookies.get('_refreshToken');

    // if no refreshToken in cookies cancel request
    if (!refreshToken) {
      console.warn('No refresh token in cookies! Request aborted');
      return {
        ...config,
        signal: AbortSignal.abort(),
      };
    }
    const expirationDate = authState.value.expirationDate || 0;
    // // if token expired refresh it
    if (now >= expirationDate) {
      await axios({
        ...endpoints.refresh,
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
        .then(response => {
          refreshAccessToken(response.data.payload.accessToken);
        })
        .catch(error => {
          console.error('Refresh token ERROR: ', error);
          // add logout with redirect here
        });
    }
    config.headers['Authorization'] = `Bearer ${cookies.get('_accessToken')}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axios;
