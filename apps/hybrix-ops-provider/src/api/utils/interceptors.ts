// 참고: https://axios-http.com/docs/interceptors

import { useCookies } from '@vueuse/integrations/useCookies';
import type { AxiosInstance } from 'axios';

export function setInterceptors(instance: AxiosInstance) {
  const cookie = useCookies();
  const token = cookie.get('h_auth_token');

  instance.interceptors.request.use(
    function (config) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return instance;
}
