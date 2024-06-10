import { useAxios } from '@vueuse/integrations/useAxios';
import type { GetAccountInfoParams } from '@/api/types';
import { providerAuthInstance } from '@/api';

enum Api {
  AUTH_PROVIDER_LOGIN = '/provider-login',
  AUTH_PROVIDER_REGISTER = '/register',
}

const loginProviderAccount = (params: any) => {
  return useAxios(
    Api.AUTH_PROVIDER_LOGIN,
    {
      method: 'POST',
      data: params,
    },
    providerAuthInstance
  );
};

const registProviderAccount = (params: any) => {
  return useAxios(
    Api.AUTH_PROVIDER_REGISTER,
    {
      method: 'POST',
      data: params,
    },
    providerAuthInstance
  );
};

export { loginProviderAccount, registProviderAccount };
