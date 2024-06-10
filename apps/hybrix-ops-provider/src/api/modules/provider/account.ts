import { useAxios } from '@vueuse/integrations/useAxios';
import {
  homeAccountInstance,
  awsAccountInstance,
  awsSocialUsersInstance,
  awsTenantsInstance,
  awsRegionsInstance,
} from '@/api';
import type { RetrieveParams, UpdateParams, DeleteParams } from '@/api/types';

enum Api {
  CREATE_ACCOUNT = '/',
  RETRIEVE_ACCOUNTS = '/',
  UPDATE_ACCOUNT = '/',
  UPDATE_PROFILE_IMG = '/profile-img',
  DELETE_ACCOUNT = '/',
}

export const createAccount = (params: any) => {
  return useAxios(
    `${Api.CREATE_ACCOUNT}`,
    {
      method: 'POST',
      data: params,
    },
    homeAccountInstance
  );
};

export const retrieveAccounts = async ({ query }: RetrieveParams) => {
  return useAxios(
    `${Api.RETRIEVE_ACCOUNTS}?query=${query}`,
    {
      method: 'GET',
    },
    homeAccountInstance
  );
};

export const getAccounts = async () => {
  return useAxios(
    '/',
    {
      method: 'GET',
    },
    awsAccountInstance
  );
};

export const getSocialUsers = async () => {
  return useAxios(
    '/',
    {
      method: 'GET',
    },
    awsSocialUsersInstance
  );
};

export const getTenants = async () => {
  return useAxios(
    '/',
    {
      method: 'GET',
    },
    awsTenantsInstance
  );
};

export const getRegions = async () => {
  return useAxios(
    '/',
    {
      method: 'GET',
    },
    awsRegionsInstance
  );
};

export const updateAccount = ({ urn, data }: UpdateParams) => {
  return useAxios(
    `${Api.UPDATE_ACCOUNT}${urn}`,
    {
      method: 'PATCH',
      data,
    },
    homeAccountInstance
  );
};

// export const updateAccountProfileImg = (file: any) => {
//   return useAxios(
//     Api.UPDATE_PROFILE_IMG,
//     {
//       method: 'POST',
//       data: file,
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'Access-Control-Allow-Origin': '*',
//       },
//     },
//     homeAccountInstance
//   );
// };

export const deleteAccount = ({ urn }: any) => {
  return useAxios(
    Api.DELETE_ACCOUNT + `${urn}`,
    {
      method: 'DELETE',
    },
    homeAccountInstance
  );
};
