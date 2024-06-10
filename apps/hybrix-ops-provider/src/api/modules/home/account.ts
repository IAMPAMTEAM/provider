import { useAxios } from '@vueuse/integrations/useAxios';
import { homeAccountInstance } from '@/api';
import type { UpdateAccountInfoParams } from '@/api/types';

enum Api {
  GET_ACCOUNT_INFO = '/',
  CREATE_ACCOUNT_INFO = '/',
  UPDATE_ACCOUNT_INFO = '/',
  REMOVE_ACCOUNT_INFO = '/',
  UPDATE_PROFILE_IMG = '/profile-img',
  CHECK_ROLE = '/check',
}

export const findAccountInfo = async (params: any) => {
  return useAxios(
    `${Api.GET_ACCOUNT_INFO}?query=${params.query}`,
    {
      method: 'GET',
    },
    homeAccountInstance
  );
};

export const createAccount = (params: any) => {
  return useAxios(
    `${Api.CREATE_ACCOUNT_INFO}`,
    {
      method: 'POST',
      data: params,
    },
    homeAccountInstance
  );
};

export const updateAccountInfo = (params: any) => {
  return useAxios(
    `${Api.UPDATE_ACCOUNT_INFO}${params.urn}`,
    {
      method: 'PATCH',
      data: params.data,
    },
    homeAccountInstance
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
    homeAccountInstance
  );
};

export const deleteAccount = (params: { urn: string }) => {
  return useAxios(
    Api.REMOVE_ACCOUNT_INFO + `${params.urn}`,
    {
      method: 'DELETE',
    },
    homeAccountInstance
  );
};

const checkRole = (accountId: string) => {
  return useAxios(
    Api.CHECK_ROLE + '/' + accountId,
    {
      method: 'GET',
    },
    homeAccountInstance
  );
};
