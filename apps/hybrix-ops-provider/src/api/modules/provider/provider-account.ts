import { useAxios } from '@vueuse/integrations/useAxios';
import { providerAccountInstance } from '@/api';
import type { RetrieveParams, UpdateParams, DeleteParams } from '../../types';

enum Api {
  CREATE_PROVIDER_ACCOUNT = '/',
  RETRIEVE_PROVIDER_ACCOUNTS = '/',
  UPDATE_PROVIDER_ACCOUNT = '',
  UPDATE_PROVIDER_ACCOUNT_PROFILE_IMG = '/profile-img',
  DELETE_PROVIDER_ACCOUNT = '',
}

export const retrieveProviderAccounts = ({ query }: RetrieveParams) => {
  return useAxios(
    `${Api.RETRIEVE_PROVIDER_ACCOUNTS}?query=${query}`,
    {
      method: 'GET',
    },
    providerAccountInstance
  );
};

export const updateProviderAccount = ({ urn, data }: UpdateParams) => {
  return useAxios(
    `${Api.UPDATE_PROVIDER_ACCOUNT}/${urn}`,
    {
      method: 'PATCH',
      data,
    },
    providerAccountInstance
  );
};

// export const updateProviderAccountProfileImg = (file: any) => {
//   return useAxios(
//     Api.UPDATE_PROVIDER_ACCOUNT_PROFILE_IMG,
//     {
//       method: 'POST',
//       data: file,
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'Access-Control-Allow-Origin': '*',
//       },
//     },
//     providerAccountInstance
//   );
// };

export const deleteProviderAccount = ({ urn }: any) => {
  return useAxios(
    `${Api.DELETE_PROVIDER_ACCOUNT}/${urn}`,
    {
      method: 'DELETE',
    },
    providerAccountInstance
  );
};
