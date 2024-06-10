import { consoleTenantInstance } from '../../index';
import { useAxios } from '@vueuse/integrations/useAxios';

enum Api {
  FETCH_TENANT = '/',
  VALIDATE_TENANT = '/validate',
}

// export const fetchTenant = (params: FindParams) => {
//   const url = Api.FETCH_TENANT + '?query=' + params.query;
//   return useAxios(url, { method: 'GET' }, homeTenantInstance);
// };

// export const getConsoleTenant = (params: FindParams) => {
//   const url = Api.FETCH_TENANT + '?query=' + params.query;
//   return useAxios(url, { method: 'GET' }, consoleTenantInstance);
// };

export const validateConsoleTenant = ({ tenantName }: { tenantName: string }) => {
  const url = Api.VALIDATE_TENANT + '/' + tenantName;
  return useAxios(url, { method: 'GET' }, consoleTenantInstance);
};
