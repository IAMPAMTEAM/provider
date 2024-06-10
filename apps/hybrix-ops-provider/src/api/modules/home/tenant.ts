import { useAxios } from '@vueuse/integrations/useAxios';
import type {
  AddCoinInfoParams,
  AddServiceInfoParams,
  AddTenantInfoParams,
  FindInfoParams,
  RemoveTenantInfoParams,
  UpdateTenantInfoParams,
} from '@/api/types';
import { homeTenantInstance } from '@/api';

enum Api {
  ADD_COIN_INFO = '/coin',
  ADD_SERVICE_INFO = '/service/add',
  ADD_TENANT_INFO = '/',
  FIND_TENANT_INFO = '/',
  REMOVE_TENANT_INFO = '/',
  UPDATE_TENANT_INFO = '/',
}

const addTenantInfo = (params: AddTenantInfoParams) => {
  return useAxios(
    Api.ADD_TENANT_INFO,
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    homeTenantInstance
  );
};

const getTenantInfo = (params: FindInfoParams) => {
  return useAxios(
    Api.FIND_TENANT_INFO + '?query=' + params.query,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    homeTenantInstance
  );
};

const updateTenantInfo = (params: any) => {
  return useAxios(
    Api.UPDATE_TENANT_INFO + params.urn,
    {
      method: 'PATCH',
      data: params.data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    homeTenantInstance
  );
};

// const updateTenantInfo = (urn: string, params: any) => {
//   return useAxios(
//     Api.UPDATE_TENANT_INFO + urn,
//     {
//       method: 'PATCH',
//       data: params,
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//       },
//     },
//     homeTenantInstance
//   );
// };

const removeTenantInfo = (params: { urn: string }) => {
  return useAxios(
    Api.REMOVE_TENANT_INFO + `${params.urn}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    homeTenantInstance
  );
};

export { addTenantInfo, getTenantInfo, removeTenantInfo, updateTenantInfo };
