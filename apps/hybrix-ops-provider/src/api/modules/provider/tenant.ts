import { useAxios } from '@vueuse/integrations/useAxios';
import { homeTenantInstance } from '@/api';
import type { RetrieveParams, UpdateParams, DeleteParams } from '@/api/types';

enum Api {
  CREATE_TENANT = '/',
  RETRIEVE_TENANTS = '/',
  UPDATE_TENANT = '/',
  DELETE_TENANT = '/',
}

export const retrieveTenants = ({ query }: RetrieveParams) => {
  return useAxios(
    Api.RETRIEVE_TENANTS + '?query=' + query,
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

export const updateTenant = ({ urn, data }: UpdateParams) => {
  return useAxios(
    Api.UPDATE_TENANT + urn,
    {
      method: 'PATCH',
      data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
    homeTenantInstance
  );
};

export const deleteTenant = ({ urn }: any) => {
  return useAxios(
    Api.DELETE_TENANT + `${urn}`,
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
