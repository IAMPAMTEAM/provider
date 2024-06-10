import { useAxios } from '@vueuse/integrations/useAxios';
import { providerAllowlistInstance, providerAuthInstance } from '@/api';

enum Api {
  RETRIEVE_ALLOWLIST = '/',
  ADD_BLACKLIST = '/add-blacklist',
  REMOVE_BLACKLIST = '/remove-blacklist',
  ADD_WHITELIST = '/add-whitelist',
  REMOVE_WHITELIST = '/remove-whitelist',
}

const retrieveAllowlist = ({ query }: any) => {
  return useAxios(
    `${Api.RETRIEVE_ALLOWLIST}?query=${query}`,
    {
      method: 'GET',
    },
    providerAllowlistInstance
  );
};

const addBlacklist = (params: any) => {
  return useAxios(
    Api.ADD_BLACKLIST,
    {
      method: 'PUT',
      data: params,
    },
    providerAllowlistInstance
  );
};

const removeBlacklist = (params: any) => {
  return useAxios(
    Api.REMOVE_BLACKLIST,
    {
      method: 'PUT',
      data: params,
    },
    providerAllowlistInstance
  );
};

const addWhitelist = (params: any) => {
  return useAxios(
    Api.ADD_WHITELIST,
    {
      method: 'PUT',
      data: params,
    },
    providerAllowlistInstance
  );
};

const removeWhitelist = (params: any) => {
  return useAxios(
    Api.REMOVE_WHITELIST,
    {
      method: 'PUT',
      data: params,
    },
    providerAllowlistInstance
  );
};

export { retrieveAllowlist, addBlacklist, removeBlacklist, addWhitelist, removeWhitelist };
