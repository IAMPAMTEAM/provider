import { useAxios } from '@vueuse/integrations/useAxios';
import { useCookies } from '@vueuse/integrations/useCookies';
// import { orderInstance } from '@/api';

enum Api {
  GET_ORDER_INFO = '/',
}

export const getOrderInfo = async (params: any) => {
  return useAxios(
    Api.GET_ORDER_INFO + '?query=' + params.query,
    {
      method: 'GET',
    }
    // orderInstance
  );
};
