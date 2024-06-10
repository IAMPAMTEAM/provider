import { useAxios } from '@vueuse/integrations/useAxios';
import { providerAwsServiceInstance } from '@/api';

enum Api {
  FIND_AWS_SERVICE = '/',
  ADD_AWS_SERVICE = '/',
  REMOVE_AWS_SERVICE = '/',
  UPDATE_AWS_SERVICE = '/',
  UPLOAD_AWS_SERVICE = '/upload',
}

const findAwsService = ({ query }: any) => {
  return useAxios(
    `${Api.FIND_AWS_SERVICE}?query=${query}`,
    {
      method: 'GET',
    },
    providerAwsServiceInstance
  );
};

const addAwsService = (params: any) => {
  return useAxios(
    Api.ADD_AWS_SERVICE,
    {
      method: 'POST',
      data: params,
    },
    providerAwsServiceInstance
  );
};

const removeAwsService = (params: any) => {
  return useAxios(
    Api.REMOVE_AWS_SERVICE,
    {
      method: 'DELETE',
      data: params,
    },
    providerAwsServiceInstance
  );
};

const updateAwsService = (params: any) => {
  return useAxios(
    Api.UPDATE_AWS_SERVICE,
    {
      method: 'PATCH',
      data: params,
    },
    providerAwsServiceInstance
  );
};

export const uploadAwsService = async (data: FormData) => {
  return useAxios(
    Api.UPLOAD_AWS_SERVICE,
    {
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    },
    providerAwsServiceInstance
  );
};
export { findAwsService, addAwsService, removeAwsService, updateAwsService };
