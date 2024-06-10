import { useAxios } from '@vueuse/integrations/useAxios';
import { providerSecurityTermInstance } from '@/api';

enum Api {
  FIND_SECURITY_TERM = '/',
  ADD_SECURITY_TERM = '/',
  REMOVE_SECURITY_TERM = '/',
  UPDATE_SECURITY_TERM = '/',
  UPLOAD_SECURITY_TERM = '/upload',
}

const findSecurityTerm = ({ query }: any) => {
  return useAxios(
    `${Api.FIND_SECURITY_TERM}?query=${query}`,
    {
      method: 'GET',
    },
    providerSecurityTermInstance
  );
};

const addSecurityTerm = (params: any) => {
  return useAxios(
    Api.ADD_SECURITY_TERM,
    {
      method: 'POST',
      data: params,
    },
    providerSecurityTermInstance
  );
};

const removeSecurityTerm = (params: any) => {
  return useAxios(
    Api.REMOVE_SECURITY_TERM,
    {
      method: 'DELETE',
      data: params,
    },
    providerSecurityTermInstance
  );
};

const updateSecurityTerm = (params: any) => {
  return useAxios(
    Api.UPDATE_SECURITY_TERM,
    {
      method: 'PATCH',
      data: params,
    },
    providerSecurityTermInstance
  );
};

export const uploadSecurityTerm = async (data: FormData) => {
  return useAxios(
    Api.UPLOAD_SECURITY_TERM,
    {
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    },
    providerSecurityTermInstance
  );
};
export { findSecurityTerm, addSecurityTerm, removeSecurityTerm, updateSecurityTerm };
