import { useAxios } from '@vueuse/integrations/useAxios';
import { providerAccountInstance } from '@/api';

enum Api {
  FIND_ACCOUNT_INFO = '/',
  UPDATE_ACCOUNT_INFO = '',
  UPDATE_PROFILE_IMG = '/profile-img',
  DELETE_ACCOUNT = '',
  CHECK_ROLE = '/check',
}

export const findProviderAccountInfo = async (params: any) => {
  return useAxios(
    `${Api.FIND_ACCOUNT_INFO}?query=${params.query}`,
    {
      method: 'GET',
    },
    providerAccountInstance
  );
};

export const updateProviderAccountInfo = (params: any) => {
  return useAxios(
    `${Api.UPDATE_ACCOUNT_INFO}/${params.urn}`,
    {
      method: 'PATCH',
      data: params.data,
    },
    providerAccountInstance
  );
};

export const uploadImageToS3 = (file: any) => {
  return useAxios(
    Api.UPDATE_PROFILE_IMG,
    {
      method: 'POST',
      data: file,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    },
    providerAccountInstance
  );
};

export const deleteProviderAccount = (params: any) => {
  return useAxios(
    `${Api.DELETE_ACCOUNT}/${params.urn}`,
    {
      method: 'DELETE',
    },
    providerAccountInstance
  );
};

export const checkRole = (accountId: string) => {
  return useAxios(
    Api.CHECK_ROLE + '/' + accountId,
    {
      method: 'GET',
    },
    providerAccountInstance
  );
};
