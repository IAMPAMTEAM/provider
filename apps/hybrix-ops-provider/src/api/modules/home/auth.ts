import { useAxios } from '@vueuse/integrations/useAxios';
import type { GetAccountInfoParams } from '@/api/types';
import { providerAuthInstance } from '@/api';

enum Api {
  AUTH_LOGIN = '/login',
}

const loginAccount = (params: any) => {
  return useAxios(
    Api.AUTH_LOGIN,
    {
      method: 'POST',
      data: params,
    },
    providerAuthInstance
  );
};

export { loginAccount };
